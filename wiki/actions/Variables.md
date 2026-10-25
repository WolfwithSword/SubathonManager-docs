---
title: Action Variables
description: Variables you can use in custom action steps - built-in subathon values, trigger data, saved responses, globals and secrets
tags:
  - Actions
---

# Variables

Variables are written as `%name%` and are filled in when the step runs. They work in any field of a step - see the [Steps overview](Steps.md#overview).

The **Variables** panel in the [editor](Editor.md#layout) lists everything available to the action you have open, with a description and current value where there is one. Click a variable to copy it.

```text
Timer has %time_remaining% left, %points% points so far. Thanks %trigger.user%!
```

- Names are not case-sensitive: `%Points%` and `%points%` are the same.
- A variable that doesn't exist is left as written, e.g. `%typo%` stays `%typo%`.
- A [response variable](#response-variables) from a step that hasn't run (yet) is empty.
- All values are text. Numbers use `.` for decimals, and true/false values are `true` / `false`.

There are five kinds of variables:

| Kind | Looks like | Lives for |
|---|---|---|
| [Built-in](#built-in-variables) | `%points%` | Read fresh each time a step runs |
| [Trigger](#trigger-variables) | `%trigger.amount%` | The current run |
| [Response](#response-variables) | `%resp%`, `%resp.data.id%`, `%resp_status%` | The current run |
| [Global](#globals) | `%global.deaths%` | Forever, shared by every action and widget |
| [Secret](#secrets) | `%secret.api_key%` | Forever, never exported |

---

## Built-in Variables

These read the live state of your subathon at the moment the step runs.

=== "Timer"

    | Variable | Type | Description |
    |---|---|---|
    | `%seconds_remaining%` | number | Seconds left on the timer |
    | `%time_remaining%` | text | Time left as hh:mm:ss, e.g. `26:04:59` |
    | `%seconds_elapsed%` | number | Seconds the timer has run |
    | `%timer_paused%` | true/false | Whether the timer is paused |
    | `%timer_locked%` | true/false | Whether the subathon is locked |
    | `%timer_reversed%` | true/false | Whether the timer is in reverse mode |

=== "Multiplier"

    | Variable | Type | Description |
    |---|---|---|
    | `%multiplier_active%` | true/false | Whether a multiplier is active |
    | `%multiplier_amount%` | number | Current multiplier amount, `1` if inactive |
    | `%multiplier_seconds_remaining%` | number | Seconds until the multiplier ends. `0` when it has no end or none is running |
    | `%multiplier_points%` | true/false | Whether the multiplier applies to points |
    | `%multiplier_time%` | true/false | Whether the multiplier applies to time |

=== "Points & Money"

    | Variable | Type | Description |
    |---|---|---|
    | `%points%` | number | Current subathon points |
    | `%money%` | number | Money raised this subathon, to 2 decimals |
    | `%currency%` | text | The subathon's currency code, e.g. `USD` |
    | `%default_currency%` | text | The primary currency from settings. Should match `%currency%` |

=== "Goals"

    | Variable | Type | Description |
    |---|---|---|
    | `%goal_text%` | text | The current unfinished goal. Empty once all are done |
    | `%goal_points%` | number | Points (or money) needed for the current goal |
    | `%goal_index%` | number | Position of the current goal in the list, starting at 1. `0` when all are done |
    | `%goal_count%` | number | How many goals in total |
    | `%goal_progress%` | number | Points (or whole money) counted towards all goals |
    | `%last_goal_text%` | text | Most recently completed goal. Empty if none yet |
    | `%last_goal_points%` | number | Points (or money) of the most recently completed goal |
    | `%goal_list_name%` | text | Name of the active goal list |
    | `%goal_type%` | text | `Points` or `Money` |

=== "Action"

    | Variable | Type | Description |
    |---|---|---|
    | `%user%` | text | Who started the run, e.g. a chat user, `WheelSpin`, `Prompt`, `SYSTEM`, or `CustomAction` for test runs |
    | `%source%` | text | What source started the run, e.g. `Twitch`, `WheelSpin`, `Simulated` |
    | `%label%` | text | Name of what started the run, e.g. the wheel item's text, the prompt's text, or the action's name |
    | `%now%` | text | Local date and time the step ran, e.g. `2026-10-02 18:30:00` |

---

## Trigger Variables

When an action is started by a [trigger](Triggers.md), the trigger's data is available as `%trigger.name%`, e.g. `%trigger.user%` or `%trigger.amount%`. Each trigger provides different values - see [Trigger Variables](Triggers.md#trigger-variables) for the full list per trigger.

`%trigger%` on its own is all of the trigger's values as a JSON object, which is handy to send in a [web request](Steps.md#web-requests) body.

When an action with trigger steps is started some other way (a wheel spin, Run Now, etc.), `%trigger.*%` variables are empty.

---

## Response Variables

Steps that can **save a response** ([web requests](Steps.md#web-requests) and [OBS Raw Request](Steps.md#raw-request)) create two variables, using the name you give in **Save response as**:

| Variable | Value |
|---|---|
| `%name%` | The full response, as text |
| `%name_status%` | The status code. For web requests, the HTTP status (`200`, `404`...) or `0` if it couldn't connect or timed out. For OBS, `200` on success or `0` on failure |

Response names can use letters, numbers and `_`, can't be the name of a built-in variable, or `trigger`, `global` or `secret`, and must be unique within the action.

### Reading JSON

If the response is JSON, read into it with `.field` and `[index]`:

```json
{ "data": { "items": [ { "name": "First", "count": 3 } ] } }
```

| Variable | Value |
|---|---|
| `%resp.data.items[0].name%` | `First` |
| `%resp.data.items[0].count%` | `3` |
| `%resp.data.items[0]%` | `{"name":"First","count":3}` |
| `%resp.data.missing%` | *(empty)* |

Text values come out without quotes. Objects and arrays come out as JSON text. Anything that doesn't exist, or a response that isn't JSON, gives an empty value.

The same works for trigger data, e.g. `%trigger.amount%`.

!!! note
    Responses longer than 131,072 characters are cut off at that length.

---

## Globals

`%global.name%` reads a [global](Globals.md) - a value that is kept between runs and shared by every action, and can be shown in widgets. Change them with the [Set Global](Steps.md#set-global) step.

Number globals come out like `5` or `2.5`, true/false globals as `true` or `false`.

---

## Secrets

`%secret.name%` reads a [secret](Globals.md#secrets), such as an API key. The value is fetched when the step runs and is never written to the `.sma` file, so actions that use them are safe to share.
