---
title: StreamerBot Extension
description: Setting up and using the SubathonManager StreamerBot Extension for advanced usage
---

# StreamerBot Extension

A StreamerBot extension template exists which lets you respond events from SubathonManager or post custom events, commands, and controls to it, all from inside [Streamer.Bot](https://streamer.bot/). This includes updates from goals, pause/resume/lock/unlock listeners, and notifications for when the subathon is complete.

---

## Requirements

- [Streamer.Bot](https://streamer.bot/) installed and running
- SubathonManager running
- The Custom WebSocket Client enabled in Streamer Bot. The import script will create a client.

---

## Import

1. Download the following `.sb` [file as the latest extension](https://github.com/WolfwithSword/SubathonManager/releases/download/{{ docs_version }}/SubathonManager_Extension.sb) to import.
2. In Streamer.Bot, click **Import** and drop in the file or paste its contents.
3. Go to **Server/Clients -> Custom WebSocket Clients**, find `SubathonManager`, right-click, and enable **Auto Connect** if not already enabled.

You can also grab the latest file directly from the latest release assets or the latest nightly from [here](https://raw.githubusercontent.com/WolfwithSword/SubathonManager/refs/heads/main/external/streamerbot/SubathonManager_Extension.sb).

---

## Triggers

The imported template includes pre-wired triggers for the following SubathonManager events. Each trigger arrives as a WebSocket message that Streamer.Bot parses and routes to the matching action.

### Events

Fires whenever a tracked subathon event is received (donations, subscriptions, bits, etc.).

- Subathon_Event
- Subathon_Command

---

### Subathon Timer

Fires on any change to the timer state or totals.

- Subathon_Ended
- Subathon_Timer_Update
  - This will be very spammy and not recommended
- Subathon_Paused
- Subathon_Resumed
- Subathon_Locked
- Subathon_Unlocked  

---

### Goals

Fires when a goal's point threshold is reached, or goals list is updated/changed.

- Subathon_Goals_Updated
- Subathon_Goal_Completed

---

### Prompts

Fires for all prompt state transitions, creations, etc.

- Prompt_Started
- Prompt_Completed
- Prompt_Expired
- Prompt_Cancelled
- Prompt_Update

---

## Configuration

After importing, review each action in StreamerBot and wire up your own logic (OBS scene changes, chat messages, sound effects, etc.) to the relevant trigger stubs.

---
