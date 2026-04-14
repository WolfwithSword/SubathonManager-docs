# Goal Bar

[:fontawesome-brands-github: View Source](https://github.com/WolfwithSword/SubathonManager/blob/main/presets/generic/goal-bar.html){ .md-button } &nbsp;&nbsp;
**Author:** [WolfwithSword](https://github.com/WolfwithSword)

A very basic progress bar, allowing you to configure it to track your goals for either a subathon or donothon (Money/Points), and to override the max value or goal text if you choose.

![Goal Bar preview](https://assets.subathonmanager.app/docs/widgets/single/goal-bar.png)

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
| `goalType` | StringSelect | `Money` or `Points` - determines which value to track as the current progress |
| `valuePrefix` | String | Text to prepend to the displayed value |
| `valueSuffix` | String | Text to append to the displayed value |
| `formatWithCommas` | Boolean | Format large numbers with comma separators |
| `showDecimalsForMoney` | Boolean | Show decimal places when tracking money values |
| `overrideMax` | Boolean | If `true`, the max value is set manually rather than pulled from your goals list |
| `maxGoalOverride` | Int | The manual max value to use when `overrideMax` is enabled |
| `overrideGoalText` | Boolean | If `true`, replaces the current goal's text with a custom string |
| `goalTextOverride` | String | The custom goal text to display when `overrideGoalText` is enabled |