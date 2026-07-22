---
title: StreamerBot Extension
description: Setting up and using the SubathonManager StreamerBot Extension for advanced usage
---

# StreamerBot Extension

A StreamerBot extension exists which lets you respond to events from SubathonManager or post custom events, commands, and controls to it, all from inside [Streamer.Bot](https://streamer.bot/). This includes updates from goals, pause/resume/lock/unlock listeners, and notifications for when the subathon is complete, all as custom triggers.

---

## Requirements

- [Streamer.Bot](https://streamer.bot/) installed and running
- SubathonManager running
- The Custom WebSocket Client enabled in Streamer Bot. The import script will create a client.

---

## Import

1. Download the following `.sb` [file as the latest extension](https://extensions.wolfwithsword.com/extensions/subathonmanager-extension/) to import.
2. In Streamer.Bot, click **Import** and drop in the file or paste its contents.
3. Go to **Server/Clients -> Custom WebSocket Clients**, find `SubathonManager`, right-click, and enable **Auto Connect** if not already enabled.


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
