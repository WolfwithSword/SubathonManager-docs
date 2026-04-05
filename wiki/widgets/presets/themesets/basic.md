# Basic Theme

[:fontawesome-brands-github: View Source](https://github.com/WolfwithSword/SubathonManager/tree/main/presets/basic){ .md-button } &nbsp;&nbsp;
**Author:** [WolfwithSword](https://github.com/WolfwithSword)

A clean, no-frills overlay collection focused on simplicity.

## Previews

![Basic preview 1](https://github.com/user-attachments/assets/cb44f4f5-36c3-40a4-8a33-14bb18d52c29)
![Basic preview 2](https://github.com/user-attachments/assets/4c38c9f9-22e6-419f-89a6-e889f6712710)

---

## Timer

A simplistic timer. Fades gray when paused, and displays a bar across it when locked.

<video controls style="width:100%;border-radius:8px;margin:1rem 0">
  <source src="https://github.com/user-attachments/assets/5e44baff-c303-41c5-be7f-ac0c82867c32">
</video>

=== "CSS Variables"

    | Variable | Description |
    |---|---|
    | `font` | Font family |
    | `text-color` | Text colour |
    | `outline-color` | Text outline colour |
    | `outline-width` | Text outline width |
    | `size-big-numbers` | Font size for the primary time digits |
    | `size-small-numbers` | Font size for the secondary time digits |
    | `alignment` | `left`, `center`, or `right` |

=== "JS Variables"

    None

---

## Points

A simple points display. Crossed out when locked, similar to the Timer.

<video controls style="width:100%;border-radius:8px;margin:1rem 0">
  <source src="https://github.com/user-attachments/assets/45465253-c1aa-4eae-9340-d60eb404cd77">
</video>

=== "CSS Variables"

    | Variable | Description |
    |---|---|
    | `font` | Font family |
    | `text-color` | Text colour |
    | `outline-color` | Text outline colour |
    | `outline-width` | Text outline width |
    | `font-size` | Font size |
    | `suffix-size` | Font size of the suffix label |
    | `alignment` | `left`, `center`, or `right` |

=== "JS Variables"

    | Variable | Type | Description |
    |---|---|---|
    | `useForMoney` | Boolean | If `true`, displays the rounded money sum in the primary currency instead of points |
    | `suffix` | String | Label shown after the value - e.g. `points`, `pts`, `subs`. Can be any text. If using for money, consider using your currency code. |

---

## Next Goal

A simple display for the next upcoming goal and its points value. Empty when no goals remain.

![Next Goal preview](https://github.com/user-attachments/assets/aab2259d-2eeb-49d1-bb4e-66c59e78dd9c)

=== "CSS Variables"

    | Variable | Description |
    |---|---|
    | `font` | Font family |
    | `text-color` | Text colour |
    | `outline-color` | Text outline colour |
    | `outline-width` | Text outline width |
    | `font-size` | Font size |
    | `alignment` | `left`, `center`, or `right` |

=== "JS Variables"

    None

---

## Multiplier

A simple display for the current multiplier - points, time, or both. Empty when no multiplier is active.

![Multiplier preview 1](https://github.com/user-attachments/assets/8c031a88-7edb-4e60-8acc-5f4207b5eea0)
![Multiplier preview 2](https://github.com/user-attachments/assets/26292d0b-6df9-4d10-9e39-a64ec5bb470f)

=== "CSS Variables"

    | Variable | Description |
    |---|---|
    | `font` | Font family |
    | `text-color` | Text colour |
    | `outline-color` | Text outline colour |
    | `outline-width` | Text outline width |
    | `font-size` | Font size |
    | `points-suffix` | Label for points - e.g. `points`, `pts`, `subs`. Can be any text. |
    | `alignment` | `left`, `center`, or `right` |

=== "JS Variables"

    None

---

## Event

A basic text display for the most recent event, showing the triggering user, an event type icon, value, amount, and more.

<video controls style="width:100%;border-radius:8px;margin:1rem 0">
  <source src="https://github.com/user-attachments/assets/124daebc-db6e-42bc-ad62-e8657ed30324">
</video>

=== "CSS Variables"

    | Variable | Description |
    |---|---|
    | `font` | Font family |
    | `text-color` | Text colour |
    | `font-size` | Font size |
    | `outline-color` | Text outline colour |
    | `outline-width` | Text outline width |
    | `icon-outline-width` | Icon outline width |
    | `icon-size` | Icon size |
    | `gap` | Gap between the icon and text |
    | `alignment` | `left`, `center`, or `right` |

=== "JS Variables"

    | Variable | Type | Description |
    |---|---|---|
    | `applicableEvents` | [`EventTypeList`](../../Structure.md#js-variable-injection) | Which event types to display |