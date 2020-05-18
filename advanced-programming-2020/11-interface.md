class:center,middle

## Interfaces

### (and other language features)

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

## The dictionary says

"a surface regarded as the common boundary of two bodies, spaces, or phases"

Neither body needs to know about the inner details of the other body:
- the called does not know who is the caller
- **the caller does not know who is the called**

Non `public` methods cannot be used from outside:  
$\Rightarrow$ they are an inner detail

---

### Details and limitations

"Defines"
- "only the signature"
  - .note[Starting with Java 8, `interface`s may also define methods code: `default` methods and `static` methods; we'll see, briefly.]
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

References to interface can reference implementing classes:
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

## When to use interfaces?

Key motivation:
- define something that can perform some operations, without describing how they have to be performed

```java
public interface Listener {
  void listen(Event event);
}
```
Definition: "The listener listens"

Then, you can build whatever complex functionalities based on this definition.

---

## Future extension and `new`

Given an interface $I$ and a sw $S$ doing complex things with that $I$:
- today $S$ works with implementation $A$ of $I$
- tomorrow **same** $S$ works "better" with "newer" implementation $B$ of $I$

Example:
- $I$: `interface Listener`
- $A$: `class StandardOutputListener implements Listener`
- $B$: `class CloudLogger implements Listener`

---

## Separation of concerns

Separation of concerns: **$x$ is concerned only about being $x$!**
- $S$ has been designed without any mention to $A$!
  - no `new` $A$!
- $A$ and $B$ have been designed without any mention to $S$


$S$ need not to be updated for using $B$!

$I$ is the point of contact (i.e., **interface**) between $S$ and $A$/$B$

---

### Interface vs. class inheritance

The "same" goal might be achieved, in principle, with inheritance:
```java
public class Listener {
  public void listen(Event event) {
  }
}
```

Key differences:
- (conceptual) define just what, not how!
- (conceptual & practical) there is no empty/default implementation of operations!
  - you cannot do `new` with interfaces
- (practical) suppose to have class `A` doing operations of $A$ and class `B` doing operations of $B$, how should one define $C$ doing operations of both $A$ and $B$?
  - no multiple class inheritance

---

## Example: line processing server

Protocol (upon connection):
- client sends one text line $l$
- if $l=l_\text{quit}$, server closes connection, otherwise replies with processed line $l'=p(l)$

Server:
- listens on port $n_\text{port}$
- handles many client at a time
- never terminates (really!)
- $p:$ `String` $\to$ `String`, $l_\text{quit}$, port number **are parameters**
- server **needs not to be re-compiled** for new $p$
  - $p$ is passed at construction like port number and $l_\text{quit}$

---

## Line processor

$p:$ `String` $\to$ `String`

What is $p$? It is a command processor that takes one string and gives one string.

When building the server, we do not need to know anything else.  

```java
public interface CommandProcessor {
  String process(String input);
}
```

---

## Enhanced `LineProcessingServer`

.compact[
```java
public class LineProcessingServer {

  private final int port;
  private final String quitCommand;
  `private final CommandProcessor processor`;

  public LineProcessingServer(int port, String quitCommand, `CommandProcessor processor`) {
    /* ... */
  }

  public void start() throws IOException {
    /* ... */
  }

  /* quitCommand and processor getters */

}
```
]

.note[`RobustClientHandler` should be modified to do `server.getProcessor().process()` instead of `server.process()`; or `LineProcessingServer` might implement `CommandProcessor`.]
.question[how?]

This `LineProcessingServer` is written once and can be used many times for different kinds of processing by implementing many times `CommandProcessor`.

---

## `abstract`

Modifier that can be applied to class and method definitions.

`abstract` method:
- defines only the signature (as for interfaces)

`abstract` class:
- **cannot be instantiated**

If a class has at least one abstract method, it has to be defined as `abstract`.

The abstract class may be extended by a non-abstract class that implements the abstract methods, if any.

Naming convention: usually `Abstract`$X$

---

### Example

```java
public `abstract` class AbstractFunction {
  `public abstract double compute(double x)`;
  public double max(double[] xs) {
    double max = Double.NEGATIVE_INFINITY;
    for (double x : xs) {
      max = Math.max(compute(x), max);
    }
    return max;
  }
}
```

- the actual computation is not defined
- some other functionality is defined
  - here based on the abstract functionality

---

## Level of abstraction

`interface`s: 100% abstraction
  - no functionalities are defined

`abstract` classes: $\le$ 100% abstraction
  - some functionality may be defined

.note[Actually, with `default` and `static` methods, `interface`s may define some functionality]

Both **cannot be instantiated**!

---

## Combining `interface` and `abstract`

```java
public abstract class CountingListener implements Listener {
  private int counter = 0;
  public void listen(Event event) {
    counter = counter + 1;
    innerListen(event);
  }
  public int count() {
    return counter;
  }
  protected `abstract void innerListen(Event event)`;
}
```
---

## Anonymous class

Classes implementing interfaces or extending other classes (including `abstract` ones) can be defined "on the fly" without a name:
```java
final PrintStream ps = /* ... */
Listener listener = new Listener() {
  public void listen(Event event) {
    ps.println(event.toString());
  }
};
```

---

## Ananymous vs. named

At compile time:
  - new type defined and immediately "forgot"; cannot be reused
  - can access fields and methods of enclosing class
  - instance cannot access local variables in its enclosing scope that are not declared as `final` (or effectively final)
  - ...

At runtime: no differences wrt "normal" definition:
  - the type does have a name (something like `Main$1`, depending on where it is defined)

---

### Using `LineProcessingServer`

.compact[
```java
public class LineProcessingServer {
  /* ... */
  public LineProcessingServer(int port, String quitCommand, `CommandProcessor processor`) {
    /* ... */
  }
  /* ... */
}
```
Using with anonymous class definition:
```java
LineProcessingServer server = new LineProcessingServer(10000, "BYE", new CommandProcessor() {
  public String process(String input) {
    return input.toUpperCase();
  }
});
```
]

---

## `default` and `static` methods

Modifiers for methods defined in `interface`s:
- `default` methods provide a default implementation; implementing class may or may not override it
- `static` methods provide a static method (like for regular class methods)

---

### Examples

.compact[
```java
public interface Listener {
  void listen(Event event);
  `default` void listen(Event[] events) {
    for (Event event : events) {
      listen(event);
    }
  }
  `static` Listener null() {
    return new Listener() {
      public void listen(Event event) {/* do nothing */ };
    }
  }
  `default` Listener then(final Listener other) {
    return new Listener() {
      public void listen(Event event) {
        listen(event);
        other.listen(event);
      };
    }
  }
}
```
]

---

### Usage

```java
Listener listener = Listener.null();
```

```java
Listener listener = new StandardOutputListener()
                        .then(new FileListener(file));
```

---

## `abstract` vs. `default` (and `static`)

Apparently, they achieve the same goal:
- definition of type with partial functionalities

Key differences:
- interface methods cannot use any instance state
  - they are not aware of it
- adding a functionality to an `abstract` class requires all inherited types to be recompiled; not required for `default` methods
  - "retrofitting"

Some risk of misusage:
  - design/development experience helps

---

## `enum`

A type representing a **predefined** (by developer) set of values.
- an instance of an `enum` corresponds to one of those values.

```java
public `enum Gender` {
  MALE, FEMALE, OTHER;
}
```

```java
public class Person {
  private String firstName;
  private String lastName;
  private final Date birthDate;
  `private Gender gender`;
}
```

Naming convention:
- type name: noun (like classes)
- values: name, all uppercase with `_`, like constants

---

## Usage

`enum`s values are specified with dot notation:

```java
public class Person {
  public String toString() {
    String prefix;
    if (gender.equals(`Gender.FEMALE`)) {
      prefix = "Ms. ";
    } else if (gender.equals(`Gender.MALE`)) {
      prefix = "Mr. ";
    }
    return prefix + firstName + lastName;
  }
}
```

For `enum`s, `==` works like `equals()`.

Enums cannot be instantiated:
- `new Gender()` does not compile!

---

## `enum`s with `switch`

```java
public class Person {
  public String toString() {    
    String prefix;
    switch (gender) {
      case `FEMALE`:
        prefix = "Ms. ";
        break;
      case `MALE`:
        prefix = "Mr. ";
        break;
      default:
        prefix = "";
    }
    return prefix + firstName + lastName;
  }
}
```

No need to specify `Gender.`.

---

## Fields and methods

`enum`s can have methods, fields, constructors.
- constructors have to be called when defining values

.compact[
```java
public enum Gender {
  MALE("Mr."), FEMALE("Ms."), OTHER("");

  private final String prefix;

  Gender(String prefix) {
    this.prefix = prefix;
  }

  public String getPrefix() {
    return prefix;
  }

  public String prefix(String string) {
    return prefix.isEmpty() ? string : prefix + " " + string;
  }

}
```

```java
public String toString() {
  return gender.prefix(firstName + lastName);
}
```
]

---

## Annotations

Very very briefly.

- Can be used to annotate class and method definitions (and other things)
- Can have arguments
- Can be defined
- Can be retained:
  - at compile time
  - at runtime
  - both

For basic usage, no need to define new annotations.

---

## An example

```java
public class StandardOutputListener implements Listener {
  `@Override`
  public void listen(Event event) {
    System.out.println(event);
  }
}
```

Says to the compiler:
- this method definition overrides another definition

---

## `@Override`

<iframe width="100%" height="450" src="https://docs.oracle.com/en/java/javase/13/docs/api/java.base/java/lang/Override.html"></iframe>

<!-- lambdas -->

<!-- - generics
- collections
- use in code:
  - use always the most general type
- executors
- lambdas and streams
- reflection
- serialization -->
