Next.js crashes on some incorrectly formatted api routes when there's a catch-all page and Datadog's `dd-trace` is enabled.

## To reproduce

1. Run `yarn build`
1. Run `yarn start` (which runs `NODE_OPTIONS='--require ./datadog' next start`)
1. Visit [http://localhost:3000/api/%ff](http://localhost:3000/api/%ff)

There is no stack trace related to dd-trace, but the Next.js server crashes with the following stack trace:

```
./node_modules/next/dist/shared/lib/router/utils/route-matcher.js:18
                throw new _utils.DecodeError('failed to decode param');
                      ^
DecodeError: failed to decode param
    at decode (./node_modules/next/dist/shared/lib/router/utils/route-matcher.js:18:23)
    at ./node_modules/next/dist/shared/lib/router/utils/route-matcher.js:26:80
    at Array.map (<anonymous>)
    at ./node_modules/next/dist/shared/lib/router/utils/route-matcher.js:26:67
    at Array.forEach (<anonymous>)
    at Object.match (./node_modules/next/dist/shared/lib/router/utils/route-matcher.js:22:29)
    at NextNodeServer.handleApiRequest (./node_modules/next/dist/server/base-server.js:538:39)
    at processTicksAndRejections (node:internal/process/task_queues:96:5)
error Command failed with exit code 1.
```

The crash happens for all dd-trace versions between 1.2.0 and 2.3.1. Below that seems fine.
