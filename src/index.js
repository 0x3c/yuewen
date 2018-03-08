import Toggler from "./js/toggler";
if (module.hot) {
  module.hot.accept("./index.js");
}
window.onload = function() {
  const toggler = new Toggler();
  //   swiper.jump(1);
};
