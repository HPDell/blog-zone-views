import * as marked from "marked";

var render = new marked.Renderer()

/**
 * @param {string} href
 * @param {string} title
 * @param {string} text
 */
render.image = function (href) {
  return `
    <img data-src="${href}" preview="${href.replace("/", "-")}"></img>
  `
}

marked.setOptions({
    renderer: render,
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false
  });

export default ({ Vue }) => {
  Vue.prototype.$marked = marked;
}
