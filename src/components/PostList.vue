<template>
  <q-scroll-area id="container" class="flex-item-fill">
    <q-list no-border>
      <q-toolbar inverted color="primary">
        <q-toolbar-title>HPDell的 {{ postList.length }} 篇博文</q-toolbar-title>
        <q-btn flat round icon="add" :to="{'name': 'post-new'}" v-if="$store.state.userModule.canEdit"></q-btn>
      </q-toolbar>
    </q-list>
    <div class="row gt-xs">
      <div class="col-xl-4 col-sm-6 col-xs-12 q-pa-xs" v-for="post in postList" :key="`post-card-${post.id}`">
        <q-card class="non-selectable fit" inline>
          <q-card-media v-if="post.cover">
            <img :src="post.cover" alt="">
          </q-card-media>
          <q-card-title>{{ post.title }}
            <div class="row text-sm" slot="subtitle">
              <!-- <span class="q-mr-lg"><q-icon size="16px" class="icon-xs q-mr-xs" name="category"></q-icon>{{ post.category.name }}</span>
              <span class="q-mr-lg"><q-icon size="16px" class="icon-xs q-mr-xs" name="tag"></q-icon>{{ post.tags.map(i => i.name).join(",") }}</span> -->
            </div>
          </q-card-title>
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
    <q-list class="lt-sm" link no-border separator>
      <q-item multiline v-for="post in postList" :key="`post-list-${post.id}`" :to="{'name': 'post-detail', 'params': {'id': post.id}}">
        <q-item-side :image="post.cover"></q-item-side>
        <q-item-main>
          <q-item-tile label>{{ post.title }}</q-item-tile>
          <q-item-tile sublabel>
            <div class="row text-sm">
              <!-- <span class="q-mr-sm"><q-icon size="16px" class="icon-xs q-mr-xs" name="category"></q-icon>{{ post.category.name }}</span>
              <span class="q-mr-sm"><q-icon size="16px" class="icon-xs q-mr-xs" name="tag"></q-icon>{{ post.tags.map(i => i.name).join(",") }}</span> -->
            </div>
          </q-item-tile>
          <q-item-tile sublabel>
            <q-btn flat dense icon="thumb_up" size="sm" label="0" class="no-pointer-events q-mr-sm"></q-btn>
            <q-btn flat dense icon="comment" size="sm" label="0" class="no-pointer-events"></q-btn>
          </q-item-tile>
        </q-item-main>
      </q-item>
    </q-list>
  </q-scroll-area>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from "vue-property-decorator";
import Axios from 'axios';
import * as moment from "moment";

import { Post } from "../model/Post";

@Component
export default class PostListComponent extends Vue {
  postList: Post[] = [];

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

  mounted () {
    this.getPostList();
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
</style>
