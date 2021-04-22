<template>
  <ion-app>
    <ion-router-outlet/>
  </ion-app>
</template>

<script lang="ts">
import {IonApp, IonRouterOutlet} from '@ionic/vue';
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {defineComponent, onBeforeMount, onMounted} from 'vue';
import BridgeService from "@/services/BridgeService";

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    onBeforeMount(async () => {
      const user = await store.state.user;
      const bridge = await store.state.bridge;

      if (!user || !bridge) {
        await router.push('/config/bridge/')
        return;
      }

      const bridgeService = new BridgeService(store);
      await bridgeService.fetchAllAndDispatchToStore()
    })

    onMounted(() => {
      // console.log(store.state);
    })
  }
});
</script>
