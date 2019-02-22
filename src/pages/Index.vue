<template>
  <q-page class="fit flex-col">
    <div class="row justify-center bg-primary user-bar">
      <div class="col-xl-8 col-xs-12">
        <div class="flex-row vertical-center">
          <q-btn flat round @click="toggleDrawer" aria-label="Menu" class="text-white vertical-middle lt-lg">
            <q-icon name="menu"/>
          </q-btn>
          <my-user class="flex-item-fill"></my-user>
        </div>
      </div>
    </div>
    <div class="row flex-item-fill justify-center q-mb-sm">
      <div class="col-xl-8 col-xs-12 flex-col">
        <div class="row gutter-sm flex-item-fill">
          <div class="col-sm-3 gt-xs">
            <my-nav class="stick-top" :border="true"></my-nav>
          </div>
          <div class="col-sm-9 col-xs-12 flex-col">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<style>
.stick-top {
  position: sticky;
  top: 50px;
}

.user-bar {
  position: sticky;
  top: 0px;
  z-index: 5000;
}
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
  toggleDrawer () {
    this.$emit("toggle-drawer");
  }
}
</script>

