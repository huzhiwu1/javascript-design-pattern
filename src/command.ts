// 命令模式是一种​​行为设计模式​​，它将请求封装成一个独立的对象（命令），允许你参数化客户端对象（调用者）与不同的请求，支持请求的排队、记录、撤销/重做等操作。

// 核心组成：
// 1.
// ​​Command（命令接口）​​：声明执行操作的接口

// 2.
// ​​ConcreteCommand（具体命令）​​：实现命令接口，绑定接收者与动作

// 3.
// ​​Invoker（调用者）​​：触发命令的对象

// 4.
// ​​Receiver（接收者）​​：实际执行操作的对象

// 5.
// ​​Client（客户端）​​：创建命令对象并设置接收者

// 命令接口
interface ICommand {
  execute(): void;
  undo(): void;
}

// 接收者，编辑器
class Editor {
  constructor(private text: string = "", private clipboard: string = "") {}
  insertText(text: string, start: number) {
    this.text = this.text.slice(0, start) + text + this.text.slice(start);
    console.log(
      `成功插入文本“${text}，插入位置：${start} 当前文本${this.text}”`
    );
  }

  deleteText(start: number, end: number) {
    const deletedText = this.text.slice(start, end);
    this.text = this.text.slice(0, start) + this.text.slice(end);
    console.log(
      `成功删除文本${deletedText},删除位置[${start},${end}],当前文本${this.text}`
    );
    return deletedText;
  }

  copyText(start: number, end: number) {
    const copyText = this.text.slice(start, end);
    this.setClipboard(copyText);
    console.log(`成功复制文本${copyText}`);
    return copyText;
  }

  pasteText(start: number) {
    if (this.clipboard) {
      this.text =
        this.text.slice(0, start) + this.clipboard + this.text.slice(start);
    }
    console.log(
      `成功黏贴文本${this.clipboard}, 黏贴位置${start}, 当前文本: ${this.text}`
    );
  }

  getClipboard() {
    return this.clipboard;
  }

  setClipboard(text: string) {
    this.clipboard = text;
  }

  getText() {
    return this.text;
  }
}

// 具体命令
class InsertTextCommand implements ICommand {
  constructor(
    private editor: Editor,
    private text: string,
    private position: number
  ) {}
  execute() {
    this.editor.insertText(this.text, this.position);
  }
  undo() {
    this.editor.deleteText(this.position, this.position + this.text.length);
  }
}

// 具体命令
class CopyTextCommand implements ICommand {
  private prevClipboard: string = "";
  constructor(
    private editor: Editor,
    private start: number,
    private end: number
  ) {}
  execute() {
    this.prevClipboard = this.editor.getClipboard();
    this.editor.copyText(this.start, this.end);
  }
  undo() {
    // this.editor.copyText
    this.editor.setClipboard(this.prevClipboard);
  }
}

// 具体命令
class PasteTextCommand implements ICommand {
  pasteTextLength: number = 0;
  constructor(private editor: Editor, private start: number) {}
  execute() {
    this.pasteTextLength = this.editor.getClipboard().length;
    this.editor.pasteText(this.start);
  }
  undo() {
    this.editor.deleteText(this.start, this.pasteTextLength);
  }
}

// 具体命令
class DeleteTextCommand implements ICommand {
  deletedText: string = "";
  constructor(
    private editor: Editor,
    private start: number,
    private end: number
  ) {}
  execute() {
    this.deletedText = this.editor.deleteText(this.start, this.end);
  }
  undo() {
    this.editor.insertText(this.deletedText, this.start);
  }
}

class EditorController {
  constructor(
    private history: ICommand[] = [],
    private redoStack: ICommand[] = []
  ) {}

  executeCommand(command: ICommand) {
    command.execute();
    this.history.push(command);
    this.redoStack = [];
  }

  undo() {
    const command = this.history.pop();
    if (command) {
      command.undo();
      this.redoStack.push(command);
    }
  }
  redo() {
    const command = this.redoStack.pop();
    if (command) {
      command.execute();
      this.history.push(command);
    }
  }
}

//客户端使用
const editor = new Editor();
const controller = new EditorController();

// 模拟用户操作
controller.executeCommand(new InsertTextCommand(editor, "Hello, world!", 0));
controller.executeCommand(new InsertTextCommand(editor, "TypeScript ", 7)); // 在位置7插入，即"Hello, "后面

console.log(editor.getText());

controller.executeCommand(
  new CopyTextCommand(editor, 7, editor.getText().length)
);

controller.executeCommand(
  new PasteTextCommand(editor, editor.getText().length)
);

console.log(editor.getText());
