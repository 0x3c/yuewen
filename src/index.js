import Toggler from "./js/toggler";
import headerInit from "./js/header";

if (module.hot) {
  module.hot.accept("./index.js");
}
window.onload = function() {
  const toggler = new Toggler();
  headerInit();
  //   swiper.jump(1);
};
