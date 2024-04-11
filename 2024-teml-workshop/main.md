class: middle, center

# Where is intelligence?

## (in simulated modular soft robots)

[Eric Medvet](http://medvet.inginf.units.it/)

Toulouse Workshop on Evolutionary Computation and Machine Learning (TEML)

April 2024 - Toulouse

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
A .note[time invariant¹] .key[dynamical system] $D$ in **discrete time** ($k \\in \\mathbb{N}$) is defined by:
- a **state update function**² $f\\suptext{state}: S \\times I \\to S$
- an **output function**² $f\\suptext{out}: S \\times I \\to O$
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

.compact[
Both agent and environment are **dynamical systems**, but terminology reflects the agent point of view:
- agent $A \\in \\mathcal{D}\\sub{O,A,S\_A}$
  - an input is an observation (of the environment): $I\_A=O$, the **observation space** 
  - an output is an action (on the environment): $O\_A=A$, the **action space** .note[former $O$]
- environment $E \\in \\mathcal{D}\\sub{A,O,S\_E}$
  - an input is the agent's action: $I\_E=A$
  - an output is what the agent will observe at $k+1$: $O\_E=O$
  
Also with more than one agent $\\to$ **multi-agent systems** (MASs):
- $f\\suptext{state}\\sub{E}: S \\times A\_1 \\times A\_2 \\times \\dots \\to S$ (and same for $f\\suptext{out}\\sub{E}$)
]

---

## Robot

.key[Robot]¹: an agent with a **body**².

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
- $B\\subtext{in}$ has a state!
]
.c15[
.w100p.center[![Thymio II robot](images/robot-thymio-ii.webp)]
]
.c35[
Sensors may perform a moving average of the perceived distances
- $B\\subtext{out}$ has a state!
]
]

.cols[
.c60[
<video autoplay muted loop><source src="images/striscia.mp4" type="video/mp4"/></video>
]
.c40[
Softness is modeled as an aggregate of spring-hamper systems
- $B\\subtext{in}$ has a (quite rich) state!
]
]

---

## Why "where"?

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

---

## Why relevant?

.important.center[Is intelligence just in the **brain** $C$? Or is it also in the **body** $B\\subtext{in}, B\\subtext{out}$?]

- an alternative path towards (general) artificial intelligence
  - **embodied AI**, **morphological computation**
  - more balanced efforts (not just on "big" brains)
- better understanding of what's intelligence

---

## How to answer?

.important.center[Is intelligence just in the **brain** $C$? Or is it also in the **body** $B\\subtext{in}, B\\subtext{out}$?]

I don't know. But...

--

- **general hypothesis**: a dynamical system has the ability to
  - store information (**complexity** of the state $s \\in S$)
  - process it (**complexity** of the functions $f\\suptext{state}, f\\suptext{out}$)
- hence, one possible approach is:
  1. set/change the relative storing/processing abilities of body/brain
  2. **measure** the change in intelligence, i.e., "deal with situations", "manipulate environment" $\\rightarrow$ **perform a task**
  
For 1, we need an agent where we can also play with body **complexity**!

.footnote[
Further reading:
- .ref[Zahedi, Keyan, and Nihat Ay. “Quantifying morphological computation.” Entropy 15.5 (2013): 1887-1915]
- .ref[Paul, Chandana. “Morphological computation: A basis for the analysis of morphology and control requirements.” Robotics and Autonomous Systems 54.8 (2006): 619-630]
- .ref[Füchslin, Rudolf M., et al. “Morphological computation and morphological control: steps toward a formal theory and applications.” Artificial life 19.1 (2013): 9-34]
]

---

## Voxel-based soft robots (VSRs¹)

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

## Pre-investigation¹ 1: changes to the body shape

**Research question**²: can a brain control control a slightly different body (wrt the one it has been evolved for)?
- why relevant? If "no", then the body likely matters a lot!

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

.footnote[
1. .ref[Medvet, Rusin; Impact of Morphology Variations on Evolved Neural Controllers for Modular Robots; XVI International Workshop on Artificial Life and Evolutionary Computation (WIVACE); 2022]
2. Cheney et al. are working on this!
]

---

### Results

**Research question**²: can a brain control control a slightly different body (wrt the one it has been evolved for)?
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
- top: original brain+body
- middle: original brain on modified body
- bottom: re-optimized brain on modified body
]
]

---

## Pre-investigation¹ 2: changes to the body material

- newk

---

## Different brain types

- asoc

---

## Body criticality

- frai criticality

---

## Plastic brains

- attention
- hebbian, hebbian+body
- self-classification
- Davis, Q. Tyrell, et al. "Subtract to adapt: Autotomic robots." 2023 IEEE International Conference on Soft Robotics (RoboSoft). IEEE, 2023.

---

## Future

- characterization
- auto-assembly
