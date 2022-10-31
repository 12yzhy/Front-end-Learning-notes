//  这里的发布订阅模式 多应用于vue中非父子组件之间的传值==>eventBus
class EventEmiter{
    constructor(){
        //保存发布事件的地方
        this.cache={}
    }
      // 接受事件 参数：事件名称,回调函数（其参数就是emit的第二个参数）
      on(eve,callback){
        if(!this.cache[eve]){
            // 若没有这个事件就建一个
            this.cache[eve]=[callback]
        }else{
            this.cache[eve].push(callback)
        }

    }
    //发布事件 参数：事件名称，要传递的值(可能是多个值)
    emit(eve,...rest){
        this.cache[eve] && 
        this.cache[eve].forEach(fn => {
                fn.apply(this,rest)
        });
    }
  
    
    // 解绑事件
    off(eve,callback){
        // cache没有要解绑的eve直接return
        if(!this.cache[eve]) return
        // cache有要解绑的eve就将该cache[eve]过滤掉解绑函数在返回
        this.cache[eve]=this.cache[eve].filter(el=>el!==callback)

    }
    // 只执行一次订阅事件
    once(eve,cb){
       function fn(){
        cb()
        this.off(eve,fn)
       }
       this.on(eve,fn)
    }
}
// 使用如下
const event1 = new EventEmiter();

const handle = (...rest) => {
  console.log(rest);
};

event1.on("click", handle);

event1.emit("click", 1, 2, 3, 4);

event1.off("click", handle);

event1.emit("click", 1, 2);

event1.once("dbClick", () => {
  console.log(123456);
});
event1.emit("dbClick");
event1.emit("dbClick");

