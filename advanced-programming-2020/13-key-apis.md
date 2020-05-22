class:middle,center

## Key JDK APIs

### Collections, Executors, Stream, Reflection, Serialization

---

class:middle,center

## Collections

---

## Motivation

Model the concept of **collection**: groups of homogeneous items
- and derived concepts

Examples:
- a set of $X$
- a list of $Y$
- a queue of $Z$

---

## Java collection framework

In Java:

- a set of interfaces modeling key concepts
  - with operations
  - with implicit properties
- a set of classes implementing those interfaces

Interfaces:
- modeled concept is captured by the name

Classes, differ mainly in:
- additional properties
- behavior with respect to multithreading
- performances
  - one class $X$ may have operation $m()$ faster than another class $X'$, both implementing the same interface

---

## Main interfaces

`Collection<E>`:
- "A collection represents a group of objects, known as its elements."
  - `E` stays for **element**

`Map<K,V>`:
- "An object that maps keys to values. A map cannot contain duplicate keys; each key can map to at most one value."
  - `K` stays for **key**, `V` stays for **element**

They are disjoint and `Map` is not precisely a collection.  
Yet it is traditionally considered part of the Java collection framework.

---

## `Collection<E>`: key methods

.javadoc.methods[
| Mod. and Type | Method | Description |
| --- | --- | --- |
| boolean | add​(E e) | Ensures that this collection contains the specified element (optional operation). |
| boolean | contains​(Object o) | Returns `true` if this collection contains the specified element. |
| boolean | remove​(Object o) | Removes a single instance of the specified element from this collection, if it is present (optional operation). |
| int | size() | Returns the number of elements in this collection. |
]

- They are all with the maximum generality that is specific enough to the **concept of collection**
  - you can do them on any collection
  - note the `add()` description: "ensures that [...] contains"
- `contains()` and `remove()` take `Object`, rather than `E`: historical reasons, but conceptually sound
  - "does this box of oranges contains an apple?"; no, but the question is legit
- `add()` and `remove()` **mutator** methods, since they (potentially) modify the state, i.e., the group
  - modifying one element state is another thing
---

## Bulk operations

.javadoc.methods[
| Mod. and Type | Method | Description |
| --- | --- | --- |
| boolean | addAll​(Collection<? extends E> c) | Adds all of the elements in the specified collection to this collection (optional operation). |
| boolean | containsAll​(Collection<?> c) | Returns `true` if this collection contains all of the elements in the specified collection. |
| boolean | removeAll​(Collection<?> c) | Removes all of this collection's elements that are also contained in the specified collection (optional operation). |
| boolean | retainAll​(Collection<?> c) | Retains only the elements in this collection that are contained in the specified collection (optional operation). |
]

"Derived" methods:
.javadoc.methods[
| Mod. and Type | Method | Description |
| --- | --- | --- |
| void | clear() | Removes all of the elements from this collection (optional operation). |
| boolean | isEmpty() | Returns true if this collection contains no elements. |
]

---

## `toArray()`

---

## Iterating over a collection

4 ways: toarray, iterator, for-each, stream

don't assume

<!--
- collections
- use in code:
  - use always the most general type
- mention to other libraries with useful methods related to colelctions: guava and apache commons
- executors
- streams
- reflection
- serialization -->
