---
title: Widget Structure
description: Details for how custom widgets are structured
---

When imported into SubathonManager, only a single `.html` file is imported. Any relative imports to media files, `.css`, or `.js` files will resolve correctly, including configuration `.json` files.

For required functions and anything important script-wise, it is recommended to embed them in `<script>` tags in the HTML file so they are loaded properly.

HTML files do not need to be fully document-valid, but must still be valid HTML.

You can import any scripts, CSS, fonts, etc you want - but **only local CSS files** will be scanned for variables.

!!! info
    Script variable injection overrides are not yet supported but are planned.

---

## Metadata

You can define a widget's metadata, such as author, size, document and preconfigure JS Variables, and more, by creating a `.json` file associated with the widget.

```
cool-widget.html.css  ->  cool-widget.html.json
```

Priot to version `1.2.0`, metadata was defined within the html file as a header. Any legacy metadata such as this will automatically be converted by SubathonManager.


```json
{
  "Author": "WolfwithSword",
  "Url": "https://your.optional.custom/link/for/documentation",
  "Width": 500,
  "Height": 200,
  "Vars": {
    "myValue": {
      "Type": "EventSubTypeList",
      "Description": "Tooltip description",
      "Value": [
        "SubLike",
        "GiftSubLike",
        "DonationLike",
        "TokenLike",
        "OrderLike"
      ]
    },
    "myValue2": {
      "Name": "showSeconds",
      "Type": "Boolean",
      "Description": "Tooltip description",
      "Value": true,
    },
}
```

`Width` and `Height` pre-set the widget dimensions. `Url` appears as a clickable documentation button in the editor.

The `Author` field is for documentation purposes only internally, but may have a use in the future.

Under `Vars`, you can setup all JS variable or Font variable config you need for the widget, which will autopopulate within the overlay widget editor. See [JS Variable Injection](#js-variable-injection) for more details.

### CSS Metadata

For any CSS files with configurable variables (see [CSS](#css)), you can create a sidecar metadata file with the same filename suffixed with `.json`.

```
events.styles.css  ->  events.styles.css.json
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
| `Opacity` | Slider for 0-1.0 |
| `Weight` | Dropdown select for all valid CSS font weights |

### JS Variable Injection

You can inject JavaScript variables and fonts directly from widget metadata files. For each key, the key will be the variable name, and the value, type, and if applicable, options, will be assigned as the value.

**Rules:**

- Valid entries are injected as `const` declarations at the start of each widget.
- Values are expected to be of their associated type. i.e., Stirngs must be a string (or empty string). A list must be a list of items (such as strings).
- If a `Float`, `Int`, or any other non-list value fails to validate, it falls back to `String`. Any unsupported type also falls back to `String`.
- Options are applicable for a few selection based variables, such as `StringSelect`. The `Value` field will be the initial value, and a dropdown will be available limited to any values in the `Options` array.

Please look at the `.json` files for the preset widgets included for examples.

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
| `OrderEventTypeList` / `TokenEventTypeList` / `SubEventTypeList` / `FollowEventTypeList` / `DonationEventTypeList` / `GenericEventTypeList` | Pre-filtered `EventTypeList` by subtype category |
| `GoogleFont` / `CdnFont` | Comma separated strings of font-names to inject in the widget from Google or CDN, fetches as a url. |

??? example "Metadata example"

    ```json
    {
      "Author": "WolfwithSword",
      "Url": "",
      "Width": 520,
      "Height": 130,
      "Vars": {
        "applicableEvents": {
          "type": "EventTypeList",
          "Description": "Choose which events will be displayed",
          "value": [  // default ones, but user can change in UI
              "TwitchSub", "TwitchGiftSub",
              "TwitchCheer"
          ]
        },
        "pointsName": {
          "type": "String",
          "value": "subpoints"
        },
        "secondsToDisplay": {
          "type": "Int",
          "value": 5
        },
        "showCompleted": {
          "type": "Boolean",
          "value": true
        },
        "mySelect": {
          "Type": "StringSelect",
          "Description": "Select a string pls",
          "Value": "Seconds",
          "Options": [
            "Seconds",
            "Points"
          ]
        },
        "myEvent": {
          "type": "EventTypeSelect",
          "value": ""
        },
        "dinkDonk": {
          "type": "SoundFile",
          "value": "./dinkdonk.mp3"
        },
      }
    }
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

---

For `Font` type variables, it is recommended you only define one variable per type (one GoogleFont, one CdnFont etc) max. For the value, it is a comma separated list of font names to import automatically.

This works by using the base URLs for each font service, querying for the font name and injecting it into each widget.

If no font variables for a font type are defined, the UI will automatically add one *per type* with no values for the user to configure. As such, doing it via the `.json` file is simply to preselect fonts for the user.

These font names then become available to use, so you can refer to them in your associated CSS files.

## CSS

Define CSS variables in a `:root` block in your stylesheet. All CSS variables can be configured and overridden via the widget editor UI without modifying the raw files.

```css
:root {
    --main-background-color: #cecece;
    --text-size: 16px;
}
```

---
