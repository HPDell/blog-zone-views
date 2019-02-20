<template>
  <q-item multiline>
    <q-item-side>
      <q-item-tile avatar>
        <img src="statics/quasar-logo.png" alt="">
      </q-item-tile>
    </q-item-side>
    <q-item-main>
      <q-item-tile sublabel class="q-mb-sm non-selectable">
        <span class="q-mr-md">HPDell</span>
        <span>{{ dateString(saying.sayingDate) }}</span>
      </q-item-tile>
      <q-item-tile v-html="markedSaying"></q-item-tile>
      <q-item-tile class="q-my-sm">
        <q-btn flat dense icon="thumb_up" size="small" color="primary" label="0" class="on-left"></q-btn>
        <q-btn flat dense icon="comment" size="small" color="secondary" label="0" class="on-left"></q-btn>
        <q-btn flat dense icon="delete" size="small" color="negative" class="float-right" @click="deleteSaying"></q-btn>
      </q-item-tile>
      <q-item-tile v-if="saying.comments && saying.comments.length">
        <my-saying-comment></my-saying-comment>
      </q-item-tile>
    </q-item-main>
  </q-item>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from "vue-property-decorator";
import SayingCommentComponent from './SayingComment.vue';
import Axios from 'axios';
import * as moment from "moment";
import * as hljs from "highlight.js";
import "highlight.js/styles/github.css";
import * as marked from "marked";
marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  highlight: function (code: string, lang: string) {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(lang, code, true).value;
    } else {
      return hljs.highlightAuto(code).value;
    }
  }
});

import { Saying } from "../model/Saying";

@Component({
  components: {
    "my-saying-comment": SayingCommentComponent
  }
})
export default class SayingComponent extends Vue {
  @Prop(String) id: string;

  saying: Saying = new Saying();

  get dateString () {
    return function (date: Date) {
      return moment(date).format("YYYY年MM月DD日 HH:mm")
    }
  }

  get markedSaying () {
    if (this.saying.content) {
      return marked(this.saying.content, {
        sanitize: true
      });
    } else {
      return "";
    }
  }

  async getSaying () {
    try {
      let response = await Axios.get<Saying>(`/api/saying/${this.id}/`);
      if (response.data) {
        this.saying = response.data;
      }
    } catch (error) {
      console.log("getSaying error:", error);
    }
  }

  async deleteSaying () {
    try {
      let response = await Axios.delete(`/api/saying/${this.id}/`);
      this.$emit("saying-deleted");
    } catch (error) {
      
    }
  }

  async mounted () {
    await this.getSaying();
  }
}
</script>

<style scoped>
h1 {
  font-size: 1.6em;
}

h2 {
  font-size: 1.4em;
}

h3 {
  font-size: 1.2em;
}

h4 {
  font-size: 1.1em;
}

h5 {
  font-size: 1.0em;
}

h6 {
  font-size: 1.0em;
}

h1, h2, h3, h4, h5, h6, blockquote, p, ul, ol, dl {
  margin: 0.5em 0em;
  outline: none;
  border: 0;
}

h1, h2, h3, h4, h5, h6 {
  line-height: 1.35;
}

h1, h2, h3, h4, h5 {
  font-weight: bold;
}
</style>
