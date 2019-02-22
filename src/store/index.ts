import Vue from 'vue'
import Vuex from 'vuex'
import { UserState } from './user/state';
import user from './user';

Vue.use(Vuex)

export interface State {
  userModule: UserState
}
/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      userModule: user
    }
  })

  return Store
}
