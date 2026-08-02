# ngx-flowchart

ngx-flowchart is an Angular library for drag & drop modelling of graphs in web
applications. It supports drag & drop editing of nodes, connections and sticky
notes, rectangle selection, dragging nodes in from an external palette, and
fully customizable node rendering.

It is an Angular port of [ngFlowchart](https://github.com/DaHaiz/ngFlowchart),
originally written for AngularJS.

**Using the library in your application?** See
[`projects/ngx-flowchart/README.md`](projects/ngx-flowchart/README.md) for
installation, the model format, the `fc-canvas` API and how to supply your own
node components. This file covers working on the library itself.

## Repository layout

| Path | Contents |
|---|---|
| `projects/ngx-flowchart/` | The library. This is the published package. |
| `src/` | A demo application used to develop and exercise the library. |

## Development

Requires Node.js and [Yarn](https://classic.yarnpkg.com/). Install dependencies:

```bash
yarn install
```

Run the demo application, which reloads on source changes:

```bash
yarn start
```

It serves on [http://localhost:4300](http://localhost:4300) and imports the
library directly from source, so changes under `projects/ngx-flowchart/` are
picked up without a rebuild.

Build the library:

```bash
yarn build
```

Lint the library sources and templates:

```bash
yarn lint
```

## Releases

Each released version lives on its own `release/x.y.z` branch. Consumers depend
on the library by pointing a git ref at one of those branches rather than
installing from npm — see
[Installation](projects/ngx-flowchart/README.md#installation) for details and an
important caveat about the `ngx-flowchart` name on the npm registry.

Releasing a version means building the library and publishing the result to a
new `release/x.y.z` branch. The version in
`projects/ngx-flowchart/package.json` should match the branch name.

## License

Copyright 2016 ThingsBoard, Inc.

ngx-flowchart is licensed under the Apache License, Version 2.0. See
[LICENSE](LICENSE) for the full license text.

This library is an Angular port of [ngFlowchart](https://github.com/DaHaiz/ngFlowchart),
an AngularJS flowchart component developed by ONE LOGIC and licensed under the MIT
License (Copyright (c) 2015 ONE LOGIC). The original work has been modified and
extended. See [NOTICE](NOTICE) for the full attribution and the complete text of the
MIT License.
