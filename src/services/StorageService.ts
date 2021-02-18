import {Plugins, StoragePlugin} from "@capacitor/core";

export default class StorageService {

    /**
     * Bridge Key
     *
     * @private
     */
    private _bridgeKey = 'bridge';

    /**
     * Capacitor local storage adaptor
     *
     * @private
     */
    private _storage: StoragePlugin;


    /**
     * StorageService constructor
     */
    constructor() {
        this._storage = Plugins.Storage;
    }

    /**
     * Get stored bridge address
     *
     * @return string|null
     */
    public async getBridge(): Promise<string | null> {
        const item = await this._storage.get({key: this._bridgeKey});
        return item.value;
    }

    /**
     *  Store bridge ip in local storage
     *
     * @param bridgeIp
     */
    public async setBridge(bridgeIp: string): Promise<void> {
        await this._storage.set({key: this._bridgeKey, value: bridgeIp})
    }
}
