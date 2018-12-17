export default class Callable extends Function {
  constructor() {
    super()
    const callable = (...args) =>
      new.target.prototype.__call__.apply(callable, args)
    Object.setPrototypeOf(callable, new.target.prototype)
    return Object.assign(callable, this)
  }
  __call__() {}
}
