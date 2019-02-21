import Vue from "vue";
import { Store } from "vuex";
import { State } from "../src/store";
import VueRouter, { Route } from "vue-router";
import axios from "axios";
import { DialogConfig, PlatformInterface } from "quasar";

interface VueQuasar {
    dialog: (configObj: DialogConfig) => Promise<void>;
    platform: PlatformInterface;
}

declare module 'vue/types/vue' {
    interface Vue {
        //@ts-ignore
        $store: Store<State>;
        $router: VueRouter;
        $route: Route;
        $q: VueQuasar;
        $previewRefresh: () => void;
    }
}