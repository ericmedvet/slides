class: middle, center

# Authoring a pretty looking paper: practical tips and tricks
### SPECIES Summer School 2024

[Eric Medvet](http://medvet.inginf.units.it/)

.vspace1[]

Moraira (Spain)

August, 30th 2024

---

## Key premise!

.important[
Here:
- **personal** advices, based on my **personal** experience
- not a set of **rules** 
- there are many other points of views/advices, **sometimes conflicting** with mines
]

.vspace1[]

However:
- many of these advices are widely accepted and can be seen as expectations
- I (or someone like me) might be on the *other side*

.footnote[A web version of these advices is available on [my website](https://medvet.inginf.units.it/teaching/how-to-write)]

---

## Goals and pre-requisites

Ultimate goal: 
1. **please your reader**, by making your paper **pretty and enjoyable** from many points of view: .note[in descending order of granularity]
  - general structure
  - language
  - typography
2. and **yourself (and co-authors)**, by making your paper .note[and your research pipeline] **easier to maintain** and its production more **efficient**:
  - LaTeX constructs and packages
  - LaTeX source code style

.vspace1[]

Pre-requisites:
- basic knowledge of LaTeX

---

### Your readership

Who's that?
- other **scientists/researchers**:
  - they want to understand/enjoy your paper, maybe specific parts (algorithm, experiments, results, motivation, ...)
- **reviewers**
  - they want to ~~reject~~ understand your paper, but actually they are looking for defects, issues, reasons to complain
  
---

class: middle, center

## General structure

---

## Abstract

1. One or two sentences presenting the **general context** (e.g., robotics).
2. One or two sentences presenting the more **specific context** (e.g., design of controllers for modular robots).
3. One sentence, possibly *bold*, saying what is the current **gap, problem, or limitation**.
4. A few sentences introducing the **proposal of the paper**, clearly connecting them to the gap/problem/limitation of the previous sentence.
This part of the abstract usually starts with _In this paper, we propose..._.
5. One or two sentences mentioning the **experimental evaluation** of the proposal, possibly detailing (briefly!) the peculiarities of the experiments and anticipating the salient results.
6. Optionally (but nice to have!) one sentence attempting to summarize the **broader impact** of the research, beyond the specific context.

.note[Different communities might have different expectations]

---

### Example 1 .note[from [this paper](https://medvet.inginf.units.it/publications/2023-c-mpm-general/)]

.cols[
.c30[
1. .col1[general context]
2. .col2[specific context]
3. .col3[gap, problem, limitation]
4. .col4[proposal of the paper]
5. .col5[experimental evaluation]
6. .col6[broader impact]
]
.c70.compact[
.ttt[
.col1[Graphs are a way to describe complex entities and their relations that apply to many practically relevant domains.]
.col2[However, domains often differ not only in the properties of nodes and edges, but also in the constraints imposed to the overall structure.]
.col3[This makes hard to define a general representation and genetic operators for graphs that permit the evolutionary optimization over many domains.]
.col4[In this paper, we tackle this challenge. We first propose a representation template that can be customized by users for specific domains: the constraints and the genetic operators are given in Prolog, a declarative programming language for operating with logic. Then, we define an adaptive evolutionary algorithm that can work with a large number of genetic operators by modifying their usage probability during the evolution: in this way, we relieve the user from the burden of selecting in advance only operators that are “good enough”.]
.col5[We experimentally evaluate our proposal on two radically different domains to demonstrate its applicability and effectiveness: symbolic regression with trees and text extraction with finite-state automata. The results are promising: our approach does not trade effectiveness for versatility and is not worse than other domain-tailored approaches.]
]]
]

---

### Example 2 .note[from [this paper](https://medvet.inginf.units.it/publications/2023-j-pbscsrmm-deep/)]

.cols[
.c30[
1. .col1[general context]
2. .col2[specific context]
3. .col3[gap, problem, limitation]
4. .col4[proposal of the paper]
5. .col5[experimental evaluation]
6. .col6[broader impact]
]
.c70.compact[
.ttt[
.col1[The recent and rapid progresses in Machine Learning (ML) tools and methodologies paved the way for an accessible market of ML services.]
.col2[In principle, small and medium-sized enterprises, as well as big companies, could act as providers and consumers of services, resulting in an intense exchange of ML services where a consumer may ask many providers for a service preview based on its particular business case, that is, its data.]
.col3[In practice, however, many potential service consumers are reluctant to release their data, when seeking for ML services, because of privacy or intellectual property concerns. As a consequence, the market of ML services is not as fluid as it could be. An alternative to providing real data when looking for an ML service consists in generating and releasing synthetic data. The synthetic data should (a) allow the service provider to preview an ML service whose performance is predictive of the one the same service will achieve on the real data and (b) prevent the disclosure of the real data.]
.col4[In this paper, we propose a data synthesis technique tailored to a family of very relevant business cases: supervised and unsupervised learning on single-table datasets and relational datasets. Our technique is based on generative deep learning models and we instantiate it in three variants: standard Variational Autoencoders (VAEs), beta-VAEs, and Introspective VAEs.]
.col5[We experimentally evaluate the two variants to measure the degree to which they meet the two requirements above, using several performance indexes that capture different aspects of the quality of the generated data.]
.col6[The results suggest that data synthesis is a practical answer to the need of decoupling ML service providers and consumers and, hence, can favor the arising of an active and accessible market of ML services.]
]]
]

---

### Example 3 .note[from [this paper](https://arxiv.org/abs/2406.09787)]

.cols[
.c30[
1. .col1[general context]
2. .col2[specific context]
3. .col3[gap, problem, limitation]
4. .col4[proposal of the paper]
5. .col5[experimental evaluation]
6. .col6[broader impact]
]
.c70.compact[
.ttt[
.col1[Biological neural networks are characterized by their high degree of plasticity, a core property that enables the remarkable adaptability of natural organisms.]
.col2[Importantly, this ability affects both the synaptic strength and the topology of the nervous systems.]
.col3[Artificial neural networks, on the other hand, have been mainly designed as static, fully connected structures that can be notoriously brittle in the face of changing environments and novel inputs.]
.col4[Building on previous works on Neural Developmental Programs (NDPs), we propose a class of self-organizing neural networks capable of synaptic and structural plasticity in an activity and reward-dependent manner which we call Lifelong Neural Developmental Program (LNDP). We present an instance of such a network built on the graph transformer architecture and propose a mechanism for pre-experience plasticity based on the spontaneous activity of sensory neurons.]
.col5[Our results demonstrate the ability of the model to learn from experiences in different control tasks starting from randomly connected or empty networks.]
.col6[We further show that structural plasticity is advantageous in environments necessitating fast adaptation or with non-stationary rewards.]
]]
]

---

## Tenses and sections

.cols[
.c20[
**Where**¹

Abstract  
Introduction
]
.c30[
**Tense**

Present tense
]
.c50[
**Examples**

.ttt[We propose...]  
.ttt[Current techniques have this limitation...]
]
]

.cols[
.c20[
Related works
]
.c30[
Past tense
]
.c50[
.ttt[Smith et al. proposed...]  
.ttt[revious works showed that...]
]
]

.cols[
.c20[
Problem statement  
Our approach
]
.c30[
Present tense
]
.c50[
.ttt[Let $x$ be...]  
.ttt[We repeat the following procedure $n$ times...]
]
]

.cols[
.c20[
Experimental evaluation
]
.c30[
Past (for what you did) and present (for comments) tense
]
.c50[
.ttt[We considered four datasets...]  
.ttt[We repeated the learning three times...]  
.ttt[Figure 3 shows the results of...]  
.ttt[We explain this gap in performance with...]
]
]

.cols[
.c20[
Conluding remarks
]
.c30[
Past (for recap) and future (for "promises") tense
]
.c50[
.ttt[We considered the problem of...]  
.ttt[We showed that...]  
.ttt[We will extend the approach to...]
]
]

.footnote[
1. titles may be different
]

---

class: middle, center

## Language

---

## Use active voice

.center[.key[Use active voice!]]

It makes clear who is the actor/author of an action/claim, i.e., who is responsible
- .ttt[We did something...]
- .ttt[The algorithm works as follows: it initializes a set of..., it selects one...]
- .ttt[Smith et al. showed that...]

.vspace1[]

.cols[
.c50[
#### ✅ Good

- .ttt[**We run** BO for $20$ iterations and use the best $\eta$ seen during optimization as the final output.]
- .ttt[To check the validity of the dimensionality reduction method used in our visualization methods, **we randomly selected** ten ideas (three about audio devices, three about transportation, two about music players, and two about cameras) and obtained their locations in Fig. 2 (Table II).]
]
.c50[
#### ❌ Bad

- .ttt[Various measures **are derived** from the concepts and validated in two experiments that highlight their strengths and weaknesses.] By whom? Who did the experiments?
- .ttt[Damage type 0 **was chosen** as it is similar to damage inflicted on the robot in other damage recovery research...] By whom? Who is accountable for this choice?
]

]

---

## Contracted forms

**Avoid contracted forms**
They are suitable for informal discourse
- ✅ **Good**: .ttt[is not], .ttt[does not], .ttt[cannot], .ttt[we will do]
- ❌ **Bad**: .ttt[isn't], .ttt[doesn't], .ttt[can't], .ttt[we'll do]

Unless, in trouble with text lenght, use parsimonously:
- .ttt[w.r.t.] for .ttt[with respect to]
- .ttt[approx.] for .ttt[approximatively]

If you use them, do it **consistently**, i.e., either always or never!

---

## Acronyms

Use acronyms for very frequent technical terms, e.g.:
- .ttt[GP] for .ttt[genetic programming]
- .ttt[FPR] for .ttt[false positive rate]

In general:
- expanded version with acronym at the **first usage**
  - .ttt[We use genetic programming (GP) for optimizing...]
- acronym only at **every subsequent usage**
  - .ttt[Figure 2 shows that GP performs better than...]

... with some exceptions:
- if term is used only once in the abstract, show just the expanded version in the abstract
- reintroduce expanded+acronym at first usage after abstract
- (possibly) reintroduce expanded+acronym at first usage in conclusions
- (possibly) use expanded+acronym if in section title

---

### Capitalization and articles

Be **consistent** with capitalization:
- ✅ **Good**: .ttt[Genetic Programming (GP)] and .ttt[False Positive Rate (FPR)]
- ✅ **Good**: .ttt[genetic programming (GP)] and .ttt[false positive rate (FPR)]
- ❌ **Bad**: .ttt[Genetic Programming (GP)] and .ttt[false positive rate (FPR)]

... but caring about special cases:
- .ttt[Smith’s sorting algorithm (SSA)] even with .ttt[genetic programming (GP)]

.vspace1[]

Use proper article, if any, before:
- **expanded**, the proper one
  - .ttt[we employ **a** multilayer perceptron (MLP)]
- **acronym**, the one used if you pronounce the letters
  - .ttt[we employ **an** MLP]

---

### How?

A lot of things to care about for acronyms .note[the what]

.vspace1[]

🤔 How to do that? .note[the how]
- "easy", with the proper LaTeX package (later)

---

## British vs. American English

🇺🇸: .ttt[color], .ttt[behavior], .ttt[focused], .ttt[labeled], ...

🇬🇧: .ttt[colour], .ttt[behaviour], .ttt[focussed], .ttt[labelled], ...

.note[this is just about basic differences]

.vspace1[]

Choose one and use it **consistently**.
- exploit your authoring tool (e.g., Overleaf with spell checking and language setting)

---

## Possessive case

.center[to .ttt['s] or not to .ttt['s]?]

In theory:
- .ttt['s] with:
  - **people** (both proper and common names): ✅ .ttt[the user's preference], ✅ .ttt[Smith's sorting algorithm], ✅ .ttt[the authors' opinion]
  - (some) physical places (cities, countries) .note[usually not relevant in papers]
  - (some) temporal adverbs: ✅ .ttt[today's meeting]
- no .ttt['s] elsewhere
  - ✅ .ttt[the algorithm complexity], ❌ .ttt[the algorithm's complexity]
  - same for .ttt[policy], .ttt[genotype], ...

.vspace1[]

Many corner cases:
- 🤔 .ttt[individual]
- 🤔 .ttt[robot]
- 🤔 .ttt[agent]

---

class: middle, center

## Language

---

## I.e. and e.g.

- .ttt[i.e.] stays for .ttt[*id est*] (latin for .ttt[that is])
- .ttt[e.g.] stays for .ttt[example given]

For both:
- **a comma before and a comma after**
  - ✅ .ttt[we increase $i$, i.e., the counter]
  - ❌ .ttt[we increase $i$, i.e. the counter] .note[missing the comma after also trigger a space "rendering" problem, see later]
  
For i.e.:
- since it is latin, possibly show it in alternative font, i.e., italics:
  - ✅ .ttt[we increase $i$, *i.e.*, the counter]
  
---

## Dashes

There are three dashes:
- **hyphen** - (`-` in LaTeX), for **composed words**
  - without spaces before and after
  - if you use two similar composed works close to each other, you can shorten one: .ttt[we tested an MLP- and a random-based controller...]
- **en-dash** – (`--` in LaTeX), for ranges: .ttt[$25\text{--}35$]
  - possibly rely on proper LaTeX packages .note[later] for ranges
- **em-dash** — (`---` in LaTeX), for parenthetical thought (**asides**)
  - without spaces before and after: .ttt[We tested this approach with an MLP—we also experimented with other kinds of controller with no qualitative different findings.]

---

## Oxford comma

A pretty **popular** matter:
.cols[
.c50.center[
.h25ex.center[![Use Oxford comma!](images/oxford-meme-main.jpg)]
]
.c50.center[
.h25ex.center[![Oxford comma meme with rhinos](images/oxford-meme-rhino.jpg)]
]
]







