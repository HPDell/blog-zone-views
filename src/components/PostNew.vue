<template>
  <q-list separator class="flex-item-fill flex-col" style="margin-bottom: -8px;">
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
      <post-editor ref="editor" class="post-editor" v-model="post.content"></post-editor>
    </q-item>
    <q-item class="flex-item-fill flex-col" v-else>
      <q-item-main v-html="markedContent"></q-item-main>
    </q-item>
    <q-toolbar inverted>
      <q-btn flat icon="check" label="提交" @click="submit"></q-btn>
      <q-btn flat :icon="previewMode ? 'code' : 'web'" :label="previewMode ? '代码' : '预览'" @click="togglePreview"></q-btn>
      <q-btn flat icon="cancel" label="取消" @click="cancel"></q-btn>
    </q-toolbar>
  </q-list>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator';
import { Post } from '../model/Post';
import MonacoEditorComponent from './MonacoEditor.vue';
import Axios from 'axios';
import { Route } from 'vue-router';
import MavonEditorComponent from './MavonEditor.vue';


Component.registerHooks(["beforeRouteEnter"]);

@Component({
  components: {
    'post-editor': MavonEditorComponent
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
      console.log(this.markedContent);
      setTimeout(() => {
        MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
        this.$lazyload();
        this.$previewRefresh();
        this.$prism.highlightAll();
        this.$renderABC()
      }, 100);
    }
  }

  onPreviewScroll () {
    console.log("preview scroll")
    this.$lazyload();
  }

  async submit () {
    switch (this.$route.name) {
      case "post-new":
        await this.submitNewPost();
        break;
      case "post-edit":
        await this.submitEditPost();
        break;
      default:
        this.$q.notify({
          message: "无效的操作",
          type: "negative",
          position: "top"
        });
        break;
    }
  }

  async submitEditPost () {
    try {
      let response = await Axios.put<Post>(`/api/post/${this.post.id}`, this.post);
      if (response.data) {
        this.$router.push({
          name: "post-detail",
          params: {
            id: response.data.id
          }
        })
      }
    } catch (error) {
      this.$q.notify({
        message: "修改博文失败",
        type: "negative",
        position: "top"
      })
    }
  }

  async submitNewPost () {
    try {
      let response = await Axios.post<Post>("/api/post/", this.post);
      if (response.data) {
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

  cancel () {
    switch (this.$route.name) {
      case "post-new":
        this.cancelNewPost();
        break;
      case "post-edit":
        this.cancelEditPost();
        break;
      default:
        this.$q.notify({
          message: "无效的操作",
          type: "negative",
          position: "top"
        });
        break;
    }
  }

  cancelEditPost () {
    this.$router.push({
      name: "post-detail",
      params: {
        id: this.post.id
      }
    });
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

  async mounted () {
    if (this.$route.name === "post-edit") {
      await this.getPost();
      let editor = this.$refs.editor as MonacoEditorComponent;
      if (editor) {
        //@ts-ignore
        editor.setValue(this.post.content);
      }
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
.post-editor
  height calc(100vh - 140px)
</style>