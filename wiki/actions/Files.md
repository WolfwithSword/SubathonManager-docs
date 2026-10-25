---
title: SMA Files
description: Import, export and share SubathonManager custom actions as .sma files
tags:
  - Actions
  - Import
  - Export
---

# SMA Files

Every custom action is saved as a single **`.sma`** (Subathon Manager Action) file. It's a simple JSON file holding the action's details and all of its steps and connections.

## Your Library

Your actions live in the `actions` folder of your install. Use **Open Actions** in the [Actions Manager](index.md#actions-manager) to open it.

- Every `.sma` file in the folder (including sub folders) is loaded on startup.
- If you add, edit, or remove files by hand, press **Reload Library**.
- Each action has a unique **id**. If two files share the same id, only the first one is loaded and the other is logged and ignored.

## Exporting

Press **Export .sma** on an action card, or **Export** in the editor. A copy is saved to `exports/actions` as `<name>_<version>.sma`. Use **Open Exports** to find it.

Exported files contain **no secret values** - only the names of the [secrets](Globals.md#secrets) the action uses. Values typed straight into fields (such as a token in a web request's Auth) **are** included, so use secrets for anything private before sharing.

Fill in the action's **Author**, **Version** and **Description** in the editor before sharing, so people know what it does and which version they have.

## Importing

There are a few ways to import a `.sma`:

| Method | Behaviour |
|---|---|
| **Import .sma** button | In the Actions Manager, the Wheel Spin item editor, or a prompt's Optional Action. Pick one or more files. If you already have an action with the same id, it is **updated** to the imported version. |
| **Open the file** | Double clicking a `.sma` file opens SubathonManager and adds it. |
| **Import into App** | From the [Action Marketplace](../browse-actions.md). Downloads and adds the action. |

Opening a file or using **Import into App** always adds the action as a **new copy**: if you already have it, the copy gets a new id and a name like `My Action (Copy 1)`, and your existing one is left alone.

After importing:

- Any [globals or secrets](Globals.md) the action uses that you don't have yet are created empty. Add your own values for secrets in the **Globals & Secrets** tab.
- If it expects a global you already have to be a different type, you're asked how to [resolve it](Globals.md#created-automatically).
- Steps that point at things in *your* setup (OBS sources, VTube Studio hotkeys, Streamer.bot actions, Mix It Up commands) may need to be re-picked if your names differ.
- [Run Action](Steps.md#run-action) steps find the other action by id first, then by **name**, so actions shared as a set keep working together.

## File Format

Actions files (`.sma`) are usually not edited by hand and are usually made and edited via the editor instead, but the format is simple JSON. Property names are `snake_case`, and empty values are left out.

??? example "Example `.sma`"
    ```json
    {
      "format_version": 1,
      "id": "3f0d7a2e-4f5b-4b8e-9a51-7f3c2e1d0b9a",
      "name": "Goal Webhook",
      "author": "WolfwithSword",
      "description": "Posts to Discord whenever a goal is completed",
      "version": "1.0.0",
      "graph": {
        "on_repeat": "Queue",
        "nodes": [
          {
            "id": "1",
            "step": {
              "type": "Trigger",
              "operation": "None",
              "target": "",
              "trigger": "GoalCompleted"
            },
            "x": 0,
            "y": 0
          },
          {
            "id": "2",
            "step": {
              "type": "HttpPost",
              "operation": "None",
              "target": "%secret.discord_webhook%",
              "body": "{\"content\": \"Goal reached: %trigger.goaltext%\"}",
              "output_variable": "resp"
            },
            "x": 220,
            "y": 0,
            "ignore_errors": true
          }
        ],
        "edges": [
          { "from": "1", "to": "2" }
        ]
      }
    }
    ```

| Field | Description |
|---|---|
| `format_version` | File format version. Currently `1`. |
| `id` | The action's unique id. |
| `name` / `author` / `description` / `version` | Shown in the Actions Manager and marketplace. |
| `disabled` | `true` if the action is turned off. |
| `graph.on_repeat` | The [Concurrency Mode](Editor.md#concurrency-mode): `Restart`, `Parallel`, `Queue`, or `Skip`. |
| `graph.nodes[]` | The steps. Each has an `id`, its canvas position `x` / `y`, optional `disabled`, `ignore_errors` and `inputs` (`Multiple` for [Run For Each Input](Editor.md#run-for-each-input)), and its `step` settings. |
| `graph.edges[]` | The connections, `from` one node id `to` another. `"port": "else"` marks a connection from an If / Else's **else** output. |
