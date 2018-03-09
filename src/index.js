import Toggler from "./js/toggler";
import headerInit from "./js/header";
import initBookEvent from "./js/copyright";

if (module.hot) {
  module.hot.accept("./index.js");
}
window.onload = function() {
  const toggler = new Toggler();
  headerInit();

  initBookEvent();
};
