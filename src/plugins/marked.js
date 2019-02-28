import marked from "marked";
import md5 from "md5";
const Prism = require("./prism").default;

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

/**
 * @param {string} header
 * @param {string} body
 */
render.table = function (header, body) {
  return `
    <div class="table-container">
      <table>
        ${header}
        ${body}
      </table>
    </div>
  `;
}

render.code = function (code, language) {
  if (language === "abc") {
    let midiID = md5(code);
    if (!window.abcMidi) {
      window.abcMidi = {};
    }
    window.abcMidi[midiID] = code;
    return `
      <div class="abc-container" data-src="${midiID}"></div>
      <div class="midi-container" data-src="${midiID}"></div>
    `
  } else {
    return `
<pre class="prism-language language-${language} line-numbers">
<code>${Prism.highlight(code, Prism.languages[language])}</code>
</pre>
    `
  }
}

export var customRender = render;

export default ({ Vue }) => {
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

  Vue.prototype.$marked = marked;
  Vue.prototype.$markedRenderer = render;
}
