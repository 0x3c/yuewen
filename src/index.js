import Toggler from "./js/toggler";
import headerInit from "./js/header";
import initBookEvent from "./js/copyright";

if (module.hot) {
  module.hot.accept("./index.js");
}
window.onload = function() {
  // const toggler = new Toggler();
  // headerInit();
  // initBookEvent();
  // returnArr(5);
  /*   const [arr, elem] = getArrEleAdd([1, 2, 3, 4]);
  for (let i = 0; i < arr.length; i++) {
    console.log(insertArr(arr[i], elem[i]));
  } */
  let arr = [[1, 2, 3], [2, 3, 4], [2, 1, 3], [1, 2, 3]];
  // returnArr(5);
  unique(arr);
  console.log(arr);
};
function returnArr(num) {
  let unit = Array(num).fill(1);
  const result = [];
  for (let i = 0; i < unit.length; i++) {
    const curResult = [];
    let base = i === 0 ? unit : result[i - 1];
    // base 可能为一个数或数组
    // console.log("base: " + base);
    if (base[0] instanceof Array) {
      console.log("start:");
      base.forEach(item => {
        // console.log("item: ");
        // console.log(item);
        const [arr, elem] = getArrEleAdd(item);
        for (let i = 0; i < arr.length; i++) {
          curResult.push(...insertArr(arr[i], elem[i]));
        }
      });
    } else {
      console.log("--------------------------base:");
      console.log(base);
      curResult.push(base);
    }

    console.log("第" + i + "轮结束,result:" + "");
    // console.log(curResult);
    result.push(curResult);
    // console.log("总结果:");
    console.log(result);
  }
  // console.log(result);
}

// 判断两个一位数组是否相等
function equ(arr1, arr2) {
  return JSON.stringify(arr1) === JSON.stringify(arr2);
}

// 去除数组中重复的数组
function unique(arr) {
  arr.forEach((item, index) => {
    for (let i = 0; i < arr.length; i++) {
      if (i === index) {
        continue;
      }
      if (equ(item, arr[i])) {
        // arr[i] = null;
        
      }
    }
  });
}

// 从数组中挑选出一个数，返回所有可能
function getArrEleAdd(arr) {
  const result = [];
  const indexArr = [];
  for (let i = 0; i < arr.length; i++) {
    let myArr = arr.slice(0);
    myArr.splice(i, 1);
    // myArr[i] += num;
    result.push(myArr);
    indexArr.push(arr[i]);
  }
  return [result, indexArr];
}

// 将一个数与数组中的一个数相加，返回所有可能
function insertArr(arr, num) {
  // console.log(num + "  insert  " + arr);
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    let myArr = arr.slice(0);
    myArr[i] += num;
    result.push(myArr);
  }
  return result;
}

/* 
1.  全1
2.  按结果长度循环(结果为数组长度相同的数组集合,[ [1,1,1,2],[1,1,2,1] ])
2.1 循环指定长度的集合,对单一指定长度数组操作
2.2 [1,1,1,2]，随机抽取一位数，与随机一个数相加，返回所有情况。


*/
