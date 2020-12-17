export default class ColorConverter {
  static getGamutRanges() {
    const gamutA = {
      red: [0.704, 0.296],
      green: [0.2151, 0.7106],
      blue: [0.138, 0.08]
    };

    const gamutB = {
      red: [0.675, 0.322],
      green: [0.409, 0.518],
      blue: [0.167, 0.04]
    };

    const gamutC = {
      red: [0.692, 0.308],
      green: [0.17, 0.7],
      blue: [0.153, 0.048]
    };

    const defaultGamut = {
      red: [1.0, 0],
      green: [0.0, 1.0],
      blue: [0.0, 0.0]
    };

    return {
      gamutA: gamutA,
      gamutB: gamutB,
      gamutC: gamutC,
      default: defaultGamut
    };
  }

  static getLightColorGamutRange(modelId = null) {
    const ranges = ColorConverter.getGamutRanges();
    const gamutA = ranges.gamutA;
    const gamutB = ranges.gamutB;
    const gamutC = ranges.gamutC;

    const philipsModels = {
      LST001: gamutA,
      LLC010: gamutA,
      LLC011: gamutA,
      LLC012: gamutA,
      LLC006: gamutA,
      LLC005: gamutA,
      LLC007: gamutA,
      LLC014: gamutA,
      LLC013: gamutA,

      LCT001: gamutB,
      LCT007: gamutB,
      LCT002: gamutB,
      LCT003: gamutB,
      LLM001: gamutB,

      LCT010: gamutC,
      LCT014: gamutC,
      LCT015: gamutC,
      LCT016: gamutC,
      LCT011: gamutC,
      LLC020: gamutC,
      LST002: gamutC,
      LCT012: gamutC
    };

    if (modelId !== null && philipsModels[modelId]) {
      return philipsModels[modelId];
    }

    return ranges.default;
  }

  static rgbToXy(red: any, green: any, blue: any, modelId = null) {
    function getGammaCorrectedValue(value: any) {
      return value > 0.04045
        ? Math.pow((value + 0.055) / (1.0 + 0.055), 2.4)
        : value / 12.92;
    }

    const colorGamut = ColorConverter.getLightColorGamutRange(modelId);

    red = parseFloat(red / 255);
    green = parseFloat(green / 255);
    blue = parseFloat(blue / 255);

    red = getGammaCorrectedValue(red);
    green = getGammaCorrectedValue(green);
    blue = getGammaCorrectedValue(blue);

    const x = red * 0.649926 + green * 0.103455 + blue * 0.197109;
    const y = red * 0.234327 + green * 0.743075 + blue * 0.022598;
    const z = red * 0.0 + green * 0.053077 + blue * 1.035763;

    let xy = {
      x: x / (x + y + z),
      y: y / (x + y + z)
    };

    if (!ColorConverter.xyIsInGamutRange(xy, colorGamut)) {
      xy = ColorConverter.getClosestColor(xy, colorGamut);
    }

    return xy;
  }

  static xyIsInGamutRange(xy, gamut) {
    gamut = gamut || ColorConverter.getGamutRanges().gamutC;
    if (Array.isArray(xy)) {
      xy = {
        x: xy[0],
        y: xy[1]
      };
    }

    const v0 = [gamut.blue[0] - gamut.red[0], gamut.blue[1] - gamut.red[1]];
    const v1 = [gamut.green[0] - gamut.red[0], gamut.green[1] - gamut.red[1]];
    const v2 = [xy.x - gamut.red[0], xy.y - gamut.red[1]];

    const dot00 = v0[0] * v0[0] + v0[1] * v0[1];
    const dot01 = v0[0] * v1[0] + v0[1] * v1[1];
    const dot02 = v0[0] * v2[0] + v0[1] * v2[1];
    const dot11 = v1[0] * v1[0] + v1[1] * v1[1];
    const dot12 = v1[0] * v2[0] + v1[1] * v2[1];

    const invDenom = 1 / (dot00 * dot11 - dot01 * dot01);

    const u = (dot11 * dot02 - dot01 * dot12) * invDenom;
    const v = (dot00 * dot12 - dot01 * dot02) * invDenom;

    return u >= 0 && v >= 0 && u + v < 1;
  }

  static getClosestColor(xy, gamut) {
    function getLineDistance(pointA, pointB) {
      return Math.hypot(pointB.x - pointA.x, pointB.y - pointA.y);
    }

    function getClosestPoint(xy, pointA, pointB) {
      const xy2a = [xy.x - pointA.x, xy.y - pointA.y];
      const a2b = [pointB.x - pointA.x, pointB.y - pointA.y];
      const a2bSqr = Math.pow(a2b[0], 2) + Math.pow(a2b[1], 2);
      // eslint-disable-next-line @typescript-eslint/camelcase
      const xy2a_dot_a2b = xy2a[0] * a2b[0] + xy2a[1] * a2b[1];
      // eslint-disable-next-line @typescript-eslint/camelcase
      const t = xy2a_dot_a2b / a2bSqr;

      return {
        x: pointA.x + a2b[0] * t,
        y: pointA.y + a2b[1] * t
      };
    }

    const greenBlue = {
      a: {
        x: gamut.green[0],
        y: gamut.green[1]
      },
      b: {
        x: gamut.blue[0],
        y: gamut.blue[1]
      }
    };

    const greenRed = {
      a: {
        x: gamut.green[0],
        y: gamut.green[1]
      },
      b: {
        x: gamut.red[0],
        y: gamut.red[1]
      }
    };

    const blueRed = {
      a: {
        x: gamut.red[0],
        y: gamut.red[1]
      },
      b: {
        x: gamut.blue[0],
        y: gamut.blue[1]
      }
    };

    const closestColorPoints = {
      greenBlue: getClosestPoint(xy, greenBlue.a, greenBlue.b),
      greenRed: getClosestPoint(xy, greenRed.a, greenRed.b),
      blueRed: getClosestPoint(xy, blueRed.a, blueRed.b)
    };

    const distance = {
      greenBlue: getLineDistance(xy, closestColorPoints.greenBlue),
      greenRed: getLineDistance(xy, closestColorPoints.greenRed),
      blueRed: getLineDistance(xy, closestColorPoints.blueRed)
    };

    let closestDistance;
    let closestColor;
    for (const i in distance) {
      // eslint-disable-next-line no-prototype-builtins
      if (distance.hasOwnProperty(i)) {
        if (!closestDistance) {
          closestDistance = distance[i];
          closestColor = i;
        }

        if (closestDistance > distance[i]) {
          closestDistance = distance[i];
          closestColor = i;
        }
      }
    }
    return closestColorPoints[closestColor];
  }

  static xyBriToRgb(x, y, bri) {
    function getReversedGammaCorrectedValue(value) {
      return value <= 0.0031308
        ? 12.92 * value
        : (1.0 + 0.055) * Math.pow(value, 1.0 / 2.4) - 0.055;
    }

    const xy = {
      x: x,
      y: y
    };

    const z = 1.0 - xy.x - xy.y;
    const Y = bri / 255;
    const X = (Y / xy.y) * xy.x;
    const Z = (Y / xy.y) * z;
    let r = X * 1.656492 - Y * 0.354851 - Z * 0.255038;
    let g = -X * 0.707196 + Y * 1.655397 + Z * 0.036152;
    let b = X * 0.051713 - Y * 0.121364 + Z * 1.01153;

    r = getReversedGammaCorrectedValue(r);
    g = getReversedGammaCorrectedValue(g);
    b = getReversedGammaCorrectedValue(b);

    let red = parseInt(r * 255) > 255 ? 255 : parseInt(r * 255);
    let green = parseInt(g * 255) > 255 ? 255 : parseInt(g * 255);
    let blue = parseInt(b * 255) > 255 ? 255 : parseInt(b * 255);

    red = Math.abs(red);
    green = Math.abs(green);
    blue = Math.abs(blue);

    return { r: red, g: green, b: blue };
  }
}
