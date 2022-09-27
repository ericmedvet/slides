class: middle, center

# Basic concepts

---

## What is Machine Learning?

- main def, highlight parts of definitions (science, computer, learn, without being explicitly programmed)
- one single example (spam)
- what does the def mean in practice? -> introduce decision

---

## Making a decision

- *problem*, *problem instance*, *solution*
- formalism showing input and output (maybe later show connection between math formalism and code, in java/python/r)
- machine as executor of predict
- who writes the function predict? machine also in that part
- sketch of optimization problem
- search space and objective of optimization, broadly
- humans as optimizers
- other secondary objectives (cost, interpretability/explainability)

---

## Why ML?

- when to use ML?
- ML as a universal tool: plots on usage and interest

---

## Supervised vs. unsupervised learning

- *examples* as supervision
- formal notation of dataset
- *observation/data point/instance/input*, *response/label/dependent variable*

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
