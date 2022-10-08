class: middle, center

# Assessing supervised ML

---

## What to assess?

**Subject** of the assessment:
- a ML system (all components)
- a supervised learning technique ($f\_\\text{learn}$ and $f\_\\text{predict}$)
- a model ($m$ used in a $f'\_\\text{predict}$)

---

## Axes of assessment

Assume something is assessed with respect to a given **goal**:
- .key[Effectiveness]: to which degree is the goal achieved?
  - goal poorly achieved $\\rightarrow$ low effectiveness 😢
  - goal completely achieved $\\rightarrow$ high effectiveness 😁
- .key[Efficiency]: how much resourses are consumed for achieving the goal? .note[to some degree]
  - large amount of resources $\\rightarrow$ low efficiency 	😢
  - small amount of resources $\\rightarrow$ high efficiency 😁
- .key[Interpretability] (or .key[explainability]): to which degree the way the goal is achieved (or not achieved) is explainable?
  - poorly explainable $\\rightarrow$ low interpretability 	😢
  - fully explainable $\\rightarrow$ high interpretability 😁

---

## Purposes of assessment

Given an axis $a$ of assessment:
- absolute assessment: does something meet the expectation in terms of $a$?
  - is a model effective *enough*?
  - is a learning technique explainable *enough*?
  - is a ML system efficient *enough*?
- **comparison**: is one thing better than one other thing in terms of $a$?
  - is model $m_1$ more effective than model $m_2$?
  - is this learning technique more efficient than that learning technique?

"enough" represents some expectation, some minimum degree of $a$ to be reached.

--

If the outcome of assessment is a **quantity** (i.e., a number) .note[with a monotonic semantics]:
- comparison corresponds to check for $>$ or $<$
- absolute assessment corresponds to:
  - establishing a threshold and
  - check for $>$ or $<$

We want assessment to produce a number!

---

## Effectiveness and subject

A **ML system** can be seen as a composite learning technique.
It has two running modes: one in which it tunes itself, one in which it makes decisions.
ML system goals are:
- tuning properly (i.e., such that, after tuning it makes good decisions)
- making good decisions

A **supervised learning technique** is a pair $f\_\\text{learn},f\_\\text{predict}$.
Its goals are:
- learning a good $f\_\\text{predict}$, for $f\_\\text{learn}$, i.e., an $f\_\\text{predict}$ that makes good decisions
- making good decisions

A **model** has one goal:
- making good decisions (when used in an $f'\_\\text{predict}$)

--

Eventually, **effectiveness is about making good decision**!
- Ideally, we want to **measure** effectiveness with numbers.

---

## Model vs. real system

How to measure if an $f'\_\\text{predict}$ is making good decisions?

Recall: $f\_\\text{predict}$, possibly through $f'\_\\text{predict}$ and a model $m$, models the **dependency** of $y$ on $x$.

Key underlying **assumption**: $y$ depends on $x$.
That is, there **exists** some **real system** $s: X \\to Y$ that, given an $x$ produces a $y$ based on $x$:
- given some a flat $x$, an **economical system** determines the price $y$ of $x$ on the real estate market
- given two basketball teams about to play a match $x$, a **sport event** determines the outcome $y$ of $x$

Or, there exists in reality some system $s^{-1}: Y \\to X$ that, given an $y$ produces a $x$ based on $y$:
- given a seed of an Iris flower of a given species $y$, the **Nature** eventually develops $y$ in an Iris flower $x$

.cols[
.c50.center[
Model $m$
.diagram[
link([0,25,75,25],'a')
rect(75,0,150,50)
link([225,25,300,25],'a')
otext(150,25,"$f'\_\\\\text{predict}(\\\\cdot, m)$")
otext(37.5,10,'$x$')
otext(262.5,10,'$y$')
]
]
.c50.center[
Real system $s$
.diagram[
link([0,25,75,25],'a')
rect(75,0,150,50)
link([225,25,300,25],'a')
otext(150,25,"$s$")
otext(37.5,10,'$x$')
otext(262.5,10,'$y$')
]
]
]

.note[
A templated $f'\_\\text{predict}: X \\times M \\to Y$ with a fixed model $m$ is a $f\_\\text{predict}: X \\to Y$.
]

---

## Comparing $m$ and $s$

.cols[
.c50.center[
Model $m$
.diagram[
link([0,25,75,25],'a')
rect(75,0,150,50)
link([225,25,300,25],'a')
otext(150,25,"$f'\_\\\\text{predict}(\\\\cdot, m)$")
otext(37.5,10,'$x$')
otext(262.5,10,'$y$')
]
]
.c50.center[
Real system $s$
.diagram[
link([0,25,75,25],'a')
rect(75,0,150,50)
link([225,25,300,25],'a')
otext(150,25,"$s$")
otext(37.5,10,'$x$')
otext(262.5,10,'$y$')
]
]
]

How to see if the model $m$ is modeling the system $s$ well?

.cols[
.c50[
**Direct comparison**:
1. "open" $s$ and look inside
2. "open" $m$ and look inside
3. compare internals of $s$ and $m$

Issues:
- in practice, $s$ can rarely/hardly be opened
- $m$ might be hard to open
]
.c50[
**Comparison of behaviors**:
1. collect some examples $D=\\{(x^{(i)},y^{(i)})\\}\_i$ of the **behavior of $s$**
2. feed $m$ with observations $\\{(x^{(i)})\\}\_i$ obtaining $\\{(\\hat{y}^{(i)})\\}\_i$
3. compare responses $\\{(y^{(i)})\\}\_i$ and $\\{(\\hat{y}^{(i)})\\}\_i$

Ideally, we want the comparison (step 3) outcome to be a number.
]
]

---

## Comparing behaviors

Formally, given a $D$ (obtained from $s$) and an $f\_\\text{predict}: X \\to Y$, we want a:
.cols[
.c50[
$$f\_\\text{effectiveness}: \\mathcal{P}^*(X \\times Y) \\times \\mathcal{F}\_{X,Y} \\to \\mathbb{R}$$
]
.c50[
.diagram.center[
link([0,25,175,25],'a')
rect(175,0,150,50)
link([325,25,400,25],'a')
otext(250,25,"$f\\\\subtext{effectiveness}$")
otext(87.5,10,"$D,f\\\\subtext{predict}$")
otext(362.5,10,'$q$')
]
.note[
$q \\in \\mathcal{R}$ for quality
]
]
]

<!-- special case of behavior comparison -->
<!-- highlight function operating on pairs of y, put focus on just y -->

---

- limit case to supervised learning, templated technique, that is, evaluating effectiveness a model
- premise: recall model of what and introduce system to be modeled
- say we do not have tge system, but we can obtain some data (x,y pairs) about how it works
- hence simple idea: take the model, apply it to the data, measure the error; sketch f_assess_model as a block
- say we'll see a few options for binary/multiclass classification and for regression

- start with binary classification: recall all measures are taken on a pair m, D
  - discuss representativeness of D with respect to modeled system
- accuracy, classification error
- introduce positives, negatives
- table with all binary classification indexes: fpr, fnr, precision, recall, sensitivity, specificity
- why accuracy alone is not meaningful: unbalanced data

- $f(x)$ as a distribution over decision instead of decision
- how to obtain decision from distribution
  - sketch on how to make the opposite: (dirac) distribution from decision
- eer
- roc, auc
- influence of knowledge of cost of errors on choice of eval indexes

- boundaries for accuracy
- random classifier, most frequent class classifier, introduce *bayes classifier* in the context of classification: say it does errors even if perfect
- discuss bayes, its error, and their relation with $x$ with respect to the actual entity
- introduce the concept and the need for *baselines*

- multiclass case: accuracy, weighted accuracy

- from comparing models to comparing learning techs
- say: as we took many x,y pairs for assessing a model, we should take many D to assess a f_learn; sketch f_assess_learn as a block
- unseen data, data of tomorrow, D different that learning, *test dataset*
- static learn/test division
- k-fold cross validation, loocv, discusse effectiveness/efficiency trade-off

- comparing models/param values
- mean and stdev of many execs
- motivation and brief sketch statistical significance tests
