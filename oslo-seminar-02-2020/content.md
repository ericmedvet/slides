class: middle, center

# Voxel-based Soft Robots
## A platform for investigating Learning, Evolution, and Everything

[Eric Medvet](http://medvet.inginf.units.it/), University of Trieste

11/12/2020, Simula@OsloMet

---

## Agenda

1. **What** are Voxel-based Soft Robots (VSRs)?
2. Do they actually **exist**?
3. How to **design** them?
4. What's next, from a **research** perspective?

---

## Who/what/where am I?

Associate Professor of **Computer Engineering**, University of Trieste, Italy

.cols[
.fifty[
.center[
University of Trieste

.h10ex[![University of Trieste](imgs/units.jpg)]
]
- almost all disciplines
  - 30+34+11 degree programs
- ≈16k students (7% foreign)
- ≈300 PhDs (11% foreign)
- 401-500 THE [ranking](https://www.units.it/ranking)
  - 8th in Italy
]
.fifty[
.center[
Trieste, Italy

.h10ex[![Piazzà Unità](imgs/trieste.jpg)]
.h10ex[![Trieste in Italy](imgs/trieste-map.png)]
]
- ≈200k population
- 2 universities, many other institutions
  - 37 researchers on 1000 pers.
- high life quality
  - 6th in Italy
  - great coffee!
]
]

---

## Who/what/where am I?

.cols[
.fifty[
.center[.h10ex[![Machine Learning lab](imgs/logo-male.png)]]

Co-head, co-founder, since ≈10y

Research topics:
- applications of ML:
  - computer/web security
  - information extraction
- evolutionary computation and applications
  - genetic programming & grammatical evolution
  - regular expressions
]
.fifty[
.center[.h10ex[![Evolutionary Robotics and Artificial Life lab](imgs/logo-eral.png)]]

Head, founder, since ≈1y

Research topics:
- evolutionary robotics
- social learning (with evo)
- multi-agent systems
]
]

---

class: middle, center

# *What* are VSRs?

---

## Hi! I'm a VSR!

.center[![An example VSR](imgs/vsr-def-example.png)]

VSR:
- **aggregation** of many soft blocks (_voxels_)
- voxels can change their **volume**
- **behavior** determined by interaction of volumes change

.footnote[Image from .ref[Kriegman, Sam, et al. "[Simulating the evolution of soft and rigid-body robots](https://dl.acm.org/doi/abs/10.1145/3067695.3082051)." Proceedings of the Genetic and Evolutionary Computation Conference Companion. 2017.]]

---

## Look! I am alive!

.center[<iframe width="560" height="315" src="https://www.youtube.com/embed/Ee2sU-AZWC4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>]

.footnote[Video from .ref[Kriegman, Sam, Nick Cheney, and Josh Bongard. "[How morphological development can guide evolution](https://www.nature.com/articles/s41598-018-31868-7)." Scientific reports 8.1 (2018): 1-10.]]

---

## Why relevant?

- Soft-robotics
- Embodied cognition
- Lifelike behaviors
- Modularity

---

### Soft-Robotics

.cols[
.fifty[
.center[.w50p[![VSR escaping from tight space](imgs/tight-spaces.png)]]]
.fifty[
.center[.w50p[![Continuous material](imgs/material-continuous.png)]]]
]

- Infinite degrees of freedom: soft robots can solve tasks that are hard for rigid Robots
- VSRs as materials with contiuous properties

.footnote[Left from .ref[Cheney, Nick, Josh Bongard, and Hod Lipson. "[Evolving soft robots in tight spaces](https://dl.acm.org/doi/abs/10.1145/2739480.2754662)." Proceedings of the 2015 annual conference on Genetic and Evolutionary Computation. 2015.]
Right from .ref[Hiller, Jonathan, and Hod Lipson. "[Automatic design and manufacture of soft robots](https://ieeexplore.ieee.org/abstract/document/6096440)." IEEE Transactions on Robotics 28.2 (2011): 457-466.]]

---

### Embodied cognition paradigm

> "both bodies and brains combine to produce complex behaviors, in contrast to the traditional view that the only seat of intelligence is the brain"

In VSRs, much more in the bodies than in the brains
- many *simple* behaviors result in a *complex* behavior
- the intelligence is in how they combine, which is more related to the body than to the brain

.footnote[Quote rom .ref[Pfeifer, Rolf, and Josh Bongard. [How the body shapes the way we think: a new view of intelligence](https://books.google.it/books?id=EHPMv9MfgWwC&lpg=PR7&ots=WVTQlU_gwv&lr&hl=it&pg=PR7#v=onepage&q&f=false). MIT press, 2006.]]

---

### Lifelike behaviors

.center[.w50p[![Electrical wave propagation in cardiac modeling](imgs/heart.png)]]

VSRs as a gym for studying/reproducing (artificial) life (**alife**!)
- for specific mechanisms at different time scales
- for curiosity *alone*

.footnote[Image from .ref[Fenton, Flavio H., et al. "[Modeling wave propagation in realistic heart geometries using the phase-field method](https://aip.scitation.org/doi/abs/10.1063/1.1840311)." Chaos: An Interdisciplinary Journal of Nonlinear Science 15.1 (2005): 013502.]]

---

### Modularity

.cols[
.fifty[
VSRs emply fine-grained modularity
- re-usability
- redundancy, robustness
- more practical realization
  - robotic reproduction?
]
.fifty[.center[![Autonomous Robot Evolution environment](imgs/robot-factory.png)]]
]

.footnote[Image from .ref[Hale, Matthew F., et al. "[The ARE Robot Fabricator: How to (Re) produce Robots that Can Evolve in the Real World](https://www.mitpressjournals.org/doi/abs/10.1162/isal_a_00147)." The 2018 Conference on Artificial Life: A Hybrid of the European Conference on Artificial Life (ECAL) and the International Conference on the Synthesis and Simulation of Living Systems (ALIFE). One Rogers Street, Cambridge, MA 02142-1209 USA journals-info@ mit. edu: MIT Press, 2019.]]

---

## And in practice...

.center[modularity + re-usability + effectivenss = ?]

E.g., disaster response:
1. have a bag of voxels, empty it at disaster site
2. voxels assemble and form a VSR suitable for task/site
3. VSR does the work
4. collect, dissassemble, put in bag

What do we still miss for doing that?

---

class: middle, center

# Do they actually *exist*?

---

### Physically building VSRs - "first" attempt: foam

.cols[
.fifty[
Initial motivation for VSRs:
- "automated **design _and_ manufacture** of static and locomotion objects"
- "advances in multimaterial fabrication"

Details
- _material_: silicone foam rubber
- _actuation_: environment pressure modulation
  - rather unpractical
- _fabrication_: 3-D printing, fairly automated

Notes:
- simulation and static/dynamic validation
]
.fifty[.center[![VSR of Hiller and Lipson](imgs/hiller-lipson.png)]]
]

.footnote[.ref[Hiller, Jonathan, and Hod Lipson. "[Automatic design and manufacture of soft robots](https://ieeexplore.ieee.org/abstract/document/6096440)." IEEE Transactions on Robotics 28.2 (2011): 457-466.]]

---

### Second attempt: silicone

.cols[
.fifty[
Motivation:
- include fabrication in the design optimization loop
  - fight the **sim2real** problem

Details
- _material_: silicone
- _actuation_: pneumatical
- _fabrication_: molding machine and big manual effort

Notes:
- modular (manual/static assembly), cable-driven actuation
.center[![Kriegman's silicone VSR](imgs/kriegman-silicon-result.png)]
]
.fifty[.center[![Kriegman's VSR molding machine](imgs/kriegman-silicon-molding.png)]]
]

.footnote[.ref[Kriegman, Sam, et al. "[Scalable sim-to-real transfer of soft robot designs](https://arxiv.org/pdf/1911.10290.pdf)." arXiv preprint arXiv:1911.10290 (2019).]]

---

### Third attempt: silicone + magnets

.cols[
.fifty[
Motivation:
- physical reconfigurability

Details
- _material_: silicone + vaseline + magnets
- _actuation_: pneumatic
- _fabrication_: mostly manual, but once

Notes:
- reconfigurable
- actually one module = many voxels
]
.fifty[.center[
![SUI's VSR overview](imgs/sui-magnets-overall.png)]
![SUI's VSR actuation](imgs/sui-magnets-actuation.png)]
]]

.footnote[.ref[Sui, Xin, et al. "[Automatic Generation of Locomotion Patterns for Soft Modular Reconfigurable Robots](https://www.mdpi.com/2076-3417/10/1/294)." Applied Sciences 10.1 (2020): 294.]]

---

### Fourth attempt: living matter

.cols[
.fifty[
Motivation:
- building machines with living matter
  - self-renewing, biocompatible

Details
- _material_: _Xenopus laevis_ (a frog!) cells
  - cardiac progenitor cells (active)
  - pluripotent stem cells (passive)
- _actuation_: self
- _fabrication_: eggs growing, animal "manipulation", microsurgery

Plus:
- reconfigurable
- actually one module = many voxels
]
.fifty[.center[
]]
]

.footnote[.ref[]]
