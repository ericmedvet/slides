class: middle, center

# Introduction to Machine Learning and Evolutionary Computation
## 332MI, 470SM

[Eric Medvet](http://medvet.inginf.units.it/)

A.Y. 2022/2023

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

## Computer Engineering group

.cols.compact[
.c50[
.h5ex.vam[![Sylvio Barbon Jr](images/people/barbon-jr.jpg)]
[Sylvio Barbon Jr](https://www.barbon.com.br/)  
<i class="fa-solid fa-chalkboard-user"></i> Fondamenti di informatica  
<i class="fa-solid fa-chalkboard-user"></i> Progettazione del software e dei sistemi informativi  
<i class="fa-regular fa-lightbulb"></i> meta learning, applied ML, process mining

.h5ex.vam[![Alberto Bartoli](images/people/bartoli.jpg)]
[Alberto Bartoli](https://bartoli.inginf.units.it/)  
<i class="fa-solid fa-chalkboard-user"></i> Reti di calcolatori  
<i class="fa-solid fa-chalkboard-user"></i> Computer networks 2 and introduction to cybersecurity  
<i class="fa-regular fa-lightbulb"></i> security, applied ML, evolutionary computation

.h5ex.vam[![Andrea De Lorenzo](images/people/de-lorenzo.jpg)]
[Andrea De Lorenzo](https://delorenzo.inginf.units.it/)  
<i class="fa-solid fa-chalkboard-user"></i> Basi di dati  
<i class="fa-solid fa-chalkboard-user"></i> Programmazione web  
<i class="fa-regular fa-lightbulb"></i> security, applied AI&ML, information retrieval, GP

]
.c50[
.h5ex.vam[![Eric Medvet](images/people/medvet.jpg)]
[Eric Medvet](https://medvet.inginf.units.it/)  
<i class="fa-solid fa-chalkboard-user"></i> Programmazione avanzata  
<i class="fa-solid fa-chalkboard-user"></i> Introduction to machine learning and evolutionary robotics  
<i class="fa-regular fa-lightbulb"></i> evolutionary computation, embodied AI, applied ML

.h5ex.vam[![Laura Nenzi](images/people/nenzi.jpg)]
[Laura Nenzi](https://lauranenzi.github.io/)  
<i class="fa-solid fa-chalkboard-user"></i> Cyber-physical systems  
<i class="fa-regular fa-lightbulb"></i> formal methods, runtime verification

.h5ex.vam[![Martino Trevisan](images/people/trevisan.jpg)]
[Martino Trevisan](https://www.telematica.polito.it/member/martino-trevisan/)  
<i class="fa-solid fa-chalkboard-user"></i> Reti di calcolatori
<i class="fa-solid fa-chalkboard-user"></i> Sistemi operativi  
<i class="fa-solid fa-chalkboard-user"></i> Architetture dei sistemi digitali  
<i class="fa-regular fa-lightbulb"></i> network measurements, data privacy, big data
]
]

---

## Structure of the course

1st part (6 CFUs, 48 hours):
- what is machine learning?
- evaluating a ML system
- supervised learning techniques
- clustering
- application to text

2nd part (3 CFUs, 24 hours):
- what is evolutionary computation?
- significan applications in robotics

Focus on **methodology**:
- how to **design**, build, and **evaluate** a ML (or EC) system?

---

## Materials

Teacher slides:
- available on the course [web page](https://medvet.inginf.units.it/teaching/2223-intro-ml-er/#course-material)
- might be updated during the course

Notebooks for the lab activity:
- available on the course [web page](https://medvet.inginf.units.it/teaching/2223-intro-ml-er/#course-material)
- please, to fully enjoy lab activities, **do not look** at notebooks **in advance**

Textbooks:
- 1st part: .ref[James, Gareth, et al.; An introduction to statistical learning. Vol. 112. New York: springer, 2013] .note[available in UniTs library]
- 2nd part: .ref[De Jong, Kenneth A. Evolutionary Computation: A Unified Approach. MIT Press, 2006.]
- overlap with course material is **not complete**!

---

## How to attend lectures

**New slides for this course edition!**
- same content of previous years, slightly different order
- hopefully better
  - main concept definitions are more explicit

Still, depending on your *learning style and habits*, you might want to **take notes** based to *augment the slide content*.

---

## Lab activities and how to attend

Focus on **methodology**:
- how to **design**, build, and **evaluate** a ML (or EC) system?

Practice (in designing, building, evaluating) **is fundamental!**

You'll practice doing **lab activities**:
- $\\approx$ **15 hours** in the 1st part
- in classroom
  - the teacher is there and always available
  - the teacher actively monitors your progresses
- ... but you can do the activities also at home
- "solution" shown at the end
  - solution = **one** way of doing design, build, evaluate
- **agnostic w.r.t. concrete tools** used
  - teacher is more familiar with **R**
  - **tutor** is more familiar with **Python**
- suitable to be done in small group (2–4 students)

---

## Tutor

---

## Exam

---

## You?

---

## Display slide

This is an important formula:

$$y = p(\\htmlClass{col1}{\\vec{x}})$$

Code in R:

```R
err = function(y, y_p) {
  length(which(y!=y_p))/length(y)
}
```
Pseudo code:
.pseudo-code[
while (true) {  
.ind[]$x \\gets \\htmlClass{col1}{x_1}+\\htmlClass{col2}{x_1}+\\htmlClass{col3}{x_1}+\\htmlClass{col4}{x_1}+\\htmlClass{col5}{x_1}+1$  
.ind[]$x = \sum_x+2$  
}
]

Colors:
.col1[col]
.col2[col]
.col3[col]
.col4[col]
.col5[col]
