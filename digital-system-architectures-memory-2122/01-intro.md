class: middle, center

# Digital System Architectures
## 141IN (last 3 CFU part)

[Eric Medvet](http://medvet.inginf.units.it/)

A.Y. 2021/2022

---

## Lecturer

Eric Medvet
- Associate Professor of Computer Engineering at [Departmenet of Engineering and Architecture](https://dia.units.it/), [University of Trieste](https://www.units.it/)
- Online at: [medvet.inginf.units.it](http://medvet.inginf.units.it/)

Research interests:
- Evolutionary Computation
- Machine Learning applications
- Embodied intelligence

Labs:
- [Evolutionary Robotics and Artificial Life lab](https://erallab.inginf.units.it/)
- [Machine Learning lab](https://machinelearning.inginf.units.it/)

---

## Materials

Teacher's slides:
- available [here](https://medvet.inginf.units.it/teaching/2122-digital-system-architectures/)
- might be updated during the course

Intended usage:
- slides should contain every concept that has to be taught/learned
- **but**, slides are designed for consumption during a lecture, they might be suboptimal for self-consumption $\Rightarrow$ **take notes!**

Teacher's slides are based on :
- Patterson, David A., and John L. Hennessy. *Computer organization and design ARM edition: the hardware software interface*. Morgan kaufmann, 2016.

---

## Exam

Written test with questions and short open answers

---

## Course content

In brief:
1. Cache
2. Virtual memory

.note[See the [syllabus](https://medvet.inginf.units.it/teaching/2122-digital-system-architectures/)!]

---

class: middle, center

# Memory: does it matter?

---

## Registers and memory

Processor operates on data through instructions:
- instructions operate on registers
- when needed, **load** (*read*) data from memory to registers
- when needed, **store** (*write*) data from registers to memory

Loads and stores take time!

Overall, how long?
- depends on **number** of operations
- depends on **duration** of single operation

---

## Load/store: how many? (number)

C:
```C
float fahreneit2celsius(float f) {
  return ((5.0 / 9.0 ) * (f - 32.0));
}
```

LEGv8:
```Assembly
LDURS S16, [X27, const5]  ; S16 = 5.0 (5.0 in memory)
LDURS S18, [X27, const9]  ; S18 = 9.0 (9.0 in memory)
FDIVS S16, S16, S18       ; S16 = 5.0 / 9.0
LDURS S18, [X27, const32] ; S18 = 32.0
FSUBS S18, S12, S18       ; S18 = f – 32.0
FMULS S0, S16, S18        ; S0 = (5/9)*(fahr – 32.0)
BR LR                     ; return
```

3 loads (`LDURS`); might be 2 with compiler optimizations

---

### More complex case

```C
// 32x32 matrices
void matrixMult (double c[][], double a[][], double b[][]) {
  int i, j, k;
  for (i = 0; i < 32; i = i + 1) {
    for (j = 0; j < 32; j = j + 1) {
      for (k = 0; k < 32; k = k + 1) {
        c[i][j] = c[i][j] + a[i][k] * b[k][j];
      }
    }
  }
}
```

Many more loads and stores!

---

## Load/store: how long? (duration)

Depends on the memory technology:

| Type | Access time [ns] | Cost [$/GB] |
| - | - | - |
| SRAM | 0.5–2.5 | 500–1000 |
| DRAM | 50–70 | 10–20 |
| Flash | 5000–50000 | 0.75–1.00 |
| Magnetic disk | 5000000–20000000 | 0.05–0.10 |

Recall: 1 CPU cycle takes $\approx$ 1 ns

.note[Data from 2012]

.note[We'll see more later]

---

## Goal

**Goal**: process more data, faster, cheaper

Ideally, we want to minimize overall time spent accessing memory.

We can work on:
1. number of accessess (depends *mainly* on the **code**)
2. duration of each access

How?
1. write better (optimized)
2. use faster memory?

➝ access time/cost trade-off!

---

## Guy at the library

.center[
![German National Library](images/library.jpg)
]

A guy is doing some research about some topic.
Needs to:
- take a book from shelf (long walk)
- read some part
- put back the book on shelf (long walk)

How to work **faster**?

---

### Library ⇿ computer

- Book ⇿ data
- Shelf ⇿ "main" (farther) memory
- Desk ⇿ "local" (closer) memory
- Guy ⇿ processor

---

## Idea: two memories

Suppose to have:
- close memory $M_1$: small, fast access
- large memory $M_2$: large, slow access

Whenever you look for data item $x$:
- if in $M_1$, take it from there
- otherwise
  - take it from $M_2$
  - put it in $M_1$ (freeing some space, if needed)

**Useful** if you **soon** access again $x$

.note[$x$ is the address of the data item]
.note["look for" means load/read; we'll see store/write later]

---

## Better idea

Whenever you look for data item $x$:
- if in $M_1$, take it from there
- otherwise
  - take $(\dots, x-2, x-1, x, x+1, x+2, \dots)$ from $M_2$
  - put *them* in $M_1$ (freeing *more* some space, if needed)

**Useful** if you **soon** access again $x$ or something **close** to $x$!

---

## Locality principle

**Useful** if you **soon** access again $x$ or something **close** to $x$!

**Temporal locality**: if a data location $x$ is accessed at $t$, it will be likely accessed again **soon** (at some $t+ \delta t$)

**Spatial locality**: if a data location $x$ is accessed at $t$, data locations **close** to $x$ (some $x+ \delta x$) will be likely accessed again soon

.question[How to exploit spatial locality at the library? What's the assumption?]

---

## Localities in action

.cols[

.c60[
```C
float findAvgDiff (
  float[] a, float[] b, int n
) {
  float aSum = 0;
  float bSum = 0;
  int i;
  for (i = 0; i < n; i = i + 1) {
    aSum = aSum + a[i];
  }
  for (i = 0; i < n; i = i + 1) {
    bSum = bSum + b[i];
  }
  return (aSum - bSum) / n;
}
```

.question["Where" in this representation is spatial locality? "where" is temporal locality?]
]

.c40[
.cp2-1[●] `a`, .cp2-2[●] `b`, .cp2-3[●] `n` (=3), .cp2-4[●] `aSum`, .cp2-5[●] `bSum`, .cp2-6[●] `i`

Accesses (simplified):
.mem.vdenser[
.cp2-1[···].cp2-2[···].cp2-3[·].cp2-4[w].cp2-5[·].cp2-6[·]  
.cp2-1[···].cp2-2[···].cp2-3[·].cp2-4[·].cp2-5[w].cp2-6[·]  
.cp2-1[···].cp2-2[···].cp2-3[·].cp2-4[·].cp2-5[·].cp2-6[w]  
.cp2-1[···].cp2-2[···].cp2-3[r].cp2-4[·].cp2-5[·].cp2-6[·]  
.cp2-1[···].cp2-2[···].cp2-3[·].cp2-4[·].cp2-5[·].cp2-6[r]  
.cp2-1[r··].cp2-2[···].cp2-3[·].cp2-4[·].cp2-5[·].cp2-6[·]  
.cp2-1[···].cp2-2[···].cp2-3[·].cp2-4[r].cp2-5[·].cp2-6[·]  
.cp2-1[···].cp2-2[···].cp2-3[·].cp2-4[w].cp2-5[·].cp2-6[·]  
.cp2-1[···].cp2-2[···].cp2-3[r].cp2-4[·].cp2-5[·].cp2-6[·]  
.cp2-1[···].cp2-2[···].cp2-3[·].cp2-4[·].cp2-5[·].cp2-6[r]  
.cp2-1[···].cp2-2[···].cp2-3[·].cp2-4[·].cp2-5[·].cp2-6[r]  
.cp2-1[···].cp2-2[···].cp2-3[·].cp2-4[·].cp2-5[·].cp2-6[w]  
.cp2-1[···].cp2-2[···].cp2-3[·].cp2-4[·].cp2-5[·].cp2-6[r]  
.cp2-1[·r·].cp2-2[···].cp2-3[·].cp2-4[·].cp2-5[·].cp2-6[·]  
.cp2-1[···].cp2-2[···].cp2-3[·].cp2-4[r].cp2-5[·].cp2-6[·]  
.cp2-1[···].cp2-2[···].cp2-3[·].cp2-4[w].cp2-5[·].cp2-6[·]  
.cp2-1[···].cp2-2[···].cp2-3[r].cp2-4[·].cp2-5[·].cp2-6[·]  
.cp2-1[···].cp2-2[···].cp2-3[·].cp2-4[·].cp2-5[·].cp2-6[r]  
.cp2-1[···].cp2-2[···].cp2-3[·].cp2-4[·].cp2-5[·].cp2-6[r]  
.cp2-1[···].cp2-2[···].cp2-3[·].cp2-4[·].cp2-5[·].cp2-6[w]  
.cp2-1[···].cp2-2[···].cp2-3[·].cp2-4[·].cp2-5[·].cp2-6[r]  
.cp2-1[··r].cp2-2[···].cp2-3[·].cp2-4[·].cp2-5[·].cp2-6[·]  
.cp2-1[···].cp2-2[···].cp2-3[·].cp2-4[r].cp2-5[·].cp2-6[·]  
.cp2-1[···].cp2-2[···].cp2-3[·].cp2-4[w].cp2-5[·].cp2-6[·]  
...
]
]

]


---

## More than one level: memory hierarchy

Instead of just two memories $M_1$ (fast and small) and $M_2$ (large and slow), a **hierarchy of memories**:
- CPU
- $M_1$: closest to CPU, fastest, smallest
- $M_2$: a bit farther, a bit slower, a bit larger
- $M_3$: a bit farther, a bit slower, a bit larger
- ...
- $M_k$: far, slow, large

---

## Memory hierarchy

- $M_1$: closest to CPU, fastest, smallest
- ...
- $M_k$: far, slow, large

Pros:
- **size** of $M_k$ (the largest)
- (almost) **access time** of $M_1$ (the closest)
- the overall **cost** is much lower than a $M$ with the size of $M_k$ and the access time of $M_1$ (ideality)

Cons:
- need to implement the access algorithm **within** the CPU/system

---

## Cache

The memory hierarchy is a *pattern*, a scheme of solution for a common problem

Other cases:
- local copy of network data
- storing of complex computation results
- physical memory

Common name for the closer memory: **cache**
