class: middle, center

# Voxel-based Soft Robots
## A platform for investigating Learning, Evolution, and Everything

[Eric Medvet](http://medvet.inginf.units.it/), University of Trieste

.vam[![Twitter icon](imgs/twitter.png)]@EricMedvetTs

11/2/2020, Simula@OsloMet

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

.h15ex[![University of Trieste](imgs/units.jpg)]
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

.h15ex[![Piazzà Unità](imgs/trieste.jpg)]
.h15ex[![Trieste in Italy](imgs/trieste-map.png)]
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
  - some computer vision
- evolutionary computation and applications
  - genetic programming & grammatical evolution
  - regular expressions
]
.fifty[
.center[.h10ex[![Evolutionary Robotics and Artificial Life lab](imgs/logo-eral.png)]]

Head, founder, since ≈1y

Research topics:
- evolutionary robotics
- social learning (with evolution)
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

Terminology:
- shape and materials → _body_
- law for volume change → _brain_ or _controller_

.footnote[Image from .ref[Kriegman, Sam, et al. "[Simulating the evolution of soft and rigid-body robots](https://dl.acm.org/doi/abs/10.1145/3067695.3082051)." Proceedings of the Genetic and Evolutionary Computation Conference Companion. 2017.]]

---

## Look! I am alive!

.center[<iframe width="800" height="450" src="https://www.youtube.com/embed/Ee2sU-AZWC4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>]

.footnote[Video from .ref[Kriegman, Sam, Nick Cheney, and Josh Bongard. "[How morphological development can guide evolution](https://www.nature.com/articles/s41598-018-31868-7)." Scientific reports 8.1 (2018): 1-10.]]

---

## Why relevant?

- Soft-robotics
- Embodied cognition
- Lifelike behaviors
- Modularity

---

### Soft-robotics

.cols[
.fifty[
.center[.w50p[![VSR escaping from tight space](imgs/tight-spaces.png)]]]
.fifty[
.center[.w50p[![Continuous material](imgs/material-continuous.png)]]]
]

- *Infinite degrees of freedom*: soft robots can solve tasks that are hard for rigid Robots
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

## Applications

.center[
modularity + re-usability + effectivenss = ... eventually, applications.
]

.cols[
.fifty[
Example: disaster response
1. have a bag of voxels, empty it at disaster site
2. voxels assemble and form a VSR suitable for task/site
3. VSR does the work
4. collect voxels, dissassemble, put back in bag

What do we still miss for doing that?
]
.fifty[
.center[
.w50p[![Shipwreck](imgs/shipwreck.jpg)]
.w50p[![Earthquake](imgs/earthquake.jpg)]
]
]
]

---

class: middle, center

# Do they actually *exist*?

---

## Physically building VSRs - "first" attempt: foam

.cols[
.fifty[
Initial motivation for VSRs:
- automated **design _and_ manufacture** of static and locomotion objects
- advances in multimaterial fabrication

Details
- _material_: silicone foam rubber
- _actuation_: environment pressure modulation
- _fabrication_: 3-D printing, fairly automated

Notes:
- simulation and static/dynamic validation
- rather unpractical actuation
- cannot be disassembled
]
.fifty[.center[![VSR of Hiller and Lipson](imgs/hiller-lipson.png)]]
]

.footnote[.ref[Hiller, Jonathan, and Hod Lipson. "[Automatic design and manufacture of soft robots](https://ieeexplore.ieee.org/abstract/document/6096440)." IEEE Transactions on Robotics 28.2 (2011): 457-466.]]

---

## Second attempt: silicone

.cols[
.fifty[
Motivation:
- include fabrication in the body design optimization loop
  - fight the **sim2real** problem

Details
- _material_: silicone
- _actuation_: pneumatic
- _fabrication_: molding machine and big manual effort

Notes:
- modular (manual/static assembly)
- cable-dependent actuation
]
.fifty[.center[
![Kriegman's silicone VSR](imgs/kriegman-silicon-result.png)
.w50p[![Kriegman's VSR molding machine](imgs/kriegman-silicon-molding.png)]]
]
]

.footnote[.ref[Kriegman, Sam, et al. "[Scalable sim-to-real transfer of soft robot designs](https://arxiv.org/pdf/1911.10290.pdf)." arXiv preprint arXiv:1911.10290 (2019).]]

---

## Third attempt: silicone + magnets

.cols[
.fifty[
Motivation:
- physical **reconfigurability**

Details
- _material_: silicone + vaseline + magnets
- _actuation_: pneumatic
- _fabrication_: mostly manual, but once

Notes:
- reconfigurable
- actually one module = many voxels
- cable-dependent actuation
]
.fifty[.center[
![SUI's VSR overview](imgs/sui-magnets-overall.png)
![SUI's VSR actuation](imgs/sui-magnets-actuation.png)
]]
]

.footnote[.ref[Sui, Xin, et al. "[Automatic Generation of Locomotion Patterns for Soft Modular Reconfigurable Robots](https://www.mdpi.com/2076-3417/10/1/294)." Applied Sciences 10.1 (2020): 294.]]

---

## Fourth attempt: living matter

.cols[
.fifty[
Motivation:
- building machines with **living matter**
  - self-renewing, biocompatible

Details
- _material_: _Xenopus laevis_ (a frog!) cells
  - cardiac progenitor cells (active)
  - pluripotent stem cells (passive)
- _actuation_: self, in acqueos env., lasts weeks
- _fabrication_: eggs growing, animal "manipulation", microsurgery

Notes:
- pipeline with filters
  - including sort of domain randomization to cope with _reality gap_
]
.fifty[.center[
![Kriegman's living VSR overview](imgs/kriegman-frog.png)
.w50p[![Kriegman's living VSR surgery](imgs/kriegman-frog-surgery.png)]
]]
]

.footnote[.ref[Kriegman, Sam, et al. "[A scalable pipeline for designing reconfigurable organisms](https://www.pnas.org/content/117/4/1853)." Proceedings of the National Academy of Sciences (2020).]]

---

## Why _attempts_?

Still no method gives practical:
- actuation
- re-reconfigurability
- sensoring and processing

---

class: middle, center

# How to *design* them?

---

## Manual vs. auto design

.cols[
.fifty[
Manual design of VSR is difficult:
- *non-trivial interactions* of many components
- *large search space*: many things can be optimized

.center.w75p[![Robotic arn](imgs/robotic-arm.jpg)]
]
.fifty[
⇒ Automatic design!
- Evolutionary Computation

.center.w75p[![Large VSR](imgs/large-vsr.png)]
]
]

---

## Evolutionary Computation

Key ingredients:
- what to optimize
  - solution _representation_, search space
- how to measure solution quality (_fitness_)
- how to perform optimization
  - evolutionary algorithm (_EA_) and its params

And:
- why to optimize?

---

## VSR body evolution

.ref[Cheney, Nick, et al. "[Unshackling evolution: evolving soft robots with multiple materials and a powerful generative encoding](https://dl.acm.org/doi/abs/10.1145/2661735.2661737)." ACM SIGEVOlution 7.1 (2014): 11-23.]

**Goal**: optimize a body of (up to) $10 \times 10 \times 10$ voxels (of a few predefined "materials") that is good at *locomotion*

- _Fitness_: traveled distance
- _Representation_: indirect (generative) based on CPPN vs. indirect
- _EA_: neuroevolution of augmented topologies (NEAT)

---

### CPPN

.cols[
.fifty[
Based on CPPN: compositional pattern-producing network
- a network of basic mathematical functions
- a number of inputs equal to the dimensionality of the pattern (here 3)
- one or more (here 2 for the material) output encoding pattern value

.center[
![CPPN as function](imgs/cppn-basic.png)
]
]
.fifty.center[
![CPPN example](imgs/cppn-network-sample.png)
.w75p[![CPPN example](imgs/cppn-pattern-sample.png)]
]
]
.footnote[.ref[Stanley, Kenneth O. "[Compositional pattern producing networks: A novel abstraction of development](https://link.springer.com/article/10.1007/s10710-007-9028-8)." Genetic programming and evolvable machines 8.2 (2007): 131-162.]]

---

### CPPN for VSRs body

.center[![CPPN for representing VSRs body](imgs/vsr-cheney-representation.png)]

---

### Direct representation

A $10 \times 10 \times 10$ vector directly encoding material presence:
- little effort in representation designs
- little domain knowledge
  - no patterns

---

### Controller

Implicit in the material: voxels of different materials contract and expand differently:
- soft passive tissue
- hard passive tissue
- contract/expand active tissue
- expand/contract active tissue ($\Delta \phi = \pi$)

No sensors, no processing of sensory information

---

### Results (main)

.center[
.w50p[![Body evolution result](imgs/vsr-cheney-result-fitness.png)]
.h25ex[![Direct encoding example](imgs/vsr-cheney-result-direct.png)]
]

---

### Results (impact of material)

.cols[
.fifty[
How many materials?
.center[![Effectiveness vs. n. of materials](imgs/vsr-cheney-result-materials.png)]
]
.fifty[
Different cost of materials
.center[![Usage of materials vs. costs](imgs/vsr-cheney-result-penalties.png)]
]
]

---

### In action

.center[<iframe width="800" height="450" src="https://www.youtube.com/embed/z9ptOeByLA4?start=25" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>]

---

## Evolution (and development) of non-sensing controller

.ref[Kriegman, Sam, Nick Cheney, and Josh Bongard. "[How morphological development can guide evolution](https://www.nature.com/articles/s41598-018-31868-7)." Scientific reports 8.1 (2018): 1-10.]

**Goal**: show that devo+evo is better than just evo, using VSRs and locomotion

- _Fitness_: traveled distance
- _Representation_: numerical vector representing a simple non-sensing controller of a fixed-body VSR ($4 \times 4 \times 3$)
- _EA_: simple Age-Fitness-Pareto

Note: VSRs are used for addressing a broader research question

---

### Representation

Each voxel volume varies with sin function:
.center[$v_i(k) =v_i^i+(v_i^f-v_i^i) \frac{k}{K}+a \sin(2 \pi f k \Delta t + \phi_i)$]
- resting volume varies during the VSR "life" $[0,K]$

Amplitude and frequency equal for all the voxels; phase $\phi_i$ and resting volume initial and final values $v_i^i, v_i^f$ are subjected to evolution.
- individual is $(v_1^i, \dots, v_m^i, v_1^f, \dots, v_m^f, \phi_1, \dots, \phi_n)$
- with bilateral symmetry for resting volumes ($m=\frac{n}{2}$)

No sensors, no processing

---

### EA

- mutation-only
- Pareto-dominance based optimization: maximize fitness, minimize age ⇒ favors diversity
- overlapping and truncation selection ⇒ high selective pressure

```
P := []
foreach (i in [1, ..., n_pop]) {
  P := P + (random(), 0)
}
foreach (i in [1, ..., n_gen]) {
  P' := []
  foreach ((g,a) in P) {
    g' := mutate(g)
    P' := P' + (g,a+1) + (g',a+1)
  }
  P' := P' + (random(), 0)
  P := select(P', n_pop)
}
```

---

### Evo vs. evo+devo

- Evo only: resting volumes do not change during the "life" of the robot (simulation)
- Evo+devo: resting volumes linearly change over the life

.center.w50p[![Evo+devo VSR controller](imgs/nature-evo-devo-idea.png)]

---

### Results

.center[![Evo+devo results](imgs/nature-evo-devo-results.png)]

- Controllers evolved with evo+devo are better ⇒ development increases evolvability
  - even w/o devo
  - more behaviors are discovered (e.g., rolling)
- Side effect: evo+devo improves robustness to noise on parameters

---

### In action

.center[<iframe width="800" height="450" src="https://www.youtube.com/embed/Ee2sU-AZWC4?start=53" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>]

---

## Evolution of a sensing controller

.ref[Talamini, Jacopo, et al. "[Evolutionary Synthesis of Sensing Controllers for Voxel-based Soft Robots](https://www.mitpressjournals.org/doi/abs/10.1162/isal_a_00223)." The 2018 Conference on Artificial Life: A Hybrid of the European Conference on Artificial Life (ECAL) and the International Conference on the Synthesis and Simulation of Living Systems (ALIFE). One Rogers Street, Cambridge, MA 02142-1209 USA journals-info@ mit. edu: MIT Press, 2019.]

**Goal**: the controller can sense itself and the environment _and process_ related information

- _Fitness_: traveled distance
- _Representation_: parameters of a neural network
- _EA_: the same simple Age-Fitness-Pareto

---

### Sensing vs. non-sensing controller

.cols[
.fifty.center[
Non-sensing

.w75p[![Non-sensing controller scheme](imgs/talamini-sensing-phases-ctrl.png)]

Sensing

.w75p[![NN-based sensing controller scheme](imgs/talamini-sensing-nn-ctrl.png)]
]
.fifty[
The same sensors on each voxel:
- velocity magnitude
- acceleration magnitude
- actual volume

Neural network architecture partially dictated by the size of the VSRs
- params ~$\mathcal{O}(n^2)$
]
]

---

### Results (main)

.center[
.w50p[![VSRs used in the experiments](imgs/talamini-sensing-vsrs.png)]

.w75p[![Sensing vs. non-sensing controller](imgs/talamini-sensing-results-main.png)]
]

---

### Behavior analysis

.cols[
.fifty[
Aim: understanding if the sensing controller results in novel behaviors, _sistematically_

For each VSR:
1. consider position of center of mass
2. compute DFT along two axes
3. merge in a single vector

For all evolved VSRs:
1. map vectors to 2-D with MDS
2. plot
]
.fifty[
.w50p.center[![Procedure for behavior analysis](imgs/talamini-sensing-behavior-procedure.png)]
]
]

---

### Results (bahavior analysis)

.w75p.center[![Results behavior analysis](imgs/talamini-sensing-behavior-results.png)]

Evolved sensing controllers often result in "high-frequency" behaviors

---

##  Evolution of a distributed controller

.ref[Medvet, Eric, et al. "[Evolution of Distributed Neural Controllers for Voxel-based Soft Robots](http://medvet.inginf.units.it/publications)." submitted to Genetic and Evolutionary Computation Conference 2020.]

**Goal**: *embodied* controller that can sense and process itself and environment information *without* disrupting **modularity**

- _Fitness_: traveled distance
- _Representation_: parameters of many neural networks
- _EA_: pretty standard

Notes:
- a 2-D variant of VSRs

---

### 2D-VSR-Sim

.ref[Medvet, Eric, et al. "[Design, Validation, and Case Studies of 2D-VSR-Sim, an Optimization-friendly Simulator of 2-D Voxel-based Soft Robots](https://arxiv.org/abs/2001.08617)." arXiv preprint arXiv:2001.08617 (2020).]

Why a new software? (at least one already exists)
- more consistent interface to VSR aspects suitable for optimization, with a **focus on sensing**
- **2-D** makes search space in general smaller
- (in Java, works nicely with our usual evolutionary pipeline)
- with tools for online and offline *visualization* of the simulations

.cols[
.fifty.center[
.w75p[![2D-VSR-Sim VSR model](imgs/2d-vsr-sim-vsr.png)]
]
.fifty.center[
.w75p[![2D-VSR-Sim Graphical User Interface](imgs/2d-vsr-sim-gui.png)]
]
]

---

### Centralized vs. distributed sensing controller

.cols[
.fifty[
.h40ex.center[![Centralized controller scheme](imgs/gecco2020-centralized.png)]

- disembodied
- requires wiring between NN and voxels
- single point of failure
- cannot be disassembled
]
.fifty[
.w75p.center[![Distributed controller scheme](imgs/gecco2020-distributed.png)]

- embodied
- can be disassembled
- wiring is inside the voxel
]
]

---

### Results (effectiveness)

.w75p.center[![Six VSR shapes](imgs/gecco2020-robots.png)]
.w75p.center[![Results: effectivenss](imgs/gecco2020-results-effectiveness.png)]

.cols[
.fifty[
- same sensors on all voxels: mean and diff of area, x- and y- velocity
- distributed not worse than centralized, without disrupting modularity
- both better than non-sensing on small VSRs
]
.fifty[
.w75p.center[![Scalability of num. of params with respect to num. of voxels](imgs/gecco2020-params-scalability.png)]
]
]

---

### In action

---

### Modularity and re-usability

.cols[
.fifty[
Idea:
1. evolve the controller for a VSR
2. detach some parts
3. reattach the parts on another VSR
Is the re-assembled VSR cheaper to optimize than a new one?

Experiments with:
- two VSR shapes
- two ways for re-assembling
  - same shape
  - different shape
- two sensor configurations
  - all voxels with same sensors
  - legs with few sensors
]
.fifty.center[
![Re-assembling configurations](imgs/gecco2020-bipeds.png)
From Giulio Fidel's thesis.
]
]

---

### Results (modularity and re-usability)
.center[![Modularity results](imgs/gecco2020-modularity-results.png)]

Findings:
- re-assembled is in general cheaper to optimize
- difference is sharper for:
  - larger VSR (larger search space)
  - VSR with few sensors (better coordination between trunk and leg)

---

class: middle, center

# What's next, from a *research* perspective?

---

## A few ideas

- Benchmarks
  - most studies focused only on locomotion
  - nice, immediate, but maybe not the only thing a robot can do
    - does not require sensing (as is now)
  - 2D-VSR-Sim may ease development
- Modularity and re-configurability at different scales
  - intelligent robotic tissue
  - libraruy of modules, tissue
  - optimzation starting from parts in the library
- Auto assembly
- Physical building: nanotechnologies?
  - *architected materials* that can be re-configured upon magnetic/electric signals
  - computing with nanomaterials (.ref[Broersma, Hajo, Julian F. Miller, and Stefano Nichele. "[Computational matter: Evolving computational functions in nanoscale materials](https://link.springer.com/chapter/10.1007/978-3-319-33921-4_16)." Advances in Unconventional Computing. Springer, Cham, 2017. 397-428.])

---

class: middle, center

Thanks!
