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

(Take code highlighting with care!)

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

(Where? For now: in the memory of the JVM, conceptually.)

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

## Objects and references diagram

```java
String dog1 = new String("Simba");
String dog2 = new String("Gass");
new String("Chip");
String squirrel2 = new String("Chop");
dog1 = dog2;
dog2 = dog1;
squirrel2 = squirrel2;
```

.question[
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


(We are just scratching the surface; we'll go deeper ahead.)

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

Examples (from class [`String`](https://docs.oracle.com/en/java/javase/13/docs/api/java.base/java/lang/String.html)):
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
p.`pringln(s)`;
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
| void | println​(Object x)  | Prints an Object and then terminate the line.                     |
| void | println​(String x)  | **Prints a String and then terminate the line.**                      |
]
]
.c30[
From class [`PrintStream`](https://docs.oracle.com/en/java/javase/13/docs/api/java.base/java/io/PrintStream.html)
]
]

---

## How many methods?

A lot of classes, a lot of methods!

You **have to**:
- use the documentation (briefly: **javadoc**)
- and/or proficiently use the IDE
  - **autocompletion**

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
  - name: the very same name of the class (e.g., `Date` → `Date()`)
  - return type: C (e.g., `Date` → `Date`)

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
| Type | Methodd | Description |
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

→ **Modularity**: everyone takes care of only some part of the sofware!

---

class: middle, center

## Coding classes

---

## Complex numbers

Goal: manipulating complex numbers

By examples:
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

(Point of view of the user.)

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

(IDE: code generation, auto formatting.)
