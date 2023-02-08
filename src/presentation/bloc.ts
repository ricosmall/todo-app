type Subscription<S> = (state: S) => void;

export default class Bloc<T> {
  private internalState: T;
  private listeners: Subscription<T>[] = [];

  public constructor(initialState: T) {
    this.internalState = initialState;
  }

  public get state(): T {
    return this.internalState;
  }

  public changeState(state: T) {
    this.internalState = state;

    this.listeners.forEach((listener) => listener(this.state));
  }

  public subscribe(listener: Subscription<T>) {
    this.listeners.push(listener);
  }

  public unsubscribe(listener: Subscription<T>) {
    const index = this.listeners.indexOf(listener);
    if (index > -1) {
      this.listeners.splice(index, 1);
    }
  }
}
