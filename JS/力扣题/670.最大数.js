/* 
给定一个非负整数，你至多可以交换一次数字中的任意两位。返回你能得到的最大值。
输入: 2736
输出: 7236
解释: 交换数字2和数字7。

*/

var maximumSwap = function (num) {
    let arr = num.toString().split('')
    console.log(arr);
    let le = arr.length
    let maxNum = num
    for (let i = 0; i < le; i++) {
        for (let j = i + 1; j < le; j++) {
            change(arr, i, j)
            maxNum = Math.max(maxNum, parseInt(arr.join('')))
            change(arr, i, j)
        }
    }
    console.log(maxNum);
    return maxNum

};
// 前后交换位置
const change = (arr, i, j) => {
    var stm = arr[i]
    arr[i] = arr[j]
    arr[j] = stm
}

maximumSwap(2736)