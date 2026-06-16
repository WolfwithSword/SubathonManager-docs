# Wheel Slots

[:fontawesome-brands-github: View Source](https://github.com/WolfwithSword/SubathonManager/tree/main/presets/generic/wheelslots){ .md-button } &nbsp;&nbsp;
**Author:** [WolfwithSword](https://github.com/WolfwithSword)

A slot machine-style wheelspin widget. Wheel items scroll through a round drum, landing on the selected result. The winning item is displayed on an LCD screen panel at the top, otherwise the spins owed remaining is shown.

<video controls style="width:80%;border-radius:8px;margin:1rem 0">
  <source src="https://assets.subathonmanager.app/docs/widgets/single/wheelslots.webm">
</video>

---

## Configuration

### CSS Variables

=== "Sizing"

    | Variable | Description |
    |---|---|
    | `slot-width` | Widget width |
    | `slot-height` | Widget height |
    | `item-height` | Height of each slot row; the drum window is always 3x this value |
    | `shell-wall` | Width of the left/right housing panels flanking the drum |
    | `hub-label-size` | Font size for the SPINS label |
    | `hub-count-size` | Font size for the spins counter number |
    | `slot-text-size` | Font size for item text inside each slot row |
    | `result-text-size` | Starting font size for the result text (auto-shrinks to fit) |
    | `lcd-max-height` | Maximum height of the LCD screen area; result text wraps then shrinks to fit |

=== "Colours"

    | Variable | Description |
    |---|---|
    | `text-color` | Slot item text and hub label colour |
    | `border-color` | Shell outer border and divider colour |
    | `shell-bg` | Housing panel background colour (side walls and shell frame) |
    | `drum-bg` | Inner machine box colour, visible at drum edges and through the top/bottom fade |
    | `drum-surface` | Drum cylinder surface colour; the light body the coloured panels sit on |
    | `center-line-color` | Colour of the lines framing the selected centre slot |
    | `needle-color` | Colour of the inward-pointing indicator needles |
    | `hub-bg` | Spins counter pill background colour |
    | `hub-text` | Spins counter number colour |
    | `lcd-bg` | LCD top panel background colour |
    | `lcd-text` | Result text colour (also drives the text glow) |

=== "Panel Colours"

    | Variable | Description |
    |---|---|
    | `panelColor1` | Slot item background colour (1 of 8 options) |
    | `panelColor2` | Slot item background colour |
    | `panelColor3` | Slot item background colour |
    | `panelColor4` | Slot item background colour |
    | `panelColor5` | Slot item background colour |
    | `panelColor6` | Slot item background colour |
    | `panelColor7` | Slot item background colour |
    | `panelColor8` | Slot item background colour |

### JS Variables

| Variable | Type | Description |
|---|---|---|
| `playTickSound` | Boolean | Play a tick sound as items scroll |
| `tickSound` | SoundFile | Sound to play as each slot item scrolls past |
| `tickSoundVolume` | Percent | Tick sound volume |
| `showSpinsOwed` | Boolean | Show the count of spins remaining in the counter pill |
