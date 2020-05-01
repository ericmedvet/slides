class: center, middle

## Socket I/O

---

## Background

Basic notions:
- every **host** has a unique **IP address**
- every **process** on an host has a unique **port number**

**TCP connection**: a pair of "pipes" transferring bytes
- every byte sent on one endpoint reaches the other endpoint
- bytes arrives with the same order they have been sent
- no duplication

**Server**: a process waiting for connection requests on a port

**Client**: a process requesting a connection to a server

---

## `InetAddress`

.javadoc.head[
**Package** .pack[java.net]

.def[Class InetAddress]

.pack[java.lang.Object]  
.indent[]java.net.InetAddress
]
.javadoc[
This class represents an Internet Protocol (IP) address.
]

.javadoc.methods[
| Mod. and Type | Method | Description |
| --- | --- | --- |
| static InetAddress[] | getAllByName​(String host) | Given the name of a host, returns an array of its IP addresses, based on the configured name service on the system. |
| static InetAddress | getByAddress​(byte[] addr) | Returns an `InetAddress` object given the raw IP address. |
| static InetAddress | getByAddress​(String host, byte[] addr) | Creates an `InetAddress` based on the provided host name and IP address. |
| static InetAddress | getByName​(String host) | Determines the IP address of a host, given the host's name. |
| static InetAddress | getLocalHost() | Returns the address of the local host. |
]

No public constructors; many contructor-like methods.

---

## `Socket`

.javadoc.head[
**Package** .pack[java.net]

.def[Class Socket]

.pack[java.lang.Object]  
.indent[]java.net.Socket
]
.javadoc[
This class implements client sockets (also called just "sockets"). A socket is an endpoint for communication between two machines.
]

.javadoc.constructors[
| Constructor | Description |
| --- | --- |
| Socket() | Creates an unconnected Socket. |
| Socket​(String host, int port) | Creates a stream socket and connects it to the specified port number on the named host. |
| Socket​(InetAddress address, int port) | Creates a stream socket and connects it to the specified port number at the specified IP address. |
]

.javadoc.methods[
| Mod. and Type | Method | Description |
| --- | --- | --- |
| void | close() | Closes this socket. |
| OutputStream | getOutputStream() | Returns an output stream for this socket. |
| InputStream | getInputStream() | Returns an input stream for this socket. |
]

Sample usage on **client side**:
```java
Socket socket = new Socket("theserver.org", 10000);
InputStream is = socket.getInputStream();
OutputStream os = socket.getOutputStream();
/* do I/O things */
```

---

## `ServerSocket`

.javadoc.head[
**Package** .pack[java.net]

.def[Class ServerSocket]

.pack[java.lang.Object]  
.indent[]java.net.ServerSocket
]
.javadoc[
This class implements server sockets. A server socket waits for requests to come in over the network.
]

.javadoc.constructors[
| Constructor | Description |
| --- | --- |
| 	ServerSocket​(int port) | Creates a server socket, bound to the specified port. |
]

.javadoc.methods[
| Mod. and Type | Method | Description |
| --- | --- | --- |
| Socket | accept() | Listens for a connection to be made to this socket and accepts it. |
| void | close() | Closes this socket. |
]

Sample usage on **server side**:
```java
ServerSocket serverSocket = new ServerSocket(10000);
Socket socket = serverSocket.accept();
InputStream is = socket.getInputStream();
OutputStream os = socket.getOutputStream();
/* do I/O things */
```

---

### Blocking `accept()`

`public Socket accept() throws IOException`
> Listens for a connection to be made to this socket and accepts it. The method **blocks until a connection is made**.

---

## Example: uppercaser server

Protocol (upon connection):
- client sends one text line $l$
- server replies with $l'=l$ converted to uppercase
  - if $l'=$ `BYE`, server closes connection; otherwise waits for next line

Server:
- listens on port 7979
- handles 1 client at a time
- never terminates

.note[No bad things can happen: e.g, client does not close the connection.]

---

## `SimpleUppercaseServer`

.compact[
```java
public class SimpleUppercaserServer {

  private static final int PORT = 10000;
  private static final String CLOSE_COMMAND = "BYE";

  public static void main(String[] args) throws IOException {
    ServerSocket serverSocket = new ServerSocket(PORT);
    while (true) {
      Socket socket = serverSocket.accept();
      BufferedReader br = new BufferedReader(
        new InputStreamReader(socket.getInputStream())
      );
      BufferedWriter bw = new BufferedWriter(
        new OutputStreamWriter(socket.getOutputStream())
      );
      while (true) {
        String line = br.readLine();
        bw.write(line.toUpperCase()` + System.lineSeparator()`);
        `bw.flush()`;
        if (line.equals(CLOSE_COMMAND)) {          
          break;
        }
      }
      socket.close();
    }
  }
}
```
]

.note[`import`s omitted for brevity]

---

### Socket `close()`

`public void close() throws IOException`

> Closes this socket.

> Once a socket has been closed, it is not available for further networking use (i.e. can't be reconnected or rebound). A new socket needs to be created.

> Closing this socket will also close the socket's `InputStream` and `OutputStream`.

---

## `LineClient`

.compact[
```java
public class LineClient {

  public static void main(String[] args) throws IOException {
    InetAddress serverInetAddress;
    if (args.length > 1) {
      serverInetAddress = InetAddress.getByName(args[0]);
    } else {
      serverInetAddress = InetAddress.getLocalHost();
    }
    Socket socket = new Socket(serverInetAddress, 10000);
    BufferedReader br = new BufferedReader(
      new InputStreamReader(socket.getInputStream())
    );
    BufferedWriter bw = new BufferedWriter(
      new OutputStreamWriter(socket.getOutputStream())
    );
    for (int i = 0; i < 10; i++) {
      String sent = String.format("Hello world n. %d!", i);
      bw.write(sent` + System.lineSeparator()`);
      bw.`flush()`;
      String received = br.readLine();
      System.out.printf("Sent: %s%nReceived: %s%n",
          sent, received
      );
    }
    bw.write("bye" + System.lineSeparator());
    bw.flush();
    socket.close();
  }
}
```
]

.note[`import`s omitted for brevity]

---

## Make it more general: line processing server

Protocol (upon connection):
- client sends one text line $l$
- if $l=l_\text{quit}$, server closes connection, otherwise replies with processed line $l'=p(l)$

Server:
- listens on port $p$
- handles 1 client at a time .note[motivation for `Simple` prefix...]
- never terminates
- **designed** to be extended
- $p:$ `String` $\to$ `String`, $l_\text{quit}$, $p$ are parameters

.note[No bad things can happen: e.g, client does not close the connection.]

---

## `SimpleLineProcessingServer`

.compact[
```java
public class SimpleLineProcessingServer {

  private final int port;
  private final String quitCommand;

  public SimpleLineProcessingServer(int port, String quitCommand) {
    this.port = port;
    this.quitCommand = quitCommand;
  }

  public void start() throws IOException {
    ServerSocket serverSocket = new ServerSocket(`port`);
    while (true) {
      Socket socket = serverSocket.accept();
      BufferedReader br = new BufferedReader(new InputStreamReader(socket.getInputStream()));
      BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(socket.getOutputStream()));
      while (true) {
        String line = br.readLine();
        if (line.equals(`quitCommand`)) {          
          break;
        }
        bw.write(`process(line)` + System.lineSeparator());
        bw.flush();
      }
      socket.close();
    }
  }

  protected String process(String input) {
    return input;
  }

}
```
]

---

### Method as parameter

$p:$ `String` $\to$ `String` is a parameter.

$p$ is valued by overriding `process()` while extending `SimpleLineProcessingServer`:
```java
protected String process(String input) {
  return input.toUpperCase();
}
```

.note[We'll see another, radically different, option.]


---

## Add some logging

Log on an `OutputStream` received as parameter:
- current date/time, client IP at connection
- current date/time, client IP, number of requests at disconnection

```bash
eric@cpu:~$ java SimpleLineProcessingServer 10000 bye
[2020-04-30 18:17:54] Connection from /127.0.0.1.
[2020-04-30 18:18:06] Disconnection of /127.0.0.1 after 2 requests.
```

---

### Constructor and fields

.compact[
```java
public class SimpleLineProcessingServer {

  private final int port;
  private final String quitCommand;
  private final `PrintStream ps`;

  public SimpleLineProcessingServer(int port, String quitCommand, OutputStream os) {
    this.port = port;
    this.quitCommand = quitCommand;
    `ps = new PrintStream(os)`;
  }

  /* ... */

}
```
]

We use a `PrintStream` because:
- we log text
- it does some buffering
- (we are lazy)

.note[No need to close `ps` here, because the server is supposed to never terminate.]

---

### `start()` $\rightarrow$ `start()`+`handleClient()`
.compact[
```java
public void start() throws IOException {
  ServerSocket serverSocket = new ServerSocket(port);
  while (true) {
    Socket socket = serverSocket.accept();
    `handleClient(socket)`;
  }
}

protected void handleClient(Socket socket) throws IOException {
  ps.printf("`[%1$tY-%1$tm-%1$td %1$tT] Connection from %2$s`.%n", System.currentTimeMillis(), socket.getInetAddress());
  BufferedReader br = new BufferedReader(new InputStreamReader(socket.getInputStream()));
  BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(socket.getOutputStream()));
  int requestsCounter = 0;
  while (true) {
    String line = br.readLine();
    if (line.equals(quitCommand)) {
      break;
    }
    bw.write(process(line) + System.lineSeparator());
    bw.flush();
    requestsCounter = requestsCounter + 1;
  }
  socket.close();
  ps.printf("`[%1$tY-%1$tm-%1$td %1$tT] Disconnection of %2$s after %3$d requests`.%n", System.currentTimeMillis(), socket.getInetAddress(), requestsCounter);
}
```
]

Might define a `private void log(String)` method.

.note[For serious logging, use [`java.util.logging.Logger`](https://docs.oracle.com/en/java/javase/13/docs/api/java.logging/java/util/logging/Logger.html).]

---

class: lab
name: exercise2

## Word counter server .note[~1h]

1. Design and implement a line processing server *application* (i.e., a class that extends `SimpleLineProcessingServer` with a `main()`) that:
  - returns the number of words in the input line $l$
  - exists with `"bye"`
  - listens on port 10000
2. Test it using telnet
  - try removing `flush()` call

.note[It likely won't work on repl.]

---

## Vector processing server

Protocol (upon connection):
- client sends one real vector $\vec{v}$
- if $|\vec{v}|=0$, server closes connection, otherwise sends as reply the processed line $\vec{v}'=p(\vec{v})$

Protocol detail: "send real vector" $\vec{v}$
1. send one `int` (4 bytes) $n=|\vec{v}|$
2. send $n$ `double`s (8 bytes each)

Server:
- listens on port 7979, handles 1 client at a time, never terminates

---

## `SimpleRealVectorProcessingServer`: `handleClient()`

.compact[
```java
protected void handleClient(Socket socket) throws IOException {
  ps.printf("[%1$tY-%1$tm-%1$td %1$tT] Connection from %2$s.%n", System.currentTimeMillis(), socket.getInetAddress());
  int requestsCounter = 0;
  `DataInputStream` dis = new DataInputStream(new BufferedInputStream(socket.getInputStream()));
  `DataOutputStream` dos = new DataOutputStream(new BufferedOutputStream(socket.getOutputStream()));
  while (true) {
    double[] input = `readVector(dis)`;
    if (input.length == 0) {
      break;
    }
    `writeVector(dos, process(input))`;
    requestsCounter = requestsCounter + 1;
  }
  socket.close();
  ps.printf("[%1$tY-%1$tm-%1$td %1$tT] Disconnection of %2$s after %3$d requests.%n", System.currentTimeMillis(), socket.getInetAddress(), requestsCounter);
}
```
]

Might extend `SimpleLineProcessingServer`.

---

### Protocol: `readVector()`, `writeVector()`

.compact[
```java
private double[] readVector(DataInputStream dis) throws IOException {
  int length = dis.`readInt()`;
  double[] values = new double[length];
  for (int i = 0; i<values.length; i++) {
    values[i] = dis.`readDouble()`;
  }
  return values;
}

private void writeVector(DataOutputStream dos, double[] values) throws IOException {
  dos.`writeInt(values.length)`;
  for (double value : values) {
    dos.`writeDouble(value)`;
  }
  `dos.flush()`;
}

protected double[] process(double[] input) {
  return input;
}
```
]

Might have defined `EnhancedDataInputStream`, `EnhancedDataOutputStream`:
- with `double[] readDoubleArray()` and `void writeDoubleArray(double[])`

---

## Message-based protocol

Previous examples implicitly defined a message-based protocol:
- `SimpleLineProcessingServer`: a message is a text line
- `SimpleRealVectorProcessingServer`: a message is vector encoded in a specified way

**TCP is not message-oriented**!

---

## TCP: byte stream

TCP guarantees that:
- every byte sent on one endpoint reaches the other endpoint
- bytes arrives with the same order they have been sent
- no duplication

but it **does not guarantee** that one `write()` of $m$ bytes on one endpoint corresponds to exactly one `read()` of $m$ bytes on the other endpoint!

In practice:
- $n \ge 1$ `read`s might be needed to collect $m$ bytes
- the last might include "other" bytes
- eventually, $m$ bytes arrive

---

### Example (of wrong solution)

Client $C$:
```java
byte[] oBuffer = /* ... */
os.write(oBuffer);
```
Assume `oBuffer` is $l \le$ 1024 at runtime.

Server $S$ connected to $C$:
```java
byte[] iBuffer = new byte[1024];
int n = is.read(iBuffer);
```
- `n` might be something between 1 and $l$
- `iBuffer` might actually contain only a (leading) portion of what `oBuffer` contained on the other endpoint!

---

### Even worse

Client $C$ (`oBuffer1`, `oBuffer2` lengths are $l_1$, $l_2$):
```java
os.write(oBuffer1);
os.write(oBuffer2);
```

Server $S$ connected to $C$:
```java
int n1 = is.read(iBuffer1);
int n2 = is.read(iBuffer2);
```
Possible outcomes:
- `n1` $=l_1$, `n2` $=l_2$ (fluke!)
- `n1` $\le l_1$, `n2` $\le l_2$
- `n1` $> l_1$, `n2` $\le l_2-($ `n1` $-l_1)$
- ...

---

## Protocol with `byte[]` messages

You cannot assume that 1 `read()` gives 1 message!

**You need a protocol** for taking the `byte[]` resulting from the concatenation of 1+ `read()`s and dividing it in **messages**.

If your protocol works with higher level encoding, this job can be partially done by JDK classes.
E.g.:
- text lines: `BufferedReader` reads as many bytes for reaching the new line character
- double array: the first 4 bytes (`DataInputStream`) specify how many other bytes need to be read (at least)

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

Java **thread**: execution flow
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
.indent[].java.lang.Thread
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
SlowCounter c1 = new SlowCounter();
SlowCounter c2 = new SlowCounter();
c1.start();
c2.start();
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

1. Define a class $C$ that:
  - extends `ClientHandler`
  - overrides `process()`
2. Define a class $S$ that:
  - extends (or "is like") `LineProcessingServer`
  - instantiates $C$

A bit cumbersome:
- word counter: define $C_1$ and $S_1$
- uppercaser: define $C_2$ and $S_2$

We'll see more practical methods.

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

$\Rightarrow$ threads executes concurrenly only apparently!

Suppose:
- only one core ($|C|=1$)
- thread $t_1$ next instructions: $a_1, b_1, c_1$
- thread $t_1$ next instructions: $a_2, b_2, c_2$

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

## Concurrent execution

The **same method** of the **same object** can be executed at the same time by different threads!

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
- `1 0` ("lucky")
- `0 0`
- `-1 0`

Eventually `c=0`; meanwhile could be `-1`, `0`, `1`.

---

## `synchronized`
