<template>
  <q-list link :no-border="!border">
    <q-item :to="{'name': 'welcome'}">
      <q-item-side icon="home"></q-item-side>
      <q-item-main>
        <q-item-tile label>首页</q-item-tile>
      </q-item-main>
    </q-item>
    <q-item :to="{'name': 'sayings'}">
      <q-item-side icon="chat_bubble_outline"></q-item-side>
      <q-item-main>
        <q-item-tile label>微文</q-item-tile>
      </q-item-main>
    </q-item>
    <q-item :to="{'name': 'posts'}">
      <q-item-side icon="message"></q-item-side>
      <q-item-main>
        <q-item-tile label>博文</q-item-tile>
      </q-item-main>
    </q-item>
    <!-- <q-item>
      <q-item-side icon="comment"></q-item-side>
      <q-item-main>
        <q-item-tile label>相册</q-item-tile>
      </q-item-main>
    </q-item> -->
  </q-list>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator';

@Component
export default class NavComponent extends Vue {
  @Prop(Boolean) border!: boolean;
}
</script>


<style>
</style>
