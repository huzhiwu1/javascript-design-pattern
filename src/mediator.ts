// 什么是中介者模式？
// ​​中介者模式​​是一种行为设计模式，其核心思想是​​用一个中介对象来封装一系列对象之间的交互​​。

// ∙
// ​​目的​​：解除多个对象之间相互引用的耦合，使它们不必显式地相互引用。这样一来，这些对象可以独立地改变它们之间的交互，而是通过中介者进行通信。

// ∙
// ​​核心角色​​：

// 1.
// ​​中介者​​：定义一个接口用于与各同事对象通信。

// 2.
// ​​具体中介者​​：实现中介者接口，协调各同事对象的行为。它知道所有同事对象，并负责它们的交互逻辑。

// 3.
// ​​同事类​​：每个同事对象都知道它的中介者对象，但它只与中介者通信，而不与其他同事直接通信。当需要与其他同事交互时，会通过中介者来转发请求。

interface ChatMediator {
  addUser(user: User): void;
  // 这里user指代发消息的人
  sendMessage(msg: string, user: User): void;
}

class User {
  constructor(
    private name: string,
    private chatMediatorController: ChatMediator
  ) {
    this.chatMediatorController.addUser(this);
  }
  send(msg: string) {
    this.chatMediatorController.sendMessage(msg, this);
    console.log(`用户 ${this.name} 发送了一条消息: ${msg}`);
  }

  receive(msg: string, user: User) {
    console.log(`用户 ${this.name} 接收了一条来自${user.name}的信息：${msg}`);
  }
}

class ChatMeditatorImp implements ChatMediator {
  constructor(private users: User[] = []) {}
  addUser(user: User): void {
    if (!this.users.includes(user)) {
      this.users.push(user);
    }
  }
  removeUser(user: User) {
    const index = this.users.indexOf(user);
    if (index !== -1) {
      this.users.splice(index, 1);
    }
  }
  sendMessage(msg: string, user: User): void {
    for (let user of this.users) {
      user.receive(msg, user);
    }
  }
}
const QQChatRoom = new ChatMeditatorImp();
const mike = new User("mike", QQChatRoom);
const lisa = new User("lisa", QQChatRoom);
const jone = new User("jone", QQChatRoom);
const alisa = new User("alisa", QQChatRoom);
alisa.send("大家好，我是alisa");
jone.send("你好呀，alisa");
QQChatRoom.removeUser(alisa);
alisa.send("你好jone");
