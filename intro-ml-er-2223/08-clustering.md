class: middle, center

# Unsupervised learning

## Clustering

---

## Context

.important[
.key[Machine Learning] is the science of getting computers to learn without being explicitly programmed.
]

.cols[
.c50[
.center[$\\downarrow$]

.key[Supervised (Machine) Learning] is the science of getting computers to learn $f: X \\to Y$ from examples autonomously.
]
.c50[
.center[$\\downarrow$]

.key[Unsupervised (Machine) Learning] is the science of getting computers to learn **patterns from data** autonomously.
]
]

---

## Unsupervised learning definition

.important[
.key[Unsupervised (Machine) Learning] is the science of getting computers to learn **patterns from data** autonomously.
]

.vspace1[]

What's a **pattern**?
- .dict-def[*pattern \[ˈpat(ə)n\]*: a model or design used as a guide in needlework and other crafts]

In practice:
- we assume that the system that generates the data **follows some scheme** (the pattern)
- we do not know the pattern
- we want to **discover the patter from a dataset**

---

## Supervised vs. unsupervised

.cols[
.c50[
.key[Supervised (Machine) Learning] is the science of getting computers to learn $f: X \\to Y$ from examples autonomously.
]
.c50[
.key[Unsupervised (Machine) Learning] is the science of getting computers to learn **patterns from data** autonomously.
]
]

.vspace1[]

**Key differences**

.cols[
.c50[
- $y$ is a property of $x$
- one example is a pair $(x,y)$
- what we learn from a dataset can be applied to other $x$
]
.c50[
- the pattern is a property of the system $s$
- *the example* is the dataset $\\mathcal{P}^*(X)$
- what we learn from the dataset is not, in general, usable on another dataset
  - hence, "**find** patterns from data" is fairer than "**learn** patterns from data"
]
]
