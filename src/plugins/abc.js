import $ from "jquery";
import ABCjs from "abcjs";
import 'abcjs/abcjs-midi.css';

function renderAbc() {
  $("div.abc-container").each((index, element) => {
    let abcMidi = window.abcMidi;
    if (abcMidi) {
      let source = abcMidi[element.dataset.src];
      ABCjs.renderAbc(element, source, {
        responsive: "resize"
      });
    }
  });
}

export default ({ Vue }) => {
  Vue.prototype.$renderABC = renderAbc;
}
