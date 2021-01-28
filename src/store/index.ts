// @ts-nocheck
import {createStore} from "vuex";
import {SET_LIGHTS_MUTATION, SET_LIGHTS_ACTION, SET_ROOM_MUTATION, SET_ROOM_ACTION} from "@/store/types";

const store = createStore({
    state() {
        return {
            lights: {},
            room: {},
        }
    },
    mutations: {
        [SET_LIGHTS_MUTATION](state, payload) {
            state.lights = payload;
        },
        [SET_ROOM_MUTATION](state, payload) {
            state.room = payload;
        }
    },
    actions: {
        [SET_LIGHTS_ACTION](context, payload) {
            context.commit(SET_LIGHTS_MUTATION, payload);
        },
        [SET_ROOM_ACTION](context, payload) {
            context.commit(SET_ROOM_MUTATION, payload);
        }
    }
})


export default store;
