<template>
  <div class="row">
    <q-btn style="background-color: #1b2332;" text-color="white" size="md" class="q-ma-sm col-auto"
      @Click="dialogOpen = true">Добавить</q-btn>
    <q-btn style="background-color: #1b2332;" text-color="white" size="md" class="q-ma-sm col-auto"
      @Click="dialogOpen = true">Редактировать</q-btn>
    <q-btn style="background-color: #1b2332;" text-color="white" size="md" class="q-ma-sm col-auto">Удалить</q-btn>

    <q-dialog v-model="dialogOpen" persistent>
      <q-card class="q-ma-sm">
        <q-card-section>
          <q-input filled label="Email" type="email" class="q-ma-md" v-model="userData.email" clearable></q-input>
          <div class="row">
            <q-input filled label="Логин" class="q-mx-md col" v-model="userData.login" clearable></q-input>
            <q-input filled label="Пароль" type="password" class="q-mx-md col" v-model="userData.password"
              clearable></q-input>
          </div>
          <q-input filled label="Фамилия" class="q-ma-md" v-model="userData.surname" clearable></q-input>
          <q-input filled label="Имя" class="q-ma-md" v-model="userData.name" clearable></q-input>
          <q-input filled label="Отчество" class="q-ma-md" v-model="userData.patronymic" clearable></q-input>
          <q-input filled label="Роль" class="q-ma-md" v-model="userData.role" clearable></q-input>
        </q-card-section>
        <q-card-actions align="right" class="q-ma-md"> <q-btn class="q-mr-lg" flat @Click="cancel">Отмена</q-btn><q-btn
            style="background-color: #1b2332;" text-color="white" class="q-ml-lg"
            @Click="addUser">Подтвердить</q-btn></q-card-actions>
      </q-card>
    </q-dialog>
  </div>
  <div class="q-mx-sm">
    <q-table :rows="rows" :columns="columns" row-key="name" @row-click="deleteRow">
    </q-table>
  </div>
</template>

<script>
import { reactive, ref } from 'vue'
// здесь все, что в миро написано, можно будет просто удалить ненужное / добавить нужное
const columns = [
  { name: 'id', required: true, label: "id", align: 'center', field: 'id', sortable: true, style: "width:50px" },  // serial
  { name: 'user_id', required: true, label: "user_id", align: 'center', field: 'user_id', sortable: true, style: "width:60px" }, // int
  { name: 'name', required: true, label: "Имя", align: 'center', field: 'name', sortable: true }, // string
  { name: 'surname', required: true, label: "Фамилия", align: 'center', field: 'surname', sortable: true }, // string
  { name: 'patronymic', label: "Отчество", align: 'center', field: 'patronymic', sortable: true }, // string
  { name: 'role', required: true, label: "Роль", align: 'center', field: 'role', sortable: true }, // string
  { name: 'date_of_birth', required: true, label: "Дата", align: 'center', field: 'date_of_birth', sortable: true }, // date
  { name: 'phone_number', required: true, label: "Номер телефона", align: 'center', field: 'phone_number', sortable: true }, // string
]


export default {
  setup() {
    const rows = ref([]);
    const dialogOpen = ref(false);
    function deleteRow(event, row, idx) {
      console.log(idx); // что делать в БД дальше, либо перезапись либо удаление ?
    }

    const userData = reactive({ email: '', login: '', password: '', surname: '', name: '', patronymic: '', role: '' });

    function addUser() {

      console.log(userData);
      if (!userData.email.trim() || !userData.login.trim() || !userData.name.trim() || !userData.password.trim() || !userData.patronymic.trim() || !userData.role.trim() || !userData.surname.trim()) {
        throw new Error('не все данные введены');
      }
      dialogOpen.value = false;
    }

    function cancel() {
      dialogOpen.value = false;
    }
    return {
      columns, rows, deleteRow, dialogOpen, addUser, cancel, userData
    }
  },
}
</script>