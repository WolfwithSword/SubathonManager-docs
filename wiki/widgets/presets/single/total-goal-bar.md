# Totals Goal Bar

[:fontawesome-brands-github: View Source](https://github.com/WolfwithSword/SubathonManager/blob/main/presets/generic/totals-goal-bar.html){ .md-button } &nbsp;&nbsp;
**Author:** [WolfwithSword](https://github.com/WolfwithSword)

Very similar to the goal-bar, this allows you to configure tracking the count (or sum) of a specific event type towards a configurable, custom goal.

For example, number of items sold via GamerSupps.

![Preview](https://assets.subathonmanager.app/docs/widgets/single/totals-goal-bar-preview.png)

---

## Configuration

### CSS Variables

| Variable | Description |
|---|---|
| `bar-height` | Height of the progress bar |
| `font-family` | Font family |
| `font-size` | Font size |
| `font-color` | Text colour |
| `bar-bg-color` | Background (unfilled) colour of the bar |
| `bar-fg-color` | Foreground (filled) colour of the bar |
| `bar-border-radius` | Border radius of the bar |

### JS Variables

| Variable | Type | Description |
|---|---|---|
| `eventGroup` | EventSubTypeSelect | Which subtype does your event belong to? This must match properly or your count will be 0 |
| `eventType` | EventTypeSelect | Which event type do you want to count? Must belong to the subtype group selected. |
| `eventCountType` | StringSelect | `Count` or `Sum` - For OrderLike events, `Sum` will count number of items sold. For all others, or when set to `Count`, will be the number of those events which have taken place. |
| `includeSimulated` | Boolean | Include simulated events or not in the counts.
| `valuePrefix` | String | Text to prepend to the displayed value |
| `valueSuffix` | String | Text to append to the displayed value |
| `formatWithCommas` | Boolean | Format large numbers with comma separators |
| `goalOffset` | Int | Offset the current count of the total by a certain amount, +- |
| `goalMax` | Int | The max value to use for the goal bar |
| `goalText` | String | The label you want for the goal bar. Set empty to display nothing |