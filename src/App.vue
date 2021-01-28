<template>
  <ion-app>
    <ion-router-outlet/>
  </ion-app>
</template>

<script lang="ts">
import {IonApp, IonRouterOutlet} from '@ionic/vue';
import {useStore} from "vuex";
import {defineComponent, onBeforeMount, onMounted} from 'vue';
import {SET_LIGHTS_ACTION, SET_ROOM_ACTION} from "@/store/types";

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet
  },
  setup() {
    const store = useStore();

    onBeforeMount(async () => {
      const options = {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }

      const lights = await fetch('./lights.json', options);
      const lightsJson = await lights.json();

      const groups = await fetch('./groups.json', options);
      const groupsJson = await groups.json();

      let buildGroup = {};

      for (const group of groupsJson.groups) {
        const groupContent = await fetch(`./groups/${group}.json`, options);
        const groupContentJson = await groupContent.json();
        buildGroup = {...buildGroup, ...{[group]: groupContentJson}};
      }

      await store.dispatch(SET_LIGHTS_ACTION, lightsJson);
      await store.dispatch(SET_ROOM_ACTION, buildGroup);
    })

    onMounted(() => {
      console.log(store.state);
    })
  }
});
</script>
