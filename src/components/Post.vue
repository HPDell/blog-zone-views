<template>
  <q-card square flat>
    <q-card-media class="non-selectable">
      <img src="https://hpdell.github.io/assets/cover/nigeru-wa-haji-daga-yaku-ni-tatsu.png" alt="">
    </q-card-media>
    <q-card-title>
      《逃避可耻但有用》观后感
      <div class="row" slot="subtitle">
        <span class="q-mr-lg"><q-icon class="q-mr-sm" name="person"></q-icon>HPDell</span>
        <span class="q-mr-lg"><q-icon class="q-mr-sm" name="tag"></q-icon>观后感</span>
        <span class="q-mr-lg"><q-icon class="q-mr-sm" name="category"></q-icon>随笔</span>
      </div>
    </q-card-title>
    <q-card-main>
      
    </q-card-main>
    <q-card-separator></q-card-separator>
    <q-list no-border multiline link class="non-selectable">
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
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from "vue-property-decorator";

@Component
export default class PostComponent extends Vue {

}
</script>

<style>
</style>
