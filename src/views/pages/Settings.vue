<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title class="settings-header">Settings</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding-vertical">
      <ion-list
        :key="key"
        v-for="(setting, key) of settings"
        class="ion-margin-bottom"
        :inset="true"
      >
        <ion-list-header translucent>
          {{ setting.name }}
        </ion-list-header>

        <ion-item
          :key="innerKey"
          v-for="(option, innerKey) of setting.children"
        >
          <ion-item @click="redirect(option.link)">
            <ion-avatar slot="start">
              <ion-icon :icon="option.icon" />
            </ion-avatar>
            <ion-label>
              <h2>{{ option.name }}</h2>
              <p>{{ option.description }}</p>
            </ion-label>
          </ion-item>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonListHeader,
  IonLabel,
  IonIcon,
  IonAvatar
} from "@ionic/vue";
import { bulb, cube, keypad, informationCircle } from "ionicons/icons";

import { useRouter } from "vue-router";

export default defineComponent({
  name: "Settings",

  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonList,
    IonItem,
    IonLabel,
    IonListHeader,
    IonIcon,
    IonAvatar
  },

  setup() {
    const router = useRouter();
    const settings: any = {
      home: {
        name: "Your Home",
        children: [
          {
            name: "Hue Bridge Configuration",
            description: "Set a huge bridge",
            icon: cube,
            link: "/config/bridge/"
          },
          {
            name: "Lamp configuration",
            description: "Add a new lamp or change a name",
            icon: bulb,
            link: "/config/lamps/"
          },
          {
            name: "Rooms",
            description: "Organize your Lamps",
            icon: keypad,
            link: "/config/rooms/"
          }
        ]
      },
      app: {
        name: "App",
        children: [
          {
            name: "About",
            description: "Information about the App",
            icon: informationCircle,
            link: "/app/about/"
          }
        ]
      }
    };

    const redirect = url => {
      router.replace(url);
    };

    return {
      settings,
      redirect
    };
  }
});
</script>

<style scoped>
.settings-header {
  font-size: 15px;
}
</style>
