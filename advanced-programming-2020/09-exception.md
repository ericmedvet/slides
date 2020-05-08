class:middle,center

## Exceptions

---

## The old way

The old way of dealing with errors:
- the language does not define the notion of error
- each software establishes a convention for dealing with errors

Example, a function:  
1. detects an error condition
2. propagates the information to the caller through a "special" return value

---

### Examples: C `fwrite`

.big-quote[
#### Syntax:
.compact[
```C
#include <stdio.h>

size_t fwrite(const void *ptr, size_t size, size_t nmemb, FILE *stream);
```
]

#### Description:  
This function writes `size` * `nmemb` bytes from `ptr` to `stream`.

#### Return value:  
The number of items of size `nmemb` written **or -1 on error**.
]

"or -1 on error" is the convention

---

### C `atoi`

.big-quote[
#### Syntax:
.compact[
```C
#include <stlib.h>

int atoi(const char *str);
```
]

#### Description:  
Converts as much of the string as possible to an equivalent integer value.

#### Return value:  
The equivalent value, **or zero if the string does not represent a number**.
]

"or zero [...]" is the convention
- returned value is in the domain of legit values!
- caller has to explicitly check for errors

---

## Detecting vs. handling

"caller has to explicitly check for errors"

What if the developer of the caller code does not check?

1. the error exists
  - indeed, it is **detected* by the called code
2. the caller gets a value that is wrong, but goes on
3. some time later, a bigger error occurs, but the cause is hardly detectable

The problem is that the **detected error is not handled**!  
More broadly, the problem is that the language does not favor spotting when the developer forgets to handle an error.

---

## Sketch of possible solution

The **language**:
- considers the error as a key concept
- allows to define two kinds of flows in the source code:
  - **normal**: when no error occurs
  - **anomalous**: when an error occurs
    - when in anomalous flow, there is always one error!

The **developer** uses the anomalous flow code to **handle the error**.

The **compiler** notifies the developer if she/he forgets to defune the anomalous flow when needed,

---

## Normal $\leftrightarrow$ anomalous

Suppose:
- a method $m$ called by a method $m'$
- at some point in $m$ an error occurs

If $m$ has an anomalous flow:
1. $m$ switches to anomalous flow and, when completed, switches back to normal flow
2. eventually execution goes back to $m'$ in normal flow

Otherwise:
1. $m$ returns immediately to $m'$ as an error
2. an error occurs in $m'$ where it called $m$

---

## Error propagation

If an error occurs in $m$:
- and $m$ has not anomalous flow
- and the caller $m'$ has no anomalous flow
- and the caller $m''$ has no anomalous flow
- ...

then **the program halts immediately**.

$\Rightarrow$ impossible that an error goes undetected causing (bigger) errors later!

---

## Errors in Java

Language:
- what is error in Java?
- how to define the normal and anomalous flow?
- how to switch to anomalous flow?

Design:
- when to handle an error? (and when to propagete?)
- how to handle an error?
- when to "create" an error?

---

## `Exception`

**What is an error in Java?**

.javadoc.head[
**Package** .pack[java.lang]

.def[Class Exception]

.pack[java.lang.Object]  
.indent[].pack[java.lang.Throwable]  
.indent[].indent[]java.lang.Exception
]
.javadoc[
The class `Exception` and its subclasses are a form of `Throwable` that indicates conditions that a reasonable application might want to catch.
]

- errors (as implicitly defined before) are "conditions that a reasonable application might want to catch" $\rightarrow$ **anomalous events** that result in conditions that should be taken with care **by the developer**
  - **exception**s to the normality
- can (and should) be extended to represent specific kinds of exceptions to the normality

---

### Subclasses of `Exception`

One:
.javadoc.head[
**Package** .pack[java.net]

.def[Class UnknownHostException]

.pack[java.lang.Object]  
.indent[].pack[java.lang.Throwable]  
.indent[].indent[].pack[java.lang.Exception]  
.indent[].indent[].indent[].pack[java.io.IOException]  
.indent[].indent[].indent[].indent[]java.net.UnknownHostException
]
.javadoc[
Thrown to indicate that the IP address of a host could not be determined.
]

Another one:
.javadoc.head[
**Package** .pack[javax.sound.sampled]

.def[Class UnsupportedAudioFileException]

.pack[java.lang.Object]  
.indent[].pack[java.lang.Throwable]  
.indent[].indent[].pack[java.lang.Exception]  
.indent[].indent[].indent[].javax.sound.sampled.UnsupportedAudioFileException
]
.javadoc[
An `UnsupportedAudioFileException` is an exception indicating that an operation failed because a file did not contain valid data of a recognized file type and format.
]


---

### Message and cause

.javadoc.constructors[
| Constructor | Description |
| --- | --- |
| Exception()	| Constructs a new exception with `null` as its detail message. |
|	Exception​(String message) | Constructs a new exception with the specified detail message. |
| Exception​(String message, Throwable cause) | Constructs a new exception with the specified detail message and cause. |
]

An `Exception` may have a message and a cause (another `Exception`):
- set by constructor


---

## `try`-`catch`

**How to define the normal and anomalous flow?**

.cols[
.c40[
.compact[
```java
doThings() {
  try {
    /* N */
  } catch (UnknownHostException e) {
    /* A1 */
  } catch (InvalidTypeException e) {
    /* A2 */
  }
}
```
]

]
.c60[
- $N$: normal flow
- $A_1$: anomalous flow if `UnknownHostException` occurs
- $A_2$: anomalous flow if `InvalidTypeException` occurs
]
]

If exception $e$ of type $E$ occurs while executing the normal flow, the JVM checks (in order) if one `catch` block exists for $E$:
- if found, execution goes to the 1st stament of the `catch` block
  - and `e` references the object $e$ of type $E$
- otherwise, execution goes to the caller of `doThings()` carrying the exception $e$

---

## Enforcement of exception handling

The compiler:
- given a statement $s$, knows exactly if it can generate one or more exceptions and their types
- compiles a block of code $C = (s_1, s_2 , \dots)$ only if either:
  - **no exceptions** can be generatedby any statement $s_i \in C$
  - or $C$ is in a **`try` block** for which there is a `catch` for any possible exception generated by C (with inheritance) (**exception catched**)
  - or the developer explicitly **defines the method** containing $C$ as a method that can generate the exceptions possibly generated by $C$ (**exception declared**)

---

## `throws`

How does the compiler if a statement generate an exception?  
How does the developer specifies that a method can generate an exception?

.compact[
```java
public String getLastName(String fullName) `throws MalformedNameException` {
  /* ... */
}
```
]

The developer declares that `getLastName()` might **throw** an exception of type `MalformedNameException`.

A method may be declared to throw more than one exceptions:
.compact[
```java
public void doHardJob() `throws TooHardException, TooLazyException` {
  /* ... */
}
```
]

---

## `throw`

**How to switch to anomalous flow?** (i.e., how to throw an exception?)

.compact[
```java
public String getLastName(String fullName) `throws MalformedNameException` {
  String[] pieces = fullName.split(" ");
  if (pieces.length == 0) {
    `throw new MalformedNameException("Empty name!")`;
  }
  return pieces[pieces.length-1];
}
```
]
If/when the execution reaches the `throw` $e$ statement, the anomalous flows starts with the exception $e$.
- in this case, there is no `try`-`catch`, hence the method is defined with `throws ` $E$ (with $e$ of type $E$)

---

### `throws` vs. `throw`

`throw` is an action:
- do it now!

`thorws` is part of a definition:
- the method may do it

---

## Compiler checks

The compiler checks if exception is absent, catched, or declared.

It also considers:
- **actual need** for catching or declaration
- **inheritance** among `Exception`s


---

### Examples: not catched, not declared

.compact[
```java
public String getLastName(String fullName) throws MalformedNameException {
  /* ... */
}
```
]

```java
public void showName(String fullName) {
  String lastName = getLastName(fullName);
  System.out.println(lastName);
}
```

Does not compile because:
- `getLastName()` throws `MalformedNameException` and it is not catched, nor declared.

---

### Not thrown, but declared

.compact[
```java
public void showName(String fullName) throws MalformedNameException {
  System.out.println(fullName);
}
```
]

Does not compile because:
- code does not throw `MalformedNameException`

Also with "wrong" exception type:

.compact[
```java
public String getLastName(String fullName) throws MalformedNameException, IOException {
  String[] pieces = fullName.split(" ");
  if (pieces.length == 0) {
    throw new MalformedNameException("Empty name!");
  }
  return pieces[pieces.length-1];
}
```
]

- code does not throw `IOException`


---

### Not thrown, but catched

```java
public void showName(String fullName) {
  try {
    System.out.println(fullName);
  } catch (MalformedNameException e) {
    /* ... */
  }
}
```

Does not compile because:
- code does not throw `MalformedNameException`

---

### Catched by superclass

```java
public void showName(String fullName) {
  try {
    System.out.println(fullName);
  } catch (Exception e) {
    /* ... */
  } catch (MalformedNameException e) {
    /* ... */
  }
}
```

Does not compile because:
- first `catch` catches "everything", second one cannot be triggered


<!--
finally
exception in catch: anomalous is relative
-->

<!-- design questions -->

<!-- multicatch -->
