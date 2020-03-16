class: middle, center

# Basic concepts

---

## Hello goal!

```java
public class Greeter {
  public static void main(String[] args) {
    System.out.println("Hello World!");
  }
}
```

Goal: **deep understanding** of this code
- not just what it "does"
- but the role of every part of the code

.note[Take code highlighting with care!]

---

## Objects

"Things" (entities that can be manipulated in the code) are **objects**
- objects exist
- but **do not have a name**

The code manipulates objects through **references**
- references have a symbolic name, called **identifier**

Both can be created.

.important.center[
object ≠ reference
]

---

## Creating objects and references

```java
String s;
```
.cols[
.c60[
- **create a reference** to object of type `String` with identifier `s` (briefly: reference `s`)
  - a reference has always a name!
- no object is created
]
.c40.center.vcentered.diagram[
<svg width="251" height="80" role="img">
<circle cx="10" cy="40" r="10"/>
<text x="10" y="20">s</text>
</svg>
]
]

```java
String s = new String("Content");
```
.cols[
.c60[
- **create reference** `s` of type `String`
- **create object** of type `String` and init it with `"Content"`
- make `s` reference the new object
]
.c40.center.vcentered.diagram[
<svg width="251" height="80" role="img">
<circle cx="10" cy="40" r="10"/>
<text x="10" y="20">s</text>
<rect x="100" y="20" width="150" height="40"/>
<text x="175" y="10">String</text>
<text x="175" y="40">"Content"</text>
<line x1="10" y1="40" x2="100" y2="40">
</svg>
]
]

---

## Many references

```java
String s1 = new String("Content");
String s2 = s1;
```
- create reference `s1` and make it reference the new objects
- create reference `s2` and make it reference the object referenced by `s1`

.center.diagram[
<svg width="251" height="100" role="img">
<circle cx="10" cy="40" r="10"/>
<text x="10" y="20">s1</text>
<circle cx="10" cy="90" r="10"/>
<text x="10" y="70">s2</text>
<rect x="100" y="20" width="150" height="40"/>
<text x="175" y="10">String</text>
<text x="175" y="40">"Content"</text>
<line x1="10" y1="40" x2="100" y2="40"/>
<line x1="10" y1="90" x2="100" y2="40"/>
</svg>
]

**Objects+references diagram**: where? when?
- for now: in the memory of the JVM, conceptually.
- at runtime

---

## No references

```java
new String("Content1");
new String("Content2");
```
- create object of type `String` and init it with `"Content1"`
- create object of type `String` and init it with `"Content2"`

.center.diagram[
<svg width="251" height="150" role="img">
<rect x="100" y="20" width="150" height="40"/>
<text x="175" y="10">String</text>
<text x="175" y="40">"Content1"</text>
<rect x="100" y="100" width="150" height="40"/>
<text x="175" y="90">String</text>
<text x="175" y="120">"Content2"</text>
</svg>
]

The two objects are not referenced: they cannot be manipulated!

---

## Changing referenced object

```java
String s1 = new String("Content1");
String s2 = new String("Content2");
s1 = s2;
```
- create reference `s1`, create new `String` inited with `"Content1"`, and make `s1` reference it
- create reference `s2`, create new `String` inited with `"Content2"`, and make `s2` reference it
- make `s1` reference the object referenced by `s2`

.cols[
.c50[
After 2nd line:
.center.diagram[
<svg width="251" height="150" role="img">
<circle cx="10" cy="40" r="10"/>
<text x="10" y="20">s1</text>
<circle cx="10" cy="120" r="10"/>
<text x="10" y="100">s2</text>
<rect x="100" y="20" width="150" height="40"/>
<text x="175" y="10">String</text>
<text x="175" y="40">"Content1"</text>
<rect x="100" y="100" width="150" height="40"/>
<text x="175" y="90">String</text>
<text x="175" y="120">"Content2"</text>
<line x1="10" y1="40" x2="100" y2="40"/>
<line x1="10" y1="120" x2="100" y2="120"/>
</svg>
]
]
.c50[
After 3rd line:
.center.diagram[
<svg width="251" height="150" role="img">
<circle cx="10" cy="40" r="10"/>
<text x="10" y="20">s1</text>
<circle cx="10" cy="120" r="10"/>
<text x="10" y="100">s2</text>
<rect x="100" y="20" width="150" height="40"/>
<text x="175" y="10">String</text>
<text x="175" y="40">"Content1"</text>
<rect x="100" y="100" width="150" height="40"/>
<text x="175" y="90">String</text>
<text x="175" y="120">"Content2"</text>
<line x1="10" y1="40" x2="100" y2="120"/>
<line x1="10" y1="120" x2="100" y2="120"/>
</svg>
]
]
]

---

## Objects+references diagram

```java
String dog1 = new String("Simba");
String dog2 = new String("Gass");
new String("Chip");
String squirrel2 = new String("Chop");
dog1 = dog2;
dog2 = dog1;
squirrel2 = squirrel2;
```

.exercise[
Draw the diagram
- after the 3rd line
- after the last line
]

---

## Manipulating objects

Key questions:
- which operations can be applied on an object?
- how to specify them in the code?
- can operations have parameters?

---

## Manipulating objects

Answers (in brief):
- which operations can be applied on an object?
  - every object is an **instance** of a **type**
  - a type defines operations applicable to instances
- how to specify them in the code?
  - with the **dot notation**: `refName.opName()`
- can operations have input and output parameters?
  - input parameters can be specified between round brackets: `refName.opName(otherRefName1, otherRefName2)`
  - output can be referenced: `retRefName = refName.opName()`


.note[We are just scratching the surface; we'll go deeper ahead.]

---

## Classes

A **class** is a type
- every object is an instance of a class
- (in a Java sofware) there are several classes
  - some are part of the Java language
  - some are part of APIs
- every application includes at least one class, defined by the developer

---

## Classes

.important.center[
class ≠ object
]

Some expressions that are clues of misunderstanding:
- "I wrote the code of an object"
- "X references a class"

Some correct expressions that hide complexity:
- "instantiating a X" (where X is a class)
  - means "creating an object of class X"

---

## Primitive types

Some types are not classes, but **primitive types**:
- `boolean`
- `char`
- `byte`
- `short`
- `int`
- `long`
- `float`
- `double`

We'll discuss them later.

---

class: middle, center

## Using classes

---

## Methods

An operation applicable on a object is a **method** of the corresponding class.

Every method has a **signature**, consisting of:
- name
- sequence of types of input parameters (name not relevant)
- type of output parameter (aka **return type**)
  - possibly `void`, if there is no output

Examples (class [`String`](https://docs.oracle.com/en/java/javase/13/docs/api/java.base/java/lang/String.html)):
- `char charAt(int index)`
- `int indexOf​(String str, int fromIndex)`
- `String replace​(CharSequence target, CharSequence replacement)`
- `void getChars​(int srcBegin, int srcEnd, char[] dst, int dstBegin)`

---

## Method invocation

```java
String s = new String("Hello!");
int l = s.length();
```
- execute (who?) the operation defined by the method `lenght()` on the object referenced by `s`
  - briefly: invoke `length()` on `s`
- create reference `l` of type `int`
- make `l` reference the object created upon the execution of the operation

.center.diagram[
<svg width="251" height="150" role="img">
<circle cx="10" cy="40" r="10"/>
<text x="10" y="20">s</text>
<circle cx="10" cy="120" r="10"/>
<text x="10" y="100">l</text>
<rect x="100" y="20" width="150" height="40"/>
<text x="175" y="10">String</text>
<text x="175" y="40">"Hello!"</text>
<rect x="100" y="100" width="150" height="40"/>
<text x="175" y="90">int</text>
<text x="175" y="120">6</text>
<line x1="10" y1="40" x2="100" y2="40"/>
<line x1="10" y1="120" x2="100" y2="120"/>
</svg>
]

---

## Can a method be invoked?

```java
String s = new String("Hello!");
*int l = s.length();
```

The compiler (`javac`) verifies (also) that:
- the type of `s` has a method with name `length`
  - briefly: `s` has a method `length`
- the method is used consistently with the signature
  - input and output types are correct

This check:
- is done **at compile time** (by the compiler)
- is much harder than it appears: we'll see
- is hugely **useful** for avoiding errors and designing good sofware

Colloquially, Java is said to be strongly typed.

---

## Method overloading

A class can have many methods:
- with the same name
- but different input parameters

From another point of view: at most one method with the same (name, input parameters), regardless of the output type.

```java
String s = new String("Hello!");
PrintStream ps = new PrintStream(/*...*/);
ps.`println(s)`;
```

.cols[
.c70[
.javadoc.methods[
| Type | Method             | Description                                                       |
|------|--------------------|-------------------------------------------------------------------|
| void | println()          | Terminates the current line by writing the line separator string. |
| void | println​(boolean x) | Prints a boolean and then terminate the line.                     |
| void | println​(char x)    | Prints a character and then terminate the line.                   |
| void | println​(char[] x)  | Prints an array of characters and then terminate the line.        |
| void | println​(double x)  | Prints a double and then terminate the line.                      |
| void | println​(float x)   | Prints a float and then terminate the line.                       |
| void | println​(int x)     | Prints an integer and then terminate the line.                    |
| void | println​(long x)    | Prints a long and then terminate the line.                        |
| void | println​(String x)  | **Prints a String and then terminate the line.**                  |   |
]
]
.c30[
Class [`PrintStream`](https://docs.oracle.com/en/java/javase/13/docs/api/java.base/java/io/PrintStream.html)
]
]

---

## How many methods?

A lot of classes, a lot of methods!

You **have to**:
- use the documentation (briefly: **javadoc**)
- and/or proficiently use the IDE
  - **autocompletion**! (Ctrl+space)

Often, the signature alone is sufficient for understanding what the method does (e.g., `int length()` of `String`).

This is because who wrote the code for `String` correcly chose the signature: in particular the name.

There are **naming conventions**!

---

## Naming conventions

**Extremely important!**
- code is not just for machines, it's for humans
- with code, a human tells another human about a procedure

Many of them: some just for Java, some broader.
- we'll see part of them, gradually

The degree to which naming conventions are followed concurs in determining the **quality of the code**.

.note[There are many sources online: e.g., [JavaPoint](https://www.javatpoint.com/java-naming-conventions)]

---

### Classes and methods

Class:
- a noun, a name of an **actor**: e.g., `Dog`, `Sorter`, `Tree`
- representative of the entity the class represents
- upper camel case (aka dromedary case): `HttpServerResponse`

Method:
- a verb, a name of an action: e.g., `bark`, `sort`, `countNodes`
  - with acceptable exceptions: e.g., `size`, `nodes`
- representative of the operation the method performs
- lower camel case: `removeLastChar`

---

### References

Reference:
- consistent with the corresponding type
- representative of the specific use of the referenced object:
  - not every `String` has to be referenced by `s`
  - specific! e.g., `numOfElements` is better than `n`
- lower camel case

God gave us IDEs, IDEs give us **autocompletion**!
Don't spare on chars.

---

## Associative dot operator

```java
String s = new String(" shout!");
s = s.trim().toUpperCase();
```
- invoke `trim()` on object referenced by `s`
- invoke `toUpperCase()` on the object resulting from `trim()` invocation
- make `s` reference the object resulting from `toUpperCase()` invocation

.javadoc.methods[
| Type | Method | Description |
| --- | --- | --- |
| String | toUpperCase() | Converts all of the characters in this `String` to upper case using the rules of the default locale. |
| String | trim() | Returns a string whose value is this string, with all leading and trailing space removed, where space is defined as any character whose codepoint is less than or equal to `'U+0020'` (the space character). |
]

---

### Objects and references diagram

```java
String s = new String(" shout!");
s = s.trim().toUpperCase();
```
.cols[
.c50[
After 1st line:
.center.diagram[
<svg width="251" height="150" role="img">
<circle cx="10" cy="40" r="10"/>
<text x="10" y="20">s</text>
<rect x="100" y="20" width="150" height="40"/>
<text x="175" y="10">String</text>
<text x="175" y="40">" shout!"</text>
<line x1="10" y1="40" x2="100" y2="40"/>
</svg>
]
]
.c50[
After 2nd line:
.center.diagram[
<svg width="251" height="250" role="img">
<circle cx="10" cy="40" r="10"/>
<text x="10" y="20">s</text>
<rect x="100" y="20" width="150" height="40"/>
<text x="175" y="10">String</text>
<text x="175" y="40">" shout!"</text>
<rect x="100" y="100" width="150" height="40"/>
<text x="175" y="90">String</text>
<text x="175" y="120">"shout!"</text>
<rect x="100" y="180" width="150" height="40"/>
<text x="175" y="170">String</text>
<text x="175" y="200">"SHOUT!"</text>
<line x1="10" y1="40" x2="100" y2="200"/>
</svg>
]
]
]

---

## Constructor

Every class T has (at least) one special method called **constructor** that, when invoked:
- results in the creation of a new object of class T
- inits the new object

Special syntax for invocation using the `new` keyword:
```java
Greeter greeter = new Greeter();
```

There are a few exceptions to this syntax:
- `String s = "hi!";` same of `String s = new String("hi!");`

---

## Initialization

What happens with initialization depends on the constructor.

Class [`Date`](https://docs.oracle.com/en/java/javase/13/docs/api/java.base/java/util/Date.html): The class `Date` represents a specific instant in time, with millisecond precision.

.javadoc.constructors[
| Modifier | Constructor | Description |
| --- | --- | --- |
| | Date() | Allocates a `Date` object and initializes it so that it represents the time at which it was allocated, measured to the nearest millisecond. |
]

Probably two different initialization outcomes:
```java
Date now = new Date();
// some code doing long things
Date laterThanNow = new Date();
```

---

## Multiple constructors

A class C can have more than one constructors:
- at most one with the same input parameters
- (the name and the return type are always the same)
  - name: the very same name of the class (e.g., `Date` .arrow[] `Date()`)
  - return type: C (e.g., `Date` .arrow[] `Date`)

Class [`String`](https://docs.oracle.com/en/java/javase/13/docs/api/java.base/java/lang/String.html):
.javadoc.constructors[
| Modifier | Constructor | Description |
| --- | --- | --- |
| | String()| Initializes a newly created `String` object so that it represents an empty character sequence. |
| | String​(char[] value)	| Allocates a new `String` so that it represents the sequence of characters currently contained in the character array argument. |
| | String​(String original) | Initializes a newly created `String` object so that it represents the same sequence of characters as the argument; in other words, the newly created string is a copy of the argument string. |
]

---

### Other example: `Socket`

Class [`Socket`](https://docs.oracle.com/en/java/javase/13/docs/api/java.base/java/net/Socket.html): This class implements client sockets (also called just "sockets"). A socket is an endpoint for communication between two machines.

.javadoc.constructors[
| Modifier | Constructor | Description |
| --- | --- | --- |
|   | Socket() | Creates an unconnected Socket. |
|   | Socket​(String host, int port) | Creates a stream socket and connects it to the specified port number on the named host. |
|   | Socket​(String host, int port, boolean stream) | **Deprecated.** Use DatagramSocket instead for UDP transport. |
|   | Socket​(String host, int port, InetAddress localAddr, int localPort) | Creates a socket and connects it to the specified remote host on the specified remote port. |
|   | Socket​(InetAddress address, int port) | Creates a stream socket and connects it to the specified port number at the specified IP address. |
|   | Socket​(InetAddress host, int port, boolean stream) | **Deprecated.** Use DatagramSocket instead for UDP transport. |
|   | Socket​(InetAddress address, int port, InetAddress localAddr, int localPort) | Creates a socket and connects it to the specified remote address on the specified remote port. |
|   | Socket​(Proxy proxy) | Creates an unconnected socket, specifying the type of proxy, if any, that should be used regardless of any other settings. |
| protected | Socket​(SocketImpl impl) | Creates an unconnected Socket with a user-specified SocketImpl. |
]

---

## Information hiding

The user of a class (that is, a developer possibly different than the one who developed the class):
- can use the class and operates on it
- does not know how it is coded

Class [`Date`](https://docs.oracle.com/en/java/javase/13/docs/api/java.base/java/util/Date.html):
.javadoc.methods[
| Type | Method | Description |
| --- | --- | --- |
| boolean | after​(Date when) | Tests if this date is after the specified date. |
| boolean | before​(Date when) | Tests if this date is before the specified date. |
| long | getTime() | Returns the number of milliseconds since January 1, 1970, 00:00:00 GMT represented by this `Date` object. |
| String | toString() | Converts this `Date` object to a String of the form: |
]

We can do non-trivial manipulation of dates (meant as entities) through the class `Date` without knowing its code!

---

## Modularity

The user of a class **knows**:
- which operations exist, how to use them, what they do

He/she **does not know**:
- what's inside the object
- how exactly an operation works

The **state** of the object and the **code** of the class might change, but the user is **not required to be notified of changes**!

.arrow[] **Modularity**: everyone takes care of only some part of the sofware!

---

class: middle, center

## Coding classes

---

## Problem: complex numbers

Goal: manipulating complex numbers

By examples (i.e., point of view of the user):
```java
Complex c1 = new Complex(7.46, -3.4567);
Complex c2 = new Complex(0.1, 9.81);

Complex c3 = c1.add(c2);
// same for subtract(), multiply(), divide()

double norm = c2.getNorm();
double angle = c2.getAngle();
String s = c2.toString();
double real = c2.getReal();
double imaginary = c2.getImaginary();
```

---

## "Solution": `Complex.java`

```java
public class Complex {
  private double real;
  private double imaginary;
  public Complex(double real, double imaginary) {
    this.real = real;
    this.imaginary = imaginary;
  }
  public double getReal() {
    return real;
  }
  public double getImaginary() { /* ... */ }
  public Complex add(Complex other) {
    return new Complex(
      real + other.real,
      imaginary + other.imaginary
    );
  }
  /* other methods */
}
```

.note[IDE: code generation, auto formatting.]

---

### What's behind the solution?

**Domain knowledge**:
- what is a complex number? what are its composing parts? (entities)
- what are the required operations?

Knowledge of the programming language:
- how to represent the entities in Java?
- how to perform the operations in Java?

You need both!
- you can rely on external help, but you still need to know what you want to do
  - Google/stackoverflow: how to do X in Java?

---

### Objects+references diagram

```java
Complex c1 = new Complex(7.46, -3.4567);
Complex c2 = new Complex(0.1, 9.81);
```

.center.diagram[
<svg width="500" height="300" role="img">
<circle cx="20" cy="40" r="10"/>
<text x="20" y="20">c1</text>
<rect x="100" y="20" width="150" height="40"/>
<text x="175" y="10">Complex</text>
<circle cx="130" cy="40" r="10"/>
<circle cx="160" cy="40" r="10"/>
<rect x="300" y="20" width="50" height="40"/>
<text x="325" y="10">double</text>
<rect x="400" y="20" width="50" height="40"/>
<text x="425" y="10">double</text>
<polyline points="20,40 100,40"/>
<polyline points="130,40 130,90 380,90 380,40 400,40"/>
<polyline points="160,40 160,70 280,70 280,40 300,40"/>
<circle cx="20" cy="140" r="10"/>
<text x="20" y="120">c2</text>
<rect x="100" y="120" width="150" height="40"/>
<text x="175" y="110">Complex</text>
<circle cx="130" cy="140" r="10"/>
<circle cx="160" cy="140" r="10"/>
<rect x="300" y="120" width="50" height="40"/>
<text x="325" y="110">double</text>
<rect x="400" y="120" width="50" height="40"/>
<text x="425" y="110">double</text>
<polyline points="20,140 100,140"/>
<polyline points="130,140 130,190 380,190 380,140 400,140"/>
<polyline points="160,140 160,170 280,170 280,140 300,140"/>
</svg>
]

---

### Objects+references diagram

```java
Complex c1 = new Complex(7.46, -3.4567);
Complex c2 = new Complex(0.1, 9.81);
Complex c3 = c1.add(c2);
double norm = c2.getNorm();
```

.center.diagram[
<svg width="500" height="400" role="img">
<circle cx="30" cy="40" r="10"/>
<text x="30" y="20">c1</text>
<rect x="100" y="20" width="150" height="40"/>
<text x="175" y="10">Complex</text>
<circle cx="130" cy="40" r="10"/>
<circle cx="160" cy="40" r="10"/>
<rect x="300" y="20" width="50" height="40"/>
<text x="325" y="10">double</text>
<rect x="400" y="20" width="50" height="40"/>
<text x="425" y="10">double</text>
<polyline points="30,40 100,40"/>
<polyline points="130,40 130,90 380,90 380,40 400,40"/>
<polyline points="160,40 160,70 280,70 280,40 300,40"/>
<circle cx="30" cy="140" r="10"/>
<text x="30" y="120">c2</text>
<rect x="100" y="120" width="150" height="40"/>
<text x="175" y="110">Complex</text>
<circle cx="130" cy="140" r="10"/>
<circle cx="160" cy="140" r="10"/>
<rect x="300" y="120" width="50" height="40"/>
<text x="325" y="110">double</text>
<rect x="400" y="120" width="50" height="40"/>
<text x="425" y="110">double</text>
<polyline points="30,140 100,140"/>
<polyline points="130,140 130,190 380,190 380,140 400,140"/>
<polyline points="160,140 160,170 280,170 280,140 300,140"/>
<circle cx="30" cy="240" r="10"/>
<text x="30" y="220">c3</text>
<rect x="100" y="220" width="150" height="40"/>
<text x="175" y="210">Complex</text>
<circle cx="130" cy="240" r="10"/>
<circle cx="160" cy="240" r="10"/>
<rect x="300" y="220" width="50" height="40"/>
<text x="325" y="210">double</text>
<rect x="400" y="220" width="50" height="40"/>
<text x="425" y="210">double</text>
<polyline points="30,240 100,240"/>
<polyline points="130,240 130,290 380,290 380,240 400,240"/>
<polyline points="160,240 160,270 280,270 280,240 300,240"/>
<circle cx="30" cy="340" r="10"/>
<text x="30" y="320">norm</text>
<rect x="100" y="320" width="50" height="40"/>
<text x="125" y="310">double</text>
<polyline points="30,340 100,340"/>
</svg>
]

---

### Field

A **field** is an object contained in an object:
```java
public class Complex {
* private double real;
* private double imaginary;
  /* ... */
}
```
The fields of an object constitute its **state**.

They are referenced, there is an identifier:
.center.diagram[
<svg width="500" height="200" role="img">
<circle cx="30" cy="40" r="10"/>
<text x="30" y="20">c1</text>
<rect x="100" y="20" width="150" height="80"/>
<text x="175" y="10">Complex</text>
<circle cx="130" cy="80" r="10"/>
<text x="130" y="60">real</text>
<circle cx="180" cy="60" r="10"/>
<text x="180" y="40">imaginary</text>
<rect x="300" y="20" width="50" height="40"/>
<text x="325" y="10">double</text>
<rect x="400" y="20" width="50" height="40"/>
<text x="425" y="10">double</text>
<polyline points="30,40 100,40"/>
<polyline points="130,80 130,130 380,130 380,40 400,40"/>
<polyline points="180,60 180,110 280,110 280,40 300,40"/>
</svg>
]

---

## Accessing fields

Can be manipuleted using **dot notation**, like methods:
```java
public Complex add(Complex other) {
  return new Complex(
    real + `other.real`,
    imaginary + `other.imaginary`
  );
}
```

---

## Access modifiers: `private`, `public`

Keywords that specify where an identifier is visible, i.e., where it is lecit to use it for accessing the field or method .note[or other, we'll see].

- `private`: visible only within the code of its class
- `public`: visible everywhere

.note[For brevity, we avoid discussing about syntax: but the Java language specification describes exactly where/how every keyword can be used.]

---

## `private` fields

File `Complex.java`:
```java
public class Complex {
  `private` double real;
  /* here real can be used */
}
/* here real can not be used */
```

File `ComplexCalculator.java`:
```java
public class ComplexCalculator {
  public Complex add(Complex c1, Complex c2) {
    /* here real can not be used */
  }
}
```

---

## `private` or `public`: how to choose?

Ideally, it depends of the **nature of the entity** that the class represents (domain knowledge!)

But (general rule of thumb):
- **fields** should be `private`
  - because they represent the state of the object, and we want to avoid that the state is manipulated from "outside"
- **methods** should be `public`
  - because they are operations that can be performed on the object
  - unless we use a method for describing a "partial" operation that is reused frequently by other public operations: in this case, the method should be `private`

---

## `this` identifier

It is the identifier of the reference that references the object on which the method, where `this` is, is being executed.

```java
public class Complex {
  public Complex add(Complex other) {
    return new Complex(
      `this.`real + other.real,
      `this.`imaginary + other.imaginary
    );
  }
}
```

`this` is a keyword.

---

## Implicit `this`

Can be omitted:
```java
public class Complex {
  public Complex add(Complex other) {
    return new Complex(
      `real` + other.real,
      imaginary + other.imaginary
    );
  }
}
```

`real` and `this.real` reference the same object.


---

## `this` for disambiguation

Sometimes it is necessary for disambiguation:
```java
public class Complex {
  private double real;
  private double imaginary;
  public Complex(double real, double imaginary) {
    `this.real` = `real`;
    this.imaginary = imaginary;
  }
}
```

Before the line, `real` and `this.real` do not reference the same object.

.note[This is the typical structure of a constructor: name of input parameters match the name of fields. As usual, the **IDE is your friend** and can write this code automaticaly!]

---

class: middle, center

## Packages

---

## Exported identifiers

A class (i.e., a `.class` file) exports some identifiers of:
- class .note[or classes, but one per `.class` file]
- methods
- fields

Access modifier can be omitted: **default** access modifier:
- `private`: not visible (~ not exported)
- `public`: visible
- default: visible

---

## Package

A **package** is a set of classes with a name
- we'll see how to define it

A package exports the identifiers of its classes:
- `private`: not visible (~ not exported)
- `public`: visible
- default: visible **only within the package**

.note[There are no many reasons for using the default access modifier; please always specify one between `public` and `private` (or `protected`, we'll see...)]

---

## Package name

A sequence of letters separated by dots, e.g.:
- `it.units.erallab`
- `java.util`
- `java.util.logging`

There is no formal hierarchy, nor relationship:
- `java.util.logging` is not a "subpackage" of `java.util`
- they are just different packages

---

### Why and how?

Why package names?
- to avoid name clash that may be likely for classes representing common concepts
  - e.g., `User`, `Point`

How to name packages? (naming conventions)
- usually, (lowercase) reversed institution/company name + product + internal product organization, e.g., `it.units.erallab.hmsrobots.objects.immutable`
  - `it.units.erallab`: institution
  - `hmsrobots`: product
  - `objects.immutable`: internal organization

Beyond names:
- packages impact on file organization (we'll see, in directories)

---

## Packages and modules

Since Java 9, a new, higher level abstraction for code entities organization has been introduced: Java Platform Module System (JPMS), briefly **modules**.
- they are interesting and useful, but...
- we'll complitely ignore
- you can build rather complex software without knowing them

---

### API documentation

<iframe width="100%" height="500" src="https://docs.oracle.com/en/java/javase/13/docs/api/index.html"></iframe>

---

## Fully qualified name

Every class is identified **unequivocally** by its **Fully Qualified Name** (FQN):

FQN = package name + class name
- `java.net.Socket`
- `it.units.erallab.hmsrobots.objects.immutable.Component`

Everywhere in the code, every* class can be identified by its FQN.

```java
double r = 10;
it.units.shapes.Circle circle = new it.units.shapes.Circle(r);
double area = circle.area();
```

.note[\*: provided it is available; we'll see]

---

## The `import` keyword

Writing always the FQN can make the source code **verbose**, yet it is necessary, otherwise the compiler does not know which class we are referring to.

Solution (shorthand): `import`
```java
*import it.units.shapes.Circle;

public class ShapeCompound {
  private `Circle` circle;
  /* ... */
}
```

"`import package.X`" means "dear compiler, whenever I write `X` in this code, I mean `package.X`"
- the compiler internally always uses the FQN

---

## Star import

It might be useful to "import" all the classes in a package:
- it can be done with `import it.units.shapes.*`;

Coding conventions suggest **not** to do it:
- risk: one might import an unneeded class with the same simple name of another class of the same package (e.g., `java.awt.Event` and `it.units.timetable.Event`)
- lack of motivation
    - IDEs add `import`s for you **automatically**, and can remove them partially automatically (**autocompletion**!)
    - so don't be lazy and messy

---

## `import` for the developer

`import` is an optimization for the developer:
- recall: code is not just for the machine

`import` does not import code, classes, objects...



---

## Point of view of the compiler

When the compiler processes the source code (`.java`) and finds a class identifier `C`:
- it needs to know its methods and fields (name, signature, modifiers)
- to be able to check if their usage is legit

If without FQN, the compiler looks for `C` definition:
- in the source code (`.java`)
- in the same package (directory)
- in the packages imported with star import

---

## `java.lang` package

All classes of the `java.lang` packages are available **by default**:
- `import java.lang.*` is implicitly present in every source code

---

## Syntax of FQNs

Package and class name cannot be identified just by looking at the FQN:

E.g., `it.units.UglySw.Point`:
- can be the name of a package
- or can be a FQN where:
  - `Point` is a class
  - or, `UglySw.Point` and `UglySw` are classes (we'll see)
  - or, `units.UglySw.Point`, `units.UglySw`, and `units` are classes, but the first is disrespectful of naming conventions!

Common case and convention: package name are all lowercase!

---

## `static` field

A **field** of a class C can be defined with the `static` non-access modifier:
- the corresponding object is **unique**, that is, the same for every instance of C
- it **always** exists, even if no instances of C exist
  - if instantiated

From another point of view:
- the reference to a static field is shared (i.e., the same) among the zero or more instances of the class

---



### `static` field: diagram

```java
public class Greeter {
  public `static` String msg;
  private String name;
  /* ... */
}

Greeter g1 = new Greeter();
Greeter g2 = new Greeter();
```

.center.diagram[
<svg width="500" height="350" role="img">
<circle cx="30" cy="40" r="10"/>
<text x="30" y="20">g1</text>
<rect x="100" y="20" width="150" height="60"/>
<text x="175" y="10">Greeter</text>
<circle cx="130" cy="60" r="10"/>
<text x="130" y="40">msg</text>
<circle cx="200" cy="60" r="10"/>
<text x="200" y="40">name</text>
<rect x="300" y="20" width="50" height="40"/>
<text x="325" y="10">String</text>
<rect x="400" y="20" width="50" height="40"/>
<text x="425" y="10">String</text>
<polyline points="30,40 100,40"/>
<polyline points="130,60 130,130 380,130 380,40 400,40"/>
<polyline points="200,60 200,110 280,110 280,40 300,40"/>
<circle cx="30" cy="180" r="10"/>
<text x="30" y="160">g2</text>
<rect x="100" y="160" width="150" height="60"/>
<text x="175" y="150">Greeter</text>
<circle cx="130" cy="200" r="10"/>
<text x="130" y="180">msg</text>
<circle cx="200" cy="200" r="10"/>
<text x="200" y="180">name</text>
<rect x="300" y="160" width="50" height="40"/>
<text x="325" y="150">String</text>
<polyline points="30,180 100,180"/>
<polyline points="200,200 200,250 280,250 280,180 300,180"/>
<polyline points="130,200 130,270 425,270 425,60"/>
</svg>
]

---

## `static` method

Also a **method** of a class C can be defined with `static`:
- when invoked, it is not applied on the instance of C
- can be invoked even if no instances of C exist, with a special syntax

The method code cannot access field or use other methods of C that are not `static`:
- they might not exist!
- the compiler performs the check (at compile time)

---

## `static` method: syntax

```java
public class Greeter {
  private static String msg;
  private String name;
  /* ... */
  public static String sayMessage() {
    return msg;
  }
}

String msg = `Greeter.sayMessage()`; /* OK! */

Greeter greeter = new Greeter();
greeter.sayMessage(); /* Syntax is ok, but `avoid this form` */
```

- `greeter.sayMessage()` is bad because it suggests that the instance `greeter` is somehow involved in this operation, whereas it is indeed not involved!
- only the "class" `Greeter` is involved

---

## When to use `static` for methods?

Conceptually, a method should be `static` if it represents an operation that does not involve an entity represented by an instance of the class:

```java
public class Dog {
  public static Dog getCutest(Dog dog1, Dog dog2) { /* ... */ }
  public static Dog fromString(String name) { /* ... */ }
}
```

`static` should be used also for `private` method, when condition above is met, even if they are not visible from outside (but other co-developers see it!)

---

## Hello goal!

```java
public class Greeter {
  public static void main(String[] args) {
    System.out.println("Hello World!");
  }
}
```

Goal: deep understanding of this code
- not just what it "does"
- but the **role of every part** of the code
  - keywords
  - names

---

### `main` signature

```java
public class Greeter {
  `public static void main`(String[] args) {
    System.out.println("Hello World!");
  }
}
```

- `public` .arrow[] `main` has to be invoked "directly" by the JVM upon execution (`java Greeter`): it has to be accessible
- `static` .arrow[] invokable without having an already existing instance of `Greeter`
- `void` .arrow[] does not return anything

`public static void main(String[])` is the signature **required** by Java if you want to use the method as an execution **entry point**!
  - only the name of the input parameter can be modified

---

### What is `System.out`?

```java
public class Greeter {
  public static void main(String[] args) {
    `System.out`.`println`("Hello World!");
  }
}
```

- `println` is a method, since it is invoked `()`
- `System.out` might be, in principle:
  1. the FQN of a class (and hence `println` is static in the class `out`)
  2. a field of a class (and hence `out` is static in the class `System`)

There is no package `System` (and `out` would be a class name out of conventions), hence 2 holds: `System` is a class

---

### "Where" is `System`?

```java
public class Greeter {
  public static void main(String[] args) {
    `System`.out.println("Hello World!");
  }
}
```

Where is `System`?
- more precisely, how can the compiler check that we correctly use `out` field of `System`?

There is no `import`, hence it can be:
1. there a `System.class` in the same directory of this `.class`, hence we wrote a `System.java`
2. `System` is in the `java.lang` package, that is always imported by default

2 holds: `java.lang.System` is the FQN of `System`

---

### "What" is `out`?

```java
public class Greeter {
  public static void main(String[] args) {
    System.`out`.println("Hello World!");
  }
}
```

Look at [`System`](https://docs.oracle.com/en/java/javase/13/docs/api/java.base/java/lang/System.html) class documentation (fields):
.javadoc.fields[
| Modifier and type | Field | Description |
| --- | --- | --- |
| static PrintStream | err | The "standard" error output stream. |
| static InputStream | in	| The "standard" input stream. |
| static PrintStream | out | The "standard" output stream. |
]

.arrow[] `out` is a field of type `PrintStream` that represents the **standard output**.

.note[What's the standard output? "Typically this stream corresponds to display output or another output destination specified by the host environment or user."]

---

### What is `println()`? How is it used?

```java
public class Greeter {
  public static void main(String[] args) {
    System.out.`println("Hello World!")`;
  }
}
```

Look at [`PrintStream`](https://docs.oracle.com/en/java/javase/13/docs/api/java.base/java/io/PrintStream.html) class documentation (methods):
.javadoc.methods[
| Type | Field | Description |
| --- | --- | --- |
| void | println​(int x) | Prints an integer and then terminate the line. |
| void | println​(long x) | Prints a long and then terminate the line. |
| void | println​(Object x) | Prints an Object and then terminate the line. |
| void | println​(String x) | Prints a String and then terminate the line. |
]

`"Hello World!"` is a string literal and corresponds to `new String("Hello World!")`
- hence `println​(String x)` is the used method

---

## Involved classes

```java
public class Greeter {
  public static void main(String[] args) {
    System.out.println("Hello World!");
  }
}
```

"Involved" classes:
- defined here: `Greeter`
- defined elsewhere, used here: `System`, `String`, `PrintStream`
  - `System`, `String` in `java.lang`; `PrintStream` in `java.io`

---

### No `import`

No need to import `PrintStream`:
- `import` does not "load code"
- `import` says to the compiler that we will use a simple name for FQN **in the source code**
  - but we do not use `PrintStream` in the source code
  - there is an `import` for `PrintStream` in `System.java` (or FQN)

```java
import java.io.PrintStream;
/* ... */

public class System {
  public static PrintStream out;
  /* ... */
}
```
