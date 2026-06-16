# SteamPunk

[:fontawesome-brands-github: View Source](https://github.com/WolfwithSword/SubathonManager/tree/main/presets/steampunk){ .md-button } &nbsp;&nbsp;
**Author:** [WolfwithSword](https://github.com/WolfwithSword)

A full nixie-tube steampunk themed overlay collection.

!!! warning "OBS Requirement"
    This preset requires a specific OBS browser source fix to render correctly. See [Widgets are faded/grey/desaturated in OBS](../../../widgets/troubleshooting/Troubleshooting.md#widgets-are-faded-grey-desaturated-in-obs) for setup instructions.

## Preview

![SteamPunk preview 1](https://assets.subathonmanager.app/docs/widgets/steampunk/sp_preview.png)
![SteamPunk preview 2](https://assets.subathonmanager.app/docs/widgets/steampunk/sp_preview2.png)

---

## Timer

A lightweight, customizable nixie-tube themed timer. On pause, tubes dim. On lock, tubes appear cracked and colons are replaced with lock icons. Tubes are mostly transparent by default - keep this in mind when compositing overlays. Each digit change triggers a subtle flicker effect.

<video controls style="width:100%;border-radius:8px;margin:1rem 0">
  <source src="https://assets.subathonmanager.app/docs/widgets/steampunk/sp_timer.webm">
</video>

=== "CSS Variables"

    | Variable | Description |
    |---|---|
    | `digit-color` | Digit text colour |
    | `digit-glow-color` | Digit glow colour |
    | `colon-color` | Colon separator colour |
    | `colon-glow-color` | Colon glow colour |
    | `tube-width` | Width of each tube |
    | `tube-height` | Height of each tube |
    | `digit-size` | Font size of digits |
    | `gap-digit` | Gap between digits within a tube group |
    | `gap-colon` | Gap around colons |
    | `gap-tube-group` | Gap between tube groups |
    | `alignment` | `left`, `center`, or `right` |
    | `tube-bg` | Tube background colour |
    | `tube-border` | Tube border colour |
    | `tube-inner-glow` | Inner glow colour |
    | `tube-inner-glow-strong` | Strong inner glow colour |
    | `tube-outer-glow` | Outer glow colour |
    | `tube-outer-glow-strong` | Strong outer glow colour |
    | `tube-wire-light` | Light wire colour |
    | `tube-wire-dark` | Dark wire colour |
    | `tube-outer-glow-max-size` | Maximum outer glow size. Also adjusts edge padding to prevent glow clipping. |

=== "JS Variables"

    None

---

## Points

A lightweight, customizable nixie-tube themed points counter. Shares the same tube behaviour as the Timer - dims on pause, cracks on lock, and flickers on digit change. Tubes are mostly transparent by default.

<video controls style="width:100%;border-radius:8px;margin:1rem 0">
  <source src="https://assets.subathonmanager.app/docs/widgets/steampunk/sp_points.webm">
</video>

=== "CSS Variables"

    | Variable | Description |
    |---|---|
    | `digit-color` | Digit text colour |
    | `digit-glow-color` | Digit glow colour |
    | `digit-size` | Font size of digits |
    | `gap-digit` | Gap between digits |
    | `tube-width` | Width of each tube |
    | `tube-height` | Height of each tube |
    | `tube-bg` | Tube background colour |
    | `tube-border` | Tube border colour |
    | `tube-inner-glow` | Inner glow colour |
    | `tube-inner-glow-strong` | Strong inner glow colour |
    | `tube-outer-glow` | Outer glow colour |
    | `tube-outer-glow-strong` | Strong outer glow colour |
    | `tube-wire-light` | Light wire colour |
    | `tube-wire-dark` | Dark wire colour |
    | `alignment` | `left`, `center`, or `right` |
    | `tube-outer-glow-max-size` | Maximum outer glow size. Also adjusts edge padding to prevent glow clipping. |

=== "JS Variables"

    | Variable | Type | Description |
    |---|---|---|
    | `useForMoney` | Boolean | If `true`, displays the rounded money sum in the primary currency instead of points |

---

## Multiplier

A small indicator box with two lights showing whether the multiplier is active for points, time, or both. A steel plate in the centre displays the current multiplier value. When a duration is set, a gauge bar shows remaining time - if no duration is set, the gauge stays full.

<video controls style="height:70%;border-radius:8px;margin:1rem 0">
  <source src="https://assets.subathonmanager.app/docs/widgets/steampunk/sp_mult.webm">
</video>

=== "CSS Variables"

    | Variable | Description |
    |---|---|
    | `light-color` | Indicator light colour |
    | `background-color` | Widget background colour |
    | `border-color` | Border colour |
    | `border-thickness` | Border thickness |
    | `width` | Widget width |
    | `font-size` | Primary font size |
    | `small-font-size` | Secondary font size |
    | `font-family` | Font family |
    | `font-color` | Text colour |
    | `light-size` | Size of the indicator lights |
    | `gauge-thickness` | Thickness of the duration gauge bar |
    | `alignment` | `left`, `center`, or `right` |

=== "JS Variables"

    None

---

## Event

A card/plate displaying the most recent event. Multiple events are queued and each displays for a short period. An embossed icon represents the event type, and a steel plate shows the triggering user with details below.

<video controls style="width:100%;border-radius:8px;margin:1rem 0">
  <source src="https://assets.subathonmanager.app/docs/widgets/steampunk/sp_events.webm">
</video>

=== "CSS Variables"

    | Variable | Description |
    |---|---|
    | `background-color` | Widget background colour |
    | `border-color` | Border colour |
    | `border-thickness` | Border thickness |
    | `font-size` | Primary font size |
    | `small-font-size` | Secondary font size |
    | `font-family` | Font family |
    | `text-color` | Text colour |
    | `event-width` | Width of the event card |

=== "JS Variables"

    | Variable | Type | Description |
    |---|---|---|
    | `applicableEvents` | [`EventTypeList`](../../Structure.md#js-variable-injection) | Which event types to display |

---

## Goals

A vertical list of upcoming goals showing their points value and description text. Optionally shows the most recently completed goal at the top, faded.

![Goals preview](https://assets.subathonmanager.app/docs/widgets/steampunk/sp_goals.png)

=== "CSS Variables"

    | Variable | Description |
    |---|---|
    | `goal-height` | Height of each goal row |
    | `goal-gap` | Gap between goal rows |
    | `alignment` | `left`, `center`, or `right` |
    | `background-color` | Widget background colour |
    | `border-color` | Border colour |
    | `border-thickness` | Border thickness |
    | `font-size` | Primary font size |
    | `small-font-size` | Secondary font size |
    | `font-family` | Font family |
    | `font-color` | Text colour |

=== "JS Variables"

    | Variable | Type | Description |
    |---|---|---|
    | `showLastCompleted` | Boolean | Show the last completed goal at the top, faded |
    | `maxGoalsToShow` | Int | Maximum number of goals to display, including the optional last completed |


---

## Prompt

A steampunk engine-like popup displaying the currently running prompt goal. Two gears spin as the goal progresses, the engine gets hotter, and when complete, the light comes on. If it fails, smoke comes out.

<video controls style="width:80%;border-radius:8px;margin:1rem 0">
  <source src="https://assets.subathonmanager.app/docs/widgets/steampunk/steampunkprompt.webm">
</video>

=== "CSS Variables"

    | Variable | Description |
    |---|---|
    | `background-color` | Widget background colour |
    | `border-color` | Border colour |
    | `border-thickness` | Border thickness |
    | `metal-dark` | Dark metal colour |
    | `metal-mid` | Mid metal colour |
    | `metal-light` | Light metal colour |
    | `text-color` | Text colour |
    | `dim-text` | Dimmed text / secondary text colour |
    | `label-color` | Label colour |
    | `light-idle` | Light Idle colour |
    | `light-active` | Light Active colour |
    | `light-complete` | Light completed colour |
    | `light-expired` | Light colour when expired |
    | `glow-complete` | Completed glow colour |
    | `ember-color` | Progress ember colour |
    | `grill-color` | Grill colour |
    | `font-family` | Font family |
    | `font-size` | Primary font size |
    | `small-font-size` | Secondary font size |
    | `timer-font-size` | Timer font size |
    | `cog-fill` | Cog colour |
    | `cog-mid` | Cog Mid colour |
    | `cog-edge` | Cog Edge colour |
    | `cog-edge-light` | Lighter cog edge colour |
    | `cog-hole` | Cog hole colour |
    | `cog-shadow` | Cog shadow colour |

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

A steampunk cog-styled spinning wheel. Slices are rendered with alternating panel colours and item labels. A nameplate with a result shows after a spin is triggered. The hub at the centre displays spins owed.

<video controls style="width:80%;border-radius:8px;margin:1rem 0">
  <source src="https://assets.subathonmanager.app/docs/widgets/steampunk/sp_wheel.webm">
</video>

=== "CSS Variables"

    | Variable | Description |
    |---|---|
    | `wheel-size` | Total widget size (width and height) |
    | `background-color` | Widget background (transparent by default) |
    | `cog-fill` | Cog body / spoke fill colour |
    | `cog-mid` | Cog inner ring colour |
    | `cog-edge` | Cog tooth / rim stroke colour |
    | `cog-edge-light` | Cog edge highlight colour |
    | `cog-hole` | Cog centre hole colour |
    | `text-color` | Wheel item label text colour |
    | `label-color` | Small caption text colour (SPINS label, RESULT header) |
    | `font-family` | CSS font-family for all widget text |
    | `nameplate-bg` | Result nameplate background colour |
    | `nameplate-border` | Result nameplate border / rivet colour |
    | `nameplate-text` | Result nameplate item text colour |
    | `needle-color` | Gauge needle colour (red by default) |
    | `hub-bg` | Centre hub background colour |
    | `hub-text` | Centre hub spins-owed number colour |
    | `hub-label-size` | Font size for the SPINS label above the spins counter |
    | `hub-count-size` | Font size for the spins counter number |
    | `slice-text-size` | Base font size for wheel item text on slices |
    | `panelColor1` | Background colour for wheel item sections (1 of 8 options)|
    | `panelColor2` | Background colour for wheel item sections |
    | `panelColor3` | Background colour for wheel item sections |
    | `panelColor4` | Background colour for wheel item sections |
    | `panelColor5` | Background colour for wheel item sections |
    | `panelColor6` | Background colour for wheel item sections |
    | `panelColor7` | Background colour for wheel item sections |
    | `panelColor8` | Background colour for wheel item sections |

=== "JS Variables"

    | Variable | Type | Description |
    |---|---|---|
    | `partitionType` | StringSelect | Visually partition wheel sections by relative `Weight`, or `Equal` size for each item regardless of weight |
    | `playTickSound` | Boolean | Play a tick sound while the wheel is spinning |
    | `tickSound` | SoundFile | Sound to play as a tick while the wheel spins |
    | `tickSoundVolume` | Percent | Tick sound volume |
    | `showSpinsOwed` | Boolean | Show the count of spins remaining in the centre hub |
