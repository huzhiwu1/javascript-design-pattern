type Handler<T extends any> = (payload: T) => void;
class EventEmitter {
  events: Record<string, Handler<any>[]>;
  constructor() {
    this.events = {};
  }

  on<T>(eventName: string, handler: Handler<T>) {
    if (this.events[eventName]) {
      const index = this.events[eventName].indexOf(handler);
      if (index !== -1) {
        return;
      }
      this.events[eventName].push(handler);
      return;
    }
    this.events[eventName] = [handler];
  }

  off<T>(eventName: string, handler?: Handler<T>) {
    if (!this.events[eventName]) {
      return;
    }
    if (handler) {
      const index = this.events[eventName].indexOf(handler);
      if (index !== -1) {
        this.events[eventName].splice(index, 1);
      }
    }
    if (!handler) {
      delete this.events[eventName];
    }
  }

  emit<T>(eventName: string, payload: T) {
    if (this.events[eventName]?.length !== 0) {
      this.events[eventName].forEach((handler) => handler(payload));
    }
  }

  once<T>(eventName: string, handler: Handler<T>) {
    const onceFn = (payload: T) => {
      handler(payload);
      this.off(eventName, onceFn);
    };
    this.on(eventName, handler);
  }
}
