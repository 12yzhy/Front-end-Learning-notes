/* 给定美团股票在某一段时期内价格波动曲线，请找出一个买入点和一个卖出点，使得收益最大。 请用typescript写一下该函数 /* 
arr是一个number类型的数组，表示美团股票在某一个时期内的价格波动。 
* 返回值buy代表购买点在arr中的下标；sold代表卖出点在arr中的下标。 */
function foo(arr) {
    let minPrice = arr[0]//假设最低股价在第一天
    let maxProfit = 0//最大收益
    let buy = 0//买入点
    let sold = 0//卖出点
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < minPrice) {
            minPrice = arr[i]
            buy = i
        } else {
            let curProfit = arr[i] - minPrice
            if (curProfit > maxProfit) {
                maxProfit = curProfit
                sold = i

            }

        }
    }
    return {
        buy, sold
    }
} 