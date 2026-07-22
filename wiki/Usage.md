---
title: Usage
description: How to use SubathonManager
tags:
  - Usage
  - Setup
  - Subathon
---

!!! tip "Donothon Mode"
    If you want to adjust the subathon to be a donothon, that is done by configuring your goals list to be of type "Money" instead of "Points". Even if you have no goals.

!!! info "Generic Alert / Timerless Mode"
    To use this as a generic alert system for overlays, or a timerless event with goal tracking, "unlock" the subathon timer and ensure everything you want to have tracked or overlays for has seconds or points configuration above 0. In these cases, set the timer to a very high number, such as `300d`, to ensure it won't hit zero and auto lock.

---

## Subathon Controls

<div class="usage-img clip" markdown>
![Home Page](https://assets.subathonmanager.app/docs/examples/usage/1.2.3/homepage.png)
</div>

### Subathon & Time Management

In this section, you can create a new subathon with an initial time set by clicking the `start new subathon` button. You can also specify if it is a **reverse subathon** in the popup, which if true, will make the timer tick up, but all events will reduce time instead.

To the left of this button is an end-date configuration button. If you wish to set an end date and time for the subathon, you can do so here. If the time of your timer exceeds this value, then what will be displayed in widgets, data, and the app, will be *time until the end date*, and will "count down" even if paused - time can still be "added" if unlocked, but will not increase visually until end date is removed, so no data is lost. You can enable/disable the end date at any time.

<div class="usage-img clip" markdown>
![Home Page](https://assets.subathonmanager.app/docs/examples/usage/1.2.0/enddate.png)
</div>


In addition to viewing what the current timer value is, you can also toggle **pausing** and **locking** the subathon.

There is a button to quickly force refresh all browser overlays.

Finally, there is a section for quick adding, removing, or setting of time. Format for time is the same as commands, such as `#d#h#m#s`.

### Multiplier Control

Here you can initiate a multiplier for either time, points, or both.

The duration is optional - if not set, multiplier only ends on app restart or force end. If set, multiplier values will reset to `1x` when it counts down to 0.

It will preview the current multiplier values as well as a current duration if enabled and active. You can also stop a multiplier here at any time.

!!! note
    Multiplier values can be any positive number, e.g. `2`x, `2.5`x. The only limitation is both time and points share the same multiplier.

### Points Management & Upcoming Goals

In this section, you can preview your current points in the subathon, as well as quick add, subtract, or set the points.

Under here, you can preview your upcoming goals list with their points value, as well as see your most recently completed goal.

---

## Recent Event List

This list contains a subset of recent events processed by your active subathon!

For each event, you will see the event type, source, time, user who triggered it, and its value(s). Additionally, you will see whether or not it was successfully processed.

- **Delete** an event from this list to *undo* the time/points associated with it, if applicable.
- If an event is not processed, you are able to try **reprocessing** it.

---

## Overlays

To use an overlay in OBS, please create a browser source of the correct height and width, then paste in the link for your overlay that you can copy from here.

### Overlays Page

<div class="usage-img clip" markdown>
![Overlays Page](https://assets.subathonmanager.app/docs/examples/usage/overlaypage.png)
</div>


On this page, you will see on the left, a list of all your current overlays.

From here, you can create a new overlay, or select one from the list where you can then copy the url, edit it (via button or double click), duplicate it, export it, or permanently delete it.

On the right, you will see a button which will let you quickly refresh all overlays that are open. If you have OBS Connected, it will show all your SubathonManager overlays with controllable actions on the right as well. See [OBS](./config/OBS.md) for more details.

!!! info "Overlay Export / Import"
    You can export any overlay and it will attempt to get all associated files, and save all configuration, then create a `.smo` file. This file can be shared and imported again here as a brand new, premade overlay with all config and files needed!

### Editor

<div class="usage-img clip" markdown>
![Overlays Editor Page](https://assets.subathonmanager.app/docs/examples/usage/1.2.0/overlayeditorpage.png)
</div>


=== "Overlay Settings"

    You can rename an overlay here, as well as set its Width and Height.

    It is important to match this width and height when you create your OBS browser source for the best results.

    You can copy the link, open it in a browser, or save your settings here.

    Saving the overlay will cause it to refresh in all places.

    <div class="usage-img" markdown>
    ![Overlay Settings](https://assets.subathonmanager.app/docs/examples/usage/overlay_settings.png)
    </div>

=== "Widget Control"

    A list of widgets will be shown here that are active in the overlay.

    You can also import new widgets as html files from your system with the **Import Widget** button.

    Their order (also indicated by the Z value) dictates overlapping rules. Widgets higher up / with a bigger number will appear above others.

    Options are available to **toggle visibility**, which keeps the widget in the overlay but not visible when in OBS.
    You can adjust the overlap position with the arrows, open the widget in the widget editor (or via double click), duplicate the widget, or delete it from the overlay.

    When you double click or click the edit button on a widget in this list, it will populate it in the *Widget Editor* for customization.

    <div class="usage-img" markdown>
    ![Widget Control](https://assets.subathonmanager.app/docs/examples/usage/widget_control.png)
    </div>

=== "Built-In Editor"

    This editor preview allows you to view what the widgets in the overlay will currently look like.

    You can drag and move around the widgets, as well as click them to select them to populate in the *widget editor* on the right.

    You can hover over a widget to view its name and Z value, and widgets with visibility toggled off will be faded.

    You can resize widgets in the editor, and by holding shift and dragging an orange corner, you can preserve aspect ratio while resizing.

    There is grid shapping by holding Alt.
    
    <div class="usage-img" markdown>
    ![Preview Editor](https://assets.subathonmanager.app/docs/examples/usage/builtin-editor.png)
    </div>

=== "Widget Editor/Settings"

    When a widget is selected either via the list or the preview UI, you can do various actions.

    You can rename the widget, set its width and height, and change its X and Y position (will also update when you drag them around).

    <div class="usage-img" markdown>
    ![Widget Settings](https://assets.subathonmanager.app/docs/examples/usage/widgeteditor_1.png)
    </div>

    A list of detected CSS, JS, and Font variables will also be displayed, which you can customize to *override* defaults found as CSS Vars in your linked CSS variables from within the widget's local referenced css files.

    <div class="usage-img" markdown>
    ![Widget Settings](https://assets.subathonmanager.app/docs/examples/usage/widgeteditor_css.png)
    </div>

    <div class="usage-img" markdown>
    ![Widget Settings](https://assets.subathonmanager.app/docs/examples/usage/widgeteditor_js.png)
    </div>

    <div class="usage-img" markdown>
    ![Widget Settings](https://assets.subathonmanager.app/docs/examples/usage/1.2.0/widgeteditor_font.png)
    </div>

    To load and preview your customizations, you will need to click **Save**. To reload CSS variable detection from your raw files, click the **Reload Vars** button. CSS Variables can be previewed instantly without saving, however JS and Font variables require saving. If you swap between widgets without saving, they will be highlighted in yellow.

    You can specify custom fonts from Google, CDN, or BunnyFonts which can be injected into your widgets as well. This will be a comma-separated list.

    Saving any widget will cause the widget to refresh in all places. Saving the overlay will cause all widgets to refresh.

---

## Goals

<div class="usage-img clip" markdown>
![Goals Page](https://assets.subathonmanager.app/docs/examples/usage/1.2.0/goalspage.png)
</div>

### Goals List

Goals are tracked separately from your subathon, so that once you set them up, they will persist here unless edited or a new list is made. You can swap between active lists at any time, however, whichever one is visible will immediately become active.

You can add new goals with the **+** button, where for each goal you can set the Text and the number of Points required to achieve. Each goal can also be deleted, and the list will always be sorted from lowest to highest points.

To save changes, click the Save button in the Editor pane.

### Goals Editor

In the goals editor, you can set a new name for your current goals list or make a new one. Only one set of goals can be active at any given time.

You can preview your live current number of points on this page.

Clicking the **Create New List** button will create a whole new empty goals list, added to the dropdown.

To save changes to your list, click **Save Changes**.

---

## Prompts

<div class="usage-img clip" markdown>
![Prompts Page](https://assets.subathonmanager.app/docs/examples/usage/1.2.0/promptspage.png)
</div>

In the prompts tab, you can setup "prompts", which are similar to mini goals during your subathon.

Similar to goals, you can setup multiple "sets" of prompts, and swap between them as desired. Only one set can be active at a time, and it is whichever has "Enabled" checked. To disable the feature, simple uncheck it then hit save.

When enabled, every *interval* minutes, with an offset of +- *offset* minutes, a new prompt can be executed if any are available. After it is completed, the interval starts again - if successful, the *cooldown* minutes is added before the interval starts.

Prompts have multiple fields. The text is presented in overlay widgets to your viewers while the prompt is running.

| Field | Description |
|---|---|
| **Type** | What events will progress the goal. One of: `Points` `Money` `Orders` `Follows` `Subs` `Tokens` `Specific Event` |
| **How?** | Depends on **Type**. Can be per subscription tier, items vs orders for order events, or **Count** (default) for a simple event count. |
| **Event** | Available when **Type** is `Specific Event`. Dropdown of all sources and their specific events. |
| **Tier** | Available when **Event** is a subscription or membership event. Restricts the goal to a specific tier only. |
| **Target** | The goal to reach. For example: 10 subs, $100, 5 items ordered from Gamersupps, etc. |
| **Duration** | How long viewers have to complete the goal before it expires. |
| **Quantity** | How many times the prompt can be successfully completed before it runs out. Expired, failed, or cancelled runs do not count against it. Set to **Infinite** for unlimited completions. |

You can choose to manually run any configured prompt immediately, or run a random one from the list. When the interval runs to choose one, it will run one at random that has a valid quantity. Individual prompts can also be disabled or temporarily excluded with their checkbox.

Prompts auto-running is only available if the timer is *unlocked* and *not paused*.

You can view the prompt history on the home page, tabbed with recent events.

<div class="usage-img clip" markdown>
![Recent Prompts](https://assets.subathonmanager.app/docs/examples/usage/1.2.0/promptshomepreview.png)
</div>


---

## Wheel Spin

SubathonManager includes an integrated Wheel Spin feature with two tabs: **Wheel** for configuring and spinning your wheel, and **Triggers** for automatically adding spins from stream events.

### Wheel

<div class="usage-img clip" markdown>
![Wheel Spin Page](https://assets.subathonmanager.app/docs/features/wheelspin/wheel_spins.png)
</div>

You can configure multiple wheels and swap between them at any time. The active wheel is whichever one is currently viewed on this page. You can view the total number of times each individual wheel has been spun via the **Total Spins** counter.

You can configure the **delay** between a spin and when the result is revealed, and view or manually adjust the current number of **spins owed**.

Each wheel holds any number of items. Items can be weighted differently to influence how often they are selected, and can have a set quantity or be set to **infinite** (no limit). Items automatically disable when their quantity hits zero, and you can manually enable or disable any item at any time.

Each item has an **Action** that determines what happens when it is spun:

| Action | Description |
|---|---|
| **Add Time** | Automatically adds the configured duration to the subathon timer. |
| **Subtract Time** | Automatically removes the configured duration from the subathon timer. |
| **Multiplier** | Queues a new multiplier event with custom settings and duration. Must be manually started from the Spin History. |
| **Reroll** | Adds new spins owed rather than performing a direct action. Value of 1 is essentially a reroll for dramatic expense. Does not automatiocally roll. |
| **Manual** | No automatic action. Handled externally by you. |

### Spin History

The spin history shows past spins for the active wheel. You can filter and export this list. Each entry shows the **time** of the spin, the **item** selected, the **action** taken, and its **status**, which you can manually change between *Done*, *Pending*, and *Cancelled*.

---

### Triggers

<div class="usage-img clip" markdown>
![Wheel Triggers Page](https://assets.subathonmanager.app/docs/features/wheelspin/wheel_triggers.png)
</div>

The **Triggers** tab lets you define events and conditions that automatically add spins owed. Each trigger can be individually enabled or disabled and is tied to a single event type and condition.

For most event types, only one trigger is allowed per type. The exception is **subscriptions** and **memberships**, where each trigger must be unique per event *and* tier, allowing separate spin rewards for T1, T2, and T3 for example.

Supported conditions vary by event type:

| Event Type | Condition Options |
|---|---|
| Subscriptions / Memberships | Subscription tier |
| Gifted Subscriptions | Number of gifts required |
| Donations | Amount donated (after currency conversion) |
| Bits / Tokens | Total bits or tokens |
| Orders | Amount paid, number of items, or per order |

!!! note
    Triggers for follows, raids, and similar events are not currently supported.

!!! info "Spin Calculation"
    Spins are awarded based on how many times the threshold is met. For example, if your trigger awards 1 spin per 10 gifted subs and someone gifts 25 subs at once, **2 spins** will be added. Triggers are not cumulative, and are "all or nothing" per event that matches.

### Trigger History

The trigger history shows past trigger events, which you can export as CSV. Each entry shows the **time**, the **event type** that triggered it, the **user** who triggered it, and the number of **spins** added. The exported file also includes the **SubathonEvent Id** for each entry.

---

!!! tip "Discord Logging"
    In the [Discord Log Webhook Settings](config/Webhooks.md) page, you can log all wheel spin and wheel trigger history to a Discord channel.

---

## Settings

See [Configuration](Configuration.md)

<div class="usage-img clip" markdown>
![Settings Page](https://assets.subathonmanager.app/docs/examples/usage/1.2.0/settingspage.png)
</div>

---

## Chat Commands

See [Configuration](config/Commands.md) for the command names. You can change the defaults.

=== "Points"

    | Command | Description | Example |
    |---|---|---|
    | `!addpts` | Add a number of points | `!addpts 10` |
    | `!subtractpts` | Remove a number of points | `!subtractpts 10` |
    | `!setpts` | Set the points to a specific number | `!setpts 140` |

=== "Timer"

    | Command | Description |
    |---|---|
    | `!pause` | Pause the timer from counting down |
    | `!resume` | Resume counting down the timer |

    Controls: 

    - Time format: `##d##h##m##s` - e.g. 5 minutes can be `300s` or `5m`

    | Command | Description | Example |
    |---|---|---|
    | `!addtime` | Add time | `!addtime 1h30m` |
    | `!subtracttime` | Remove time | `!subtracttime 5m` |
    | `!settime` | Set time | `!settime 8h35m5s` |

=== "Multiplier"

    The multiplier can apply to either time, points, or both. It can also be supplied an optional duration, after which, it will reset to `1x 1x`. Multipliers are not preserved between app restarts.

    **Format:** `#xt` for Time only · `#xp` for Points only · `#xpt` or `#xtp` for both · `##d##h##m##s` for optional duration

    | Command | Description | Example |
    |---|---|---|
    | `!setmultiplier` | Set multiplier. Overwrites any current multiplier. | `!setmultiplier 2xtp 2h` · `!setmultiplier 2xt 30m` · `!setmultiplier 2.5xpt` |
    | `!stopmultiplier` | Stop the multiplier entirely, resetting to `1x` for both time and points | - |

=== "Money"

    | Command | Description | Example |
    |---|---|---|
    | `!addmoney` | Add money, does not affect time. Requires a currency. | `!addmoney 10.15 CAD` |
    | `!subtractmoney` | Remove money. Requires a currency. | `!subtractmoney 10 USD` |

=== "Wheel Spin"

    | Command | Description | Example |
    |---|---|---|
    | `!setspins` | Set the spins owed to a specific number. | `!setspins 20` |
    | `!addspins` | Add spins owed. | `!addspins 5` |
    | `!subtractspins` | Subtract spins owed up to 0. | `!subtractspins 5` |
    | `!spinwheel` | Spin the Wheel. | `!spinwheel` |

=== "Other"

    | Command | Description |
    |---|---|
    | `!lock` | Lock the subathon, preventing new events from contributing |
    | `!unlock` | Unlock the subathon so all events can be added |
    | `!refresh` | Refresh *all* active browser overlays |

---

## External Commands

See [Development - External Commands](Development.md#external-commands)