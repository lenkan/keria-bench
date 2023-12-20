# Run tests

To run tests with the pre set concurrency and count settings:

```
docker compose run --rm -it bench
```

You can pass arguments to apache bench by overriding the docker command:

```
docker compose run --rm -it bench -c 10 -n 10 http://keria:3902/spec.yaml
```

# Testing with hio-server

I have also added an example server just using hio and serving up an endpoint without content. It can be started like this:

```
docker compose up -d hio-server
```

And tested like this (note the trailing slash seems to be required):

```
docker compose run --rm -it bench -c 100 -n 1000 http://hio-server:8081/
```

# Testing with node.js client instead of apache bench

```
docker compose run --rm -it nodejs nodejs/client-fetch.js  http://keria:3902/spec.yaml
```

## Example outputs

This test run is 100 requests using a concurrency of 10.

```
$ docker compose run --rm -it bench -c 10 -n 100 http://keria:3902/spec.yaml
[+] Building 0.0s (0/0)                                                                                                                                                                                                                         docker:default
[+] Creating 1/0
 ✔ Container keria-bench-keria-1  Running                                                                                                                                                                                                                 0.0s
[+] Building 0.0s (0/0)                                                                                                                                                                                                                         docker:default
This is ApacheBench, Version 2.3 <$Revision: 1826891 $>
Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
Licensed to The Apache Software Foundation, http://www.apache.org/

Benchmarking keria (be patient).....done


Server Software:        Ioflo
Server Hostname:        keria
Server Port:            3902

Document Path:          /spec.yaml
Document Length:        24204 bytes

Concurrency Level:      10
Time taken for tests:   3.766 seconds
Complete requests:      100
Failed requests:        0
Total transferred:      2434200 bytes
HTML transferred:       2420400 bytes
Requests per second:    26.56 [#/sec] (mean)
Time per request:       376.572 [ms] (mean)
Time per request:       37.657 [ms] (mean, across all concurrent requests)
Transfer rate:          631.26 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0   31 178.3      0    1044
Processing:    74  327  64.6    345     407
Waiting:       73  326  64.5    344     406
Total:         74  358 166.8    345    1345

Percentage of the requests served within a certain time (ms)
  50%    345
  66%    348
  75%    365
  80%    391
  90%    405
  95%    407
  98%   1185
  99%   1345
 100%   1345 (longest request)

```

This is a test run with 100 concurrent requests. I let it run for 84 seconds before I aborted it. It seemed like it never even processed 12 of the requests.

```
$ docker compose run --rm -it bench -c 100 -n 100 http://keria:3902/spec.yaml
[+] Building 0.0s (0/0)                                                                                                                                                                                                                         docker:default
[+] Creating 1/0
 ✔ Container keria-bench-keria-1  Running                                                                                                                                                                                                                 0.0s
[+] Building 0.0s (0/0)                                                                                                                                                                                                                         docker:default
This is ApacheBench, Version 2.3 <$Revision: 1826891 $>
Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
Licensed to The Apache Software Foundation, http://www.apache.org/

Benchmarking keria (be patient)...^C

Server Software:        Ioflo
Server Hostname:        keria
Server Port:            3902

Document Path:          /spec.yaml
Document Length:        24204 bytes

Concurrency Level:      100
Time taken for tests:   84.709 seconds
Complete requests:      88
Failed requests:        0
Total transferred:      2142096 bytes
HTML transferred:       2129952 bytes
Requests per second:    1.04 [#/sec] (mean)
Time per request:       96259.910 [ms] (mean)
Time per request:       962.599 [ms] (mean, across all concurrent requests)
Transfer rate:          24.70 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0  690 511.9   1066    1066
Processing:    72 7911 15175.7    686   56133
Waiting:       71 7910 15175.7    685   56133
Total:         72 8601 15374.9   1751   57199

Percentage of the requests served within a certain time (ms)
  50%   1751
  66%   4834
  75%   8289
  80%  15637
  90%  29722
  95%  57199
  98%  57199
  99%  57199
 100%  57199 (longest request)
```
