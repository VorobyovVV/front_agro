<template>
  <div style="width: 100%; height: 100%">
    <div id="map"></div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet/dist/leaflet.js";

export default {
  name: "MapComponent",
  setup() {
    const map = ref(null);

    onMounted(() => {
      // Создание карты
      map.value = L.map("map").setView([59.420161, 30.01832], 15);

      // Добавление тайлового слоя
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "Map data &copy; OpenStreetMap contributors",
      }).addTo(map.value);
    });

    return { map };
  },
};
</script>

<style>
#map {
  height: 100vh;
  width: 100%;
}
</style>
