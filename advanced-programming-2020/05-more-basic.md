class: center, middle

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

## Passing non-primitive type

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

## Passing primitive type

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

A modifier to definitions with identifiers:
- applicable to types, methods, fields, variables
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
- i.e., the compiler raises an error when compiling a class definition extending a class that attempts to override a `final` method of the extended class

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

---

## `final` fields and variables

Cannot be reassigned!
- i.e., cannot be assigned more than once
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
  - very common
- limiting re-usability
  - rare
- remarking immutability
  - rather rare good practice

---

## Constants with `final`

Object-wise constant:
- an **immutable** field that can have different values across same class instances
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
- avoiding the risk to type it differently
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

### Also for non primitive!

```java
public void capitalizeName(`final` Person p) {
  p.setName(
    p.getName().substring(0, 1).toUpperCase() +
    p.getName().substring(1).toLowerCase() +
  );
}
```

No reason for reassigning `p`!
- if you'd reassign `p`, you were modifying another `Person` objec, **not** on the passed one (meant to be modified)!

---

## Remarking immutability of variables

```java
Person[] teachers = new Person[] {eric, alberto, andrea};
for (`final` Person teacher : teachers) {
  capitalizeName(teacher);
}
```

No reason for reassigning `teacher`!
- if you'd reassign it, you were **not** operating on the array element!

---

<!-- getter and setter -->
