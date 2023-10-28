

var str = "sdfjklfgdslfghjptlSHdbasdahsdgtqwyetvasdvasxczxcdwd";
function searchMaxchar(str) {
    let json = {}
    for (let i = 0; i < str.length; i++) {
        if (json[str.charAt(i)]) {
            json[str.charAt(i)]++
        } else {
            json[str.charAt(i)] = 1
        }
    }
    console.log(json);
    //存储出现次数最多的值和次数
    var number = '';
    var num = 0;
    for (k in json) {
        if (json[k] > num) {
            num = json[k]
            number = k
        }
    }
    return {
        number, num
    }
}

let { number, num } = searchMaxchar(str)

console.log(`存储出现次数最多的值是${number},次数为${num}`);