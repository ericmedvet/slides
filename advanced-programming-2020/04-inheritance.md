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

.def[Class BuefferedReader]

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

---





<!-- removing methods: why not? -->

<!-- multiple inheritance: why not? -->
