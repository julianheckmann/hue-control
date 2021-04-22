<template>
  <subpage-layout title="About">
    <ion-content>
      <div class="mx-5">
        <h2 class="font-semibold text-md">Hue</h2>
        <h3 class="text-xs font-medium">Version 123</h3>
        <h4 class="text-xs font-medium">© 2021 XYZ. Alle Rechte vorbehalten.</h4>

        <ul class="my-5">
          <li class="text-xs my-2"><a href="https://google.de" target="_blank">Nutzungsbedingungen ></a></li>
          <li class="text-xs my-2"><a href="https://google.de" target="_blank">Datenschutzbestimmung ></a></li>
          <li class="text-xs my-2"><a href="https://google.de" target="_blank">Open Source Lizenzen ></a></li>
        </ul>

        <p class="text-xs">Volume, attraction and an important material world. Confucius says: the self is like the
          moon. The crystal afterlife of joy is to respect with politics. The individual illuminates.</p>
      </div>

      <ion-list
          class="ion-margin-bottom about-container"
          :inset="true"
      >
        <ion-item :key="index" v-for="(light, index) of this.$store.state.lights">
          <div class="py-4 flex flex-wrap w-full items-center">
            <h2 class="w-8/12 text-xs font-semibold">
              {{ light.name }}
            </h2>

            <div class="w-4/12 flex flex-wrap text-right">
              <h4 class="w-full text-xs text-white">
                {{ light.modelid }}
              </h4>
              <p class="w-full text-xs text-gray-500 text-right">
                Version: {{ light.version }}
              </p>
            </div>
          </div>
        </ion-item>
      </ion-list>
    </ion-content>
  </subpage-layout>
</template>

<script>
import {defineComponent, onBeforeMount} from "vue";
import SubpageLayout from "../../../layouts/SubpageLayout";
import {
  IonContent,
  IonList,
  IonItem,
  // IonListHeader
} from "@ionic/vue";
import {useStore} from "vuex";

export default defineComponent({
  name: "About",
  components: {
    SubpageLayout,
    IonContent,
    IonList,
    IonItem,
    // IonListHeader
  },
  setup() {
    onBeforeMount(() => {
      const store = useStore();

    });
    return {};
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
  margin-left: 0 !important;
}
</style>

