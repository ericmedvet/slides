class:middle,center

## Generics

---

## Motivation

Suppose we want to design a class that:
- represents a **set** of strings
- allows to:
  - add a string to the set
  - count the number of strings in the set
  - check if a string is contained in the set

```java
SetOfStrings set = new SetOfStrings();
set.add("hi");
set.add("world");
set.add("hello");
set.add("world");
System.out.println(set.size()); // -> 3
System.out.println(set.contains("dog")); // -> false
```

---

## Possible solution

.compact[
```java
public class SetOfStrings {
  private String[] strings = new String[0];
  public void add(String toAddString) {
    if (!contains(toAddString)) {
      String[] newStrings = new String[strings.length + 1];
      System.arraycopy(strings, 0, newStrings, 0, strings.length);
      newStrings[newStrings.length - 1] = toAddString;
      strings = newStrings;
    }
  }
  public boolean contains(String otherString) {
    for (String string : strings) {
      if (string.equals(otherString)) {
        return true;
      }
    }
    return false;
  }
  public int size() {
    return strings.length;
  }
}
```
]

Key idea:
- keep an **array** or current strings
  - enlarge when adding
- `contains()` and `add()` check for **equal** string in array

---

## Set of `Person`?

Suppose now we want a set of `Person`s.

Two options .note[up to Java 1.5 (excluded)]:
1. design and code a `SetOfPersons` almost identical to `SetOfStrings`
  - then a `SetOfThiss`, a `SetOfThats`, and so on...
2. design and code a "general" `Set` that takes objects

The core functionality of `SetOfStrings` do not depend on any peculiar functionality of `String` (or `Person`, or `This`...).  
The key functionality is `equals()`, that is present in (any) `Object`.
- so, let's go for 2
- .note[also because cool developers always avoid writing more than one times the same code!]

---

## Set of `Object` (or just `Set`)

.compact[
```java
public class Set {
  private Object[] items = new Object[0];
  public void add(Object toAddItem) {
    if (!contains(toAddItem)) {
      Object[] newItems = new Object[items.length + 1];
      System.arraycopy(items, 0, newItems, 0, items.length);
      newItems[newItems.length - 1] = toAddItem;
      items = newItems;
    }
  }
  public boolean contains(Object otherItem) {
    for (Object item : items) {
      if (item.equals(otherItem)) {
        return true;
      }
    }
    return false;
  }
  public int size() {
    return items.length;
  }
}
```
]

---

## Check on type

`SetOfStrings`:
- a set: with set properties, `add()` and `size()` operations
- **of strings**: it cannot contain other things
  - the compiler prevents to use it to contain other things!

```java
SetOfStrings strings = new SetOfStrings();
strings.add("hi");
*strings.add(new Person()); // does not compile!
```

---

## No check!

`Set`:
- a set: with set properties, `add()` and `size()` operations
- **no constraints on item type**

```java
Set persons = new Set();
persons.add(new Person());
*persons.add("surprise!"); // does compile!!!
```

It'd be a **responsability of the developer** to correctly use `Set`.

---

## Language limitation

"Usual" type consistency check:
- "dear compiler, verify that `doStuff(String)` method, when used, takes objects of type `String` (or `extends String`)"

This type consistency check:
- "dear compiler, verify that `add(T)` and `contains(T)`, are **both used with the same `T`**, regardless of what actual `T`"

The second case was **not supported by the language** up to Java 1.5.
- i.e., the language offered no syntax to allow the developer to ask the compiler to do that check

---

## The solution: generics

**Generic type**: a type defined with another type as parameters

E.g., "a set of strings":
- set is the generic type
- string is parameter (still a type)

Language:
- how to define them?
- how to use them?

Design:
- when to use them?

---

### Why from just 1.5?

Generics are an old concept in programming (see [Generic Programming](https://en.wikipedia.org/wiki/Generic_programming)):
- dates back to 70s
- exist now in many languages: Python, Java, C#, C++ (with another name), TypeScript, ...

Java designers avoided, for a while, the costs of integrating generics into the language.
- winning motivation was the collection framework

---

## How to define?

```java
public class Set`<T>` {
  public void add(`T` toAddItem) { /* ... */ }
  public boolean contains(`T` otherItem) { /* ... */ }
  public int size() { /* ... */ };
}
```

`T` is not an actual type: it's the **identifier of a parameter** specifying a type.

Naming convention:
- usually one single uppercase letter, being the first letter of a suitable name for the parameter
- here: `T` for type

---

## Usage of parameter

`T` can be used wherever a type would be used:
- definition of fields (instance variables)
- definition of arguments (argument variables)
- definition of references (local variables)
- definition of return type

But:
- **`T` cannot be used as constructor**
  - `new T()` does not compile: what constructor should be invoked? what if not legit?
  - `new T[]` does not compile
- **`T` cannot be valued to primitive type**

---

## How to use?

```java
Set`<String>` strings = new Set`<String>`();
strings.add("hi");
Set`<Double>` doubles = new Set`<Double>`();
doubles.add(3.14d);
```

`String` and `Double` are "values" for the parameter `T`:
- they have to be actual types
- or, if a parameter type identifier is defined in the context, a parameter type

This would not compile:
```java
Set<String> strings = new Set<String>();
strings.add(3d);
strings.add(new Person("Eric", "Medvet"));
```

---

## Arrays or primitive types

Does not compile!
```java
Set<double> numbers = new Set<double>();
```

Use wrapper classes:
```java
Set<Double> numbers = new Set<Double>(); //compiles!
```

Arrays are types!
```java
Set<double[]> numbers = new Set<double[]>(); //compiles!
Set<String[]> sentences = new Set<String[]>(); //compiles!
```

---

## Diamond operator `<>`

(Since Java 1.7)

```java
Set`<String>` strings = new Set`<>`();
strings.add("hi");
```

In the constructor, the generic type parameter can be left unspecified (`<>` instead of `<String>`), because it can be **inferred by the compiler**.

---

### Our `Set<T>`

.compact[
```java
public class Set<T> {
  private Object[] items = new Object[0];
  public void add(T toAddItem) {
    if (!contains(toAddItem)) {
      Object[] newItems = new Object[items.length + 1];
      System.arraycopy(items, 0, newItems, 0, items.length);
      newItems[newItems.length - 1] = toAddItem;
      items = newItems;
    }
  }
  public boolean contains(T otherItem) {
    for (Object item : items) {
      if (item.equals(otherItem)) {
        return true;
      }
    }
    return false;
  }
  public int size() {
    return items.length;
  }
}
```
]

Since `T[]` cannot be instantiated, this `Set<T>` **internally** uses `Object[]`:
- completely invisible to the users of `Set<T>` (information hiding)

---

## Multiple parameters, generic `interface`

```java
@FunctionalInterface
public interface Function<`A, B`> {
  `B` apply(`A` a);
}
```

An `interface` that represents a function from `A` to `B` that is able to do one thing:
- given an `A`, returns a `B`

---

### Examples

.compact[
```java
Function<Double, Double> squarer = new Function<>() {
  @Override
  public Double apply(Double x) {
    return x * x;
  }
};
double y = squarer.apply(2); // -> 4
```

```java
Function<String, String> shortener = new Function<>() {
  @Override
  public String apply(String s) {
    String acronym = "";
    for (String token : s.split(" ")) {
      acronym = acronym + token.substring(0, 1).toUpperCase();
    }
    return acronym;
  }
};
String shortened = shortener.apply("Eric Medvet"); // -> EM
```

```java
Function<String, Integer> tokenCounter = s -> s.split(" ").length;
int nOfTokens = tokenCounter.apply("I love generics!"); // -> 3
```

```java
Function<String, Integer> length = String::length;
length.apply("wow"); // -> 3
```
]
---

## Generic method

Methods (static or not) can have "local" type parameters:

.compact[
```java
@FunctionalInterface
public interface Function<A, B> {
  B apply(A a);

  default <`C`> Function<A, `C`> composeWith(Function<B, `C`> other) {
    return a -> other.apply(apply(a));
  }
}
```
]

Visibility:
- `A` and `B` are visible everywhere (here)
- `C` is visible only in `composeWith()` (signature and body)

Usage:
```java
int n = tokenCounter.composeWith(n -> n*n).apply("Eric Medvet");
```

.question[`n` is?]

---

## Unparametrized

```java
Set set = new Set();
set.add("hi");
set.add(3.14);
set.add(new Object());
```

Legit, but the compiler emits a warning ("raw usage of parametrized type").
- may lead to misleading usage

If one still wants to contain any object, it's better to make the type explicit:
```java
Set<Object> set = new Set<>();
set.add("hi");
set.add(3.14);
set.add(new Object());
```

---

## Generics and inheritance

Trivial:
```java
public class Person { /* ... */ }
```
```java
public class Worker extends Person { /* ... */ }
```
```java
Set<Person> persons = new Set<>();
persons.add(new Person("Eric", "Medvet"));
persons.add(new Worker("Bruce", "Wayne", "businessman")); // -> OK
```

Recall:
- compiler: "is a `Worker` able to do all the things that a `Person` can do?" yes!

---

## With interfaces

```java
public interface Container<T> {
  void add(T t);
  T getOne();
}
```

```java
public class ArrayContainer<T> implements Container<T> {
  /* ... */
}
```

```java
public interface LimitedContainer<T> extends Container<T> {
  boolean hasSpace();
}
```

`interface LimitedContainer` definition (i.e., without `<T>`) would not compile:
- 1st `<T>` defines an identifier: `T`
- 2nd `<T>` uses an identifier
  - if 1st absent, at 2nd compiler "cannot resolve symbol"

---

### Instantiating type parameter

```java
public class StringContainer implements Container<String> {
  /* ... */
}
```

`StringContainer` is not a generic type!

---

## Inheritance among generics

Assume:
```java
class Worker extends Person {}
interface LimitedContainer<T> extends Container<T> {}
class ArrayContainer<T> implements Container<T> {}
class LimitedArrayContainer<T> implements LimitedContainer<T> {}
```

Ok:
```java
Container<Person> persons = new ArrayContainer<>();
Container<Person> persons = new LimitedArrayContainer<>();
```

**Not ok** (does not compile):
```java
Container<Person> persons = new ArrayContainer<`Worker`>();
Container<Person> persons = new LimitedArrayContainer<`Worker`>();
```

---

## Reference: class or interface?

For the references: use always the **most general type** that is specific enough!

```java
Container<Person> persons = new ArrayContainer<>();
```
Means: "dear all (other developers, future me), I am going to use only `Container` operations on `persons`"
- another point of view: "what matters here is that `persons` is a `Container`"

```java
ArrayContainer<Person> persons = new ArrayContainer<>();
```
Means: "I need to use `ArrayContainer` operations; `Container` ones are not enough"
- it happens **rarely**

---

## `extends` in parameter type

A generic can narrow the generality of the type parameter(s):
```java
public interface Union<W extends Worker> {
  void register(W worker);
  W[] listAlphabetically();
}
```

The developer states that:
- a `Union` makes sense only "of some kind of `Worker`s" **and** they have the same type (or subtypes)
- implementing those methods likely require using operations/features of `Worker`s

For this usage, `extends` is used also with `interface`s.
```java
public class ComplexStuff<T extends Doer> { /* ... */ }
```

---

## Wildcard `?`

In some cases, any type is ok:
- **not in the definition** of the generic type
- usually in method signatures

```java
public int count(Set<?> set) { /* ... */ }
```
- no need to know the type for counting

```java
public void removeShorterThan(
  Set<? extends Sized> set,
  double size
) { /* ... */ }
```

---

## When to use generics?

Basically, every time you are modeling a $X$ **of $Y$**!

Particularly powerful with interface:
- `interface` $Y$ declares some capabilities
  - what, not how
- $X$ defines some functionalities based on $Y$ capabilities

By decoupling $X$ from $Y$, software may be made much clearer!
- separation of concerns

---

### JDK examples: `Function<T,R>`

<iframe width="100%" height="450" src="https://docs.oracle.com/en/java/javase/13/docs/api/java.base/java/util/function/Function.html"></iframe>

---

### `Comparable<T>`

<iframe width="100%" height="450" src="https://docs.oracle.com/en/java/javase/13/docs/api/java.base/java/lang/Comparable.html"></iframe>

---

## Total ordering

Given $a$ and $b$:
- $a \le b \land b \le a \Rightarrow a = b$ (**antisymmetry**)
- $a \le b \land b \le c \Rightarrow a \le c$ (**transitivity**)
- $a \le b \lor b \le a$ (**connexity**)

`interface Comparable<T>` models this with a single method:
- `int compareTo(T other)`

"Similar" interface: `Comparator<T>`
- `int compare(T t1, T t2)`
- useful when one needs to compare objects of type that does not implement `Comparable`
- many useful `default` methods

---

### `Comparator<T>`

<iframe width="100%" height="450" src="https://docs.oracle.com/en/java/javase/13/docs/api/java.base/java/util/Comparator.html"></iframe>

---

## Natural ordering

**Natural ordering** of a type is the ordering dictated by its `compareTo()`
- i.e., the type must implement `Comparable`

E.g., natural ordering by last name:
```java
public class Person implements Comparable<Person> {
  private final String firstName;
  private final String lastName;
  private final Date birthDate;
  /* getters */
  public int compareTo(Person other) {
    return lastName.compareTo(other.lastName); // not null safe
  }
}
```

---

## Custom ordering with `Comparator`

```java
Comparator<Person> c = Comparator
    .<Person>naturalOrder()
    .thenComparing(Person::getBirthDate)
    .thenComparing(Person::getFirstName)
    .reversed();
```

- `<Person>naturalOrder()` is a way of setting the value of a parameter type with no usage of the parameter in the arguments
- `Person::getBirthDate` is a `Function<Person, Comparable>`

Result:
1. Eric Medvet, 02/03/1979
2. Alice Medvet, 07/02/2011
3. Andrea Medvet, 11/10/2013
4. Jack Zurrell, 01/03/1982
