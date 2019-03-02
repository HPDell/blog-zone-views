<template>
  <div id="container" class="flex-item-fill">
    <q-list no-border>
      <q-toolbar inverted color="primary">
        <q-toolbar-title class="q-pl-none">{{$package.meta.owner}} 的博文</q-toolbar-title>
        <q-btn flat round icon="add" :to="{'name': 'post-new'}" v-if="$store.state.userModule.canEdit"></q-btn>
        <q-btn flat round icon="settings" :to="{'name': 'post-setting'}" v-if="$store.state.userModule.canEdit"></q-btn>
      </q-toolbar>
    </q-list>
    <div>
      <q-list no-border class="q-pa-none">
        <q-item multiline class="q-py-none">
          <q-item-side style="line-height: 2.1rem;">分类</q-item-side>
          <q-item-main style="line-height: 2.1rem;">
            <q-btn class="q-mr-xs q-px-sm" dense rounded style="line-height: 1rem;"
                   :outline="categorySelected !== ''"
                   :label="`全部（${postList.length}）`" 
                   color="primary" size="md" 
                   :to="{'name': 'posts'}"></q-btn>
            <q-btn v-for="category in categoryOptions" :key="`category-${category.id}`" 
                   class="q-mr-xs q-px-sm" dense rounded style="line-height: 1rem;"
                   :outline="category.id !== categorySelected"
                   :label="`${category.name}（${category.postNums}）`" 
                   color="primary" size="md" 
                   :to="{'name': 'posts', 'query': {'category': category.name}}"></q-btn>
          </q-item-main>
        </q-item>
        <q-item multiline class="q-py-none">
          <q-item-side style="line-height: 2.1rem;">标签</q-item-side>
          <q-item-main style="line-height: 2.1rem;">
            <q-btn class="q-mr-xs q-px-sm" dense rounded style="line-height: 1rem;"
                   :outline="tagSelected !== ''"
                   :label="`全部（${postList.length}）`" 
                   color="primary" size="md" 
                   :to="{'name': 'posts'}"></q-btn>
            <q-btn v-for="tag in tagOptions" :key="`tag-${tag.id}`" 
                   class="q-mr-xs q-px-sm q-md-sm" dense rounded style="line-height: 1rem;"
                   :outline="tag.id !== tagSelected"
                   :label="`${tag.name}（${tag.postNums}）`" 
                   color="primary" size="md" 
                   :to="{'name': 'posts', 'query': {'tag': tag.name}}"></q-btn>
          </q-item-main>
        </q-item>
      </q-list>
      <div class="row gt-xs">
        <div class="col-xl-4 col-sm-6 col-xs-12 q-pa-xs" v-for="post in showPostList" :key="`post-card-${post.id}`">
          <q-card class="non-selectable fit flex-col">
            <q-card-media class="post-cover-container" v-if="post.cover">
              <img class="post-cover" :src="`/api/picture/${post.cover.id}`" alt="">
            </q-card-media>
            <q-card-media class="post-cover-container" v-else>
              <img class="post-cover" src="/statics/header_cover.jpg" alt="">
            </q-card-media>
            <q-card-title>{{ post.title }}
              <div class="flex-row vertical-top text-sm q-mt-sm" slot="subtitle">
                <span><q-icon size="16px" class="icon-xs q-mr-xs" name="category"></q-icon></span>
                <span class="q-mr-lg">{{ post.category.name }}</span>
              </div>
              <div class="flex-row vertical-top text-sm q-mt-sm" slot="subtitle">
                <span><q-icon size="16px" class="icon-xs q-mr-xs" name="tag"></q-icon></span>
                <span class="q-mr-lg">{{ post.tags.map(i => i.name).join(", ") }}</span>
              </div>
            </q-card-title>
            <q-card-main class="flex-item-fill"></q-card-main>
            <q-card-actions align="between">
              <q-btn flat icon="link" label="阅读全文" color="primary" :to="{'name': 'post-detail', 'params': {'id': post.id}}"></q-btn>
              <q-btn-group flat rounded>
                <q-btn flat dense icon="thumb_up" size="sm" label="0" class="no-pointer-events"></q-btn>
                <q-btn flat dense icon="comment" size="sm" label="0" class="no-pointer-events"></q-btn>
              </q-btn-group>
            </q-card-actions>
          </q-card>
        </div>
      </div>
    </div>
    <q-list class="lt-sm" link no-border separator>
      <q-item multiline v-for="post in showPostList" :key="`post-list-${post.id}`" :to="{'name': 'post-detail', 'params': {'id': post.id}}">
        <q-item-side v-if="post.cover && post.cover !== ''" :image="`/api/picture/${post.cover.id}`"></q-item-side>
        <q-item-side v-else image="/statics/header_cover.jpg"></q-item-side>
        <q-item-main>
          <q-item-tile label>{{ post.title }}</q-item-tile>
          <q-item-tile sublabel>
            <div class="text-sm q-pt-xs">
              <div class="q-mr-sm flex-row vertical-top"><q-icon size="16px" class="icon-xs q-mr-xs" name="category"></q-icon>{{ post.category.name }}</div>
              <div class="q-mr-sm flex-row vertical-top"><q-icon size="16px" class="icon-xs q-mr-xs" name="tag"></q-icon>{{ post.tags.map(i => i.name).join(",") }}</div>
            </div>
          </q-item-tile>
          <q-item-tile sublabel>
            <q-btn flat dense icon="thumb_up" size="sm" label="0" class="no-pointer-events q-mr-sm"></q-btn>
            <q-btn flat dense icon="comment" size="sm" label="0" class="no-pointer-events"></q-btn>
          </q-item-tile>
        </q-item-main>
      </q-item>
    </q-list>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from "vue-property-decorator";
import Axios from 'axios';
import * as moment from "moment";

import { Post } from "../model/Post";
import { Category } from '../model/Category';
import PostCategoryComponent from './PostCategory.vue';
import { Tag } from '../model/Tag';

@Component
export default class PostListComponent extends Vue {
  postList: Post[] = [];
  isCategoryEditing: boolean = false;

  get categorySelected(): string {
    return this.$route.query.category ? (this.$route.query.category as string) : "";
  }
  
  get categoryOptions () {
    let allCategory: Category = {
      id: "",
      name: "全部"
    }
    return this.$store.state.categories
  };

  get tagSelected(): string {
    return this.$route.query.tag ? (this.$route.query.tag as string) : "";
  }
  
  get tagOptions () {
    let allTag: Tag = {
      id: "",
      name: "全部"
    }
    return this.$store.state.tags
  };

  get showPostList () {
    if (!this.categorySelected || this.categorySelected == "") {
      if (!this.tagSelected || this.tagSelected == "") {
        return this.postList;
      } else {
        return this.postList.filter(item => item.tags.findIndex(tag => tag.name == this.tagSelected) > -1);
      }
    } else {
      return this.postList.filter(item => item.category.name === this.categorySelected);
    }
  }

  async getPostList () {
    try {
      let response = await Axios.get<Post[]>(`/api/post/`, {
        params: {
          t: moment().format("x")
        }
      });
      if (response.data) {
        this.postList = response.data;
      }
    } catch (error) {
      this.$q.notify({
        message: "获取博文列表失败",
        type: "negative",
        position: "top"
      })
    }
  }

  editCategory () {
    this.isCategoryEditing = true
  }

  mounted () {
    this.getPostList();
    this.$store.dispatch("getCategories");
    this.$store.dispatch("getTags");
  }
}
</script>


<style>
.text-sm {
  font-size: 0.9em;
}

img {
  margin: 0px;
}

.post-cover-container {
  height: 0px;
  padding-bottom: calc(100% * 9 / 16);
  position: relative;
}

.post-cover {
  position: absolute;
  width: 100%;
}
</style>
