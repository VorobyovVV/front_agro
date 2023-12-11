<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-secondary">
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" color="primary" />

        <q-toolbar-title class="my-title">
          {{ pageTitle }}
        </q-toolbar-title>

        <q-avatar icon="account_circle" size="xl" font-size="50px" text-color="primary">
          <q-menu>
            <q-list>
              <q-item clickable v-close-popup @click="goToWoker">
                <q-item-section>Работник</q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="goToOrganization">
                <q-item-section>Организация</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-avatar>

      </q-toolbar>
    </q-header>


    <q-drawer :model-value="true" show-if-above :mini="miniOpen" bordered class="bg-primary text-white" :width="240"
      behavior="desktop">

      <q-list>
        <q-item>
          <q-item-section>
            <q-item-label class="label">Agroprom</q-item-label>
          </q-item-section>
        </q-item>

        <EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref, watch, onMounted } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import { useRoute } from 'vue-router'


const linksList = [
  {
    title: 'Карта',
    icon: 'o_map',
    link: '/map'
  },

  {
    title: 'Культуры',
    icon: 'o_spa',
    link: '/culture'
  },

  {
    title: 'Севооборот',
    icon: 'o_compost',
    link: '/rotation'
  },

  {
    title: 'Сотрудники',
    icon: 'o_manage_accounts',
    link: '/workers'
  },

  {
    title: 'Настройки',
    icon: 'o_settings',
    link: '/settings'
  },

  {
    title: 'Выход',
    icon: 'o_logout',
    link: '/'
  },
]

export default {
  name: 'MainLayout',

  components: {
    EssentialLink
  },


  methods: {
    goToWoker() {
      this.$router.push('/worker_info');
    },
    goToOrganization() {
      this.$router.push('/organization_info');
    },
  },


  setup() {
    const route = useRoute();
    const miniOpen = ref(false);
    const pageTitle = ref('');

    const setPageTitle = (linkTitle) => {
      pageTitle.value = linkTitle;
      document.title = linkTitle; // Обновляем заголовок страницы
    };

    onMounted(() => {
      updatePageTitle();
    });

    watch(() => route.path, () => {
      updatePageTitle();
    });

    const updatePageTitle = () => {
      const foundLink = linksList.find(link => link.link === route.path);
      if (foundLink) {
        if (foundLink.title === 'Сотрудники') {
          setPageTitle('Мои сотрудники');
        } else {
          setPageTitle(foundLink.title);
        }
      }
    };

    // const handleAction = (action) => {
    //   if (action === 'logout') {
    //     userStore.clearAll();
    //     router.push('/'); // Переход на главную страницу после выхода
    //   }
    // };

    return {
      essentialLinks: linksList,
      miniOpen,
      pageTitle,
      toggleLeftDrawer() {
        miniOpen.value = !miniOpen.value;
      },
      // handleLogout
    };
  }
}
</script>


<style scoped>
.label {
  font-size: 22px;
  font-family: Arial;
}

.my-title {
  color: #151C28;
}
</style>