import IconMap from "@/types/IconMap";

export default class HueIconMapper {
    /**
     * Icon Map
     * @private
     */
    private readonly _map: IconMap;

    /**
     * Default Icon
     *
     * @private
     */
    private readonly _default: string;

    /**
     * HueIconMapper constructor
     *
     * @param map
     * @param defaultIcon
     */
    constructor(map: IconMap, defaultIcon: string) {
        this._map = map;
        this._default = this._map[defaultIcon];
    }

    /**
     * Map Icon
     *
     * @param hueIcon
     */
    public map(hueIcon: string) {
        let result = this._map[hueIcon];

        if (result === undefined) {
            result = this._default;
        }

        return result;
    }
}
