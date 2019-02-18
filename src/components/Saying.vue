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
        <span>2019年2月3日</span>
      </q-item-tile>
      <q-item-tile>
        {{ saying.content }}
      </q-item-tile>
      <q-item-tile v-if="saying.comments">
        <my-saying-comment></my-saying-comment>
      </q-item-tile>
    </q-item-main>
    <q-item-side right>
      <div class="row">
        <q-btn flat round icon="thumb_up" size="md"></q-btn>
      </div>
      <div class="row">      
        <q-btn flat round icon="comment" size="md"></q-btn>
      </div>
    </q-item-side>
  </q-item>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from "vue-property-decorator";
import SayingCommentComponent from './SayingComment.vue';

import Axios from 'axios';

class Saying {
  content: string;
}

@Component({
  components: {
    "my-saying-comment": SayingCommentComponent
  }
})
export default class SayingComponent extends Vue {
  @Prop(String) id: string;

  saying: Saying = new Saying();

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

  async mounted () {
    await this.getSaying();
  }
}
</script>


<style>
</style>
