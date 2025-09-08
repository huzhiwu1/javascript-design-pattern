// 观察者模式是一种行为设计模式，它定义了对象之间的一对多依赖关系，当一个对象（被观察者）的状态发生改变时，所有依赖于它的对象（观察者）都会自动得到通知并更新。

// 核心概念
// 观察者模式包含两个主要角色：

// 1.
// ​​Subject（被观察者/主题）​​：维护一个观察者列表，提供添加、删除和通知观察者的方法。

// 2.
// ​​Observer（观察者）​​：定义一个更新接口，用于在收到主题通知时进行更新。

interface IObserver {
  update(subject: ISubject): void;
}
interface ISubject {
  register(observer: IObserver): void;
  remove(observer: IObserver): void;
  notify(): void;
  getData(): string[];
}

/**
 * 新闻中心
 */

class PressCenterSubject implements ISubject {
  constructor(
    private observers: IObserver[] = [],
    private news: string[] = []
  ) {}
  register(observer: IObserver): void {
    if (!this.observers.includes(observer)) {
      this.observers.push(observer);
    }
  }
  remove(observer: IObserver): void {
    const index = this.observers.indexOf(observer);
    if (index !== -1) {
      this.observers.splice(index, 1);
    }
  }
  notify(): void {
    for (let observer of this.observers) {
      observer.update(this);
    }
  }

  getData() {
    return this.news;
  }

  addNews(msg: string) {
    this.news.push(msg);
    this.notify();
  }
}

class IPhone implements IObserver {
  update(subject: ISubject): void {
    const msgs = subject.getData();
    console.log("苹果手机收到了新闻消息", msgs[msgs.length - 1]);
  }
}

class TV implements IObserver {
  update(subject: ISubject): void {
    const msgs = subject.getData();
    console.log("电视收到了新闻消息", msgs[msgs.length - 1]);
  }
}

const newsStation = new PressCenterSubject();
const myIphone = new IPhone();
const myTV = new TV();
newsStation.register(myIphone);
newsStation.register(myTV);
newsStation.addNews("特朗普在演讲时遇刺");
