class: middle, center

## Inheritance and polymorhism

---

## Printing a `Date`

```java
import java.util.Date;

public class Greeter {
  public static void main(String[] args) {
    System.out.print("Hello World! Today is: ");
    System.out.`println(new Date())`;
  }
}
```

```bash
eric@cpu:~$ java Greeter
Hello World! Today is: Mon Mar 16 10:36:13 UTC 2020
```

It works!

---

## `println` and `Date`

`PrintStream` class:
.javadoc.methods[
| Type | Field | Description |
| --- | --- | --- |
| void | println() | Terminates the current line by writing the line separator string. |
| void | println​(boolean x) | Prints a boolean and then terminate the line. |
| void | println​(char x) | Prints a character and then terminate the line. |
| void | println​(char[] x) | Prints an array of characters and then terminate the line. |
| void | println​(double x) | Prints a double and then terminate the line. |
| void | println​(float x) | Prints a float and then terminate the line. |
| void | println​(int x) | Prints an integer and then terminate the line. |
| void | println​(long x) | Prints a long and then terminate the line. |
| void | println​(Object x) | Prints an Object and then terminate the line. |
| void | println​(String x) | Prints a String and then terminate the line. |
]

No `println` for `Date`!
- why does the code compile?
- why and how does it execute?
  - what `println` is invokated at runtime?
  - why the printed string makes sense? (`Mon Mar 16 10:36:13 UTC 2020` is actually a date!)

---

## Similarly

```java
import java.util.Date;

public class Greeter {
  public static void main(String[] args) {
    System.out.println("Hello World! Today is: " `+ new Date()`);
  }
}
```

```bash
eric@cpu:~$ java Greeter
Hello World! Today is: Mon Mar 16 10:36:13 UTC 2020
```

`+` operator on `String` and `Date`:
- why does it compile?
- why and how does it execute?

---

class: middle, center

## Inheritance

---

## Inheritance

It is **static** property of the language
- it has effect at compile-time

It allows to **define a new type A starting from existing type B**:
- only new or changed parts (methods/fields) are defined

---

## Syntax

```java
public class Derived `extends Base` {
  /* ... */
}
```

We (the developer) mean: "Dear compiler":
- this `Derived` class is identical to the `Base` class
- I'll define **new** fields and methods
  - methods and fields cannot be hidden (or "removed")
- I'll **redefine** existing fields and methods
  - for methods, by re-using the very same signature

We say that `Derived` extends (or **inherits** from, or **derives** from) `Base`.

---

## `Object`

Every class implicitly derives `Object` (when not explicitly deriving from another class):
- every class has the methods and fields of `Object`

```java
public class Greeter {
  /* ... */
}
```
is the same of:
```java
public class Greeter `extends Object` {
  /* ... */
}
```

"Surprisingly", `Object` is a class, not an object...

---

## Inheritance tree

A class can inherit from another class, that inherits from another class, ...

```java
public class EnhancedGreeter extends Greeter { /* ... */ }
```
```java
public class Greeter { /* ... */ }
```

`EnhancedGreeter` has methods and fields of `Greeter` **and** of `Object`.

Since a class can be derived from many classes, inheritance relationships form a tree.

---

## Inheritance in the documentation

.cols[
.c50[
.javadoc.head[
**Package** .pack[java.io]

.def[Class Reader]

.pack[java.lang.Object]  
.indent[]java.io.Reader
]

`Reader` has all the fields and methods of `Object`
- it may have some more methods and/or fields
- some methods may behave differently
]
.c50[
.javadoc.head[
**Package** .pack[java.io]

.def[Class BufferedReader]

.pack[java.lang.Object]  
.indent[].pack[java.io.Reader]  
.indent[].indent[]java.io.BufferedReader
]

`BufferedReader` has all the fields and methods of `Reader` and `Object`
- it may have some more methods and/or fields
- some methods may behave differently
]
]

---

### What methods are inherited?

Specified in the doc ("methods declared in class ..."):

<iframe width="100%" height="400" src="https://docs.oracle.com/en/java/javase/13/docs/api/java.base/java/io/BufferedReader.html"></iframe>

---

## Point of view of `Base` developer

```java
public class Base {
  /* my stuff! */
}
```

I **do not need to know** if, how, when, who, where, (and why) **will derive** `Base`!

But still write clean code!

E.g., `Object` developers did not know we would have been writing some Java code right now

---

## Point of view of `Derived` developer

```java
public class Derived extends Base {
  /* my incremental stuff! */
}
```

I do not need to have the source code of `Base`
- to compile, nor to execute
- I need the `.class`, though

E.g., "no one" needs the source code of `Object`!


---

## Constructor and inheritance

```java
public class Derived extends Base {
  public Derived() {
    /* init things */
  }
}
```

- Who (which code) initializes inherited fields (those of `Base`)?
- When?

Note (before the answers) that:
- `Base` fields might be `private`: what code other than that of `Base` can operate on them?
- suppose that a `Derived` method is called within the `Derived()`:
  - it can use `Base` methods (it's legit)
  - those methods can use `Base` fields: who should be the responsible for their initialization?

---

## Constructor derived class

```java
public class Derived extends Base {
  public Derived() {
    `Base()`;
    /* init things */
  }
}
```

The **compiler** inserts an (implicit, wrt to code) call to derived class constructor `Base()`!

- Who (which code) initializes inherited fields (those of `Base`)?
  - `Base()`
- When?
  - before any statement of `Derived()`

---

## Many constructors/no default constructor

What if `Base` does not have the no-args constructor?

The compiler requires the developer to specify which `Base` constructor to use
- and its parameters

Syntax: `super(...)`

---

## `super()` constructor

```java
public class Greeter {
  public Greeter(String name) {
    /* init things */
  }
}
```

```java
public class EnhancedGreeter extends Greeter {
  public EnhancedGreeter(String firstName, String lastName) {
    super(firstName + lastName);
    /* init things */
  }
}
```

Ok!
- code compiles

---

### `super()` constructor: not working

```java
public class Base {
  public Base(int n) { /* ... */ }
  public Base(double v) { /* ... */ }
}
```

```java
public class Derived extends Base {
  private int m;
  public Derived() {
    m = 0;
    super(5);
    /* ... */
  }
}
```
Not ok!
- does not compile: `super()` has to be invoked first

---

### `super()` constructor: not working

```java
public class Base {
  public Base(int n) { /* ... */ }
  public Base(double v) { /* ... */ }
}
```

```java
public class Derived extends Base {
  private int m;
  public Derived() {
    m = 0;
    /* ... */
  }
}
```
Not ok! (Does not compile)
- does not compile: `super()` with no args does not exist

---

### `super()` constructor: working

```java
public class Base {
  public Base(int n) { /* ... */ }
  public Base(double v) { /* ... */ }
  public Base() { /* ... */ }
}
```

```java
public class Derived extends Base {
  private int m;
  public Derived() {
    m = 0;
    /* ... */
  }
}
```
Ok!
- code compiles

.question[Which constructor of `Base` is invoked?]

---

class: middle, center

## Polymorphism

---

## Reference type and inheritance

```java
public class Derived extends Base { /* ... */ }
```

Any code that works with a `Base` can work also with a `Derived`.
- more formally: a reference to type `Base` can (i.e., the compiler says ok) reference a `Derived`

```java
public void use(Base base) { /* ... */ }
```

```java
Base base = new Derived(); // OK!!!
```

```java
use(new Base()); // OK, sure!
use(new Derived()); // OK!!!
```

---

## Using `Derived`

```java
public void use(Base base) { /* ... */ }
```

```java
use(new Derived()); // OK!!!
```

Why compiles? (`use()` was written to work with a `Base`)
- `Derived` has all fields and methods of `Base`
  - maybe with different behaviors (methods, but signature is exactly the same)
  - maybe has also other methods/fields
- .arrow[] any dot notation valid on a `Base` is also valid on a `Derived`!

.note["has all fields", but recall visibility!]

---

## Inheritance, philosophycally

`Derived` has all fields and methods of `Base`.

Syllogism: anything being a `Derived` is also a `Base`

```java
public class LivingBeing { /* ... */ }
```
```java
public class Animal extends LivingBeing { /* ... */ }
```
```java
public class Mammal extends Animal { /* ... */ }
```
```java
public class Dog extends Mammal { /* ... */ }
```
```java
public class Chihuahua extends Dog { /* ... */ }
```

A `Chihuahua` is a `Dog`, a `Mammal`, ..., and an `Object`.

.note[But, please, avoid over-using inheritance.]

.note[There's a [debate](https://qr.ae/pNnOEU) about inheritance being **good** or **bad**. Indeed, this is not the most appropriate example of using inheritance...]

---

## Removing methods?

```java
public class Derived extends Base { /* ... */ }
```

Why cannot `Derived` remove some methods/fields of `Base`?
- more specifically, why the language does not even have a construct for doing this?

Why cannot `Derived` reduce visibility of methods/fields of `Base`?
- more specifically, why the compiler does not accept it?

Because otherwise "`Derived` has all fields and methods of `Base`" would not be true!
- so we could not write `use(new Derived())`, nor `println(new Date())`, and inheritance would be useless!

---

## Same code, difference behavior

```java
public void greet(Person person) {
  System.out.println("Hi, " + person.getFullName());
}
```

```java
public class Person {
  /* ... */
  public String getFullName() {
    return firstName + " " + lastName;
  };
}
```

```java
public class Doc extends Person {
  /* ... */
  public String getFullName() {
    return "Dr. " + firstName + " " + lastName;
  };
}
```

Outcome is different with the same `greet()` and same fields content!

---

## Polymorphism

It is a **dynamic** consequence of inheritance:
- it has effect at runtime

It results in the same code to have different behaviors depending on the type of the parameter.

---
### Different behavior

```java
public class Derived extends Base { /* ... */ }
```

```java
public void use(Base base) { /* ... */ }
```

```java
Base base = new Derived();
```
Outcome might be "different" than that with `= new Base()`.


```java
use(new Base()); // OK, sure!
use(new Derived()); // OK!!!
```

Outcomes might be "different".

Developer of `use()` did not know that someone would have derived `Base`:
- they knew how to use a `Base`
- who wrote `Derived` **decided** that any `Derived` is a `Base`

---

## Not the opposite!

Obviously...

```java
public Base createBase() { /* ... */ }
```

```java
Derived derived;
derived = createBase();
```

1. `Derived derived`: developer .arrow[] compiler
  - please, take note (and make sure) that with any operation defined in `Derived` can be applied to object reference by `derived`
2. `derived = createBase()`: compiler .arrow[] developer
  - no! I cannot meet the requirement ("make sure that") because the object returned by `createBase()` might not be a `Derived`

It might also be a `Derived`, but cannot guarantee...

---

## Might be...

```java
public Base createBase() {
  if (System.currentTimeMillis() % 2 == 0) {
    return new Base();
  }
  return new Derived();
}
```
(Purely evil! Don't do it at home!)

```java
Derived derived;
derived = createBase();
```

`createBase()` can really return a `Derived`...

What if I (developer) am sure that it is a `Derived`?

---

## Downcasting

```java
Derived derived;
derived = `(Derived)` createBase();
```

What if I (developer) am sure that it is a `Derived`?

Syntax: `(Derived) base`
- "changes" type of downcast reference
- works only if `Derived` derives (directly or indirectly) from the class of `base`

Why "works only..."?
- because `return` in `createBase()` **must** take a `Base`, so there's no reason to accept something that cannot happen!

Still, at runtime, there is a check at every invokation.




<!-- multiple inheritance: why not? -->
