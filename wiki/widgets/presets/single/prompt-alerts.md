---
description: A prompt goal alert overlay widget for SubathonManager
---

# Prompt Alerts

[:fontawesome-brands-github: View Source](https://github.com/WolfwithSword/SubathonManager/tree/main/presets/popups/alert){ .md-button } &nbsp;&nbsp;
**Author:** [WolfwithSword](https://github.com/WolfwithSword)

A generic alert widget for prompt goals, with entrance and exit animations, and other configuration.

![alert](https://assets.subathonmanager.app/docs/widgets/single/prompt-alert.png)

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

=== "Per-Status Colours"

    | Variable | Status |
    |---|---|
    | `active-color` | Active |
    | `complete-color` | Complete |
    | `expired-color` | Expired, Cancelled |

=== "Layout"

    | Variable | Description |
    |---|---|
    | `font-display` | Font for the header/event name |
    | `font-body` | Font for the primary and secondary text |
    | `prompt-width` | Width of the alert popup |
    | `border-thickness` | Border thickness |

### JS Variables

=== "Display"

    | Variable | Type | Description |
    |---|---|---|
    | `lingerSeconds` | Float | How many seconds to display each alert |

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
    | `startedSound` | SoundFile | Sound for when a prompt starts |
    | `startedSoundVolume` | Float | Volume for started sound |
    | `successSound` | SoundFile | Sound for when a prompt completes |
    | `successSoundVolume` | Float | Volume for success sound |
    | `failSound` | SoundFile | Sound for when a prompt ends in failure |
    | `failSoundVolume` | Float | Volume for fail sound |