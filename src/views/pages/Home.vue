<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="secondary">
          <ion-button @click="turnOffAllLights">
            All
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
          <div class="w-full flex flex-wrap py-4 items-center cursor-pointer">
            <div class="w-1/12 text-center flex items-center justify-center" @click="redirect({path: '/pages/room/' + index })">
              <ion-icon size="large" :icon="mapIcon(room.class)"></ion-icon>
            </div>

            <div class="w-8/12 pl-4 flex items-center" @click="redirect({path: '/pages/room/' + index })">
              <h2 class="text-sm font-semibold"> {{ room.name }}</h2>
            </div>

            <div class="w-3/12 text-right" @click.prevent>
              <ion-toggle @update:modelValue="updateRoom(index, 'state', $event)" :modelValue="room.action.on"/>
            </div>
          </div>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import HueIconMapper from "../../services/HueIconMapper";
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
  IonToggle,
  IonButtons,
  IonButton
} from "@ionic/vue";

import {powerOutline} from "ionicons/icons";
import HueIconConfiguration from "@/config/HueIconConfiguration";
import BridgeService from "@/services/BridgeService";
import {useRouter} from "vue-router";

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
    IonButtons,
    IonButton
  },

  setup() {
    const iconMapper = new HueIconMapper(HueIconConfiguration, "Other");
    const store = useStore();
    const router = useRouter();

    const mapIcon = (icon: string) => iconMapper.map(icon);

    const turnOffAllLights = () => {
      const rooms = store.state.room;

      for (const room in rooms) {
        console.log(`/root/groups/${room}/room`, {on: false});
      }
    };

    const updateRoom = async (room: any, type: any, value: any) => {
      const bridgeService = new BridgeService(store);
      switch (type) {
        case 'state':
          await bridgeService.updateGroup(room, value);
          console.log(`/root/groups/${room}/action`, {on: value})
          break;
      }
    }

    const redirect = (route) => {
      router.push(route);
    }

    // console.log(ColorConverter.rgbToXy(6, 255, 245));

    return {updateRoom, mapIcon, turnOffAllLights, powerOutline, redirect};
  }
});
</script>

<style>
.home-container {
  @apply bg-transparent;
  margin-right: 0 !important;
  margin-left:  0 !important;
}

.home-container-list-item {
  @apply bg-transparent;
}

.home-section-header {
  @apply text-gray-400 font-semibold;
  font-size: 12px;
}
</style>
