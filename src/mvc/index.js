// MVC（Model-View-Controller）是一种软件设计模式，用于将应用程序分为三个主要部分：模型（Model）、视图（View）和控制器（Controller）。这种分离有助于管理复杂的应用程序，通过分离关注点来改进代码组织和可维护性。
// ∙
// ​​Model（模型）​​：负责处理应用程序的数据逻辑。它直接管理数据、逻辑和规则。
// ∙
// ​​View（视图）​​：负责显示数据（模型）并将用户交互（例如鼠标点击、键盘输入）传递给控制器。
// ∙
// ​​Controller（控制器）​​：充当模型和视图之间的中介。它处理用户输入（来自视图），更新模型，并更新视图以反映模型的变化。
// 在TypeScript中实现MVC模式，我们可以创建三个类分别代表Model、View和Controller，并定义它们之间的交互。
// 下面是一个简单的例子：一个计数器应用程序。用户可以通过按钮增加或减少计数，并在视图中看到当前计数值。
// 步骤：
// 1.
// 定义Model：管理计数状态。
// 2.
// 定义View：包含显示计数的元素和按钮，并处理用户界面事件（但事件处理会调用控制器的方法）。
// 3.
// 定义Controller：响应用户操作（通过View），更新Model，并更新View以显示最新的Model数据。
var CountView = /** @class */ (function () {
    function CountView() {
        this.incrementDom = document.getElementsByClassName("increment")[0];
        this.decrementDom = document.getElementsByClassName("decrement")[0];
        this.countViewDom = document.getElementsByClassName("count")[0];
    }
    CountView.prototype.bindIncrementEvent = function (fn) {
        // 避免this指向window,这里使用箭头函数
        this.incrementDom.addEventListener("click", fn);
    };
    CountView.prototype.bindDecrementEvent = function (fn) {
        this.decrementDom.addEventListener("click", fn);
    };
    CountView.prototype.setCount = function (count) {
        this.countViewDom.textContent = "".concat(count);
    };
    return CountView;
}());
var CountModel = /** @class */ (function () {
    function CountModel(count, addStep, minusStep, listeners) {
        if (count === void 0) { count = 0; }
        if (addStep === void 0) { addStep = 1; }
        if (minusStep === void 0) { minusStep = 1; }
        if (listeners === void 0) { listeners = []; }
        this.count = count;
        this.addStep = addStep;
        this.minusStep = minusStep;
        this.listeners = listeners;
    }
    CountModel.prototype.addListener = function (fn) {
        if (!this.listeners.includes(fn)) {
            this.listeners.push(fn);
        }
    };
    CountModel.prototype.removeListener = function (fn) {
        var index = this.listeners.indexOf(fn);
        if (index !== -1) {
            this.listeners.splice(index, 1);
        }
    };
    CountModel.prototype.notify = function () {
        for (var _i = 0, _a = this.listeners; _i < _a.length; _i++) {
            var listener = _a[_i];
            listener();
        }
    };
    CountModel.prototype.getCount = function () {
        return this.count;
    };
    CountModel.prototype.increment = function () {
        this.count += this.addStep;
        this.notify();
    };
    CountModel.prototype.decrement = function () {
        this.count -= this.minusStep;
        this.notify();
    };
    return CountModel;
}());
var CountController = /** @class */ (function () {
    function CountController(view, model) {
        var _this = this;
        this.view = view;
        this.model = model;
        // 避免this指向window，这里使用箭头函数
        this.view.bindDecrementEvent(function () { return _this.decrement(); });
        this.view.bindIncrementEvent(function () { return _this.increment(); });
        this.model.addListener(function () { return _this.updateView(); });
        this.updateView();
    }
    CountController.prototype.increment = function () {
        this.model.increment();
    };
    CountController.prototype.decrement = function () {
        this.model.decrement();
    };
    CountController.prototype.updateView = function () {
        this.view.setCount(this.model.getCount());
    };
    return CountController;
}());
document.addEventListener("DOMContentLoaded", function () {
    var countModel = new CountModel();
    var countView = new CountView();
    new CountController(countView, countModel);
});
