<template>
  <q-list separator class="flex-item-fill flex-col relative-position" style="margin-bottom: -8px;">
    <q-toolbar inverted>
      <q-toolbar-title class="q-pl-none">
        {{title}}博文
      </q-toolbar-title>
      <q-btn :icon="previewMode ? 'code' : 'web'" flat color="primary" @click="togglePreview"></q-btn>
      <q-btn icon="close" flat color="primary" @click="cancel" style="height: 100%;"></q-btn>
    </q-toolbar>
    <q-item>
      <q-item-side>标题</q-item-side>
      <q-item-main>
        <q-input hide-underline v-model="post.title"></q-input>
      </q-item-main>
    </q-item>
    <q-item>
      <q-item-side>分类</q-item-side>
      <q-item-main class="row">
        <q-select class="flex-item-fill" hide-underline v-model="post.category.id" :options="categoryOptions"></q-select>
        <q-btn flat round dense size="sm" icon="add" color="primary" @click="newCategory"></q-btn>
      </q-item-main>
    </q-item>
    <q-item>
      <q-item-side>标签</q-item-side>
      <q-item-main class="row">
        <q-chips-input class="flex-item-fill" hide-underline v-model="tags">
          <q-autocomplete :static-data="tagOptions" :min-characters="0" :filter="tagAutocompleteFilter"></q-autocomplete>
        </q-chips-input>
      </q-item-main>
    </q-item>
    <q-item>
      <q-item-side>封面</q-item-side>
      <q-item-main class="flex-row vertical-center">
        <input id="cover-input" type="file" hide-underline v-show="false"/>
        <span v-if="post.cover">{{ post.cover.id }}</span>
        <q-btn flat dense round icon="image" @click="selectCover"></q-btn>
      </q-item-main>
    </q-item>
    <q-item-separator></q-item-separator>
    <q-list-header>{{ previewMode ? "预览" : "正文" }}</q-list-header>
    <q-item class="flex-item-fill flex-col" v-if="!previewMode">
      <post-editor ref="editor" class="post-editor" v-model="post.content" :autofocus="false"></post-editor>
    </q-item>
    <q-item class="flex-item-fill flex-col" v-else style="overflow: auto;">
      <q-item-main v-html="markedContent"></q-item-main>
    </q-item>
    <q-toolbar inverted>
      <q-btn flat icon="check" label="提交" @click="submit"></q-btn>
      <q-btn flat :icon="previewMode ? 'code' : 'web'" :label="previewMode ? '代码' : '预览'" @click="togglePreview"></q-btn>
      <q-btn flat icon="cancel" label="取消" @click="cancel"></q-btn>
    </q-toolbar>
    <q-inner-loading class="editor-spinner" :visible="isUploading">
      <q-spinner-mat :size="50" color="primary"></q-spinner-mat>
    </q-inner-loading>
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
import { Category } from '../model/Category';
import { Picture } from '../model/Picture';


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
  coverFile!: File;
  isUploading = false;

  get title () {
    switch (this.$route.name) {
      case "post-new":
        return "新增"
      case "post-edit":
        return "修改"
      default:
        return "";
    }
  }

  get categoryOptions (): {label: string, value: string}[] {
    console.log(this.$store.state.categories)
    return this.$store.state.categories.map((item: Category) => {
      return {
        label: item.name,
        value: item.id
      }
    });
  }
  
  get tagOptions () {
    return {
      field: 'label',
      list: this.$store.state.tags.map(item => {
        return {
          value: item.name,
          label: item.name
        }
      })
    }
  }

  async newCategory () {
    let name = await this.$q.dialog({
      title: "添加分类",
      message: "请输入分类名称",
      prompt: {
        model: '',
        type: "text"
      }
    });
    this.$store.dispatch("postCategory", name);
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

  onPreviewScroll () {
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

  async uploadPicture (pic: File) {
    try {
      let formData = new FormData();
      formData.append("photos", pic);
      let response = await Axios.post<Picture>(`/api/picture/`, formData);
      if (response.data) {
        return response.data.id as string;
      }
    } catch (error) {
      throw error;
    }
  }

  async submitEditPost () {
    this.isUploading = true;
    try {
      let cover = null;
      if (this.coverFile) {
        cover = await this.uploadPicture(this.coverFile);
      }
      try {
        let response = await Axios.put<Post>(`/api/post/${this.post.id}`, {
          ...this.post,
          cover: cover ? {
            id: cover
          } : undefined,
          tags: this.tags.map(item => {
            return {
              name: item
            }
          }),
        });
        if (response.data) {
          this.isUploading = false;
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
    } catch (error) {
      this.$q.notify({
        message: "图片上传失败",
        type: "negative",
        position: "top"
      });
    }
    this.isUploading = false;
  }

  async submitNewPost () {
    this.isUploading = true;
    try {
      let cover = null;
      if (this.coverFile) {
        cover = await this.uploadPicture(this.coverFile);
      }
      try {
        let response = await Axios.post<Post>("/api/post/", {
          ...this.post,
          cover: cover ? {
            id: cover
          } : undefined,
          tags: this.tags.map(item => {
            return {
              name: item
            }
          })
        });
        if (response.data) {
          this.isUploading = false;
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
    } catch (error) {
      this.$q.notify({
        message: "图片上传失败",
        type: "negative",
        position: "top"
      });
    }
    this.isUploading = false;
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
    } else {
      this.$stopABC();
    }
  }

  async getPost () {
    try {
      let response = await Axios.get<Post>(`/api/post/${this.$route.params.id}/`);
      if (response.data) {
        this.post = response.data;
        this.tags = response.data.tags.map(item => item.name);
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
    let coverInput = document.getElementById("cover-input");
    if (coverInput) {
      let self = this;
      coverInput.onchange = function () {
        let uploadElement = this as any;
        let fileList = uploadElement.files as FileList;
        if (fileList.length) {
          self.coverFile = fileList[0];
        }
      }
    }
  }

  selectCover () {
    let coverInput = document.getElementById("cover-input");
    if (coverInput) {
      console.log("input click");
      coverInput.click();
    }
  }

  beforeRouteEnter (to: Route, from: Route, next: Function) {
    next((vm: Vue) => {
      if (!vm.$store.state.userModule.canEdit) {
        vm.$router.back();
      }
    })
  }

  tagAutocompleteFilter (terms: string, {field, list}: {field: string, list: Array<{[key: string]: string}>}) {
    let self = this;
    return list.filter(item => item[field].includes(terms)).filter(item => self.tags.indexOf(item[field]) < 0);
  }
}
</script>


<style lang="stylus">
.post-editor
  height calc(100vh - 140px)
</style>