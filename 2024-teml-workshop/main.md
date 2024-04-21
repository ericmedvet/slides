class: middle, center

# Where's the intelligence?

## (in simulated modular soft robots)

[Eric Medvet](http://medvet.inginf.units.it/)

Toulouse Workshop on Evolutionary Computation and Machine Learning (TEML)

April 2024 - Toulouse

.vspace1[]

.vspace1[]

.center[
.h5ex[![Evolutionary Robotics and Artificial Life Lab](images/logo-erallab.png)]
.hspace5[]
.h5ex[![Department of Engineering and Architecture](images/logo-dia.png)]
.hspace5[]
.h5ex[![University of Trieste](images/logo-units.png)]
]

---

## Intelligence?

> **in·​tel·​li·​gence** - *in-ˈte-lə-jən(t)s*
> - the ability to learn or understand or to deal with **new or trying** situations
> - the ability to apply knowledge to **manipulate one's environment** or to think abstractly as measured by objective criteria

- "new", "trying": time matters $\\rightarrow$ .key[dynamical systems]
- "manipulates one's environment"  $\\rightarrow$ .key[agent]/.key[environment]

---

## Dynamical system

.cols[
.c60[
A .note[time invariant<sup>1</sup>] .key[dynamical system] $D$ in **discrete time** ($k \\in \\mathbb{N}$) is defined by:
- a **state update function**<sup>2</sup> $f\\suptext{state}: S \\times I \\to S$
- an **output function**<sup>2</sup> $f\\suptext{out}: S \\times I \\to O$
- an initial state $s^{(0)} \\in S$

where
- $S$ is the **state space**
- $I$ is the **input space**
- $O$ is the **output space**
]
.c40[
.diagram.center[
link([0,25,100,25],'a')
rect(100,0,200,50)
link([300,25,400,25],'a')
otext(50,10,'$i^{(k)}$')
otext(350,10,'$o^{(k)}$')
otext(200,25,'$f\\\\suptext{state},f\\\\suptext{out},s^{(0)}$')
]

The system evolves (i.e., changes) over time as:  
$s^{(k)} \\seteq f\\suptext{state}(s^{(k-1)}, i^{(k)})$  
$o^{(k)} \\seteq f\\suptext{out}(s^{(k-1)}, i^{(k)})$

.vspace1[]

Set of dynamical systems on $I, O, S$:  
$\\mathcal{D}\\sub{I,O,S}=\\mathcal{F}\\sub{S \\times I \\to S} \\times \\mathcal{F}\\sub{S \\times I \\to O} \\times S$
]
]

.compact[
Particular case: **stateless** dynamical .note[i.e., static] system
- $S = \\emptyset$, i.e., no memory
- no $f\\suptext{state}$, $f\\suptext{out}: I \\to O$, i.e., just a function $\\Rightarrow$ $\\mathcal{D}\\sub{I,O,\\emptyset}=\\mathcal{F}\\sub{I \\to O}$
]

.footnote[
1. more generally, given $t = k \\delta t$, $f\\suptext{state}: \\mathbb{R}^+ \\times S \\times I \\to S$, $f\\suptext{out}: \\mathbb{R}^+ \\times S \\times I \\to O$
2. potentially stochastic functions, $f\\suptext{state}: S \\times I \\to \\mathcal{P}\_S$, $f\\suptext{out}: S \\times I \\to \\mathcal{P}\_O$
]

---

## Agent/environment

.cols[
.c40[
.key[Agent]: an entity capable of performing actions which may result in changing its **state** or the .key[environment] state.
]
.c60[
.diagram.center[
link([100,175,0,175,0,25,100,25],'a')
otext(200,-15,'Agent')
rect(100,0,200,50)
link([300,25,400,25,400,175,300,175],'a')
otext(50,10,'$o^{(k)}$')
otext(350,10,'$a^{(k)}$')
otext(200,25,'$f\\\\suptext{state}\\\\sub{A},f\\\\suptext{out}\\\\sub{A},s\\\\sub{A}^{(0)}$')
otext(200,135,'Environment')
rect(100,150,200,50)
otext(200,175,'$f\\\\suptext{state}\\\\sub{E},f\\\\suptext{out}\\\\sub{E},s\\\\sub{E}^{(0)}$')
link([-10,100,10,100],'t')
otext(75,100,'$k \\\\to k+1$', 'compact')
]
]
]

Both agent and environment are **dynamical systems**, but terminology reflects the agent point of view:
- agent $A \\in \\mathcal{D}\\sub{O,A,S\_A}$
  - an input is an observation (of the environment): $I\_A=O$, the **observation space** 
  - an output is an action (on the environment): $O\_A=A$, the **action space** .note[former $O$]
- environment $E \\in \\mathcal{D}\\sub{A,O,S\_E}$
  - an input is the agent's action: $I\_E=A$
  - an output is what the agent will observe at $k+1$: $O\_E=O$

---

## Embodied agent

.key[Embodied agent]<sup>1</sup> (or **robot**): an agent with a **body**<sup>2</sup>.

.diagram.center[
otext(450,-15,'Agent')
rect(50,0,800,110)
otext(190,35,'Body (sensors) $B\\\\subtext{in}$')
rect(90,50,200,50)
otext(190,75,'$f\\\\suptext{state}\\\\sub{B\\\\subtext{in}},f\\\\suptext{out}\\\\sub{B\\\\subtext{in}},s\\\\sub{B\\\\subtext{in}}^{(0)}$')
otext(450,35,'Brain $C$')
rect(350,50,200,50)
otext(450,75,'$f\\\\suptext{state}\\\\sub{C},f\\\\suptext{out}\\\\sub{C},s\\\\sub{C}^{(0)}$')
otext(710,35,'Body (actuators) $B\\\\subtext{out}$')
rect(610,50,200,50)
otext(710,75,'$f\\\\suptext{state}\\\\sub{B\\\\subtext{out}},f\\\\suptext{out}\\\\sub{B\\\\subtext{out}},s\\\\sub{B\\\\subtext{out}}^{(0)}$')
otext(450,130,'Environment')
rect(350,150,200,50)
otext(450,175,'$f\\\\suptext{state}\\\\sub{E},f\\\\suptext{out}\\\\sub{E},s\\\\sub{E}^{(0)}$')
link([350,175,0,175,0,75,50,75],'a')
link([-10,125,10,125],'t')
link([850,75,900,75,900,175,550,175],'a')
link([50,75,90,75],'a')
otext(320,60,'$o^{(k)}$')
link([290,75,350,75],'a')
otext(580,60,'$a^{(k)}$')
link([550,75,610,75],'a')
link([810,75,850,75],'a')
]

- the **brain** (or .key[controller], $C$) observes the environment through .key[sensors], part $B\\subtext{in}$ of the body
- the **brain** acts on the environment through .key[actuators], part $B\\subtext{out}$ of the body
- the body (both $B\\subtext{in}$ and $B\\subtext{out}$) is a dynamical system
- from the point of view of the brain, the environment _includes_ the body

.note[More generally, a _link_ may exist betwee $B\\subtext{in}$ and $B\\subtext{out}$, hence having $O \\times H$ as output space for $B\\subtext{in}$ and $A \\times H$ as input space for $B\\subtext{out}$, with $H$ being the set of info traveling on that link]

.footnote[
1. not an authoritative definition
2. simulated or not
]

---

### Examples

.diagram.center[
otext(450,-15,'Agent')
rect(50,0,800,110)
otext(190,35,'Body (sensors) $B\\\\subtext{in}$')
rect(90,50,200,50)
otext(190,75,'$f\\\\suptext{state}\\\\sub{B\\\\subtext{in}},f\\\\suptext{out}\\\\sub{B\\\\subtext{in}},s\\\\sub{B\\\\subtext{in}}^{(0)}$')
otext(450,35,'Brain $C$')
rect(350,50,200,50)
otext(450,75,'$f\\\\suptext{state}\\\\sub{C},f\\\\suptext{out}\\\\sub{C},s\\\\sub{C}^{(0)}$')
otext(710,35,'Body (actuators) $B\\\\subtext{out}$')
rect(610,50,200,50)
otext(710,75,'$f\\\\suptext{state}\\\\sub{B\\\\subtext{out}},f\\\\suptext{out}\\\\sub{B\\\\subtext{out}},s\\\\sub{B\\\\subtext{out}}^{(0)}$')
otext(450,130,'Environment')
rect(350,150,200,50)
otext(450,175,'$f\\\\suptext{state}\\\\sub{E},f\\\\suptext{out}\\\\sub{E},s\\\\sub{E}^{(0)}$')
link([350,175,0,175,0,75,50,75],'a')
link([-10,125,10,125],'t')
link([850,75,900,75,900,175,550,175],'a')
link([50,75,90,75],'a')
otext(320,60,'$o^{(k)}$')
link([290,75,350,75],'a')
otext(580,60,'$a^{(k)}$')
link([550,75,610,75],'a')
link([810,75,850,75],'a')
]

.cols[
.c15[
.w100p.center[![Robotic manipulator](images/robotic-manipulator.jpg)]
]
.c35[
Actuators have an inner, low-level controller, usually a proportional integrative derivative (PID) controller
- $B\\subtext{out}$ has a state!
]
.c15[
.w100p.center[![Thymio II robot](images/robot-thymio-ii.webp)]
]
.c35[
Sensors may perform a moving average of the perceived distances
- $B\\subtext{in}$ has a state!
]
]

.cols[
.c60[
<video autoplay muted loop><source src="images/striscia.mp4" type="video/mp4"/></video>
]
.c40[
Softness is modeled as an aggregate of spring-hamper systems
- $B\\subtext{out}$ has a (quite rich) state!
]
]

---

## Why "_where_'s the intelligence"?

.diagram.center[
otext(450,-15,'Agent')
rect(50,0,800,110)
otext(190,35,'Body (sensors) $B\\\\subtext{in}$')
rect(90,50,200,50)
otext(190,75,'$f\\\\suptext{state}\\\\sub{B\\\\subtext{in}},f\\\\suptext{out}\\\\sub{B\\\\subtext{in}},s\\\\sub{B\\\\subtext{in}}^{(0)}$')
otext(450,35,'Brain $C$')
rect(350,50,200,50)
otext(450,75,'$f\\\\suptext{state}\\\\sub{C},f\\\\suptext{out}\\\\sub{C},s\\\\sub{C}^{(0)}$')
otext(710,35,'Body (actuators) $B\\\\subtext{out}$')
rect(610,50,200,50)
otext(710,75,'$f\\\\suptext{state}\\\\sub{B\\\\subtext{out}},f\\\\suptext{out}\\\\sub{B\\\\subtext{out}},s\\\\sub{B\\\\subtext{out}}^{(0)}$')
otext(450,130,'Environment')
rect(350,150,200,50)
otext(450,175,'$f\\\\suptext{state}\\\\sub{E},f\\\\suptext{out}\\\\sub{E},s\\\\sub{E}^{(0)}$')
link([350,175,0,175,0,75,50,75],'a')
link([-10,125,10,125],'t')
link([850,75,900,75,900,175,550,175],'a')
link([50,75,90,75],'a')
otext(320,60,'$o^{(k)}$')
link([290,75,350,75],'a')
otext(580,60,'$a^{(k)}$')
link([550,75,610,75],'a')
link([810,75,850,75],'a')
]

> **in·​tel·​li·​gence** - *in-ˈte-lə-jən(t)s*
> - the ability to learn or understand or to deal with **new or trying** situations
> - the ability to apply knowledge to **manipulate one's environment** or to think abstractly as measured by objective criteria

.center[$\\downarrow$]

.important.center[Is intelligence just in the **brain** $C$? Or is it also in the **body** $B\\subtext{in}, B\\subtext{out}$?]

Common belief: **intelligence is in the brain**!
And/thus we usually opitimized this!

---

## Why relevant?

.important.center[Is intelligence just in the **brain** $C$? Or is it also in the **body** $B\\subtext{in}, B\\subtext{out}$?]

- an alternative path towards artificial (general) intelligence
  - **embodied AI**, **morphological computation**
  - more balanced efforts (not just on "big" brains)
- better understanding of what's intelligence

---

## How to answer?

.important.center[Is intelligence just in the **brain** $C$? Or is it also in the **body** $B\\subtext{in}, B\\subtext{out}$?]

I don't know. But...

--

**General hypothesis**: **intelligence** $\\sim$ **complexity** and, for dynamical systems, complexity $\\approx$
- ability to store information (**complexity** of the state $s \\in S$)
-  ability to process it (**complexity** of the functions $f\\suptext{state}, f\\suptext{out}$)

--

Hence, one possible approach is:
1. set/change the relative storing/processing **capacity** of body/brain
2. **measure** the change in intelligence, i.e., "deal with situations" $\\rightarrow$ **perform a task**
      - with **evolution** as "distribution" mechanism (global optimization)
  
For 1, we need an agent where we can also play with **body complexity**!

.footnote[
Further reading:
- .ref[Zahedi, Keyan, and Nihat Ay. “Quantifying morphological computation.” Entropy 15.5 (2013): 1887-1915]
- .ref[Paul, Chandana. “Morphological computation: A basis for the analysis of morphology and control requirements.” Robotics and Autonomous Systems 54.8 (2006): 619-630]
- .ref[Füchslin, Rudolf M., et al. “Morphological computation and morphological control: steps toward a formal theory and applications.” Artificial life 19.1 (2013): 9-34]
]

---

## Voxel-based soft robots (VSRs<sup>1</sup>)

.cols[
.c60[
In general:
- many **soft cubes** "glued" together
  - "infinite" degrees of freedom
  - also as **collective intelligence**!
- each can expand or contract over time, behavior resulting from aggregation
- optimizable body and brain
  - **body** $\\approx$ how many, where placed, what material
  - **brain** $\\approx$ how volumes change over time
- actually fabricable, but .note[currently] poorly controllable

.vspace1[]

.bnote[
Top image from .ref[Hiller, Jonathan, and Hod Lipson. "Automatic design and manufacture of soft robots." IEEE Transactions on Robotics 28.2 (2011): 457-466.]

Bottom image from .ref[Legrand, Julie, et al. "Reconfigurable, multi-material, voxel-based soft robots." IEEE Robotics and Automation Letters 8.3 (2023): 1255-1262.], then many works

1. aka Virtual Soft Robots, from .ref[Mertan, Alican, and Nick Cheney. "Investigating Premature Convergence in Co-optimization of Morphology and Control in Evolved Virtual Soft Robots." 27th European Conference on Genetic Programming (EuroGP); 2024.]
]
]
.c40[
.w100p.center[![Hiller-Lipson VSRs](images/hiller-lipson-vsrs.png)]

.w100p.center[![Legrand et al. VSRs](images/legrand-vsrs.gif)]
]
]

---

## Pre-investigation<sup>1</sup> 1: changes to the body shape

**Research question**<sup>2</sup>: can a brain control control a slightly different body (wrt the one it has been evolved for)?
- why relevant? If "no", then the body likely matters a lot!

.footnote[
1. .ref[Medvet, Rusin; Impact of Morphology Variations on Evolved Neural Controllers for Modular Robots; XVI International Workshop on Artificial Life and Evolutionary Computation (WIVACE); 2022]
2. Cheney et al. are working on this!
]

--

.cols[
.c50[
A **body-agnostic brain**:

.center.w90p[![Distributed controller](images/distributed.png)]
]
.c50[
Body variations:

.center.w90p[![Sample of modified morphologies](images/mod-morphs.png)]
]
]

---

### Results

**Research question**<sup>2</sup>: can a brain control control a slightly different body (wrt the one it has been evolved for)?
**TL;DR**: no!

.cols[
.c50[
.center.w100p[![Velocity drop](images/plot-reopt.png)]

- Big drop in performance, also with small variations ($\\delta$)
- With a (short) re-optimization, the brain "adapts" to the new body
]
.c50[
<video autoplay muted loop>
    <source src="images/video-small.mp4" type="video/mp4"/>
</video>

Biped:
- top: **original** brain+body
- middle: original brain on **modified** body
- bottom: **re-optimized** brain on modified body
]
]

---

## Brain complexity: different brain types<sup>1</sup>

.cols[
.c60[
Different neural network models, different **brain complexity**:
.compact[
- multi-layer perceptron (MLP)
- recurrent neural network (RNN) .note[layered]
- spiking neural network (SNN) .note[layered]
  - also with **homeostasis** (SNN-H)
]

Brain **complexity**:
- of the state (**storing**), $\\approx$ by state size $|\\vect{s}|$
- of the functions (**processing**), $\\approx$ by number of params $|\\vect{\\theta}|$

Coupled with three bodies (and two control frequencies):
.center.w50p[![Bodies](images/asoc-bodies.png)]
]
.c40[
.center.w100p[![Complexities of the NNs](images/asoc-sizes.png)]
]
]
 
.footnote[
1. .ref[Nadizar, Medvet, Nichele, Pontes-Filho; An Experimental Comparison of Evolved Neural Network Models for Controlling Simulated Modular Soft Robots; Applied Soft Computing (ASOC); 2023]
]

---

### Results: better with a state!

.center.w90p[![Median fitness during evolution](images/asoc-fitness.png)]

- **RNNs** are in general more effective and efficient
- unclear impact of perception 🤔, unclear impact of **body complexity** 🤔
- frequency $\\rightarrow$ cap on brain role (low, stronger limit) $\\rightarrow$ **sound!**

---

## Body complexity: criticality<sup>1</sup>

**Research question**: what makes a body good for different tasks? (locomotion, cave escape, jump)
- here as: what makes a single body "intelligent"?

Idea:
1. "critical systems allow for optimal information processing" $\\rightarrow$ **criticality**
  - the property of being on the boundary between order and chaos (intuitively)
2. *define* criticality for bodies
3. optimize bodies for criticality
4. check if high-criticality bodies are better then low-criticality bodies across different tasks

.footnote[
1. .ref[Talamini, Medvet, Nichele; Criticality-driven Evolution of Adaptable Morphologies of Voxel-Based Soft-Robots; Frontiers in Robotics and AI (FRAI); 2021]
]

--

.vspace1[]

.cols[
.c70[
Measuring body criticality (**task agnostic**!):
1. apply one stimulus to only one voxel
2. count how many voxels it impacts on (**avalanche** size)
3. measure how well the distribution of the avalanche size fits

$\\Rightarrow$ can be used to **drive on optimization** on bodies!
]
.c30[
.center.w90p[![Median fitness during evolution](images/frai-body-fitness.png)]
]
]

---

### Results: bodies optimized for criticality are adaptable!!!

.cols[
.c30.center[
"Manual" bodies
.w75p[![Manual bodies](images/frai-bodies-manual.png)]

Random bodies
.w100p[![Random bodies](images/frai-bodies-random.png)]

Grown bodies
.w100p[![Grow bodies](images/frai-bodies-grow.png)]

**Optimized bodies**
.w100p[![Optimized bodies](images/frai-bodies-opt.png)]
]
.c70[
Procedure:
1. take a body $b$
2. optimize a brain for $b$ for a task $t$ .note[always same type of brain]
3. compute the **average rank** $\\mu_r$ of $b$+optimized brain in $t$ .note[w.r.t. all bodies with their optimized brains]
  - the lower $\\mu_r$, the better!
  
.center.w50p[![Average rank](images/frai-table.png)]

Here: **the larger the body complexity** ($\\approx$criticality)**, the more intelligent** ($\\approx$adaptable) **the robot!**
]
]

---

## Beyond the single body+brain

.cols[
.c70[
Being modular, a VSR can be seen as a "swarm" of robots
- w.r.t. "classical" swarms, **tighter** interactions among robots
]
.c30.center[
.w75p[![A module of a VSR](images/attention-module.png)]
]
]

.diagram.center[
otext(450,-15,'One agent')
rect(50,0,800,110)
otext(190,35,'Body (sensors) $B\\\\subtext{in}$')
rect(90,50,200,50)
otext(190,75,'$f\\\\suptext{state}\\\\sub{B\\\\subtext{in}},f\\\\suptext{out}\\\\sub{B\\\\subtext{in}},s\\\\sub{B\\\\subtext{in}}^{(0)}$')
otext(450,35,'Brain $C$')
rect(350,50,200,50)
otext(450,75,'$f\\\\suptext{state}\\\\sub{C},f\\\\suptext{out}\\\\sub{C},s\\\\sub{C}^{(0)}$')
otext(710,35,'Body (actuators) $B\\\\subtext{out}$')
rect(610,50,200,50)
otext(710,75,'$f\\\\suptext{state}\\\\sub{B\\\\subtext{out}},f\\\\suptext{out}\\\\sub{B\\\\subtext{out}},s\\\\sub{B\\\\subtext{out}}^{(0)}$')
otext(450,130,'Environment (including the other agents)')
rect(350,150,200,50)
otext(450,175,'$f\\\\suptext{state}\\\\sub{E},f\\\\suptext{out}\\\\sub{E},s\\\\sub{E}^{(0)}$')
link([350,175,0,175,0,75,50,75],'a')
link([-10,125,10,125],'t')
link([850,75,900,75,900,175,550,175],'a')
link([50,75,90,75],'a')
otext(320,60,'$o^{(k)}$')
link([290,75,350,75],'a')
otext(580,60,'$a^{(k)}$')
link([550,75,610,75],'a')
link([810,75,850,75],'a')
]

.cols[
.c50[
"**Where's the intelligence?**" answer gains a dimension:
- before: body vs. brain
- now: single agent vs. collection of agents .note[in VSRs, agent$=$voxel]
]
.c50[
Open topics:
- voxels **communication**
- voxels **specialization**
- voxels **collaboration**
]
]

---

## Voxels (non) communication<sup>1</sup>

**Research question**: can voxels of a VSR work well without communicating?
**TL;DR**: yes, through attention!

.cols[
.c50[
.w100p[![Fitness w/ and w/o communication](images/attention-plots.png)]

- **MLP**: no communication
- **MLP-Comm**: some values exchanged
- **Attention**: no comm., but internal attention
]
.c50[
<video autoplay muted loop>
    <source src="images/attention-comb.mp4" type="video/mp4"/>
</video>
Voxels focus differently depending on their **role**!
- same ANN in every voxel (all identical!)
]
]


.footnote[
1. .ref[Pigozzi, Tang, Medvet, Ha; Evolving Modular Soft Robots without Explicit Inter-Module Communication using Local Self-Attention; ACM Genetic and Evolutionary Computation Conference (GECCO); 2022]
]

---

## Role and specialization<sup>1</sup>

**Research question**: how to make voxels plastic such that they can adapt to bodies?

**Preview**: Hebbian learning $+$ body+brain evolution $=$ ❤️
.w80p.center[![Performance after remixing](images/totipotent-plots.png)]

.footnote[
1. .ref[Ferigo, Andrea, et al. "Totipotent Neural Controllers for Modular Soft Robots: Achieving Specialization in Body-Brain Co-Evolution Through Hebbian Learning."] .note[ongoing work]
]

---

## Intelligence is collective (if needed)<sup>1</sup>

**Identical** agents: same body, **some brain**!
- not constrained to stay physically attached
- can attach/detach

.cols[
.c50[
.center[Goal: run **all together** (avg $v\_x$)]
.w75p[
<video autoplay muted loop>
    <source src="images/collective-locomotion-avg.mp4" type="video/mp4"/>
</video>
]
]
.c50[
.center[Goal: **one** run (max $v\_x$)]
.w75p[
<video autoplay muted loop>
    <source src="images/collective-locomotion-max.mp4" type="video/mp4"/>
</video>

- **specialization** emerges!
  - without plasticity
  - "between" agent and environment
]
]
]

.footnote[
1. .ref[Rusin, Medvet "How Perception, Actuation, and Communication Impact on the Emergence of Collective Intelligence in Simulated Modular Robots"] .note[ongoing work]
]
---

## Future/open challenges

- Is evolution equally **fair in distributing intelligence** (i.e., exploiting capacity of complexity) on body and brain?
  - likely, no... it depends (also) on representation<sup>1</sup>
- Can a faster forms of **adaptation** fix this?
  - learning<sup>2</sup>
  - development<sup>3,4</sup>
- **Explainable** body intelligence
  
.footnote[
1. .ref[Thomson, Sarah L., et al. "Understanding fitness landscapes in morpho-evolution via local optima networks." arXiv preprint arXiv:2402.07822 (2024).]
2. .ref[Pigozzi, Camerota Verdù, Medvet; How the Morphology Encoding Influences the Learning Ability in Body-Brain Co-Optimization; ACM Genetic and Evolutionary Computation Conference (GECCO); 2023]
3. .ref[Nadizar, Medvet, Miras; On the Schedule for Morphological Development of Evolved Modular Soft Robots; 25th European Conference on Genetic Programming (EuroGP); 2022]
4. .ref[Davis, Q. Tyrell, et al. "Subtract to adapt: Autotomic robots." 2023 IEEE International Conference on Soft Robotics (RoboSoft). IEEE, 2023.]
]

---

class: middle, center

## Where's the intelligence?<br> (in simulated modular soft robots)

.cols[
.c30[
This slide deck:
.w75p.center[![This slide deck QR code](images/qr-slides.png)]

Me:  
[medvet.inginf.units.it](http://medvet.inginf.units.it/)
]
.c40[
.w75p.center[![ERALLab at Xmas '23](images/erallab-xmas-23.jpg)]
👋👋👋 from Francesco, Giorgia, Samuele, Gloria, Michel, Eric
]
.c30[
**Contribs from ERALLab**:  
Giorgia Nadizar  
Federico Pigozzi, Dr.  
Francesco Rusin  
Jacopo Talamini, Dr.

.vspace1[]

**Contribs from guest stars**:  
Stefano Nichele + Sidney Pontes-Filho  
David Ha + Yujin Tang  
Giovanni Iacca + Andrea Ferigo
]
]

