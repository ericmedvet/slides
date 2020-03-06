class: middle, center

## Write your first class
### (and some other key concept)

---

## Goal

Write an application that, given a word $w$ and a number $n$, gives $n$ anagrams of $w$.

---

### Natural language vs. specification

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
String line = scanner.next();
int n = scanner.nextInt();
double d = scanner.nextDouble();
```

- `next()`, `nextInt()`, ... does three things:
  1. 
