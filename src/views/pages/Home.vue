<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Home</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">Schedule Tab</ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from "vue";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar
} from "@ionic/vue";

export default defineComponent({
  name: "Home",
  components: { IonContent, IonHeader, IonPage, IonTitle, IonToolbar }
});
</script>

<style scoped></style>
