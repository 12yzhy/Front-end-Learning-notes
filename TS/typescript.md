# 1. any unknown never void 的区别

1.any,即可以赋任何类型（never 除外）的值 2.和 any 一样，任何类型都可以赋值给 unknown 类型的对象
3.never 类型只接受 never 类型的对象，我们想表示某个函数永远不会返回时，可以使用 never 类型 4.其实可以理解为 null 和 undefined 的联合类型，它表示空值
==>说明一下 void 和 never 的区别。void 表示空值，也就是 null 或者 undefined，而 never 则表示永远都不会出现的值或者直接抛错

# 2 interface 和 type 的区别

1.interface 可以 声明合并，
这种情况下，如果是 type 的话，就会报 重复定义 的警告，因此是无法实现 声明合并 的

```ts
interface User {
  name: string;
  age: number;
}

interface User {
  sex: string;
}
```

2.interface 是通过 extends 实现的(继承)，type 是通过&实现的。 它俩也支持继承,并且可以互相继承
type good{

}
3.type 可以声明(基本类型别名)，联合类型，元组等类型 interface 不可以

```ts
// 基本类型别名
type Name = string;

// 联合类型
interface Dog {
  wong();
}
interface Cat {
  miao();
}

type Pet = Dog | Cat;

// 具体定义数组每个位置的类型
type PetList = [Dog, Pet];
```

# 3 泛型是什么，泛型约束

```typescript
// 泛型指在定义函数、接口、类时，不预先指定具体的类型、而在使用时再指定类型的一种特性
function f1(n1: string, n2: string): Array<string> {
  return [n1, n2];
}

// 泛型，泛型变量T，T可以表示任何类型
function f2<T>(n1: T, n2: T): Array<T> {
  return [n1, n2];
}
f2<number>(10, 20);
// 泛型约束
interface ILength {
  length: number;
}
function fn5<T extends ILength>(n: T): Array<T> {
  return n.length;
}
fn5<string>("hello");
```

# ts TS 进阶: Narrowing 类型缩紧 / Guards 类型守卫

```ts
/* 使用 TS 进行带类型的编程中，我们会很常遇到联合类型的场景，可能是作为处理函数的参数需要兼容多个类型，又或是外部数据源针对同一个字段给不同类型如下 */
function processRes(res: number | string) {}
interface IXxxApiRes {
  // ...
  id: number | string;
}
// 此时在处理函数内部可能会遇到没办法正常访问类型方法的问题
function processRes(date: number | string) {
  data.toLowercase(); //这里的data可能会报错
}
// 这时就需要使用所谓的 narrowing，将变量的类型缩紧到适合的范围，
// 才能在类型安全的状况下确保能正确访问字段或是方法
// 有些人可能对 Type Guards 类型守卫的名词更熟悉，本质上都是指同样的作用的

// 常用typeof或Truthiness 真/假值判断(短路判断) &&、||做类型方面的策略限制
// 不同类型执行不同的代码块
```
