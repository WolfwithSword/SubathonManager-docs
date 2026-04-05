---
title: Development Setup
description: How to setup a dev environment for contributing
---

## Local Setup

Open the solution project in your IDE of choice and restore dependencies:

```bash
dotnet restore SubathonManager.sln
```

When building and running locally, set `SubathonManager.UI` as the startup project.

---

## Contributing

### Issues & Feature Requests

Please submit a GitHub issue for any bugs or feature requests.

!!! info
    Check if a similar issue or request already exists before submitting!

For bugs, you may be asked to attach a logfile. You can find this by opening the data folder from the Settings page and navigating to the `logs` directory.

### Pull Requests

- All PRs must be tied to an existing issue or enhancement before review.
- Describe in detail the use cases or situations your changes affect.
- Provide screenshots or recordings where possible.
- Maintainers will review all PRs prior to merging.


### New Widget Presets

If submitting a new preset, your PR should include **only** net-new files in the presets folder.

!!! info
    If you've made your own preset widgets you'd like to share freely, you can host them in your own repo and link to this project. We want a diverse set of presets without bloating the base install - submit an issue or discussion and we'd love to see them. A community list of overlays linked from the wiki may come eventually.

---

## Design

The design is documented in a [drawio diagram](../Design-Interactive.md).

Renders of the diagram are viewable on the [Design & Architecture](../Design.md) page. The diagram covers overall flow, per-service flow, DB organization, enums, config, and websocket data.

If you make changes that require design updates, detail them in your pull request so they can be reflected in the source.

---