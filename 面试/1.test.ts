function log(target: any, name: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    console.log(`Calling ${name} with arguments: ${args}`);
    const result = originalMethod.apply(this, args);
    console.log(`Method ${name} returned: ${result}`);
    return result;
  };

  return descriptor;
}

class Calculator {
  @log
  add(a: number, b: number) {
    return a + b;
  }
}

const calculator = new Calculator();
calculator.add(2, 3);
// Output:
// Calling add with arguments: 2, 3
// Method add returned: 5