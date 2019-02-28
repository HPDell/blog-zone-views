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
    this.$store.dispatch("getCategories");
  }
};
</script>

<style>
</style>
