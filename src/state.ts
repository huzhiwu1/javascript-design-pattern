// 状态模式（State Pattern）是一种行为设计模式，允许对象在其内部状态改变时改变它的行为，使对象看起来似乎修改了它的类。该模式将状态抽象为独立类，并将与状态相关的行为转移到这些类中。

// 状态模式的核心组件：
// 1.
// ​​Context（上下文）​​：维护当前状态，并将状态相关操作委托给当前状态对象。

// 2.
// ​​State（状态接口）​​：定义所有具体状态必须实现的方法。

// 3.
// ​​ConcreteState（具体状态）​​：实现特定状态下的行为，并管理状态转换逻辑。

// 状态接口
interface IPlayState {
  play(): void;
  stop(): void;
  pause(): void;
  nextMusic(): void;
  prevMusic(): void;
}

class PlayState implements IPlayState {
  constructor(private readonly context: MusicPlayer) {}
  play(): void {
    console.log(
      `已经是播放状态了,无效操作, 当前播放的是${
        this.context.musicStack[this.context.currentMusicIndex]
      }`
    );
  }
  stop(): void {
    console.log("停止播放音乐");
    this.context.setState(new StopState(this.context));
  }
  pause(): void {
    console.log("暂停播放音乐");
    this.context.setState(new PauseState(this.context));
  }
  nextMusic(): void {
    console.log("切换到下一首");
    this.context.currentMusicIndex =
      (this.context.currentMusicIndex + 1) % this.context.musicStack.length;
    console.log(
      `当前播放的是${this.context.musicStack[this.context.currentMusicIndex]}`
    );
  }
  prevMusic(): void {
    console.log("切换到上一首");
    this.context.currentMusicIndex =
      (this.context.currentMusicIndex - 1 + this.context.musicStack.length) %
      this.context.musicStack.length;
    console.log(
      `当前播放的是${this.context.musicStack[this.context.currentMusicIndex]}`
    );
  }
}

class StopState implements IPlayState {
  constructor(private readonly context: MusicPlayer) {}
  play(): void {
    console.log("继续播放音乐");
    this.context.setState(new PlayState(this.context));
  }
  stop(): void {
    console.log("已经停止播放音乐了，无效操作");
  }
  pause(): void {
    console.log("播放器已经停止，无法暂停");
  }
  nextMusic(): void {
    console.log("切换到下一首");
    this.context.currentMusicIndex =
      (this.context.currentMusicIndex + 1) % this.context.musicStack.length;
  }
  prevMusic(): void {
    console.log("切换到上一首");
    this.context.currentMusicIndex =
      (this.context.currentMusicIndex - 1 + this.context.musicStack.length) %
      this.context.musicStack.length;
  }
}

class PauseState implements IPlayState {
  constructor(private readonly context: MusicPlayer) {}
  play(): void {
    console.log("继续播放音乐");
    this.context.setState(new PlayState(this.context));
  }
  stop(): void {
    console.log("停止播放音乐");
    this.context.setState(new StopState(this.context));
  }
  pause(): void {
    console.log("已经暂停播发音乐了，无效操作");
  }
  nextMusic(): void {
    console.log("切换到下一首");
    this.context.currentMusicIndex =
      (this.context.currentMusicIndex + 1) % this.context.musicStack.length;
    this.context.setState(new PlayState(this.context));
  }
  prevMusic(): void {
    console.log("切换到上一首");
    this.context.currentMusicIndex =
      (this.context.currentMusicIndex - 1 + this.context.musicStack.length) %
      this.context.musicStack.length;
    this.context.setState(new PlayState(this.context));
  }
}

class MusicPlayer implements IPlayState {
  private state: IPlayState;
  musicStack: string[] = ["音乐1", "音乐2", "音乐3", "音乐4", "音乐5", "音乐6"];
  currentMusicIndex: number = 0;
  constructor() {
    this.state = new StopState(this);
  }
  play(): void {
    this.state.play();
  }
  stop(): void {
    this.state.stop();
  }
  pause(): void {
    this.state.pause();
  }
  nextMusic(): void {
    this.state.nextMusic();
  }
  prevMusic(): void {
    this.state.prevMusic();
  }

  setState(state: IPlayState) {
    this.state = state;
  }

  displayStatus() {
    console.log(
      `当前状态：${this.state.constructor.name.replace("State", "")}`,
      `音乐曲目：${this.musicStack[this.currentMusicIndex]}`,
      `播放列表：${this.musicStack.join(" ")}`
    );
  }
}

// 客户端使用
const player = new MusicPlayer();

console.log("===== 音乐播放器演示 =====");
player.displayStatus();

console.log("\n操作: 播放");
player.play();

console.log("\n操作: 下一首");
player.nextMusic();

console.log("\n操作: 暂停");
player.pause();

console.log("\n操作: 上一首");
player.prevMusic();

console.log("\n操作: 播放");
player.play();

console.log("\n操作: 停止");
player.stop();

player.displayStatus();
