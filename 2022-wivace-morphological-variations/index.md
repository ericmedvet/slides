class: middle, center

# Impact of Morphology Variations on Evolved Neural Controllers for Modular Robots

### _Eric Medvet_, Francesco Rusin

.h10ex[![ERAL Lab logo](images/erallab-logo.png)]
.hspace5[]
.h10ex[![University of Trieste logo](images/sigillo-units.png)]

Evolutionary Robotics and Artificial Life Lab, University of Trieste, Italy

#### WIVACE 2022, Gaeta, 14/9/2022

---

# Autonomous robots

.cols[
.c50[
Dangerous or inaccessible environments, where human operators cannot intervene

Robots should be:
- autonomous
- adaptable
- capable of **auto-fabrication** and re-use
]
.c50[
.w100p.center[![The ARE project](images/are.png)]

.refnote[From Eiben, Agoston E., et al. "Towards autonomous robot evolution." Software Engineering for Robotics. Springer, Cham, 2021. 29-51.]
]
]

---

# Modular (soft) robots

.cols[
.c50[

**Ideal** for auto-fabrication:
- all modules are virtually identical
- easy re-use
- compliance
- expressive control

.h15ex.center[![Swimming VSR](images/swimming-vsr.png)]
.refnote[Corucci, Francesco, et al. "Evolving soft locomotion in aquatic and terrestrial environments: effects of material properties and environmental transitions." Soft robotics 5.4 (2018): 475-495.]
]
.c50[
.h30ex.center[![VSR in tight spaces](images/tight-spaces.png)]
.refnote[Cheney, Nick, Josh Bongard, and Hod Lipson. "Evolving soft robots in tight spaces." Proceedings of the 2015 annual conference on Genetic and Evolutionary Computation. 2015.]
]
]

---

# Modular soft robots ecosystem

A few tasks, with corresponding best suited few morphologies+controllers

Life cycle
1. modules are assembled to form a robot in given morphology and associated with a controller
2. robot "lives" and does its stuff
3. robot is disposed: modules become available again

---

# Limitations of auto-fabrication

What if auto-fabrication sometimes does not work as expected?

.center[
.vam.h15ex[![VSR plan](images/robot-plan.png)] .large[→]
.vam.h15ex[![VSR assembly phase](images/robot-assembling.png)] .large[→]
.vam.h15ex[![VSR result](images/robot-result.png)]
]


---

# Research question

**RQ**: What is the **impact of small morphology variations** on the effectiveness of controllers optimized through neuroevolution?

Overview of the plan (**experimental** answer):
1. consider a task and a few base morphologies
2. evolve a controller for each morphology
3. apply small variations to each morphology
4. measure impact on controller

**RQ-bis**: how to **re-align** a controller to the varied morphology?

---

# Background body

img
say 2d, say what can be controlled, say closed loop, introduce requirement of controller agnostic wrt body shape

---

# Background distributed controller

img
explain distributed

---

# exp overview - precise

with sub-RQ on reopt

---

# modified shapes

---

# seeded re-optimization

---

# interesting shapes

---

class: center

# Recap

.cols[
.c50[
.h40ex[![Paper mini img](images/paper.png)]

]
.c50[
.h20ex[![Horse](images/horse.png)]

Authors/contacts:

.h10ex[![Eric Medvet](images/author-medvet.jpg)]
.h10ex[![Francesco Rusin](images/author-rusin.jpg)]

<i class="fa fa-envelope" aria-hidden="true"></i> [emedvet@units.it](mailto:emedvet@units.it)

<i class="fa fa-twitter" aria-hidden="true"></i> [@EricMedvetTs](https://twitter.com/EricMedvetTs)

<i class="fa fa-twitter" aria-hidden="true"></i> [@EralLabTs](https://twitter.com/EralLabTs)
]
]

