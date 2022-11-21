class: middle, center
name: ml-to-text

# Applying ML to text

---

## What's text?

Formally, a piece of text is a variable-length sequence of symbols belonging to an **alphabet** $A$.
Hence:
$$X=A^*$$
where $A$ is usually (in modern times) UTF-16, so it may includes [emojis](https://unicode.org/emoji/charts/full-emoji-list.html):
  - there are thousands of them: 🤩🦴🐁...

A dataset $\\seq{x\_i}{i}$ of texts, possibly with labels, is called .key[corpus].
A single text $x^{(i)}$ is called .key[document].

--

.vspce1[]

However, what we usually mean with text is **natural language**, where the sequence of characters is a **noisy** container of an underlying information:
- given a document $x$, the actual meaning of $x$ may depend on other documents
- given a portion $x' \\sqsubset x$ of a document $x$, its meaning might be different if put in another document $x''$
- two equal documents $x,x'$ in the same corpus may have different meaning

Natural language is by nature **ambiguous**!

---

## Examples of text+ML problems

- Given a brand (e.g., Illy, Fiat, Dell, U.S. Triestina Calcio, ...), build a system that tells if people is **talking good or bad** about the brand on Twitter (or Mastodon).

- Given a corpus of letters to/from soldiers fighting during the WW1, what are the **topics** they talk about?

- Given a scientific paper $p\_1$, whats the **relevance** of the citation of another paper $p\_2$ referenced in $p\_1$?

---

## Sentiment analysis

A relevant class of problems is the one in which the goal is to gain insights about the sentiments an author was feeling while authoring a document $x$.
This is called .key[sentiment analysis].

Usually, this problem is cast as a form of **supervised learning**, where $Y$ *contains* sentiments.

Variants:
- $Y =\\{\\text{Pos},\\text{Neg}\\}$
- $Y =[-1,1]$
- $Y=[-1,1]^{10}$
  - one for each of anger, anticipation, disgust, fear, joy, sadness, surprise, trust, negative, positive (see the [Syuzhet package](https://cran.r-project.org/web/packages/syuzhet/vignettes/syuzhet-vignette.html))
- ...

--

In every case, we can¹ apply classic ML (supervised and usnupervised) techniques if you pre-process text to obtain multivariate observations, possibly in $\\mathbb{R}^p$, i.e., we want a $f\\subtext{text-to-vect}: A^* \\to \\mathbb{R}^p$:

.diagram.center[
link([0,25,100,25],'a')
rect(100,0,150,50)
link([250,25,350,25],'a')
otext(50,10,'$x \\\\in A^*$')
otext(300,10,"$\\\\vect{x}' \\\\in \\\\mathbb{R}^p$")
otext(175,25,'$f\\\\subtext{text-to-vect}$')
]

.footnote[
1. Actually, we have to, with the only exception of hierarchical clustering for which we might directly work on text with a suitable $d()$.
]

---

## Bag-of-words

.cols[
.c70[
.key[Bag-of-words] (BOW) is a $f\\subtext{text-to-vect}$ based on the idea of associating one numerical variable with **each word** in a **predefined dictionary**.
]
.c30[
.diagram.center[
link([0,75,100,75],'a')
rect(100,50,150,50)
link([250,75,400,75],'a')
link([175,0,175,50],'a')
otext(50,60,'$x \\\\in A^*$')
otext(325,60,"$\\\\vect{x}' \\\\in \\\\mathbb{R}^{|W|}$")
otext(175,75,'$f\\\\subtext{BOW}$')
otext(195,25,'$W$')
]

]
]

In practice, given the dictionary (i.e., set of words $W \\subseteq \\mathcal{P}(A^*)$) and given a document $x$:
1. **tokenize** $x$ in a multiset $T=f\\subtext{tokenize}(x)$ of tokens (words)
2. for each $t \\in T$, set $x'\_t$ to the multiplicity $m(t,T)$ of $t$ in $T$, i.e., to the number of occurrences of the words $t$ in $x$

The outcome is a $\\vect{x}' \\in \\mathbb{R}^{|W|}$.

An alternative version is to consider the **frequencies** instead of occurrencies:
- i.e., $x'\_t=\\frac{m(t,T)}{|T|}$
- useful if the documents have very different lenghts but the lenght itself is not a relevant information

---

## Common text pre-processing steps

BOW is considers slightly different sequences of characters as different words, and hence as different feauters, because of tokenization.
Usually, this is not good.

In practice, you often do some basic **pre-processing steps**:
- case conversion: everything to **lowercase** (language independent)
  - $x=\\text{Banana is my favorite fruit} \\mapsto x'=\\text{banana is my favorite fruit}$
  - $x=\\text{I like banana} \\mapsto x=\\text{i like banana}$
- removal of **punctuation** (language independent)
- **stemming**: each word is replaced with its morphological root (language dependent)
  - $x=\\text{I liked eating bananas} \\mapsto x'=\\text{I lik eat banana}$
  - $x=\\text{andammo tristemente rassegnati} \\mapsto x'=\\text{andar triste rassegnat}$
- removal of **stop-words** (language dependent)
  - stop words are very common words (articles, some prepositions, ...)


Each of this steps is a $f\\subtext{pre-proc}: A^\\ast \\to A^\\ast$:

.diagram.center[
link([0,25,100,25],'a')
rect(100,0,150,50)
link([250,25,350,25],'a')
otext(50,10,'$x \\\\in A^\\\\ast$')
otext(300,10,"$x' \\\\in A^\\\\ast$")
otext(175,25,'$f\\\\subtext{pre-proc}$')
]

---

## Counter examples

The 4 common pre-processing steps are not always appropriate.
It depends on whether they **help modeling the $y$-$x$ dependency**.

Sentiment analysis and punctuation:
- $\\text{I just saw Alice}$
- $\\text{I just saw Alice!!!}$
- $\\text{I just saw Alice!!! 🥰😍💘}$

Music genre preferences and case: .note[a bit forced...]
- $\\text{I like the Take That and I hate The Who.}$
- $\\text{Who likes to take that song of Hate? Me!}$

Instruction level and stemming:
- $\\text{se fossi stato malato, me ne sarei stato a casa}$
- $\\text{se ero malato, me ne stavo a casa}$

---

## tf-idf

BOW tends to overweigh words which are very frequent, but not relevant (similarly to stop-words) and underweigh words that are relevant, but rare.

Solution: use .key[tf-idf] instead of occurrencies or frequency.
tf-idf is the ratio between the **term frequency** (i.e., the frequency of a word) in a document, and the **inverse document frequency**, i.e., *the frequency* in the corpus of documents containing that term.

.cols[
.c60[
Given the dictionary $W$, the corpus $X$, and given a document $x$:
1. **tokenize** $x$ in a multiset $T$ of tokens (words)
2. for each $t \\in T$, set $x'\_t=f\\subtext{tf}(t, x) f\\subtext{idf}(t, X)$

where:
- $f\\subtext{tf}(t, x)=\\frac{m(t,T)}{|T|}$
- $f\\subtext{idf}(t, X)=\\log \\frac{|X|}{\\sum\_{x \\in X} \\mathbf{1}(t \\in f\\subtext{tokenize}(x))}$

The more common a word, the greater tf, the (more) lower idf ($0$ if in every document).
The more specific a word to a document, the larger tf, the larger idf.

]
.c40[
tf-idf corresponds to a $f\\subtext{tf-idf-learn}: \\mathcal{P}^\\ast(A^\\ast) \\to \\mathcal{P}^\\ast(A^\\ast)$, which is just the identity, and a $f\\subtext{tf-idf-apply}: A^\\ast \\times \\mathcal{P}(A^\\ast) \\to A^\\ast$:

.diagram.center[
link([0,25,100,25],'a')
rect(100,0,150,50)
link([250,25,350,25],'a')
otext(50,10,'$X$')
otext(300,10,"$X$")
otext(175,25,'$f\\\\subtext{tf-idf-learn}$')
]

.diagram.center[
link([0,25,100,25],'a')
rect(100,0,150,50)
link([250,25,350,25],'a')
otext(50,10,'$x,X$')
otext(300,10,"$\\\\vect{x}'$")
otext(175,25,'$f\\\\subtext{tf-idf-apply}$')
]

]
]

---

## Reducing the dimensionality

With BOW, $p=|W|$ and might be very large.

Common approaches:
- use a very small dictionary, tailored to the specific case
- **learn** a small dictionary on the **learning data**
  - you have a $f\\subtext{BOW-learn}: \\mathcal{P}^\\ast(A^\\ast) \\to \\mathcal{P}(A^\\ast)$ and a $f\\subtext{BOW-apply}: A^\\ast \\times \\mathcal{P}(A^\\ast) \\to A^\\ast$
  - in learning
      - use $f\\subtext{BOW-learn}(X)=W$ to build the dictionary $W$ from the corpus $X$, then
      - transform the corpus in a $X' \\in \\mathcal{P}^\\ast(\\mathbb{R}^p)$ using $f\\subtext{BOW-learn}(x^{(i)}, W)=x^{\\prime(i)}$ on each $x$
  - in prediction, use $f\\subtext{BOW-learn}(x, W)=x'$
  - $|W|$ is often set as "the **most** frequent words" (but remove stop-words!)
- use **tf-idf** and get $k$ most important words

.cols[
.c50[
.diagram.center[
link([0,75,100,75],'a')
rect(100,50,150,50)
link([250,75,400,75],'a')
link([175,0,175,50],'a')
otext(50,60,'$X$')
otext(325,60,"$W$")
otext(175,75,'$f\\\\subtext{BOW-top-learn}$')
otext(195,25,'$k$')
]

]
.c50[
.diagram.center[
link([0,75,100,75],'a')
rect(100,50,150,50)
link([250,75,400,75],'a')
otext(50,60,'$x,W$')
otext(325,60,"$\\\\vect{x}'$")
otext(175,75,'$f\\\\subtext{BOW-top-apply}$')
]

]
]

---

## Considering ordering

Both BOW and tf-idf ignore word ordering.
But ordering is fundamental in natural language.

**Example**: (sentiment classification for restaurant reviews)
- $\\text{The beer was good and the pub was not too noisy.}$
- $\\text{The beer was not good and the pub was too noisy.}$

Most common solutions:
- ngrams
- part of speech (POS) tagging

---

## ngrams

Instead of considering **word** frequencies (or occurrences, or tf-idf), consider the frequencies of **short sequences of up-to $n$ words** (tokens, or characters in general), i.e., of .key[ngrams].

**Example**: (with $n=3$ and aggressive stop-word removal)
- $\\text{The beer was good and the pub was not too noisy.}$
  - $x\_{\\text{beer},\\text{good}}=1$, $x\_{\\text{pub},\\text{not},\\text{noisy}}=1$
- $\\text{The beer was not good and the pub was too noisy.}$
  - $x\_{\\text{beer},\\text{not},\\text{good}}=1$, $x\_{\\text{pub},\\text{too},\\text{noisy}}=1$

Since $p$ may become very very large, dimensionality reduction becomes very important.

---

## Part-of-speech tagging (very briefly)

A technique belonging to **Natural Language Processing** methods that assigns the role to each word in a document.
Roles can then be used to augment the text-to-num transformation.

.vspace1[]

.h20ex.center[![POS example](images/pos-tagging.png)]








<!--

text as X

examples:
- sentiment on brands
- topics in letters
- importance of citations

mention large language models

say we'll cover the basics: using classic machine learning on text
- both supervised and unsupervised

key need: transforming text in multivariate dataset, possibly R^p

bag of words:
- stop words
- stemming
- lowercase, punctuation (with counter examples)
- most k frequent

tf-idf:
- improvement wrt bag of words

bag vs meaning
- ngrams (ordering)
- pos tagging (role of text)
- word embedding (just say it exists)

-->
