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
Not ok!
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

## Inheritance and inline initialization

```java
public static class Base {
  public int n = 1;
}
```

```java
public static class Derived extends Base {
  public int m = n + 1;
}
```
```java
Derived derived = new Derived();
System.out.printf("m=%d%n", derived.m); // -> m=2
```

"Field initialization is executed before the first statement of any constructor."
$\rightarrow$ any of **this** class!
- `super()` is executed before any inline initialization

.question[What is `derived.n`?]

---

class: middle, center

## Polymorphism

---

## Reference type and inheritance

```java
public class Derived extends Base { /* ... */ }
```

Any code that works with a `Base` can work also with a `Derived`.
- more formally: a reference to type `Base` can (i.e., the compiler says ok) reference an object of type `Derived`

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

Why does it compile? (`use()` was written to work with a `Base`)
- `Derived` has all fields and methods of `Base`
  - maybe with different behaviors (methods, but signature is exactly the same)
  - maybe it has also other methods/fields
- $\rightarrow$ any dot notation valid on a `Base` is also valid on a `Derived`!

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

## Be general

**Rule**: use the **most general** definition!

```java
public void putLeash(Dog dog) { /* ... */ }
```
is better than:
```java
public void putLeash(Chihuahua dog) { /* ... */ }
```
even if in your code you will `putLeash()` only on `Chihuahua`s (but provided that you have the inheritance `Dog` $\rightarrow$ `Chihuahua`).

---

### ... but not too much

Similarly:
```java
public Milk milk(Mammal mammal) { /* ... */ }
```
is better than:
```java
public Milk milk(Cow cow) { /* ... */ }
```

However:
```java
public Milk milk(Animal animal) { /* ... */ }
```
is wrong!
- but (as is here) compiles!
- wrong, because conceptually you cannot milk every animal

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

1. `Derived derived`: developer $\rightarrow$ compiler
  - please, take note (and make sure) that with any operation defined in `Derived` can be applied to object referenced by `derived`
2. `derived = createBase()`: compiler $\rightarrow$ developer
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

---

## `instanceof`

Binary operator (keyword) for checking the type of a object at runtime:
- evaluates to `boolean`

```java
boolean isString = ref instanceof String;
```

Formally, `a instanceof B` evaluates to `true` if and only if object referenced by `a` might be legitimately referenced by a reference `b` to objects of type `B`.

```java
public class Derived extends Base { /* ... */ }
```
```java
Derived derived = new Derived();
boolean b1 = derived instanceof Object; // -> true
boolean b2 = derived instanceof Base; // -> true
boolean b3 = derived instanceof Derived; // -> true
```

---

## Typical usage

```java
Object obj = someOddMethod();
if (obj instanceof String) {
  String string = (String) obj;
  System.out.println(string.toUpperCase());
  // obj.toUpperCase() would not compile!
}
```

Since JDK 14 (March 2020):
```java
Object obj = someOddMethod();
if (obj instanceof String string) {
  System.out.println(string.toUpperCase());
}
```
Just a language shorthand!
.note[Called Pattern matching with `instanceof`]

---

## Why?

```java
import java.util.Date;

public class Greeter {
  public static void main(String[] args) {
    System.out.print("Hello World! Today is: ");
    System.out.println(new Date());
  }
}
```

- Why does the code compile?
- Why and how does it execute?
  - What `println` is invokated at runtime?
  - Why the printed string makes sense?

---

## Why does it compile?

`PrintStream` class:
.javadoc.methods[
| Type | Field | Description |
| --- | --- | --- |
| void | println​(Object x) | Prints an Object and then terminate the line. |
]

`Date` extends `Object` and there is a `PrintStream.println(Object)`!
- a `Date` has everything an `Object` has
- `println()` says it knows how to print on `Object`

Ok, but then?

---

## toString()

`Object` class:
.javadoc.methods[
| Type | Field | Description |
| --- | --- | --- |
| String | toString() | Returns a string representation of the object. |
]

.javadoc[
Returns a string representation of the object. In general, the `toString` method returns a string that "textually represents" this object. The result should be a concise but informative representation that is easy for a person to read. It is recommended that all subclasses override this method.

The `toString` method for class `Object` returns a string consisting of the name of the class of which the object is an instance, the at-sign character `'@'`, and the unsigned hexadecimal representation of the hash code of the object. In other words, this method returns a string equal to the value of:  
`getClass().getName() + '@' + Integer.toHexString(hashCode())`
]

Hence:
- every object has a `toString()` method
- every object can be represented as string

---

## Overriding `toString()`

.javadoc[
In general, the `toString` method returns a string that "textually represents" this object. The result should be a concise but informative representation that is easy for a person to read. It is recommended that all subclasses override this method.
]

The developer of a class may (and should!) redefine (= **override**) `toString()`:
- returns a string that "textually represents" this object
- concise but informative
- easy for a person to read

IDEs have an option for writing a decent `toString()` for you (`Alt+Ins` in Netbeans)


---

### `toString()` of `Date`

.javadoc[
`public String toString()`

Converts this `Date` object to a `String` of the form:

`dow mon dd hh:mm:ss zzz yyyy`

where:
- `dow` is the day of the week (`Sun`, `Mon`, `Tue`, `Wed`, `Thu`, `Fri`, `Sat`).
- `mon` is the month (`Jan`, `Feb`, `Mar`, `Apr`, `May`, `Jun`, `Jul`, `Aug`, `Sep`, `Oct`, `Nov`, `Dec`).
- `dd` is the day of the month (`01` through `31`), as two decimal digits.
- `hh` is the hour of the day (`00` through `23`), as two decimal digits.
- `mm` is the minute within the hour (`00` through `59`), as two decimal digits.
- `ss` is the second within the minute (`00` through `61`), as two decimal digits.
- `zzz` is the time zone (and may reflect daylight saving time). Standard time zone abbreviations include those recognized by the method parse. If time zone information is not available, then `zzz` is empty - that is, it consists of no characters at all.
- `yyyy` is the year, as four decimal digits.
]

---

## Why does it work?
```java
import java.util.Date;

public class Greeter {
  public static void main(String[] args) {
    System.out.print("Hello World! Today is: ");
    System.out.println(new Date());
  }
}
```

In `PrintStream`:
```java
public void println(Object x) {
  if ( x == null ) {
    println("null");
  } else {
    println(x.toString());
  }
}
```

---

## Delegation and information hiding

```java
public void println(Object x) {
  if ( x == null ) {
    println("null");
  } else {
    println(x.toString());
  }
}
```
The developers of `PrintStream` just took care of how to print an `Object`
- check for `null` inside `println()`
- delegation to `Object` `toString()` for the rest

No need for knowledge about if, how, when, who, where, (and why) would have derived `Object`!

---

## Why?

```java
System.out.println("Now is " + new Date());
```

Why does the code compile?
- because `+` with a `String` as 1st operand "accepts" anything as 2nd operand

Why and how does it execute?
- because the compiler translated `+ ref` to something like
```java
(ref == null) ? "null" : ref.toString()
```
(if `ref` is not a reference to primitive type)

---

class: middle, center

## How does polymorphism work?
### (briefly)

---

## Own class "field"

At runtime, every object `o` has a description of its class:
- it is an object of class `Class`
- it is "shared" among all instances of the class of `o`
  - approx. like a `static` field

It can be obtained with the `getClass()` method of `Object`:
- hence, since it is in `Object`, every `o` has `getClass()`
  - since every object has all the methods declared in `Object`

`Object` class:
.javadoc.methods[
| Type | Method | Description |
| --- | --- | --- |
| Class<?> | getClass() | Returns the runtime class of this Object. |
]

.note[Ignore the `<?>` for now; we'll see it later]

---

### Diagram

.center.diagram.or[
ref(0,20,'')
ref(0,100,'')
ref(0,180,'')
obj(100,0,100,40,'String','')
obj(100,80,100,40,'String','')
obj(100,160,100,40,'String','')
link([0,20,100,20])
link([0,100,100,100])
link([0,180,100,180])
ref(180,20,'')
ref(180,100,'')
ref(180,180,'')
obj(300,0,100,40,'Class','String')
link([180,20,220,20,300,20])
link([180,100,220,100,300,20])
link([180,180,220,180,300,20])
ref(0,320,'')
ref(0,400,'')
obj(100,300,100,40,'Date','')
obj(100,380,100,40,'Date','')
link([0,320,100,320])
link([0,400,100,400])
ref(180,320,'')
ref(180,400,'')
obj(300,300,100,40,'Class','Date')
link([180,320,220,320,300,320])
link([180,400,220,400,300,320])
]

---

## What's inside the description?

Conceptually, inside the `Class` of a class X:
- methods of X (i.e., **declared in** X)
- fields of X
- ...

.note[We'll see later more about this!]

.cols[
.c50[
.compact[
```java
public class Base {
  public void doBase() { /*...*/ }
}
```
```java
public class Derived extends Base {
  public void doDerived() { /*...*/ }
}
```
```java
Derived d  = new Derived();
```
]
`methods` contains `doDerived`, not `doBase`
]
.c50[
.center.diagram.or[
ref(60,20,'d')
obj(100,0,60,40,'Derived','')
link([60,20,100,20])
ref(140,20,'')
link([140,20,170,20,170,90,180,90])
obj(180,0,180,200,'Class','Derived')
ref(300,80,'methods')
ref(300,120,'fields')
]
]
]

---

## Reference to superclass

- and the class of the base type, possibly `Object`

.center.diagram.or[
ref(60,20,'d')
obj(100,0,60,40,'Derived','')
link([60,20,100,20])
ref(140,20,'')
link([140,20,170,20,170,90,180,90])
obj(180,0,180,200,'Class','Derived')
ref(300,80,'methods')
ref(300,120,'fields')
ref(300,160,'superclass')
link([300,160,370,160,370,90,380,90])
obj(380,0,180,200,'Class','Base')
ref(500,80,'methods')
ref(500,120,'fields')
ref(500,160,'superclass')
link([500,160,570,160,570,90,580,90])
obj(580,0,180,200,'Class','Object')
ref(700,80,'methods')
ref(700,120,'fields')
ref(700,160,'superclass')
]

- `methods` of `d.getClass()` contains `doDerived`
- `methods` of `d.getClass().superclass` contains `doBase`
- `methods` of `d.getClass().superclass.superclass` contains `toString`, `getClass`, ...

.note[Approximately: types and names of fields/methods are different]

---

## Which method?

```java
System.out.println(derived); // -> derived.toString()
```
```java
public void println(Object x) {
  if ( x == null ) {
    println("null");
  } else {
    println(`x.toString()`);
  }
}
```

Conceptually:
1. get `Class c` of `derived`
2. get `methods` of `c`
3. do `methods` contains `toString()`
  - yes, use that method
  - no, set `c` to `c.superclass` and go back to 2

In the worst case, `c` is eventually the `Class` describing `Object`

---

## `Class` and `Object`

`Class` is a class; `Object` is a class.
- you can use `object` as identifier of a reference to objects of class `Object`
- you **cannot** use `class` as identifier of a reference to objects of class `Class`
  - because `class` is a keyword

.note[Many developers and examples use `clazz`...]

---

## Methods of `Object`

`Object` class:
.javadoc.methods[
| Type | Method | Description |
| --- | --- | --- |
|boolean | equals​(Object obj) | Indicates whether some other object is "equal to" this one. |
| Class<?> | getClass() | Returns the runtime class of this Object. |
| String | toString() | Returns a string representation of the object. |
]

`equals()`: indicates whether some other object is "equal to" this one.

What's the difference with respect to `==`?

---

## `==` (and `!=`)

`a == b`
- if `a` and `b` of different primitive types², or of primitive and non-primitive², or of non compatible¹ non-primitive types, then code does not compile
- else if `a` and `b` of same primitive type, then evaluates to boolean `true` iff `a` and `b` have the same value, otherwise evaluates to `false`
- else evaluates to boolean `true` if `a` and `b` **reference the same object** or both do not reference any object (i.e., they "are" `null`), otherwise evaluates to `false`

`a != b`
- if it compiles, evaluates to the negation of `a == b`

.note[1: "compatible" means that types are the same or one derives from the other; 2: with some exceptions that we will see later]

---

## Same object!

```java
String s1 = "hi!";
String s2 = "hi!";
String s3 = s2;
boolean b;
b = s1 == s2; // -> false
b = s2 == s3; // -> true
b = s1.length() == s2.length(); // -> true
```
.center.diagram.or[
ref(0,20,'s1')
obj(80,0,100,40,'String','hi!')
link([0,20,80,20])
ref(0,100,'s2')
obj(80,80,100,40,'String','hi!')
link([0,100,80,100])
ref(0,160,'s3')
link([0,160,80,100])
ref(0,220,'b')
link([0,220,80,220])
obj(80,200,60,40,'boolean','true')
obj(180,200,60,40,'int','3')
obj(280,200,60,40,'int','3')
]

---

## `equals()`

`Object`: "indicates whether some other object is "equal to" this one".

Actual meaning depend on the type, that possibly overrides `equals()`
- `String`: "true if and only if [...] represents the same sequence of characters [...]"
- `Date`: "true if and only if [...] represents the same point in time, to the millisecond [...]"
- `PrintStream`: does not override `equals()`
  - the developers of `PrintStream` **decided** that the "equal to" notion of `Object` hold for `PrintStream`s

---

## `equals()` documentation in `Object`

.javadoc[
Indicates whether some other object is "equal to" this one.

The `equals` method implements an equivalence relation on non-null object references:
- It is *reflexive*: for any non-null reference value `x`, `x.equals(x)` should return `true`.
- It is *symmetric*: for any non-null reference values `x` and `y`, `x.equals(y)` should return `true` if and only if `y.equals(x)` returns `true`.
- It is *transitive*: for any non-null reference values `x`, `y`, and `z`, if `x.equals(y)` returns `true` and `y.equals(z)` returns `true`, then `x.equals(z)` should return `true`.
- It is *consistent*: for any non-null reference values `x` and `y`, multiple invocations of `x.equals(y)` consistently return `true` or consistently return `false`, provided no information used in equals comparisons on the objects is modified.
- For any non-null reference value `x`, `x.equals(null)` should return `false`.

The `equals` method for class `Object` implements the most discriminating possible equivalence relation on objects; that is, for any non-null reference values `x` and `y`, this method returns `true` if and only if `x` and `y` refer to the same object (`x == y` has the value `true`).
]

Two things in this documentation:
- what's the general semantics of `equals()`
- how does the specific implementation in `Object` work

---

## `equals()` in `Object`

"the most discriminating possible equivalence relation":
```java
public class Object {
  /* ... */
  public boolean equals(Object other) {
    if (other == null) {
      return false;
    }
    return this == other;
  }
}
```

Note: `this` cannot be `null`!

---

## Overriding `equals`

Semantics level requirements:
- **equivalence** conceptually sound for the specific case
- reflexivity, symmetry, transitiveness, consistency, `null`

Syntax level requirement:
- comply with the signature
```java
public boolean equals(Object other)
```
  - the argument is of type `Object` also for the deriving type!

The compiler:
- does check fulfillment of syntax requirement
- **cannot check** fulfillment of semantics requirements
  - big responsability of the developer

---

## Implementing equivalence

It depends on the case, i.e., on the type; it should correspond to equivalence of the represented concepts.

Given type `X`, should answer the question:
- are `x1` and `x2` the same `X`?

E.g., equivalence of persons: are two persons the same?
- in the real world:
  - formed by the same atoms? (probably too strict)
  - same first and last name? (probably too loose)
- in the application:
  - depends of what aspects of real world are modeled

---

### Equivalent persons

```java
public class Person {
  private String firstName;
  private String lastName;
  private Date birthDate;
}
```
This class models a person by her/his first name, last name, and birth date:
- it's a **developer's decision**

At most (in strictness), `equals()` can say that "two persons are the same iff they have the same first name, same last name, and same birth date".
- what if two "different" persons has the same name and birth date? (Marco Rossi!)
- what if a person changes name?

---

### Equivalent persons with fiscal code

```java
public class Person {
  private String firstName;
  private String lastName;
  private Date birthDate;
  private String fiscalCode;
}
```

This class models a person with [...] and fiscal code.

By **domain knowledge**, the developer can decide that "two persons are the same iff they have the same fiscal code".

---

### Simple `Person.equals()`

.compact[
```java
public class Person {
  private String firstName;
  private String lastName;
  private Date birthDate;

  public boolean equals(Object other) {
    if (other == null) {
      return false;
    }
    if (!(other instanceof Person)) {
      return false;
    }
    if (!firstName.equals(((Person) other).firstName)) {
      return false;
    }
    if (!lastName.equals(((Person) other).lastName)) {
      return false;
    }
    if (!birthDate.equals(((Person) other).birthDate)) {
      return false;
    }
    return true;
  }
}
```
]

- `(Person)` to downcast `other` as `Person`
- assumes fields are not null

---

## `Person.equals()` with fiscal code

.compact[
```java
public class Person {
  private String firstName;
  private String lastName;
  private Date birthDate;
  private String fiscalCode;

  public boolean equals(Object other) {
    if (other == null) {
      return false;
    }
    if (!(other instanceof Person)) {
      return false;
    }
    if (!fiscalCode.equals(((Person) other).fiscalCode)) {
      return false;
    }
    return true;
  }
}
```
]

We (the developers) **decided** that two persons are the same if they have the same fiscal code, **regardless** of name and birth date!

---

### IDEs and `equals()`

As for `toString()`, IDEs have an option for writing `equals()` for you (`Alt+Ins` in Netbeans).
E.g., outcome with `fiscalCode`:

.cols[
.c50[
.compact[
```java
public boolean equals(Object obj) {
  if (this == obj) {
    return true;
  }
  if (obj == null) {
    return false;
  }
  if (getClass() != obj.getClass()) {
    return false;
  }
  final Person other = (Person) obj;
  if (!Objects.equals(
    this.fiscalCode,
    other.fiscalCode
    )) {
    return false;
  }
  return true;
}
```
]
]
.c50[
- `this == obj`: a performance optimization
- same `getClass()` different than `instanceof`!
- `Objects.equals()` takes care of checking if field is `null`

.note[Ignore `final` for now]
]
]

---

## `Objects`

.javadoc[
This class consists of `static` utility methods for operating on objects, or checking certain conditions before operation.
]

A class with **utility methods**, static by design.

[`Objects`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/Objects.html) class:
.javadoc.methods[
| Type | Field | Description |
| --- | --- | --- |
| static int | checkIndex​(int index, int length) | Checks if the index is within the bounds of the range from 0 (inclusive) to `length` (exclusive). |
| static boolean | deepEquals​(Object a, Object b) | Returns `true` if the arguments are deeply equal to each other and `false` otherwise. |
| static boolean | equals​(Object a, Object b) | Returns `true` if the arguments are equal to each other and `false` otherwise. |
| static boolean | isNull​(Object obj) | Returns `true` if the provided reference is `null` otherwise returns false. |
]

"deeply equal": equal, but also with arrays.

Many other similar classes in and out the JDK, e.g., [`Arrays`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/Arrays.html):
- static `fill()`, `sort()`, ...

---

## `instanceof` vs. `getClass()`

`a instanceof B`
- `true` iff object referenced by `a` might be legitimately referenced by a reference `b` to objects of type `B`

`a.getClass() == b.getClass()`:
- `true` iff at runtime class of object referenced by `a` is exactly the same (`==`) of class of object referenced by `b`

`a.getClass() == B.class`
- `X.class` is (approx.) an implicit static reference to the object representing the class `X`
- `true` iff at runtime class of object referenced by `a` is exactly `B`

---

### `instanceof` vs. `getClass()`: example

```java
public class Person { /* ... */ }
```
```java
public class Employee extends Person { /* ... */ }
```
```java
Person p = new Person( /* ... */ );
Employee e = new Employee( /* ... */ );
boolean b1 = e instanceof Person; // -> true
boolean b2 = p.getClass() == e.getClass(); // -> false
```

.diagram.or.center[
ref(0,20,'p')
obj(80,0,100,40,'Person','')
link([0,20,80,20])
ref(160,20,'')
link([160,20,190,20,190,-30,370,-30,370,50,380,50])
obj(220,0,120,100,'Class','Employee')
ref(320,80,'')
link([320,80,350,80,350,50,380,50])
obj(380,0,120,100,'Class','Person')
ref(480,80,'')
link([480,80,510,80,510,50,540,50])
obj(540,0,120,100,'Class','Object')
ref(640,80,'')
ref(0,100,'e')
obj(80,80,100,40,'Employee','')
link([0,100,80,100])
ref(160,100,'')
link([160,100,190,100,190,50,220,50])
ref(0,180,'b1')
obj(80,160,60,40,'boolean','true')
link([0,180,80,180])
ref(200,180,'b2')
obj(280,160,60,40,'boolean','false')
link([200,180,280,180])
]

Is an employee equal to the person being the employee?
Big question: it depends on how you model the reality.

---

## `equals()` on complex types

`equals()` should represent the **equivalence** that is inherently defined by the representation defined by the type.

.cols[
.c50[
```java
public class `Bag`OfInts {
  private int[] values;
}
```

Models $X = \mathcal{M}(\mathbb{Z}) = \\{f: \mathbb{Z} \to \mathbb{N}\\}$. (**bag** == **multiset**)

Equiv. of $x_1, x_2$ considers:
- length
- items
]
.c50[
```java
public class `Sequence`OfInts {
  private int[] values;
}
```

Models $X = \bigcup_{i \in \mathbb{N}}\mathbb{Z}^i$.

Equiv. of $x_1, x_2$ considers:
- length
- items
- order of items
]
]

.note[$X$ "is" the class, $x \in X$ is the object]  
.note[$\mathcal{M}(A)$ is my notation for the set of **multisets** built with elements of the set $A$.]

---

### Everything in the name!

.cols[
.c50[
$X = \mathcal{M}(\mathbb{Z})$
```java
class BagOfInts {
  private int[] values;
}
```
]
.c50[
$X = \bigcup_{i \in \mathbb{N}}\mathbb{Z}^i$
```java
class SequenceOfInts {
  private int[] values;
}
```
]
]

Exactly the **same code**, **different models**!

Difference in models should be captured by the name of the type!

---

## Multiple inheritance

```java
public class Vehicle { /* ... */ }
```
```java
public class MotorVehicle extends Vehicle {
  public void startEngine() { /* ... */ }
}  
```
```java
public class Motorboat extends MotorVehicle {
  public void startEngine() { System.out.println("bl bl bl"); }
  public void turnPropeller() { /* ... */ }
}  
```
```java
public class Car extends MotorVehicle {
  public void startEngine() { System.out.println("brum brum"); }
  public void turnWheels() { /* ... */ }
}  
```

- Every `MotorVehicle` is a `Vehicle`
- Every `Motorboat` is a `MotorVehicle`, thus also a `Vehicle`
- Every `Car` is a `MotorVehicle`, thus also a `Vehicle`.
- In general, a `Car` is not a `Motorboat`!

---

## Here comes the amphibious!

.cols[
.c50[
.center[
![Fiat 6640](images/fiat6640.jpg)
]
]
.c50[
Ohhh, surprise!

There is a `Car` that is **also** a `Motorboat`!

.note[It is a [Fiat 6640](https://it.wikipedia.org/wiki/Fiat_6640)]
]
]

```java
public class AmphibiousVehicle extends Motorboat, Car { // NOOOO!
  public void doAmphibiousFancyThings() { /* ... */ }
}
```
**Does not compile!** No multiple inheritance!

---

## Why not?

```java
public class AmphibiousVehicle extends Motorboat, Car { // NOOOO!
  public void doAmphibiousFancyThings() { /* ... */ }
}
```
```java
AmphibiousVehicle fiat6640 = new AmphibiousVehicle();
fiat6640.startEngine();
```
Should it result in `bl bl bl` or in `brum brum`?
- it's certain that there is a `startEngine()`, since both `Motorboat` and `Car` extends `MotorVehicle`: which one should be invoked? .note[same for `equals()`, `toString()`, ...]
- same for fields

Java syntax does not allow the developer to specify which one!
- it was a precise decision of Java developers
- some other languages allow [multiple inheritance](https://en.wikipedia.org/wiki/Multiple_inheritance)

---

### Why not?

"it was a precise decision of Java developers"

They might have allowed multiple inheritance from `A`, `B` only when `A` and `B` intersection of overridden methods was empty:

```java
public class A { public void doA() { /*...*/ } }
```

```java
public class B { public void doB() { /*...*/ } }
```

```java
public class C extends A, B { public void doC() { /*...*/ } }
```

Looks legit!
A `c` can `doA()`, `doB()`, `doC()`, and do `toString()`!

What if then the developer of `A` override `toString()`!
- **Disaster!** The same code of `C` does not compile anymore!

.note[There is a mechanism in Java for modeling the amphibious; we'll see it!]

---

class: lab
name: exercise2

## Equivalence .note[~2h, 2nd home assignement]

1. Design and implement a class that represents $X = \mathcal{M}(\mathbb{R})$
  - with a proper `equals()`
  - with a proper `toString()`
  - with a proper constructor that takes 0+ values $\in \mathbb{R}$
2. Write an application that reads from stdin two comma-separated lists of real numbers, creates $x_1, x_2 \in X$, and outputs a text message saying if $x_1, x_2$ are the same or not
  - user gives two separated inputs
  - comma separates values within each input

.note[There are other ways for implementing multisets (and sets, sequences, ...); we'll see them.]

.note[Do not use the collection framework. Do not use [Guava `Multiset`](https://guava.dev/releases/18.0/api/docs/com/google/common/collect/Multiset.html)]
