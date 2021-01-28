<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title class="settings-header">Einstellungen</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-list
          :key="key"
          v-for="(setting, key) of settings"
          class="ion-margin-bottom settings-container"
          :inset="true"
      >
        <ion-list-header translucent class="settings-section-header font-semibold">
          {{ setting.name }}
        </ion-list-header>

        <ion-item
            :key="innerKey"
            v-for="(option, innerKey) of setting.children"
        >
          <ion-item @click="redirect(option.link)">
            <ion-icon :icon="option.icon" class="mr-8 text-white"/>
            <div class="py-4">
              <h2 class="text-xs font-semibold">{{ option.name }}</h2>
              <p class="text-xs text-gray-300">{{ option.description }}</p>
            </div>
          </ion-item>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {defineComponent} from "vue";
// import ColorConverter from "../../services/ColorConverter.ts";

import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonListHeader,
  IonIcon,
} from "@ionic/vue";
import {bulb, cube, keypad, informationCircle} from "ionicons/icons";

import {useRouter} from "vue-router";

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
    IonListHeader,
    IonIcon,
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

    const redirect = (url: string) => {
      router.push(url);
    };

    return {
      settings,
      redirect
    };
  }
});
</script>

<style>
.settings-header {
  font-size: 15px;
}

.settings-container {
  @apply bg-transparent;
  margin-right: 0 !important;
  margin-left: 0 !important;
}

.settings-section-header {
  @apply text-gray-400;
  font-size: 12px;
}
</style>
