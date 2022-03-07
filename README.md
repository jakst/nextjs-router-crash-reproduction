Next.js crashes on some special routes when there's a catch-all page.

## To reproduce

1. Run `yarn build`
1. Run `yarn start`
1. Visit [http://localhost:3000/%ff](http://localhost:3000/%ff)

You will get a `400 Bad Request` instead of `404 Page Not Found` on the document request, but there will also be an underlying server crash that gets logged if you add an `_error` page.

The stack trace for the crash looks like this:

```
DecodeError: failed to decode param
  at decode (./node_modules/next/dist/shared/lib/router/utils/route-matcher.js:18:23)
  at ./node_modules/next/dist/shared/lib/router/utils/route-matcher.js:29:21
  at Array.forEach (<anonymous>)
  at Object.match (./node_modules/next/dist/shared/lib/router/utils/route-matcher.js:23:29)
  at NextNodeServer.renderToResponse (./node_modules/next/dist/server/base-server.js:1072:49)
  at processTicksAndRejections (node:internal/process/task_queues:96:5)
  at async NextNodeServer.pipe (./node_modules/next/dist/server/base-server.js:623:25)
  at async Object.fn (./node_modules/next/dist/server/base-server.js:496:21)
  at async Router.execute (./node_modules/next/dist/server/router.js:228:32)
  at async NextNodeServer.run (./node_modules/next/dist/server/base-server.js:600:29)
```
