#1
hi. in this talk, i'll discuss what we experienced when we tried to use genetic programming for doing continuous control, in the particular case where we want to control a kind of simulated modular soft robots.
this talk, and the corresponding draft, have been prepared by giorgia nadizar, a phd student i have the luck of being the supervisor of, and me.

#2
since we are going to deal with control, continuous control in particular, i will start by giving a definition of control.
i do not want to tell that this will be *the* definition of control, but i try to relate it to the regression case, a task for which genetic programming is an handy solution.
let's start with regression: regression is the task where [...]
on the other hand, control is the task where [...]
here i show in red the input of the task and in blue the output.
there are two relevant differences btw regression and control.
first, time does not matter in regression, that is, there is no sequentiality in the data; it matters, instead, in control.
second, in control the data the controller sees (o^(k) in the figure, that stays for observation; a^(k) is the action) may change depending on how the controller interacts with the environment; in regression, the x^(i) that the function sees stay the same.

#3
there are a few special case which are relevant for our study.
in general, the controller is a dynamical system and it can be defined by two functions: a state update function h\_c and an action function f\_c.
when those function operate on numerical vectors, we are dealing with a continuous control task.
an even more particular case is where the controller is not a dynamical system, that is, when it is stateless.
in this case there is no state and the action function alone define the controller.
note, however, that the entire systeme comprehending both the controller and the environment *is* a dynamical system also in this case.

#4
now we can better see how continuous control and *multivariate* regression are related.
in both case the goal is to find a function f: in one case, regression, it should fit some data; in the other case, continuos control with a stateless controller, it should steer a system towards some goal.
since both problem consist in finding a function, maybe a technique which is good for one can also be good for the other.

#5
and this is exactly what motivate us for this study.
in particular we wanted to answer these research questions: [...]
we attempted to answer these questions considering a peculiar case: the one of simulated modular soft robots that, in our opinion, are particularly interesting for a few reasons that i'll detail later.

#6
simulated modular soft robots, also called voxel-based soft robots, are composed of many similar square modules which can expand and contract.
we simulate them in continuous space, in two dimensions, and discrete time.
we simulate softness with a mechanical model employing a number of spring-damper systems.
this makes clear that the robot is a dynamical system: moreover, we know from previous works that most of the dynamics is right in the mechanical model, rather than in the controller.
for this reason, but with some care, we can say that these robots exhibit morphological computation.

#7
one brief practical note about vsrs. 
the ones we play with are *just* simulated.
yet, there have been and still there are attempts to actually build them.
hiller et al used some foam in 2011; a few years ago kriegman et al built their biological counterpart using living cells (this is a pretty famous work); finally, there are a few research groups worldwide using sylicon to build pneumaticaly actuated voxels.
so, yes, the simulation is a lot ahead of what we can build today, in particular concerning what the robot can perceive and how it can actuate. 
but still it is interesting to plan in advance how to control them and exploit their modularity once we'll be able to fabricate them.

#8
now, let's go back to our vsrs.
we here used a so-called distributed controller.
basically, we put a multivariate function inside each voxel.
the function takes as input (here in purple) the local sensor readings (4 in this work) and some numbers coming from neighbor voxels.
this input is processed and results in an outputc (here in green) consisting of the local actuation value (the one making the voxel expand and contract) and the numbers going to neighbor voxels.
we use the same function in each voxel.
and this makes this controller particularly suited for exploiting the potential modularity of these robots.
all modules are equivalent and a robot can be assembled easily.
fron another point of view, we here have a form of collective intelligence, since the overall behavior of the robot comes from the combined behavior of a number of simple, equal modules.
