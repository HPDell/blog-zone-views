import Vue, { ComponentOptions } from "vue";
import Vuex, { Store } from "vuex";
import { State } from "../src/store";

declare module "vue/types/options" {
      interface ComponentOptions<V extends Vue> {
        store?: Store<State>;
      }
    }

declare module "vue/types/vue" {
    interface Vue {
      $store: Store<State>;
    }
  }