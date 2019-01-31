export const call = Symbol('call')

export default class Callable extends Function {
  constructor() {
    super()
    const callable = (...args) =>
      new.target.prototype[call].apply(callable, args)
    Object.setPrototypeOf(callable, new.target.prototype)
    return Object.assign(callable, this)
  }
  [call]() {}
}
