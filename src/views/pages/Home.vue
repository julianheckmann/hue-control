<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Home</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-list>
        <ion-list-header>
          Rooms
        </ion-list-header>

        <ion-item :key="index" v-for="(room, index) of rooms">
          <ion-label>{{ room.name }}</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script>
import ColorConverter from "../../services/ColorConverter.ts";

import { defineComponent, ref } from "vue";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonListHeader,
  IonLabel
} from "@ionic/vue";

export default defineComponent({
  name: "Home",

  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonList,
    IonItem,
    IonLabel,
    IonListHeader
  },

  setup() {
    const rooms = ref([{ name: "test" }, { name: "test2" }]);

    console.log(ColorConverter.rgbToXy(6, 255, 245));

    return {
      rooms
    };
  }
});
</script>

<style scoped></style>
