<template>
  <div id="q-app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App",
  methods: {
    setLazyLoad() {
      window.onload = window.onscroll = this.$lazyload;
    }
  },
  mounted() {
    this.setLazyLoad();
  }
};
</script>

<style>
html, body, #q-app {
  height: 100%;
}
</style>
