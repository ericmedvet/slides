# Advanced Programmin A.Y. 19/20: final project

## Abstract

Design and develop a server that, based on a text- and message-oriented protocol, takes requests of computation consisting of one or more mathematical expressions and input values and replies with the results.

## Specifications

### Domain definitions

Let $e$ be a *mathematical expression* composed of the binary operators $O=\{+,-,\times,\div,\text{pow}\}$ and of zero or more named variables $V_e \in V$.
**Example**: $e=\frac{x+1}{y-2^x}$, $V_e=\{x,y\}$.

Let $a: V \to \mathbb{R}^*$ be a *variable-values function* that associates a list of numerical values $a(v) \in \mathbb{R}^*$ with a variable $v$.

### Protocol

Upon connection with a client $C$, the server $S$ performs iteratively these operations:
1. waits for a *request* $r$
2. closes the connection or replies with a *response* $s$, depending on the content of $r$

#### Request format

A request is a line of text with the following format (literal text is shown between double quotes `""`, regexes between single quotes `''`):
```
Request = QuitRequest
        | StatRequest
        | ComputationRequest
```
The format of a *quit request* is:
```
QuitRequest = "BYE"
```
The format of a *stat request* is:
```
StatRequest = "STAT_REQS"
            | "STAT_AVG_TIME"
            | "STAT_MAX_TIME"
```
The format of a *computation request* is:
```
ComputationRequest = ComputationKind"_"ValuesKind";"VariableValuesFunction";"Expressions
```
```
ComputationKind = "MIN"
                | "MAX"
                | "AVG"
                | "COUNT"
```
```
ValuesKind = "GRID"
           | "LIST"
```
A variable-values function can be specified with the following format:
```
VariableValuesFunction = VariableValues
                       | VariableValuesFunction","VariableValues
```
```
VariableValues = VarName":"JavaNum":"JavaNum":"JavaNum
```
```
VarName = '[a-z][a-z0-9]*'
```
and `JavaNum` is a string that can be correctly parsed to a double using the Java `Double.parseDouble()` method.
A list of expressions can be specified with the following format:
```
Expressions = Expression
            | Expressions";"Expression
```
```
Expression = VarName
           | Num
           | "("Expression""Op""Expression")"
```
```
Num = '[0-9]+(\.[0-9]+)?'
```
```
Op = "+"
   | "-"
   | "*"
   | "/"
   | "^"
```

##### Examples

Some examples of valid requests are (one per line):
```
BYE
STAT_MAX_TIME
MAX_GRID;x0:-1:0.1:1,x1:-10:1:20;((x0+(2.0^x1))/(1-x0));(x1*x0)
COUNT_LIST;x0:1:0.001:100;x1
```

Some examples of **not valid** requests are:
```
bye
MIN_GRID;x0:-1:0.1:1,x1:-10:1:20;((x0+(2.0^x1))/(1-x0));log(x1*x0)
COUNT_LIST;x0:1:0.001:100;
MAX_LIST;x0:0:0,1:2;(x0+1)
```

#### Response format

A response is a line of text with the following format:
```
Response = ErrorResponse
         | OkResponse
```
The format of an *error response* is:
```
ErrorResponse = ERR";"`[^;]*`
```
The format of an *ok response* is:
```
OkResponse = OK";"JavaNum";"JavaNum
```
where `[^;]*` does not include new line characters.

### Request processing specifications

If the request $r$ is a *quit request*, the server $S$ must immediately close the connection with the client $C$.

Otherwise, $S$ must reply with a response $s$.
If $s$ is an error response, the part of $s$ following `ERR;` must be a human-comprehensible, succint textual description of the error.
Otherwise, if $s$ is an ok response, the first of two numbers following `OK;` must be the *response time*, i.e., the number of seconds $S$ took to process $r$, with at least 3 digits after the decimal separator (millisecond precision).

#### Stat requests

If $r$ is a stat request, $S$ replies with an ok response whwere the second number is:
- the number of ok responses served by $S$ (excluding $r$) to all clients since it started, if $r$ is `STAT_REQS`;
- the average response time of all ok responses served by $S$ (excluding $r$) to all clients since it started, if $r$ is `STAT_AVG_TIME`;
- the maximum response time of all ok responses served by $S$ (excluding $r$) to all clients since it started, if $r$ is `STAT_MAX_TIME`.

#### Computation requests

If $r$ is a computation request, $S$ does the following steps:
1. parse a variable-values function $a$ from the `VariableValuesFunction` part of $r$
2. build a list $T$ of *value tuples* from $a$, each value tuple specifying one value for each $v$ of the variables for which $a(v)\ne \emptyset$, depending on the `ValuesKind` part of $r$
3. parse a non-empty list $E = (e_1, \dots, e_n)$ of expressions from the `Expressions` part of $r$
4. compute a value $o$ on $T$ and $E$ depending on the `ComputationKind` part of $r$

Then, if any of the steps above fails, $S$ replies with an error response.
Otherwise $S$ replies with an ok response $s$ where the second number in $s$ is $o$.

##### Step 1: parsing of `VariableValuesFunction` to $a$

First, a list $I$ of tuples $(v, x_\text{lower}, x_\text{step}, x_\text{upper})$ is obtained by parsing each `VariableValues`.
If, for any tuple, $x_\text{step}<=0$, the step fails.

Second, $a: V \to \mathcal{P}(\mathbb{R})$ is built as follow:  
$a(v) = \begin{cases} \emptyset & \text{if no tuple for } v \text{ exists in } I \\ (x_\text{lower}+k x_\text{step}: x_\text{lower}+k x_\text{step} \le x_\text{upper}){}_{k \in \mathbb{N}} & \text{otherwise}\end{cases}$

For example, `x0:-1:0.1:1,x1:-10:1:20` is parsed such that $a($`x0`$)=(-1,-0.9, \dots, 0.9,1)$, $a($`x1`$)=(-10,-9, \dots, 19,20)$, and $a(v)=\emptyset$ for any other $v$.

##### Step 2: building of value tuples

If `ValuesKind` is `GRID`, than $T$ is the cartesian product of all the non empty lists in the image of $a$.

Otherwise, if `ValuesKind` is `LIST`, if the non empty lists in the image of $a$ do not have the same lenght, the step fails.
Otherwise, $T$ is the element-wise merging of those lists.

For example, for an $a$ parsed from `x:1:1:3,y:2:2:6`:
- $T=( (1,2), (2,2), (3,2), \dots, (1,6), (2,6), (3,6) )$ if `ValuesKind` is `GRID`;
- $T=( (1,2), (2,4), (3,6) )$ if `ValuesKind` is `LIST`.

where `x` and `y` are omitted in $T$ elements for brevity.
