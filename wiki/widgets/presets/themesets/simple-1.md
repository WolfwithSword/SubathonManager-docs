# Simple-1

[:fontawesome-brands-github: View Source](https://github.com/WolfwithSword/SubathonManager/tree/main/presets/simple-1){ .md-button } &nbsp;&nbsp;
**Author:** [WolfwithSword](https://github.com/WolfwithSword)

A clean, modern overlay collection.

!!! warning "OBS Requirement"
    This preset requires a specific OBS browser source fix to render correctly. See [Widgets are faded/grey/desaturated in OBS](../../../widgets/troubleshooting/Troubleshooting.md#widgets-are-faded-grey-desaturated-in-obs) for setup instructions.

## Previews

![Simple-1 preview 1](https://assets.subathonmanager.app/docs/widgets/simple-1/s1-preview.png)
![Simple-1 preview 2](https://assets.subathonmanager.app/docs/widgets/simple-1/s1-preview2.png)

---

## Timer

Displays hours, minutes, and seconds - hours are hidden when under 1 hour remains. Numbers animate top-down on change. When a time multiplier is active, it pops up in a circle on the right. A lock icon appears top-left when locked, and digits dim when paused.

<video controls style="width:100%;border-radius:8px;margin:1rem 0">
  <source src="https://assets.subathonmanager.app/docs/widgets/simple-1/s1-timer.webm">
</video>

=== "CSS Variables"

    | Variable | Description |
    |---|---|
    | `hours-color` | Hours digit colour |
    | `minutes-color` | Minutes digit colour |
    | `seconds-color` | Seconds digit colour |
    | `colon-color` | Colon separator colour |
    | `glow-color` | Glow effect colour |
    | `border-color` | Outer border colour |
    | `inner-border-color` | Inner border colour |
    | `main-background-color` | Widget background colour |
    | `font` | Font family |
    | `font-size` | Font size |
    | `lock-color` | Lock icon colour |
    | `multiplier-text-color` | Multiplier bubble text colour |

=== "JS Variables"

    None

---

## Event

Displays the most recent event. Multiple events are queued and each displays for a short period before swapping. The primary text shows the username, with the value, amount, and event type below. An icon on the right indicates the event type. On initial load, displays "Welcome!" with a heart.

!!! info
    When testing via the UI simulator, the user will always display as `SYSTEM`.

<video controls style="width:100%;border-radius:8px;margin:1rem 0">
  <source src="https://assets.subathonmanager.app/docs/widgets/simple-1/s1-event.webm">
</video>

=== "CSS Variables"

    | Variable | Description |
    |---|---|
    | `border-color` | Outer border colour |
    | `inner-border-color` | Inner border colour |
    | `main-background-color` | Widget background colour |
    | `font` | Font family |
    | `event-width` | Width of the event card |
    | `text-color` | Text colour |
    | `event-glow` | Event glow effect toggle/value |
    | `glow-color` | Glow effect colour |

=== "JS Variables"

    | Variable | Type | Description |
    |---|---|---|
    | `applicableEvents` | [`EventTypeList`](../../Structure.md#js-variable-injection) | Which event types to display |

---

## Progress

A progress bar showing the current points value against the goals max. Goal markers are shown on the bar for each upcoming goal relative to its position. Once full, only the filled bar and points value are shown. When the points multiplier is active, it appears in a circle in the bottom right.

<video controls style="width:100%;border-radius:8px;margin:1rem 0">
  <source src="https://assets.subathonmanager.app/docs/widgets/simple-1/s1-progress.webm">
</video>

=== "CSS Variables"

    | Variable | Description |
    |---|---|
    | `gradient-start` | Start colour of the progress bar fill |
    | `gradient-end` | End colour of the progress bar fill |
    | `text-color` | Text colour |
    | `font` | Font family |
    | `main-background-color` | Widget background colour |
    | `multiplier-text-color` | Multiplier bubble text colour |
    | `border-color` | Outer border colour |
    | `inner-border-color` | Inner border colour |

=== "JS Variables"

    | Variable | Type | Description |
    |---|---|---|
    | `pulseOnFull` | Boolean | Pulse the bar with an animation when points are at max |
    | `showMarkers` | Boolean | Show goal markers on the progress bar |
    | `useForMoney` | Boolean | If `true`, uses the rounded money sum in the primary currency instead of points. The multiplier bubble will not show when this is enabled. |

---

## Goals

A configurable list of upcoming goals showing their text description and points value. Optionally shows the last completed goal at the top, faded.

![Goals preview](https://assets.subathonmanager.app/docs/widgets/simple-1/s1-goals.png)

=== "CSS Variables"

    | Variable | Description |
    |---|---|
    | `border-color` | Outer border colour |
    | `inner-border-color` | Inner border colour |
    | `main-background-color` | Widget background colour |
    | `goal-text-color` | Goal text colour |
    | `goal-height` | Height of each goal row |
    | `goal-gap` | Gap between goal rows |
    | `visible-items` | Number of goals to show |

=== "JS Variables"

    | Variable | Type | Description |
    |---|---|---|
    | `showLastCompleted` | Boolean | Show the last completed goal at the top, faded |