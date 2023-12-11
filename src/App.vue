<template>
  <q-dialog v-model="errorShow">
    <q-card style="width: 300px">
      <q-card-section>
        <div class="text-h6 text-bold">Ошибка</div>
      </q-card-section>

      <q-card-section class="q-pt-none" style="white-space: pre-line;">{{ error }}</q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="OK" color="primary" @click="closeError" />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <router-view v-if="isInit" />
  <div v-else>not Initialized</div>
</template>

<script>
import { ref, watch } from "vue";
import { userStore } from "./usage";
import { onBeforeMount } from "vue";
// import { postinter } from "./axiosRequest";
import { useRoute } from "vue-router";

export default {
  setup() {
    const isInit = ref(userStore.getIsInitialized());
    const errorShow = ref(false);
    const error = ref(null);
    const route = useRoute();
    function closeError() {
      userStore.setError(null);
      errorShow.value = false;
    }

    watch(
      () => userStore.getError(),
      (val) => {
        console.log(val);
        error.value = val;
        if (val !== null) {
          errorShow.value = true;
        }
      },
    );
    watch(
      () => userStore.getIsInitialized(),
      (val) => {
        isInit.value = val;
      }
    )
    onBeforeMount(() => {
      userStore.init()
        // .then(() => {
        //   if (route.name !== 'entry') {
        //     return postinter();
        //   }
        // })
        .then(() => {
          console.log('done');
        })
        .catch((error) => {
          console.error(error);
        })
    })
    return { errorShow, error, closeError, isInit }
  }
}
</script>