import {Store} from "vuex";
import {SET_APP_INFO_ACTION, SET_LIGHTS_ACTION, SET_ROOM_ACTION} from "@/store/types";

export default class BridgeService {
	/**
	 * BridgeService constructor
	 * @param _store
	 */
	constructor(private _store: Store<any>) {
	}
	
	public async fetchLights() {
		const user = await this._getUser();
		const bridge = await this._getBridge();
		
		const response = await fetch(`http://${bridge}/${user}/lights`, {
			method: 'GET', cache: 'no-cache', mode: "cors", headers: {
				'Accept': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json',
			}
		})
		return await response.json();
	}
	
	public async fetchLightForRoom(id) {
		const user = await this._getUser();
		const bridge = await this._getBridge();
		
		const response = await fetch(`http://${bridge}/${user}/lights/${id}`, {
			method: 'GET', cache: 'no-cache', mode: "cors", headers: {
				'Accept': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json',
			}
		})
		return await response.json();
	}
	
	public async fetchGroups() {
		const user = await this._getUser();
		const bridge = await this._getBridge();
		
		const response = await fetch(`http://${bridge}/${user}/groups`, {
			method: 'GET', cache: 'no-cache', mode: "cors", headers: {
				'Accept': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json',
			}
		})
		return await response.json();
	}
	
	public async fetchInfos() {
		const user = await this._getUser();
		const bridge = await this._getBridge();
		
		const response = await fetch(`http://${bridge}/${user}/infos`, {
			method: 'GET', cache: 'no-cache', mode: "cors", headers: {
				'Accept': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json',
			}
		});
		
		return await response.json();
	}
	
	public async validateBridgeInfo(bridge, user) {
		console.log('test')
		const response = await fetch(`http://${bridge}/${user}`, {
			method: 'GET', cache: 'no-cache', mode: "cors", headers: {
				'Accept': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json',
			}
		});
		
		if (!response.ok) {
			return false;
		}
		
		const json = await response.json();
		
		if('success' in json) {
			return json['success'];
		}
	
		return false;
	}
	
	public async fetchGroupsContent(groups: any) {
		const user = await this._getUser();
		const bridge = await this._getBridge();
		
		let buildGroup = {};
		
		console.log(groups);
		
		for (const [group, value] of Object.entries(groups)) {
			const groupContent = await fetch(`http://${bridge}/${user}/groups/${group}`, {
				method: 'GET', cache: 'no-cache', mode: "cors", headers: {
					'Accept': 'application/json',
					'Access-Control-Allow-Origin': '*',
					'Content-Type': 'application/json',
				}
			});
			const groupContentJson = await groupContent.json();
			buildGroup = {...buildGroup, ...{[group]: groupContentJson}};
		}
		
		return buildGroup;
	}
	
	public async updateGroup(groupId, value): Promise<void> {
		const user = await this._getUser();
		const bridge = await this._getBridge();
		
		const response = await fetch(`http://${bridge}/${user}/groups/${groupId}/action`, {
			method: 'PUT', cache: 'no-cache', mode: "cors", headers: {
				'Accept': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({on: value})
		});
		
		if (!response.ok) {
			throw new DOMException('request failed');
		}
	}
	
	
	public async fetchAllAndDispatchToStore(): Promise<void> {
		const data = await this.fetchAll();
		
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
		const groups = await this.fetchGroups();
		
		const groupContent = await this.fetchGroupsContent(groups);
		
		return {lights: lights, groupContent: groupContent};
	}
	
	private async _getBridge(): Promise<any> {
		return await this._store.state.bridge;
	}
	
	private async _getUser(): Promise<any> {
		return await this._store.state.user;
	}
}
