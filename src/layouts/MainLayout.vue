<template>
  <q-layout view="lHh Lpr lFf">
    <!-- <q-layout-header>
      <q-toolbar
        color="primary"
        class="row flex-center"
      >
        <div class="lt-sm q-ml-md">
          <q-btn flat dense round @click="leftDrawerOpen = !leftDrawerOpen" aria-label="Menu">
            <q-icon name="menu" />
          </q-btn>
        </div>
        <q-toolbar-title class="col-xl-8 col-12">
          HPDell 的空间
        </q-toolbar-title>
      </q-toolbar>
    </q-layout-header> -->

    <q-layout-drawer
      v-model="leftDrawerOpen"
      :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null"
      class="lg-sm custom-drawer"
    >
      <my-nav style="margin-top: 95px;" :border="false"></my-nav>
    </q-layout-drawer>

    <q-page-container>
      <my-index class="fit" @toggle-drawer="leftDrawerOpen = !leftDrawerOpen"></my-index>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { openURL } from 'quasar'
import NavComponent from "../components/Nav.vue"
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import IndexPage from '../pages/Index.vue';

@Component({
  methods: {
    openURL
  },
  components: {
    "my-nav": NavComponent,
    "my-index": IndexPage
  },
})
export default class MainLayout extends Vue {
  leftDrawerOpen = false;

  mounted () {
    document.title = "HPDell 的空间"
  }
}
</script>

<style lang="stylus">
.pswp
  z-index 10000;
</style>
