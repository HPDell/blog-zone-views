import Vue from 'vue'
import VueRouter, { Route } from 'vue-router'

import routes from './routes'
import { Position } from 'vue-router/types/router';

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

export default function (/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: (to: Route, from: Route, savedPosition: void | Position) => ({ y: 0, x: 0 }),
    routes,

    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: "history",
    base: process.env.VUE_ROUTER_BASE
  })

  return Router
}
