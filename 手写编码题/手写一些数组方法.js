/* 
  参考文章   https://juejin.cn/post/7002248038529892383#heading-26


*/
// map  接收一个数组 返回一个处理后新数组 //   forEach   接收一个数组 返回处理后数组 ==还是原始数组
Array.prototype.myMap = function (cb) {
  let arr = []
  for (let i = 0; i < this.length; i++) {
    arr.push(cb(this[i], i, this))
  }

  return arr
}

let arr = [1, 2, 3, 4];
let arr1 = arr.myMap((el) => el * 2);
console.log(arr1);
// find
// filter
// some
Array.prototype.mySome = function (cb) {
  let flag = false
  for (let i = 0; i < this.length; i++) {
    flag = cb(this[i], i, this)
    if (flag) break
  }

  return flag
}
// reduce
/*
pre：前一项
next：下一项
index：当前索引
arr：数组本身 
 */
Array.prototype.myReduce = function (cb, ...initVal) {
  let start = 0, pre
  // 如果有第二个参数（即有初始值）
  if (initVal.length) {
    pre = initVal[0]
  } else {
    pre = this[0]
    start = 1
  }
  for (let i = start; i < this.length; i++) {
    pre = cb(pre, this[i], i, this)
  }
  return pre


}

  // slice


