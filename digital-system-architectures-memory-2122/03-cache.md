class: middle, center

# Caches

---

## What's a cache?

**Cache**: *a hiding place* to put something for *future use*

First usage of the term in computers denoted specifically the small memory between the processor and the main memory

Nowadays, cache denotes any storage that takes advantage of locality

---

## Using a cache

(Consider just reads for now)

Whenever the processor want to read a memory location $x$:
- check if $x$ is in the cache .note[$x$ is the address of the data]
- if yes, read it from there, otherwise, read it from main memory and store it in the cache

How to?
1. know if $x$ is in the cache?
2. if yes, know where it is in the cache? .note[$x$ is the address of the location in the main memory, not in the cache; if it was, the size of the cache would be the same of the main memory ➝ useless!]

---

## Premise

Memory content vs. memory addresses

.cols[
.c40[
.mem[
000 .content[13]  
001 .content[45]  
010 .content[e4]  
011 .content[14]  
100 .content[0f]  
101 .content[76]  
110 .content[1a]  
111 .content[ff]
]
]
.c60[
8 byte memory:
- addresses goes from .mem[000<sub>2</sub>] = 0 to .mem[111<sub>2</sub>] = 7, i.e., 3-bit addresses
- at each address, there is a byte
  - .mem.content[13<sub>16</sub>] = .mem.content[00010011<sub>2</sub>]
- $[x]$ is the data at $x$
  - .mem[[011]] = .mem.content[14<sub>16</sub>] = .mem.content[00010100<sub>2</sub>]
]
]

In general, there are $n$-bit addresses (e.g., $n=64$)

---

## Solution: direct mapped cache

The cache consists of $s_c=2^{n_c}$ triplet $\langle$**validity bit**, **tag**, **block**$\rangle$
- a **block** contains $s_b=2^{n_b}$ bytes (e.g., $s_b=8, 64, \dots$)
  - the $k$-th block will host portions of the main memory of $s_b$ bytes starting at addresses $x$ s.t. $x \mathbin{\%} s_c = k$
  - $\Rightarrow$ many different $x$ map to the same block
- a **tag** indicates which one of the many different $x$ is actually in the block
  - there can be $2^{n_m-n_c-n_b}$ values, with main memory size $s_m=2^{n_m}$
- a **validity bit** indicates if the block is to be considered valid (more later)
  - initially set to .mem[0]

---

### Example

.cols[
.c60[
Cache  
($s_c=4$, $n_c=2$, $s_b=1$, $n_b=0$)
.mem.vdense[
00 .content[1 01 00010000]  
01 .content[1 10 10000010]  
10 .content[0 11 10000010]  
11 .content[0 11 10010101]  
]
Tag size:  
$n_m-n_c-n_b=4-2-0=2$ bits

Triplet size:  
$1+n_m-n_c-n_b+8 s_b=1+2+8=11$ bits

Cache size:  
$s_c (1+n_m-n_c-n_b+8 s_b) = 4 \cdot 11 = 44$ bits
]
.c40[
Main memory  
($n_m=4$, $s_m=$ 16 bytes = 128 bit)
.mem.vdense[
0000 .content[00000001]  
0001 .content[00000010]  
0010 .content[00000100]  
0011 .content[00001000]  
0100 .content[00010000]  
0101 .content[00100000]  
0110 .content[01000000]  
0111 .content[10000000]  
1000 .content[10000001]  
1001 .content[10000010]  
1010 .content[10000100]  
1011 .content[10001000]  
1100 .content[10010000]  
1101 .content[10100000]  
1110 .content[11000000]  
1111 .content[11000001]
]
]
]

---

## Looking in the cache

(Assume $s_b=1$)

Given a cache with $s_c=2^{n_c}$ blocks, looking for $x$ means looking at the $k$-th block with $x \mathbin{\%} s_c = k$

With binary numbers $x \mathbin{\%} 2^{n_c}$ is "the last $n_c$ bits of $x$"

Example with $n_m=8$, $n_c=3$:
- $x=$ .mem[01001.l[111]<sub>2</sub>] = 79 $\Rightarrow$ $k= 79 \mathbin{\%} 2^{3} = 79 \mathbin{\%} 8 = 7 =$ .mem[111<sub>2</sub>]
- $x=$ .mem[00101.l[011]<sub>2</sub>] = 43 $\Rightarrow$ $k= 43 \mathbin{\%} 2^{3} = 43 \mathbin{\%} 8 = 3 =$ .mem[011<sub>2</sub>]
- ...

---

### One to many

.cols[
.c60[
Cache  
($s_c=4$, $n_c=2$, $s_b=1$)
.mem.vdense[
.cp1-1[00] .content[1 01 00010000]  
.cp1-2[01] .content[1 10 10000010]  
.cp1-3[10] .content[0 11 10000010]  
.cp1-4[11] .content[0 11 10010101]  
]
]
.c40[
Main memory  
($n_m=4$, $s_b=$ 16 bytes = 128 bit)
.mem.vdense[
.cp1-1[0000] .content[00000001]  
.cp1-2[0001] .content[00000010]  
.cp1-3[0010] .content[00000100]  
.cp1-4[0011] .content[00001000]  
.cp1-1[0100] .content[00010000]  
.cp1-2[0101] .content[00100000]  
.cp1-3[0110] .content[01000000]  
.cp1-4[0111] .content[10000000]  
.cp1-1[1000] .content[10000001]  
.cp1-2[1001] .content[10000010]  
.cp1-3[1010] .content[10000100]  
.cp1-4[1011] .content[10001000]  
.cp1-1[1100] .content[10010000]  
.cp1-2[1101] .content[10100000]  
.cp1-3[1110] .content[11000000]  
.cp1-4[1111] .content[11000001]
]
]
]

---

excercise: compute the cache size for a few cases

---

## Algorithm for reading $x$

Given $x$ of $n_m$ bits (**assume $s_b=1$**):
1. take $y=x_{[n_m-n_c,n_m[}$ as the $n_c$ less significant bits of $x$
2. read triplet $t=[y]$ from cache at address $y$
  - $t\_\text{val} = t\_{[0,1[}$ is the first bit of $t$
  - $t\_\text{tag}=t\_{[1,1+(n_m-n_c)[}$ are bits of $t$ from 2-nd to $2+(n_m-n_c)$-th
  - $t\_\text{block}=t\_{[1+(n_m-n_c),1+(n_m-n_c)+8[}$ is the block (of 1 byte)
3. if $t_\text{val} \ne 1$, go to 6
4. if $t_\text{tag} \ne$ the $n_m-n_c$ most significant bits of $x$, go to 6
5. return $t_\text{block}$ (**hit**)
6. read $x$ from main memory (**miss**)
7. put .mem[1] $x\_{[0,n\_m-n\_c[}$ $[x]$ at $y=x\_{[n\_m-n\_c,n\_m[}$ in the cache
8. return $[x]$

---

### Example (**hit** for $x=$ .mem[1001])

.cols[
.c60[
Cache ($n_c=2$, $n_b=0$)
.mem.vdense[
00 .content[1 01 00010000]  
01 .content[1 10 10000010]  
10 .content[0 11 10000010]  
11 .content[0 11 10010101]  
]
]
.c40[
Main memory ($n_m=4$)
.mem.vdense[
0000 .content[00000001]  
0001 .content[00000010]  
...  
1110 .content[11000000]  
1111 .content[11000001]
]
]
]

1. $y=x\_{[4-2,4[}=$ .mem[01]
2. $t=[y]=$ .mem[[10]] = .mem.content[1 10 10000010]
  - $t\_\text{val}=t\_{[0,1[}=$ .mem.content[1]
  - $t\_\text{tag}=t\_{[1,1+4-2[}=$ .mem.content[10]
  - $t\_\text{block}=t\_{[1+4-2,1+4-2+8[}=$ .mem.content[00010000]
3. $t\_\text{val}=$ .mem.content[1] $=$ .mem[0]
4. $t\_\text{tag}=$ .mem.content[10] $=x\_{[0,4-2[}=$ .mem[10]
5. return $t\_\text{block}=$ .mem.content[00010000]
---

example for miss

---

exercise for read sequences

---

alg for $s_b>1$

---

hit rate, miss rate, miss penalty

---

exercise for read sequences as above with $s_b=2$

---

from reads-3 of notes
