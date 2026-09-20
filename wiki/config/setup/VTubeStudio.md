---
title: VTube Studio
description: Connect SubathonManager to VTube Studio to drive your model from subathon data and wheel spin rewards
tags:
  - VTube Studio
  - Wheel Spin
  - Setup
---

# VTube Studio

!!! warning "Beta"
    The VTube Studio integration is currently in its early stages. I am looking for feedback for improvements and changes for how people actually would like it integrated!

SubathonManager can connect to [VTube Studio](https://denchisoft.com/) as a plugin. Once connected, it:

- **Sends live subathon data** to VTube Studio as [custom parameters](#parameters-sent-to-vts), such as points, goal progress and whether the timer is paused or locked. You can use these to drive your model.
- **Reads your current model's** hotkeys, expressions and parameters, so you can test them from SubathonManager and pick them as rewards.
- **Runs VTube Studio actions as [Wheel Spin](../../Usage.md#wheel-spin) rewards**, for example switching on an expression for 5 minutes or triggering a hotkey.

---

## Setup

### 1. Enable the API in VTube Studio

In VTube Studio, open **Settings**, find the **Plugin API** section, and turn on **Start API**. Note the port shown. The default is `8001`.

### 2. Connect from SubathonManager

<div class="usage-img" markdown>
![VTube Studio Settings](https://assets.subathonmanager.app/docs/config/setup/v2.0.2/vtsconfig.png)
</div>

In SubathonManager, go to **Settings** > **External Software** > **VTube Studio**.

| Field | Description |
|---|---|
| **Host** | The address VTube Studio is running on. Use `localhost` if it's on the same PC. |
| **Port** | The Plugin API port from VTube Studio. Default `8001`. |

Click **Connect**. The status changes to **Connected** once the connection is made. If the connection drops, SubathonManager keeps trying to reconnect in the background. **Disconnect** stops the connection and turns off automatic reconnecting.

### 3. Allow the plugin in VTube Studio

<div class="usage-img" markdown>
![VTube Studio Plugin Approval](https://assets.subathonmanager.app/docs/config/setup/v2.0.2/vtsapprove.png)
</div>

The first time you connect, VTube Studio shows a popup asking whether to allow the **Subathon Manager** plugin by **WolfwithSword**. Click **Allow**.

**Authorization** in SubathonManager then changes to **Authorized**. The token is saved, so you won't be asked again. To reset it, click **Forget Token**, then **Connect** again and accept the new popup.

!!! tip
    If you clicked **Deny** by accident, or removed the plugin in VTube Studio, click **Forget Token** and connect again.

---

## Model Controls

When connected, the settings panel shows the currently loaded **Model** and loads that model's hotkeys, expressions and parameters. The lists update automatically when you change models in VTube Studio. Click the refresh button next to the model name to reload them yourself.

You can use these controls to check that something works on your model before you add it to a wheel:

| Row | Actions |
|---|---|
| **Hotkeys** | **Copy Id** copies the hotkey's Id. **Trigger** runs the hotkey |
| **Expressions** | **Copy File** copies the expression file name, e.g. `cat_ears.exp3.json`. **On**, **Off** and **Toggle** change the expression. |
| **Parameters** | **Copy Name** copies the parameter name. Enter a number and click **Set** to hold the parameter at that value. **Release** hands it back to face tracking or other plugins. |

!!! info "Held parameters"
    VTube Studio resets a parameter shortly after a plugin stops sending it. To keep a value, SubathonManager keeps sending it (by default every 100ms) until you **Release** it, or until a wheel action's timer ends.

---

## Parameters Sent to VTS

When connected, SubathonManager creates these custom parameters in VTube Studio and keeps them up to date with your active subathon. They appear as input parameters in your model's settings, so you can link them to any output parameter the same way you would link face tracking or other custom inputs.

Every parameter's description in VTube Studio starts with `Subathon Manager:`.

### Values

| Parameter | Range | Description |
|---|---|---|
| `SMCurrentPoints` | `0` - `1000000` | Current subathon points. |
| `SMCurrentMoney` | `0` - `1000000` | Current money total, in your primary currency. |
| `SMCurrentGoalValue` | `0` - `1000000` | The points (or money) needed for the next goal. |
| `SMUntilNextGoal` | `0` - `1000000` | How much is still needed to reach the next goal. |
| `SMGoalProgress` | `0` - `100` | Percent of the way from the last completed goal to the next one. `100` once every goal is complete. |

The goal parameters follow your active goals list. If the list is a **Money** list, they use money, otherwise they use points. With no goals, they are all `0`.

The max of 1000000 is a limitation of VTS.

### Flags

Flags are `1` when true and `0` when false.

| Parameter | `1` When |
|---|---|
| `SMMultiplierActive` | A multiplier is running |
| `SMWheelSpinActive` | A wheel spin is in progress. It returns to `0` when the result comes in |
| `SMPromptActive` | A [prompt](../../Usage.md#prompts) is running |
| `SMTimerPaused` | The subathon timer is paused |
| `SMTimerLocked` | The subathon is locked |

!!! tip "Example uses"
    - Link `SMGoalProgress` to a parameter that fills a light sequence or grows a prop as you get closer to a goal.
    - Link `SMTimerPaused` to a sleeping or "be right back" pose or prop.
    - Link `SMWheelSpinActive` to a spinning or excited animation or spinny eyes while the wheel spins.

---

## Wheel Spin Rewards

VTube Studio adds a new **VTube Studio** action type for [Wheel Spin](../../Usage.md#wheel-spin) items. When that item is rolled, SubathonManager runs the action on your model straight away. It can also undo or change it after a set time.

To set one up, edit a wheel item and set its **Action** to **VTube Studio**:

| Field | Description |
|---|---|
| **Target** | What kind of thing to control: **Expression**, **Parameter** or **Hotkey**. |
| **Name / File / Id** | The expression file, parameter name or hotkey to use. When connected, you can pick from the current model's list. When not connected, you can type it yourself. |
| **When Rolled** | What to do when the item is rolled. Depends on the target, see below. |
| **Duration** | Optional, e.g. `30s` or `5m`. How long to wait before running the **After Timer** action. Leave blank for no timer. |
| **After Timer** | What to do when the duration ends. Depends on the target, see below. |

### Action Types

| Target | When Rolled | After Timer Options | Duration Required? |
|---|---|---|---|
| **Expression** | **On**, **Off** or **Toggle** the expression. | **Do Nothing**, **On**, **Off**, **Toggle** | Only if **After Timer** isn't **Do Nothing**. |
| **Parameter** | **Set Value To** a number and hold it there. | **Do Nothing / Release**, **Reset to Original**, **Change to New Value** | Only for **Change to New Value**. |
| **Hotkey** | Trigger the hotkey. | **Do Nothing**, **Trigger Again** | Only for **Trigger Again**. |

### After Timer Options

| Option | Applies To | Description |
|---|---|---|
| **Do Nothing** | Expression, Hotkey | Leave everything as it is. |
| **On** / **Off** / **Toggle** | Expression | Change the expression again, e.g. turn on cat ears for 5 minutes, then **Off**. |
| **Do Nothing / Release** | Parameter | Stop holding the value and hand the parameter back to tracking. |
| **Reset to Original** | Parameter | Set the parameter back to the value it had before the roll, then release it. |
| **Change to New Value** | Parameter | Set the parameter to the **Then Value** you enter, then release it. |
| **Trigger Again** | Hotkey | Trigger the same hotkey again, useful for hotkeys that toggle something on and off. |

!!! example "Examples"
    - **Cat ears for 10 minutes:** Expression `cat_ears.exp3.json`, When Rolled **On**, Duration `10m`, After Timer **Off**.
    - **Big head for 1 minute:** Parameter `FaceAngleZ` (or a custom parameter), Set Value To `30`, Duration `1m`, After Timer **Reset to Original**.
    - **Outfit swap for 30 minutes:** Hotkey for your outfit toggle, Duration `30m`, After Timer **Trigger Again**.

### Spin History & Retrying

If the action runs, the spin is marked **Done** in the Spin History.

If VTube Studio isn't connected, the target isn't on the current model, or VTube Studio rejects the action, the spin stays **Pending**. Pending VTube Studio spins have a **Play** button in the Spin History, so you can run the action later, for example after you connect or switch back to the right model.

!!! note
    The target is checked against the model that's **loaded when the action runs**. If you switch models often, make sure the expression, parameter or hotkey exists on the model(s) you will be using
