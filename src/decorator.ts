function logMethod(target: any, key: any, descriptor: PropertyDescriptor) {
  const originFn = descriptor.value;
  descriptor.value = function (...args: any[]) {
    console.log(`${key}的传入参数是${JSON.stringify(args)}`);
    const result = originFn.apply(this, args);
    console.log(`${key}的执行结果是${result}`);
    return result;
  };
}

// type ClassInstanceType<T extends { new (...args: any[]): {} }> = T extends {
//   new (...args: any[]): infer U;
// }
//   ? U
//   : any;

function singleTon<T extends { new (...args: any[]): {} }>(construct: T) {
  let instance: InstanceType<T> | null = null;
  return class extends construct {
    constructor(...args: any[]) {
      if (instance) {
        return instance;
      }
      super(...args);
      instance = this as InstanceType<T>;
    }
  };
}

@singleTon
class Example {
  constructor() {}
  @logMethod
  addNums(...args: number[]) {
    return args.reduce((cur, pre) => cur + pre);
  }
}
const a = new Example();
a.addNums(1, 3, 4, 7, 8);

const b = new Example();
console.log(a === b);
