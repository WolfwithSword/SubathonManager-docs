---
title: Action Triggers
description: Run custom actions automatically from subathon events, timer changes, goals, wheel spins and prompts, and the variables each trigger provides
tags:
  - Actions
  - Triggers
---

# Triggers

A **Trigger** step starts its action automatically when something happens. Add one from the **Triggers** group in the editor's step list, pick the trigger, then connect the steps that should run after it.

- An action can have several triggers, each starting its own branch. Only the branch(es) of the trigger that fired run.
- If two triggers in the same action fire from the same thing, they start **one** run together.
- Triggers can fire many times in a row, so actions with triggers always [run in parallel or queue](Editor.md#concurrency-mode).
- Triggers in an action that is turned **off**, or trigger steps that are [disabled](Editor.md#disable-skip), don't fire.
- Right click a trigger and pick **Test Trigger** to run its branch with sample values.

## Trigger List

| Trigger | Fires when |
|---|---|
| [**Subathon Event**](#subathon-event) | Any of the chosen subathon event types comes in (subs, donations, orders, commands, etc.) |
| [**Timer Paused**](#timer) | The timer was paused |
| [**Timer Resumed**](#timer) | The timer was resumed |
| [**Timer Locked**](#timer) | The subathon was locked |
| [**Timer Unlocked**](#timer) | The subathon was unlocked |
| [**Timer Ended**](#timer) | The timer reached 0 |
| [**Multiplier Started**](#multiplier) | A multiplier started |
| [**Multiplier Ended**](#multiplier) | A multiplier ended or was stopped |
| [**Goal Completed**](#goal-completed) | A goal was completed |
| [**Wheel Spin Start**](#wheel-spin-start) | A wheel spin started |
| [**Wheel Spin End**](#wheel-spin-end) | A wheel spin result came in |
| [**Prompt Started**](#prompts) | A prompt run started |
| [**Prompt Ended**](#prompts) | A prompt run completed, expired or was cancelled |

### Subathon Event

Pick one or more **event types** for the trigger to react to. Tick **Ignore simulated events** to skip events made with the simulate / test buttons.

!!! info
    Only events that were **processed** into the subathon fire this trigger. Events that come in while the subathon is locked only fire it if **Events when Locked?** is on in the [App settings](../config/App.md).

    Time added by an action's own steps, and the log entries made when an action runs, never fire it - so an action can't trigger itself this way.

---

## Triggers Tab

The **Triggers** tab of the Actions page shows every trigger in your library, grouped by trigger type. Each group shows how many actions use it - expand it to see them.

<div class="usage-img clip" markdown>
![Triggers Tab](https://assets.subathonmanager.app/docs/features/2.0.5/actions/actions_triggers.png)
</div>

Each row shows the action's name and a summary of the trigger, such as *When Twitch Gift Subscription +2 more, not simulated*. From here you can:

- Turn individual trigger steps **On / Off** without opening the editor
- Open the action in the editor
- See if the trigger **won't run**, because the action has an error or is turned off

---

## Trigger Variables

Steps after a trigger can read its data as `%trigger.name%`. See [Variables](Variables.md#trigger-variables).

!!! note "True / False values"
    Trigger values that are true or false come through as `True` / `False`. [If / Else](Steps.md#if-else) compares text without case, so **Equals** `true` works as expected.

### Subathon Event

| Variable | Description | Example |
|---|---|---|
| `%trigger.eventtype%` | The event type name | `TwitchGiftSub` |
| `%trigger.source%` | Where it came from | `Twitch` |
| `%trigger.truesource%` | The specific service for grouped sources, e.g. the store for GoAffPro orders | `GamerSupps` |
| `%trigger.subtype%` | The event's category | `SubLike`, `DonationLike`, `OrderLike`... |
| `%trigger.user%` | Who sent it | `SomeViewer` |
| `%trigger.value%` | The event's main value - tier, amount, item count, etc. | `1000`, `5.00` |
| `%trigger.amount%` | How many, e.g. number of gifted subs | `5` |
| `%trigger.currency%` | Currency for money events | `USD` |
| `%trigger.command%` | The command, for command events | `AddTime` |
| `%trigger.secondsadded%` | Seconds this event added | `600` |
| `%trigger.pointsadded%` | Points this event added | `5` |
| `%trigger.secondaryvalue%` | Extra data, depends on the event type | |
| `%trigger.tertiaryvalue%` | Extra data, depends on the event type | |
| `%trigger.reversed%` | Whether this was processed in a reverse subathon | `False` |

The values match the fields of the [event websocket data](../widgets/Data.md#handlesubathonevent).

### Timer

Timer Paused, Timer Resumed, Timer Locked, Timer Unlocked, Timer Ended.

| Variable | Description | Example |
|---|---|---|
| `%trigger.timeremaining%` | Time left as hh:mm:ss | `12:34:56` |
| `%trigger.secondsremaining%` | Seconds left | `45296` |
| `%trigger.points%` | Current points | `250` |
| `%trigger.paused%` | Whether the timer is paused | `True` |
| `%trigger.locked%` | Whether the subathon is locked | `False` |

### Multiplier

Multiplier Started, Multiplier Ended. For Multiplier Ended, these describe the multiplier that just ended.

| Variable | Description | Example |
|---|---|---|
| `%trigger.multiplier%` | The multiplier amount | `2` |
| `%trigger.multipliertime%` | Whether it applies to time | `True` |
| `%trigger.multiplierpoints%` | Whether it applies to points | `True` |
| `%trigger.multiplierduration%` | Its duration in seconds, `0` if it has none | `600` |
| `%trigger.multiplierhypetrain%` | Whether it came from a hype train | `False` |

### Goal Completed

| Variable | Description | Example |
|---|---|---|
| `%trigger.goaltext%` | The goal's text | `Cosplay stream` |
| `%trigger.goaltarget%` | Points (or money) the goal needed | `100` |
| `%trigger.goalcurrent%` | Points (or money) when it completed | `104` |

### Wheel Spin Start

| Variable | Description | Example |
|---|---|---|
| `%trigger.wheelname%` | The wheel's name | `Main Wheel` |
| `%trigger.wheelid%` | The wheel's id | |
| `%trigger.spindelay%` | Seconds until the result is shown | `5` |

### Wheel Spin End

| Variable | Description | Example |
|---|---|---|
| `%trigger.wheelname%` | The wheel's name | `Main Wheel` |
| `%trigger.wheelid%` | The wheel's id | |
| `%trigger.wheelitem%` | The text of the item it landed on | `+10 minutes` |
| `%trigger.spinstatus%` | The spin's status | `Pending`, `Running`, `Done`, `Cancelled` |
| `%trigger.spinsowed%` | Spins still owed | `3` |

### Prompts

Prompt Started, Prompt Ended.

| Variable | Description | Example |
|---|---|---|
| `%trigger.prompttext%` | The prompt's text | `10 subs in 5 minutes!` |
| `%trigger.prompttype%` | The prompt's type | `Subs`, `Points`, `Money`... |
| `%trigger.prompttarget%` | The target to reach | `10` |
| `%trigger.promptduration%` | How long it runs, in seconds | `300` |
| `%trigger.promptstatus%` | The run's status | `Active`, `Completed`, `Expired`, `Cancelled` |

!!! tip
    To run something only when a prompt is **completed**, either check `%trigger.promptstatus%` with an [If / Else](Steps.md#if-else), or set the action as the prompt's **Optional Action** in the [Prompts](../Usage.md#prompts) tab.
