const config = require("../../package.json");

export default ({ Vue }) => {
    Vue.prototype.$package = config;
  }