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

泛型（Generics）是指在编程语言中定义函数、类或接口时使用类型参数，以增加代码的灵活性和可重用性。

通过使用泛型，可以在函数或类的定义中使用一个或多个类型参数，这些类型参数在函数或类被调用或实例化时被具体指定。这样可以使得函数或类可以处理多种类型的数据，而不需要重复编写相似的代码。

泛型的优点包括：
1. 代码重用：通过使用泛型，可以编写可重用的函数或类，可以适用于多种不同类型的数据。
2. 类型安全：使用泛型可以在编译时进行类型检查，提高代码的安全性和可靠性。
3. 灵活性：泛型可以根据实际需要进行类型参数的指定，适应不同的数据类型和数据结构。

泛型可以用于函数、类和接口的定义。以下是一些使用泛型的示例：

- 函数泛型：
  ````typescript
  function printArray<T>(arr: T[]): void {
    for (let item of arr) {
      console.log(item);
    }
  }

  let numbers: number[] = [1, 2, 3, 4, 5];
  let names: string[] = ["John", "Jane", "Bob"];

  printArray(numbers); // 打印数组中的数字
  printArray(names); // 打印数组中的字符串
  ```

- 类泛型：
  ````typescript
  class Queue<T> {
    private elements: T[] = [];

    enqueue(element: T): void {
      this.elements.push(element);
    }

    dequeue(): T | undefined {
      return this.elements.shift();
    }
  }

  let queue = new Queue<number>();
  queue.enqueue(1);
  queue.enqueue(2);
  queue.enqueue(3);
  console.log(queue.dequeue()); // 输出 1
  ```

- 接口泛型：
  ````typescript
  interface Pair<T, U> {
    first: T;
    second: U;
  }

  let pair: Pair<number, string> = { first: 1, second: "hello" };
  console.log(pair.first); // 输出 1
  console.log(pair.second); // 输出 "hello"
  ```

通过使用泛型，可以提高代码的灵活性和可重用性，同时也可以增加代码的类型安全性。泛型在处理各种数据类型和数据结构时非常有用，尤其是在编写通用的算法、数据结构或库时。

# 4 ts TS 进阶: Narrowing 类型缩紧 / Guards 类型守卫

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

# 5 在ts中 访问修饰符和 静态修饰符
TypeScript 提供了以下三种访问修饰符：
- public（默认修饰符）：可以在类内部、子类和类的实例中访问。
- private：只能在类内部访问，不允许在子类或类的实例中访问。
- protected：可以在类内部和子类中访问，不允许在类的实例中访问。
静态修饰符:
- static 关键字来定义静态成员，这些成员属于类本身而不是类的实例。

# 6 ts中pick和 omit啥区别
在 TypeScript 中，`Pick` 和 `Omit` 是两个用于处理类型的工具类型，它们都是由 TypeScript 提供的内置工具类型。

1. `Pick`：`Pick` 是一个泛型工具类型，用于从给定类型中选择指定属性，创建一个新的类型。

   语法：`Pick<T, K>`，其中 `T` 是源类型，`K` 是要选择的属性的名称。

   示例：
   `````typescript
   type Person = {
     name: string;
     age: number;
     address: string;
   };

   type PersonName = Pick<Person, 'name'>; // 选择 'name' 属性
   // 等同于 type PersonName = { name: string };
   ````

   在上面的示例中，使用 `Pick` 从 `Person` 类型中选择了 `'name'` 属性，创建了一个新的类型 `PersonName`，该类型只包含了 `'name'` 属性。

2. `Omit`：`Omit` 也是一个泛型工具类型，用于从给定类型中排除指定属性，创建一个新的类型。

   语法：`Omit<T, K>`，其中 `T` 是源类型，`K` 是要排除的属性的名称。

   示例：
   `````typescript
   type Person = {
     name: string;
     age: number;
     address: string;
   };

   type PersonWithoutAge = Omit<Person, 'age'>; // 排除 'age' 属性
   // 等同于 type PersonWithoutAge = { name: string; address: string };
   ````

   在上面的示例中，使用 `Omit` 从 `Person` 类型中排除了 `'age'` 属性，创建了一个新的类型 `PersonWithoutAge`，该类型只包含了 `'name'` 和 `'address'` 两个属性。

总结：
- `Pick` 用于从给定类型中选择指定属性，创建一个新的类型。
- `Omit` 用于从给定类型中排除指定属性，创建一个新的类型。

这两个工具类型都可以用于根据需要对类型进行精确地选择或排除属性，从而更灵活地定义自己所需的类型。