// jump somewhere(animation)
function jumpEle(element) {
  const headerHeight = document.getElementById("header").offsetHeight;
  const fps = 50;
  const timout = 400;
  const aim = document.getElementById(element);
  const dist = aim.offsetTop - window.pageYOffset - headerHeight; // scroll down
  // console.log("now: " + " " + window.pageYOffset);
  // console.log("aim: " + " " + aim.offsetTop);
  let count = fps * timout / 1000.0;
  const perDist = dist / count;
  let timer = setInterval(() => {
    // console.log(window.pageYOffset);
    window.scrollTo(0, window.pageYOffset + perDist);
    if (!--count) {
      clearInterval(timer);
    }
  }, 1000 / fps);
}

function setNavClass() {}

// initialize event of header's elements
function initHeaderEvent() {
  const language = document.getElementsByClassName("header-nav-lg")[0];
  const languageList = document.getElementsByClassName("nav-lg-list")[0];
  const drop = document.getElementsByClassName("nav-lg-drop")[0];
  //   const linkNodeList=document.getElementsByClassName('header-nav-a');
  const linkList = Array.from(document.getElementsByClassName("header-nav-a"));
  //   jump to some part of this page;
  linkList.forEach(function(item, index) {
    item.onclick = function(e) {
      let str = e.currentTarget.href;
      str = str.substr(str.indexOf("#") + 1);
      jumpEle(str);
      e.preventDefault();
      e.stopPropagation();
    };
  });
  language.onmouseenter = function() {
    languageList.style.display = "block";
    drop.className = "nav-lg-drop nav-lg-dropup";
  };
  language.onmouseleave = function() {
    languageList.style.display = "none";
    drop.className = "nav-lg-drop nav-lg-dropdown";
  };
}
// set Header's style when it's active or not
function headerCfg() {
  let isTop = window.pageYOffset === 0 ? true : false;
  const header = document.getElementById("header");
  const content = document.getElementById("header-content");
  const logo = document.getElementsByClassName("nav-logo")[0];
  const joinBtn = document.getElementsByClassName("header-nav-join")[0];
  setHeader();
  function setHeader() {
    function headerFix() {
      header.style.backgroundColor = "#fff";
      header.style.position = "fixed";
      header.style.color = "#717678";
      header.className = "header-fixed";
      logo.style.backgroundPositionY = "-50px";
      joinBtn.style.borderColor = "#3f7fe0";
      joinBtn.style.color = "#3f7fe0";
    }
    function headerNormal() {
      header.style.backgroundColor = "";
      header.style.position = "absolute";
      header.style.color = "";
      header.className = "";
      logo.style.backgroundPositionY = 0;
      joinBtn.style.borderColor = "";
      joinBtn.style.color = "";
    }
    if (window.pageYOffset > 0 && !isTop) {
      isTop = true;
      headerFix();
    } else if (window.pageYOffset === 0 && isTop) {
      isTop = false;
      headerNormal();
    }
  }
  return setHeader;
}

function headerEvent() {
  // init range
  const navRange = [];
  const headerHeight = document.getElementById("header").offsetHeight;
  const idArr = ["copyright", "mobile", "brand", "part4", "part5", "part6"];
  const navEleArr = Array.from(
    document.getElementsByClassName("header-nav")[0].children
  );
  console.log(navEleArr);
  idArr.forEach((key, index) => {
    const item = document.getElementById(key);
    const fromY = item.offsetTop - headerHeight;
    const endY = item.offsetHeight + fromY;
    navRange.push([fromY, endY]);
  });
  console.log(navRange);
  const inArrRange = (arr, num) => {
    for (let i = 0; i < arr.length; i++) {
      if (num >= arr[i][0] && num <= arr[i][1]) {
        return i;
      }
    }
  };

  return () => {
    const currentY = window.scrollY;
    const id = inArrRange(navRange, currentY);
    navEleArr.forEach((item, index) => {
      if (index === id) {
        console.log("找到id");
        item.className = "header-nav-a nav-a-active";
      } else {
        item.className = "header-nav-a ";
      }
    });
    // 设置 active  nav-a-active
  };
}
export default function headerInit() {
  initHeaderEvent();
  window.addEventListener("scroll", headerCfg(), false);
  window.addEventListener("scroll", headerEvent(), false);
}
