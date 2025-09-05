abstract class AbstractUI {
  constructor() {}
  abstract render(): void;
}

abstract class AbstractUIFactor {
  constructor() {}
  abstract createButton(): AbstractUI;
  abstract createMenu(): AbstractUI;
}

class MacOSUIButton implements AbstractUI {
  constructor() {}
  render() {
    console.log("渲染macos ui按钮组件");
  }
}
class MacOSUIMenu implements AbstractUI {
  constructor() {}
  render() {
    console.log("渲染macos 菜单栏组件");
  }
}
class MacOSUIFactory implements AbstractUIFactor {
  constructor() {}
  createButton(): AbstractUI {
    return new MacOSUIButton();
  }
  createMenu(): AbstractUI {
    return new MacOSUIMenu();
  }
}

class WindowUIButton implements AbstractUI {
  constructor() {}
  render() {
    console.log("渲染 window 按钮组件");
  }
}

class WindowUIMenu implements AbstractUI {
  constructor() {}
  render() {
    console.log("渲染 window 菜单栏组件");
  }
}

class WindowUIFactor implements AbstractUIFactor {
  constructor() {}
  createButton(): AbstractUI {
    return new WindowUIButton();
  }
  createMenu(): AbstractUI {
    return new WindowUIMenu();
  }
}
const macosUIFactor = new MacOSUIFactory();
const macosUIButton = macosUIFactor.createButton();
const macOSUIMenu = macosUIFactor.createMenu();

macOSUIMenu.render();
macosUIButton.render();

const windowUIFactor = new WindowUIFactor();
const windowUIButton = windowUIFactor.createButton();
const windowUIMenu = windowUIFactor.createMenu();

windowUIButton.render();
windowUIMenu.render();
