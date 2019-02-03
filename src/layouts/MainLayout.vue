<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
      <q-toolbar
        color="primary"
        class="row flex-center"
      >
        <div class="lt-sm q-ml-md">
          <q-btn flat dense round @click="leftDrawerOpen = !leftDrawerOpen" aria-label="Menu">
            <q-icon name="menu" />
          </q-btn>
        </div>
        <q-toolbar-title class="col-lg-8 col-12">
          HPDell 的空间
          <!-- <div slot="subtitle">Running on Quasar v{{ $q.version }}</div> -->
        </q-toolbar-title>
      </q-toolbar>
    </q-layout-header>

    <q-layout-drawer
      v-model="leftDrawerOpen"
      :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null"
      class="lg-sm"
    >
      <my-nav></my-nav>
    </q-layout-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'
import NavComponent from "../components/Nav.vue"

export default {
  name: 'MyLayout',
  data () {
    return {
      leftDrawerOpen: false
    }
  },
  methods: {
    openURL
  },
  components: {
    "my-nav": NavComponent
  }
}
</script>

<style>
</style>
