class: middle, center

## Write your first class
### (and some other key concept)

---

## Goal

Write an application that, given a word $w$ and a number $n$, gives $n$ anagrams of $w$.

---

### Natural language and specification

"Write an application that, given a word $w$ and a number $n$, gives $n$ anagrams of $w$."

Natural language is ambiguous: this description leaves a lot of choices (and hence **responsability**) to the designer/developer:
- "an application": for which platform? are there technological constraints? (tech)
- "given": how? command line? file? standard input? (tech)
- "a word $w$": what is a word? (domain)
- "a number $n$": which kind of number? natural or real? (domain)
- "anagrams": what is an anagram? (domain)
- "$n$ anagrams": what if there are no enough anagrams? which ones, if more than $n$? (domain)

**It's up to you to take these decisions!**

---

### More precise goal

In this particular case:
- a Java application, i.e., a class with a `main()`
- $w$ via standard input, $n$ via command line (customer)
- a word is a non-empty sequence of word characters (regex `[A-Za-z]+`)
- $n$ is natural
- anagram:
  - in general "a word or phrase formed by rearranging the letters of a different word or phrase" (from [Wikipedia](https://en.wikipedia.org/wiki/Anagram))
  - here (customer): [permutation with repetitions](https://en.wikipedia.org/wiki/Permutation#Permutations_with_repetition)
- show up to $n$, whichever you prefer

---

class: center, middle

## Basic building blocks
### for achieving the goal

---

## Execution flow control

Usual constructs available:
- `if` `then` `else`
- `while`
- `for`*
- `switch`*
- `break`
- `continue`
- `return`

I assume you know them!

.note[\*: with enhanced syntax that we will see later]

---

## Basic I/O

Where:
- input from standard input (aka stdin, typically, "the keyboard")
- output to standard output (aka stdout)

Of what:
- `String`
- primitive types

.note[We'll see later how to do I/O of other things to/from other places]

---

## Output to standard output

Use `System.out`, static field `out` of class `java.lang.System`: it's of class `java.io.PrintStream`
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

The same for `print()`, that does not terminate the line.

.note[And a very practical `printf()`, that we'll discuss later]

---

## Input from stdin with `BufferedReader`

```java
BufferedReader reader = new BufferedReader(
  new InputStreamReader(System.in)
);
/* ... */
String line = reader.readLine();
```

- `readLine()` reads one line at once
  - Java takes care of using the proper line termination criterion (`\n` or `\r\n`) depending on the host OS .question[how does it know?]
- directly reads only strings
- requires adding `throws Exception` after the `()` in the signature of `main`
  - we ignore why, for now

---

## Input from stdin with `Scanner`

```java
Scanner scanner = new Scanner(System.in);
/* ... */
String s = scanner.next();
int n = scanner.nextInt();
double d = scanner.nextDouble();
```

- `next()`, `nextInt()`, ... do three things:
  1. reads one line from the `InputStream` it's built on
  2. splits the line in tokens (sep = `" "`)
  3. converts and returns the first token of proper type
- if the line "has" >1 tokens, they are consumed in subsequent calls of `next*()`

---

## `String` to primitive type

Here, useful if you use `BufferedReader` for input.

```java
String line = reader.readLine();
int n = Integer.parseInt(line);
```

Class [`Integer`](https://docs.oracle.com/en/java/javase/13/docs/api/java.base/java/lang/Integer.html)
.javadoc.methods[
| Modif. and type | Field | Description |
| --- | --- | --- |
| static int | parseInt​(String s) | Parses the string argument as a signed decimal integer. |
]

Similar for other primitive types:
- `Float.parseFloat(String)`
- `Double.parseDouble(String)`
- ...

---

## Arrays

Array: fixed-length **sequence** of objects of the **same type**
- each object is accessed with the operator `[]` applied to the reference to the array
- 0-based indexing

```java
String[] firstNames;
String[] lastNames = new String[3];
lastNames[1] = new String("Medvet");
```

- Creates a reference `firstNames` to `String[]`; does not create the array; does not create the elements
- Creates a reference `lastNames` to `String[]`; create an array of 3 elements; does not create the elements
- Creates a `String` and makes `lastNames[1]` (2nd in the array) reference it

---

### Diagram

```java
String[] firstNames;
String[] lastNames = new String[3];
lastNames[1] = new String("Medvet");
```

.center.diagram[
<svg width="550" height="300" role="img">
<circle cx="75" cy="40" r="10"/>
<text x="75" y="20">firstNames</text>
<circle cx="75" cy="180" r="10"/>
<text x="75" y="160">lastNames</text>
<rect x="150" y="160" width="150" height="60"/>
<text x="225" y="150">String[]</text>
<circle cx="200" cy="200" r="10"/>
<text x="200" y="180">0</text>
<circle cx="225" cy="200" r="10"/>
<text x="225" y="180">1</text>
<circle cx="250" cy="200" r="10"/>
<text x="250" y="180">2</text>
<rect x="350" y="160" width="150" height="40"/>
<text x="425" y="150">String</text>
<text x="425" y="180">"Medvet"</text>
<polyline points="75,180 150,180"/>
<polyline points="225,200 225,250 325,250 325,180 350,180"/>
</svg>
]

---

### Conventions

Name of arrays (i.e., identfiers of references to arrays):
- plural form of the corresponding reference
  - `Person[] persons`, `Person[] employees`, ...

Definition:
- `Person persons[]` is the same of `Person[] persons`, but the former **is much better**:
  - it makes evident that the **type** is an array, rather than the identifier

---

## Array creation

```java
String[] dogNames = {"Simba", "Gass"};
//same of new String[]{"Simba", "Gass"}
```
is the same of
```java
String[] dogNames = new String[2];
dogNames[0] = "Simba"; //same of = new String("Simba");
dogNames[1] = "Gass";
```

---

## Array lenght

The type array has a field `length` of type `int` that contains the array size:
- never changes for the a given array
- cannot be written

```java
String[] dogNames = {"Simba", "Gass"};
System.out.println(`dogNames.length`); //prints 2
dogNames = new String[3];
System.out.println(`dogNames.length`); //prints 3
```

`dogNames.length = 5;` does not compile!

---

## Iterating over array elements

"Traditional" `for` syntax:
```java
String[] dogNames = {"Simba", "Gass"};
for (int i = 0; i<dogNames.length; i++) {
  System.out.println("Dog " + i + " name is " + dogNames[i]);
}
```

Enhanced `for` (or for-each) syntax:
```java
String[] dogNames = {"Simba", "Gass"};
for (`String dogName : dogNames`) {
  System.out.println("A dog name is " + dogNames[i]);
}
```
- the index is not available inside the loop
- can be applied to other types too (we'll see)

---

## Command line arguments

Available as content of `main` only arguments:
```java
public class ArgLister {
  public static void main(String[] args) {
    for (String arg : args) {
      System.out.println("Arg: " + arg);
    }
  }
}
```

```bash
eric@cpu:~$ java ArgLister Hello World
Hello
World
```
.note[Possible limitations and syntax variations depending on the host OS]

---

### Diagram

```java
public class ArgLister {
  public static void main(String[] args) {
    for (String arg : args) {
      System.out.println("Arg: " + arg);
    }
  }
}
```

`java` prepares `args` before invoking `main()`

At the beginning of `main()` after `java ArgLister Hello World`
.question[What inside the 1st and 2nd iteration of the `for` loop?]

.center.diagram[
<svg width="650" height="250" role="img">
<circle cx="75" cy="50" r="10"/>
<text x="75" y="30">args</text>
<rect x="150" y="30" width="150" height="60"/>
<text x="225" y="20">String[]</text>
<circle cx="200" cy="70" r="10"/>
<text x="200" y="50">0</text>
<circle cx="225" cy="70" r="10"/>
<text x="225" y="50">1</text>
<rect x="350" y="30" width="120" height="40"/>
<text x="410" y="20">String</text>
<text x="410" y="50">"Hello"</text>
<rect x="520" y="30" width="120" height="40"/>
<text x="580" y="20">String</text>
<text x="580" y="50">"World"</text>
<polyline points="75,50 150,50"/>
<polyline points="200,70 200,120 325,120 325,50 350,50"/>
<polyline points="225,70 225,100 495,100 495,50 520,50"/>
</svg>
]

---

## Operating with `String`s
