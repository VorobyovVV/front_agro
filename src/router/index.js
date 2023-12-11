import { route } from 'quasar/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'
import { userStore } from 'src/usage';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */
let routerinstance = null;

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE)
  })

  routerinstance = Router;  //continue working with the same
  // each time link changes =>
  // routerinstance.beforeEach(async (to, from) => {
  //   if (
  //     // make sure the user is authenticated
  //     !userStore.isAuthorized() &&
  //     // ❗️ Avoid an infinite redirect
  //     to.name !== "login" &&
  //     to.name !== "reg" &&
  //     to.name !== 'entry'
  //   ) {
  //     console.log(to, from);
  //     // redirect the user to the login page
  //     return { name: "login" };
  //   }
  // });

  routerinstance.beforeEach(async (to, from, next) => {
    if (
      // make sure the user is authenticated
      !userStore.isAuthorized() &&
      // ❗️ Avoid an infinite redirect
      to.name !== "login" &&
      to.name !== "reg" &&
      to.name !== 'entry'
    ) {
      // Check if the user's authorization can be verified
      await userStore.init();
      if (!userStore.isAuthorized()) {
        // If the user is not authorized, redirect to the login page
        next({ name: "login" });
        return;
      }
    }
    // Continue navigation if the user is authorized
    next();
  });


  return Router
})

export { routerinstance };