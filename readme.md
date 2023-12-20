# Run tests

To run tests with the pre set concurrency and count settings:

```
docker compose run --rm -it bench
```

You can pass arguments to apache bench by overriding the docker command:

```
docker compose run --rm -it bench -c 10 -n 10 http://keria:3902/spec.yaml
```
