import Vue from 'vue'
import Vuex from 'vuex'
import user from './user';
import state, { StoreState } from './state';
import * as mutations from './mutations';
import * as actions from './actions';
import { UserState } from './user/state';

export interface State extends StoreState {
  userModule: UserState;
}

Vue.use(Vuex)

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      userModule: user
    },
    state: state,
    mutations: mutations,
    actions: actions
  })

  return Store
}
