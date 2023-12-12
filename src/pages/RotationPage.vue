<template v-for="row in rows" :key="`${row.id}-${row.filed_id}`">
    <div class="q-pa-md">
      <q-input v-model="startDate" placeholder="Дата Начала">
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy ref="qDateProxyStart" transition-show="scale" transition-hide="scale">
            <q-date v-model="startDate" @input="() => $refs.qDateProxyStart.hide()" />
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>

    <q-input v-model="endDate" placeholder="Дата Завершения">
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy ref="qDateProxyEnd" transition-show="scale" transition-hide="scale">
            <q-date v-model="endDate" :min="startDate" @input="() => $refs.qDateProxyEnd.hide()" />
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>

    <q-table
      class="virtscroll-table"
      virtual-scroll
      flat bordered
      v-model:pagination="pagination"
      :rows-per-page-options="[0]"
      :virtual-scroll-sticky-size-start="48"
      column-key="label"
      :rows="filteredRows"
      :columns="columns"
    />
  </div>
</template>

<script>
import { ref, computed, watchEffect } from 'vue'

export default {
  setup () {
    const startDate = ref('')
    const endDate = ref('')

    const columns = [
      { name: 'id', 
        label: 'ID', 
        required: true, 
        align: 'center', 
        field: 'id', 
        sortable: true,
      },
      { name: 'culture', label: 'Культура', align: 'center', field: 'culture', sortable: true },
      { name: 'crop_id', label: 'ID Поля Размещения', align: 'center', field: 'crop_id' },
      { name: 'field_area', label: 'Площадь Поля', align: 'center', field: 'field_area' },
      { name: 'start_time', label: 'Дата Начала', align: 'center', field: 'start_time' },
      { name: 'end_time', label: 'Дата Завершения', align: 'center', field: 'end_time' }
    ]
    const seed = [
      { 
        id: 5, 
        filed_id : 78, 
        crop_id: 12, 
        start_time: '2023-04-05',
        end_time: '2023-04-07',
        description: 'Ice cream'
      },
      { 
        id: 12, 
        filed_id : 178, 
        crop_id: 142, 
        start_time: '2023-01-05',
        end_time: '2023-03-20',
        description: 'Ice cream'
      },
      { 
        id: 2, 
        filed_id : 8, 
        crop_id: 10, 
        start_time: '2023-05-05',
        end_time: '2023-07-03',
        description: 'Ice cream'
      },
      { 
        id: 7, 
        filed_id : 48, 
        crop_id: 1, 
        start_time: '2021-03-07',
        end_time: '2023-08-07',
        description: 'Ice cream'
      },
      { 
        id: 7, 
        filed_id : 721, 
        crop_id: 17, 
        start_time: '2013-04-05',
        end_time: '2013-04-07',
        description: 'Ice cream'
      }
    ]
    let rows = [];
    let uniqueId = 0;
    for (let i = 0; i < 1000; i++) {
      seed.forEach(r => {
        rows.push({ 
          ...r, 
          id: uniqueId, 
          filed_id: uniqueId + 100 
        });
        uniqueId++;
      });
    }
    watchEffect(() => {
      console.log('Current dates:', startDate.value, endDate.value);
    });

    const filteredRows = computed(() => {
      const start = startDate.value ? new Date(startDate.value.replace(/\//g, '-')).getTime() : -Infinity
      const end = endDate.value ? new Date(endDate.value.replace(/\//g, '-')).getTime() : Infinity

      return rows.filter(row => {
        const rowStart = new Date(row.start_time).getTime()
        const rowEnd = new Date(row.end_time).getTime()
        return rowStart >= start && rowEnd <= end
      })
    });

    return {
      columns,
      rows: rows,
      filteredRows,
      startDate,
      endDate,
      pagination: ref({ rowsPerPage: 1000 })
    }
  }
}


</script>

<style lang="scss">
.virtscroll-table {

  max-width: 100%;
  margin-top: 50px;
  margin-bottom: 50px;
  margin-left: auto;
  margin-right: auto;
  width: auto;

  .q-table th {
    font-size: 20px !important;
  }
  .q-table td {
    font-size: 15px !important;
  }

}

@media (max-width: 768px) {
  .q-table th {
    font-size: 20px !important;
  }
  .q-table td {
    font-size: 15px !important;
  }
  .virtscroll-table {
    margin-top: 20px;
    margin-bottom: 20px;
  }
}
</style>
