class:middle,center

## Key JDK APIs

### Collections, Executors, Stream, Reflection, Serialization

---

class:middle,center

## Collections

---

## Motivation

Model the concept of **collection**: groups of homogeneous items
- and derived concepts (data structures)

Examples:
- a set of $X$
- a list of $Y$
- a queue of $Z$

---

## Java collection framework

In Java:

- a set of **interfaces** modeling key concepts
  - with operations
  - with implicit properties
- a set of **classes** implementing those interfaces

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
  - elsewhere called dictionary

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

- They all have the maximum generality that is specific enough to the **concept of collection**
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

.javadoc.methods[
| Mod. and Type | Method | Description |
| --- | --- | --- |
| Object[] | toArray() | Returns an array containing all of the elements in this collection. |
| default <T> T[] | toArray​(IntFunction<T[]> generator) | Returns an array containing all of the elements in this collection, using the provided generator function to allocate the returned array. |
| <T> T[] | toArray​(T[] a) | Returns an array containing all of the elements in this collection; the runtime type of the returned array is that of the specified array. |
]

Why `Collection<T>.toArray()` returns an `Object[]` instead of a `T[]`?  
Because `T[]` cannot be created.

The other two methods circumvent the limitation:
- `IntFunction<T[]>` is a function from `int` to `T[]`
- `T[]`

both provided by the caller.

---

## Iterating over a collection

4 ways:
- `toArray()` and then `for (int i = 0; )`...: **ancient**
- `iterator()`: **very old**
- for-each: **current, proper way** (if you don't need the index)
- stream: fancy, we'll see

---

## `toArray()` and `for`

```java
Collection<Person> persons = /* ... */
Person[] personArray = persons.toArray(new Person[persons.size()]);
for (int i = 0; i < personArray.length; i++) {
  Person person = personArray[i];
  // do things
}
```

This way, we are actually iterating over a copy of the collection, rather than the collection itself.
- the collection might change during the iteration

---

## `iterator()`

In `Collection<E>`:
.javadoc.methods[
| Mod. and Type | Method | Description |
| --- | --- | --- |
| Iterator<E> | iterator() | Returns an iterator over the elements in this collection. |
]

In `interface Iterator<E>`:
.javadoc.methods[
| Mod. and Type | Method | Description |
| --- | --- | --- |
| boolean | hasNext() | Returns `true` if the iteration has more elements. |
| E | next() | Returns the next element in the iteration. |
]

Then:
```java
Collection<Person> persons = /* ... */
Iterator<Person> iterator = persons.iterator();
while (iterator.hasNext())
  Person person = iterator.next();
  // do things
}
```

---

### `Iterable<T>`

An interface representing iterable things:
.javadoc.methods[
| Mod. and Type | Method | Description |
| --- | --- | --- |
| Iterator<T> | iterator() | Returns an iterator over elements of type `T`. |
]

`Collection<E> extends Iterable<E>`

---

## for-each

```java
Collection<Person> persons = /* ... */
for (Person person : persons) {
  // do things
}
```

The for-each syntax applies to any `Iterable`, hence also to `Collection`.  
The compiler translates this to the `iterator()` way of iterating over elements.

---

## Iteration and order

**Never assume** that iterating over a collection will result in some specific **ordering**!
- unless it is a property of the actual type of the collection

```java
Collection<String> strings = /* ... */
string.add("hi");
string.add("world");
for (String string : strings) {
  System.out.println(string);
}
```

Might result in:
- `hi`, `world`
- or `world`, `hi`

---

set

list

sortedset

map

implementation: hashset, linkedhashset, arraylist, hashmap, linkedhashmap

views given by Collections

<!--
- use in code:
  - use always the most general type
- mention to other libraries with useful methods related to colelctions: guava and apache commons
- executors
- streams
- reflection
- serialization -->
