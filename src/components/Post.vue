<template>
  <div class="row flex-item-fill gutter-sm">
    <div class="col-lg-9 col-xs-12 flex-col q-mt-sm">
      <q-card square flat>
        <q-card-media class="non-selectable" v-if="post.cover">
          <img :src="`/api/picture/${post.cover.id}`" alt="">
        </q-card-media>
        <div class="flex-row">
          <div class="flex-col justify-center">
            <q-btn icon="arrow_back" flat color="primary" @click="backToPostList" style="height: 100%;"></q-btn>
          </div>
          <q-card-title class="flex-item-fill q-pl-none">
            {{ post.title }}
            <div class="flex-row vertical-center q-pt-sm" slot="subtitle">
              <div>
                <span><q-icon size="14pt" class="q-mr-sm" name="person"></q-icon></span>
                <span class="q-mr-lg">HPDell</span>
              </div>
              <div>
                <span><q-icon size="14pt" class="q-mr-sm" name="category"></q-icon></span>
                <span class="q-mr-lg">{{ post.category.name }}</span>
              </div>
              <!-- <div class="flex-item-fill">
                <span><q-icon class="q-mr-sm" name="tag"></q-icon></span>
                <span class="q-mr-lg">{{ post.tags.map(item => item.name).join(", ") }}</span>
              </div> -->
            </div>
            <div class="row" slot="right" v-if="$store.state.userModule.canEdit">
              <q-btn icon="edit" flat round dense class="float-right" color="primary" @click="editPost"></q-btn>
              <q-btn icon="delete" flat round dense class="float-right" color="negative" @click="deletePost"></q-btn>
            </div>
          </q-card-title>
        </div>
        <q-card-main v-html="markedContent" style="overflow: auto;"></q-card-main>
        <q-card-separator v-if="post.comments"></q-card-separator>
        <my-post-comment v-if="post.comments" :comments="post.comments" :postID="post.id"></my-post-comment>
        <my-post-sidebar class="lt-md" :postTOC="postTOC" :postCategory="post.category" :postTags="post.tags"></my-post-sidebar>
      </q-card>
    </div>
    <div class="col-lg-3 col gt-md flex-row">
      <my-post-sidebar :postTOC="postTOC" :postCategory="post.category" :postTags="post.tags"></my-post-sidebar>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from "vue-property-decorator";
import { Post } from '../model/Post';
import Axios from 'axios';
import PostSideBarComponent from './PostSideBar.vue';
import { PostMenuItem } from '../../typings/vue';
import PostCommentComponent from './PostComment.vue';

@Component({
  components: {
    'my-post-sidebar': PostSideBarComponent,
    'my-post-comment': PostCommentComponent,
  }
})
export default class PostComponent extends Vue {
  post: Post = new Post();
  postTOC: PostMenuItem = {
    id: "root",
    text: "",
    children: []
  };
  markedContent: string = "";

  
  public get editable() : boolean {
    return this.post.editable;
  }
  

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
        this.$renderABC()
      }, 100);
    }
  }

  backToPostList () {
    this.$router.push({
      name: "posts",
      params: {
        id: this.$route.params.id
      }
    })
  }

  async getPost () {
    try {
      let response = await Axios.get<Post>(`/api/post/${this.$route.params.id}/`);
      if (response.data) {
        this.post = response.data;
        this.renderContent();
      }
    } catch (error) {
      console.log("getPost error:", error);
        this.$q.notify({
          message: "获取文章失败",
          type: "negative"
        })
    }
  }

  async deletePost () {
    try {
      await this.$q.dialog({
        title: "确定删除博文？",
        message: "此操作不可恢复",
        cancel: true
      });
      try {
        let response = await Axios.delete(`/api/post/${this.$route.params.id}/`);
        this.$router.push({
          name: "posts"
        });
      } catch (error) {
        this.$q.notify({
          message: "删除博文失败",
          type: "negative",
          position: "top"
        })
      }
    } catch (error) {
        this.$q.notify({
          message: "已取消删除",
          type: "positive"
        })
    }
  }

  editPost () {
    this.$router.push({
      name: "post-edit",
      params: {
        id: this.$route.params.id
      }
    })
  }

  setMarked () {
    let self = this;
    let render = this.$markedRenderer;
    render.heading = function (text, level, raw, slugger) {
      let postTOC = self.postTOC;
      let id = slugger.slug(text);
      let curLevel = 1;
      let parentHeader = postTOC;
      while (curLevel < level) {
        parentHeader = parentHeader.children[parentHeader.children.length - 1];
        curLevel = curLevel + 1;
      }
      if (parentHeader) {
        parentHeader.children.push({
          id: id,
          text: text,
          children: []
        });
      };
      self.postTOC = postTOC;
      return `
        <h${level} id="${id}">${text}</h${level}>
      `
    };
    
  }

  mounted () {
    this.setMarked();
    this.getPost();
  }

  beforeDestroy () {
    this.$stopABC();
  }
}
</script>

<style lang="stylus">
.q-card-title
  line-height 1.35rem
</style>