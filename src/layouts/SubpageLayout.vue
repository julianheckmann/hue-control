<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>

        <ion-title class="settings-header">
          {{ title }}
        </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding-vertical">
      <slot></slot>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonBackButton,
  IonButtons
} from "@ionic/vue";

export default defineComponent({
  name: "SubpageLayout",

  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonBackButton,
    IonButtons
  },

  props: {
    title: {
      type: String,
      required: true
    },
    backButton: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  setup() {
    return {};
  }
});
</script>

<style scoped></style>
