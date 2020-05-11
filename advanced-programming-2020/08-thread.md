class:middle,center

## Multithreading

---

## Get rid of `Simple`...

```java
public void start() throws IOException {
  ServerSocket serverSocket = new ServerSocket(port);
  while (true) {
    Socket socket = serverSocket.accept();
    `handleClient(socket)`;
  }
}
```

`accept()` wait for connection requests and blocks until one client sends one.  
`handleClient()` returns only upon completion of client handling.
.center[
$\Downarrow$

This server handles at most 1 client at a time.
]

---

### One at a time

Possible other clients hang until the handled one disconnects.

0. $S$ is on `accept()`
1. Client $C_1$ connects to $S$; $S$ is on `handleClient()`
2. Client $C_2$ "connects" to $S$; OS of $S$ takes the connection request and waits for $S$ to handle it
3. ...
4. $C_1$ says `bye`; $S$ goes to `accept()`

This server is not particularly useful!
- that's why we called it `Simple`...`Server`

---

## Goal

A server that can handle many client at a time.

```java
public void start() throws IOException {
  ServerSocket serverSocket = new ServerSocket(port);
  while (true) {
    Socket socket = serverSocket.`accept()`;
    `handleClient(socket)`;
  }
}
```

$1+n$ **concurrent** processes:
- one "always" waiting for connection requests (`accept()`)
- $n$, one for each client (`handleClient()`)

---

## Thread

**Thread** = execution flow
- the JVM can execute more than one thread at a time
- a thread can be blocked (e.g., waiting for input) while the others continue to run

Process vs. thread:
- processes are concurrent flows managed by the OS
- thread are concurrent flows managed by the JVM
- both the JVM and the OS can exploit the hardware to actually run flows at the same time
  - (otherwise) they time-share the CPU

---

## `Thread`

.javadoc.head[
**Package** .pack[java.lang]

.def[Class Thread]

.pack[java.lang.Object]  
.indent[]java.lang.Thread
]
.javadoc[
A *thread* is a thread of execution in a program. The Java Virtual Machine allows an application to have multiple threads of execution running concurrently.

There are two ways to create a new thread of execution. One is to declare a class to be a subclass of Thread. This subclass should override the run method of class Thread. An instance of the subclass can then be allocated and started.
]

.javadoc.methods[
| Mod. and Type | Method | Description |
| --- | --- | --- |
| void | start() | Causes this thread to begin execution; the Java Virtual Machine calls the `run` method of this thread. |
| void | run() | If this thread was constructed using a separate `Runnable` run object, then that `Runnable` object's run method is called; otherwise, this method does nothing and returns.
]

Two methods: we see the first.
1. define a class $T$ that extends `Thread` and overrides `run()`
2. invoke $T$`.start()` (that will invoke `run()`)

---

## Example

```java
public class SlowCounter extends Thread {
  public void run() {
    for (int i = 0; i < 10000; i++) {
      if (i % 1000 == 0) {
        System.out.printf("%s: %2d%n", toString(), i / 1000);
      }
    }
  }
}
```

.cols[
.c50[
```java
SlowCounter c1 = new SlowCounter();
SlowCounter c2 = new SlowCounter();
c1.start();
c2.start();
```
]
.c50[
.compact[
```bash
Thread[Thread-0,5,main]:  0
Thread[Thread-1,5,main]:  0
Thread[Thread-0,5,main]:  1
Thread[Thread-1,5,main]:  1
Thread[Thread-0,5,main]:  2
Thread[Thread-1,5,main]:  2
Thread[Thread-0,5,main]:  3
Thread[Thread-1,5,main]:  3
Thread[Thread-0,5,main]:  4
Thread[Thread-1,5,main]:  4
Thread[Thread-0,5,main]:  5
...
Thread[Thread-0,5,main]:  9
Thread[Thread-1,5,main]:  9
```

]
]
]

The JVM executes until the last thread has ended.
---

## `start()`

```java
SlowCounter c1 = new SlowCounter();
SlowCounter c2 = new SlowCounter();
c1.start();
c2.start();
```

When `start()` is invoked:
1. the JVM starts a new thread, i.e., a new exeucution flow
2. the execution flow of the caller **immediately returns**
3. the new execution flow goes on with `run()`

.note[Thread is the execution flow; `Thread` is the class.]

---

### `start()` vs. `run()`

Invoking `run()` **does not** cause the JVM to start a new thread!

.cols[
.c50[
```java
SlowCounter c1 = new SlowCounter();
SlowCounter c2 = new SlowCounter();
c1.run();
c2.run();
```
]
.c50[
.compact[
```bash
Thread[Thread-0,5,main]:  0
Thread[Thread-0,5,main]:  1
Thread[Thread-0,5,main]:  2
Thread[Thread-0,5,main]:  3
Thread[Thread-0,5,main]:  4
Thread[Thread-0,5,main]:  5
Thread[Thread-0,5,main]:  6
Thread[Thread-0,5,main]:  7
Thread[Thread-0,5,main]:  8
Thread[Thread-`0,5`,main]:  `9`
Thread[Thread-`1,5`,main]:  `0`
Thread[Thread-1,5,main]:  1
Thread[Thread-1,5,main]:  2
Thread[Thread-1,5,main]:  3
Thread[Thread-1,5,main]:  4
Thread[Thread-1,5,main]:  5
Thread[Thread-1,5,main]:  6
Thread[Thread-1,5,main]:  7
Thread[Thread-1,5,main]:  8
Thread[Thread-1,5,main]:  9
```
]
]
]

---

## Thread and memory

Each thread:
- has **its own stack**
- share the **unique heap**

---

### Diagram

.cols[
.c50[
.compact[
```java
class SlowCounter extends Thread {
  public void run() {
    PrintStream ps = System.out;
    for (int i = 0; i < 10; i++) {
      ps.println(i);
    }
  }
}
```
]
]
.c50[
.compact[
```java
public static void main(String[] args) {
  SlowCounter c1 = new SlowCounter();
  SlowCounter c2 = new SlowCounter();
  c1.start();
  c2.start();
}
```
]
]
]

At some point during the execution:
.center.diagram.or[
zone(0,0,140,200,'Stack T0')
zone(150,0,140,200,'Stack T1')
zone(300,0,140,200,'Stack T2')
zone(450,0,200,200,'Heap')
zone(10,120,120,70,'main()','code')
zone(160,120,120,70,'start()','code')
zone(310,120,120,70,'start()','code')
zone(160,25,120,70,'run()','code')
zone(310,25,120,70,'run()','code')
obj(170,50,50,35,'int i','2')
obj(320,50,50,35,'int i','3')
ref(250,70,'ps')
ref(400,70,'ps')
obj(470,160,140,35,'SlowCounter')
obj(470,100,140,35,'SlowCounter')
obj(470,40,140,35,'PrintStream')
ref(30,170,'c1')
ref(80,170,'c2')
link([410,70,455,70,455,50,460,50,470,57.5])
link([250,80,250,90,460,90,460,57.5,470,57.5])
link([90,170,455,170,455,117.5,470,117.5])
link([30,180,30,195,460,195,460,177.5,470,177.5])
]

`out` is `static` in `System`!

---

## Good practice

Assume $C$ `extends Thread` is the class that does the job concurrently.

Put in $C$ constructor all and only the things that has to be shared.

---

## Multithreaded `LineProcessingServer`

.compact[
```java
public class LineProcessingServer {

  private final int port;
  private final String quitCommand;

  public LineProcessingServer(int port, String quitCommand) {
    this.port = port;
    this.quitCommand = quitCommand;
  }

  public void start() throws IOException {
    ServerSocket serverSocket = new ServerSocket(port);
    while (true) {
      Socket socket = serverSocket.accept();
      ClientHandler clientHandler = `new ClientHandler(socket, quitCommand)`;
      `clientHandler.start()`;
    }
  }

}
```
]

---

## `ClientHandler`

.compact[
```java
public class ClientHandler extends Thread {

  private final Socket socket;
  private final String quitCommand;

  public ClientHandler(Socket socket, String quitCommand) {
    this.socket = socket;
    this.quitCommand = quitCommand;
  }

  `public void run()` {
    /* ... */
  }

  protected String `process(String input)` {
    return input;
  }

}
```
]

Note: `run()` signature cannot be modified
- cannot add `throws IOException`

---

## `ClientHandler.run()`

.compact[
```java
public void run() {
  try {
    BufferedReader br = new BufferedReader(new InputStreamReader(socket.getInputStream()));
    BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(socket.getOutputStream()));
    while (true) {
      String line = br.readLine();
      if (line.equals(quitCommand)) {
        socket.close();
        break;
      }
      bw.write(process(line) + System.lineSeparator());
      bw.flush();
    }
  } catch (IOException e) {
    e.printStackTrace();
  } finally {
    try {
      socket.close();
    } catch (IOException e) {
      e.printStackTrace();
    }
  }
}
```
]

Basically the same as before...
- with a lot of `try`, `catch`, `finally`... because `throws` cannot be used; we'll see

---

### "Usage" of `LineProcessingServer`

1. Define a class $H$ that:
  - extends `ClientHandler`
  - overrides `process()`
2. Define a class $S$ that:
  - extends (or "is like") `LineProcessingServer`
  - instantiates $H$

A bit cumbersome:
- word counter: define $H_1$ and $S_1$
- uppercaser: define $H_2$ and $S_2$

---

## Concurrent execution

The **same method** of the **same object** can be executed at the same time by different threads!

Idea:
- the server class $S$ specify the application details:
  - how to process one request
  - what is the quit command
- `ClientHandler` just knows how to handle one client
  - i.e., manage the request-response interaction
  - delegates to $S$ for actual server behavior

---

### Better `LineProcessingServer`

.compact[
```java
public class LineProcessingServer {

  private final int port;
  private final String quitCommand;

  public LineProcessingServer(int port, String quitCommand) {
    this.port = port;
    this.quitCommand = quitCommand;
  }

  public void start() throws IOException {
    ServerSocket serverSocket = new ServerSocket(port);
    while (true) {
      Socket socket = serverSocket.accept();
      ClientHandler clientHandler = `new ClientHandler(socket, this)`;
      `clientHandler.start()`;
    }
  }

  `public String process(String input)` {
    return input;
  }

  `public String getQuitCommand()` {
    return quitCommand;
  }

}
```
]

---

### Agnostic `ClientHandler`

.compact[
```java
public class ClientHandler extends Thread {

  private final Socket socket;
  private final `LineProcessingServer server`;

  public ClientHandler(Socket socket, LineProcessingServer server) {
    this.socket = socket;
    this.server = server;
  }

  public void run() {
    try {
      BufferedReader br = new BufferedReader(new InputStreamReader(socket.getInputStream()));
      BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(socket.getOutputStream()));
      while (true) {
        String line = br.readLine();
        if (line.equals(`server.getQuitCommand()`)) {
          socket.close();
          break;
        }
        bw.write(server.`process(line)` + System.lineSeparator());
        bw.flush();
      }
    } catch (IOException e) { /* ... */
    } finally { /* ... */ }
  }

}
```
]

---

### "Usage" of better `LineProcessingServer`

1. Define a class $S$ that:
  - extends `LineProcessingServer` and overrides `process()`

Elegant!

Note:
- at runtime, many threads may execute `process()` at the same time

**Possible source of big problems!**

---

## Thread scheduling

The JVM:
- knows the set $T$ of existing threads and at which **bytecode instruction** they are
- knows the subset $T' \subseteq T$ of not blocked threads
- knows the set $C$ of available cores
  - hardware or virtualized, provided by the OS

At each time step:
- for each core in $C$
  - select one thread in $T'$ and executes the next bytecode instruction

---

## Thread interference

$\Rightarrow$ threads execute concurrenly only apparently!

Suppose:
- only one core ($|C|=1$)
- thread $t_1$ next instructions: $a_1, b_1, c_1$
- thread $t_2$ next instructions: $a_2, b_2, c_2$

Some possible actual executions:
- $a_1, b_1, c_1, a_2, b_2, c_2$
- $a_1, a_2, b_1, b_2, c_1, c_2$
- $a_2, b_2, a_1, c_2, b_1, c_1$
- ...

.question[Is $a_2, b_1, a_1, c_2, b_2, c_1$ possible?]

---

### Bytecode and Java statements

One Java statement:
```java
System.out.printf("a+b=%d%n", a + b);
```

$\rightarrow \gg 1$ bytecode instructions!
- in a multithreaded execution, this statement execution might be interleaved with other statements execution

Even worse!
- exact sequence of execution is **not predictable**!
- source of very bad bugs:
  - **not easily reproducible**
  - difficult to spot

---

## `Counter` example

.cols[
.c50[
.compact[
```java
public class Counter {
  private int c = 0;
  public int incAndGet() {
    c = c + 1;
    return c;
  }
  public int decAndGet() {
    c = c - 1;
    return c;
  }
}
```
```java
Counter c = new Counter();
(new IncThread(c)).start();
(new DecThread(c)).start();
```
]
]
.c50[
.compact[
```java
public class IncThread extends Thread {
  private final Counter c;
  public IncThread(Counter c) {
    this.c = c;
  }
  public void run() {
    System.out.print(c.incAndGet() + " ");
  }
}
```
```java
public class DecThread extends Thread {
  /* ... */
}
```
]
]
]

Possible outputs:
- `1 0` ("lucky")
- `0 0`
- `-1 0`

Eventually `c=0`; meanwhile could be `-1`, `0`, `1`.

---

## `synchronized`

Methods defined with the `synchronized` modifier cannot be executed **on the same object** by more than one thread **at the same time**.
- from the point of view of the executing thread, the method execution is **atomic**

Atomicity is guaranteed just on the method!

---

## `AtomicCounter`

.cols[
.c50[
.compact[
```java
public class `AtomicCounter` {
  private int c = 0;
  public `synchronized` int incAndGet() {
    c = c + 1;
    return c;
  }
  public `synchronized` int decAndGet() {
    c = c - 1;
    return c;
  }
}
```
```java
Counter c = new Counter();
(new IncThread()).start();
(new DecThread()).start();
```
]
]
.c50[
.compact[
```java
public class IncThread extends Thread {
  private final Counter c;
  public CounterThread(Counter c) {
    this.c = c;
  }
  public void run() {
    System.out.print(c.inc() + " ");
  }
}
```
```java
public class DecThread extends Thread {
  /* ... */
}
```
]
]
]

Possible outputs:
- `1 0`
- `-1 0`

`0 0` is no more possible!

---

## Thread-safe classes

A method invocation outcome in case of multiple threads:
- may be not specified (i.e., not predictable)
- may cause an exception to be thrown

The method/class is said to be not **thread-safe**.

Since atomicity is a common requirement, the JDK provides:
- thread-safe versions of some key classes
  - e.g., [`AtomicInteger`](https://docs.oracle.com/en/java/javase/13/docs/api/java.base/java/util/concurrent/atomic/AtomicInteger.html)
- ways to make thread-safe some non thread-safe classes
  - e.g., [`Collections.synchronizedCollection()`](https://docs.oracle.com/en/java/javase/13/docs/api/java.base/java/util/Collections.html)

---

## `synchronized` block

`synchronized` can be applied to code blocks, instead of to entire methods:

```java
Counter c = /* ... */
for (int i = 0; i < 10; i++) {
  `synchronized (c) {`
    System.out.print(c.get() + " -> ");
    c.inc();
    System.out.println(c.get());
  `}`
}
```

The synchronized block can be executed on the same `Counter` object (`c`, here) by at most one thread at a time.

.question[What's the output with/without `synchronized` with two threads on the same counter?]

.question[What if `c` is instantiated here?]

<!-- mention AtomicInteger, mention thread-safe version of classes -->
