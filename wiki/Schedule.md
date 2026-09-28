---
title: Schedule
description: Plan events and tasks for your subathon with the SubathonManager schedule
tags:
  - Usage
  - Schedule
---

# Schedule

The **Schedule** tab lets you plan out your subathon day by day. Add the events you have planned, like a special stream segment or a guest, and the tasks you need to get done, like setting up a giveaway or restocking a shop.

<div class="usage-img clip" markdown>
![Schedule Page](https://assets.subathonmanager.app/docs/examples/usage/schedule/scheduletab.png)
</div>

---

## Events and Tasks

Each item on the schedule is either an **Event** or a **Task**, and has:

- A **title** and an optional **description** for notes, links, etc.
- A **date**
- An optional **start time** and **end time**, in 24h format. Tick **On the day** instead for things with no set time. An end time earlier than the start time is treated as the next day, e.g. `22:00 - 02:00 (+1)`.

Select a day on the calendar to see what's planned for it, then click an item to edit it, or add a new event or task. Items can be marked as done once they're finished.

---

## Reordering and Moving

Drag an item by its handle to change its order within the day, so the most important things sit at the top.

You can also drag an item onto a different day on the calendar to move it to that day.

Click **Sort by time** to reorder a day's items by start time instead, with **On the day** items first.

---

## Upcoming on the Home Page

The home page has a **Schedule** tab next to **Recent Events** and **Recent Prompts**. It lists your upcoming items that aren't done yet, starting from current day, so you can keep an eye on what's next without leaving the home page. You can mark items as done straight from this list.

<div class="usage-img clip" markdown>
![Home Page Schedule](https://assets.subathonmanager.app/docs/examples/usage/schedule/home.png)
</div>

---

## Import, Export, and Cleanup

- **Export** saves your schedule, or a date range of it, to a CSV file.
- **Import** loads items from a CSV file. Items that already exist (same date, title, and times) are updated instead of duplicated.
- **Delete...** bulk deletes completed items, items before a date, or everything.

If you want to preload a schedule to share without using the app, the CSV columns are `Date` (`yyyy-MM-dd`), `Kind` (`Event` or `Task`), `StartMinute` and `EndMinute` (`HH:MM`), `Title`, `Description`, and `IsDone`. Only `Date` and `Title` are required and the rest will be assumed.
