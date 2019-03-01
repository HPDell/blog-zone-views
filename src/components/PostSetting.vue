<template>
  <div id="container" class="flex-item-fill">
    <q-list no-border>
      <q-toolbar inverted color="primary">
        <q-btn flat round icon="arrow_back" :to="{'name': 'posts'}"></q-btn>
        <q-toolbar-title class="q-pl-none">博文相关管理</q-toolbar-title>
      </q-toolbar>
    </q-list>
    <div class="row">
      <div class="col-6">
        <my-post-category :edit="true" :link="false" :showSeparator="true"></my-post-category>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator';
import PostCategoryComponent from './PostCategory.vue';

@Component({
  components: {
    "my-post-category": PostCategoryComponent
  }
})
export default class PostSettingComponent extends Vue {
    
}
</script>
