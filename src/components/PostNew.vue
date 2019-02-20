<template>
  <q-list separator class="fill-height">
    <q-list-header>新增博文</q-list-header>
    <q-item>
      <q-item-side>标题</q-item-side>
      <q-item-main>
        <q-input hide-underline v-model="post.title"></q-input>
      </q-item-main>
    </q-item>
    <q-item>
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
    </q-item>
    <q-list-header>正文</q-list-header>
    <q-item>
      <q-item-main>
        <div id="monaco-editor" style="min-height: 40vh;"></div>
      </q-item-main>
    </q-item>
    <q-toolbar inverted>
      <q-btn flat icon="check" label="提交"></q-btn>
    </q-toolbar>
  </q-list>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator';
import { Post } from '../model/Post';
import * as monaco from 'monaco-editor';

@Component
export default class PostNewComponent extends Vue {
  post: Post = new Post();
  category: string;
  tags: string[] = [];

  initMonacoEditor () {
    let editorContainer = document.getElementById("monaco-editor");
    if (editorContainer) {
      monaco.editor.create(editorContainer, {
        value: "",
        language: "markdown",
        minimap: {
          enabled: false
        },
        lineNumbers: "off"
      })
    }
  }

  mounted () {
    this.initMonacoEditor();
  }
}
</script>


<style>
</style>
