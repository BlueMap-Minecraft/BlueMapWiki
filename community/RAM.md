---
layout: page
title: BlueMap and RAM
parent: Community Guides
nav_order: 16
---

# BlueMap and RAM
{: .no_toc }

BlueMap generally does not *need* a lot of memory.

In fact, BlueMap has been proven to work with just 512MB of assigned memory!

The more render-threads you have assigned (in `core.conf`), the more RAM BlueMap will need, so you can lower the amount of used memory by lowering the amount of threads.

However, this does not mean that BlueMap won't use more RAM *if it is available*.

So do not be alarmed if you notice that BlueMap seems to be using a lot of RAM.
This is actually perfectly normal and should not be an actual problem.

There are multiple things that contribute to this effect:

### 1. Unused RAM
BlueMap is using **unused** heap-space (RAM) to cache some things
like e.g. chunk-data and resources to improve performance.
But as soon as your JVM (your server) needs this cache-space somewhere else, it can do so!
BlueMap is not hard-reserving that space, so it can't cause an OOM because of this.
*(Technically this is done using a [SoftValue-Cache](<https://www.baeldung.com/java-caching-caffeine#3-reference-based-eviction>))*  
After all, it is always said that unused RAM is wasted RAM.

### 2. Garbage Collection
RAM/Heap management in your JVM is done using a Garbage Collector.
Your JVM runs this GC in intervals to free up heap-space that is no-longer used.
If you have a big heap of multiple GBs, depending on your GC-configuration,
it can wait for a long time until it decides to run the GC and free some space.
This has the effect that your RAM-Usage will keep climbing until the GC is ran.
**Or:** until you restart the server.

So if you remove BlueMap to prove that it is using a lot of RAM,
what you actually did is you restarted the server,
resetting your heap that has risen to a higher amount
and now it looks like you have much less heap-usage,
but all it actually is just a freshly cleaned heap
which will rise again if the server runs for a while,
even if BlueMap is removed now.

## Conclusion
If you are having OOM errors, it is usually unlikely that BlueMap is causing them.
In fact, BlueMap has been tested to run fine with only 500MB of RAM!  
However, if you still believe it's BlueMap causing your OOM,
then please use the Java startup flag `-XX:+HeapDumpOnOutOfMemoryError`
to create a heap-dump the next time an OOM occurs,
and send it in the [Discord](https://bluecolo.red/map-discord) in some way.  
(Heap-dumps are very big unfortunately, so you may need to use a cloud service)  
We are willing to analyse that heap-dump to check what actually has caused your OOM
and if it really was BlueMap :)

