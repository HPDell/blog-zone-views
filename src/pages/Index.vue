<template>
  <q-page class="row justify-center">
    <div class="col-lg-8 col-xs-12 flex-col">
      <div class="row gt-md">
        <my-user></my-user>
      </div>
      <div class="row gutter-sm flex-item-fill">
        <div class="col-sm-3 gt-xs">
          <my-nav></my-nav>
        </div>
        <div class="col-sm-9 col-xs-12 flex-col">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </q-page>
</template>

<style>
</style>

<script lang="ts">
import Vue from 'vue'
import { Component } from "vue-property-decorator";

import NavComponent from "../components/Nav.vue"
import SayingListComponent from "../components/SayingList.vue"
import PostComponent from '../components/Post.vue';
import UserComponent from '../components/User.vue';

@Component({
  components: {
    "my-nav": NavComponent,
    "my-sayinglist": SayingListComponent,
    "my-post": PostComponent,
    "my-user": UserComponent
  }
})
export default class IndexPage extends Vue {

}
</script>

