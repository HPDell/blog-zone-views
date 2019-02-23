<template>
  <q-item multiline>
    <q-item-side>
      <q-item-tile avatar>
        <img src="/login/avatar/avatar.jpg" alt="">
      </q-item-tile>
    </q-item-side>
    <q-item-main>
      <q-item-tile sublabel class="q-mb-sm non-selectable">
        <span class="q-mr-md">HPDell</span>
        <span>{{ dateString(saying.sayingDate) }}</span>
      </q-item-tile>
      <div v-html="markedSaying" class="q-pb-md"></div>
      <q-item-tile class="row gutter-sm">
        <div class="col-4" v-for="pic in saying.pictures" :key="pic.id">
          <img :src="`/api/picture/${pic.id}`" :preview="saying.id" style="width: 100%;">
        </div>
      </q-item-tile>
      <q-item-tile sublabel class="q-px-none">
        <q-btn flat dense icon="thumb_up" size="md" color="primary" label="0" class="on-left"></q-btn>
        <q-btn flat dense icon="comment" size="md" color="secondary" label="0" class="on-left"></q-btn>
        <q-btn flat dense icon="delete" size="md" color="negative" class="float-right" @click="deleteSaying" v-if="$store.state.userModule.canEdit"></q-btn>
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

  markedSaying: string = "";

  renderContent () {
    if (this.saying.content) {
      this.markedSaying = this.$marked(this.saying.content, {
        sanitize: true
      });
      setTimeout(() => {
        MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
        this.$prism.highlightAll();
      }, 100);
    }
  }

  async getSaying () {
    try {
      let response = await Axios.get<Saying>(`/api/saying/${this.id}/`);
      if (response.data) {
        this.saying = response.data;
        this.renderContent();
        this.$previewRefresh()
      }
    } catch (error) {
      this.$q.notify({
        message: `获取微文 ${this.id} 失败`,
        type: "negative",
        position: "top"
      });
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

<style lang="stylus">
</style>