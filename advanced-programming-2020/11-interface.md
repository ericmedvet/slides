class:center,middle

## Interfaces

---

## `interface`

Defines **only the signature** of **zero or more** **methods**:
```java
public interface Listener {
  void listen(Event event);
}
```

- Definition syntax is the same of `class`es
  - but the compiler does not require method code
- `public` is unnecessary
  - compilation fails with `protected` and `private` modifiers
- Compiles to `Listener.class`

.note[This might be an example of a code following the [observer pattern](https://en.wikipedia.org/wiki/Observer_pattern); `Event` should be properly defined elsewhere.]

---

### Details and limitations

"Defines"
- "only the signature"
  - Starting with Java 8, `interface`s may also define methods code: `default` methods and `static` methods; we'll see, briefly.
- "zero or more"
  - e.g., `Serializable`, `Cloneable`, ...
- "methods"
  - cannot define constructors! Only methods.

---

## Implementing an interface

Classes can implement zero or more interfaces:
```java
public class StandardOutputListener `implements Listener` {
  public void listen(Event event) {
    System.out.println(event);
  }
}
```
```java
public class FileListener `implements Listener, AutoCloseable` {
  public void listen(Event event) { /* ... */ }
  public void close() { /* ... */ }
}
```

Implemented methods:
- cannot reduce visibility (they have to be `public`)
- cannot enlarge `throws` clause

---

## Usage

Similar to class inheritance:

References to interface can refer implementing classes:
```java
Listener listener = new NullListener();
listener.listen(event);
```
also in method signatures:
```java
public static void broadcast(Event event, Listener[] listeners) {
  for (Listener listener : listeners) {
    listener.listen(event);
  }
}
```

---

## Instantiation

Interface **cannot be instantiated**!

```java
Listener listener = new Listener(); // `does not compile!`
```

Which code should be executed when `listener` will be invoked?
- `interface`s define only signatures!

---

## `instanceof`

Works as expected:

```java
NullListener listener = new NullListener();
if (listener instanceof Listener) {
  System.out.println("It is!")
}
```

---

## But no class inheritance!

Implementing the same `interface` does not establish inheritance-related relationships.

.compact[
```java
NullListener listener = new StandardOutputListener(); //`does not compile!`
```
```java
StandardOutputListener listener = new NullListener(); //`does not compile!`
```
]

---

## Interface inheritance

An interface may extend one or more interfaces:
```java
public interface MultipleListener extends Listener {
  void listen(Event[] events);
}
```

A class implementing `MultipleListener` must define both methods:
- `void listen(Event[])`
- `void listen(Event)`

---

### Multiple interface inheritance

"may extend one **or more**"

Why allowed with `interface`s and not with `class`es?

Suppose a **class** $C$ extends $C'$ and $C''$ and both have a method $m$ with the very same signature
- which one has to be executed at runtime?

Suppose an **interface** $I$ extends $I'$ and $I''$ and both have a method $m$ with the very same signature
- they do not have code not: no problems!

---

- designing interfaces (motivation):
  - define something that do some operations
  - build complex functionality with that thing
    - can be extended in future
- examples
  - Listener
  - Runnable
- use in code:
  - use always the most general type
- abstract classes
- default methods in interfaces
  - default vs abstract: does not need to recompile
- enums
- annotations (briefly)

- generics
- collections
- executors
- lambdas and streams
- reflection
- serialization
