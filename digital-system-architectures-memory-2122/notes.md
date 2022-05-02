# Concepts to be explicitly delivered

## Primary
- Locality principle (spatial and temporal)
- Memory hierarchy, block (or line)
- Hit, miss, hit/miss rate, hit time, miss penalty
- Cache tag

## Secondary
- SRAM, DRAM, Flash, HDD technicalities (disk, platter, head, track, sector, cylinder, seek, seek time)
- Stream benchmark

# Tentative plot

## Introduction
1. Show example code and highlight many access to memory
2. State two-fold goal: fast and large memory
3. Show technological bounds
4. Introduce books/library metaphor; mention hierarchy
5. Spatial and temporal locality
6. Say we'll say how to do the same with computers, from two points of view: how to design/build them; how to exploit the way they are built while programming them

## Memory technologies

## Caches basics
1. Common usage of term and current definition
2. "Formal" statement of the books/library metaphor: desk, space
3. Abstract formal statement
4. State problem of mapping: (a) how to tell if something is in cache? (b) how to know where it is?
5. Direct mapping with modulo of memory address
6. This answers b, but not a
7. Tag for answering a
8. Validity and valid bit

### Reads
1. Example of cache filling upon readings
2. Detail of the tag for 64-bit, n cache size (blocks), m block size (words); resulting total cache size (bits)
3. Block size and spatial locality; decrease of miss rate, increase of miss penalty
4. Optimizations wrt miss penalty: early restart, requested word first, critical word first
5. Miss management: key steps, pipeline stall

### Writes
1. Cache-memory inconcistency after writes
2. Write-through scheme and its issues (~100 cycles per write)
3. Write-buffer (sketch)
4. Write-back (sketch); impact of write-back on miss

### Examples
1. Intrinsity FastMATH structure; split cache
2. Miss rate

## Measuring and improving cache performances
1. Basic arithmetic for CPU time (and hypothesis)
2. Trade-off between hit time and hit rate based on cache size
3. Average memory accesso time (AMAT)

### Alternative schemes
1. Fully associative
2. Set-associative (n-way) and generalization
3. Block search in set-associative
4. Replacement rule: LRU (sketch)
5. Impact of tag size on associativity
6. Multilevel Caches; local and global miss rate

### Example
1. Comparison of quick sort and radix sort
2. Autotuning



# Possible excercises/labs/questions
- Compute the size of a direct-mapped cache of n data size, blocks of k words, m bits memory addresses
- Given a direct-mapped cache (and its n, k, m) and a sequence of read requests, give miss/hit outcomes
- Given an instruction and a data miss rate, the CPI, the miss penalty in cycles, and the percentage of loads (reads) and stores (writes), find the overall CPI
- Given address size m, block size k, n-associativity, find tag size.