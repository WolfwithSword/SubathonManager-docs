# Retro-Pixel

[:fontawesome-brands-github: View Source](https://github.com/WolfwithSword/SubathonManager/tree/main/presets/retro-pixel){ .md-button } &nbsp;&nbsp;
**Author:** [WolfwithSword](https://github.com/WolfwithSword)

A full retro pixel-art themed overlay collection.

## Preview

![Retro-Pixel preview](https://github.com/user-attachments/assets/70fcaf1e-f54f-46b5-a6a0-9d100b847d7e)

---

## Timer

A lightweight, customizable retro themed timer. Shows days, hours, minutes, and seconds separately.

<video controls style="width:100%;border-radius:8px;margin:1rem 0">
  <source src="https://github.com/user-attachments/assets/4b6d1b3d-9104-41be-a515-55caf025078b">
</video>

=== "CSS Variables"

    | Variable | Description |
    |---|---|
    | `background` | Widget background colour |
    | `text-color` | Text colour |
    | `border-color` | Border colour |
    | `pixel-border` | Border thickness |
    | `font` | Font family |
    | `time-font-size` | Font size for the time values |
    | `label-font-size` | Font size for the day/hour/min/sec labels |
    | `timebox-background` | Background colour of each individual time box |

=== "JS Variables"

    | Variable | Type | Description |
    |---|---|---|
    | `showLeadingEmptyTime` | Boolean | If `true`, empty time boxes (e.g. days when under 1 day) show as `00`. If `false`, boxes above the current minimum are hidden. |
    | `minimumTimeUnitsShown` | Int | Minimum number of time boxes to show when `showLeadingEmptyTime` is `true`. E.g. `2` always shows at least minutes and seconds. |
    | `alignment` | StringSelect | `center`, `left`, or `right` |

---

## Events

View recent events like subs and donations in a sleek retro-pixelated bar.

<video controls style="width:100%;border-radius:8px;margin:1rem 0">
  <source src="https://github.com/user-attachments/assets/07c36a04-8ced-4ed6-9075-cb7616744318">
</video>

=== "CSS Variables"

    | Variable | Description |
    |---|---|
    | `background` | Widget background colour |
    | `border-color` | Border colour |
    | `text-color` | Text colour |
    | `pixel-border` | Border thickness |
    | `font` | Font family |

=== "JS Variables"

    | Variable | Type | Description |
    |---|---|---|
    | `minDisplaySeconds` | Float | Minimum seconds to display each event when multiple are queued |
    | `applicableEvents` | [`EventTypeList`](../../Structure.md#js-variable-injection) | Which event types to show |

---

## Goals

An XP-like progress bar for the current goal in progress, in a retro theme. Optionally plays a sound on goal completion.

<video controls style="width:100%;border-radius:8px;margin:1rem 0">
  <source src="https://github.com/user-attachments/assets/45fdabef-cb3d-4d6a-845a-b7d1ab76bb58">
</video>

<video controls style="width:100%;border-radius:8px;margin:1rem 0">
  <source src="https://github.com/user-attachments/assets/69daa175-e1b5-4f40-bf2d-669c0c0a8cf6">
</video>

=== "CSS Variables"

    | Variable | Description |
    |---|---|
    | `background` | Widget background colour |
    | `bar-background` | Progress bar track colour |
    | `bar-color` | Progress bar fill colour |
    | `border-color` | Border colour |
    | `text-color` | Text colour |
    | `pixel-border` | Border thickness |
    | `font` | Font family |

=== "JS Variables"

    | Variable | Type | Description |
    |---|---|---|
    | `playSoundOnCompletedGoal` | Boolean | Play a sound when a goal is completed |
    | `soundVolume` | Float | Volume for the completion sound |

---

## Stats

View subathon stats and status all in one retro-style widget. Supports an icon mode for a more compact display.

<video controls style="width:100%;border-radius:8px;margin:1rem 0">
  <source src="https://github.com/user-attachments/assets/693ba068-95d5-4cd8-9208-7d8ae1144ada">
</video>

Icon mode enabled:

![Stats icon mode](https://github.com/user-attachments/assets/44b6231a-be25-4755-aa2a-7e16e5dd701f)

=== "CSS Variables"

    | Variable | Description |
    |---|---|
    | `background` | Widget background colour |
    | `text-color` | Text colour |
    | `border-color` | Outer border colour |
    | `stat-border-color` | Border colour of each stat row (excludes locked/paused) |
    | `statbox-background` | Background colour of each stat row item |
    | `points-color` | Points value colour |
    | `money-color` | Money value colour |
    | `time-mult-color` | Time multiplier value colour |
    | `train-color` | Hype train indicator colour |
    | `locked-color` | Colour when the subathon is locked |
    | `paused-color` | Colour when the subathon is paused |
    | `pixel-border` | Border thickness |
    | `min-width` | Minimum widget width |
    | `font` | Font family |

=== "JS Variables"

    | Variable | Type | Description |
    |---|---|---|
    | `iconMode` | Boolean | Show icons instead of text labels for a compact layout |
    | `showPoints` | Boolean | Show the points stat |
    | `showMoney` | Boolean | Show the total money donated stat |
    | `showTimeMultiplier` | Boolean | Show the active time multiplier |
    | `showHypeTrains` | Boolean | Show hype train status |
    | `pointsName` | String | Label for the points value, e.g. `Points`, `XP`, `Subs` |
    | `alignment` | StringSelect | `Center`, `Left`, or `Right` |

---

## Event Value

Displays the configured seconds or points value for a specific event type. Syncs automatically when the value updates.

![Event Value preview](https://github.com/user-attachments/assets/4f75a864-0bb6-4566-b719-92abac38bfaf)

!!! tip
    See your current configured values at `http://localhost:14040/api/data/values`. The `meta` field in that response corresponds to `optionalTier` here.

=== "CSS Variables"

    | Variable | Description |
    |---|---|
    | `background` | Widget background colour |
    | `box-background` | Inner box background colour |
    | `text-color` | Text colour |
    | `border-color` | Border colour |
    | `pixel-border` | Border thickness |
    | `font` | Font family |
    | `font-size` | Font size |
    | `min-width` | Minimum widget width |
    | `min-height` | Minimum widget height |

=== "JS Variables"

    | Variable | Type | Description |
    |---|---|---|
    | `eventType` | [`EventTypeSelect`](../../Structure.md#js-variable-injection) | Which event type to display the configured value for |
    | `optionalTier` | String | Leave empty for most events. For Twitch Subs: `1000`, `2000`, `3000`. YouTube Memberships: `DEFAULT`. KoFi: the tier name or `Default`. |
    | `valueType` | StringSelect | `Seconds` or `Points` |
    | `alignment` | StringSelect | Text alignment |
    | `showSuffix` | Boolean | Show the unit suffix - `s` for seconds, `pts` for points |

---

## Goals List

Displays goals in a list view. Automatically uses points or money tracking based on the active goals type.

![Goals List preview](https://github.com/user-attachments/assets/84664815-a7b8-4894-8a93-84de7e6e01cf)

=== "CSS Variables"

    | Variable | Description |
    |---|---|
    | `goal-height` | Height of each goal row |
    | `goal-gap` | Gap between goal rows |
    | `background-color` | Widget background colour |
    | `border-color` | Border colour |
    | `border-thickness` | Border thickness |
    | `font` | Font family |
    | `font-size` | Primary font size |
    | `small-font-size` | Secondary font size |
    | `font-color` | Text colour |
    | `points-bg-color` | Background colour of the points/value badge |

=== "JS Variables"

    | Variable | Type | Description |
    |---|---|---|
    | `showLastCompleted` | Boolean | Show the most recently completed goal |
    | `maxGoalsToShow` | Int | Maximum number of goals to display at once |