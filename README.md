# @richlewis/callable

Callable instances for JS, in under 10 lines of ES6!

## Motivation

Anything class be a function in _Python_ simply by implementing a `__call__` method.

For example,

```python
class ImaFunc(object):
  def __init__(self, a):
    super()
    self.a = a

  @property
  def b(self):
    return self.a + 10

  def __call__(self, c):
  return [self.a, self.b, c]

f = ImaFunc(10)
f(30)                  # [10, 20, 30]
```

This can be really useful: the callable method has access to the member attributes and properties, so we can change how the function behaves post instatiation:

```python
f.a = 40
f(60)                  # [40, 50, 60]
```

Additionally, the instance works with the class hierarchy nicely:

```python
isinstance(f, ImaFunc) # True
isinstance(f, object)  # True
callable(f)            # True
```

However, in JavaScript, this is not so straightforward... until now!!

### Install

For `node`:

```shell
npm install @richlewis/callable
```

For the browser, you can include a script tag to pull the library from unpkg:

```html
<script
  type="text/javascript"
  src="https://unpkg.com/@richlewis/callable"
></script>
```

### Usage

Inherit from the default export of this library, `Callable`:

```javascript
class ImaFunc extends Callable {
  constructor(a) {
    super()
    this.a = a
  }

  get b() {
    return this.a + 10
  }

  __call__(c) {
    return [this.a, this.b, c]
  }
}

const f = new ImaFunc(10)
f(30) // [10, 20, 30]

f instanceof ImaFunc // true
f instanceof Callable // true
f instanceof Object // true
f instanceof Function // true
```

Now you can do some func-y tricks:

```javascript
class SubFunc extends ImaFunc {
  constructor(a, d) {
    super(a)
    this.d = d
  }

  get e() {
    return this.d + 10
  }

  __call__(c, f) {
    return [...super.__call__(c), this.d, this.e, f]
  }
}

new SubFunc(10, 40)(30, 60) // [10, 20, 30, 40, 50, 60]
```

## How does it work?

Callable hijacks the constructor, returning a `function` that executes the `__call__` function bound to itself.
This function gets the prototype and member properties from the `this` object, and thus the inheritance chain is repaired!

## Prior Art

Other libraries that present similar functionality:

- [callable-instance](https://www.npmjs.com/package/callable-instance)

## License

[MIT][https://opensource.org/licenses/mit] @ [Rich Lewis][https://richlew.is/]
