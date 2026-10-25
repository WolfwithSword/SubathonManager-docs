---
title: Globals & Secrets
description: Shared values for custom actions and widgets, and encrypted secrets for API keys and tokens
tags:
  - Actions
  - Widgets
---

# Globals & Secrets

The **Globals & Secrets** tab of the Actions page holds values that live outside of any single action run.

<div class="usage-img clip" markdown>
![Globals and Secrets](https://assets.subathonmanager.app/docs/features/2.0.5/actions/actions_globals.png)
</div>

Names can use letters, numbers and `_` only, up to 64 characters, and aren't case-sensitive. Use the copy button on a row to copy its `%global.name%` / `%secret.name%` placeholder.

Press **Save** at the bottom to save your changes.

---

## Globals

A **global** is a named value that every action can read and change, and that is kept between runs and app restarts. Use them as counters, flags, or to pass data between actions. For example:

- `%global.deaths%` - a death counter that a Streamer.bot hotkey or a [web request](../Development.md#globals) adds to, shown on stream by a widget
- `%global.spam_mode%` - a true/false flag that other actions check with an [If / Else](Steps.md#if-else)
- `%global.last_donor%` - text set by a Subathon Event trigger

Each global has a **type**:

| Type | Values | Default |
|---|---|---|
| **text** | Anything | *(empty)* |
| **number** | Any number, e.g. `5`, `-2`, `0.5` | `0` |
| **true/false** | `true` or `false` (`yes`/`no`, `on`/`off`, `1`/`0` are also accepted when setting) | `false` |

Each row shows which actions use the global. You can edit a global's value and type here at any time. Changing the type converts the current value where it can (e.g. `true` becomes `1` as a number), and resets it to the type's default where it can't.

### Using Globals

| Where | How |
|---|---|
| **In action steps** | Read with `%global.name%`. Change with the [Set Global](Steps.md#set-global) step. |
| **In widgets** | Pick the globals a widget listens to in the overlay editor, and read them with `Subathon.global('name')`. See [Widget Data - Globals](../widgets/Data.md#globals). |
| **Over the API** | Read and change them with `GET` / `POST /api/data/globals`. See [Development - Globals](../Development.md#globals). |

Every change is pushed to widgets that listen to that global immediately.

### Created Automatically

You don't have to add globals here first:

- **Saving or importing an action** creates any global it uses that doesn't exist yet. Globals changed by **Add/Subtract** are made as numbers, by **Toggle** as true/false, and anything else as text.
- **Adding or importing a widget** that lists globals in its [metadata](../widgets/Structure.md#globals) creates them with the types the widget expects.
- **The API** can create a global by setting it, if you give a type or a typed value.

!!! info "Type mismatches"
    If an imported action or widget expects a global to be a different type than the one you already have (e.g. it wants `score` to be a number, but yours is text), you are asked whether to **change the types** or **keep your current types**. Changing converts the value where possible. If the two really are different things, rename one of them.

!!! warning "Deleting"
    Deleting a global that actions use shows which actions use it. Those actions will get an empty value for it, and [Set Global](Steps.md#set-global) steps on it will fail until it exists again (saving the action creates it again).

---

## Secrets

A **secret** is a value you don't want to share, like an API key, a bearer token, or a private webhook URL. Use them in steps as `%secret.name%`.

- Secret values are stored **encrypted** in your system's secure storage, not in the actions or the database.
- They are **never** written to `.sma` files, so actions that use them are safe to export and share. Whoever imports the action just needs to add their own value - the secret is created empty for them on import.
- Secrets can only be used inside action steps. They are not available to widgets or the API.

!!! tip
    Use secrets for anything you'd put in a web request's **Headers**, **Auth**, or **URL** that you wouldn't want someone else to see. Values typed straight into those fields are saved as-is in the `.sma` file.
