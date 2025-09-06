/**
 * 组合模式
 * 子对象和复合对象有共同的属性和方法，这对于调用者来说不需要关心是子对象还是复合对象，
 * 组件 定义接口
 * 叶子对象实现接口，但没有子对象
 * 容器 实现接口，可以包含叶子对象
 */

interface IFileSystemComponent {
  name: string;
  display: () => void;
  scan: (fn: (arg: IFileSystemComponent[]) => void) => void;
  getSize(): number;
  getName(): string;
}

class MyFile implements IFileSystemComponent {
  name: string;
  size: number;
  constructor(name: string, size: number) {
    this.name = name;
    this.size = size;
  }

  display() {
    console.log(`名称：${this.name} 类型：文件, 大小：${this.size}`);
  }
  scan(fn: (arg: IFileSystemComponent[]) => void) {
    return;
  }
  getSize(): number {
    return this.size;
  }
  getName(): string {
    return this.name;
  }
}

class MyFloder implements IFileSystemComponent {
  name: string;
  children: IFileSystemComponent[];
  constructor(name: string) {
    this.name = name;
    this.children = [];
  }
  display() {
    console.log(`名称：${this.name} 类型：文件夹, 大小：${this.getSize()}`);
  }
  scan(fn: (arg: IFileSystemComponent[]) => void) {
    fn(this.children);
    return;
  }
  add(node: IFileSystemComponent) {
    const nodeName = node.name;
    const hasSame = this.children.find((item) => item.name === nodeName);
    if (hasSame) {
      console.log("已经有相同文字的文件，不能再次天假");
      return this;
    }
    this.children.push(node);
    return this;
  }
  remove(node: IFileSystemComponent) {
    const index = this.children.indexOf(node);
    if (index != -1) {
      this.children.splice(index, 1);
    }
    return this;
  }
  getSize(): number {
    return this.children.reduce((total, child) => child.getSize() + total, 0);
  }
  getName(): string {
    return this.name;
  }
}

const OneFoler = new MyFloder("文件夹1号");
const TwoFoler = new MyFloder("文件夹二号");

const OneFile = new MyFile("1.pdf", 23);
const TwoFile = new MyFile("2.md", 100);

OneFoler.add(TwoFoler)?.add(OneFile);
TwoFoler.add(TwoFile);
console.log(OneFoler.getSize());
