<template>
  <subpage-layout title="Bridge">
    <div class="mx-4 my-6">
      <ion-input
          class="border border-gray-700 rounded border-gray-400+"
          clear-input
          placeholder="Enter Bridge IP"
          v-model="bridgeIp">
      </ion-input>

      <ion-button :disabled="!bridgeIp.length" class="mt-4 capitalize" color="light" expand="block" @click="saveBridge">
        Speichern
      </ion-button>
    </div>
  </subpage-layout>
</template>

<script>
import {defineComponent, onBeforeMount, ref} from "vue";
import {useStore} from "vuex";
import SubpageLayout from "../../../layouts/SubpageLayout";
import {IonInput, IonButton, toastController} from "@ionic/vue"
import {SET_BRIDGE_ACTION} from "../../../store/types";

export default defineComponent({
  name: "Bridge",
  components: {SubpageLayout, IonInput, IonButton},
  setup() {
    const store = useStore();
    const bridgeIp = ref('');

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

    const saveBridge = async () => {
      if (bridgeIp.value.length) {
        await store.dispatch(SET_BRIDGE_ACTION, bridgeIp.value);
        await successToast()
      } else {
        await failedToast();
      }
    }

    onBeforeMount(async () => {
      const bridge = await store.state.bridge;

      if (bridge.length) {
        bridgeIp.value = bridge;
      }
    })

    return {saveBridge, bridgeIp}
  }
});
</script>

<style scoped></style>
