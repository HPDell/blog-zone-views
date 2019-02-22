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
      <q-btn flat icon="check" :label="previewMode ? '代码' : '预览'" @click="previewMode = !previewMode"></q-btn>
    </q-toolbar>
  </q-list>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator';
import { Post } from '../model/Post';
import MonacoEditorComponent from './MonacoEditor.vue';

import * as hljs from "highlight.js";
import "highlight.js/styles/github.css";
import * as marked from "marked";
import Axios from 'axios';
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

  get markedContent () {
    if (this.post.content) {
      return marked(this.post.content, {
        sanitize: true
      });
    } else {
      return "";
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
      
    }
  }

  cancelNewPost () {
    this.$router.push({
      name: "posts"
    });
  }
}
</script>


<style lang="stylus">
h1
  font-size: 1.6em

h2 
  font-size 1.4em

h3 
  font-size 1.2em

h4 
  font-size 1.1em

h5 
  font-size 1.0em

h6 
  font-size 1.0em

h1, h2, h3, h4, h5, h6, ul, ol, dl 
  margin 0.5em 0em;
  outline none;
  border 0;

blockquote 
  border-left 3px #027be3 solid;
  margin 0.5em 0em;
  font-size 1em;

blockquote > p 
  margin 0px;
  line-height 1.5;
  font-size 1em;

h1, h2, h3, h4, h5, h6 
  line-height 1.35;

h1, h2, h3, h4, h5 
  font-weight bold;

p 
  line-height 1.5;
  margin 1em 0em;
</style>