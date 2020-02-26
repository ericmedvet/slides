class: middle, center

# Basic concepts

---

## Hello goal!

```java
public class Greeter {
  public static void main(String[] args) {
    System.out.println("Hello World!");
  }
}
```

Goal: **deep understanding** of this code
- not just what it "does"
- but the role of every part of the code

(Take code highlighting with care!)

---

## Objects

"Things" (entities that can be manipulated in the code) are **objects**
- objects exist
- but **do not have a name**

The code manipulates objects through **references**
- references have a symbolic name, called **identifier**

Both can be created.

.important.center[
object ≠ reference
]

---

## Creating objects and references

```java
String s;
```
- creates a reference with identifier `s` of type `String`
  - briefly: reference `s`
  - a reference has always a name!
- no object is created

.cols[
<div class="mermaid fifty">
graph LR
  a[Ou] --> b
</div>
.fifty[
![Alt text](https://g.gravizo.com/svg?
digraph G {
  aize ="4,4";
  main [shape=box];
  main -> parse [weight=8];
  parse -> execute;
  main -> init [style=dotted];
  main -> cleanup;
  execute -> { make_string; printf}
  init -> make_string;
  edge [color=red];
  main -> printf [style=bold,label="100 times"];
  make_string [label="make a string"];
  node [shape=box,style=filled,color=".7 .3 1.0"];
  execute -> compare;
}
)
]
]
