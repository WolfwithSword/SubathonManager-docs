---
title: StreamerBot Extension
description: Setting up and using the SubathonManager StreamerBot Extension for advanced usage
---

# StreamerBot Extension

A StreamerBot extension exists which lets you respond to events from SubathonManager or post custom events, commands, and controls to it, all from inside [Streamer.Bot](https://streamer.bot/). This includes updates from goals, pause/resume/lock/unlock listeners, and notifications for when the subathon is complete, all as custom triggers.

SubathonManager can also run Streamer.bot actions directly from [custom actions](../../actions/index.md), using Streamer.bot's HTTP Server. This does not need the extension. See [Running Streamer.bot Actions](#running-streamerbot-actions).

Settings are under **Settings** > **External Software** > **Streamer.bot**.

![streamerbot-settings](https://assets.subathonmanager.app/docs/config/setup/2.0.5/streamerbot_settings.png)

---

## Requirements

- [Streamer.Bot](https://streamer.bot/) installed and running
- SubathonManager running
- The Custom WebSocket Client enabled in Streamer Bot. The import script will create a client.

---

## Import

1. Download the following `.sb` [file as the latest extension](https://extensions.wolfwithsword.com/extensions/subathonmanager-extension/) to import.
2. In Streamer.Bot, click **Import** and drop in the file or paste its contents.
3. In Streamer.Bot Actions, find the `Subathon Manager` Group -> Action `[SM] StartUp` -> Double click the `Execute Code ([SM] Extension)` Subaction -> Click `Find Refs` and `Save`.
4. Go to **Server/Clients -> Custom WebSocket Clients**, find `SubathonManager`, right-click, and enable **Auto Connect** if not already enabled.


---

## Triggers

The imported template includes pre-wired triggers for the following SubathonManager events. Each trigger arrives as a WebSocket message that Streamer.Bot parses and routes to the matching action.

### Events

Fires whenever a tracked subathon event is received (donations, subscriptions, bits, etc.).

- Event Received
- Command Received

---

### Subathon Timer

Fires on any change to the timer state or totals.

- Timer Ended
- Timer Update
  - This will be very spammy and not recommended
- Timer Paused
- Timer Resumed
- Timer Locked
- Timer Unlocked

---

### Goals

Fires when a goal's point threshold is reached, or goals list is updated/changed.

- Goals Updated
- Goal Completed

---

### Prompts

Fires for all prompt state transitions, creations, etc.

- Prompt Started
- Prompt Completed
- Prompt Expired
- Prompt Cancelled
- Prompt Update

---

### Totals

Fires (very often) whenever the totals count for any tracked count is updated.

- Totals Updated

---

### WheelSpin

Fires for wheel spin related events.

- Wheel Spin Started
- Wheel Spin Status Change
  - Whenever a wheel spin is transitioned from say, pending to done/cancelled etc.
- Wheel Spin Result Received

Also exposed is a function to change the status of a wheel spin by id (found in spin result), useful for auto completing a spin via some streamerbot action.

---

## Configuration

After importing, review each trigger/action in StreamerBot and wire up your own logic (OBS scene changes, chat messages, sound effects, etc.) to the relevant trigger stubs.

---

---

## Run Streamer.bot Action

[Custom actions](../../actions/index.md) can run any Streamer.bot action with the [Streamer.bot Run Action](../../actions/Steps.md#streamerbot) step. This talks to Streamer.bot's **HTTP Server**, and works with or without the extension.

### Setup

1. In Streamer.bot, open **Servers/Clients** > **HTTP Server**.
2. Start the server. Enabling **Auto Start** is recommended, so it's running whenever Streamer.bot is.
3. In SubathonManager, enable **Use Streamer.bot's HTTP API**.
4. If you changed Streamer.bot's HTTP Server address or port, enter it under **HTTP Server**. The default is `http://127.0.0.1:7474`.
5. Click **Check Connection**. The **HTTP API** status at the top should show as connected, and your Streamer.bot actions will be listed in the Run Action step.

The connection is checked every couple of minutes, and shows up as another status in in the [connection status](../../Usage.md#connection-status) dot.

### Action Steps

With the HTTP Server connected, the **Streamer.bot** group in the [Action Editor](../../actions/Editor.md) step list has a **Run Action** step:

| Field | Description |
|---|---|
| **Action** | The Streamer.bot action to run, picked from the list loaded from Streamer.bot (sorted by Streamer.bot group). Click refresh to reload the list. |
| **Arguments** | Optional. One `name=value` per line, passed to the action. See [Arguments](#arguments). |

The step succeeds once Streamer.bot accepts the request. It doesn't wait for the Streamer.bot action itself to finish. If the HTTP Server isn't reachable when the step runs, the step fails (see [Failures](../../actions/Editor.md#failures)), so turn on **Ignore Errors** for steps that shouldn't stop the rest of the action.

### Arguments

The Run Action step can pass arguments to your Streamer.bot action, one `name=value` per line. They can use [action variables](../../actions/Variables.md):

```text
donor=%trigger.user%
amount=%trigger.amount%
timeleft=%time_remaining%
```

Read them in Streamer.bot as `%donor%`, `%amount%`, etc. These are always sent as well:

| Argument | Value |
|---|---|
| `%subathonmanagertrigger%` | `action` |
| `%subathonmanageruser%` | Who started the custom action |
| `%subathonmanagersource%` | What started it, e.g. `Twitch`, `WheelSpin` |
| `%subathonmanagerlabel%` | The wheel item, prompt, or action name that started it |

!!! warning "Loops"
    If the Streamer.bot action calls back into SubathonManager (e.g. adds time), make sure that can't start the same custom action again, or it may loop.

