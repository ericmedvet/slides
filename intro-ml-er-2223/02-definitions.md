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

.note[we want the computer to learn $f$ **and use it**, not just learn it]

---

## Prediction

$f$ is often denoted as $f\_\\text{predict}$ since, given an $x$, **predicts** a $y$
- when used in practice, i.e., in the **prediction phase**, $f\_\\text{predict}$ guesses about an unknown, real $\\hat{y}$


---

## $f$ for a computer

Computers execute instructions grouped in programs and expressed according to some language.  
$f$ is the mathematical, abstract notation for **a computer program** that, when executed on an input $x \\in X$ , outputs a $y \\in Y$.

.cols[
.c40[
Mathematical notation:

$$X = \\mathbb{R}^2$$
$$Y = \\mathbb{R}$$
$$f: \\mathbb{R}^2 \\to \\mathbb{R}$$
$$f(\\vect{x}) = f((x\_1,x\_2)) = \\left\\lvert\\frac{x\_1-x\_2}{x\_1}\\right\\rvert$$

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

## Further point of view

**Abstract** definition:
- just domain and codomain, not how the function works

.cols[
.c30[
$$f: \\mathbb{R}^2 \\to \\mathbb{R}$$
]
.c30[
```java
double f(double[] xs)
```
]
.c40[
.diagram.center[
link([0,25,100,25],'a')
rect(100,0,100,50)
link([200,25,310,25],'a')
otext(50,10,'$\\\\vect{x} \\\\in \\\\mathbb{R}^2$')
otext(250,10,'$y \\\\in \\\\mathbb{R}$')
otext(150,25,'$f$')
]
]
]

**Concrete** definition:
- domain, codomain, and how the function works

.cols[
.c30[
$$f: \\mathbb{R}^2 \\to \\mathbb{R}$$
$$\\begin{align\*}
  y &= f(\\vect{x}) \\\\
    &=f((x\_1,x\_2)) \\\\
    &=x_1+x_2
\\end{align\*}$$
]
.c30[
```java
double f(double[] xs) {
  return xs[0] + xs[1];
}
```
]
.c40[
.diagram.center[
link([0,25,100,25],'a')
rect(100,0,100,50)
link([200,25,310,25],'a')
otext(50,10,'$\\\\vect{x} \\\\in \\\\mathbb{R}^2$')
otext(250,10,'$y \\\\in \\\\mathbb{R}$')
otext(150,25,'$x_1+x_2$')
]
]
]

---

## Writing $f$

Usually, computer programs are written by humans, but here:
> .key[Machine Learning] is the science of getting computers to learn $f\_\\text{predict}: X \\to Y$ without being explicitly programmed.

*without being explicitly programmed* means that $f\_\\text{predict}$ is **not written by a human**!

It appears verbose, let's get rid of it.

--

New version:  
> .key[Machine Learning] is the science of getting computers to learn $f\_\\text{predict}: X \\to Y$ **autonomously**.

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
2. choose one $f \\in \\mathcal{F}\_{X,Y}$ that does what expected

---

## Desired behavior of $f$

1. consider $\\mathcal{F}\_{X,Y} = \\{f, f: X \\to Y\\}$
2. choose one $f \\in \\mathcal{F}\_{X,Y}$ **that does what expected**

Step 2 is fundamental in practice
  - "find a program that, given a string, returns a number" wouldn't make sense alone!

... but it is hard to be further formalized in general.

There has to be some **supervision** facilitating the search for a good $f$.

---

## Supervised learning

When the supervision is in the form of some **examples** (observation $\\rightarrow$ response) and the learned $f\_\\text{predict}$ should *process them correctly*.
- example: "if I give you this *observation* $x$, you should *predict* this *response* $y$"

New version:  
> .key[Supervised (Machine) Learning] is the science of getting computers to learn $f\_\\text{predict}: X \\to Y$ **from examples** autonomously.

--

In **unsupervised learning** there is no supervision, there are **no examples**:
- nevertheless, there is some implicit expectation about how to process $x$
- we'll discuss unsupervised learning later

---

## Examples

Formally, examples available for learning $f\_\\text{predict}$ are pairs $(x,y)$.

A .key[dataset] compatible with $X$ and $Y$ is a *bag* of pairs $(x,y)$:
$$D = \\{(x\_i,y\_i)\\}\_{i=1}^{i=n}$$
with $\\forall i: x\_i \\in X, y\_i \\in Y$ and $|D|=n$.

Or, more briefly $D = \\{(x\_i,y\_i)\\}\_i$.
.note[examples are also denoted by $(x^{(i)},y^{(i)})$, depending on the community]

A **bag** ($D$ should be called *databag*...):
- can have duplicates (bag $\\ne$ set)
- it does not imply any order among its elements (bag $\\ne$ sequence)

.note[In most algorithms, and their program counterparts, dataset are actually processed sequentially, though]

---

## Learning set

A .key[learning set] is a dataset that is used for learning an $f\_\\text{predict}$.
- may be denoted by $D\_\\text{learn}$ .note[or $L$, or $T$, for *training* set]

The learning set has to be **consistent** with the domain and codomain of the function $f\_\\text{predict}$ to be learned:
- if $f\_\\text{predict} \\in \\mathcal{F}\_{X,Y}$, then $D\_\\text{learn} \\in \\mathcal{P}^\*(X \\times Y)$
  - $X \\times Y$ is the Cartesian product of $X$ and $Y$, i.e., the set of all possible $(x,y)$ pairs
  - $\\mathcal{P}(A)$ is the powerset of $A$, i.e., the set of all the possible subsets of $A$
  - $\\mathcal{P}^\*(A)$ is a *custom notation* for the powerset with duplicates

---

## Learning technique

> .key[Supervised (Machine) Learning] is the science of getting computers to learn $f\_\\text{predict}: X \\to Y$ **from examples** autonomously.

In brief: given a $D \in \\mathcal{P}^\*(X \\times Y)$, learn a $f \\in \\mathcal{F}\_{X,Y}$.

--

A .key[supervised learning technique] is a way for learning a $f \\in \\mathcal{F}\_{X,Y}$ given a $D \in \\mathcal{P}^\*(X \\times Y)$.

.cols[
.c50[
$$f\_\\text{learn}: \\mathcal{P}^\*(X \\times Y) \\to \\mathcal{F}\_{X,Y}$$
$$f\_\\text{predict} = f\_\\text{learn}\\left(D\_\\text{learn}\\right)$$
]
.c50[
.diagram.center[
link([0,25,100,25],'a')
rect(100,0,100,50)
link([200,25,310,25],'a')
otext(150,25,'$f\_\\\\text{learn}$')
otext(50,10,'$D\_\\\\text{learn}$')
otext(250,10,'$f\_\\\\text{predict}$')
]

]
]

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

## Who?

> .key[Supervised (Machine) Learning] is the science of getting computers to learn $f\_\\text{predict}: X \\to Y$ **from examples** autonomously.

*getting computer*: **who is doing that?**
- the **user** of a learning technique, who is likely the designer/developer of a **ML system**

--

*is the science*: **what's science?**
- there's not only the user: someone designs/develops learning techniques

New version:
> .key[Supervised (Machine) Learning] is about designing and applying supervised learning techniques.

---

## Learning as optimization

A supervised learning technique $f\_\\text{learn}: \\mathcal{P}^\*(X \\times Y) \\to \\mathcal{F}\_{X,Y}$ can be seen as a form of optimization:
1. consider $\\mathcal{F}\_{X,Y} = \\{f, f: X \\to Y\\}$
2. find the one $f \\in \\mathcal{F}\_{X,Y}$ that **works best** on $D\_\\text{learn}$

Could we use a general optimization technique?  
In principle, yes, but:
- $X$ (and maybe $Y$) might be infinite (e.g., $X=\\mathbb{R}^p$)
- $X \\times Y$ is "more" infinite
- $\\mathcal{F}\_{X,Y}$ is "hugely more" infinite

--

Practical solution: reduce $\\mathcal{F}\_{X,Y}$ size by considering only the $f$ of some nature:
- e.g., for $X=Y=\\mathbb{R}$, consider $\\mathcal{F}'\_{X,Y} = \\{f: f(x)=ax+b \\text{ with } a,b \\in \\mathbb{R}\\}$
- e.g., for $x$ a UTF-8 strings and $y$ a Boolean, consider the $f$ as regular expressions

---

## Templating $f$

Often a learning technique works on a reduced $\\mathcal{F}'\_{X,Y}$ which is based on an **template** $f'$:
- most parts of $f'$ are **defined**, some parts are **undefined**, variable
- $f'$ can be used for prediction only if the undefined parts are defined

E.g., for $X=Y=\\mathbb{R}$, $f'(x)=ax+b$:
- you need concrete values for $a,b$ in order to apply $f$ to an $x$, i.e., to obtain a response $y$ out of an $x$
- this is *univariate linear regression*: .note[we'll expand]
  - *univariate* because $X$ has one dimension
  - *regression* because $Y=\\mathbb{R}$
  - *linear* because of the template

---

## Model

We can make explicit the undefined part of the template:
$$f\_\\text{predict}(x) = f'\_\\text{predict}(x, m)$$
where $m \\in M$ is the undefined part.
- e.g., $f'\_\\text{predict}(x, a, b) = ax+b$ and $M=\\mathbb{R}^2$

Note that $f'\_\\text{predict}$ is fixed for a given learning technique and defines the reduced $\\mathcal{F}'\_{X,Y} \\subset \\mathcal{F}\_{X,Y}$ where the learning will look for an $f\_\\text{predict}$.

--

Given a template $f'\_\\text{predict}$, $m$ defines a $f\_\\text{predict}$ that can be used to predict a $y$ from a $x$.  
That is, $m$ is a .key[model] of how $y$ depends on $x$.

---

## Learning a model

For techniques based on a template, $f\_\\text{learn}$ actually looks just $\\mathcal{F}'\_{X,Y}$, hence in $M$, for finding a $f\_\\text{predict}$.

.cols[
.c50[
General case:
$$f\_\\text{learn}: \\mathcal{P}^\*(X \\times Y) \\to \\mathcal{F}\_{X,Y}$$
$$f\_\\text{predict}: X \\to Y$$

The learning technique **is defined by** $f\_\\text{learn}$.


.diagram.center[
link([0,25,100,25],'a')
rect(100,0,100,50)
link([200,25,310,25],'a')
otext(150,25,'$f\_\\\\text{learn}$')
otext(50,10,'$D$')
otext(250,10,'$f$')
]
]
.c50[
With template:
$$f'\_\\text{learn}: \\mathcal{P}^\*(X \\times Y) \\to M$$
$$f'\_\\text{predict}: X \\times M \\to Y$$

The learning technique **is defined by** $f'\_\\text{learn}, f'\_\\text{predict}$.

.diagram.center[
link([0,25,100,25],'a')
rect(100,0,100,50)
link([200,25,310,25],'a')
otext(150,25,"$f'\_\\\\text{learn}$")
otext(50,10,'$D$')
otext(250,10,'$m$')
link([0,125,100,125],'a')
rect(100,100,100,50)
link([200,125,310,125],'a')
otext(150,125,"$f'\_\\\\text{predict}$")
otext(50,110,'$x, m$')
otext(250,110,'$y$')
]

]
]

---

## Alternative views

The model is **learned** on a dataset $D$.
- learned from the examples in $D$

The model is **trained** on a dataset $D$.
- trained to correctly work on the examples in $D$

The model is **fitted** on a dataset $D$.
- adjusted until it works well on the examples in $D$


---

common cases for M, X and Y (need for comparison)
what if X is not a common case?
ml system vs learning technique
activities of the ml practitioner (need for comparison)
activities of the ml researcher

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
