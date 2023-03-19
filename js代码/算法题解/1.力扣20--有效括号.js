/* LeetCode 20题 
有效括号 
主要利用栈的先入后出特性 */
function isValid(s) {
    var stackArr = []
    for (let i = 0; i < s.length; i++) {
        if (s[i] == '(') {
            stackArr.push(')');
        } else if (s[i] == '{') {
            stackArr.push('}');
        } else if (s[i] == '[') {
            stackArr.push(']');
            // 当遇到右括号时
        } else if (stackArr.pop() !== s[i]) {
            return false
        }
    }
    return !stackArr.length
}
