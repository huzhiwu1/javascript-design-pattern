/**
 * 如果有两个不同的数据接口
 * 数据接口不一致，但是功能具体相同
 * 那可以使用适配器模式
 * A -> adapter -> B
 */

enum ILoggerLevel {
  Error = "Error",
  Log = "Log",
  Warn = "Warn",
  Debug = "Debug",
  Info = "Info",
}
/**
 * 统一的目标接口
 */
interface ILogger {
  log(msg: string, level: ILoggerLevel): void;
  info(msg: string): void;
  warn(msg: string): void;
  error(msg: string, error: Error): void;
  debug(msg: string): void;
}

/**
 * 现有的API
 */
class ConsoleLogger {
  logToConsole(msg: string, level: string) {
    const timestamp = new Date().toUTCString();
    console.log(`[${timestamp}] [${msg}] [${level.toUpperCase()}]`);
  }
}

class FileLogger {
  private logFile: string;
  constructor(logFile: string) {
    this.logFile = logFile;
  }
  writeToFile(msg: string, level: string) {
    const timestamp = new Date().toUTCString();
    console.log(
      `模拟写入文件${this.logFile} [${msg}] [${level.toUpperCase()}]`
    );
  }
}

/**
 * 使用适配器，实现目标接口
 */
class ConsoleLoggerAdapter implements ILogger {
  private consoleLogger: ConsoleLogger;
  constructor() {
    this.consoleLogger = new ConsoleLogger();
  }
  log(msg: string, level: ILoggerLevel): void {
    this.consoleLogger.logToConsole(msg, level);
  }
  info(msg: string): void {
    this.consoleLogger.logToConsole(msg, ILoggerLevel.Info);
  }
  warn(msg: string): void {
    this.consoleLogger.logToConsole(msg, ILoggerLevel.Warn);
  }
  error(msg: string, error: Error): void {
    this.consoleLogger.logToConsole(`${msg} ${error}`, ILoggerLevel.Error);
  }
  debug(msg: string): void {
    this.consoleLogger.logToConsole(msg, ILoggerLevel.Debug);
  }
}

class FileLoggerAdapter implements ILogger {
  private fileLogger: FileLogger;
  constructor(logFile: string = "app.log") {
    this.fileLogger = new FileLogger(logFile);
  }
  log(msg: string, level: ILoggerLevel): void {
    this.fileLogger.writeToFile(msg, level);
  }
  info(msg: string): void {
    this.fileLogger.writeToFile(msg, ILoggerLevel.Info);
  }
  warn(msg: string): void {
    this.fileLogger.writeToFile(msg, ILoggerLevel.Warn);
  }
  error(msg: string, error: Error): void {
    this.fileLogger.writeToFile(`${msg} ${error}`, ILoggerLevel.Error);
  }
  debug(msg: string): void {
    this.fileLogger.writeToFile(msg, ILoggerLevel.Debug);
  }
}

/**
 * 组合使用所有的日志打印器
 */
class CompositeLogger implements ILogger {
  loggers: ILogger[];
  constructor() {
    this.loggers = [];
  }
  log(msg: string, level: ILoggerLevel): void {
    this.loggers.forEach((item) => item.log(msg, level));
  }
  info(msg: string): void {
    this.loggers.forEach((item) => item.info(msg));
  }
  warn(msg: string): void {
    this.loggers.forEach((item) => item.warn(msg));
  }
  error(msg: string, error: Error): void {
    this.loggers.forEach((item) => item.error(msg, error));
  }
  debug(msg: string): void {
    this.loggers.forEach((item) => item.debug(msg));
  }
  addLogger(logger: ILogger) {
    this.loggers.push(logger);
  }
  removerLogger(logger: ILogger) {
    const index = this.loggers.indexOf(logger);
    this.loggers.splice(index, 1);
  }
}

function main() {
  const logToConsole = new ConsoleLoggerAdapter();
  const fileLogger = new FileLoggerAdapter();
  const compositeLogger = new CompositeLogger();

  compositeLogger.addLogger(logToConsole);
  compositeLogger.addLogger(fileLogger);

  compositeLogger.log("测试", ILoggerLevel.Info);
}
main();
