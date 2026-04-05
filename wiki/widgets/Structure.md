---
title: Widget Structure
description: Details for how custom widgets are structured
---

When imported into SubathonManager, only a single `.html` file is imported. Any relative imports to media files, `.css`, or `.js` files will resolve correctly.

For required functions and anything important script-wise, it is recommended to embed them in `<script>` tags in the HTML file so they are loaded properly.

HTML files do not need to be fully document-valid, but must still be valid HTML.

You can import any scripts, CSS, fonts, etc you want - but **only local CSS files** will be scanned for variables.

!!! info
    Script variable injection overrides are not yet supported but are planned.

---

## Metadata

In your widget's HTML file, you can define metadata at the top to pre-configure values.

```html
<!--
WIDGET_META
Width:520
Height:130
Url:https://example.com
END_WIDGET_META
-->
```

`Width` and `Height` pre-set the widget dimensions. `Url` appears as a clickable documentation button in the editor. Any other keys are ignored by the app but can serve as inline notes.

### CSS Metadata

For any CSS files with configurable variables (see [CSS](#css)), you can create a sidecar metadata file with the same filename suffixed with `.json`.

```
events.styles.css  →  events.styles.css.json
```

This lets you define a `type` and `description` for any variable:

```css
:root {
  --background-color: rgba(255,255,255,1);
}
```

```json
{
  "background-color": { "type": "color", "description": "The background color" }
}
```

- **`description`** - shown as a tooltip in the widget editor.
- **`type`** - enables a specific editing control (color picker, slider, dropdown, etc).

Without a metadata file, all unknown variables are treated as plain string inputs. Valid types include `Color`, `Size`, `Opacity`, `String`, `Int`, `Float`, `Alignment`, and more - see [WidgetVariableType](../Design.md#enums) or [source](https://github.com/WolfwithSword/SubathonManager/blob/main/SubathonManager.Core/Enums/WidgetVariableType.cs) for the full list.

| Type | UI Control |
|---|---|
| `Color` | Color picker |
| `Opacity` | Slider from 0 to 1 |
| `Size` | Float + size unit selector |
| `Alignment` | Dropdown: `left`, `right`, `center` |
| `String` | Text input (default for unknown types) |
| `Int` / `Float` | Numeric input |

### JS Variable Injection

You can also inject JavaScript variables directly from widget metadata. Any metadata key containing a single `.` is parsed as `<variable_name>.<variable_type>`.

**Rules:**

- Valid entries are injected as `const` declarations at the start of each widget.
- Lines starting with `//` or a special character/symbol are ignored (useful for commenting out entries).
- `NONE` as a value becomes an empty string (not applicable for `EventTypeList`).
- If a `Float` or `Int` fails to validate, it falls back to `String`. Any unsupported type also falls back to `String`.

**Available types:**

| Type | Description |
|---|---|
| `String` | Plain text input |
| `Int` | Integer input |
| `Float` | Float input |
| `Boolean` | Checkbox in the UI |
| `Percent` | Integer clamped 0–100 |
| `StringList` | Comma-separated list of strings |
| `StringSelect` | Comma-separated options; user selects one. Defaults to first item. |
| `EventTypeList` | Comma-separated [SubathonEventType](https://github.com/WolfwithSword/SubathonManager/tree/main/SubathonManager.Core/Enums/SubathonEventType.cs) values - selected via checkboxes. See [Enums](../Design.md#enums). |
| `EventTypeSelect` | Single EventType selection, limited to those with configurable time/points values |
| `EventSubTypeList` | Comma-separated [SubathonEventSubType](https://github.com/WolfwithSword/SubathonManager/tree/main/SubathonManager.Core/Enums/SubathonEventSubType.cs) values - selected via checkboxes. See [Enums](../Design.md#enums). |
| `EventSubTypeSelect` | Single EventSubType selection |
| `AnyFile` / `ImageFile` / `SoundFile` / `VideoFile` | Injects a path string. Value is empty, an absolute system path (prefixed `externalPath/`), or a relative path from the widget. Use `NONE` for empty default. Do not use absolute paths in shared widgets. |
| `FolderPath` | Folder path string |
| `OrderEventTypeList` / `TokenEventTypeList` / `SubEventTypeList` / `FollowEventTypeList` / `DonationEventTypeList` | Pre-filtered `EventTypeList` by subtype category |

??? example "Full metadata example"

    ```html
    <!--
    WIDGET_META
    Width:520
    Height:130
    applicableEvents.EventTypeList:TwitchSub,TwitchGiftSub,TwitchCheer
    //applicableEvents.EventSubTypeList:SubLike,GiftSubLike,TokenLike
    pointsName.String:subpoints
    secondsToDisplay.Int:5
    //test.String:Hello World
    #test2.Float:-4.5
    showCompleted.Boolean:True
    mySelect.StringSelect:Seconds,Points
    myEvent.EventTypeSelect:NONE
    dinkDonk.SoundFile:./dinkdonk.mp3
    END_WIDGET_META
    -->
    ```

    Produces:

    ```html
    <script>
      const applicableEvents = ["TwitchSub", "TwitchGiftSub", "TwitchCheer"];
      const pointsName = "subpoints";
      const secondsToDisplay = 5;
      const showCompleted = true;
      const mySelect = "Seconds";
      const myEvent = ""; // May be selected in UI, e.g. "TwitchSub"
      const dinkDonk = "./dinkdonk.mp3";
    </script>
    ```

    Note: `//applicableEvents.EventSubTypeList` and `#test2.Float` are ignored (commented out / special character prefix).

---

## CSS

Define CSS variables in a `:root` block in your stylesheet. All CSS variables can be configured and overridden via the widget editor UI without modifying the raw files.

```css
:root {
    --main-background-color: #cecece;
    --text-size: 16px;
}
```

---
