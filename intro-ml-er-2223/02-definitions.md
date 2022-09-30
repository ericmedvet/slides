class: middle, center

# Basic concepts

---

## What is Machine Learning?

.important[
.key[Machine Learning] is the science of getting computers to learn without being explicitly programmed.
]

--

A few considerations:
- defining a **field of science** is hard: science evolves, its boundaries change
- ML "comes" from **many communities**' (statistics, computer science, ...) effort: this (the use of *computers*) is just one point of view
- it captures just some "parts" of ML: we'll see

--

Let's analyze it in details:
- *is the science*: what's science?
- *getting computer*: who is doing that?
- *to learn*: to learn what? **this appears to be the key point!**
- *without being explicitly programmed*: who is not doing that?

---

## An example: spam detection

.center[![GMail screenshot with spam folder](images/spam-example.png)]

---

## Spam detection: under the hood

What the user sees:
- unwanted **emails** (*spam*) are in a separated place (the *spam folder*)
- sometimes some spam email is not put in the spam folder
- sometimes some not-spam email is put in the spam folder

--

What the web-based email **system** (a computer) does:
- whenever an email arrives, **decides** if it is spam or not
- if spam, move it to the spam folder; otherwise, leave it in the main place

In brief: **a computer is making a decision about an email**

---

## Making a decision

Let's be formal:
.cols[
.c20.vcentered[
$$y=f(x)$$
]
.c80[
- $x$: the entity about which the decision has to be made (the *email*)
- $y$: the decision (*spam or not-spam*)
- $f(\\cdot)$: applying some procedure that, given an $x$ results in a decision $y$
]
]

--

$y=f(x)$ is a **formal notation** capturing the idea that $y$ is obtained from $x$ by applying $f$ on it.  
But it is lacky about the nature of $x$ and $y$.
.cols[
.c20.vcentered[
$$f: X \\to Y$$
]
.c80[
- $X$: the set of all $x$, the **domain** of $f$ (**all** the possible *emails*)
- $Y$: the set of all $y$, the **codomain** of $f$ ($Y=\\{\\text{spam}, \\text{not-spam}\\}$)
]
]

None of the two notations says **how** $f$ works internally.

---

## $x$ and $y$ names

- $x$ is an .key[observation]
  - something that can be **observed**, right because a decision has to be made about it
- $y$ is the .key[response] (for a given $x$)
  - if you feed the decision system with an $x$, the system **responds** with an $y$

--

Alternative names:
- $x$ is an/the .key[input], $y$ is an/the .key[output]
  - $f$ as information processing system
- $x$ is a .key[data point]
  - assuming it carries some data about the underlying entity
- $x$ is an .key[instance]
  - .dict-def[/ˈɪnst(ə)ns/: an example or single occurrence of something]

Names are used interchangeably; some communities tend to prefer some names.

---

## *to learn* what?

> .key[Machine Learning] is the science of getting computers **to learn** without being explicitly programmed.

- *is the science*: what's science?
- *getting computer*: who is doing that?
- *to learn*: **to learn what?**
  - how to make a decision $y$ about an observation $x$. That is: **$f: X \\to Y$**
- *without being explicitly programmed*: who is not doing that?

--

New version:  
> .key[Machine Learning] is the science of getting computers **to learn $f: X \\to Y$** without being explicitly programmed.

--

We want the computer to learn $f$ **and use it**, not just learn it.
- rather trivial: can stay implicit
---

## $f$ for a computer

Computers execute instructions grouped in programs and expressed according to some language.  
$f$ is the mathematical, abstract notation for **a computer program** that, when executed on an input $x \\in X$ , outputs a $y \\in Y$.

.cols[
.c40[
Mathematical notation:

$X = \\mathbb{R}^2$  
$Y = \\mathbb{R}$  
$f: \\mathbb{R}^2 \\to \\mathbb{R}$  
$f(\\vect{x}) = f((x\_1,x\_2)) = \\left\\lvert\\frac{x\_1-x\_2}{x\_1}\\right\\rvert$

.note[$\\vect{x}$ is a notation for *vectors*, or, more broadly, for sequences of homogeneous elements, in place of $\\vec{x}$]
]
.c60[
Computer language:

```java
public double f(double[] xs) {
  return Math.abs((xs[0] - xs[1]) / xs[0]);
}
```

Most .note[not all, typed ones] languages make connection clear:  
`double[]` is $X$, i.e., $\\mathbb{R}^2$ .note[actually $\\mathbb{R}^p$, with $p \ge 1$]  
`double` is $Y$, i.e., $\\mathbb{R}$  
`xs` is $\\vect{x}$  
`f` is $f$: types correspond!  
no explicit counterpart for $y$
]
]

---

## Writing $f$

Usually, computer programs are written by humans, but here:
> .key[Machine Learning] is the science of getting computers to learn $f: X \\to Y$ without being explicitly programmed.

*without being explicitly programmed* means that $f$ is **not written by a human**!

It appears verbose, let's get rid of it.

--

New version:  
> .key[Machine Learning] is the science of getting computers to learn $f: X \\to Y$ **autonomously**.

---

## Finding/writing a program

Alice (computer science *instructor*) to Bob (student):  
"Please, **write a program** that, given a string, returns the number of vowel occurrences in the string"

Alternative version:  
"Please, **find a program** that, given a string, returns the number of vowel occurrences in the string"

"Find" suggests Bob to apprach the task in two steps:
1. consider the universe of **all the possible programs**
2. choose the one (or ones) that does what expected

--

In $f$ terms:
1. consider $\\mathcal{F}\_{X,Y} = \\{f, f: X \\to Y\\}$
2. choose one $f^\\star \\in \\mathcal{F}\_{X,Y}$ that does what expected

---

## Desired behavior of $f$

1. consider $\\mathcal{F}\_{X,Y} = \\{f, f: X \\to Y\\}$
2. choose one $f^\\star \\in \\mathcal{F}\_{X,Y}$ **that does what expected**

Step 2 is fundamental in practice
  - "find a program that, given a string, returns a number" wouldn't make sense alone!

... but it is hard to be further formalized in general.

There has to be some **supervision** facilitating the search for a good $f$.

---

## Supervised learning

When the supervision is in the form of some **examples** (observation $\\rightarrow$ response) and the learned $f$ should *process them correctly*.
- example: "if I give you this *observation* $x$, you should respond with this *response* $y$"

New version:  
> .key[Supervised (Machine) Learning] is the science of getting computers to learn $f: X \\to Y$ **from examples** autonomously.

--

In **unsupervised learning** there is no supervision, there are **no examples**
- nevertheless, there is some implicit expectation about how to process $x$
- we'll discuss unsupervised learning later

---

## Examples

Formally, examples available for learning $f$ are pairs $(x,y)$.

A .key[dataset] compatible with $X$ and $Y$ is a bag of pairs $(x,y)$:
$$D = \\{ (x,y): x \\in X \\land y \\in Y\\}$$
or, more briefly, $D = \\{(x,y)\_i\\}$.

A **bag** (should be called *databag*...):
- can have duplicates (bag $\\ne$ set)
- it does not imply any order among its elements (bag $\\ne$ sequence)

.note[In most algorithms, and their program counterparts, dataset are actually processed sequentially, though]

---

## Learning set

A .key[learning set] is a dataset that is used for learning an $f$.
- often denoted by $L$ .note[or $T$, for *training* set]

The learning set has to be **consistent** with the domain and codomain of the function $f$ to be learned:
- if $f \\in \\mathcal{F}\_{X,Y}$, then $L \\in \\mathcal{P}^\*(X \\times Y)=\\left\\{D=\\{ (x,y): x \\in X \\land y \\in Y\\}\\right\\}$
  - $X \\times Y$ is the Cartesian product of $X$ and $Y$, i.e., the set of all possible $(x,y)$ pairs
  - $\\mathcal{P}(A)$ is the powerset of $A$, i.e., the set of all the possible subsets of $A$
  - $\\mathcal{P}^\*(A)$ is a *custom notation* for the powerset with duplicates

---

## Learning technique

> .key[Supervised (Machine) Learning] is the science of getting computers to learn $f: X \\to Y$ **from examples** autonomously.

In brief: given a $D \in \\mathcal{P}^\*(X \\times Y)$, learn a $f \\in \\mathcal{F}\_{X,Y}$.

--

A .key[supervised learning technique] is a way for learn a $f \\in \\mathcal{F}\_{X,Y}$ given a $D \in \\mathcal{P}^\*(X \\times Y)$.

--

New version:
> .key[Supervised (Machine) Learning] is about designing, applying, and assessing supervised learning techniques.

---

## Lerning techniques

> A .key[supervised learning technique] is a way for learn a $f \\in \\mathcal{F}\_{X,Y}$ given a $D \in \\mathcal{P}^\*(X \\times Y)$.

Why don't we suffice a single learning technique?
Why are there many of them?

They differ in:
- **applicability** with respect to $X$ and/or $Y$
  - e.g., some require $X = \\mathbb{R}^p$, some require $Y = \\mathbb{R}$
- **efficiency** with respect to $|D|$
  - e.g., some are really fast for producing $f$ ($\\mathcal{O}\\left(|D|^{\\approx 0}\\right)$), some are slow ($\\mathcal{O}\\left(|D|^2\\right)$)
- **effectiveness** in terms of the quality of the learned $f$
- attributes of learned $f$
  - nature/type of $f$ (a formula, a text, a tree...)
  - interpretability of $f$

---

## Nature of $f$

Supervised learning technique:

.diagram.or.center[
ref(10,20,'$x$')
obj(40,0,60,40,'Person','')
link([20,20,40,20])
ref(80,20,'')
obj(120,0,80,40,'String','"Eric"')
link([80,20,120,20])
]

---

say does what expected is tricky: if defined explictly is explicity programming, so there has to be a coarser supervision

tell apart supervised and unsupervised learning.
say that in supervised learning coarser *supervision* is in the form of *examples* of solved x,y pairs.
say underlying assumptions that the f should apply to them correctly. introduce problem of generalization.

say looks like an optimization problem; say that F is too large, vague; say that some assumption about f is made, something that define a template of the dependency between x and y: template is mostly fixed with some variable part.
underlying assumption that actual y entity does depend on actual x entity.
say that optimizing the variable part of the template means obtaing a *model* of the dependency.

---

## Problem statement

define as a phase including one step in which one formally define X and Y

do the example of the emails

---

- other secondary objectives (cost, interpretability/explainability)

---

## Why ML?

- when to use ML?
- ML as a universal tool: plots on usage and interest


---

## Model

- focus on supervised: learning/*training* and *prediction* phases
- introduction of two functions
- *model*: of what? recall dependent variable

---

## Learning technique

- definition
- difference axes (constraints on $X$, $Y$; nature of the model; suitability to diff size of training; cost of two phases; interpretability)
- need of comparing models

---

## Constraints on $X$, $Y$

- "special" case of $X=X_1 \\times X_2 \\times \\dots X_p$
- *attribute/feature/independent variable*
- special case of $X_i = \\mathbb{R}$
- spacial cases of *classification* and *regression*

---

## Nature of the model in a nutshell

- decision rule, numerical function, black-box

---

## Learning technique vs. ML systems

- example of many steps
- eval axes of each step: further axis of familiarity with tool/technology
- potential combinatorial explosion of options
- even stronger need of comparing

---

## Phases of the ML design

0. should I use ML? recall "why using ML" above
1. supervised vs. unsupervised
2. problem statement: $X$ and $Y$
3. def of goals (qualities of model); cost of errors (relate with 0)
4. sketch of ML system
5. implementation
6. evaluation

iterate

---

## Example of Iris

say the story of the amateur botanist friend
