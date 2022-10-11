class: middle, center

# Assessing supervised ML

---

## What to assess?

**Subject** of the assessment:
- a ML system (all components)
- a supervised learning technique ($f\\subtext{learn}$ and $f\\subtext{predict}$)
- a model ($m$ used in a $f'\\subtext{predict}$)

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
  - is model $m_1$ more effective than model $m_2$? .note[maybe obtained with same technique and different parameters]
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

A **supervised learning technique** is a pair $f\\subtext{learn},f\\subtext{predict}$.
Its goals are:
- learning a good $f\\subtext{predict}$, for $f\\subtext{learn}$, i.e., an $f\\subtext{predict}$ that makes good decisions
- making good decisions

A **model** has one goal:
- making good decisions (when used in an $f'\\subtext{predict}$)

--

Eventually, **effectiveness is about making good decision**!
- Ideally, we want to **measure** effectiveness with numbers.

---

## Model vs. real system

How to measure if an $f'\\subtext{predict}$ is making good decisions?

Recall: $f\\subtext{predict}$, possibly through $f'\\subtext{predict}$ and a model $m$, models the **dependency** of $y$ on $x$.

**Key underlying assumption**: $y$ depends on $x$.
That is, there **exists** some **real system** $s: X \\to Y$ that, given an $x$ produces a $y$ based on $x$, that is, $s \\in \\mathcal{F}\_{X \\to Y}$:
- given some a flat $x$, an **economical system** determines the price $y$ of $x$ on the real estate market
- given two basketball teams about to play a match $x$, a **sport event** determines the outcome $y$ of $x$

Or, there exists in reality some system $s^{-1}: Y \\to X$ that, given an $y$ produces a $x$ based on $y$:
- given a seed of an Iris flower of a given species $y$, the **Nature** eventually develops $y$ in an Iris flower $x$

.cols[
.c50.center[
Model $m$ (or $f\\subtext{predict}$)
.diagram[
link([0,25,75,25],'a')
rect(75,0,150,50)
link([225,25,300,25],'a')
otext(150,25,"$f'\\\\subtext{predict}(\\\\cdot, m)$")
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
A templated $f'\\subtext{predict}: X \\times M \\to Y$ with a fixed model $m$ is a $f\\subtext{predict}: X \\to Y$.
]

---

## Comparing $m$ and $s$

.cols[
.c50.center[
Model $m$ (or $f\\subtext{predict}$)
.diagram[
link([0,25,75,25],'a')
rect(75,0,150,50)
link([225,25,300,25],'a')
otext(150,25,"$f'\\\\subtext{predict}(\\\\cdot, m)$")
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
1. collect some examples of the **behavior of $s$**
2. feed $m$ with examples
3. compare responses of $s$ and $m$

Ideally, we want the comparison (step 3) outcome to be a number.
]
]

---

## Comparing behaviors

.cols[
.c60[
$$f\\subtext{comp-behavior}: \\mathcal{F}\_{X \\to Y} \\times \\mathcal{F}\_{X \\to Y} \\to \\mathbb{R}$$
]
.c40[
.diagram.center[
link([0,25,175,25],'a')
rect(175,0,150,50)
link([325,25,425,25],'a')
otext(250,25,"$f\\\\subtext{comp-behavior}$")
otext(87.5,10,"$f\\\\subtext{predict},s$")
otext(375,10,'$v\\\\subtext{effect}$')
]
]
]

Or, to highlight the presence of a model in a templated $f\\subtext{predict}$:

.cols[
.c60[
$$f\\subtext{comp-behavior}: \\mathcal{F}\_{X \\times M \\to Y} \\times M \\times \\mathcal{F}\_{X \\to Y} \\to \\mathbb{R}$$
]
.c40[
.diagram.center[
link([0,25,175,25],'a')
rect(175,0,150,50)
link([325,25,425,25],'a')
otext(250,25,"$f\\\\subtext{comp-behavior}$")
otext(87.5,10,"$f'\\\\subtext{predict},m,s$")
otext(375,10,'$v\\\\subtext{effect}$')
]
]
]

In both cases:

.cols[
.c60.compact[
.pseudo-code[
function $\\text{comp-behavior}(f\\subtext{predict}, s)$ {  
.i[].col1[$\\\\{x^{(i)}\\\\}\_i \\gets \\text{collect}()$]  
.i[].col1[$\\\\{y^{(i)}\\\\}\_i \\gets \\text{foreach}(\\\\{x^{(i)}\\\\}\_i, s)$]  
.i[].col2[$\\\\{\\hat{y}^{(i)}\\\\}\_i \\gets \\text{foreach}(\\\\{x^{(i)}\\\\}\_i, f\\subtext{predict})$]  
.i[].col3[$v\\subtext{effect} \\gets \\text{comp-resps}(\\\\{(y^{(i)},\\hat{y}^{(i)})\\\\}\_i)$]  
.i[]return $v\\subtext{effect}$;  
}
]
]
.c40[
1. .col1[collect some examples of the behavior of $s$]
2. .col2[feed $m$ with examples]
3. .col3[compare responses of $s$ and $m$]
]
]

.footnote[
More correctly $\\seq{(y^{(i)},\\hat{y}^{(i)})}{i} \\gets \\text{foreach}(\\seq{x^{(i)}{i}}, \\text{both}(\\cdot, s, f\\subtext{predict}))$ with $f\\subtext{both}: X \\times \\mathcal{F}^2\_{X \\to Y}$ and $f\\subtext{both}(x, f\_1, f\_2) = (f\_1(x),f\_2(x))$.
]

---

## Remarks on $f\\subtext{comp-behavior}$

.cols[
.c60.compact[
.pseudo-code[
function $\\text{comp-behavior}(f\\subtext{predict}, s)$ {  
.i[].col1[$\\\\{x^{(i)}\\\\}\_i \\gets \\text{collect}()$]  
.i[].col1[$\\\\{y^{(i)}\\\\}\_i \\gets \\text{foreach}(\\\\{x^{(i)}\\\\}\_i, s)$]  
.i[].col2[$\\\\{\\hat{y}^{(i)}\\\\}\_i \\gets \\text{foreach}(\\\\{x^{(i)}\\\\}\_i, f\\subtext{predict})$]  
.i[].col3[$v\\subtext{effect} \\gets \\text{comp-resps}(\\\\{(y^{(i)},\\hat{y}^{(i)})\\\\}\_i)$]  
.i[]return $v\\subtext{effect}$;  
}
]
]
.c40[
.diagram.center[
link([0,25,175,25],'a')
rect(175,0,150,50)
link([325,25,425,25],'a')
otext(250,25,"$f\\\\subtext{comp-behavior}$")
otext(87.5,10,"$f\\\\subtext{predict},s$")
otext(375,10,'$v\\\\subtext{effect}$')
]

1. .col1[collect examples of $s$ behavior]
2. .col2[feed $m$ with examples]
3. .col3[compare responses of $s$ and $m$]
]
]

- it's a partially abstract function: .col1[$f\\subtext{collect}$] and .col3[$f\\subtext{comp-resps}$] are **abstract** (i.e., not given here)
- we may reason about effectiveness and efficiency of $f\\subtext{comp-behavior}$, but both depend on **concrete** .col1[$f\\subtext{collect}$] and .col3[$f\\subtext{comp-resps}$]
  - **effectiveness**: to which degree $f\\subtext{comp-behavior}$ measures if $m$ behaves like $s$?
  - **efficiency**: how much resources are consumed to apply $f\\subtext{comp-behavior}$?

--

We'll see many concrete options for .col3[$f\\subtext{comp-resps}$]

.col1[$f\\subtext{collect}$] is instead hard to define, but it's more important than .col3[$f\\subtext{comp-resps}$]
- **working with good data is important**!

---

## The importance of $f\\subtext{collect}$ in assessment

- .col1[How many] observations to collect? (data **size**) .note[$n$ in $\\\\{(x^{(i)})\\\\}\_{i=1}^{i=n} \\gets \\text{collect}()$]
- .col2[Which] observations to collect? (data **coverage**)

Goal: the behavior $\\{(x^{(i)},y^{(i)})\\}\_{i=1}^{i=n}$ has to be **representative** of the real system $s$
- the .col1[larger $n$], the more representative
- the .col2[better the coverage of $X$], the more representative

Concerning .col1[size $n$]:
- small $n$, poor effectiveness 👎, great efficiency 👍
- large $n$, great effectiveness 👍, poor efficiency 👎

Concerning .col2[coverage of $X$]
- poor coverage, poor effectiveness 👎
- good coverage, good effectiveness 👍

**Focus on coverage, rather than size**, because it has no drawbacks!

---

## Comparing responses with $f\\subtext{comp-resps}$

.cols[
.c60[
Formally:
.cols[
.c40[$$f\\subtext{comp-resps}: \\mathcal{P}^\*(Y^2) \\to \\mathbb{R}$$]
.c60[
.diagram.center[
link([0,25,150,25],'a')
rect(150,0,125,50)
link([275,25,350,25],'a')
otext(212.5,25,"$f\\\\subtext{comp-resps}$")
otext(75,10,"$\\\\{(y^{(i)},\\\\hat{y}^{(i)})\\\\}\_i$")
otext(312.5,10,'$v\\\\subtext{effect}$')
]
]
]
]
.compact.c40[
.pseudo-code[
function $\\text{comp-behavior}(f\\subtext{predict}, s)$ {  
.i[]$\\{x^{(i)}\\}\_i \\gets \\text{collect}()$  
.i[]$\\{y^{(i)}\\}\_i \\gets \\text{foreach}(\\{x^{(i)}\\}\_i, s)$  
.i[]$\\{\\hat{y}^{(i)}\\}\_i \\gets \\text{foreach}(\\{x^{(i)}\\}\_i, f\\subtext{predict})$  
.i[].col3[$v\\subtext{effect} \\gets \\text{comp-resps}(\\\\{(y^{(i)},\\\\hat{y}^{(i)})\\\\}\_i)$]  
.i[]return $v\\subtext{effect}$;  
}
]
]
]

where $\\{(y^{(i)},\\hat{y}^{(i)})\\}\_i \\in \\mathcal{P}^\*(Y^2)$ is a multiset of pairs of $y$.

Depends only on $Y$, not on $X$!

--

We'll see **a few options** for the main cases:

.cols[
.c60[
- classification
  - all (i.e., agnostic with respect to $|Y|$): **error**, **accuracy**
  - binary: **FPR** and **FNR** (and variants), **EER**, **AUC**
  - multiclass: **weighted accuracy**
- regression: **MAE**, **MSE**, **MRE**, $R^2$
]
.c40[
<span style="font-size: 600%; line-height: 140px; vertical-align: bottom;">}</span>
<span style="line-height: 120px; vertical-align: bottom;">.key[performance indexes]</span>
]
]

---

class: middle, center

## Assessing models

### Classification

---

## Classification error

Recall: in classification $Y$ is a finite set with no ordering

.key[Classification error]: .note[more verbosely: classification error **rate**]
$$f\\subtext{err}(\\{(y^{(i)},\\hat{y}^{(i)})\\}\_{i=1}^{i=n})=\\frac{1}{n}\\sum\_{i=1}^{i=n}\\mathbf{1}(y^{(i)}\\ne \\hat{y}^{(i)})$$
where $\\mathbf{1}: \\{\\text{false},\\text{true}\\} \\to \\{0,1\\}$ is the indicator function:
$$\\mathbf{1}(b) =
\\begin{cases}
1 &\\text{if } b = \\text{true}\\\\
0 &\\text{otherwise}
\\end{cases}$$

- $f\\subtext{err}$ is a concrete instance of $f\\subtext{comp-resps}$
- the codomain of $f\\subtext{err}$ is $[0,1]$: .note[$[0,1] \\subseteq{\\mathbb{R}}$, so it can be a concrete instance]
  - $0$ means no errors, it's good 👍
  - $1$ means all errors, it's bad 👎
- in general, numbers in $[0,1]$ can be expressed as percentages in $[0,100]$: $x$ is the same as $100 x\%$

---

## Classification accuracy

.key[Classification accuracy]:
$$f\\subtext{acc}(\\{(y^{(i)},\\hat{y}^{(i)})\\}\_{i=1}^{i=n})=\\frac{1}{n}\\sum\_{i=1}^{i=n}\\mathbf{1}(y^{(i)} \\htmlClass{col3}{=} \\hat{y}^{(i)})$$

Clearly, $f\\subtext{acc}(\\{(y^{(i)},\\hat{y}^{(i)})\\}\_{i=1}^{i=n})=1-f\\subtext{err}(\\{(y^{(i)},\\hat{y}^{(i)})\\}\_{i=1}^{i=n})$.

The codomain of $f\\subtext{acc}$ is also $[0,1]$:
  - $1$ means no errors, it's good 👍
  - $0$ means all errors, it's bad 👎

For accuracy, the greater, the better.  
For error, the lower, the better.

.footnote[
In principle, the only requirement concerning $Y$ for both $f\\subtext{acc}$ and $f\\subtext{acc}$ is that there is an *equivalence relation* in $Y$, i.e., that $=$ is defined over $Y$.
However, in practice $Y$ is a finite set without ordering.
]

---

## Bounds for accuracy (and error)

In principle, accuracy is in $[0,1]$.

Recall that in the $f\\subtext{acc}$ is part of a $f\\subtext{comp-behavior}$ that should measure how well a model $m$ models a real system $s$.  
What are the **ideal extreme cases** in practice:
- $m$ is $s$, so it **perfectly models** $s$
- $m$ is **random**, does not model any dependency of $y$ on $x$

From another point of view, what would be the accuracy of a:
- model that perfectly models the system?
- random model?

---

## The random classifier (lower bound)

The .key[random classifier]¹ is a $X \\to Y$ doing:

$$f\\subtext{rnd}(x) = y_i \\text{ with } i \\sim U(\\{1,\\dots,|Y|\\})$$

where $i \\sim U(A)$ means choosing an item of $A$ with uniform probability.

Here $A=\\{1,\\dots,|Y|\\}$, hence $f(x)$ gives a random $y$, without using $x$, i.e., **no dependency**.

Considering **all possibles multisets of responses** $\\mathcal{P}^\*(Y)$, the **accuracy of the random classifier** is, on average, $\\frac{1}{|Y|}$.

.footnote[
1. .key[classifier] is a *shorthand* for:
  - a model for doing classifcation, i.e., an $f'\\subtext{predict}$ with categorical $Y$
  - a supervised learning technique for classification, i.e., a pair $f'\\subtext{learn}, f'\\subtext{predict}$ with categorical $Y$
]

---

## Dummy classifier (better lower bound)

.cols[
.c70[
Given **one specific multiset of responses** $\\{y^{(i)}\\}\_i$, the .key[dummy classifier] is the one that always predicts the **most frequent** class in $\\{y^{(i)}\\}\_i$:
$$f\_{\\text{dummy},\\{y^{(i)}\\}\_i}(x) = \\argmax\_{y \\in Y} \\frac{1}{n} \\sum\_{i=1}^{i=n} \\mathbf{1}(y=y^{(i)})=\\argmax\_{y \\in Y} \\freq{y, \\{y^{(i)}\\}\_i}$$
On the $\\{y^{(i)}\\}\_i$ on which it is built, the accuracy of the dummy classifier is $\\max\_{y \\in Y} \\freq{y, \\{y^{(i)}\\}\_i}$.

Recall: we use $f\\subtext{acc}$ on one specific $\\{y^{(i)}\\}\_i$.

Like the random classifier, the dummy classifier does not use $x$.
]
.c30[
.h30ex.center[![Dummy](images/dummy.jpg)]
.note[
.dict-def[*dummy \[duhm-ee\]*: a representation of a human figure, as for displaying clothes in store windows]

Looks like a human, but does nothing!
]
]
]


---

## Random/dummy classifier: examples

.cols[
.c50[
Case: **coin tossing**, $Y=\\{\\htmlClass{col1}{\\text{heads}},\\htmlClass{col2}{\\text{tails}}\\}$

**Random** on average (with $f\\subtext{rnd}$):
.nicetable[
| $\\seq{y^{(i)}}{i}$ | $\\seq{\\hat{y}^{(i)}}{i}$ | $f\\subtext{acc}()$ |
| --- | --- | --- |
|.col1[⬤].col2[⬤].col2[⬤].col1[⬤].col1[⬤].col2[⬤]|.col2[⬤].col2[⬤].col2[⬤].col1[⬤].col2[⬤].col1[⬤]|$50\%$|
|.col2[⬤].col2[⬤].col1[⬤].col2[⬤]|.col2[⬤].col1[⬤].col2[⬤].col1[⬤]|$25\%$|
| ... | ... | ... |
|.col1[⬤]|.col1[⬤]|$100\%$|
|.col2[⬤]|.col1[⬤]|$0\%$|
|.col1[⬤]|.col2[⬤]|$0\%$|
]
Average accuracy = $50\%$

**Dummy** on $\\seq{y^{(i)}}{i}=\\htmlClass{col2 st}{\\text{⬤⬤}}\\htmlClass{col1 st}{\\text{⬤}}\\htmlClass{col2 st}{\\text{⬤}}$  
(with $f\_{\\text{dummy},\\htmlClass{col2 st}{\\text{⬤⬤}}\\htmlClass{col1 st}{\\text{⬤}}\\htmlClass{col2 st}{\\text{⬤}}}$):

$$f\\subtext{acc}(\\htmlClass{col2 st}{\\text{⬤⬤}}\\htmlClass{col1 st}{\\text{⬤}}\\htmlClass{col2 st}{\\text{⬤}},\\htmlClass{col2 st}{\\text{⬤⬤⬤⬤}}) = 75\%$$
]
.c50[
Case: **Iris**, $Y=\\{\\htmlClass{col1}{\\text{setosa}},\\htmlClass{col2}{\\text{versicolor}},\\htmlClass{col3}{\\text{virginica}}\\}$

**Random** on average (with $f\\subtext{rnd}$):
.nicetable[
| $\\seq{y^{(i)}}{i}$ | $\\seq{\\hat{y}^{(i)}}{i}$ | $f\\subtext{acc}()$ |
| --- | --- | --- |
|.col1[⬤].col3[⬤].col2[⬤].col1[⬤].col3[⬤].col2[⬤]|.col2[⬤].col2[⬤].col3[⬤].col1[⬤].col2[⬤].col1[⬤]|$\\approx 17\%$|
|.col2[⬤].col2[⬤].col1[⬤].col3[⬤]|.col2[⬤].col1[⬤].col2[⬤].col3[⬤]|$50\%$|
| ... | ... | ... |
|.col3[⬤]|.col3[⬤]|$100\%$|
|.col2[⬤]|.col1[⬤]|$0\%$|
|.col1[⬤]|.col3[⬤]|$0\%$|
]
Average accuracy $\\approx 33\%$

**Dummy** on $\\seq{y^{(i)}}{i}=\\htmlClass{col3 st}{\\text{⬤⬤}}\\htmlClass{col1 st}{\\text{⬤}}\\htmlClass{col2 st}{\\text{⬤}}$  
(with $f\_{\\text{dummy},\\htmlClass{col3 st}{\\text{⬤⬤}}\\htmlClass{col1 st}{\\text{⬤}}\\htmlClass{col2 st}{\\text{⬤}}}$):

$$f\\subtext{acc}(\\htmlClass{col3 st}{\\text{⬤⬤}}\\htmlClass{col1 st}{\\text{⬤}}\\htmlClass{col2 st}{\\text{⬤}},\\htmlClass{col3 st}{\\text{⬤⬤⬤⬤}}) = 50\%$$
]
]

---

## The perfect classifier (upper bound)

A classifier that works exactly as $s$:

$$f\\subtext{perfect}(x) = s(x)$$

If $s$ is **deterministic**, the accuracy of $f\\subtext{perfect}(x)$ is 100% on every $\\seq{x^{(i)}}{i}$, by definition.

Are real systems deterministic in practice?
- system that makes a mail spam or not-spam
- Iris species (where Nature is a $s^{-1}$...)
- a bank employee who decides whether or not to grant a loan
- the real estate market forming the price of a flat ($Y=\\mathbb{R}^+$)

---

## The Bayes classifier (better upper bound)

A non deterministic system (i.e., a **stochastic** or random system) is one that given the same $x$ may output different $y$.

The .key[Bayes classifier] is an **ideal** model of a real system that is not deterministic:

$$f\\subtext{Bayes}(x) = \\argmax_{y \\in Y} \\prob{s(x)=y \\mid x}$$

where $\\prob{s(x)=y \\mid x}$ is the probability that $s$ gives $y$ for $x$.

Key facts:
- on a given $\\seq{x^{(i)}}{i}$ the accuracy of the Bayes classifier is $\\le 100\%$ (it may be **lower than 100%**)
- on $\\mathcal{P}^\*(X)$, i.e., on all possible multisets of observations $x$, the Bayes classifier is the **optimal** classifier, i.e., no other classifier can score a better accuracy .note[it can be proven, not here!]

--

In practice:
- the Bayes classifier is an ideal classifier: "building" it requires knowing how $s$ works, which is **undoable in practice**
- intuitively, **the more random the system, the lower the accuracy** of the Bayes classifier

---

## The Bayes classifier: example

The real system $s$ is the professor deciding if a **student** will **pass or fail** the exam of *Introduction to Machine Learning*.
The professor just looks at the student course to decide and is a bit **stochastic**.

.center[$X =\\{\\text{IN19},\\text{IN20},\\text{SM34},\\text{SM35},\\text{SM64}\\}$  
$Y = \\{\\text{fail},\\text{pass}\\}$]

The probability according to which the professor "reasons" is **completeley known**:
.cols[
.c30.center[
.compact.nicetable[
| | $\\text{fail}$ | $\\text{pass}$ |
| --- | --- | --- |
| $\\text{IN19}$ | $20\%$ | $80\%$ |
| $\\text{IN20}$ | $15\%$ | $85\%$ |
| $\\text{SM34}$ | $60\%$ | $40\%$ |
| $\\text{SM35}$ | $80\%$ | $20\%$ |
| $\\text{SM64}$ | $20\%$ | $80\%$ |
]
.note[❗ These are fake numbers!]
]
.c40[
.compact[
$$\\prob{s(x)=y \\mid x}=\\begin{cases}
20\% &\\text{if } x=\\text{IN19} \\land y=\\text{fail} \\\\
80\% &\\text{if } x=\\text{IN19} \\land y=\\text{pass} \\\\
15\% &\\text{if } x=\\text{IN20} \\land y=\\text{fail} \\\\
\\dots \\\\
80\% &\\text{if } x=\\text{SM64} \\land y=\\text{pass}
\\end{cases}$$
.note[the table is a compact form for this probability]
]
]
.c30[
.compact[
$$f\\subtext{Bayes}(x) = \\begin{cases}
  \\text{pass} &\\text{if } x=\\text{IN19} \\\\
  \\text{pass} &\\text{if } x=\\text{IN20} \\\\
  \\text{fail} &\\text{if } x=\\text{SM34} \\\\
  \\text{fail} &\\text{if } x=\\text{SM35} \\\\
  \\text{pass} &\\text{if } x=\\text{SM64}
\\end{cases}$$
.note[Built using the definition $f\\subtext{Bayes}(x) = \\argmax_{y \\in Y} \\prob{s(x)=y \\mid x}$]
]
]
]

.note[What's the accuracy of $f\\subtext{Bayes}$? Depends on the dataset! What's the accurcay of $f\\subtext{dummy}$? And of $f\\subtext{rnd}$?]

---

## Classification accuracy bounds

.center[
.nicetable[
| | Lower | Upper|
| --- | --- | --- |
| By definition | $0$ | $1$ |
| Bounds, all data | $\\frac{1}{\\lvert Y\\rvert}$ | $1$ |
| Better bounds, with one $\\seq{x^{(i)}}{i}$ | $\\max\_{y \\in Y} \\freq{y, \\{s(x^{(i)})\\}\_i}$ | $\\le 1$ |
]
]

If $\\seq{x^{(i)}}{i}$ is collected properly, it is **representative of the behavior** of the real system (together with the corresponding $\\seq{s(x^{(i)})}{i}$), hence the third case is the most relevant one:

.center[$f\\subtext{acc}(\\cdot) \\in [\\max\_{y \\in Y} \\freq{y, \\\\{s(x^{(i)})\\\\}\_i}, 1 - \\epsilon]$ .note[$\\epsilon > 0$ is actually unknown]]

In practice, use the **random classifier as a baseline** and
- do not cry 😭 for a missed $100\%$
- do not be too happy 🥳 just because you score $> 0\%$

---

## *All* data

All data means all the **theoretically** possible datasets, i.e., for just $y$, $\\mathcal{P}^*(Y)$.
- on average in $\\mathcal{P}^*(Y)$, the frequency of each $y\_i \\in Y$ is $\\frac{1}{|Y|}$

**In practice** not all possible datasets are equally probable.
- often, the frequencies $f\_i$ of $y\_i$ are known (at least an approximation of them).
- in these cases, the (approximate) lower bound for the random classifier is:
$$\\max\_i f\_i$$

**Example**: for spam, $x$ is an email, i.e., a string of text, $y$ is $\\text{spam}$ or $\\neg\\text{spam}$:
- are we interested in measuring the accuracy of a spam filter on all possible strings (theory)?
- or are we more interested in knowing its accuracy for actual emails (practice)?

---

## Building the dummy classifier

Consider the random classifier as a supervised learning technique:
- in **learning phase**: compute frequencies/probability of classes .note[concrete]
- in **prediction phase**: choose the most frequent class .note[concrete]

Hence, formally:
- a .col2[model $m \\in M$ is]:
  - the frequencies classes $\\htmlClass{col2}{\\vect{f} = (f\_1,\\dots,f\_{|Y|})}$, with $M=F\_Y=\\{\\vect{f} \\in [0,1]^{|Y|}: \\lVert \\vect{f} \\rVert\_1=1\\}$ .note[
  $\\lVert \\vect{x} \\rVert\_1$ is the **1-norm** of a vector $\\vect{x}=(x\_1,\\dots,x\_p)$ with $\\lVert \\vect{x} \\rVert\_1$ $=\\sum\_i x\_i$
  ]
  - a **discrete probability** .col2[$p$] over $Y$, with $M=P\_Y=\\{p: Y \\to [0,1] \\text{ s.t. } 1=\\sum\_{y' \\in Y} p(y')=\\prob{y'=y}\\}$ .note[$\\text{s.t.}$ stays for "such that"]
  - the $y$ part .col2[$\\seq{y^{(i)}}{i}$] of a **dataset** $\\seq{x^{(i)},y^{(i)}}{i}$, with $M=\\mathcal{P}^*(Y)$
  - just the most frequent **class** .col2[$y^\\star$], with $M=Y$
- $f'\\subtext{learn}: \\mathcal{P}^*(X \\times Y) \\to M$ .note[asbtract]
- $f'\\subtext{predict}: X \\times M \\to Y$ .note[asbtract]

---

## Building the dummy classifier (options 1 and 2)

.cols[
.c60[
.diagram.center[
link([0,25,150,25],'a')
rect(150,0,100,50)
link([250,25,350,25],'a')
otext(200,25,"$f'\\\\subtext{learn}$")
otext(75,10,'$\\\\seq{(x^{(i)},y^{(i)})}{i}$')
otext(300,10,'$\\\\htmlClass{col2}{m}$')
]
]
.c40[
.diagram.center[
link([0,25,100,25],'a')
rect(100,0,100,50)
link([200,25,310,25],'a')
otext(150,25,"$f'\\\\subtext{predict}$")
otext(50,10,'$x, \\\\htmlClass{col2}{m}$')
otext(250,10,'$y$')
]
]
]

Option 1: the model .col2[$m$] is a **discrete probability**: .note[here $f'\\subtext{learn}$ a function that returns a function]
.cols[
.c50.center.compact[
$f'\\subtext{learn}(\\seq{(x^{(i)},y^{(i)})}{i}) = \\htmlClass{col2}{p}: p(y)= \\freq{y, \\seq{y^{(i)})}{i}}$
]
.c50.center.compact[
$f'\\subtext{predict}(x,\\htmlClass{col2}{p})=\\argmax\_{y \\in Y} \\htmlClass{col2}{p}(y)$
]
]

--

Option 2: the model .col2[$m$] is a **vector of frequencies**:
.note[assume $Y=\\\\{y\_1, y\_2, \\dots\\\\}$]
.cols[
.c50.center.compact[
$f'\\subtext{learn}(\\seq{(x^{(i)},y^{(i)})}{i}) = \\htmlClass{col2}{\\vect{f}} = \\left(\\freq{y\_j, \\seq{y^{(i)})}{i}}\\right)\_j$
]
.c50.center.compact[
$f'\\subtext{predict}(x,\\htmlClass{col2}{\\vect{f}})=y\_i$ with $i = \\argmax\_i f\_i$]
]

---

## Building the dummy classifier (options 3 and 4)

Option 3: the model .col2[$m$] is simply the learning **dataset**: .note[just the $y$ part of it]
.cols[
.c50.center.compact[
$f'\\subtext{learn}(\\seq{(x^{(i)},y^{(i)})}{i}) = \\htmlClass{col2}{\\seq{y^{(i)}}{i}}$
]
.c50.center.compact[
$f'\\subtext{predict}(x,\\seq{y^{(i)}}{i})=\\argmax\_{y \\in Y} \\freq{y,\\htmlClass{col2}{\\seq{y^{(i)}}{i}}}$
]
]

--

Option 4: the model .col2[$m$] is the most frquent **class** $y^\\star$:
.cols[
.c70.center.compact[
$f'\\subtext{learn}(\\seq{(x^{(i)},y^{(i)})}{i}) = \\htmlClass{col2}{y^\\star}=\\argmax\_{y \\in Y} \\freq{y,\\seq{y^{(i)}}{i}}$
]
.c30.center.compact[
$f'\\subtext{predict}(x,y^\\star)=\\htmlClass{col2}{y^\\star}$
]
]

--

For all options, works with:
- any $X$ ($x$ never appears in $f'\\subtext{learn}$ and $f'\\subtext{predict}$ bodies)
- finite $Y$ (categorical $y$)

Are they different? How?

--

They differ in efficiency, are equal in effectiveness:
- **effectiveness** as supervised learning techniques, **same by definition**
- **efficiency**, always low, but: .note[just an implementation matter]
  - more or less memory for storing the model $m$
  - computational effort more in the learning or prediction phase

---

class: middle, center

## Assessing models

### Binary lassification

---

## Binary classification

Binary classification is a **very common** scenario.
- assessment is particularly important
- there are many indexes

Examples:
- spam detection
- decide whether there is a dog in a picture
- clinical test (more properly: diagnostic test)

---

## Example: diagnostic test

Suppose there is a (ML-based) diagnostic test for a given disease $d$. .note[just to give a name to it without calling bad luck...]

You are being said the accuracy of the test is $99.8\%$.

.center[**Is this a good test or not?**]

--

In "formal" terms, the test is an $f\\subtext{predict}: X \\to Y$ with:
- $X=\\{$🧑‍🦰$,$👱‍$,$🙍$,$‍👱$,$🙎‍$,\\dots\\}$ the set of persons¹
- $Y=\\{\\text{has the disesea } d, \\text{does not have the disease } d\\}$

Since $|Y|=2$ this is a binary classification problem.

.footnote[
1: or, from another point of view, $X =\\{$🧑‍🦰$,$👱‍$,$🙍$,$‍👱$,$🙎‍$,\\dots\\} \\times T$, with $T$ being the *time*, because you test a person at a given time $t$, and the outcome might be different from the test outcome for the same person at a later $t'$.
]

---

## The rare disease

Suppose $d$ is a **rare**¹ disease which affects $\\approx 2$ people every $1000$ and let the accuracy be again $99.8\%$.

.center[**Is this a good test or not?**]

.footnote[
1. [definition](https://en.wikipedia.org/wiki/Rare_disease#Definition) of rare for a disease varies from country to country, based on the prevalence with thresholds ranging from 1 on 1538 (Brazil) to 1 in 100000 (Peru).
]

--

Consider a trivial test that **always** says "you don't have the disease $d$", its accuracy would be $99.8\%$:
- on $1000$ persons, the trivial test would make correct decisions on $998$ cases
- is our test good if it works like the trivial test?

--
.cols[
.c50.vcentered[
The trivial test is actually the **dummy classifier** built knowing that the prevalence is $0.2\%$.
]
.c50.center[
.h20ex[![Dummy classifier meme](images/dummy-classifier-meme.jpg)]
]
]

---

## Positives and negatives

$99.8\%$ was soooo nice, but the test was actually just saying always one $y$.

- Can we spot this trivially wrong behavior?
- From another point of view, can we check how badly the classifier behaves **for each class** $y$?

Yes, because we are in **binary classification** and there are only $2=|Y|$ possible values for $y$ (i.e., 2 classes).
There are performance indexes designed right with this aim.

--

First, let's give a *standard* name to the two possible $y$ values:
- **positive** (one case, denoted with $\\text{P}$)
- **negative** (the other case $\\text{N}$)

How to associate positive/negative with actual $Y$ elements?
- e.g., $\\text{spam}, \\neg\\text{spam}$
- e.g., $\\text{has the disease } d, \\text{does not have the disease } d$

Common practice:
- associate positive to the **rarest case**
- otherwise, if no rarest case exists or is known, **clearly state what's your positive**

---

## FPR and FNR

**Goal**: measuring the error on each of the two classes in binary classification.

The .key[False Positive Rate (FPR)] is the rate of **negatives** that are **wrongly¹ classified as positives**:
$$f\\subtext{FPR}(\\{(y^{(i)},\\hat{y}^{(i)})\\}\_{i=1}^{i=n})=\\frac{1}{n}\\sum\_{i=1}^{i=n}\\mathbf{1}(y^{(i)}=\\text{N} \\land y^{(i)} \\ne \\hat{y}^{(i)})$$

The .key[False Negative Rate (FPR)] is the rate of **positives** that are **wrongly classified as negatives**:
$$f\\subtext{FPR}(\\{(y^{(i)},\\hat{y}^{(i)})\\}\_{i=1}^{i=n})=\\frac{1}{n}\\sum\_{i=1}^{i=n}\\mathbf{1}(y^{(i)}=\\text{N} \\land y^{(i)} \\ne \\hat{y}^{(i)})$$

For both:
- the codomain is $[0,1]$
- **the lower, the better** (like the error)
- each one is formally a $f\\subtext{comp-resps}$ considering just a part of the $\\{(y^{(i)},\\hat{y}^{(i)})\\}$

.note[
1. wrongly $\\rightarrow$ *falsely* $\\rightarrow$ false
]
---

## More comfortable notation

.cols[
.c50[
$$\\text{FPR}=\\frac{\\text{FP}}{\\text{N}}$$
]
.c50[
$$\\text{FNR}=\\frac{\\text{FN}}{\\text{P}}$$
]
]

Assuming that:
- there is a $\\{(y^{(i)},\\hat{y}^{(i)}\\}$
- $\\text{FP}$ is the number of false positives $\\text{FN}$ is the number of false negatives
  - you need both $y^{(i)}$ and $\\hat{y}^{(i)}$ for counting them
  - *positive/negative* is for $\\hat{y}^{(i)}$; *false* is for $y^{(i)}$, but considering $\\hat{y}^{(i)}$
- $\\text{P}$ is the number of positives and $\\text{N}$ is the number of negatives
  - you need only $y^{(i)}$ for counting them

---

## FPR, FNR for the trivial test

Suppose $d$ is a **rare**¹ disease which affects $\\approx 2$ persons every $1000$ and consider a trivial test that **always** says "you don't have the disease $d$"
- on $1000$ persons, the trivial test would make correct decisions on $998$ cases 😁
$$\\text{Acc} = 99.8\%$$
- on the $998$ negative persons, the trivial test does not make any wrong prediction 😁
$$\\text{FPR}=\\frac{\\text{FP}}{\\text{N}} = \\frac{0}{998} = 0 \%$$
- on the $2$ positive persons, the trivial test makes wrong predictions only 🙁
$$\\text{FNR}=\\frac{\\text{FN}}{\\text{P}} = \\frac{2}{2} = 100 \%$$

.footnote[
$\\text{Acc}$ is the more comfortable notation for the accuracy; $\\text{Err}$ for the error.
]

---

## Accuracy or FPR, FNR?

When to use accuracy? When to use FPR and FNR?

.center[*tl;dr*¹: **use FPR and FNR in binary classification!**]

--

In decreasing order of informativeness .note[effectiveness of assessment of effectiveness], decreasing order of verbosity:
- give accuracy, FPR, FNR, frequencies of classes in $Y$, possibly other indexes .note[we'll see later]
- give accuracy, FPR, FNR, frequencies of classes
- FPR, FNR, frequencies of classes
- FPR, FNR
- accuracy, frequencies of classes
- .striked[accuracy]

**Accuracy alone in binary classification is evil!** 👿

Just FPR, or just FNR is evil too, but also weird.

.footnote[
1. too long; didn't read
]

---

## The many relatives of FPR, FNR: TPR, TNR

Binary classification and its assessment are so practically relevant that there exist many other "synonyms" of FPR and FNR.

.key[True Positive Rate (TPR)], positives correctly classified as positives:
$$\\text{TPR}=\\frac{\\text{TP}}{\\text{P}}=1-\\text{FNR}$$

.key[True Negative Rate (TNR)], negatives correctly classified as negatives:
$$\\text{TNR}=\\frac{\\text{TN}}{\\text{N}}=1-\\text{FPR}$$

For both, **the greater, the better** (like accuracy); codomain is $[0,1]$.

Relation with accuracy and error:
.cols[
.c40[
$$\\text{Err}
=\\frac{\\text{FP}+\\text{FN}}{\\text{N}+\\text{P}}
=\\frac{\\text{P} \; \\text{FNR}+\\text{N} \; \\text{FPR}}{\\text{P}+\\text{N}}$$
]
.c60[
$$\\text{Acc}
=1-\\text{Err}
=\\frac{\\text{TP}+\\text{TN}}{\\text{N}+\\text{P}}
=\\frac{\\text{P} \; \\text{TPR}+\\text{N} \; \\text{TNR}}{\\text{P}+\\text{N}}$$
]
]

---

## On balanced data

In classification (binary and multiclass), a dataset is .key[balanced], with respect to the response variable $y$, if the frequency of each value of $y$ is the same.

For a balanced dataset in binary classification, $\\text{P}=\\text{N}$, hence:
- the error rate is the **average** of FPR and FNR
$$\\text{Err}
=\\frac{\\text{FP}+\\text{FN}}{\\text{N}+\\text{P}}=\\frac{\\text{P} \; \\text{FNR}+\\text{N} \; \\text{FPR}}{\\text{P}+\\text{N}}
=\\frac{\\text{N} (\\text{FNR} + \\text{FPR})}{\\text{N}+\\text{N}}
=\\frac{1}{2} (\\text{FNR} + \\text{FPR})$$
- the accuracy is the **average** of TPR and TNR
$$\\text{Acc}
=\\frac{\\text{TP}+\\text{TN}}{\\text{N}+\\text{P}}
=\\frac{\\text{P} \; \\text{TPR}+\\text{N} \; \\text{TNR}}{\\text{P}+\\text{N}}
=\\frac{\\text{N} (\\text{TPR}+\\text{TNR})}{\\text{N}+\\text{N}}
=\\frac{1}{2} (\\text{TNR} + \\text{TPR})$$

The **more unbalanced** a dataset, the farther the error (accuracy) from the average of FPR and FNR (TPR and TNR), the **more misleading** 👿 giving error (accuracy) only!

---

## Precision and recall

.cols[
.c60[
.key[Precision]: .note[may be $\\frac{0}{0}$, i.e., `NaN`, if the classifier never says positive]
$$\\text{Prec}=\\frac{\\text{TP}}{\\text{TP}+\\text{FP}}$$
]
.c40[
.key[Recall]:
$$\\text{Rec}=\\frac{\\text{TP}}{\\text{P}}=\\text{TPR}$$
]
]

They come from the **information retrieval** scenario:
- imagine a set of documents $D$ (e.g., the web)
- imagine a query $q$ with an **ideal** subset $D^\\star \\subseteq D$ as response (**relevant** documents)
- the search engine retrieves a subset $D' \\subseteq D$ of documents (**retrieved** documents)
- retrieving a document as binary classification: is $d \\in D$ relevant or not? .note[relevant = positive]

.cols[
.c60[
**Precision**: how many retrieved document are actually relevant?
.center[$\\text{Prec}=\\frac{|D' \\cap D^\\star|}{|D'|}=\\frac{|D' \\cap D^\\star|}{|D' \\cap D^\\star|+|D' \\setminus D^\\star|}$]
]
.c40[
**Recall**: how many of the relevant document are actually retrieved?
.center[$\\text{Prec}=\\frac{|D' \\cap D^\\star|}{|D^\\star|}$]
]
]

**The greater, the better** (like accuracy); precision $\\in [0,1] \\cup $ `NaN`, recall $\\in [0,1]$.

---

## Sensitivity and specificity (and more)

.key[Sensitivity]:
$$\\text{Sensitivity}=\\frac{\\text{TP}}{\\text{P}}=\\text{TPR}$$

.key[Specificity]:
$$\\text{Specificity}=\\frac{\\text{TN}}{\\text{N}}=1-\\text{FPR}$$

**The greater, the better** (like accuracy); both in $[0,1]$.

--

Other similar indexes:
- **Type I error** for FPR
- **Type II error** for FNR

For both, the lower, the better (like error).

---

## Which terminology?

Rule of the thumb¹ (in binary classification)
- *precision and recall*, if in an **information retrieval** scenario
  - refer to the act of retrieving
- *sensitivity and specificity*, if working with a **diagnostic** test
  - refer to the quality of the text
- *FPR and FNR*, **otherwise**
  - refer to the name of the classes

No good reasons .note[imho] for using Type I and Type II error:
- what do they refer to?
- is there a Type III? 🤔 (No!)

.footnote[
1. .dict-def[a method of judging a situation or condition that is not exact but is based on experience]
]

---

<!--
- limit of having 2 indexes: example of two models with no winner with fpr,fnr
- cost of errors
- can we tailor a model to take into account the cost of error
- $f_predict(x)$ as a distribution over decision instead of decision
- how to obtain decision from distribution
  - sketch on how to make the opposite: (dirac) distribution from decision
- eer
- roc, auc
- f1 score and weighted accuracy
- influence of knowledge of cost of errors on choice of eval indexes

- multiclass case: accuracy, weighted accuracy

- regression

- from comparing models to comparing learning techs
- say: as we took many x,y pairs for assessing a model, we should take many D to assess a f_learn; sketch f_assess_learn as a block
- unseen data, data of tomorrow, D different that learning, *test dataset*
- static learn/test division
- k-fold cross validation, loocv, discusse effectiveness/efficiency trade-off

- comparing models/param values
- mean and stdev of many execs
- motivation and brief sketch statistical significance tests
-->
