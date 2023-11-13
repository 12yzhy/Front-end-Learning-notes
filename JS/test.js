const obj = {
    name: "John",
    age: 30,
    valueOf() {
        console.log('执行了valueof');
      return [42];
    },
    toString() {
        console.log('执行了tostring');
      return ()=>{"Custom Object"};
    }
  };
  
  const str = Number(obj);
  console.log(str);