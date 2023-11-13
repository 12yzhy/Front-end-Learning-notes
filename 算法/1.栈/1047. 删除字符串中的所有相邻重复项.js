/* 



*/
/**
 * @param {string} s
 * @return {string}
 */
var removeDuplicates = function (s) {
    let stack = []
    for (a of s) {
        const pre = stack.pop()
        //  边界条件
        if (pre !== a) {
            // 若不等于就要将取出栈的元素再压入栈
            stack.push(pre)
            //  再将当前循环的元素放入栈
            stack.push(a)
        }
    }
    return stack.join('')
};