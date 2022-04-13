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
9. Example of cache filling upon readings
10. Detail of the tag for 64-bit, n cache size (blocks), m block size (words); resulting total cache size (bits)
11. Block size and spatial locality; decrease of miss rate, increase of miss penalty
12. Optimizations wrt miss penalty: early restart, requested word first, critical word first
