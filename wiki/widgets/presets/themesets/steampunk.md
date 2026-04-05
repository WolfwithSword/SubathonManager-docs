# SteamPunk

[:fontawesome-brands-github: View Source](https://github.com/WolfwithSword/SubathonManager/tree/main/presets/steampunk){ .md-button } &nbsp;&nbsp;
**Author:** [WolfwithSword](https://github.com/WolfwithSword)

A full nixie-tube steampunk themed overlay collection.

!!! warning "OBS Requirement"
    This preset requires a specific OBS browser source fix to render correctly. See [Widgets are faded/grey/desaturated in OBS](../../../widgets/troubleshooting/Troubleshooting.md#widgets-are-faded-grey-desaturated-in-obs) for setup instructions.

## Preview

![SteamPunk preview 1](https://github.com/user-attachments/assets/590fec6e-7fab-4275-931f-f9b2fd6f0d5a)
![SteamPunk preview 2](https://github.com/user-attachments/assets/9ff7f48f-51d2-4968-b3c9-5052755919a9)

---

## Timer

A lightweight, customizable nixie-tube themed timer. On pause, tubes dim. On lock, tubes appear cracked and colons are replaced with lock icons. Tubes are mostly transparent by default - keep this in mind when compositing overlays. Each digit change triggers a subtle flicker effect.

<video controls style="width:100%;border-radius:8px;margin:1rem 0">
  <source src="https://github.com/user-attachments/assets/67a6f765-fb03-4e8a-84c2-b9c5cddb556e">
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
  <source src="https://github.com/user-attachments/assets/c8f423d2-4ae2-4f55-8905-d0b23c58615e">
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

<video controls style="width:100%;border-radius:8px;margin:1rem 0">
  <source src="https://github.com/user-attachments/assets/f17171e0-645e-4886-b48e-3acd39fd771b">
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
  <source src="https://github.com/user-attachments/assets/ee86f6e5-787f-4f84-995c-b3c65aed81d1">
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

![Goals preview](https://github.com/user-attachments/assets/09e0fcc9-9a46-4e56-b67e-f0948b77209e)

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