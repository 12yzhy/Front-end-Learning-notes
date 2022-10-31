let str='hello yzhy1 !';
// let newStr = str.split('').reverse().join('')
let newStr=''
for(let i=str.length-1;i>=0;i--){
    newStr+=str.charAt(i)
}
console.log(newStr) 
console.log(newStr.charAt(1),newStr.charAt(2)) 
console.log('----------------求并集交集-----------')
let  a=[1,2,3,4,5] ;b=[3,4,5,6,7]
let jiao=a.filter(el=>b.includes(el))
let jiao1=a.filter(el=>b.indexOf(el)>-1)
console.log('交集',jiao,jiao1)
 
let bing=[...new Set([...a,...b])]
let bing2=a.concat(b.filter(el=>!a.includes(el)))

console.log('交集',bing,bing2)