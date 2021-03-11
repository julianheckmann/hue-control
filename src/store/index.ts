// @ts-nocheck
import {createStore} from "vuex";
import {
    SET_LIGHTS_MUTATION,
    SET_LIGHTS_ACTION,
    SET_ROOM_MUTATION,
    SET_ROOM_ACTION,
    SET_APP_INFO_MUTATION,
    SET_APP_INFO_ACTION,
    SET_BRIDGE_MUTATION,
    SET_BRIDGE_ACTION,
    SET_USER_ACTION,
    SET_USER_MUTATION, INFOS_ARE_SET
} from "@/store/types";

import StorageService from "@/services/StorageService";

const storageService = new StorageService();

const store = createStore({
    state() {
        return {
            lights: {},
            room: {},
            appInfo: {},
            bridge: storageService.getBridge() ?? '',
            user: storageService.getUser() ?? ''
        }
    },
    getters: {
      [INFOS_ARE_SET](state) {
          return state.bridge.length < 0 || state.user.length < 0;
      }
    },
    mutations: {
        [SET_LIGHTS_MUTATION](state, payload) {
            state.lights = payload;
        },
        [SET_ROOM_MUTATION](state, payload) {
            state.room = payload;
        },
        [SET_APP_INFO_MUTATION](state, payload) {
            state.appInfo = payload;
        },
        [SET_BRIDGE_MUTATION](state, payload) {
            state.bridge = payload;
        },
        [SET_USER_MUTATION](state, payload) {
            state.user = payload;
        }
    },
    actions: {
        [SET_LIGHTS_ACTION](context, payload) {
            context.commit(SET_LIGHTS_MUTATION, payload);
        },
        [SET_ROOM_ACTION](context, payload) {
            context.commit(SET_ROOM_MUTATION, payload);
        },
        [SET_APP_INFO_ACTION](context, payload) {
            context.commit(SET_APP_INFO_MUTATION, payload);
        },
        async [SET_BRIDGE_ACTION](context, payload) {
            await context.commit(SET_BRIDGE_MUTATION, payload);
            await storageService.setBridge(payload);
        },
        async [SET_USER_ACTION](context, payload) {
            await context.commit(SET_USER_MUTATION, payload);
            await storageService.setUser(payload);
        }
    }
})


export default store;
