import Callable from '../callable'

describe('Callable', () => {
  it('should export a constructor function', () => {
    expect(Callable).toBeDefined()
    expect(Callable).toBeInstanceOf(Function)
  })
  it('should instantiate objects', () => {
    expect(new Callable()).toBeInstanceOf(Object)
  })
  it('should instantiate functions', () => {
    expect(new Callable()).toBeInstanceOf(Function)
  })
  it('should instantiate instances of itself', () => {
    expect(new Callable()).toBeInstanceOf(Callable)
  })

  class SubClass extends Callable {}
  const subclass = n => 'should subclass to classes ' + n

  it(subclass('which instantiate objects'), () => {
    expect(new SubClass()).toBeInstanceOf(Object)
  })
  it(subclass('which instantiate functions'), () => {
    expect(new SubClass()).toBeInstanceOf(Function)
  })
  it(subclass('which instantiate instances of itself'), () => {
    expect(new SubClass()).toBeInstanceOf(Callable)
  })
  it(subclass('which instantiate instances of the subclass'), () => {
    expect(new SubClass()).toBeInstanceOf(SubClass)
  })

  class SubSubClass extends SubClass {}
  const subsubclass = n => 'should subclass to subclasses ' + n

  it(subsubclass('which instantiate objects'), () => {
    expect(new SubSubClass()).toBeInstanceOf(Object)
  })
  it(subsubclass('which instantiate functions'), () => {
    expect(new SubSubClass()).toBeInstanceOf(Function)
  })
  it(subsubclass('which instantiate instances of itself'), () => {
    expect(new SubSubClass()).toBeInstanceOf(Callable)
  })
  it(subsubclass('which instantiate instances of the subclass'), () => {
    expect(new SubSubClass()).toBeInstanceOf(SubClass)
  })

  it(subclass('whose instances are callable'), () => {
    class Test extends Callable {
      __call__() {
        return 'testvalue'
      }
    }
    const test = new Test()
    expect(test()).toEqual('testvalue')
  })

  it(subclass("whose instances' callable function takes arguments"), () => {
    class Test extends Callable {
      __call__(e, s, t) {
        return [t, e, s, t]
      }
    }
    expect(new Test()(1, 2, 3)).toEqual([3, 1, 2, 3])
  })

  it(
    subclass('whose constructors allow values to be set on its instances'),
    () => {
      class Test extends Callable {
        constructor(test) {
          super()
          this.test = test
        }
      }
      expect(new Test('testvalue').test).toEqual('testvalue')
    }
  )

  it('should have subclasses whose call function can access its properties', () => {
    class Test extends Callable {
      test = 'testvalue'

      __call__() {
        return this.test
      }
    }
    expect(new Test()()).toEqual('testvalue')
  })

  it('should have subclasses whose call function can access properties set in constructor', () => {
    class Test extends Callable {
      constructor(test) {
        super()
        this.test = test
      }
      __call__() {
        return this.test
      }
    }
    expect(new Test('testvalue')()).toEqual('testvalue')
  })
})

import IndexCallable from '..'
describe('index', () => {
  it('should export Callable', () => {
    expect(IndexCallable).toBe(Callable)
  })
})
