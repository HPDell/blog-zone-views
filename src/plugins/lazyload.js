function lazyload() {
  let imgs = document.querySelectorAll("img");
  for (let i = 0; i < imgs.length; i++) {
    const element = imgs[i];
    let bound = element.getBoundingClientRect();
    let clientHeight = window.innerHeight;
    if (bound.top <= (clientHeight + 100)) {
      if (element.dataset.src && element.src === "") {
        element.src = element.dataset.src;
      }
    }
  }
};

export default ({ Vue }) => {
  Vue.prototype.$lazyload = lazyload;
}
