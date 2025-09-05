/**
 * 原型链继承缺点：属性在原型链上，子类实例修改了属性，就会导致所有子类的属性变更
 * 构造函数继承缺点：方法都在构造函数中，无法实现方法的复用，每次创建一个构造函数，都需要重复写一次继承的方法
 */
// 组合式继承
function Person(name, age) {
    this.name = name
    this.age = age
}
Person.prototype.sayMyName = function () {
    console.log("my name = ", this.name)
}
Person.prototype.sayMyAge = function () {
    console.log("my age = ", this.age)
}

function Teacher(name, age) {
    Person.call(this, name, age) // 一次调用
}

// 这里会导致constructor指向Person
Teacher.prototype = new Person() // 二次调用
Teacher.constructor = Teacher

const mathTeacher = new Teacher("mike", 40)

mathTeacher.sayMyAge();
mathTeacher.sayMyName();
console.log(mathTeacher.constructor, mathTeacher.__proto__)


const chineseTeacher = new Teacher("ada", 50)
// 子类实例修改不会影响到其他子类
mathTeacher.age = 40

chineseTeacher.sayMyAge();
chineseTeacher.sayMyName();

console.log(chineseTeacher.constructor, chineseTeacher.__proto__)

/**
 * 组合类继承会导致父类调用两次
 * 
 * 下面是寄生式组合继承
 */

function extendsPrototype(fn, target) {
    const prototype = Object.create(target.prototype)
    prototype.constructor = fn
    fn.prototype = prototype
}

function Student(name, age) {
    Person.call(this, name, age)
}

extendsPrototype(Student, Person)

const aStudent = new Student("lisa", 12)

aStudent.sayMyAge()
aStudent.sayMyName()
console.log(aStudent.constructor, aStudent.__proto__)

const bStudent = new Student("seven", 13)
aStudent.age = 15


bStudent.sayMyAge()
bStudent.sayMyName()
console.log(bStudent.constructor, bStudent.__proto__)