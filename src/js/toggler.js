const fadeOut = function(
  element = {},
  index,
  lastIndex,
  timeout = 200,
  fps = 50
) {
  // 执行次数
  element[lastIndex].style.opacity = "1";
  return new Promise((resolve, reject) => {
    if (index === lastIndex) {
      reject();
      return;
    }
    element[lastIndex].style.opacity = 0;
    resolve();
    // let counter = timeout / (1000 / fps);
    // const count = counter;
    // const step = (1.0 - 0.4) / count;
    // const timer = setInterval(() => {
    //   if (counter) {
    //     element[lastIndex].style.opacity =
    //       +element[lastIndex].style.opacity - step;
    //   } else {
    //     clearInterval(timer);
    //     console.log("动画结束");
    //     resolve();
    //   }
    //   // console.log(counter);
    //   counter--;
    // }, count);
  });
};

export default function Toggler() {
  this.warpper = document.getElementsByClassName("swiper-warpper")[0];
  this.swiper = document.getElementById("swiper");
  this.itemList = Array.from(this.warpper.children);
  this.width = this.swiper.offsetWidth;
  this.curIndex = 0;
  this.length = 3;
  this.navigationLists = Array.from(
    document.getElementsByClassName("navigation")[0].children
  );
  this.lastIndex = 0;
  this.timer = null;
  this.timeout = 2000;

  // 初始状态
  this.itemList.forEach((item, index) => {
    item.style.transition = "all 0.3s ease-in";
    if (index === 0) {
      item.style.opacity = 1;
    } else {
      item.style.opacity = 0;
    }
  });

  // 事件初始化
  this.initEvent();
  this.autoPlay();
}
Toggler.prototype.initEvent = function() {
  // 分页器注册事件
  this.navigationLists.forEach((item, index) => {
    //   点击跳转
    item.onclick = () => {
      this.jump(index);
    };
    // 移入 停止播放
    item.onmouseenter = () => {
      console.log("停止");
      this.timer && (this.timer = clearInterval(this.timer));
    };
    // 移出 开始播放
    item.onmouseleave = () => {
      !this.timer && this.autoPlay();
    };
  });
};
Toggler.prototype.jump = function(index) {
  // 越界初始化
  this.curIndex = index = index > 2 ? 0 : index < 0 ? 2 : index;
  fadeOut(this.itemList, index, this.lastIndex).then(() => {
    this.itemList[index].style.opacity = "1";
    this.lastIndex = index;
  });
  // 图片跳转

  /* navigation 跳转 */
  this.navigationLists.forEach(item => {
    item.className = "";
  });
  this.navigationLists[index].className = "active";

  // console.log(this.warpper.style.left);
};

// 定时器自动播放
Toggler.prototype.autoPlay = function() {
  this.timer ||
    (this.timer = setInterval(() => {
      let index = this.curIndex;
      index += 1;
      this.jump(index);
    }, this.timeout));
};
Toggler.prototype.say = function() {
  console.log(this.navigationLists);
};
