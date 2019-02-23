<template>
  <div class="row flex-item-fill gutter-sm">
    <div class="col-lg-9 col-xs-12 flex-col">
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
          <div class="row" slot="right" v-if="$store.state.userModule.canEdit">
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
        <my-post-sidebar class="lt-md"></my-post-sidebar>
      </q-card>
    </div>
    <div class="col-lg-3 gt-md">
      <my-post-sidebar class="stick-top"></my-post-sidebar>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from "vue-property-decorator";
import { Post } from '../model/Post';
import Axios from 'axios';
import PostSideBarComponent from './PostSideBar.vue';
import * as $ from "jquery";
//@ts-ignore
import * as ABCjs from "abcjs";


@Component({
  components: {
    'my-post-sidebar': PostSideBarComponent
  }
})
export default class PostComponent extends Vue {
  post: Post = new Post();

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
        })
      }, 100);
    }
  }

  async getPost () {
    try {
      let response = await Axios.get<Post>(`/api/post/${this.$route.params.id}/`);
      if (response.data) {
        this.post = response.data;
        this.renderContent();
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

  setMarked () {
    let self = this;
    console.log(self.$prism);
  }

  mounted () {
    this.getPost();
    this.setMarked();
  }
}
</script>

<style lang="stylus">
</style>