const Prism = require("./prism").default;

export default ({ Vue }) => {
  Vue.prototype.$prism = Prism
}
