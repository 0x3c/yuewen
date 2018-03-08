function autoPlayBg() {
  const booklistNodes = document
    .getElementsByClassName("copyright-book")[0]
    .getElementsByTagName("ul");
  const booklist = Array.from(booklistNodes);
  booklist.forEach((item, index) => {
    const perDist = parseInt(1 + Math.random() * 2, 10);
    let dist = 0;
    const width = item.offsetWidth;
    const playTimer = setInterval(function() {
      dist -= perDist;
      if (dist < width * -1) {
        dist = 0;
      }
      item.style.transform = `translateX(${dist}px)`;
    }, 30);
  });
}

function autoPlayList() {
  const bookList = Array.from(document.getElementsByClassName("booklist-pic"));
  const mid = parseInt((bookList.length + 1) / 2, 10);
  bookList.forEach((item, index) => {
    console.log(item);
  });
}
function initBookEvent() {
  autoPlayBg();
  autoPlayList();
}
export default initBookEvent;
