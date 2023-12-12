<template>
    <div class="q-pa-md">
        <div class="row">
            <div class="col-12 col-md-6">
                <div class="text-h4">Посев</div>
                    <q-table
                        :columns="seedColums"
                        :rows="seedData"
                        row-key="id"
                        flat bordered
                        hide-bottom
                    />
            </div>
            <div class="col-12 col-md-6 q-pl-md">
                <div class="text-h4">Аэрофотоснимки</div>
                <div id="map"></div>
                <div class="text-h6">Дата загрузки фйла</div>
                <div class="text-center q-mt-lg"></div>
                <div class="text-h4 clickable-text" @click="fetchSoilComposition">Агрохимический состав почвы</div>
                    <q-table
                        :columns="compositionColumns"
                        :rows="compositionData"
                        row-key="id"
                        flat bordered
                        hide-bottom
                        v-if="isTableVisible"
                    />
            </div>
        </div>

        <div class="row">
            <div class="col-12 col-md-6" style="height: 400px;">
                <div class="text-h4">Влажность</div>
                    <div class="text-center">100%</div>
                <div class="text-center q-mt-lg"></div>

                <div class="text-h4">Ветер</div>
                    <div class="text-center">1м/с</div>
                <div class="text-center q-mt-lg"></div>
                
                <div class="text-h4">Температура</div>
                    <div>
                        <q-btn toogle-color="primary" @click="toggleChart" label="Переключить" />                       
                    </div>
                    <div>
                        <canvas id="temperature-chart"></canvas>
                    </div>
            </div>
        </div>

        <div class="q-pa-md q-ml-auto">
            <input
                type="file"
                @change="handleFileUpload"
                style="display: none"
                ref="fileInput"
            />
            <q-btn @click="openFileInput" label="загружать" color="primary" />
        </div>
    </div>
</template>

<script>
import { ref, onMounted, reactive, nextTick } from 'vue';
import { Chart, registerables } from 'chart.js';
import { debounce } from 'lodash-es';
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet/dist/leaflet.js";
Chart.register(...registerables);

export default {
    name: 'Filed_info_page',
    setup() {
        const isTableVisible = ref(false);
        const chart = ref(null);
        const isBarChart = ref(true);
        
        //сulture
        const seedData = reactive([
            { start_date: '2020-01-01', 
              end_date: '2020-01-01', 
              culture: 'Пшеница'
            }
        ]);

        //temperature
        const seedColums = reactive([
            { name: 'start_date', required: true, label: 'Дата Начала', align: 'center', field: 'start_date'},
            { name: 'end_date', required: true, label: 'Дата Завершения', align: 'center', field: 'end_date'},
            { name: 'culture', required: true, label: 'Культура', align: 'center', field: 'culture'}
        ]);
        const chartData = reactive({
            labels: ['9/16', '9/17', '9/18', '9/19', '9/20', '9/21', '9/22' ],
            datasets: [{
                label: 'Temperature',
                data: [22, 20, 21, 21, 23, 26, 13],
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
                }
            ] 
        });

        const chartOptions = reactive({
            responsive: true,
            maintainAspectRatio: false
        });

        const initChart = () => {
            const context = document.getElementById('temperature-chart').getContext('2d');
            const chartType = isBarChart.value ? 'bar' : 'line';
            chart.value = new Chart(context, {
                type: chartType,
                data: chartData,
                options: chartOptions
            });
        };

        const toggleChart = debounce(() => {
            isBarChart.value = !isBarChart.value;
            if (chart.value) {
                chart.value.destroy();
                nextTick(() => {
                    nextTick(initChart)
                })
            } else {
                initChart();
            }
        }, 500);

        //button showing chemical element
        const compositionData = ref([]);
        const compositionColumns = ref([
            { name: 'element', label: 'Элемент', field: 'element', align: 'left'},
        ]);

        const fetchSoilComposition = async () => {
            isTableVisible.value = !isTableVisible.value;
            if (isTableVisible.value && compositionData.value.length === 0) {
                try {
                    const url = "backend data";
                    const response = await fetch(url);
                    const data = await response.json();
                    compositionData.value = data;
                } catch (error) {
                    console.error("Error fetching soil composition:", error);
                }
            }
        };

        onMounted(initChart);

        //map
        const map = ref(null);

        onMounted(() => {
        // Создание карты
        map.value = L.map("map").setView([59.420161, 30.01832], 15);

        // Добавление тайлового слоя
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: "Map data &copy; OpenStreetMap contributors",
        }).addTo(map.value);
        });

        return { 
            map,
            seedData,
            seedColums,
            chartData,
            chartOptions,
            chart,
            isBarChart,
            initChart,
            toggleChart,
            compositionColumns,
            compositionData,
            fetchSoilComposition,
            isTableVisible,
        };
    },

    methods:{
    openFileInput() {
      this.$refs.fileInput.click();
    },
    handleFileUpload(event) {
      const selectedFile = event.target.files[0];
      if (selectedFile) {
        console.log("loding file:", selectedFile);
      }
    },
  },
}
</script>

<style>
#map {
    height: 200px;
    width: 600px;
}

.q-table th {
    font-size: 15px !important;
}

.clickable-text {
    z-index:10;
    position: relative;
    cursor:pointer;
    color: black;
    text-decoration: underline;
}

.clickable-text:hover {
    color: darkblue;
}

.row {
    display:flex;
    flex-wrap: wrap;
}

.q-btn {
  margin-right: 10px;
}

input[type="file"] {
  display: none;
}

</style>