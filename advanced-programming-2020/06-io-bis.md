### Example

Suppose the device:
- contains 5 bytes from time $t=0$ to $t=10$ (seconds)
- receives other 3 bytes, with a trailing EOS, at $t=10$

.cols[
.c50[
.diagram.io.center[
link([50,100,300,100,'>'],'axis')
link([80,95,80,105])
array(30,30,20,20,5,0)
link([80,60,80,90,'>'])
array(35,150,20,20,5,3)
link([85,140,85,110,'>'])
array(160,30,20,20,9,3,8)
link([250,60,250,90,'>'])
array(165,150,20,20,9,6,8)
link([255,140,255,110,'>'])
array(165,190,20,20,9,8,8)
array(165,230,20,20,9,8,8)
]
]
.c50[
```java
is.read(buf, 0, 2);
// starts at t=0, ends at t~0, ret 2
is.read(buf, 0, 3); // BLOCK!
// starts at t~0, ends at t~10, ret 3
is.read(buf, 0, 4);
// starts at t~10, ends at t~10, ret 2
is.read(buf, 0, 5);
// starts at t~10, ends at t~10, ret -1
```
]
]

---

## Blocking `read()`

"The device receive": the `InputStream` receive for the underlying level, eventually from a physical devices

Keyboard $\rightarrow$ `InputStream System.in`
- the user types (and hit enter) $\rightarrow$ `InputStream` receives bytes

Network connection $\rightarrow$ `InputStream getInputStream()`
- data from the network arrives to this socket $\rightarrow$ receives bytes

---

## Internally

`read​(byte[] b, int off, int len)` in `InputStream`:
> The `read(b, off, len)` method for class `InputStream` simply calls the method `read()` repeatedly.

.javadoc[
.methods[
| Mod. and Type | Method | Description |
| --- | --- | --- |
| abstract int | read() | Reads the next byte of data from the input stream. |
]
Reads the next byte of data from the input stream. The value byte is returned as an `int` in the range `0` to `255`. If no byte is available because the end of the stream has been reached, the value `-1` is returned. This method blocks until input data is available, the end of the stream is detected, or an exception is thrown.
]

`read()` read one `byte`, but returns an `int`: why?
- because the semantics of the return value includes a special value (`-1`) representing EOS
- domain of `byte` does not include `-1`

---

### `-1` in `read()` and `write()`

Other alternatives for representing EOS:
- returning a `Byte`, `null` for EOS
  - object creation overhead; uses heap, slower
- throwing an exception .note[we ignore exceptions now; we'll see]
  - EOS is not an exception, indeed; it's the norm

Java inventors **chose** to use an `int` as return value
- for consistency `read(byte[], int, int)` also returns an `int`
- for consistency `write(int)` in `OutputStream` takes an `int`!

.javadoc[
.methods[
| Mod. and Type | Method | Description |
| --- | --- | --- |
| abstract void | write(int b) | Writes the specified byte to this output stream. |
]
Writes the specified byte to this output stream. The general contract for `write` is that one byte is written to the output stream. The byte to be written is the **eight low-order bits** of the argument `b`. The 24 high-order bits of `b` are ignored.
]

---

## `File`

Surprisingly, the `File` class does not represent a file!

.javadoc.head[
**Package** .pack[java.io]

.def[Class File]

.pack[java.lang.Object]  
.indent[]java.io.File
]
.javadoc[
An abstract representation of file and directory pathnames.

User interfaces and operating systems use system-dependent pathname strings to name files and directories. This class presents an abstract, system-independent view of hierarchical pathnames.
]

- "An abstract representation of file and directory **pathnames**".
- "system-independent view of hierarchical **pathnames**"

(a rather long description follows)

---

### `File` system-independent view

<iframe width="100%" height="500" src="https://docs.oracle.com/en/java/javase/13/docs/api/java.base/java/io/File.html"></iframe>

---

## Not a file!

No methods for reading and writing!

Methods for:
- removing, renaming, listing (`File` represents dirs too), ...

.javadoc.methods[
| Mod. and Type | Method | Description |
| --- | --- | --- |
| boolean | canExecute() | Tests whether the application can execute the file denoted by this abstract pathname. |
| boolean | canRead() | Tests whether the application can read the file denoted by this abstract pathname. |
| boolean | canWrite() | Tests whether the application can modify the file denoted by this abstract pathname. |
| boolean | delete() | Deletes the file or directory denoted by this abstract pathname. |
| boolean | exists() | Tests whether the file or directory denoted by this abstract pathname exists. |
| boolean | isDirectory() | Tests whether the file denoted by this abstract pathname is a directory. |
| String[] | list() | Returns an array of strings naming the files and directories in the directory denoted by this abstract pathname. |
| File[] | listFiles() | Returns an array of abstract pathnames denoting the files in the directory denoted by this abstract pathname. |
| boolean | mkdir() | Creates the directory named by this abstract pathname. |
| boolean | renameTo​(File dest) |Renames the file denoted by this abstract pathname. |
| boolean | setExecutable​(boolean executable) | A convenience method to set the owner's execute permission for this abstract pathname. |
]

---

### Open with `FileOutputStream`

`FileOutputStream​(File file)` and `FileOutputStream​(String name)`:
- if `file`/`name` does not exist, creates new one .note[if OS says it's possible]
- puts the cursor at 0

$\rightarrow$ **existing content is cancelled**!
- if you want to append, use the constructors with `boolean append`!
