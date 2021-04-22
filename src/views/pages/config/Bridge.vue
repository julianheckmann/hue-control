<template>
  <subpage-layout title="Bridge">
    <div class="mx-4 my-6">
      <ion-input
          class="border border-gray-700 rounded border-gray-400+"
          clear-input
          placeholder="Enter Bridge IP"
          v-model="bridgeIp">
      </ion-input>

      <ion-input
          class=" my-4 border border-gray-700 rounded border-gray-400+"
          clear-input
          placeholder="Enter Bridge User"
          v-model="userName">
      </ion-input>

      <ion-button :disabled="!bridgeIp.length || !userName.length" class="mt-4 capitalize" color="light" expand="block"
                  @click="save">
        Speichern
      </ion-button>
    </div>
  </subpage-layout>
</template>

<script lang="ts">
import {defineComponent, onBeforeMount, ref} from "vue";
import {useStore} from "vuex";
import SubpageLayout from "../../../layouts/SubpageLayout.vue";
import {IonInput, IonButton, toastController} from "@ionic/vue"
import {SET_BRIDGE_ACTION, SET_USER_ACTION} from "@/store/types";
import BridgeService from '../../../services/BridgeService'

export default defineComponent({
  name: "Bridge",
  components: {SubpageLayout, IonInput, IonButton},
  setup() {
    const store = useStore();
    const bridgeIp = ref('');
    const userName = ref('');
    const bridgeService = new BridgeService(store);

    const successToast = async () => {
      const toast = await toastController.create({
        message: 'Bridge wurde gespeichert.',
        duration: 2000,
        color: 'success'
      })
      return toast.present()
    }

    const failedToast = async () => {
      const toast = await toastController.create({
        message: 'Bitte eine valide Bridge angeben',
        duration: 2000,
        color: 'danger'
      })

      return toast.present();
    }

    const save = async () => {
      if (bridgeService && (bridgeIp.value.length || userName.value.length)) {
        console.log(bridgeIp, userName)
        const valid = await bridgeService.validateBridgeInfo(bridgeIp.value, userName.value);

        if (valid) {
          await store.dispatch(SET_BRIDGE_ACTION, bridgeIp.value);
          await store.dispatch(SET_USER_ACTION, userName.value);

          await bridgeService.fetchAllAndDispatchToStore()

          await successToast();
        } else {
          await failedToast();
        }

      } else {
        await failedToast();
      }
    }

    onBeforeMount(async () => {
      const bridge = await store.state.bridge;
      const user = await store.state.user;

      if (bridge) {
        bridgeIp.value = bridge;
      }

      if (user) {
        userName.value = user;
      }
    })

    return {save, bridgeIp, userName}
  }
});
</script>

<style scoped></style>
