class: middle, center
name: challenges

# Challenges
### SPECIES Summer School 2024

[Eric Medvet](http://medvet.inginf.units.it/)

.vspace1[]

Moraira (Spain)

August, 27th 2024

.vspace1[]

.note[[Lecture 1](#lecture-1), [Lecture 2](#lecture-2), [Lecture 3](#lecture-3), [Challenges](#challenges)]

---

## Challenge 1: multi-cell MAP-Elites

**Context**:
- MAP-Elites is a popular algorithm for doing *quality-diversity* search, i.e., when one not only looks for good solutions, but also for diverse solutions

**Gap**:
- MAP-Elites is slow because of the low evolutionary pressure (cost of diversity)
- each descriptor by design captures one single feature

**Proposal**:
- use descriptors with sets (of quantitative **traits**) as output, instead of one single quantity:
  - $d\_i: S \\to \\mathcal{P}(\mathbb{R})$ with $i \\in \\{1, \\dots, p\\}$, usually $p=2$
  - or $d: S \\to \\mathcal{P}(\mathbb{R}^p)$
- each solution competes for (possibly) several archive cells at once
  - greater/faster coverage, but lower diversity
  
---

### Steps to goal

1. (re)check the **literature** for novelty
2. problem statement (*easy!*)
3. **design the experiments**
  - what to measure (better effectiveness? better efficiency? better coverage?)
  - what baseline (likely, normal MAP-Elites, but look for relevant existing variants)
  - what problems (2D navigation is a good candidate)
4. **implement** the EA
  - [Python](https://github.com/adaptive-intelligent-robotics/QDax/tree/main)
  - [Java](https://github.com/ericmedvet/jgea/tree/develop) (I am the documentation)
  - other
  - everything from scratch
5. do the experiments and possibly reiterate
6. **write and submit**!

---

### Relevant pointers

- .ref[Flageat, Manon, and Antoine Cully. "Uncertain quality-diversity: evaluation methodology and new methods for quality-diversity in uncertain domains." IEEE Transactions on Evolutionary Computation (2023)]

---

## Challenge 2: location-based adaptive fitness function

**Context**:
- often the fitness/quality function $f$ is very **costly to compute**
- there are (many) cases where you can vary the cost of computation of $f$, at the expenses of the precision (**fidelity**)
  - e.g., number of data points in supervised learning (symbolic regression)
  - e.g., simulation length in simulated evolutionary robotics 

**Narrow context**:
- there are many approaches for changing the **fidelity** $\\rho$ of $f$ during an EA run
  - fixed schedule
  - adaptive schedule, based on some population-wise metric

**Proposal**:
- propose an adaptive schedule for $\\rho$ which is based **also on the location $\\ell$ of the solution** $s$
  - intuitively, low precision for first explorations of new regions of the search space
- how to have location in $S$? with MAP-elites! .note[there are alternatives]

---

### Steps to goal

1. (re)check the **literature** for novelty
  - **key step** as this is a pretty old topic (keywords: *surrogate fitness function*, *multi-fidelity*, w/ *adaptive*)
2. problem statement (*easy!*)
3. **design the experiments**
  - what to measure (better effectiveness? better efficiency?)
  - what baselines (likely, $\\rho\\sub{\\ell}^{(k)}=1$, $\\rho\\sub{\\ell}^{(k)}$ depends only on $k$)
  - what problems (symbolic regression is a good candidate)
4. **implement** the EA
  - [Python](https://github.com/adaptive-intelligent-robotics/QDax/tree/main)
  - [Java](https://github.com/ericmedvet/jgea/tree/develop) (I am the documentation)
  - other
  - everything from scratch
5. do the experiments and possibly reiterate
6. **write and submit**!

### Relevant pointers

- .ref[Wang, Handing, Yaochu Jin, and John Doherty. "A generic test suite for evolutionary multifidelity optimization." IEEE Transactions on Evolutionary Computation 22.6 (2017): 836-850.]
- .ref[Fernández-Godino, M. Giselle. "Review of multi-fidelity models." arXiv preprint arXiv:1609.07196 (2016).]

