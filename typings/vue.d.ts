import Vue from "vue";
import { Store } from "vuex";
import { State } from "../src/store";
import VueRouter, { Route } from "vue-router";
import axios from "axios";
import { DialogConfig, PlatformInterface } from "quasar";

interface VueQuasar {
    dialog: (configObj: DialogConfig) => Promise<void>;
    platform: PlatformInterface;
    notify: (config: any) => Function;
}

interface PostMenuItem {
    id: string;
    text: string;
    children: Array<PostMenuItem>;
}

declare module 'vue/types/vue' {
    interface Vue {
        //@ts-ignore
        $store: Store<State>;
        $router: VueRouter;
        $route: Route;
        $q: VueQuasar;
        $previewRefresh: () => void;
        $prism: {
            highlight: (text: string, grammar: Prism.LanguageDefinition, language?: Prism.LanguageDefinition) => string;
            languages: Prism.LanguageMap;
            highlightAll: () => any;
            highlightElement: (element: Element, async?: boolean, callback?: (element: Element) => void) => void;
        };
        $marked: (src: string, options: marked.MarkedOptions, callback?: (error: any | undefined, parseResult: string) => void) => string;
        $markedRenderer: marked.Renderer;
        $lazyload: () => void;
        $renderABC: () => void;
        $stopABC: () => void;
        $simpleMDE: (config: any) => SimpleMDE;
        $package: any;
        $postMenu: PostMenuItem;
    }
}

interface Window {
    abcMidi: any;
}