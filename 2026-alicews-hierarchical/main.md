class: middle, center

# Hierarchical intelligence
## (seed for discussion)

[Eric Medvet](http://medvet.inginf.units.it/)

*Evolutionary Robotics and Artificial Life Lab, Dip. di Ingegneria e Architettura, Università di Trieste*

.vspace1[]

ALICE Workshop, 2 February 2026, Copenhagen

.vspace1[]

.center[
.h5ex[![Evolutionary Robotics and Artificial Life Lab](images/logo-erallab.png)]
.hspace5[]
.h5ex[![Department of Engineering and Architecture](images/logo-dia.png)]
.hspace5[]
.h5ex[![University of Trieste](images/logo-units.png)]
]

---

## Case: navigation

.cols[
.c30[
<video autoplay muted loop><source src="navigation/me.dpos-mono-tree-0.5-02/train.progressive/best-test-maze-traj.mp4" type="video/mp4"/></video>
]
.c70[
What is this?
- $7 \times 3$ inputs, $2$ outputs
- symbolic brain, optimized through evolutionary computation (MAP-Elites)
- reactive behavior

**Opportunity**
- "long-term" planning, *then* executrion
- about *time*
]
]
.w100p.center[![General navigation](images/nav-formula.png)]
.w100p.center[![The tree-based brain](navigation/me.dpos-mono-tree-0.5-02/train.progressive/best-train-trajs.svg)]

---

## Case: modular soft robots

.cols[
.c40[
<video autoplay muted loop><source src="vsr/ga-1-001.mp4" type="video/mp4"/></video>

.w100p.center[![Distributed NN-based brain](images/vsr-module.png)]
]
.c60[
What is this?
- one brain in each module $\\Rightarrow$ no central "authority"
- $4+4$ inputs, $1+4$ outputs
- ANN-based brain, optimized through evolutionary computation (GA)
- reactive behavior

**Opportunity**
- high-level body roles, local executrion
- about *space*
- but also about time
]
]

---

## Questions?

- what kind of bodies and brain allow for hierarchical intelligence?
- what's the hierarchy? are two levels enough? how to detect an hierarchical organization?
- should different levels have the same goals?
- should the information (amount and time resolution) available to levels be the same?

