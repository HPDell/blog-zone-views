<template>
  <q-list no-border multiline link class="non-selectable">
    <q-item-separator></q-item-separator>
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
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from "vue-property-decorator";

@Component
export default class SayingCommentComponent extends Vue {

}
</script>


<style>
</style>
