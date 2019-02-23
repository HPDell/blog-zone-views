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
      window.onscroll = function() {
        let imgs = document.querySelectorAll("img");
        for (let i = 0; i < imgs.length; i++) {
          const element = imgs[i];
          let bound = element.getBoundingClientRect();
          let clientHeight = window.innerHeight;
          if (bound.top <= (clientHeight + 100)) {
            if (!element.src) {
              element.src = element.dataset.src;
            }
          }
        }
      };
    }
  },
  mounted() {
    this.setLazyLoad();
  }
};
</script>

<style>
</style>
