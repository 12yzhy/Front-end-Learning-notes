let arr = [
    {
        name: 1, type: 0
    },
    {
        name: 6, type: 0
    },
    {
        name: 8, type: 2
    },
    {
        name: 0, type: 2
    },
    {
        name: 7, type: 3
    },
    {
        name: 2, type: 3
    },
]
function transArr(arr) {
    let mapJson = new Map()
    for (let i = 0; i < arr.length; i++) {
        if (mapJson.has(arr[i].type)) {
            let narr = mapJson.get(arr[i].type)
            narr.push(arr[i])
            mapJson.set(arr[i].type, narr)
        } else {
            mapJson.set(arr[i].type, [arr[i]])
        }
    }
    let tranArr = []
    mapJson.forEach((el, i) => {
        tranArr.push({ type: i, value: [...el] })
    })
    return tranArr
}
console.log(transArr(arr)); 