<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="secondary">
          <ion-button @click="turnOffAllLights">
            <ion-icon :name="powerOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-list class="home-container">
        <ion-list-header class="home-section-header">
          Rooms
        </ion-list-header>

        <ion-item :key="index" v-for="(room, index) of this.$store.state.room"
                  class="home-container-list-item mb-4 mx-4 rounded">
          <div class="w-full flex flex-wrap p-4">
            <div class="w-1/12 text-center flex items-center justify-center">
              <ion-icon size="large" :icon="mapIcon(room.class)"></ion-icon>
            </div>

            <div class="w-10/12 pl-4 flex items-center">
              <h2 class="text-sm font-semibold"> {{ room.name }}</h2>
            </div>

            <div class="w-1/12">
              <ion-toggle @update:modelValue="updateRoom(index, 'state', $event)" :modelValue="room.action.on"/>
            </div>
          </div>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import HueIconMapper from "../../services/HueIconMapper.ts";
import {useStore} from "vuex";
import {defineComponent} from "vue";

import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonList,
  IonItem,
  IonListHeader,
  IonIcon,
  IonToggle
} from "@ionic/vue";

import {powerOutline} from "ionicons/icons";


export default defineComponent({
  name: "Home",

  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonToolbar,
    IonList,
    IonItem,
    IonListHeader,
    IonIcon,
    IonToggle,
  },

  setup() {
    const iconMapper = new HueIconMapper();
    const store = useStore();

    const mapIcon = (icon: string) => iconMapper.map(icon);

    const turnOffAllLights = () => {
      const rooms = store.state.room;
      for (const room in rooms) {
        console.log(`/root/groups/${room}/room`, {on: false});
      }
    };

    const updateRoom = (room, type, value) => {

      switch (type) {
        case 'state':
          console.log(`/root/groups/${room}/action`, {on: value})
          break;
      }
    }

    // console.log(ColorConverter.rgbToXy(6, 255, 245));

    return {updateRoom, mapIcon, turnOffAllLights, powerOutline};
  }
});
</script>

<style>
.home-container {
  @apply bg-transparent;
  margin-right: 0 !important;
  margin-left: 0 !important;
}

.home-container-list-item {
  @apply bg-transparent;
}

.home-section-header {
  @apply text-gray-400 font-semibold;
  font-size: 12px;
}
</style>
