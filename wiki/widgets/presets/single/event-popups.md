# Event Value Popups

[:fontawesome-brands-github: View Source](https://github.com/WolfwithSword/SubathonManager/blob/main/presets/popups/event-popups.html){ .md-button } &nbsp;&nbsp;
**Author:** [WolfwithSword](https://github.com/WolfwithSword)

An overlay for displaying animated values from events. You can customize it a variety of ways, such as which events, which values, colours, and animation style.

<video controls style="width:100%;border-radius:8px;margin:1rem 0">
  <source src="https://github.com/user-attachments/assets/5d24b53d-d4cf-49d5-bee8-1cf846599ecf">
</video>

---

## Configuration

### CSS Variables

| Variable | Description |
|---|---|
| `positive-time-color` | Colour for time additions |
| `negative-time-color` | Colour for time reductions (reverse subathons) |
| `points-color` | Colour for points values |
| `money-color` | Colour for money values |
| `font` | Font family |
| `font-size` | Base font size |

### JS Variables

| Variable | Type | Description |
|---|---|---|
| `applicableEvents` | [`EventTypeList`](https://github.com/WolfwithSword/SubathonManager/blob/main/SubathonManager.Core/Enums/SubathonEventType.cs) | Which events trigger a popup |
| `showSeconds` | Boolean | Show seconds added/removed |
| `showPoints` | Boolean | Show points added |
| `showMoney` | Boolean | Show the money value in its original currency. Twitch Cheers display as bits. |
| `animation` | StringSelect | Popup animation style: `float-up`, `float-down`, `popup` |
| `groupGifts` | Boolean | If `true`, gift subs/memberships are grouped and show combined points/seconds. If `false`, each gift is shown individually. |