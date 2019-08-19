<template>
  <q-list no-border multiline class="non-selectable">
    <q-list-header>评论</q-list-header>
    <template v-for="comment in comments">
      <q-item class="q-pb-none" :key="`comment-${comment.id}`" @click.native="reply(comment.id, comment.id)" link>
        <q-item-side>
          <q-item-tile>{{ comment.user.name }}</q-item-tile>
        </q-item-side>
        <q-item-main class="q-py-none">
          {{ comment.content }}
        </q-item-main>
      </q-item>
      <q-item class="q-py-none" v-if="comment.children && comment.children.length > 0" :key="`comment-children-${comment.id}`">
        <q-item-main class="q-py-none">
          <q-list class="q-pt-none non-selectable" no-border multiline>
            <q-item class="q-py-none" v-for="child in comment.children" :key="child.id" link @click.native="reply(comment.id, comment.id)">
              <q-item-main class="q-py-none">
                <q-item-tile sublabel>
                  {{ child.user.name }} 回复 {{ comment.user.name }}
                </q-item-tile>
                {{ child.content }}
              </q-item-main>
            </q-item>
          </q-list>
        </q-item-main>
      </q-item>
      <q-item :key="`newcomment-${comment.id}`" v-if="$store.state.userModule.canEdit && replyRoot == comment.id">
        <q-item-side></q-item-side>
        <q-item-main class="flex-row">
          <q-input class="flex-item-fill" stack-label="添加回复" v-model="replyContent"></q-input>
          <q-btn icon="close" @click="cancelComment" flat round dense style="align-self: flex-end;"></q-btn>
          <q-btn icon="send" @click="submitComment" flat round dense style="align-self: flex-end;"></q-btn>
        </q-item-main>
      </q-item>
    </template>
    <template v-if="$store.state.userModule.canEdit">
      <q-item label v-if="replyRoot == 'post'">
        <q-item-main class="flex-row">
          <q-input class="flex-item-fill" stack-label="添加评论" v-model="replyContent"></q-input>
          <q-btn icon="close" @click="cancelComment" flat round dense style="align-self: flex-end;"></q-btn>
          <q-btn icon="send" @click="submitComment" flat round dense style="align-self: flex-end;"></q-btn>
        </q-item-main>
      </q-item>
    </template>
    <template>
      <q-item>
        <q-item-main>
          登陆后方可进行评论和回复
        </q-item-main>
      </q-item>
    </template>
  </q-list>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from "vue-property-decorator";

import { Comment } from "../model/Comment";
import Axios, { AxiosResponse } from 'axios';

@Component
export default class PostCommentComponent extends Vue {
  @Prop(String)
  postID: string;

  @Prop(Array)
  comments: Comment[];

  replyContent: string = "";
  replyRoot: "post" | string = "post";
  replyTo: string = "";

  reply (root: string, to: string) {
    this.replyRoot = root;
    this.replyTo = to;
  }

  async getComments () {
    try {
        let response: AxiosResponse<Comment[]> = await Axios.get(`/api/comment/`, {
          params: {
            type: "post",
            id: this.postID
          }
        });
        if (response.data) {
          this.comments = response.data;
          await this.getCommentChildren();
        }
      } catch (error) {
        
      }
  }

  async getCommentChildren () {
    for (let i = 0; i < this.comments.length; i++) {
      const comment = this.comments[i];
      try {
        let response: AxiosResponse<Comment> = await Axios.get(`/api/comment/${comment.id}/`);
        if (response.data) {
          Vue.set(this.comments[i], "children", response.data.children)
        }
      } catch (error) {
        
      }
    }
  }

  async submitComment () {
    try {
      let response: AxiosResponse<Comment> = await Axios.post(`/api/comment/`, {
        isRoot: this.replyRoot == "post" ? true : false,
        root: this.replyRoot,
        replyTo: this.replyTo,
        content: this.replyContent
      }, {
        params: {
          post: this.postID
        }
      });
      if (this.replyRoot == "post") {
        this.comments.push(response.data)
      } else {
        let rootComment = this.comments.find(item => item.id == this.replyRoot)
        if (rootComment) {
          if (!(rootComment.children && rootComment.children.length > 0)) {
            Vue.set(rootComment, "children", []);
          }
          rootComment.children = rootComment.children.concat(response.data);
        }
      }
    } catch (error) {
      
    }
    this.cancelComment()
  }

  cancelComment () {
    this.replyContent = "";
    this.replyRoot = "post";
    this.replyTo = "";
  }

  mounted () {
    this.getCommentChildren();
  }
}
</script>


<style>
</style>
