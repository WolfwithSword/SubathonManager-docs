---
title: Subathon Summary
description: Browse, filter, edit, export, and rank every event across your subathon
tags:
  - Usage
  - Subathon
  - Leaderboard
---

# Subathon Summary

The **Subathon Summary** window lets you look back over every event from *any* subathon, not only the active one. You can filter and search events, fix usernames, delete events, export to CSV, see count breakdowns, and build user leaderboards.

Open it from the **Settings** page with the **Subathon Summary** button at the top.

The window has three tabs:

| Tab | What it's for |
|---|---|
| [**Events**](#events) | Filter, search, edit, delete, export and break down individual events. |
| [**Leaderboard**](#leaderboard) | Rank users by points, count, money, tokens, orders or items. |
| [**Summary JSON**](#summary-json) | The raw totals response from the [Amounts API](Development.md#amounts). |

## Select a Subathon

The **Subathon** dropdown at the top picks which subathon you're viewing. Your active subathon is listed first and labelled `(Active)`, followed by past subathons, newest first, with their start date. **Refresh** reloads the current tab.

!!! info "Past subathons are read-only"
    When you view a past subathon, **Edit User** and **Delete Event** are turned off and a notice appears in the header. Filtering, the breakdown, leaderboards and exports still work.

---

## Events

<div class="usage-img clip" markdown>
![Subathon Summary - Events](https://assets.subathonmanager.app/docs/examples/usage/2.0.2/summary_events.png)
</div>

The Events tab lists every event in the selected subathon, with its time, source, type, meta (such as sub tier), user, value, amount, the seconds and points it added, and whether it was processed. Click any column header to sort, and select the timestamp to sort by default again.

### Filters

Expand **Filters** to narrow down the list, then click **Apply Filters**. **Reset** clears all filters.

| Filter | Description |
|---|---|
| **Time Range** | Pick a preset (`All time`, `Last 15 minutes`, `Last hour`, `Last 6 hours`, `Last 12 hours`, `Last 24 hours`, `Last 7 days`, `Last 30 days`) or enter your own **From** / **To** as `yyyy-MM-dd HH:mm`. Leave either one blank for no limit |
| **Users** | A comma-separated list of usernames used as a **Blacklist** (hide these users) or a **Whitelist** (only these users). Add `*` to the end of a name to match every name that starts with it, e.g. `SYSTEM*` or `anon*`. |
| **Include unprocessed events** | Also show events that were not applied to the subathon. |
| **Sources** | Only show events from the selected sources, e.g. Twitch, YouTube, KoFi. |
| **Event Types** | Only show the selected event types, e.g. Twitch Subscription, YouTube SuperChat. |
| **Event Id** | Find an event by its full Id, or by the first few characters. This **ignores all other filters**. If you enter a full Id that belongs to a different subathon, the status bar tells you which |

### Editing Users

Select one or more events and click **Edit User** to change who the events are credited to. Hold `Ctrl` or `Shift` to select several rows. Before you save, the dialogue shows how many events will change.

Only the username changes. The time, points and money from those events stay the same.

!!! tip "Why edit users?"
    The same person may have different names on different platforms, for example `SomeViewer` on Twitch and `SomeViewer_YT` on YouTube, or under a different name on KoFi, etc. Giving their events one shared name makes them show up as one person on the [Leaderboard](#leaderboard) and in exports. This is also useful for attributing merch orders to a user, as for most, the username is not defined as it is not returned by the integration data.

### Deleting Events

Select one or more events and click **Delete Event**. This deletes the events permanently and **removes the time and points they added** from the subathon. You cannot undo this.

Control commands (such as pause, resume, lock, unlock) cannot be deleted. If your selection includes them, they are skipped and kept.

### Export CSV

**Export CSV** saves **every event that matches your filters** to a CSV file in the `exports` folder, not only the page you're looking at. The file starts with a few header lines (export time, subathon name and Id) then has one row per event, including values that aren't shown in the table, such as multipliers, whether the event was reversed, and secondary values.

### Breakdown

<div class="usage-img" markdown>
![Subathon Summary - Breakdown](https://assets.subathonmanager.app/docs/examples/usage/2.0.2/summary_breakdown.png)
</div>
<div class="usage-img" markdown>
![Subathon Summary - Breakdown Totals](https://assets.subathonmanager.app/docs/examples/usage/2.0.2/summary_breakdown2.png)
</div>

Click **Breakdown** to open a panel that adds up every event matching your current filters:

| Section | Contents |
|---|---|
| **Sources** | Total event count, and the number of events from each source. |
| **Event Types** | Event count and total amount for each event type. If a type has more than one meta value (for example sub tiers), each one is listed underneath. |
| **Currencies** | Total amount received in each currency, before conversion. |
| **Totals** | Points added, time added, and money donated, converted to your primary currency. |

The breakdown uses your filters, so you can answer questions like *"how many T1 subs came in during the last 6 hours?"* or *"how much did one user donate in total?"*.

---

## Leaderboard

<div class="usage-img clip" markdown>
![Subathon Summary - Leaderboard](https://assets.subathonmanager.app/docs/examples/usage/2.0.2/summary_leaderboard.png)
</div>

The Leaderboard tab groups events by user and ranks the users. It's a UI for the [Leaderboard API](Development.md#leaderboard), so any leaderboard you build here can also be fetched from its URL by a widget, bot or other tool.

| Option | Description |
|---|---|
| **Event Types** | Which event types to include. Pick one type to rank by that type's own values. Pick more than one to get a **combined** leaderboard, which always ranks by points and ignores **Meta**. |
| **Method** | How users are ranked. Leave it on `(default for type)` or choose one. See [Methods](Development.md#leaderboard-methods) for which methods each event type supports. |
| **Top N** | How many users to show. Default `10`, or `all`. |
| **Meta** | Only count events with this meta value, such as a sub tier (`T1`, `1000`, ...). Only works when one event type is selected. |
| **Blacklist** | Comma-separated users to leave out. A trailing `*` matches by prefix, e.g. `SYSTEM*`. |
| **Aliases** | Count several names as one user without editing the saved events. See the format below. |

Each alias entry is the name to show, a colon, then the other names separated by `|`. Separate entries with commas:

```text
someguy1:AltGuy_ttv|AltGuy_YT, other:alt
```

Here, events from `AltGuy_ttv` and `AltGuy_YT` count as `someguy1`, and events from `alt` count as `other`.

Click **Visualize** to run it. The table shows each user's **rank**, **value** (in the method's unit), the number of **events** they had, and their **count** (subs, items, etc.). The raw JSON response is shown under the table.

| Button | Description |
|---|---|
| **Copy URL** | Copies the API URL for this leaderboard. |
| **Open in Browser** | Opens that URL in your browser. |
| **Export CSV** | Saves the current results to the `exports` folder, including the query settings and totals. |

!!! info "Link subathon Id in URL"
    When this is **off**, the generated URL always points to whichever subathon is active *when the URL is loaded*, which is what you usually want for a widget. When it's **on**, the URL includes the Id of the subathon selected in the dropdown, so it always shows that subathon.

---

## Summary JSON

<div class="usage-img clip" markdown>
![Subathon Summary - Summary JSON](https://assets.subathonmanager.app/docs/examples/usage/2.0.2/summary_json.png)
</div>

This tab shows the raw [`/api/data/amounts`](Development.md#amounts) response for the selected subathon: totals for each event type, split into **real** and **simulated** events.

Click **Load** to fetch it. You can then **Copy URL**, **Copy JSON**, or **Open in Browser**. **Link subathon Id in URL** works the same way as on the [Leaderboard](#leaderboard) tab.
