---
title: Mix It Up Integration
description: Control SubathonManager from Mix It Up with generated commands, and run Mix It Up commands when subathon events happen
---

# Mix It Up Integration

SubathonManager works with [Mix It Up](https://mixitupapp.com/) both ways:

- **Mix It Up -> SubathonManager**: Generate ready-made Mix It Up actions for every SubathonManager command (add time, pause, resume, add points, wheel spins, etc.) and import them into any command or action group.
- **SubathonManager -> Mix It Up**: Run your own Mix It Up commands when something happens in SubathonManager, such as the timer pausing, a goal completing, or a wheel spin landing.

Settings are under **Settings** > **External Software** > **Mix It Up**.

![mixitup-settings](https://assets.subathonmanager.app/docs/config/setup/mixitup/settings.png)

---

## Requirements

- [Mix It Up](https://mixitupapp.com/) installed and running
- SubathonManager running
- For sending events to Mix It Up: the Mix It Up **Developer API** enabled (see [Sending Events to Mix It Up](#sending-events-to-mix-it-up))

---

## Generating Commands

1. Click **Generate Mix It Up Commands**.
2. A folder opens with one `.miucommand` file for every SubathonManager command, named like `Subathon - <Command>`.
3. In Mix It Up, create or edit a command, action group, or anything else with actions, then choose **Import** and pick one of the generated files.

![mixitup-import](https://assets.subathonmanager.app/docs/config/setup/mixitup/import_action.png)

Each imported action is a web request to SubathonManager on your configured server port. Commands that take a value (such as adding time or points) pass Mix It Up's `$allargs`, so whatever follows the chat command is sent along. For example, `!addtime 10m` sends `10m`.

!!! note
    The generated files use the server port set in SubathonManager at the time you click generate. If you change the port, generate and import the commands again.

---

## Sending Events to Mix It Up

SubathonManager can run a Mix It Up command of your choice when certain events happen. This uses Mix It Up's Developer API.

### Enable the Developer API

1. In Mix It Up, open **Services**.
2. Find **Developer API** and click **Connect**.
3. In SubathonManager, click the refresh button next to **Status**. It should show **Connected** along with your Mix It Up version.

The default API URL is `http://localhost:8911/api/v2`. Only change it if you changed it in Mix It Up.

### Assign Commands to Events

1. Tick **Run Mix It Up commands when these fire**.
2. Click **Load Mix It Up Commands** to fetch your Mix It Up commands.
3. For each event you want to use, pick a command from the dropdown. You can also paste a Mix It Up command ID directly.
4. Click **Test** on a row to run that command right away with sample data.
5. Save your settings.

Leave a row empty to not run anything for that event.

| Event | Fires when |
|---|---|
| **Subathon Event** | Any subathon event is processed (subs, donations, orders, etc.). Also fires for commands if **Send Command events?** is ticked |
| **Timer Paused** | The subathon timer is paused |
| **Timer Resumed** | The subathon timer is resumed |
| **Timer Locked** | The subathon is locked |
| **Timer Unlocked** | The subathon is unlocked |
| **Multiplier Started** | A multiplier starts |
| **Multiplier Ended** | A multiplier ends or is stopped |
| **Goal Completed** | A goal is reached |
| **Wheel Spin Start** | A wheel spin starts |
| **Wheel Spin End** | A wheel spin lands on a result |
| **Prompt Started** | A prompt run starts |
| **Prompt Ended** | A prompt run is completed, expires, or is cancelled |

!!! warning "Command loops"
    Only tick **Send Command events?** if the Mix It Up command for **Subathon Event** does *not* call SubathonManager back. Otherwise a command can trigger itself over and over.

### Event Data

Event data is passed to your Mix It Up command as special identifiers. Every event includes `$subathonmanagertrigger`, which is the event name (e.g. `TimerPaused`). Hover an event's name in the settings to see exactly what it sends.

??? info "Identifiers for each event"

    **Subathon Event**

    `$subathonmanagereventtype`, `$subathonmanagersource`, `$subathonmanagertruesource`, `$subathonmanagersubtype`, `$subathonmanageruser`, `$subathonmanagervalue`, `$subathonmanageramount`, `$subathonmanagercurrency`, `$subathonmanagercommand`, `$subathonmanagersecondsadded`, `$subathonmanagerpointsadded`, `$subathonmanagersecondaryvalue`, `$subathonmanagertertiaryvalue`, `$subathonmanagerreversed`

    Use `$subathonmanagereventtype` and `$subathonmanagercommand` to branch on what happened within one Mix It Up command.

    **Timer Paused / Resumed / Locked / Unlocked**

    `$subathonmanagertimeremaining` (`HH:MM:SS`), `$subathonmanagersecondsremaining`, `$subathonmanagerpoints`, `$subathonmanagerpaused`, `$subathonmanagerlocked`

    **Multiplier Started / Ended**

    `$subathonmanagermultiplier`, `$subathonmanagermultipliertime`, `$subathonmanagermultiplierpoints`, `$subathonmanagermultiplierduration` (seconds), `$subathonmanagermultiplierhypetrain`

    **Goal Completed**

    `$subathonmanagergoaltext`, `$subathonmanagergoaltarget`, `$subathonmanagergoalcurrent`

    **Wheel Spin Start**

    `$subathonmanagerwheelname`, `$subathonmanagerwheelid`, `$subathonmanagerspindelay`

    **Wheel Spin End**

    `$subathonmanagerwheelname`, `$subathonmanagerwheelid`, `$subathonmanagerwheelitem`, `$subathonmanagerspinstatus`, `$subathonmanagerspinsowed`

    **Prompt Started / Ended**

    `$subathonmanagerprompttext`, `$subathonmanagerprompttype`, `$subathonmanagerprompttarget`, `$subathonmanagerpromptduration` (seconds), `$subathonmanagerpromptstatus`

---

## Troubleshooting

- **Status shows "Not seen"**: Make sure Mix It Up is running, the Developer API is connected, and the API URL is correct, then click the refresh button.
- **"Couldn't reach Mix It Up" when loading commands**: Same as above.
- **A command isn't in the dropdown**: Only commands the Developer API can run are listed. Commands marked `(disabled)` are disabled in Mix It Up.
