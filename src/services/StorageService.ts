import {Plugins, StoragePlugin} from "@capacitor/core";

export default class StorageService {

    /**
     * Bridge Key
     *
     * @private
     */
    private _bridgeKey = 'bridge';

    /**
     * User Key
     *
     * @private
     */
    private _userKey = 'user';

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
        return this._get(this._bridgeKey);
    }

    public async getUser(): Promise<string | null> {
        return this._get(this._userKey);
    }

    /**
     * Store bridge in local storage
     *
     * @param bridgeIp
     */
    public async setBridge(bridgeIp: string): Promise<void> {
        await this._set(this._bridgeKey, bridgeIp);
    }

    /**
     * Store user in local storage
     *
     * @param user
     */
    public async setUser(user: string): Promise<void> {
        await this._set(this._userKey, user);
    }

    /**
     * Get Value from Key in local storage
     *
     * @param key
     * @private
     */
    private async _get(key: string): Promise<string | null> {
        const item = await this._storage.get({key: key});
        return item.value;
    }

    /**
     * Set Key Value in local storage
     *
     * @param key
     * @param value
     * @private
     */
    private async _set(key: string, value: string): Promise<void> {
        await this._storage.set({key: key, value: value})
    }
}
