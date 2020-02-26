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

## Methods

An operation applicable on a object is a **method** of the corresponding class.

Every method has a **signature**, consisting of:
- name
- sequence of types of input parameters (name not relevant)
- type of output parameter
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
PrintStream ps = new PrintStream(...);
p.`pringln(s)`;
```

.cols[
.c70[
.javadoc[
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
From class [PrintStream](https://docs.oracle.com/en/java/javase/13/docs/api/java.base/java/io/PrintStream.html)
]
]

---

## How many methods?

A lot of classes, a lot of methods!

You **have to**:
- use the documentation (briefly: **javadoc**)
- and/or proficiently use the IDE
  - **autocompletion**
