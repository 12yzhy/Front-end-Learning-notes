let a={
    user:'zhneg',
    age:'18',
    foods:'水饺',
}
// for(let key in a){
//     console.log(key,a[key])
// }


let b=['zheng','cheng','gong']
// for(let key of a){
//     console.log(key,a[key])//a is not iterable
// }
for(let key of b){
    console.log(key)//a is not iterable
}
let c=b[Symbol.iterator]()
console.log(c.next())
console.log(c.next())
console.log(c.next())
console.log(c.next())

/* 
             |  for of      ||     for   in
适用目标不同  |  可迭代数据   ||    可枚举数据
        for of只能遍历可迭代对象，如（set,数组,字符串，map)
引申：什么是可枚举：属性上有enumerable值为true  可以通过object.getOwnPropertyDescriptors()查看
什么是可迭代  es6中具有Symbol.iterator属性，它对应的值是一个函数，调用这个函数可以得到个对象，每次调用对象上
             的next()方法会得到目标上的每一项
--------------------------------------------------------------
范围不同     自身的                 原型上的可枚举属性也能遍历到

结果不同     一般得到value           key

*/