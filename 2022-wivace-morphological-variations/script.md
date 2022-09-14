#1
goodmorning, i am eric medvet from university of trieste and i am going to present this research work that francesco rusin, a master student, and me did, on the impact of morphology variations on the effectiveness of evolved neural controller for modular soft robots.

#2
let's start by givig the broad context.
we consider those scenarios in which human operators cannot intervene, maybe because they are too dangerous, inaccessible, or simply too far away, like mars, for example.
in these scenarios, we might want to deploy robots to perform some taks.
however, since we, humans, cannot cannot intervene, robots should be truly autonomous.
in particular, they should able to build themselves, to perform **auto-fabrication**, possibly re-using robotic materials coming from disposed robots.
this scenario is not new and it is, indeed, one of the main motivations driving the research in evolutionary robotics.
here we can see a sort-of-picture of how such an autonmous robotic **ecosystem** might look like, according to a big research group working in evolutionary robotics.

#3
if we want to achieve this kind of autonomy, relying on modular robots is a good strategy.
in particular, modular soft robots, where all modules are identical, well fit the need for re-using components and facilitate auto-fabrication, since there is no need to discriminate among different kind of modules.
moreover, due to their softness, these robots can perform many different tasks, like swimming or escaping from tight spaces.

#4
so, if we want to use modular soft robots to build a robotic ecosystem, we are likely going to use this pipeline.
first, we design a few morphology+controller combinations, one for each task to be performed.
then, we start a life cylce where robot are assembled, then associated with the proper controller, used, and finally disposed, making their components, the modules, available for the next life cylce.

#5
but what if the auto-fabrication does not work as expected?
that is, what happens if a morphology is built that is different from what planned: will the corresponding controller, that has been designed to work with the planned morphology, be effective?

#6
this is exaclty the research question that we addressed in our study.
we considered the significant case in which the controllers are artificial neural networks and are optimized with neuroevolution for the task of locomoion, that is the one in which the robot has to travel as fast as possible along a direction.
we addressed this question experimentally.
we first evolved the controllers for a few base morphology, then we applied some modifications, simulating an auto-fabrication process that does not work as expected, and we measured the decrease in effectiveness of the pair modified morphology + original controller.
then, we also addressed a follow-up questions: how can we re-align the controller to the varied morphology?

#7
we considered the case of 2d voxel based soft robots.
working in 2d makes experiment faster, but, of course, limits the generality of the results.
in our 2d vsrs, each module is a soft square, called voxel, whose size varies passively depending on external forces and actively, depending on an actuation value determined by the controller.
the controller decides those values based on some sensory readings coming from voxels, such as current area ratio, contact with ground, velocity.
here you can see a robot doing locomotion: as we can see, the combination of softness and a proper controller makes the robot quite effective in doing locomotion.

#8
one fundamental requirement for the controller, for this study, is that it has to be agnostic wrt the morphology; that is, a controller that was evolved with a robot with 10 voxels has to be compatible, not necessarily good, with a robot with 9, 11, 20, voxels.
for this reason, we use a distributed controller, that we presented two years ago at gecco.
basically, there is a neural network inside each voxel.
at each time step, the network takes the local sensor readings and some values obtained from neighbor voxels.
upon computation, the network produces the local actuation value and other values to be passed to neighbor values: those values will be used at the next time step.
by putting the same sensors in each voxel, we can use the same network, with the same parameters, for all the voxeks, making the controller completely agnostic wrt the morphology.

#9
before going to the results, a few words about the kind of neuroevolution we employed.
recall that we are searching the numerical space R^p, where p is the number of parameters of the neural network.
we used a simple genetic algorithm overlapping and, as operators, a geometric crossover and a gaussian mutation. 
since we are dealing with the task of locomotion, the fitness of an individual is the velocity it, that is, the corresponding network coupled with a fiven morphology, achieves in a simulation.

#10
we considered 6 base morphologies, as you can see here in solid color: three small and three large.
for each one of them we evolved 10 controllers.
then, we obtained 30 variations of different degrees for each base morphology and, for each of them, we measured the effectiveness of the 10 corresponding evolved controllers.

#11
here you can see the main results in terms of velocity v_x against the intensity of variation delta.
delta equals to 0 means the base, original morphology.
as you can see, there is a clear drop in the velocity, in particular for the biped.
basically, also for addition or removals of one voxel, the evolved controllers become ineffective.
we believe that this is an evidence that this kind of robots greatly exploit the morphological computation.

#12
so, are small variation really so disruptive?
maybe because the modified morphologies are intrinsically less effective? 
for answering this question, we re-optimized from scratch a controller for each of the modified morphology.
as you can see, velocity with re-optimized controllers is not that worse than the base morphology.

#13
before answering let's just see what happens with variations and re-optimization.
at the top, there is a base morphology with its evolved controller.
in the middle, the evolved controller coupled with the modified morphology, with just one more voxel; as you can see it is clearly unable to do locomotion.
at the bottm, you see the modified morphology coupled with a controller evolved from scratch for that morphology; and it works pretty well.

#14
so, re-optimization works, but it is costly!
how can we partially cope with that?
one possibilit, the one we experimented with in our work, is to seed the re-optimization with the original controller, instead of starting from scratch.
in practice, half of the initial populations is composed of mutations of the original controller, whereas the remaining half is random.
here you can see what happens with this form of seeded re-optimization in terms of fitness during the evolution, for the three small morphologies and small variations.
as you can see, despite its simplicity, this strategy allows to obtain a good controller in just a few generations, much sooner than without seeding.

#15
finally, before closing, a few words about a side finding.
we chose the six base morphologies based on our quite "long" experience with these kind of robots and locomotion: we designed them to be fast.
however, by applying those small variations, we discovered some morphologies that were indeed consistently better then the originl, as one that we called horse, due to the peculiar shape.
this finding makes, in our opinion, even more appealing the idea of a robotic ecosystem, because this kind of random, serendipitous discoveries, could be applied to slowly improve the ecosystem, and make it more adaptable to a slowly changing environment.

#16
thank you; that's all.

