class:middle,center

## Generics

---

## Motivation

Suppose we want to design a class that:
- represents a **set** of strings
- with the following operations:
  - add a string to the set
  - count the number of strings in the set
  - check if a string is contained

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

Suppose now we want an set of `Person`s.

Up to Java 1.5 (excluded), there were two options:
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

Java designer avoided, for a while, the costs of integrating generics in the language.
- winning motivation was the collection framework

---

## How to define



<!-- - generics
- collections
- use in code:
  - use always the most general type
- executors
- streams
- reflection
- serialization -->
