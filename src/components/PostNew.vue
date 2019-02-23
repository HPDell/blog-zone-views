<template>
  <q-list separator class="flex-item-fill flex-col" style="margin-bottom: 10px;">
    <q-list-header>新增博文</q-list-header>
    <q-item>
      <q-item-side>标题</q-item-side>
      <q-item-main>
        <q-input hide-underline v-model="post.title"></q-input>
      </q-item-main>
    </q-item>
    <!-- <q-item>
      <q-item-side>分类</q-item-side>
      <q-item-main>
        <q-input hide-underline v-model="category"></q-input>
      </q-item-main>
    </q-item>
    <q-item>
      <q-item-side>标签</q-item-side>
      <q-item-main>
        <q-input hide-underline v-model="tags"></q-input>
      </q-item-main>
    </q-item>
    <q-item>
      <q-item-side>封面</q-item-side>
      <q-item-main>
        <q-input hide-underline v-model="post.cover"></q-input>
      </q-item-main>
    </q-item> -->
    <q-item-separator></q-item-separator>
    <q-list-header>{{ previewMode ? "预览" : "正文" }}</q-list-header>
    <q-item class="flex-item-fill flex-col" v-if="!previewMode">
      <monaco-editor class="flex-item-fill" style="min-height: 40vh;" v-model="post.content"></monaco-editor>
    </q-item>
    <q-item class="flex-item-fill flex-col" v-else>
      <q-scroll-area class="fit">
        <q-item-main v-html="markedContent"></q-item-main>
      </q-scroll-area>
    </q-item>
    <q-toolbar inverted>
      <q-btn flat icon="check" label="提交" @click="submitNewPost"></q-btn>
      <q-btn flat :icon="previewMode ? 'code' : 'web'" :label="previewMode ? '代码' : '预览'" @click="togglePreview"></q-btn>
      <q-btn flat icon="cancel" label="取消" @click="cancelNewPost"></q-btn>
    </q-toolbar>
  </q-list>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator';
import { Post } from '../model/Post';
import MonacoEditorComponent from './MonacoEditor.vue';
import * as $ from "jquery";
import Axios from 'axios';
import { Route } from 'vue-router';
//@ts-ignore
import * as ABCjs from "abcjs";
import 'abcjs/abcjs-midi.css';


Component.registerHooks(["beforeRouteEnter"]);

@Component({
  components: {
    'monaco-editor': MonacoEditorComponent
  }
})
export default class PostNewComponent extends Vue {
  post: Post = new Post();
  category: string = "";
  tags: string[] = [];

  previewMode: boolean = false;

  markedContent: string = "";

  renderContent () {
    if (this.post.content) {
      this.markedContent = this.$marked(this.post.content, {
        sanitize: true
      });
      setTimeout(() => {
        MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
        this.$lazyload();
        this.$previewRefresh();
        this.$prism.highlightAll();
        $("div.abc-container").each((index, element) => {
          //@ts-ignore
          let abcMidi = window.abcMidi;
          if (abcMidi) {
            let source = abcMidi[element.dataset.src];
            ABCjs.renderAbc(element, source, {
              responsive: "resize"
            });
          }
        });
      }, 100);
    }
  }

  async submitNewPost () {
    try {
      let response = await Axios.post<Post>("/api/post/", this.post);
      if (response.data) {
        //@ts-ignore
        this.$router.push({
          name: "post-detail",
          params: {
            id: response.data.id
          }
        })
      }
    } catch (error) {
      this.$q.notify({
        message: "发表博文失败",
        type: "negative",
        position: "top"
      })
    }
  }

  cancelNewPost () {
    this.$router.push({
      name: "posts"
    });
  }

  togglePreview () {
    this.previewMode = !this.previewMode;
    if (this.previewMode) {
      this.renderContent();
    }
  }

  beforeRouteEnter (to: Route, from: Route, next: Function) {
    next((vm: Vue) => {
      console.log("beforeRouteEnter", vm.$store.state.userModule.canEdit)
      if (!vm.$store.state.userModule.canEdit) {
        vm.$router.back();
      }
    })
  }
}
</script>


<style lang="stylus">
</style>