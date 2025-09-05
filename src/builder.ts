/**
 * 当一个对象/组件的内容比较复杂，并且有多个步骤，步骤的顺序不一定相同，但都是相同的步骤，则可以使用builder模式
 */
enum RoleType {
  "admin",
  "normal",
  "vip",
  "null",
}

enum Theme {
  "white",
  "black",
}
interface Person {
  age?: number;
  name: string;
  role: RoleType;
  email: string;
  theme?: Theme;
}

class PersonBuilder {
  person: Person;
  constructor() {
    this.person = {
      email: "",
      role: RoleType.null,
      name: "",
    };
  }
  setAge(age: number) {
    this.person.age = age;
    return this;
  }
  setTheme(theme: Theme) {
    this.person.theme = theme;
    return this;
  }
  setName(name: string) {
    this.person.name = name;
    return this;
  }
  setEmail(email: string) {
    this.person.email = email;
    return this;
  }
  setRole(role: RoleType) {
    this.person.role = role;
    return this;
  }
  build() {
    if (!this.person.name) {
      console.log("名字必选");
      return null;
    }
    if (!this.person.email) {
      console.log("邮箱必选");
      return;
    }
    if (!this.person.role || this.person.role === RoleType.null) {
      console.log("用户角色必选");
      return;
    }
    return this.person;
  }
}
function personBuilderDirector() {
  const personBuilder = new PersonBuilder();
  const person = personBuilder
    .setAge(12)
    .setEmail("12312314@qq.com")
    .setRole(RoleType.admin);
  console.log(person);
  return person;
}
personBuilderDirector();
export {};
