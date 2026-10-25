---
title: Action Editor
description: Build custom actions with the node editor - connections, branching, If/Else, step modes, and concurrency
tags:
  - Actions
---

# Action Editor

The Action Editor is a node editor. Each box is a **step**, and arrows between steps decide what runs next. Open it with **Create New**, **Edit**, or by double clicking an action in the [Actions Manager](index.md#actions-manager). Wheel items and prompts also have buttons to open or create an action straight into the editor.

<div class="usage-img clip" markdown>
![Action Editor](https://assets.subathonmanager.app/docs/features/2.0.5/actions/action_editor.png)
</div>

## Layout

| Area | Description |
|---|---|
| **Top bar** | The action's **Name**, **Author**, **Version**, and [Concurrency Mode](#concurrency-mode). Buttons to **Test Run**, **Export** a `.sma` copy, and **Save** |
| **Step list** (left) | Every step you can add, grouped by integration. Type in the search box to filter, and press <kbd>Enter</kbd> to add the first match. See [Steps](Steps.md) |
| **Canvas** (middle) | Your steps and the connections between them. Pan and zoom freely |
| **Properties** (right) | The action's description when nothing is selected, or the selected step's settings |
| **Variables** (far right) | Every [variable](Variables.md) you can use, searchable. Click one to copy it |

The side panels can be resized by dragging their edges.

## Adding & Connecting Steps

- Click a step in the step list to add it. If a step is selected on the canvas, the new step is **chained after it**. If nothing is selected, it starts a **new branch** of its own
- Drag from a step's output (right side) onto another step to connect them. You can also drag from an input back to an output
- Select steps or a connection and press <kbd>Delete</kbd> to remove them
- Right click a step for more options (see [Step Modes](#step-modes))

The editor will refuse connections that would create a loop, connect the same two steps twice, or lead *into* a [trigger](Triggers.md) - triggers can only start a flow.

### Step Badges

| Badge | Meaning |
|---|---|
| **START** | The step has no inputs, so it runs as soon as the action starts |
| **TRIGGER** | A [trigger](Triggers.md) step, which starts its branch when the trigger fires |
| **2b**, **3b**... | More than one step follows this one. They all run at the **same time** after it |
| **OFF** | The step is [disabled](#disable-skip) |
| **ERR OK** | [Ignore Errors](#ignore-errors) is on |
| **END** | Nothing runs after this step |

A step with a problem shows the error in red on its card. You can still save an action with errors, but it **will not run** until they are fixed.

## How an Action Runs

1. Every **START** step runs at once. If the action was started by a trigger, only the trigger(s) that fired start - other branches that begin with a trigger are skipped. If it was started any other way (wheel, prompt, command, Run Now), every starting step **except** triggers runs.
2. When a step finishes, every step connected after it starts, at the same time. This is how you can make **parallel branches**
3. A step with more than one input follows its [input mode](#run-for-each-input).
4. The action is done when no more steps can run.

### Branching with If / Else

The [If / Else](Steps.md#if-else) step has two outputs:

- **then** (top) - followed when the comparison is true
- **else** (bottom, orange) - followed when the comparison is false

Steps on the path that was not taken are skipped, along with everything after them that has no other way to run. You can join both paths back into one step afterwards - it will run once, from whichever side was taken.

### Failures

If a step fails (OBS isn't connected, a web request returns an error, a global has the wrong type, etc.) and does not have [Ignore Errors](#ignore-errors) on, the **whole action stops** and any steps still running are cancelled. The failure will be written in the logs.

What happens next depends on what started the action:

| Started by | On failure |
|---|---|
| **Wheel Spin** | The spin goes back to **Pending**, and remembers which steps already ran. Press **Play** in the Spin History to **resume** from the step that failed. |
| **Prompt** | The prompt run's action is marked **Failed**, and remembers its progress. Press **Play** in the Prompt History to resume it. |
| **Anything else** | Logged only. Run it again to start over. |

!!! note
    A [Multiplier](Steps.md#multiplier) step fails while another multiplier is already running. On a wheel spin this leaves it Pending, so you can resume it once the current multiplier ends.

## Step Modes

Right click a step (or a selection of steps) for:

| Option | Description |
|---|---|
| **Test Trigger** | Triggers only. Runs the action from this trigger with sample values, so you can test without waiting for a real event. |
| **Duplicate** | Copies the selected steps. |
| **Enable / Disable** | See [Disable / Skip](#disable-skip). |
| **Ignore Errors** | See [Ignore Errors](#ignore-errors). |
| **Run For Each Input** | See [Run For Each Input](#run-for-each-input). Only shown for steps with an input. |
| **Delete** | Removes the selected steps and their connections. |

**Ignore Errors** and **Run For Each Input** can also be toggled from the checkboxes at the bottom of the Properties panel.

### Disable / Skip

A disabled step shows **OFF** and is skipped when the action runs, but the flow **carries on through it** as if it succeeded - the steps after it still run. This is handy for temporarily turning off part of an action without rewiring it.

A disabled [If / Else](Steps.md#if-else) always follows its **then** path. A disabled [trigger](Triggers.md) no longer starts the action. Triggers can also be turned on and off from the [Triggers tab](Triggers.md#triggers-tab).

### Ignore Errors

With **Ignore Errors** on (**ERR OK**), a failing step is logged and then treated as a success, so the action carries on instead of stopping. Use this for "nice to have" steps, such as a sound alert through Streamer.bot, that shouldn't block the rest of the action.

!!! tip
    For [web requests](Steps.md#web-requests), combine Ignore Errors with an [If / Else](Steps.md#if-else) on `%name_status%` to handle errors yourself.

### Run For Each Input

This only matters for steps with **more than one input**.

| Mode | Behaviour |
|---|---|
| **Wait** (default) | Runs **once**, after every connected step that is going to run has finished. Inputs on paths that were skipped (an If / Else that went the other way, a trigger that didn't fire) don't hold it up |
| **Run For Each Input** | Runs **every time** any connected step finishes, so it can run several times in one action run |

## Concurrency Mode

The **Concurrency Mode** decides what happens if an action is started again while it is still running, such as a 5 minute action and a second gift sub arriving 10 seconds in.

| Mode | Badge | Behaviour |
|---|:---:|---|
| **Restart Existing** | R | Cancels the run in progress and starts the new one. The default |
| **Run Parallel** | P | Both runs go at the same time, independently |
| **Queue New** | Q | The new run waits until the current one is finished, then starts. Queued runs go in order |
| **Skip New** | S | The new run is ignored while one is in progress |

!!! info "Actions with triggers"
    Triggers can fire many times in a row, so an action with any trigger step can only use **Run Parallel** or **Queue New**. Adding a trigger to an action that uses Restart or Skip switches it to Run Parallel.

## Testing

- **Test Run** runs the action you have open, **for real**, using your current (unsaved) changes. Branches that start with a trigger are skipped.
- **Test Trigger** (right click a trigger) runs from that trigger with sample [trigger variables](Triggers.md#trigger-variables), with the user set to `CustomAction`.
- The status bar at the bottom shows how the run finished. Details for failed steps are in the logs.

## Saving

Press **Save** to write the action to its `.sma` file in your library.

When an action is saved, any `%global.name%` or `%secret.name%` it uses that doesn't exist yet is created for you, empty. See [Globals & Secrets](Globals.md).
