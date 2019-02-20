<template>
  <div class="row flex-item-fill gutter-sm">
    <div class="col-9 flex-col">
      <q-scroll-area class="flex-item-fill">
        <q-card square flat>
          <q-card-media class="non-selectable" v-if="post.cover">
            <img :src="post.cover" alt="">
          </q-card-media>
          <q-card-title>
            {{ post.title }}
            <div class="row" slot="subtitle">
              <span class="q-mr-lg"><q-icon class="q-mr-sm" name="person"></q-icon>HPDell</span>
              <!-- <span class="q-mr-lg"><q-icon class="q-mr-sm" name="tag"></q-icon>观后感</span>
              <span class="q-mr-lg"><q-icon class="q-mr-sm" name="category"></q-icon>随笔</span> -->
            </div>
            <div class="row" slot="right">
              <q-btn icon="edit" flat round dense class="float-right" color="primary"></q-btn>
              <q-btn icon="delete" flat round dense class="float-right" color="negative" @click="deletePost"></q-btn>
            </div>
          </q-card-title>
          <q-card-main v-html="markedContent"></q-card-main>
          <q-card-separator v-if="post.comments"></q-card-separator>
          <q-list no-border multiline link class="non-selectable" v-if="post.comments">
            <q-list-header>评论</q-list-header>
            <q-item>
              <q-item-side>
                <q-item-tile>HPDell</q-item-tile>
              </q-item-side>
              <q-item-main>
                在所有流失风景与人群中，你对我最好。
              </q-item-main>
            </q-item>
          </q-list>
        </q-card>
      </q-scroll-area>
    </div>
    <div class="col-3">
      <q-list no-border>
        <q-list-header>分类</q-list-header>
        <q-list-header>标签</q-list-header>
      </q-list>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from "vue-property-decorator";
import { Post } from '../model/Post';
import Axios from 'axios';

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

@Component
export default class PostComponent extends Vue {
  post: Post = new Post();

  get markedContent () {
    if (this.post.content) {
      return marked(this.post.content, {
        sanitize: true
      });
    } else {
      return "";
    }
  }

  async getPost () {
    try {
      let response = await Axios.get<Post>(`/api/post/${this.$route.params.id}/`);
      if (response.data) {
        this.post = response.data;
      }
    } catch (error) {
      console.log("getSaying error:", error);
    }
  }

  async deletePost () {
    try {
      let response = await Axios.delete(`/api/post/${this.$route.params.id}/`);
      this.$router.push({
        name: "posts"
      });
    } catch (error) {
      
    }
  }

  mounted () {
    this.getPost();
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