import {Store} from "vuex";
import {SET_APP_INFO_ACTION, SET_LIGHTS_ACTION, SET_ROOM_ACTION} from "@/store/types";

export default class BridgeService {
    private _options = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'mode': 'no-cors'
        }
    }

    /**
     * BridgeService constructor
     * @param _bridge
     * @param _user
     * @param _store
     */
    constructor(private _bridge: string, private _user: string, private _store: Store<any>) {
    }

    public async fetchLights() {
        const response = await fetch(`http://${this._bridge}/${this._user}/lights`, this._options)
        return await response.json();
    }

    public async fetchGroups() {
        const response = await fetch(`http://${this._bridge}/${this._user}/groups`, this._options)
        return await response.json();
    }

    public async fetchInfos() {
        const response = await fetch(`http://${this._bridge}/${this._user}/infos`, this._options)
        return await response.json();
    }

    public async fetchGroupsContent(groups: any) {
        let buildGroup = {};

        console.log(groups);

        for (const [group, value] of Object.entries(groups)) {
            const groupContent = await fetch(`http://${this._bridge}/${this._user}/groups/${group}`, groups);
            const groupContentJson = await groupContent.json();
            buildGroup = {...buildGroup, ...{[group]: groupContentJson}};
        }

        return buildGroup;
    }


    public async fetchAllAndDispatchToStore(): Promise<void> {
        const data = await this.fetchAll();
        console.log(data);

        // if (!data.lights || !data.groupContent || !data.infos) {
        //     return;
        // }

        if (!data.lights || !data.groupContent) {
            return;
        }

        const {lights, groupContent, infos} = data;

        await this._store.dispatch(SET_LIGHTS_ACTION, lights);
        await this._store.dispatch(SET_ROOM_ACTION, groupContent);
        await this._store.dispatch(SET_APP_INFO_ACTION, infos);
    }

    private async fetchAll(): Promise<any> {
        const lights = await this.fetchLights();
        // const infos = await this.fetchInfos();
        const groups = await this.fetchGroups();

        const groupContent = await this.fetchGroupsContent(groups);

        // return {lights: lights, infos: infos, groupContent: groupContent};
        return {lights: lights, groupContent: groupContent};
    }
}
