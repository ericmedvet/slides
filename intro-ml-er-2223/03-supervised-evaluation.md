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

The real system $s$ is the professor deciding if a **student** will **pass or fail** the exam of *Introduction to ML*.
The professor just looks at the student course to decide .note[❗ fake!] and is a bit **stochastic**.

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
.note[❗ these are fake numbers!]
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
.center.note[the table is a compact form for this probability]
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
.center.note[built using the definition $f\\subtext{Bayes}(x) = \\argmax_{y \\in Y} \\prob{s(x)=y \\mid x}$]
]
]
]

.note[
What's the accuracy of $f\\subtext{Bayes}$? What's the model for the Bayes classifier? What's $M$?  
What's the accurcay of $f\\subtext{dummy}$? And of $f\\subtext{rnd}$?
]

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
  - a **discrete probability distribution** .col2[$p$] over $Y$, with $M=P\_Y=\\{p: Y \\to [0,1] \\text{ s.t. } 1=\\sum\_{y' \\in Y} p(y')=\\prob{y'=y}\\}$ .note[$\\text{s.t.}$ stays for "such that"]
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

Option 1: the model .col2[$m$] is a **discrete probability distribution**: .note[here $f'\\subtext{learn}$ a function that returns a function]
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

## The fallacy of the accuracy

$99.8\%$ was soooo nice, but the test was actually just saying always one $y$.

The **accuracy** alone was not able to capture such a gross error.

- Can we spot this trivially wrong behavior?
- From another point of view, can we check how badly the classifier behaves **for each class** $y$?

Yes, also because we are in **binary classification** and there are only $2=|Y|$ possible values for $y$ (i.e., 2 classes).

There are performance indexes designed right with this aim.

---

## Positives and negatives

First, let's give a *standard* name to the two possible $y$ values:
- **positive** (one case, denoted with $\\text{pos}$)
- **negative** (the other case $\\text{neg}$)

How to associate positive/negative with actual $Y$ elements?
- e.g., $\\text{spam}, \\neg\\text{spam}$
- e.g., $\\text{has the disease } d, \\text{does not have the disease } d$

Common practice:
- associate positive to the **rarest case**
- otherwise, if no rarest case exists or is known, **clearly state what's your positive**

---

## FPR and FNR

**Goal**: measuring the error on each of the two classes in binary classification.

The .key[False Positive Rate (FPR)] is the rate of **.col1[negatives]** that are **.col2[wrongly]¹ classified as positives**:
$$f\\subtext{FPR}(\\{(y^{(i)},\\hat{y}^{(i)})\\}\_{i=1}^{i=n})=\\frac{1}{n}\\sum\_{i=1}^{i=n}\\mathbf{1}(\\htmlClass{col1}{y^{(i)}=\\text{neg}} \\land \\htmlClass{col2}{y^{(i)} \\ne \\hat{y}^{(i)}})$$

The .key[False Negative Rate (FNR)] is the rate of **.col3[positives]** that are **.col2[wrongly] classified as negatives**:
$$f\\subtext{FNR}(\\{(y^{(i)},\\hat{y}^{(i)})\\}\_{i=1}^{i=n})=\\frac{1}{n}\\sum\_{i=1}^{i=n}\\mathbf{1}(\\htmlClass{col3}{y^{(i)}=\\text{pos}} \\land \\htmlClass{col2}{y^{(i)} \\ne \\hat{y}^{(i)}})$$

For both:
- the codomain is $[0,1]$
- **the lower, the better** (like the error)
- each one is formally a $f\\subtext{comp-resps}$ considering just a part  $\\seq{(y^{(i)},\\hat{y}^{(i)})}{i}$

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
- there is a $\\seq{(y^{(i)},\\hat{y}^{(i)}}{i}$, even if it's not written
- $\\text{FP}$ is the number of false positives; $\\text{FN}$ is the number of false negatives
  - you need both $y^{(i)}$ and $\\hat{y}^{(i)}$ for counting them
  - *.col1[negative]/.col3[positive]* is for $\\hat{y}^{(i)}$; *.col2[false]* is for $y^{(i)}$, but considering $\\hat{y}^{(i)}$
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
- give accuracy, FPR, FNR, frequencies of classes² in $Y$, possibly other indexes .note[we'll see later]
- give accuracy, FPR, FNR, frequencies of classes
- FPR, FNR, frequencies of classes
- FPR, FNR
- accuracy, frequencies of classes
- .striked[accuracy]

**Accuracy alone in binary classification is evil!** 👿

Just FPR, or just FNR is evil too, but also weird.

.footnote[
1. too long; didn't read
2. you need to show them just once, if using the "natural" distribution
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

In classification (binary and multiclass), a dataset is .key[balanced], with respect to the response variable $y$, if the frequency of each value of $y$ is *roughly* the same.

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
.center[$\\text{Prec}=\\frac{|D' \\cap D^\\star|}{|D'|}=\\frac{\\htmlClass{col1}{|D' \\cap D^\\star|}}{\\htmlClass{col2}{|D' \\cap D^\\star|}+\\htmlClass{col2}{|D' \\setminus D^\\star|}}=\\frac{\\htmlClass{col1}{\\text{TP}}}{\\htmlClass{col1}{\\text{TP}}+\\htmlClass{col2}{\\text{FP}}}$]
]
.c40[
**Recall**: how many of the relevant document are actually retrieved?
.center[$\\text{Rec}=\\frac{\\htmlClass{col1}{|D' \\cap D^\\star|}}{\\htmlClass{col3}{|D^\\star|}}=\\frac{\\htmlClass{col1}{\\text{TP}}}{\\htmlClass{col3}{\\text{P}}}$]
]
]

**The greater, the better** (like accuracy); precision $\\in [0,1] \\cup $ `NaN`, recall $\\in [0,1]$.

---

## Sensitivity and specificity (and more)

.key[Sensitivity]:
$$\\text{Sensitivity}=\\frac{\\text{TP}}{\\text{P}}=\\text{TPR}$$

.key[Specificity]:
$$\\text{Specificity}=\\frac{\\text{TN}}{\\text{N}}=\\text{TNR}$$

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
  - refer to the name of the class

No good reasons .note[imho] for using Type I and Type II error:
- what do they refer to?
- is there a Type III? 🤔 (No!)

.footnote[
1. .dict-def[a method of judging a situation or condition that is not exact but is based on experience]
]

---

## Comparison with FPR and FNR

Suppose you have two models and you compute them on the same data:
- model $m_1$ .note[with its $f'\\subtext{predict}$] scores $\\text{FPR}=6\%$ and $\\text{FNR}=4\%$
- model $m_2$ .note[with its $f'\\subtext{predict}$] scores $\\text{FPR}=10\%$ and $\\text{FNR}=1\%$

Which one is the best?

--

In general, it depends on:
- the **cost of the error**, possibly different between FPs and FNs
- the number of positives or negatives

---

## Cost of the error

Assumptions:
- once $f\\subtext{predict}$ outputs a $y$, some **action is taken**
  - otherwise, taking a decision $y$ is pointless
- if the action is wrong, there is some **cost** to be paid with respect to the correct action (the other one, in binary classification) .note[assume the correct decision has $0$ cost]
  - otherwise, making attempting to take the correct decision is pointless

Given $\\text{P}+\\text{N}$ observations, the overall cost $c$ is:
$$c = c\\subtext{FP} \; \\text{FPR} \; \\text{N} + c\\subtext{FN} \; \\text{FNR} \; \\text{P}$$
with $c\\subtext{FP}$ and $c\\subtext{FN}$ the cost of FPs and FNs.

If you know $c\\subtext{FP}$, $c\\subtext{FN}$, $\\text{N}$, and $\\text{P}$: (the costs $c\\subtext{FP}$, $c\\subtext{FN}$ should come **from domain knowledge**)
- you can **compute** $c$ (and **compare** the cost for two models)
- find a good the trade-off for $\\text{FPR}$ and $\\text{FNR}$ .note[more later]

---

## Balancing FPR and FNR

Given a **model** (not a learning technique), can we "tune" it to **prefer avoiding FPs rathern than FNs** (or viceversa)?
- e.g., can we make a diagnostic more sensitive to positives (i.e., prefer avoiding FNs) during a pandemic wave?

Yes! It turns out that for **many learning techniques** (for classification), the $f'\\subtext{predict}$ internally computes a **discrete probability distribution** over $Y$ before actually returning one $y$.

---

## Model with probability

Formally:
.cols[
.c30[
$$f''\\subtext{predict}: X \\times M \\to P\_{Y}$$
$$f''\\subtext{predict}(x, m) = p$$
]
.c70[
$$f'\\subtext{predict}: X \\times M \\to Y$$
$$f'\\subtext{predict}(x, m)= \\argmax\\sub{y \\in Y} (f''\\subtext{predict}(x, m))(y) = \\argmax\\sub{y \\in Y} p(y)$$
]
]
where $P\_Y$ is the set of discrete probability distributions over $Y$.

**Example**: for spam detection, given a $m$ and an email $x$, $f'\\subtext{predict}(x, m)$ might return:
$$p(y)=
\\begin{cases}
80\% &\\text{if } y=\\text{spam} \\\\
20\% &\\text{if } y=\\neg\\text{spam}
\\end{cases}$$
For another email, it might return a 30%/70%, instead of an 80%/20%.

---

## Learning technique with probability

A .key[supervised learning technique with probability] (for classification) is defined by:
- a $f'\\subtext{learn}: \\mathcal{P}^*(X \\times Y) \\to M$, for learning a model from a dataset
- a $f''\\subtext{predict}: X \\times M \\to P\_{Y}$, for giving a probability distribution from an observation and a model

For all the techniques of this kind, $f'\\subtext{predict}: X \\times M \\to Y$ and $f\\subtext{predict}$ are always **the same**:
- $f'\\subtext{predict}(x, m)= \\argmax\\sub{y \\in Y} (f''\\subtext{predict}(x, m))(y)$
- $f\\subtext{predict}(x) = f'\\subtext{predict}(x, m)$

.diagram.center[
link([0,50,125,50],'a')
link([75,35,125,35],'a')
rect(50,0,425,100)
rect(125,25,100,50)
link([225,50,275,50],'a')
rect(275,25,150,50)
link([425,50,550,50],'a')
otext(25,35,'$x$')
otext(100,20,'$m$')
otext(175,50,"$f''\\\\subtext{predict}$")
otext(250,35,'$p$')
otext(350,50,"$\\\\argmax\\\\sub{y \\\\in Y}$")
otext(512.5,35,'$y$')
]

"internally computes" $\\rightarrow$ $p$ is indeed available internally, but can be obtained from outside
- in practice, software tools allow to use both $f'\\subtext{predict}$ and $f''\\subtext{predict}$

---

## Probability and binary classification

In **binary classification**, with $Y=\\{\\text{pos},\\text{neg}\\}$, $p \\in P\_Y$ has always this form:
$$p(y)=
\\begin{cases}
p\\subtext{pos} &\\text{if } y=\\text{pos} \\\\
1-p\\subtext{pos} &\\text{if } y=\\text{neg}
\\end{cases}$$
with $p\\subtext{pos} \\in [0,1]$.
Hence, it can be seen as:
.cols[
.c50[
$$f'''\\subtext{predict}: X \\times M \\to [0,1]$$
$$f'''\\subtext{predict}(x,m)=p\\subtext{pos}$$
]
.c50[
$$f'\\subtext{predict}: X \\times M \\to Y$$
$$f'\\subtext{predict}(x,m)=
\\begin{cases}
\\text{pos} &\\text{if } p\\subtext{pos} \\ge 0.5 \\\\
\\text{neg} &\\text{otherwise}
\\end{cases}$$
]
]

.diagram.center[
link([0,50,125,50],'a')
link([75,35,125,35],'a')
rect(50,0,425,100)
rect(125,25,100,50)
link([225,50,300,50],'a')
rect(300,25,125,50)
link([425,50,550,50],'a')
otext(25,35,'$x$')
otext(100,20,'$m$')
otext(175,50,"$f'''\\\\subtext{predict}$")
otext(262.5,35,'$p\\\\subtext{pos}$')
otext(362.5,50,"$\\\\ge 0.5$")
otext(512.5,35,'$y$')
]

---

## Changing the threshold

If we replace the fixed $0.5$ **threshold** with a param $\\tau$ we obtain a new function:
.cols[
.c40[
$$f^\\tau\\subtext{predict}: X \\times [0,1] \\to Y$$
$$f^\\tau\\subtext{predict}(x,\\tau)=
\\begin{cases}
\\text{pos} &\\text{if } f'''\\subtext{predict}(x,m) \\ge \\tau \\\\
\\text{neg} &\\text{otherwise}
\\end{cases}$$
]
.c60[
.diagram.center[
link([0,50,125,50],'a')
link([0,82.5,262.5,82.5,262.5,65,300,65],'a')
link([75,35,125,35],'a')
rect(50,0,425,100)
rect(125,25,100,50)
link([225,50,300,50],'a')
rect(300,25,125,50)
link([425,50,550,50],'a')
otext(25,35,'$x$')
otext(25,67.5,'$\\\\tau$')
otext(100,20,'$m$')
otext(175,50,"$f'''\\\\subtext{predict}$")
otext(262.5,35,'$p\\\\subtext{pos}$')
otext(362.5,50,"$\\\\ge \\\\tau$")
otext(512.5,35,'$y$')
]
]
]

Note that:
- for using $f^\\tau\\subtext{predict}$ on an $x$, you need a **concrete value** for $\\tau$
  - $f\\subtext{predict}(x)=f^\\tau\\subtext{predict}(x, 0.5)$, i.e., $0.5$ is the default value for $\\tau$ in $f\\subtext{predict}$
- like for $f\\subtext{predict}$, the model is *inside* $f^\\tau\\subtext{predict}$
- you can obtain **several predictions for the same observation** $x$ by varying $\\tau$

**Example**: if there we want our diagnostic test to be more sensible to positives, we lower $\\tau$ **without changing the model**!

---

## Threshold $\\tau$ vs. FPR, FNR

Given the **same** $m$ and the **same** $\\seq{(x^{(i)},y^{(i)})}{i}$:
- the greater $\\tau$, the less frequent $y=\\text{pos}$, the lower $\\text{FPR}$, the greater $\\text{FNR}$
- the lower $\\tau$, the more frequent $y=\\text{pos}$, the greater $\\text{FPR}$, the lower $\\text{FNR}$

**Example**:
.cols[
.c50[
.center.w100p[![Example of tau vs. FPR and FNR](images/tau-vs-fpr-fnr.png)]
<!--
x=seq(0,1,by=0.1)
d=as.data.frame(cbind(tau=x,FPR=0.5/(2+1*(x+abs(rnorm(11,sd=0.05)))),FNR=0.5/(1.75+3*(1-x-abs(rnorm(11,sd=0.05))))))
d$FNR[1]=0
d %>% pivot_longer(c(FPR,FNR)) %>% ggplot(aes(x=tau,y=value,color=name)) + geom_line()
-->
]
.c50[
- for the default threshold $\\tau=0.5$, $\\text{FPR}\\approx 20\%$, $\\text{FNR}\\approx 15\%$
- if you want to be more sensitive to positives, set, e.g., $\\tau=0.25$, so there will be a lower $\\text{FNR}$
- if you know the cost of a FN is $\\approx$ double the cost of a FP **and** the data is balanced, then you should set $\\tau\\approx 0.12$
]
]
.note[why $\\text{FNR}=0\%$ for $\\tau=0$ but $\\text{FNR}>0\%$ for $\\tau=1$?]

---

## Equal Error Rate

For a model $m$ and a dataset $\\seq{(x^{(i)},y^{(i)})}{i}$, the .key[Equal Error Rate (EER)] is the value of FPR (and FNR) for the $\\tau$ value for which $\\text{FPR}=\\text{FNR}$.

For EER: **the lower, the better** (like error); codomain is $[0,1]$ .note[in practice $[0,0.5]$]

.cols[
.c50[
.center.w100p[![Example of EER](images/eer.png)]
<!--
d %>% pivot_longer(c(FPR,FNR)) %>% ggplot(aes(x=tau,y=value,color=name)) + geom_line() + geom_hline(yintercept = 0.186)+geom_vline(xintercept=0.65,linetype="dashed")
-->
]
.c50[
- for $\\tau=0.65$ (vertical dashed line), $\\text{FPR}=\\text{FNR}$
- $\\text{EER}\\approx 19\%$ (horizontal solid line)
]
]

---

## The ROC curve

For a model $m$ and a dataset $\\seq{(x^{(i)},y^{(i)})}{i}$ and a sequence $(\\tau\_i)\_i$, the .key[Receiver operating chracteristic¹ (ROC)] curve is the plot of $\\text{TPR}$ ($= 1-\\text{FNR}$) vs. $\\text{FPR}$ for the different values of $\\tau \\in (\\tau\_i)\_i$.

.cols[
.c30[
.center.w100p[![Example of EER](images/roc.png)]
<!--
d$FPR[1]=1
d$FNR[11]=1
d$FPR[11]=0
d %>% ggplot(aes(x=FPR,y=1-FNR)) + geom_line(color="red") + xlim(c(0,1))+ylim(c(0,1)) + geom_abline(intercept=0, slope=1, linetype="dashed") + geom_abline(intercept=1, slope=-1, linetype="solid")
-->
]
.c70[
- red line: ROC curve
  - each point stays at $(\\text{FPR},\\text{TPR})$ for a given $\\tau$
- solid black line: points for which $\\text{FPR}=\\text{FNR}$
  - the $x$-coord of the intersection with the red line is $\\text{EER}$
  - point at top-left ($\\text{FPR}=\\text{FNR}=0$) is the **perfect classifier**
- the intersection of dashed and solid black lines is at $\\text{FPR}=\\text{FNR}=0.5$
  - it is the **random classifier**
- points on the dashed line are random classifiers with $\\tau \\ne 0.5$
  - a healthy classifier ROC should **never stay on the right of the dashed line**!
]
]


.footnote[
1. The name comes from its usage as a graphical tool for assessing radar stations during WW2.
]

---

## Area Under the Curve (AUC)

For a model $m$ and a dataset $\\seq{(x^{(i)},y^{(i)})}{i}$ and a sequence $(\\tau\_i)\_i$, the .key[Area Under the Curve (AUC)] is the area under the ROC curve.

For AUC: **the greater, the better** (like accuracy); codomain is $[0,1]$ .note[in practice $[0.5,1]$]

.cols[
.c30[
.center.w100p[![Example of EER](images/auc.png)]
<!--
d %>% ggplot(aes(x=FPR,y=1-FNR)) + geom_line(color="red") + geom_area(fill="red",alpha=0.25) + xlim(c(0,1))+ylim(c(0,1)) + geom_abline(intercept=0, slope=1, linetype="dashed") + geom_abline(intercept=1, slope=-1, linetype="solid")
-->
]
.c70[
- for the **random classifier**, $\\text{AUC}=0.5$
- for the **ideal classifier**, $\\text{AUC}=1$
]
]

<!--
- what tau values for plottin the ROC curve
- cost of the errors and indexes
- f1 score
- summary
- example of tables from papers


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
