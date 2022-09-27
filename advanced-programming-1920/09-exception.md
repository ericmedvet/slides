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

"or zero [...] if [...]" is the convention
- returned value is in the domain of legit values!
- caller has to explicitly check for errors

---

## Detecting vs. handling

"caller has to explicitly check for errors"

What if the developer of the caller code does not check?

1. the error exists
  - indeed, it is **detected** by the called code
2. the caller gets a value that is wrong, but goes on
3. some time later, a bigger error occurs, but the cause is hardly detectable

The problem is that the **detected error is not handled**!  
More broadly, the problem is that the language permits the developer to forget about error handling.

---

## Sketch of possible solution

The **language**:
- considers the error as a key concept
- requires to define two kinds of flows in the source code:
  - **normal**: when no error occurs
  - **anomalous**: when an error occurs
      - when in anomalous flow, there is always one error!

The **developer** uses the anomalous flow code to **handle the error**.

The **compiler** notifies the developer if she/he forgets to define the anomalous flow when needed.

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

then **the execution halts immediately**.

$\Rightarrow$ impossible that an error goes unhandled causing (bigger) errors later!

---

## Errors in Java

Language:
- what is error in Java?
- how to define the normal and anomalous flow?
- how to switch to anomalous flow?

Design:
- when to handle an error? (and when to propagate?)
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
.indent[].indent[].indent[]javax.sound.sampled.UnsupportedAudioFileException
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
  - or $C$ is in a **`try` block** for which there is a `catch` for any possible exception generated by $C$ (with inheritance) (**exception catched**)
  - or the developer explicitly **defined the method** containing $C$ as a method that can generate the exceptions possibly generated by $C$ (**exception declared**)

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

The developer declares that `getLastName()` might **throw** an exception of type `MalformedNameException` (**`throws` clause**)

A method may be declared to throw more than one exceptions:
.compact[
```java
public void doHardJob() `throws TooHardException, TooLazyException` {
  /* ... */
}
```
]

---

## `throws` and inheritance

`throws` clause is part of the method signature.

If a class $C'$ extends a class $C$ with a method $m$, $C'$ cannot "increase" the `throws` clause of $m$.

.cols[
.c50[
.compact[
```java
public class Worker {
  void work() {
    /* ... */
  }
}
```
]
]
.c50[
.compact[
```java
public class LazyWorker extends Worker {
  void work() throws TooHardException {
    /* ... */
  }
}
```
]
]
]

Code using a `Worker` expects `work()` to work, regardless of the actual object being a `LazyWorker`.

Declared `throws` clauses may be instead "decreased".

---

### Stricter `throws` clause

Ok! `TirelessWorker` might throw, but never throws `TooHardException`.
.cols[
.c50[
.compact[
```java
public class Worker {
  void work() throws TooHardException {
    /* ... */
  }
}
```
]
]
.c50[
.compact[
```java
public class TirelessWorker extends Worker {
  void work() {
    /* ... */
  }
}
```
]
]
]

Ok! `PreciseWorker` might throw `Exception`s, but throws only `ForbiddenByUnionsException`.
.cols[
.c50[
.compact[
```java
public class Worker {
  void work() throws Exception {
    /* ... */
  }
}
```
]
]
.c50[
.compact[
```java
public class PreciseWorker extends Worker {
  void work() throws ForbiddenByUnionsException {
    /* ... */
  }
}
```
]
]
]

- assuming `ForbiddenByUnionsException` extends `Exception`






---

## `throw`

**How to switch to anomalous flow?** (i.e., how to throw an exception?)

```java
public String getLastName(String fullName) throws MalformedNameException {
  String[] pieces = fullName.split(" ");
  if (pieces.length == 0) {
    `throw` new MalformedNameException("Empty name!");
  }
  return pieces[pieces.length-1];
}
```

If/when the execution reaches the `throw` $e$ statement, the anomalous flows starts with the exception $e$.
- in this case, there is no `try`-`catch`, hence the method is defined with `throws ` $E$ (with $e$ of type $E$, or of subclass of $E$)

---

### `throws` vs. `throw`

`throw` is an action:
- do it now!

`throws` is part of a definition:
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

Compiles, but IDEs usually warn that code does not throw `MalformedNameException`

---

### Declared with superclass

.compact[
```java
public void showName(String fullName) throws Exception, MalformedNameException {
  String[] pieces = fullName.split(" ");
  if (pieces.length == 0) {
    throw new MalformedNameException("Empty name!");
  }
  return pieces[pieces.length-1];
}
```
]

Compiles, but IDEs usually warn that declaring `MalformedNameException` is useless because a more general exception can be thrown.


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

---

## `finally`

```java
try {
  /* normal flow */
} catch (Exception e) {
  /* anomalous flow */
} finally {
  /* finally flow */
}
```

Allows to define a trailing execution flow that:
- is **always** executed
- does not affect the normal/anomalous state

---

### Example

.cols[
.c50[
```java
public void doThings(int n) {
  try {
    System.out.print("n1");
    if (n == 0) {
      throw new Exception();
    }
    System.out.print("n2");
  } catch (Exception e) {
    System.out.print("a");
  } finally {
    System.out.print("f");
  }
  System.out.println("n3");
}
```
]
.c50[
Invoked with `n=1` (no exception thrown):
- `n1 n2 f n3`

Invoked with `n=0` (`Exception` thrown):
- `n1 a f n3`
]
]

---

### `finally` without `catch`

`finally` **does not affect** the normal/anomalous state!

.cols[
.c50[
.compact[
```java
public void doThings(int n)
  `throws Exception` {
  try {
    System.out.print("n1");
    if (n == 0) {
      throw new Exception();
    }
    System.out.print("n2");
  } finally {
    System.out.print("f");
  }
  System.out.println("n3");
}
```
```java
public void externalDoThings(int n) {
  try {
    System.out.println("en1");
    doThings(n);
    System.out.println("en2");
  } catch (Exception e) {
    System.out.println("ea");
  }
  System.out.println("en3");
}
```
]
]
.c50[
`externalDoThings(1)` invoked:
- `en1 n1 n2 f n3 en2 en3`
- remains in normal state when exiting from `doThings()`

`externalDoThings(0)` invoked:
- `en1 n1 f ea en3`
- remains in anomalous state when exiting from `doThings()`
]
]

---

## Anomalous is relative

The condition of a flow of being anomalous is **relative**, not absolute:
- given flow $f$, $f'$ is anomalous **with respect to $f$** if an exception $e$ was thrown in $f$

```java
try {  
  throw new Exception("problem"); // `A`
} catch (Exception e) {
  try {
    throw new Exception("further problem"); // `B`
  } catch (Exception furtherE) {
    /* ... `C` */
  }
}
```
B is anomalous wrt A; C is anomalous wrt B
- in C, two exceptions exists: `e` and `furtherE`

---

## Unchecked exceptions, throwables

.cols[
.c30[
.javadoc.head[
**Package** .pack[java.lang]

.def[Class Exception]

.pack[java.lang.Object]  
.indent[].pack[java.lang.Throwable]  
.indent[].indent[]java.lang.Exception
]
]
.c30[
.javadoc.head[
**Package** .pack[java.lang]

.def[Class Error]

.pack[java.lang.Object]  
.indent[].pack[java.lang.Throwable]  
.indent[].indent[]java.lang.Error
]
]
.c40[
.javadoc.head[
**Package** .pack[java.lang]

.def[Class RuntimeException]

.pack[java.lang.Object]  
.indent[].pack[java.lang.Throwable]  
.indent[].indent[].pack[java.lang.Exception]  
.indent[].indent[].indent[]java.lang.RuntimeException
]
]
]

The language specifies that:
- only `Throwable`s (and subclasses) can be argument of `throw`, `throws` and `catch`
- every thrown `Exception` (and subclasses) has to be catched or declared, **unless** it is a `RuntimeException` (or subclasses)
  - `RuntimeException`s are **unchecked exceptions**

`Throwable` is also extended by `Error`:
- `Error`s (and subclasses) are unchecked exceptions too

---

## `RuntimeException`

.javadoc.head[
**Package** .pack[java.lang]

.def[Class RuntimeException]

.pack[java.lang.Object]  
.indent[].pack[java.lang.Throwable]  
.indent[].indent[].pack[java.lang.Exception]  
.indent[].indent[].indent[]java.lang.RuntimeException

`RuntimeException` is the superclass of those exceptions that can be thrown during the normal operation of the Java Virtual Machine.

`RuntimeException` and its subclasses are *unchecked exceptions*. Unchecked exceptions do *not* need to be declared in a method or constructor's `throws` clause if they can be thrown by the execution of the method or constructor and propagate outside the method or constructor boundary.
]

Basically, can be thrown anywhere.

They can be catched, but you are not compelled to.

---

## `NullPointerException`

The queen of unchecked exceptions!

.javadoc.head[
**Package** .pack[java.lang]

.def[Class NullPointerException]

.pack[java.lang.Object]  
.indent[].pack[java.lang.Throwable]  
.indent[].indent[].pack[java.lang.Exception]  
.indent[].indent[].indent[].pack[java.lang.RuntimeException]  
.indent[].indent[].indent[].indent[]java.lang.NullPointerException

Thrown when an application attempts to use `null` in a case where an object is required. These include:
- Calling the instance method of a `null` object.
- Accessing or modifying the field of a `null` object.
- Taking the length of `null` as if it were an array.
- Accessing or modifying the slots of `null` as if it were an array.
- Throwing `null` as if it were a `Throwable` value.

Applications should throw instances of this class to indicate other illegal uses of the null object.
]

Examples (common cases):
.cols[
.c30[
.compact[
```java
String s = //.., rets null
s = s.toUpperCase();
```
]
]
.c30[
.compact[
```java
int[] a = //.., rets null
int l = a.length;
```
]
]
.c30[
.compact[
```java
int[] a = //.., rets null
a[0] = 0;
```
]
]
]
No `throw`, it is the JVM itself that generates the `NullPointerException` (in these examples).

---

### Another "popular" unchecked exception

.javadoc.head[
**Package** .pack[java.lang]

.def[Class ArrayIndexOutOfBoundsException]

.pack[java.lang.Object]  
.indent[].pack[java.lang.Throwable]  
.indent[].indent[].pack[java.lang.Exception]  
.indent[].indent[].indent[].pack[java.lang.RuntimeException]  
.indent[].indent[].indent[].indent[].pack[java.lang.IndexOutOfBoundsException]  
.indent[].indent[].indent[].indent[].indent[]java.lang.ArrayIndexOutOfBoundsException

Thrown to indicate that an array has been accessed with an illegal index. The index is either negative or greater than or equal to the size of the array.
]

---

## Errors

.javadoc.head[
**Package** .pack[java.lang]

.def[Class Error]

.pack[java.lang.Object]  
.indent[].pack[java.lang.Throwable]  
.indent[].indent[]java.lang.Error

An `Error` is a subclass of `Throwable` that indicates serious problems that a reasonable application should not try to catch. Most such errors are abnormal conditions. The `ThreadDeath` error, though a "normal" condition, is also a subclass of `Error` because most applications should not try to catch it.

A method is not required to declare in its `throws` clause any subclasses of `Error` that might be thrown during the execution of the method but not caught, since these errors are abnormal conditions that should never occur. That is, `Error` and its subclasses are regarded as unchecked exceptions for the purposes of compile-time checking of exceptions.
]

`Exception`: "conditions that a reasonable application might want to catch"
- come on, you can fix it!

`Error`: "problems that a reasonable application should not try to catch"
- you are doomed, it's too late!

---
### Some "popular" errors

No more heap:
.javadoc.head[
**Package** .pack[java.lang]

.def[Class OutOfMemoryError]

.pack[java.lang.Object]  
.indent[].pack[java.lang.Throwable]  
.indent[].indent[].pack[java.lang.Error]  
.indent[].indent[].indent[].pack[java.lang.VirtualMachineError]  
.indent[].indent[].indent[].indent[]java.lang.OutOfMemoryError

Thrown when the Java Virtual Machine cannot allocate an object because it is out of memory, and no more memory could be made available by the garbage collector.
]

No more stack (too much recursion!):
.javadoc.head[
**Package** .pack[java.lang]

.def[Class StackOverflowError]

.pack[java.lang.Object]  
.indent[].pack[java.lang.Throwable]  
.indent[].indent[].pack[java.lang.Error]  
.indent[].indent[].indent[].pack[java.lang.VirtualMachineError]  
.indent[].indent[].indent[].indent[]java.lang.StackOverflowError

Thrown when a stack overflow occurs because an application recurses too deeply.
]

---

## `Throwable` (and subclasses) usage

Constructors:
.javadoc.constructors[
| Constructor | Description |
| --- | --- |
| Throwable()	| Constructs a new throwable with `null` as its detail message. |
|	Throwable(String message) | Constructs a new throwable with the specified detail message. |
| Throwable(String message, Throwable cause) | Constructs a new throwable with the specified detail message and cause. |
]

Methods (key ones):
.javadoc.methods[
| Mod. and Type | Method | Description |
| --- | --- | --- |
| String | getMessage() | Returns the detail message string of this throwable.
| void | printStackTrace() | Prints this throwable and its backtrace to the standard error stream. |
| void | printStackTrace​(PrintStream s) | Prints this throwable and its backtrace to the specified print stream. |
| void | printStackTrace​(PrintWriter s) | Prints this throwable and its backtrace to the specified print writer. |
]

`printStackTrace()` (= `printStackTrace(System.err)`):
- super useful for debugging
- should **not** be used in production-level software
  - most IDEs warn if used

---

## Stack trace
.cols[
.c50[
.compact[
```java
public static void dec(int n)
    throws Exception {
  if (n == 0) {
    throw new Exception("surprise!");
  }
  dec(n - 1);
}
```
]
]
.c50[
.compact[
```java
public static void main(String[] args)  {
  try {
    dec(5);
  } catch (Exception e) {
    e.printStackTrace();
  }
}
```
]
]
]

.compact[
```bash
java.lang.Exception: surprise!
	at it.units.erallab.hmsrobots.objects.Robot.dec(Test.java:185)
	at it.units.erallab.hmsrobots.objects.Robot.dec(Test.java:185)
	at it.units.erallab.hmsrobots.objects.Robot.dec(Test.java:185)
	at it.units.erallab.hmsrobots.objects.Robot.dec(Test.java:185)
	at it.units.erallab.hmsrobots.objects.Robot.dec(Test.java:185)
	at it.units.erallab.hmsrobots.objects.Robot.dec(Test.java:185)
	at it.units.erallab.hmsrobots.objects.Robot.main(Test.java:191)
```
]

Shows method, source code file, and source code line of the statement in which the flow switched to anomalous
- i.e., where `throw` is, when not a JVM thrown throwable

---

## Errors in Java

Language:
- what is error in Java?
  - `Throwable`, `Error`, `Exception`, `RuntimeException`
- how to define the normal and anomalous flow?
  - `try`-`catch`-`finally`
- how to switch to anomalous flow?
  - `throw`

Design:
- when to handle an error? (and when to propagate?)
- how to handle an error?
- when to "create" an error?

---

## How to design with exceptions

Design:
- when to handle an error? (and when to propagate?)
- how to handle an error?
- when to "create" an error?

No, one-fits-all answers.
- some basic good practice guidelines
- many finer guidelines

---

## Handle or propagate?

**When to handle an error?**  
I.e., an exception of type $E$ in a method $m$.

Key idea:
- if the developer of $m$ knows how to handle the anomalous condition related to $E$, she/he should handle it!

E.g.: `String getWebPageTitleIfAny(String url)`, with `MalformedURLException`
- bad URL? no page, no title (`IfAny`): catch and return `""`

E.g.: `Configuration loadFromFile(String fileName)` with `FileNotFoundException`
- no file? I don't know what `Configuration` to return: propagate

---

## Design by contract

A **methodology** for software design: here just in a nutshell.

For each method define:
- **preconditions** met by input
  - responsability of the caller (input)
- **postconditions** met by output
  - responsability of the called (output)

Then, the method should return abruptly in anomalous state (i.e., throw or propagate an exception, in Java) **if and only if**:
- preconditions are not met
- postconditions cannot be met despite preconditions being met
  - "cannot" means for serious unsolvable problems

.note[Some IDEs help the developer in adopting this methodology.]

---

## How to handle? When to throw?

**How to handle an error?**
- in the way you know to handle it to meet postconditions

**When to "create" an error?**  
(beyond propagation)
- when preconditions are not met
- when postcondition cannot

.compact[
```java
public String getLastName(String fullName) throws MalformedNameException {
  String[] pieces = fullName.split(" ");
  if (pieces.length == 0) {
    throw new MalformedNameException("Empty name!");
  }
  return pieces[pieces.length-1];
}
```
]

---

## Creation vs. propagation

Good practice (in general): **hide inner implementation**

If component/library/sofware $S$ finds an exception $E'$ related to specific component/library/sofware $S'$ used in $S$, it should not propagate it, but should instead create a new exception $E$ related to $S$.

Code using $S$ should not be needed to know $S'$.


---

## Common mistake: fake handling

**Never** catch without handling (just to make the code compile)!

```java
try {
  doRiskyThing();
} catch (BadThingHappenedException e) {
  // ignore
}
```

Never means never:
- "I put an empty catch, I'll fix it later"
  - forgot, huge problems found much later, hardly
  - common when working with `Thread`s

If you don't know how to handle, you shouldn't catch.
- If you **need** to catch it, put, at least, a `e.printStackTrace()`.


---

## `Thread`s and missed handling

`run()` cannot be redefined with a `throws` clause:  
$\Rightarrow$ every exception has to be handled
  - even if you don't know how

If no methods handles the exception (e.g., `NullPointerException`), the **thread** is interrupted:
  - if the main thread, the application stops
  - otherwise, just the thread **silently** stops

---

## Common mistake: lazy catch all

.cols[
.c50[
.compact[
```java
try {
  doRiskyThing();
} catch (Exception e) {
  /* handling code for both */
}
```
]
]
.c50[
.compact[
```java
public void doRiskyThing()
    throws BadFooException, BadBarException {
  /* ... */
}
```
]
]
]

The (lazy) developer handles `BadFooException` and `BadBarException` in the same way.
- but the `catch` block might be executed also in other conditions, e.g., `NullPointerException`

Correct way:
.compact[
```java
try {
  doRiskyThing();
} catch (BadFooException e) {
  /* handling code for foo */
} catch (BadBarException e) {
  /* handling code for bar */
}
```
]

---

### Multicatch

From Java 7, lazyness is no more a motivation:
```java
try {
  doRiskyThing();
} catch (BadFooException|BadBarException e) {
  /* handling code for both */
}
```
At compile-time, `e` is of the most specific supertype of both `BadFooException` and `BadBarException`.

Just a shorthand.

---

## Summarizing

It's a matter of responsability:
- if preconditions are met and postconditions can be met, it's **called responsability** $\rightarrow$ handle
- if preconditions are not met, it's **caller responsability** $\rightarrow$ propagate
- if called cannot meet postconditions, for serious problems beyond its responsability $\rightarrow$ propagate

In practice:
- always log, if forced to handle
- hide internals

---

class:middle, center

### Exceptions and OS resources

---

## OS resources

Premise 1: typical workflow
1. **open**: "OS, prepare to let me use that resource"
2. **use**: "OS, do this thing on that resource"
3. **close**: "OS, I've done"

Premise 2: anomalous outcome
- any operation on OS resources (in particular open and use) may end abruptly
  - JDK components reflect this by throwing exceptions (e.g., streams)

---

## Closing

**Close** on OSs resource is remarkably **important**!

Most OSs release resources automatically when a process terminate.

They **do not** release resources when the process is running.  
$\Rightarrow$ a long-running process has the **responsability** or closing its resources.
- if it "forgets" to, eventually the OS will kill the process
  - "eventually" might mean after hours, days, months of execution: hardly predictable

---

## Always close!

.important.center[
  Always close!
]

"Always" means also in anomalous flow!

---

## Closing with exception: suboptimal solution

.cols[
.c50[
```java
try {
  Resource r = open();
  r.use();
  r.close();
} catch (AException e) {
  log(e);
  r.close();
} catch (BException e) {
  log(e);
  r.close();
}
```
]
.c50[
Problems:
- what if `ExceptionC` is thrown (e.g., `NullPointerException`)?
- `r` is not defined in `catch` blocks
- (minor) `close` code repeated 3 times
]
]

.note[`open()`, `use()`, `close()` are not actual method invokations; they are placeholders.]

---

## Better: closing in `finally`

.cols[
.c50[
```java
Resource r;
try {
  r = open();
  r.use();
} catch (AException e) {
  log(e);
} catch (BException e) {
  log(e);
} finally {
  r.close();
}
```
]
.c50[
Nice: `finally` block is **always** (by definition) executed!

Problems:
- what if the exception is thrown in `open()`?
  - `r` is not initialized; `r.close()` will throw a `NullPointerException`!
- (minor) so verbose!
]
]

---

## Closing: the correct (but old) way

.cols[
.c50[
```java
Resource r;
try {
  r = open();
  r.use();  
} catch (AException e) {
  log(e);
} catch (BException e) {
  log(e);
} finally {
  if (r != null) {
    r.close();
  }
}
```
]
.c50[
Ok, but still verbose...
]
]

---

## The new correct way

.cols[
.c50[
```java
try `(Resource r = open())` {
  r.use();  
} catch (AException e) {
  log(e);
} catch (BException e) {
  log(e);
}
```

**`try`-with-resources**
- since Java 7.
]
.c50[
`try` gets a declaration argument where one or more resources are:
- declared (`Resource r`)
- and instantiated (`r = open()`)

When exiting the `try` block, `r` is closed (if not null):
- before entering the `catch` block, if any
  - sort of anticipated `finally`
- without affecting the normal/anomalous state
]
]

---

### Multiple resources

```java
byte[] data = new byte[100];
try (
    FileInputStream fis = new FileInputStream(inputFile)`;`
    FileOutputStream fos = new FileOutputStream(outputFile)
) {
  while (true) {
    int nOfReadBytes = fis.read(data);
    if (nOfReadBytes == -1) {
      break;
    }
    fos.write(data, 0, nOfReadBytes);
  }
} catch (IOException e) {
  System.err.printf("Cannot copy due to %s", e);
}
```

Resources are closed in the reversed order they were opened.

---

### Without `catch`

.compact[
```java
public void log(String msg, String filePath) `throws IOException` {
  try (BufferedWriter bw = new BufferedWriter(new FileWriter(filePath))) {
    bw.append(msg + System.lineSeparator());
  }
}
```
]

The `BufferedWriter` is always closed, but exceptions are not handled (here):
- the compiler requires to handle or add the `throws` clause
- normal/anomalous state is not affected

---

## What is a resource?

Every class that implements the `AutoCloseable` interface.

(We still do not know interfaces, but...)  
In practice, every class with a `close()` method.
- all the I/O classes: streams, `Reader`s, `Writer`s, ...

---

### `AutoCloseable`

<iframe width="100%" height="500" src="https://docs.oracle.com/javase/8/docs/api/java/lang/AutoCloseable.html"></iframe>

---

class: middle, center

### Robust servers

---

## Goal

Protocol (upon connection):
- client sends one text line $l$
- if $l=l_\text{quit}$, server closes connection, otherwise replies with processed line $l'=p(l)$

Server:
- listens on port $n_\text{port}$
- handles many client at a time
- **never terminates** (really!)
  - **bad things can happen**: e.g., client closes the connection
  - correctly releases OS resources
- designed to be extended
- $p:$ `String` $\to$ `String`, $l_\text{quit}$, port number are parameters

---

## `RobustLineProcessingServer`

.compact[
```java
public class RobustLineProcessingServer `extends LineProcessingServer` {

  public RobustLineProcessingServer(int port, String quitCommand) {
    super(port, quitCommand);
  }

  public void run() throws IOException { /* ... */  }

}
```
]

- `extends LineProcessingServer`
  - inherits fields (make `protected` in superclass)
  - inherits `process()` and `getQuitCommand()`

---

### `run()`

.compact[
```java
public void run() `throws IOException` {
  try (ServerSocket serverSocket = new ServerSocket(port)) {
    while (true) {
      Socket socket;
      try {
        socket = serverSocket.accept();
        ClientHandler clientHandler = new `RobustClientHandler`(socket, this);
        clientHandler.start();
      } `catch (IOException e)` {
        System.err.printf("Cannot accept connection due to %s", e);
      }
    }
  }
}
```
]

- Constructor `ServerSocket()` may throw an `IOException`, but we do not know how to manage it (cannot meet postcondition "stay alive"):  
$\Rightarrow$ propagate
- `accept()` may throw an `IOException`: server still need to stay alive:
$\Rightarrow$ handle
  - nothing special, unfortunate client, just log
  - no `try`-with-resources: `close()` will be managed by `ClientHandler`

---

## `RobustClientHandler`

.compact[
```java
public class RobustClientHandler extends ClientHandler {

  public RobustClientHandler(Socket socket, `LineProcessingServer lineProcessingServer`) {
    super(socket, lineProcessingServer);
  }

  public void run() { /* ... */  }

}
```
]

- `extends ClientHandler`
- does not need to know that the server is the robust version
  - inheritance

---

### `run()`

.compact[
```java
public void run() {
  try (`socket`) {
    BufferedReader br = new BufferedReader(new InputStreamReader(socket.getInputStream()));
    BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(socket.getOutputStream()));
    while (true) {
      String line = br.readLine();
      if (`line == null`) {
        System.err.println("Client abruptly closed connection");
        break;
      }
      if (line.equals(lineProcessingServer.getQuitCommand())) {
        break;
      }
      bw.write(lineProcessingServer.process(line) + System.lineSeparator());
      bw.flush();
    }
  } catch (IOException e) {
    System.err.printf("IO error: %s", e);
  }
}
```
]

- `readLine()` returns null if EOS reached, that happens when the client closes the connection
  - `line.equals()` would have thrown a `NullPointerException` .question[what if not handled?]
- `try (socket)`: possible since Java 9

---

## `IOException` and network

.compact[
```java
public void run() {
  try (socket) {
    BufferedReader br = new BufferedReader(new InputStreamReader(socket.getInputStream()));
    BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(socket.getOutputStream()));
    while (true) {
      String line = `br.readLine()`;
      if (line == null) {
        System.err.println("Client abruptly closed connection");
        break;
      }
      if (line.equals(lineProcessingServer.getQuitCommand())) {
        break;
      }
      `bw.write(lineProcessingServer.process(line) + System.lineSeparator())`;
      `bw.flush()`;
    }
  } catch (IOException e) {
    System.err.printf("IO error: %s", e);
  }
}
```
]

Suppose we get an `IOException` at $n+1$-th `readLine()`:
- has the last $n$-th **message** arrived?
- have all the previous $1, \dots, n$ messages arrived?

---

## TCP guarantees

TCP guarantees that:
- every byte sent on one endpoint reaches the other endpoint
- bytes arrive with the same order they have been sent
- no duplication

... if no problems occur.

Otherwise, OS notifies the application (here, the JVM) that TCP failed.

---

## Message-oriented protocol

Client $C$: write request, read response.  
Server $S$: read request, write response.

Iteration in detail:
.cols[
.c50[
- write request (1)
  - $C \rightarrow \text{OS}_C$
  - $\text{OS}_C \rightarrow \text{device}_C$
  - $\text{device}_C \rightarrow \text{device}_S$
  - $\text{device}_S \rightarrow \text{OS}_S$
- read request (2)
  - $\text{OS}_S \rightarrow S$
]
.c50[
- write response (3)
  - $S \rightarrow \text{OS}_C$
  - $\text{OS}_S \rightarrow \text{device}_S$
  - $\text{device}_S \rightarrow \text{device}_C$
  - $\text{device}_C \rightarrow \text{OS}_C$
- read response (4)
  - $\text{OS}_C \rightarrow C$
]
]

---

### Exception in `readLine()`

.cols[
.c50[
- write request (1)
  - $C \rightarrow \text{OS}_C$
  - $\text{OS}_C \rightarrow \text{device}_C$
  - $\text{device}_C \rightarrow \text{device}_S$
  - $\text{device}_S \rightarrow \text{OS}_S$
- read request (2)
  - $\text{OS}_S \rightarrow S$ `IOException`!
]
.c50[
- write response (3)
  - $S \rightarrow \text{OS}_S$ (last ok call)
  - $\text{OS}_S \rightarrow \text{device}_S$
  - $\text{device}_S \rightarrow \text{device}_C$
  - $\text{device}_C \rightarrow \text{OS}_C$
- read response (4)
  - $\text{OS}_C \rightarrow C$
]
]

$C$ never sends a request before consuming a response: hence if `readLine()` worked with the $n$-th request, $C$ received the $n-1$-th response.
- **not possible** to say when, where, who (client, network) failed after that
- $n$-th response **might have arrived or not**

---

## Even worse!

Pipelined message-oriented protocol:

Client $C$: write $k$ requests, read $k$ responses.  
Server $S$: read $h$ requests, write $h$ responses.

---

## How to manage?

It depends on the application.

Request examples:
1. "show my balance"
2. "buy a new pots and pans set"
3. "new hearth available"

For 1, $C$ can simply send again the request.  
For 2 and 3, much harder.

<!-- say about pipelined
mention examples -->
