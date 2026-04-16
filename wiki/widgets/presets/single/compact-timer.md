# Compact Timer

[:fontawesome-brands-github: View Source](https://github.com/WolfwithSword/SubathonManager/tree/main/presets/generic/compact){ .md-button } &nbsp;&nbsp;
**Author:** [WolfwithSword](https://github.com/WolfwithSword)

A compact subathon timer showing the countdown, configurable stats, and the next upcoming goal. Stats can display points, subs, bits, followers, and total money donated - each filterable by event type, with offset support and fully custom labels. Icons are optional.

<video controls style="width:100%;border-radius:8px;margin:1rem 0">
  <source src="https://assets.subathonmanager.app/docs/widgets/single/compact-timer.webm">
</video>

---

## Configuration

### CSS Variables

=== "Timer"

    | Variable | Description |
    |---|---|
    | `timer-color` | Timer text colour |
    | `timer-font` | Timer font family |
    | `timer-font-size` | Timer font size |
    | `timer-outline-color` | Timer text outline colour |
    | `timer-outline-width` | Timer text outline width |
    | `timer-paused-opacity` | Opacity when the timer is paused |
    | `timer-lock-color` | Colour when the timer is locked |
    | `timer-alignment` | Timer text alignment |

=== "Stats"

    | Variable | Description |
    |---|---|
    | `stats-color` | Stats value text colour |
    | `stats-font` | Stats font family |
    | `stats-font-size` | Stats font size |
    | `stats-label-color` | Stats label colour |
    | `stats-outline-color` | Stats text outline colour |
    | `stats-outline-width` | Stats text outline width |
    | `stats-gap` | Gap between stat items |
    | `stats-icon-color` | Icon colour |
    | `stats-alignment` | Stats text alignment |

=== "Goal"

    | Variable | Description |
    |---|---|
    | `goal-color` | Goal text colour |
    | `goal-font` | Goal font family |
    | `goal-font-size` | Goal font size |
    | `goal-outline-color` | Goal text outline colour |
    | `goal-outline-width` | Goal text outline width |
    | `goal-arrow-color` | Colour of the goal arrow indicator |
    | `goal-alignment` | Goal text alignment |

=== "Layout"

    | Variable | Description |
    |---|---|
    | `section-gap` | Gap between the timer, stats, and goal sections |

### JS Variables

| Variable | Type | Description |
|---|---|---|
| `showIcons` | Boolean | Show icons alongside stat values |
| `includeSimulated` | Boolean | Include simulated/test events in stat counts |
| `showSubs` | Boolean | Show subs/memberships stat |
| `subsLabel` | String | Label for the subs stat (e.g. `Members`) |
| `subEvents` | [`SubEventTypeList`](../../Structure.md#js-variable-injection) | EventTypes to count for subs |
| `subCountOffset` | Int | Offset to add or subtract from the sub count |
| `showBitsTokens` | Boolean | Show bits/tokens stat |
| `tokensLabel` | String | Label for the bits/tokens stat |
| `tokenEvents` | [`TokenEventTypeList`](../../Structure.md#js-variable-injection) | EventTypes to count for tokens |
| `tokensCountOffset` | Int | Offset to add or subtract from the token count |
| `showFollows` | Boolean | Show follows stat |
| `followsLabel` | String | Label for the follows stat |
| `followEvents` | [`FollowEventTypeList`](../../Structure.md#js-variable-injection) | EventTypes to count for follows |
| `followCountOffset` | Int | Offset to add or subtract from the follow count |
| `showTotalDonated` | Boolean | Show total donated stat |
| `donatedLabel` | String | Label for the donated stat |
| `donatedOffset` | Float | Offset to add or subtract from the donated total |
| `showPoints` | Boolean | Show points stat |
| `pointsLabel` | String | Label for the points stat |
| `pointsOffset` | Int | Offset to add or subtract from the points total |