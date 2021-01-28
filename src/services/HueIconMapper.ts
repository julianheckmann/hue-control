import {tvOutline, cafeOutline, beerOutline, bedOutline, businessOutline, filterOutline} from "ionicons/icons";

export default class HueIconMapper {
    private readonly _map: { Office: string; Kitchen: string; "Living room": string; Bedroom: string; Dining: string; Other: string };
    private readonly _default: string;

    constructor() {
        this._map = {
            "Living room": tvOutline,
            "Kitchen": cafeOutline,
            "Dining": beerOutline,
            "Bedroom": bedOutline,
            "Office": businessOutline,
            "Other": filterOutline
        };

        this._default = this._map["Other"];
    }

    public map(hueIcon: string) {
        let result = this._map[hueIcon];

        if (result === undefined) {
            result = this._default;
        }

        return result;
    }
}
