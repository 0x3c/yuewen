// background pic's animation
function autoPlayBg() {
  const booklistNodes = document
    .getElementsByClassName("copyright-book")[0]
    .getElementsByTagName("ul");
  const booklist = Array.from(booklistNodes);
  booklist.forEach((item, index) => {
    const perDist = 0.1 + 1 * Math.random().toFixed(2);
    let dist = 0;
    const width = item.offsetWidth;
    const playTimer = setInterval(function() {
      dist -= perDist;
      if (dist < width * -1 + document.body.clientWidth) {
        dist = 0;
      }
      item.style.transform = `translateX(${dist}px)`;
    }, 20);
  });
}
/* setting autoPlay Timer and init book img's onclick event */
function autoPlayEvent() {
  const bookList = Array.from(document.getElementsByClassName("booklist-pic"));
  const len = bookList.length;
  let newBookList = Array.from(document.getElementsByClassName("booklist-pic"));
  const mid = parseInt((bookList.length + 1) / 2, 10);
  let timer = null;
  bookList.forEach((item, index) => {
    item.onclick = e => {
      clearInterval(timer);
      const curIndex = newBookList.indexOf(e.currentTarget);
      const right2left = curIndex - mid + 1;
      if (right2left > 0) {
        newBookList = moveLeft(newBookList, right2left);
      } else if (right2left < 0) {
        newBookList = moveRight(newBookList, Math.abs(right2left));
      }
      initBook(newBookList);
      timer = setInterval(() => {
        newBookList = moveLeft(newBookList, 1);
        initBook(newBookList);
      }, 4000);
    };
    // init hover event
    item.onmouseenter = e => {
      e.currentTarget.style.filter = "brightness(100%)";
    };
    item.onmouseleave = e => {
      const curIndex = newBookList.indexOf(e.currentTarget);
      if (mid - 1 === curIndex) {
        return;
      }
      e.currentTarget.style.filter = "brightness(70%)";
    };
  });
  // autoplay timer
  timer = setInterval(() => {
    newBookList = moveLeft(newBookList, 1);
    initBook(newBookList);
  }, 4000);
}
// book position initial
function initBook(bookList) {
  const mid = parseInt((bookList.length + 1) / 2, 10);
  const xDist = 160;
  const minScale = 0.8;
  const maxScale = 1.4;
  const scaleDist = (maxScale - minScale) / mid;
  scaleDist;
  bookList.forEach((item, index) => {
    const curX = xDist * (index - mid + 1);
    const curZ = 110 * (index - mid);
    let dt = maxScale - Math.abs(mid - index - 1) * scaleDist;
    item.style.transform = `translateX(${curX}px)  scale(${dt}, ${dt})`;
    item.style.zIndex = 20 - Math.abs(mid - index - 1);
    item.style.filter =
      index + 1 === mid ? "brightness(100%)" : "brightness(70%)";
  });
}

// arr :element move right
function moveRight(arr, n) {
  if (Math.abs(n) > arr.length) n = n % arr.length;
  return arr.slice(-n).concat(arr.slice(0, -n));
}
function moveLeft(arr, n) {
  const len = arr.length;
  return moveRight(arr, len - n);
}

// main init
function initBookEvent() {
  const bookList = Array.from(document.getElementsByClassName("booklist-pic"));
  autoPlayBg();
  initBook(bookList);
  autoPlayEvent();
  // autoPlayList();
}
export default initBookEvent;
