# Event Alerts

[:fontawesome-brands-github: View Source](#TODO){ .md-button } &nbsp;&nbsp;
**Author:** [WolfwithSword](https://github.com/WolfwithSword)

A generic event alerts widget for all event types, with per-type colour customization, entrance and exit animations, and configurable filtering. For compatible store order events, displays the store logo instead of a generic shopping cart icon.

<video controls style="width:100%;border-radius:8px;margin:1rem 0">
  <source src="https://assets.subathonmanager.app/docs/widgets/single/event-alerts.webm">
</video>

---

## Configuration

### CSS Variables

=== "Colours"

    | Variable | Description |
    |---|---|
    | `accent` | Default accent colour when no event-specific colour matches |
    | `accent-glow-opacity` | Opacity of the accent glow effect. Set to `0` to disable. |
    | `dropshadow-opacity` | Opacity of the drop shadow. Set to `0` to disable. |
    | `bg` | Background colour |
    | `text-primary` | Colour for the username or store name |
    | `text-secondary` | Colour for the event detail text |

=== "Per-Event Colours"

    | Variable | Event |
    |---|---|
    | `sub-color` | Subs & memberships |
    | `giftsub-color` | Gift subs & gift memberships |
    | `token-color` | Bits, beets & tokens |
    | `donation-color` | Donations & tips |
    | `follow-color` | Follows |
    | `raid-color` | Raids |
    | `order-color` | Store orders |
    | `hypetrain-color` | Hype trains |

=== "Layout"

    | Variable | Description |
    |---|---|
    | `font-display` | Font for the header/event name |
    | `font-body` | Font for the primary and secondary text |
    | `alert-width` | Width of the alert popup |
    | `border-thickness` | Border thickness |

### JS Variables

=== "Display"

    | Variable | Type | Description |
    |---|---|---|
    | `displaySeconds` | Float | How many seconds to display each alert |
    | `minDonationAmount` | Float | Minimum donation amount to trigger an alert. Does not account for currency conversion. |
    | `minTokensAmount` | Int | Minimum token/bits amount to trigger an alert |
    | `minRaidersAmount` | Int | Minimum raider count to trigger an alert |

=== "Animation"

    | Variable | Type | Description |
    |---|---|---|
    | `animationDirection` | StringSelect | Entrance animation direction |
    | `animationStyle` | StringSelect | Entrance animation style |
    | `exitAnimationDirection` | StringSelect | Exit animation direction |
    | `exitAnimationStyle` | StringSelect | Exit animation style |

=== "Sounds"

    | Variable | Type | Description |
    |---|---|---|
    | `followSound` | SoundFile | Sound for follow events |
    | `followVolume` | Float | Volume for follow sound |
    | `subSound` | SoundFile | Sound for sub events |
    | `subVolume` | Float | Volume for sub sound |
    | `giftSubSound` | SoundFile | Sound for gift sub events |
    | `giftSubVolume` | Float | Volume for gift sub sound |
    | `tokenSound` | SoundFile | Sound for bits/token events |
    | `tokenVolume` | Float | Volume for token sound |
    | `raidSound` | SoundFile | Sound for raid events |
    | `raidVolume` | Float | Volume for raid sound |
    | `donationSound` | SoundFile | Sound for donation events |
    | `donationVolume` | Float | Volume for donation sound |
    | `trainSound` | SoundFile | Sound for hype train events |
    | `trainVolume` | Float | Volume for hype train sound |
    | `orderSound` | SoundFile | Sound for order events |
    | `orderVolume` | Float | Volume for order sound |