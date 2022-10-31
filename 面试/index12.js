/* try {
    setTimeout(() => {
        throw new Error('error in setTimeout')
    }, 1000)
} catch (error) {
    console.log(error);
} */

// Promise中的错误
try {
    Promise.resolve().then(() => {
        throw new Error('error in Promise.then');
    });
} catch (err) {
    console.error('catch error', err);
}
// '-----------要用下面这个方法------------'
// setTimeout(() => {
//     try {
//         throw new Error('error in setTimeout')

//     } catch (err) {
//         console.log("err==>", err);
//     }
// }, 1000)
Promise.resolve().then(() => {
    try {
        throw new Error('error in Promise.then');
    } catch (err) {
        console.error('catch error', err);

    }
});
// ------------ajax交互时报错---------
// 1 用async/await 
// 2 axios 是promise写法 promise自带catch方法
const request = async () => {
    try {
        const { code, data } = await somethingThatReturnsAPromise();
    } catch (err) {
        console.error('request error', err);
    }
}

