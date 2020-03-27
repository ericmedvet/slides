non-primiclass: center, middle

## More on

### parameters, visibility of identifiers, memory

---

## What happens to parameters?

```java
public class Person {
  private String name;
  public Person(String name) { this.name = name; }
  public String getName(){ return name; }
  public String setName(String name){ this.name = name; }
}
```

```java
public void modify(Person p) {
  p.setName(p.getName().toUpperCase());
  //no return!
}
```

```java
Person eric = new Person("Eric");
modify(eric);
System.out.println(`eric.getName()`);
```

What's the `name` here?
Are the changes visible to the caller?

Is the parameter passed **by value** or **by reference**?

---

## Parameter passing

By value:

- the called receives a **copy of the object**

By reference:

- the called receives a **copy of the reference**

In Java:

- primitive types are passed by value
- non-primitive types are passed by reference

---

## Passing non-primitive

```java
public void modify(Person p) { // `B`
  p.setName(p.getName().toUpperCase());
}
```

```java
Person eric = new Person("Eric"); // `A`
modify(eric);                     // `C`
```

.cols[
.c30[
At A:
.diagram.center[
ref(10,20,'eric')
obj(40,0,60,40,'Person','')
link([20,20,40,20])
ref(80,20,'')
obj(120,0,80,40,'String','"Eric"')
link([80,20,120,20])
]
]
.c30[
At B:
.diagram.center[
ref(10,20,'eric','invisible')
obj(40,0,60,40,'Person','')
link([20,20,40,20],'invisible')
ref(80,20,'')
obj(120,0,80,40,'String','"Eric"')
link([80,20,120,20])
ref(10,80,'p')
link([20,80,30,80,40,20])
]
By reference:  
`p` is a copy of `eric`
]
.c40[
At C:
.diagram.center[
ref(10,20,'eric')
obj(40,0,60,40,'Person','')
link([20,20,40,20])
ref(80,20,'')
obj(120,0,80,40,'String','"Eric"')
obj(120,80,80,40,'String','"ERIC"')
link([80,20,110,20,110,100,120,100])
]
Change is **visible**!
]
]

---

## Passing primitive

```java
public void uselesslyModify(int n) { // `B`
  n = 18;
}
```

```java
int age = 41;         // `A`
uselesslyModify(age); // `C`
```

.cols[
.c30[
At A:
.diagram.center[
ref(0,20,'age')
obj(40,0,60,40,'int','41')
link([10,20,40,20])
]
]
.c30[
At B:
.diagram.center[
ref(0,20,'age','invisible')
obj(40,0,60,40,'int','41')
link([10,20,40,20],'invisible')
ref(0,100,'n')
obj(40,80,60,40,'int','41')
link([10,100,40,100])
]
By value:  
`41` is a copy of `41`
]
.c40[
At C:
.diagram.center[
ref(0,20,'age')
obj(40,0,60,40,'int','41')
link([10,20,40,20])
]
Change is **not visible**!
]
]

---

## `final`

A modifier (keyword):

- applicable to classes, methods, fields, variables
- **static**: effects only at **compile time**

Different effects depending on type of definition:

- class
- method
- fields and variables

---

## `final` class

Cannot be extended!

- i.e., the compiler raises an error when compiling a class definition that attempts to extend a `final` class

```java
public final class Greeter {
  /* ... */
}
```

```java
public class EnhancedGreeter extends Greeter {
  /* ... */
}
```

`EnhancedGreeter` does not compile!

---

## `final` method

Cannot be overriden!

- i.e., the compiler raises an error when compiling a class definition, extending a class, that attempts to override a `final` method of the extended class

```java
public class Greeter {
  public final String greet() { return "Hello!" };
}
```

```java
public class EnhancedGreeter extends Greeter {
  public String greet() { /* ... */ }
}
```

`EnhancedGreeter` does not compile!

- neither with `public final String greet()`

---

## `final` fields and variables

Cannot be reassigned!

- i.e., cannot be assigned more than once
  - regardless of being primitive or not
- in practice, they are **constants**

.cols[
.c50[
.compact[

```java
public class Greeter {
  private final String msg = "Hi!";
  public void update(String msg) {
    `this.msg = msg`;
  }
}
```

]

Does not compile!
]
.c50[
.compact[

```java
public class Greeter {
  public void update(final int n) {
    `n = 18`;
  }
  public void doThings() {
    final String s = "hi!";
    `s = "hello"`;
  }
}
```

]

Does not compile:

- for `n = 18`
- for `s = "hello"`
  ]
  ]

---

## Why/when using `final`?

Recall, **compile-time** only effects!

- the developer asks the compiler to check usage of `final` things
  - developer to her/him-self "message"
  - developer to other developer "message"
- no effects at runtime

Use cases:

- constants
  - fields .note[very common]
- limiting re-usability
  - classes and methods .note[rare]
- remarking immutability
  - variables .note[rather rare good practice]

---

## Constants with `final`

Object-wise constant:

- an **immutable** field that can have different values across different instances of the same class
- just `final` .note[usually `private`]

Class-wise constant:

- a **global** constant, i.e., a placeholder for a hard-coded value
- `final static`

---

## Object-wise constant

```java
public class Person {
  private String firstName;
  private String lastName;
  private final Date birthDate;
  private final String fiscalCode;

  public Person(Date birthDate, String fiscalCode) {
    this.birthDate = birthDate;
    this.fiscalCode = fiscalCode;
  }
}
```

A developer's **decision** on how to model the "reality":

- for a given `Person`, `birthDate` and `fiscalCode` never change!
  - they are immutable
- for a given `Person`, `firstName` and `lastName` can change

`final` fields have to be initialized!

---

### Class-wise constant

```java
public class Doc extends Person {
  private `final static` String TITLE_PREFIX = "Dr.";

  public String getFullName() {
    return TITLE_PREFIX + " " + firstName + " " + lastName;
  };
}
```

`"Dr."` is just a costant that we may re-use in many places

- `final static`
- avoid the risk to type it differently
- ease changing the value all-at-once
- `public` if meant to be used outside (e.g., [`Math.PI`](https://docs.oracle.com/en/java/javase/13/docs/api/java.base/java/lang/Math.html#PI))

**Naming convention** is different for `final static` constants:

- all uppercase
- components separated by `_` (underscore)

---

## Remarking immutability

When parameter is a primitive type:

```java
public void update(`final` int n) {
  /* ... */
}
```

Reminds me (the developer) that changing `n` would not have effect!

- i.e., dear compiler, tell me if I forget this and attempt to wrongly reassign `n`

In some cases, the IDE suggests to add the `final` modifier.

---

### Also for non-primitive!

```java
public void capitalizeName(`final` Person p) {
  p.setName(
    p.getName().substring(0, 1).toUpperCase() +
    p.getName().substring(1).toLowerCase() +
  );
}
```

No reason for reassigning `p`!

- if you'd reassign `p`, you were modifying another `Person` object, **not** on the passed one (meant to be modified)!

---

## Remarking immutability of variables

```java
Person[] teachers = new Person[] {alberto, eric};
for (`final` Person teacher : teachers) {
  capitalizeName(teacher);
}
```

No reason for reassigning `teacher`!

- if you'd reassign it, you were **not** operating on the array element!

---

```java
Person spareTeacher = new Person(/* ... */);
Person[] teachers = new Person[] {alberto, eric};
for (Person teacher : teachers) {
  if (teacher.isIll()) { // `A`
    teacher = spareTeacher;
  } // `B`
}
```

.cols[
.c50[
At A, 1st iteration:
.center.diagram[
ref(0,20,'alberto')
obj(80,0,60,40,'Person','')
link([10,20,80,20])
ref(0,90,'eric')
obj(80,70,60,40,'Person','')
link([10,90,80,90])
ref(0,160,'spareTeacher')
obj(80,140,60,40,'Person','')
link([10,160,80,160])
ref(0,230,'teachers')
obj(80,210,80,60,'Person[]')
link([10,230,80,230])
ref(100,250,'0')
ref(140,250,'1')
link([100,260,100,290,190,290,190,20,140,20])
link([140,260,140,280,180,280,180,90,140,90])
ref(0,300,'teacher')
link([10,300,200,300,200,10,150,10,140,20])
]
]
.c50[
At B, 2nd iter., assume `eric` is ill:
.center.diagram[
ref(0,20,'alberto')
obj(80,0,60,40,'Person','')
link([10,20,80,20])
ref(0,90,'eric')
obj(80,70,60,40,'Person','')
link([10,90,80,90])
ref(0,160,'spareTeacher')
obj(80,140,60,40,'Person','')
link([10,160,80,160])
ref(0,230,'teachers')
obj(80,210,80,60,'Person[]')
link([10,230,80,230])
ref(100,250,'0')
ref(140,250,'1')
link([100,260,100,290,190,290,190,20,140,20])
link([140,260,140,280,180,280,180,90,140,90])
ref(0,300,'teacher')
link([10,300,60,300,60,235,'j5','n',60,170,80,160])
]
]
]

---

class: middle, center

### Scope and lifetime

---

## Scope vs. lifetime

Scope of an identifier:

- code portion where the identifier can be legitimately used (i.e., where it **is visible**)
- **static** property

Lifetime of an object or reference:

- time interval when the object or reference **exists**
- **dynamic** property

In general:

- depend on language
- depend on entity type

---

## Scope: reference

Declared in method signature (aka argument variable):

- visible everywhere in the method

Declared in method code (aka local variable):

- visible from declaration to the end of **block**
  - a block is a sequence of statements enclosed by curly brackets `{` `}`

---

### Example

```java
public String capitalize(final String string) {
  String capitalized = "";
  for (final String token : string.split(" ")) {
    String head = token.substring(0, 1);
    String remaining = token.substring(1, 0);
    capitalized = capitalized
      + head.toUpperCase() + remaining.toLowerCase() + " ";
  }
  return capitalized;
}
```

Five identifiers:

- `string`, `capitalized`, `token`, `head`, `remaining`
- five different scopes

---

## Scope: fields, class, method

Determined by access modifier:

- `private`, `protected`, default, `public`

`protected`:

- visible only in a class extending (directly or indirectly) the class where `protected` is used

.note[Fields are also known as instance variables]

---

## Lifetime

Reference and primitive object:

- exists **only** during the execution of the **block**

Non-primitive object:

- exists at least **as long as it is referenced**
- when non referenced, might exist or not exist
  - in practice it's the same: it cannot be used!

---

### Example

.cols[
.c50[

```java
public int doThings(String s) {
  int p = 2;
  String s2 = s.trim();
  int l = s2.length(); // `B`
  return l / p;
}
```

]
.c50[

```java
public void run() {
  String name = "simba "; // `A`
  int n = doThings(name); // `C`
}
```

]
]

.cols[
.c30[
At A:
.diagram.center[
ref(0,20,'name')
obj(60,0,100,40,'String','"simba "')
link([10,20,60,20])
]
]
.c40[
At B:
.diagram.center[
ref(0,20,'name','invisible')
obj(60,0,100,40,'String','"simba "')
link([10,20,60,20],'invisible')
ref(0,80,'p')
obj(60,60,60,40,'int','2')
link([10,80,60,80])
ref(0,140,'s2')
obj(60,120,100,40,'String','"simba"')
link([10,140,60,140])
ref(0,200,'l')
obj(60,180,60,40,'int','5')
link([10,200,60,200])
]
]
.c30[
At C:
.diagram.center[
ref(0,20,'name')
obj(60,0,100,40,'String','"simba "')
link([10,20,60,20])
obj(60,60,100,40,'String','"simba"')
ref(0,140,'n')
obj(60,120,60,40,'int','2')
link([10,140,60,140])
]
]
]

---

class: middle, center

### JVM memory

### (some more details)

---

## Overview

JVM memory is organized in:

- **heap**
  - long-lived data
  - global
- **stack**
  - short-lived data
  - organized in blocks

Many other differences that we do not need to know.

.note[Stack has faster access; one stack per thread; stack is much smaller]

---

## Heap vs. stack: storing

Stored in heap:
- every **non-primitive object**
  - everything that is created with `new`
- every **primitive field** (aka instance variable)

Stored in stack:
- every **reference**
- every **primitive object not being a field** (aka argument and local variables)

---

## Heap vs. stack: freeing

Heap:
- "cleaned" every while .note[we'll see soon]

Stack (organized in blocks):
- one new block created **at each method invocation**
- block removed (memory becomes free) **just after invocation**

---

## Stack and primitive types

Primitive type objects in the stack:
**the identifier identifies ("is") the object**, instead of the reference

This explains the differences:
- lifetime like references
- parameter passing by value
  - reference by value == object by reference
- assignement creates copy of value
  - reference assignement creates copy of reference

---

## Diagram: updated syntax

```java
public static void main(String[] args) {
  int l = args.length;
}
```
```bash
eric@cpu:~$ java Greeter eric simba
```

.center.diagram[
zone(0,0,600,300,'JVM memory')
zone(10,40,240,250,'Stack')
zone(270,40,320,250,'Heap')
zone(20,200,220,80,'main()','code')
obj(40,230,60,40,'int l','1')
ref(200,250,'args')
link([210,250,260,250,260,110,280,110])
obj(280,80,160,60,'String[]','')
ref(300,120,'0')
ref(330,120,'1')
ref(400,120,'length')
obj(480,100,60,40,'int','2')
link([410,120,480,120])
obj(360,170,100,40,'String','"eric"')
obj(360,240,100,40,'String','"simba"')
link([300,130,300,190,360,190])
link([330,130,330,185,'j5','s',330,260,360,260])
]

---

### Example updated

.cols[
.c50[
.compact[
```java
public int doThings(String s) {
  int p = 2;
  String s2 = s.trim();
  int l = s2.length(); // B
  return l / p;
}
```
```bash
eric@cpu:~$ java Greeter
```
]
]
.c50[
.compact[
```java
public static void main(String[] args) {
  (new Main()).run();
}
```
```java
public void run() {
  String name = "simba "; // `A`
  int n = doThings(name); // C
}
```
]
]
]

.center.diagram[
zone(10,-30,240,320,'Stack')
zone(270,-30,320,320,'Heap')
zone(20,220,220,60,'main()','code')
ref(200,260,'args')
link([210,260,300,260])
obj(300,220,120,60,'String[]','')
ref(380,260,'length')
link([390,260,450,260])
obj(450,240,60,40,'int','0')
zone(20,110,220,80,'run()','code')
ref(200,170,'name')
link([210,170,300,170])
obj(300,150,120,40,'String','"simba "')
]

.note[Also `String` has its fields; we omit for compactness.]

---

### Example updated

.cols[
.c50[
.compact[
```java
public int doThings(String s) {
  int p = 2;
  String s2 = s.trim();
  int l = s2.length(); // `B`
  return l / p;
}
```
```bash
eric@cpu:~$ java Greeter
```
]
]
.c50[
.compact[
```java
public static void main(String[] args) {
  (new Main()).run();
}
```
```java
public void run() {
  String name = "simba "; // A
  int n = doThings(name); // C
}
```
]
]
]

.center.diagram[
zone(10,-30,240,320,'Stack')
zone(270,-30,320,320,'Heap')
zone(20,220,220,60,'main()','code')
ref(200,260,'args')
link([210,260,300,260])
obj(300,220,120,60,'String[]','')
ref(380,260,'length')
link([390,260,450,260])
obj(450,240,60,40,'int','0')
zone(20,110,220,80,'run()','code')
ref(200,170,'name')
link([210,170,300,170])
obj(300,150,120,40,'String','"simba "')
zone(20,0,220,80,'doThings()','code')
obj(30,30,60,40,'int p','2')
obj(100,30,60,40,'int l','5')
ref(180,50,'s')
link([180,60,180,100,260,100,260,160,280,160,300,170])
ref(220,50,'s2')
link([230,50,300,50])
obj(300,30,120,40,'String','"simba"')
]

---

### Example updated

.cols[
.c50[
.compact[
```java
public int doThings(String s) {
  int p = 2;
  String s2 = s.trim();
  int l = s2.length(); // B
  return l / p;
}
```
```bash
eric@cpu:~$ java Greeter
```
]
]
.c50[
.compact[
```java
public static void main(String[] args) {
  (new Main()).run();
}
```
```java
public void run() {
  String name = "simba "; // A
  int n = doThings(name); // `C`
}
```
]
]
]

.center.diagram[
zone(10,-30,240,320,'Stack')
zone(270,-30,320,320,'Heap')
zone(20,220,220,60,'main()','code')
ref(200,260,'args')
link([210,260,300,260])
obj(300,220,120,60,'String[]','')
ref(380,260,'length')
link([390,260,450,260])
obj(450,240,60,40,'int','0')
zone(20,110,220,80,'run()','code')
ref(200,170,'name')
link([210,170,300,170])
obj(300,150,120,40,'String','"simba "')
obj(300,30,120,40,'String','"simba"')
obj(30,140,60,40,'int n','2')
]

---

<!--
show last diagram again
- say stack block freed
  - say that block are stacked
- say what about "simba"?
-->

<!-- mention fixed size per block -->

<!-- mention different errors when full -->

<!-- getter and setter -->
