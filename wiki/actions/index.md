---
title: Actions
description: Build custom actions in SubathonManager that chain steps across OBS, VTube Studio, Streamer.bot, Mix It Up, web requests, the subathon itself, and more
tags:
  - Actions
  - Automation
---

# Actions

**Custom Actions** let you chain steps together into a small automation, across any integration SubathonManager supports. An action can add time, start a multiplier, toggle an OBS source, fire a VTube Studio hotkey, run a Streamer.bot action, call a web API, branch on a condition, and more, all in one flow.

Actions can be started by:

- **[Triggers](Triggers.md)** inside the action itself, such as *a Twitch gift sub came in* or *a goal was completed*
- **[Wheel Spin](../Usage.md#wheel-spin)** items, with the **Custom Action** item type
- **[Prompts](../Usage.md#prompts)**, as an optional action when a prompt run is completed
- Another action, with a **[Run Action](Steps.md#run-action)** step
- The `!runaction <name>` [chat command](../Usage.md#chat-commands), or the `RunAction` [external command](../Development.md#external-commands)
- The **Run Now** button in the app

Each action is saved as its own **`.sma`** file, so they can be shared, imported, and downloaded from the [Action Marketplace](../browse-actions.md). See [SMA Files](Files.md).

<div class="grid cards" markdown>

-   :material-sitemap-outline: **Action Editor**

    ---

    The node editor, connections, branching, step modes and concurrency.

    [:octicons-arrow-right-24: Editor](Editor.md)

-   :material-format-list-bulleted-type: **Steps**

    ---

    Every step type, grouped by integration, including flow control and web requests.

    [:octicons-arrow-right-24: Steps](Steps.md)

-   :material-variable: **Variables**

    ---

    Built-in, trigger, response, global and secret variables you can use in steps.

    [:octicons-arrow-right-24: Variables](Variables.md)

-   :material-lightning-bolt-outline: **Triggers**

    ---

    Run actions automatically when something happens, and the data each trigger provides.

    [:octicons-arrow-right-24: Triggers](Triggers.md)

-   :material-database-outline: **Globals & Secrets**

    ---

    Values shared between every action and widget, and encrypted secrets for API keys.

    [:octicons-arrow-right-24: Globals & Secrets](Globals.md)

-   :material-file-cog-outline: **SMA Files**

    ---

    Import, export, and share actions as `.sma` files.

    [:octicons-arrow-right-24: SMA Files](Files.md)

</div>

---

## Actions Manager

The **Actions** tab in the main window has three tabs: **Actions Manager**, **[Globals & Secrets](Globals.md)** and **[Triggers](Triggers.md)**.

<div class="usage-img clip" markdown>
![Actions Manager](https://assets.subathonmanager.app/docs/features/2.0.5/actions/actions_manager.png)
</div>

The left side lists every action in your library. You can search by name, author, or description.

Each card shows the action's name, step count, version, author and description, plus a few badges:

| Badge | Meaning |
|---|---|
| **OFF** | The action is turned off. Nothing can start it except the editor's **Test Run** button. |
| **R** / **P** / **Q** / **S** | The action's [Concurrency Mode](Editor.md#concurrency-mode): Restart, Parallel, Queue, or Skip. |
| :material-lightning-bolt: **#** | How many things can start this action: trigger steps, wheel items, and prompts that use it. Hover for a breakdown. |

Each card also has quick buttons to **Run now**, **Edit**, **Duplicate**, **Export .sma** and **Delete**. Double click a card to open it in the [Action Editor](Editor.md).

| Button | Description |
|---|---|
| **Import .sma** | Import one or more `.sma` files into your library. Importing an action that already exists (same id) updates it. |
| **Create New** | Opens the editor with a new, empty action. |
| **Open Actions** | Opens the `actions` folder where your library is stored. |
| **Open Exports** | Opens the `exports/actions` folder where exported `.sma` files are saved. |
| **Reload Library** | Re-reads the `actions` folder, picking up any files you added or edited by hand. |

### Action Details

Selecting an action shows its details on the right:

- Version, author, last updated time, and description
- An **On/Off** toggle. Turned off actions are not started by triggers, wheel items, prompts, commands, or other actions
- **Run Now** to run the action immediately, for real
- **Open in Editor**
- How many **Steps** and **Branches** it has
- A **Needs fixing** message if the action has an error that stops it from running

!!! warning "Run Now is real"
    **Run Now** and **Test Run** run every step for real - time is added, OBS sources change, web requests are sent. Branches that start with a [trigger](Triggers.md) are skipped by a normal run; right click a trigger in the editor and use **Test Trigger** to run those.

!!! tip "Converting wheel actions"
    VTube Studio and OBS wheel item actions can be converted to a custom action with **Convert to Custom Action** in the Wheel Spin item editor, so you can chain more steps onto them.
