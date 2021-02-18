// @ts-nocheck
import {createStore} from "vuex";
import {
    SET_LIGHTS_MUTATION,
    SET_LIGHTS_ACTION,
    SET_ROOM_MUTATION,
    SET_ROOM_ACTION,
    SET_APP_INFO_MUTATION, SET_APP_INFO_ACTION
} from "@/store/types";

const store = createStore({
    state() {
        return {
            lights: {},
            room: {},
            appInfo: {},
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
            context.commit(SET_APP_INFO_MUTATION, payload)
        }
    }
})


export default store;
