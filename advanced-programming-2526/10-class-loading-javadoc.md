class:middle,center

## More on
### class loading and documentation

---

## Beyond compilation

```java
public class Main {
  public static void main(String[] args) {
    Greeter greeter = new Greeter("hi");
    greeter.greet("Eric");
  }
}
```

We know how `javac` compiled this code (`Main.java`), and what checks it performed while compiling.

How does `java` execute the corresponding `Main.class`?

---

## `.class` content

A `.class` contains:
- methods code
- constructors code
- fields name and type
- ...

When JVM starts executing `Main.class`:
- it "has" the code for `Main.main()`
- it does not "have" (initially) the code for `Greeter()`, `Greeter.greet()`

---

## Class loading on demand

The JVM needs to use a `.class` file when:
- a constructor is executed
- a method is executed (static or not)
- a field is accessed (static or not)

Whenever the JVM needs to use a `.class` file:
- it looks for it in memory
- if not present, it looks for it in the file system and loads it

Hence, a `.class` is loaded in memory at **the first time**:
- a constructor is executed
- a static method is executed (e.g., `main()`)
- a static field is accessed

---

### Example

.cols[
.c50[
.compact[
```java
public class Main {
  public static void main(String[] args) {
    Greeter greeter = new Greeter("hi");
    greeter.greet("Eric");
  }
}
```
```java
public class Greeter {
  private final String formula;
  public Greeter(String formula) {
    this.formula = formula;
  }
  public void greet(String name) {
    System.out.println(
      formula + " " + name
    );
  }
}
```
```bash
eric@cpu:~$ java Main
hi Eric
```
]
]
.c50[
Sequence of loaded classes (approximation):
1. `String.class`
2. `Object.class`
3. `Main.class`
4. `Greeter.class`
5. `System.class`
6. ...
7. `PrintStream.class`
8. ...
]
]

Recall: every constructor starts by invoking the constructor of the superclass (possibly implicitly).

---

## Consistency check

**Static** consistency:
- checked by `javac` at compile time
- is every usage of field/method/constructor legit?

**Dynamic** consistency:
- checked by `java` at runtime
- is every usage of field/method/constructor still legit?

Both are checked using `.class` files!
- while compiling `Main.java`, `javac` checks `Greeter` usages using `Greeter.class`
- while executing `Main.class`, `java` checks `Greeter` usages using `Greeter.class`

---

## `.class` content

A `.class` contains:
- methods code **and signature**
- constructors code **and signature**
- fields name and type
- ...

What if static consistency not verified?
- the compilation fails

What if dynamic consistency not verified?
- `.class` not found $\rightarrow$ `ClassNotFoundException`
- method/constructor not found in `.class` $\rightarrow$ `NoSuchMethodException`
- field not found in `.class` $\rightarrow$ `NoSuchFieldException`

---

## Autocompilation

Suppose you wrote `Main.java` and `Greeter.java`.

While compiling `Main.java` to `Main.class`, `javac` needs `Greeter.class`:
- if not found, but `Greeter.java` is found, `javac` **automatically** compiles `Greeter.java` to `Greeter.class` (and places it in the proper location)

Where does `javac` look for other `.java` files?

Where do `javac`/`java` look for `.class` files?

---

## Where are `.java` files?

`.java` files must be organized in directories corresponding to packages.

Suppose source root directory is `~/java-projects/APFinalProject/src/main/java` .note[common choice of many IDEs], then:
- `it.units.approject.Main` must be a `Main.java` in `~/java-projects/APFinalProject/src/main/java/it/units/approject`
- `it.units.approject.util.Parser` must be a `Parser.java` in `~/java-projects/APFinalProject/src/main/java/it/units/approject/util`
- ...

IDEs take care of managing proper location of all files, including sources.
.note[At least for most common cases.]

---

## Where are `.class` files?

Many options:
1. in the JDK directories (for JDK classes)
2. in the same directory of the corresponding `.java` files (old way)
3. in a directory tree equal to the `.java` one (i.e., based on packages) but rooted elsewhere (e.g., at `~/java-projects/APFinalProject/target/`) (**common easy way**)
4. in a `.jar` file placed properly

Multiple options can hold together, usually for different kind of classes:
- 3 for "this" software
- 4 for other software used by "this" software


---

## Building

Placing of `.class` is part of a complex **build process** that is managed by one or more of:
- the IDE
- **build-automation** tools (e.g., for Java, [Maven](https://en.wikipedia.org/wiki/Apache_Maven) or [Gradle](https://en.wikipedia.org/wiki/Gradle))
  - super powerful, but we'll not see them
  - do much more then automating the **building** process (that's more than just compilation)
      - manage dependencies

---

class:middle,center

## Documenting the software

---

## How to document the software?

Big question: we'll not give an answer here.

---

## Targets

1. Final users
2. Developers of other software using this software
3. Developers of this software
  - including the future you

---

## Transferring knowledge

For 2 and 3, **good code** is the first source of knowledge:
- for 2, software structure, component names
- for 3, software structure, component names, code quality

After that, knowledge can be transferred in many ways:
- examples
- wiki
- ...

In some cases, providing an API documentation (aka javadoc) may be useful.

---

## API documentation with `javadoc`

1. Write the documentation with a proper syntax directly within the `.java` files
2. Compile one or more of `java` files (with or without documentation) to a set of web documents using `javadoc`

Both steps are largely assisted by/automated with IDEs.

.note[not only syntax matter, there's [large literature](https://www.oracle.com/it/technical-resources/articles/java/javadoc-tool.html) on **how to write** a proper API doc (prose, person, ...)]

---

## `javadoc` like documentation

.compact[
```java
package it.units;

/**
 * A class for producing greeting strings with a provided formula.
 *
 */
public class Greeter {

  private final String formula;

  /**
   * Build a new greeter with the provided {@code String} as greeting formula.
   *
   * @param formula A greeting formula.
   */
  public Greeter(String formula) {
    this.formula = formula;
  }

  /**
   * Produces a greeting string with the given {@code name}.
   *
   * @param name The name to be included in the greeting string.
   * @return A {@code String} with a greeting of {@code name}
   * with the formula of this {@code Greeter}.
   */
  public String greet(String name) {
    return formula + " " + name;
  }
}
```
]

---

## Syntax

- `/**` marks the start of a javadoc comment (normal block comments start with `/*`)
- javadoc tags start with `@`
- some HTML syntax can be used
  - since JDK 23, Markdown syntax ([JEP 467](https://openjdk.org/jeps/467))
- ...
