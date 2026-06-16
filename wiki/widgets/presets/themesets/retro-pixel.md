# Retro-Pixel

[:fontawesome-brands-github: View Source](https://github.com/WolfwithSword/SubathonManager/tree/main/presets/retro-pixel){ .md-button } &nbsp;&nbsp;
**Author:** [WolfwithSword](https://github.com/WolfwithSword)

A full retro pixel-art themed overlay collection.

## Preview

![Retro-Pixel preview](https://assets.subathonmanager.app/docs/widgets/retro-pixel/retro-preview.png)

---

## Timer

A lightweight, customizable retro themed timer. Shows days, hours, minutes, and seconds separately.

<video controls style="width:100%;border-radius:8px;margin:1rem 0">
  <source src="https://assets.subathonmanager.app/docs/widgets/retro-pixel/retro-timer.webm">
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
  <source src="https://assets.subathonmanager.app/docs/widgets/retro-pixel/retro-events.webm">
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
  <source src="https://assets.subathonmanager.app/docs/widgets/retro-pixel/retro-goals.webm">
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

<video controls style="height:50%;border-radius:8px;margin:1rem 0">
  <source src="https://assets.subathonmanager.app/docs/widgets/retro-pixel/retro-stats.webm">
</video>

Icon mode enabled:

![Stats icon mode](https://assets.subathonmanager.app/docs/widgets/retro-pixel/retro-stats.png)

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

![Event Value preview](https://assets.subathonmanager.app/docs/widgets/retro-pixel/retro-value.png)

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

![Goals List preview](https://assets.subathonmanager.app/docs/widgets/retro-pixel/retro-goalslist.png)

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


---

## Prompt

A retro dialogue-like popup displaying the currently running prompt goal, timer, and progress bar. Will flash different icons or colours when the prompt completes or fails.

<video controls style="width:80%;border-radius:8px;margin:1rem 0">
  <source src="https://assets.subathonmanager.app/docs/widgets/retro-pixel/retropixelprompt.webm">
</video>

=== "CSS Variables"

    | Variable | Description |
    |---|---|
    | `background` | Widget background colour |
    | `border-color` | Border colour |
    | `text-color` | Text colour |
    | `label-color` | Label colour |
    | `dialogue-color` | Dialogue colour |
    | `portrait-bg` | Portrait BG colour |
    | `portrait-active` | Portrait BG Active colour |
    | `portrait-complete` | Portrait BG Complete colour |
    | `portrait-expired` | Portrait BG Expired colour |
    | `portrait-color` | Portrait Icon colour |
    | `portrait-complete-color` | Portrait Complete colour |
    | `portrait-expired-color` | Portrait Expired colour |
    | `hp-green` | Progress/HP Bar Full colour |
    | `hp-yellow` | Progress/HP Bar Medium colour |
    | `hp-red` | Progress/HP Bar Low colour |
    | `hp-bg` | Progress/HP Bar bg colour |
    | `timer-color` | Timer colour |
    | `done-color` | Done colour |
    | `expired-color` | Expired colour |
    | `pixel-border` | Size of pixel border thickness |
    | `font` | Font to use |
    | `font-size` | Font size |
    | `dialogue-font-size` | Dialogue text font size |

=== "JS Variables"

    | Variable | Type | Description |
    |---|---|---|
    | `lingerSeconds` | Int | Time to let the prompt linger after it ends |
    | `startedSound` | SoundFile | Sound for when a prompt starts |
    | `startedSoundVolume` | Float | Volume for started sound |
    | `successSound` | SoundFile | Sound for when a prompt completes |
    | `successSoundVolume` | Float | Volume for success sound |
    | `failSound` | SoundFile | Sound for when a prompt ends in failure |
    | `failSoundVolume` | Float | Volume for fail sound |

---

## Wheel

A retro pixel-art styled spinning wheel. Slices are rendered with the wheel item labels, and spin to a result when triggered. A centre hub displays spins owed, and a popup dialogue in the middle will show the result.

<video controls style="width:80%;border-radius:8px;margin:1rem 0">
  <source src="https://assets.subathonmanager.app/docs/widgets/retro-pixel/rp_wheel.webm">
</video>

=== "CSS Variables"

    | Variable | Description |
    |---|---|
    | `canvas-bg` | Wheel canvas background colour |
    | `border-color` | Wheel ring border and accent colour |
    | `text-color` | Wheel item label text colour |
    | `hub-bg` | Centre hub background colour |
    | `hub-text` | Centre hub spins-owed number colour |
    | `label-color` | Small caption text colour (SPINS label, RESULT header) |
    | `nameplate-bg` | Result nameplate background colour |
    | `nameplate-border` | Result nameplate border colour |
    | `nameplate-text` | Result nameplate item text colour |
    | `needle-color` | Pointer nub colour |
    | `hub-label-size` | Font size for the SPINS label above the spins counter |
    | `hub-count-size` | Font size for the spins counter number |
    | `slice-text-size` | Base font size for wheel item text on slices |

=== "JS Variables"

    | Variable | Type | Description |
    |---|---|---|
    | `partitionType` | StringSelect | Visually partition wheel sections by relative `Weight`, or `Equal` size for each item regardless of weight |
    | `playTickSound` | Boolean | Play a tick sound while the wheel is spinning |
    | `tickSound` | SoundFile | Sound to play as a tick while the wheel spins |
    | `tickSoundVolume` | Percent | Tick sound volume |
    | `showSpinsOwed` | Boolean | Show the count of spins remaining in the centre hub |
