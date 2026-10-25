---
title: Action Steps
description: Every step type available in custom actions - flow control, custom actions, subathon, OBS, VTube Studio, Mix It Up, Streamer.bot and web requests
tags:
  - Actions
---

# Steps

Steps are grouped by integration in the editor's step list. Integration steps need that integration connected when the action **runs** - if it isn't, the step fails (see [Failures](Editor.md#failures)).

Where a step picks something from an integration (an OBS scene, a VTube Studio hotkey, a Streamer.bot action...), the editor loads a list from the connected integration, with a refresh button next to it. If the integration isn't connected you can type the name in by hand.

Durations use the same format as chat commands, e.g. `30s`, `5m`, `1h30m`.

## Overview

| Group | Steps | [Variables](Variables.md)? |
|---|---|:---:|
| [**Flow**](#flow) | [Wait](#wait), [If / Else](#if-else), [Set Global](#set-global) | If / Else, Set Global |
| [**Triggers**](#trigger) | [Trigger](#trigger) | - |
| [**Custom Actions**](#custom-actions) | [Run Action](#run-action), [Enable / Disable Action](#enable-disable-action) | - |
| [**Subathon**](#subathon) | Add Time, Subtract Time, [Multiplier](#multiplier), Add Rerolls | - |
| [**OBS**](#obs) | Source, Filter, Audio, Media, Refresh Browser, [Raw Request](#raw-request) | Raw Request |
| [**VTube Studio**](#vtube-studio) | Expression, Parameter, Hotkey | - |
| [**Mix It Up**](#mix-it-up) | Run Command | Yes |
| [**Streamer.bot**](#streamerbot) | Run Action | Yes |
| [**Web**](#web-requests) | GET Request, POST Request | Yes |

The last column shows which steps fill in `%variables%` when they run. In other steps, text is used exactly as typed.

---

## Flow

### Wait

Pauses this branch for a duration before the next step. Other branches keep running.

| Field | Description |
|---|---|
| **Wait for** | How long to wait, e.g. `10s`. Required. |

### If / Else

Compares two values and picks a path. Steps connected to **then** run when it's true, steps connected to **else** run when it's false. See [Branching](Editor.md#branching-with-if-else).

| Field | Description |
|---|---|
| **Check** | The value to check. Usually a [variable](Variables.md), e.g. `%trigger.amount%` or `%global.deaths%`. |
| **Comparison** | How to compare (below). |
| **Against** | The value to compare to. Can also be a variable. Not used for **Is Empty** / **Is Not Empty**. |

| Comparison | True when |
|---|---|
| **Equals** / **Not Equals** | The values match / don't match. |
| **Greater Than** / **Less Than** | Check is above / below Against. |
| **Greater or Equal to** / **Less or Equal to** | Check is at least / at most Against. |
| **Contains** / **Does Not Contain** | Check has / doesn't have Against somewhere in it. |
| **Is Empty** / **Is Not Empty** | Check is blank / has anything in it. |

- Both sides are trimmed of spaces first.
- If **both** sides are numbers, they are compared as numbers (`10 > 9`). Otherwise they're compared as text, ignoring case (`Hello` equals `hello`).
- `true`/`false` values compare as text, so use **Equals** `true`.

### Set Global

Changes a [global](Globals.md).

| Field | Description |
|---|---|
| **Do** | **Set To**, **Add/Subtract (numbers)**, or **Toggle** (true/false globals). |
| **Global** | The global's name, without `%global.` around it. |
| **Value** | The new value for Set To, or the amount to add for Add/Subtract (use a negative number to subtract). Can use variables. Not used by Toggle. |

The value has to fit the global's type: a Number global can only be set to a number, Toggle only works on true/false globals, and Add/Subtract only works on numbers. Otherwise the step fails.

When you save an action, globals it sets that don't exist yet are created - Add/Subtract creates a Number, Toggle a true/false, and Set To a text global. Widgets listening to that global are updated straight away. See [Globals in Widgets](../widgets/Data.md#globals).

---

## Trigger

Starts the action automatically. See [Triggers](Triggers.md) for the full list, and the data each trigger provides.

| Field | Description |
|---|---|
| **Trigger** | What starts it, e.g. **Subathon Event**, **Goal Completed**, **Timer Paused**. |
| **Event types** | Subathon Event only. One or more event types to react to, e.g. Twitch Gift Sub and YouTube Gift Membership. At least one is required. |
| **Ignore simulated events** | Subathon Event only. Don't run for events made with the simulate/test buttons. |

Steps after a trigger can read its data as `%trigger.name%`.

---

## Custom Actions

### Run Action

Runs another custom action from your library.

| Field | Description |
|---|---|
| **Do** | **Run** waits for the other action to finish before continuing. **Start - Do not wait** starts it and moves on straight away. |
| **Action** | The action to run. |

- With **Run**, this step fails if the other action fails.
- If the other action is turned **off**, it is not run and this step carries on as a success.
- The other action uses **its own** [Concurrency Mode](Editor.md#concurrency-mode).
- Actions can run each other (or themselves) at most **8 levels deep**, to stop endless loops. The editor warns you if an action runs itself.
- Variables from this run, like `%trigger.*%` or saved responses, are **not** passed to the other action. Use a [global](Globals.md) to share data between actions.

### Enable / Disable Action

Turns another action on or off, the same as its toggle in the [Actions Manager](index.md#action-details).

| Field | Description |
|---|---|
| **Do** | **Enable**, **Disable**, or **Toggle**. |
| **Action** | The action to change. |

For example, a high donation event could trigger a specific "mode", activating an action that enables other actions which may be triggered by who knows what, then disables them again after a [Wait](#wait).

---

## Subathon

| Step | Description |
|---|---|
| **Add Time** | Adds a duration to the timer, like `!addtime`. |
| **Subtract Time** | Removes a duration from the timer, like `!subtracttime`. |
| **Multiplier** | Starts a multiplier. See below. |
| **Add Rerolls** | Adds wheel spins owed. A count of at least 1. |

Time added or removed by an action shows in your events as a command from the user that started the action, and does **not** start [Subathon Event triggers](Triggers.md#subathon-event) itself.

### Multiplier

| Field | Description |
|---|---|
| **Do** | Apply to **Points & Time**, **Points**, or **Time**. |
| **Multiplier (x)** | The multiplier amount, above 0, e.g. `2` or `1.5`. |
| **Lasts for** | How long it runs. Leave blank to run until stopped. |

!!! warning
    A Multiplier step **fails if a multiplier is already running**, rather than overwriting it.

---

## OBS

Requires the [OBS WebSocket](../config/OBS.md) connection.

| Step | Fields | Operations |
|---|---|---|
| **Source** | Scene, Source | Show, Hide, Toggle. Sources inside groups and nested scenes are found too. |
| **Filter** | On source, Filter | Enable, Disable, Toggle |
| **Audio** | Input | Mute, Unmute, Toggle |
| **Media** | Input | Play / Resume, Pause, Restart, Stop |
| **Refresh Browser** | Browser source | Refreshes the browser source's cache. |
| **Raw Request** | Request type, Request data | See below. |

### Raw Request

Sends any [OBS WebSocket request](https://github.com/obsproject/obs-websocket/blob/master/docs/generated/protocol.md#requests) directly, for anything the other OBS steps don't cover.

| Field | Description |
|---|---|
| **Request type** | The request name, e.g. `SetCurrentProgramScene`. The list comes from your OBS. |
| **Request data** | Optional JSON object of request fields, e.g. `{"sceneName": "BRB"}`. Can use variables. |
| **Save response as** | Optional. Saves OBS's response JSON as a [response variable](Variables.md#response-variables). |

---

## VTube Studio

Requires the [VTube Studio](../config/setup/VTubeStudio.md) connection. These steps run against whatever model is loaded at the time.

| Step | Fields | Operations |
|---|---|---|
| **Expression** | Expression file | On, Off, Toggle |
| **Parameter** | Parameter, Set value to | **Hold** keeps sending the value until released. **Set** sends it once. **Release** stops holding. **Restore** releases it and puts back the value it had before this action run first changed it. |
| **Hotkey** | Hotkey | Trigger |

---

## Mix It Up

Requires the Mix It Up [Developer API](../config/setup/MixItUp.md#enable-the-developer-api).

**Run Command** runs a Mix It Up command.

| Field | Description |
|---|---|
| **Command** | The Mix It Up command to run. |
| **Special identifiers** | Optional. One `name=value` per line. Each is readable in Mix It Up as `$name`. Values can use variables, e.g. `amount=%trigger.amount%`. |

These special identifiers are always sent too:

| Identifier | Value |
|---|---|
| `$subathonmanagertrigger` | `action` |
| `$subathonmanageruser` | Who started the action, same as `%user%` |
| `$subathonmanagersource` | What started the action, same as `%source%` |
| `$subathonmanagerlabel` | Same as `%label%` |

---

## Streamer.bot

Requires Streamer.bot's HTTP Server. See [Streamer.bot - Running Streamer.bot Actions](../config/setup/StreamerBot.md#running-streamerbot-actions).

**Run Action** runs a Streamer.bot action.

| Field | Description |
|---|---|
| **Action** | The Streamer.bot action to run. |
| **Arguments** | Optional. One `name=value` per line. Each is readable in Streamer.bot as `%name%`. Values can use variables. |

These arguments are always sent too: `%subathonmanagertrigger%` (`action`), `%subathonmanageruser%`, `%subathonmanagersource%` and `%subathonmanagerlabel%`.

---

## Web Requests

**GET Request** and **POST Request** call any URL, such as post a webhook, hit a server, or another app or website's API. The response can be saved and read by later steps.

| Field | Description |
|---|---|
| **URL** | Must start with `http://` or `https://`. Can use variables, e.g. `https://example.com/api?user=%user%`. |
| **Body** | POST only. Sent exactly as written, after filling in variables. |
| **Headers** | Optional. One `Name: value` per line, e.g. `X-Api-Key: %secret.my_key%`. |
| **Auth** | **None**, **Bearer** (token), or **Basic** (username & password). |
| **Timeout** | How long to wait for a response. Defaults to 15 seconds, at most 5 minutes. |
| **Save response as** | Optional name, e.g. `resp`. See below. |

- A POST body that starts with `{` or `[` is sent as `application/json`, anything else as `text/plain`. Add a `Content-Type` header to override it.
- Any response that isn't a `2xx` status **fails the step**, as does a timeout or connection error. The response is still saved first, so with [Ignore Errors](Editor.md#ignore-errors) on you can check it yourself.

### Saving the Response

If you name the response, e.g. `resp`, later steps in the same run can use:

| Variable | Value |
|---|---|
| `%resp%` | The response body, as text. |
| `%resp_status%` | The HTTP status code, e.g. `200`. `0` if it couldn't connect or timed out. |
| `%resp.some.path%` | Reads into a JSON response, e.g. `%resp.data.items[0].name%`. |

See [Response Variables](Variables.md#response-variables) for the details.

!!! danger "Keep keys out of your actions"
    Headers, tokens and passwords are saved **as written** into the `.sma` file, and are included when you export or share it. Put API keys and tokens in a [secret](Globals.md#secrets) and use `%secret.name%` instead - secrets are never written to the file.

??? example "Example: post to a Discord webhook when a goal completes"
    | Step | Settings |
    |---|---|
    | **Trigger** | Goal Completed |
    | **POST Request** | **URL:** `%secret.discord_webhook%`<br>**Body:** `{"content": "Goal reached: %trigger.goaltext% (%trigger.goalcurrent% points)"}` |
