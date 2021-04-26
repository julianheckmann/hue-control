<template>
  <subpage-layout title="Room">
    <ion-content>
      <div v-if="roomInfo">
        {{ roomInfo }}
        <ColorPicker :color="hueToRgb(roomInfo.state)" @color-change="(e) => updateColor(e.colors.rgb.r, e.colors.rgb.g, e.colors.rgb.b)"/>
      </div>
    </ion-content>
  </subpage-layout>
</template>

<script>
import {defineComponent, onBeforeMount, ref} from "vue";
import SubpageLayout from "../../layouts/SubpageLayout";
import {
  IonContent,
} from "@ionic/vue";
import {useStore} from "vuex";
import BridgeService from '@/services/BridgeService'
import {useRoute} from 'vue-router'
import {ColorPicker} from 'vue-accessible-color-picker';
import ColorConverter from '../../services/ColorConverter'

export default defineComponent({
  name: "RoomLamps",
  components: {
    SubpageLayout,
    IonContent,
    // IonListHeader
    ColorPicker
  },
  setup() {
    const route = useRoute();
    const store = useStore();
    const bridgeService = new BridgeService(store);
    const roomInfo = ref({});
    const colorConverter = new ColorConverter();
    const color = ref();

    function hueToRgb(state) {
      if (state !== undefined && 'xy' in state) {
        ColorConverter.xyBriToRgb(...state.xy, 1)
      }
    }

    function rgbToHue(r, g, b) {
      return ColorConverter.rgbToXy(r, g, b);
    }

    function updateColor(r, g, b) {
      color.value = rgbToHue(r, g, b);
      console.log(color.value)
    }

    onBeforeMount(async () => {
      roomInfo.value = await bridgeService.fetchLightForRoom(route.params.id);
    });

    return {roomInfo, hueToRgb, rgbToHue, updateColor};
  }
});
</script>

<style>
.about-header {
  font-size: 15px;
}

.about-container {
  @apply bg-transparent;
  margin-right: 0 !important;
  margin-left:  0 !important;
}
</style>

