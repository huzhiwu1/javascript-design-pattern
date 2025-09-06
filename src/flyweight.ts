/**
 * 享元模式
 * 一个复杂的对象，如果在一个系统中有很多个对象，会造成内存泄漏
 * 此时可以将复杂对象拆分成内部状态和外部状态
 * 内部状态是不可变的，数量有限的，外部状态是数量无限的，可以多变的
 *
 * 此时享元工厂可以内部设置一个缓存池用于存储内部状态，这里限制了内存的无限增大
 * 客户端调调用享元工厂后，可以在存储外部状态
 *
 */

/**
 *  一个游戏系统，有很多个游戏角色，这是内存消耗最大的地方
 * 一个游戏角色，不变的是，游戏角色的类型：战士，法师，射手，肉盾，刺客，以及释放的技能的方法
 * 变的是游戏角色的名字，游戏等级
 */

enum RoleType {
  "刺客" = "刺客",
  "战士" = "战士",
  "法师" = "法师",
  "肉盾" = "肉盾",
  "射手" = "射手",
}

const RoleBaseHurt = {
  [RoleType.刺客]: 1,
  [RoleType.射手]: 2,
  [RoleType.战士]: 3,
  [RoleType.法师]: 4,
  [RoleType.肉盾]: 5,
};

class GameRole {
  roleType: RoleType;
  constructor(type: RoleType) {
    this.roleType = type;
  }
  skill(person: GamePeople) {
    console.log(
      `我是${person.name},我的等级是${person.level}，我的角色是${
        this.roleType
      },我释放的技能伤害是${RoleBaseHurt[this.roleType] * person.level}`
    );
  }
}

class GamePeople {
  name: string;
  level: number;
  gameRole: GameRole;
  constructor(name: string, level: number, gameRole: GameRole) {
    this.name = name;
    this.level = level;
    this.gameRole = gameRole;
  }
  skill() {
    this.gameRole.skill(this);
  }
}

class GameRoleFactory {
  gameRolesMap: Map<RoleType, GameRole>;
  constructor() {
    this.gameRolesMap = new Map();
  }
  getGameRole(role: RoleType): GameRole {
    if (this.gameRolesMap.has(role)) {
      return this.gameRolesMap.get(role)!;
    }
    const gameRole = new GameRole(role);
    this.gameRolesMap.set(role, gameRole);
    return gameRole;
  }
  getGameRolTotal() {
    return this.gameRolesMap.size;
  }
}

class GameSystem {
  gamePeopleArr: GamePeople[];
  gameRoleFactory: GameRoleFactory;
  constructor() {
    this.gamePeopleArr = [];
    this.gameRoleFactory = new GameRoleFactory();
  }
  createGamePeople(name: string, level: number, roleType: RoleType) {
    const gameRole = this.gameRoleFactory.getGameRole(roleType);
    const gamePeople = new GamePeople(name, level, gameRole);
    this.gamePeopleArr.push(gamePeople);
    return gamePeople;
  }

  getGamePeopleNum() {
    return this.gamePeopleArr.length;
  }

  getGameRoleTotal() {
    return this.gameRoleFactory.getGameRolTotal();
  }
}
