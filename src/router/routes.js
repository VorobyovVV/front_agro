import { userStore } from "src/usage";

const routes = [
  {
    path: "/",
    component: () => import("layouts/EmptyLayout.vue"),
    children: [
      {
        path: "/",
        name: "entry",
        component: () => import("pages/EntryPage.vue"),
      },
      {
        path: "reg",
        name: "reg",
        component: () => import("src/pages/RegPage.vue"),
      },

      {
        path: "login",
        name: "login",
        component: () => import("src/pages/LoginPage.vue"),
      },
    ],
  },
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "map",
        name: "map",
        component: () => import("pages/MapPage.vue"),
      },
      {
        path: "culture",
        name: "culture",
        component: () => import("pages/CulturePage.vue"),
      },
      {
        path: "rotation",
        name: "rotation",
        component: () => import("pages/RotationPage.vue"),
      },
      {
        path: "workers",
        name: "workers",
        component: () => import("pages/WorkerPage.vue"),
        beforeEnter: (to, from) => {
          if (userStore.getState().role !== 'organization') {
            return false;
          }
        }
      },
      {
        path: "settings",
        name: "settings",
        component: () => import("pages/SettingsPage.vue"),
      },
      {
        path: "profile_info",
        name: "profile_info",
        component: () => import("pages/Profile_info_page.vue")
      },
      {
        path: "field_information",
        name: "field_information",
        component: () => import("pages/Field_info_page.vue")
      }
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
