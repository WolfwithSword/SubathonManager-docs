---
title: Import/Export
description: How to import and export custom overlays, widgets, and widget collections
---

SubathonManager uses three portable file formats. All three are plain zip archives with a JSON manifest at the root, so you can inspect or build them with any zip tool.

| Extension | Contains | Use |
|---|---|---|
| [`.smo`](#overlays-smo) | A whole overlay - every widget, file, and configured value | Share or back up a complete, ready-to-go overlay |
| [`.smw`](#widgets-smw) | A single packaged widget | Share one widget; installs into the [Widget Browser](../Usage.md#widget-browser) |
| [`.smwc`](#widget-collections-smwc) | Many `.smw` files bundled together | Install a whole theme set / preset pack in one go |

All three can be installed by **double-clicking** the file, which opens your latest install of SubathonManager and imports it. On Windows and Linux the app registers these associations on launch (see [Installation](../Installation.md#platforms)).

For developers, any of them can also be imported from the web using the custom protocol `subathonmanager://import?url=` followed by a link to the file.

---

## Overlays (`.smo`)

`.smo` files are zip files containing all the required files and structure needed for an overlay, and all preconfigured values.

This can be used as a backup system, migrating across systems, or sharing preconfigured layouts of overlays.

### Exporting

When exporting an overlay, you are given a chance to preview what the contents will look like. Please ensure all required files are included. Many unused files may be included as well, due to being in the same folders as used files, so please be aware of this.

The export dialog lets you set:

| Field | Description |
|---|---|
| **Export Name** | The overlay's name. Defaults to the current overlay name. |
| **Version** | The overlay's own version, e.g. `1.0.0`. |
| **Author** | Your name, used to namespace the overlay on import. |
| **Tags** | Comma-separated tags, e.g. `alerts, goals`. |

All configuration of each widget will be saved. The file can be found in the `exports` folder in the installation path.

Any widget in the overlay that came from a packaged `.smw` is embedded as that original `.smw` under `packs/<pack_id>/<version>.smw`, rather than being flattened into loose files. This keeps the widget's identity and version intact through the round trip.

### Importing

!!! info "New in 2.0.0 - versioned overlay imports"
    Overlays now import **with their version number**. The created overlay is named `<Name> v<Version>` (for example `Retro Pixel v1.2.0`), and the archive is stored per author, name, and version:

    ```
    imports/overlays/<author>/<overlay-name>/1.0.0.smo
    imports/overlays/<author>/<overlay-name>/1.2.0.smo
    imports/overlays/<author>/<overlay-name>/unpack/
    ```

    That means importing a newer version of an overlay you already have no longer overwrites the older one - both stay side by side, and you can keep using the old one while trying the new.

    Older `.smo` files without version information are treated as version `1.0.0`.

When importing a `.smo` file, it will instantly create a new overlay named after the export. It can be found in the `imports/overlays` folder of the installation path of Subathon Manager, and is isolated from all other overlays unless it was an existing one being overwritten.

Any embedded widget packs are installed into your Widget Browser as well, so they become available for use in your *other* overlays too.

You can also import via double-clicking a valid `.smo` file, as it will open your latest install of Subathon Manager and auto import. If you already had it imported, it will update any changed files.

### `.smo` structure

```
my-overlay.smo
├-- overlay.json           # manifest
├-- packs/                 # widgets that came from .smw packages
│   └-- wolfwithsword.generic.goal-bar/
│       └-- 2.0.0.smw
└-- <widget folders>/      # loose widget files (html, css, js, media)
```

---

## Widgets (`.smw`)

A `.smw` is a single packaged widget: one zip containing the widget's entry HTML file, everything it references, its metadata sidecars, and a `widget.json` manifest.

Packaged widgets are **loaded straight from the archive** rather than being extracted. Entries are read into memory on demand and cached, so small widgets never touch the disk. Large entries (big videos, sounds, images) are materialised into `cache/widgets/<pack>-<hash>/` on first use instead of being held in memory. That cache is disposable - it is swept automatically when packages are no longer referenced by any overlay, and rebuilt on demand.

### Structure

```
WolfwithSword_Generic_Goal-Bar.smw
├-- widget.json                  # manifest (required, must be at the archive root)
├-- preview.png                  # optional preview image
└-- content/
    ├-- goal-bar.html            # the entry file
    ├-- goal-bar.html.json       # widget metadata (author, size, JS vars)
    ├-- goal-bar.css
    └-- goal-bar.css.json        # CSS variable metadata
```

The folder layout inside the archive is up to you - only `widget.json` must be at the root, and `entry` must point at the widget's HTML file. See [Structure](Structure.md) for the metadata sidecar formats.

### `widget.json`

```json
{
  "version": "1",
  "app_version": "2.0.0",
  "exported_at": "2026-07-31T13:33:01.6959835Z",
  "widget": {
    "pack_id": "wolfwithsword.generic.goal-bar",
    "name": "Goal Bar",
    "author": "WolfwithSword",
    "group": "Generic",
    "widget_version": "2.0.0",
    "tags": ["goal", "points", "money", "goals", "custom"],
    "preview_image": "preview.png",
    "docsUrl": "https://docs.subathonmanager.app/latest/widgets/presets/single/goal-bar/",
    "type": "Html",
    "entry": "content/goal-bar.html",
    "size": { "width": 600, "height": 80 },
    "scale": { "x": 1, "y": 1 }
  }
}
```

| Field | Description |
|---|---|
| `version` | Manifest format version. Currently `"1"`. |
| `app_version` | The SubathonManager version the widget was built against. Informational. |
| `widget.pack_id` | Stable identity for the widget. If omitted it is generated as `<author>.<group>.<name>`, slugified. |
| `widget.name` | Display name in the Widget Browser. Falls back to the filename. |
| `widget.author` | Author name. Also used to namespace unpack folders. |
| `widget.group` | Theme set / grouping, e.g. `Generic`, `Retro Pixel`. Defaults to `widgets`. |
| `widget.widget_version` | The widget's own version, e.g. `2.0.0`. Defaults to `1.0.0`. |
| `widget.tags` | Array of strings, searchable in the Widget Browser. |
| `widget.preview_image` | Archive-relative path to a preview image shown on the browser card. |
| `widget.docsUrl` | Optional documentation link, surfaced as a button in the editor. |
| `widget.entry` | **Required.** Archive-relative path to the widget's HTML file. |
| `widget.size` | Default `width` / `height` in pixels. |
| `widget.scale` | Default `x` / `y` scale factors. |

!!! warning
    A `.smw` with no `widget.json`, or with an empty `entry`, is ignored entirely and will not appear in the Widget Browser.

### Installing

Installed packages are stored by pack id and version:

```
imports/widgets/packed/<pack_id>/<version>.smw
```

Because the version is part of the path, installing a new version sits alongside the old one rather than replacing it. The Widget Browser shows only the newest version of each widget by default; tick **All versions** to see them all.

When an overlay uses a widget from a package and a newer version of that package is installed, the widget's card in the editor shows an **Update Available** button that swaps it over while keeping your configuration.

### Exporting

Right-click any widget in the overlay editor's widget list and choose **Export Packed Widget**. You can set the name, group, version, author, tags, and preview image, and pick which files to bundle.

Your current CSS and JS variable values are baked in as the exported widget's defaults, so whoever installs it starts with your configuration.

!!! note
    Files referenced by hardcoded paths inside the HTML, JS, or CSS may not be detected and bundled automatically. Check the file list in the export dialogue before confirming.

The result lands in the `exports` folder.

### Unpacking

Because a package is read from inside the archive, its files are not directly editable. Right-click a packaged widget in the editor and choose **Unpack Widget** to extract it to loose files:

```
imports/widgets/unpacked/<author>/<group>/<name>/<version>/
```

The overlay's widget is repointed at the extracted files, so edits take effect immediately. The original `.smw` is untouched and stays in your Widget Browser.

---

## Widget Collections (`.smwc`)

A `.smwc` is simply a zip containing multiple `.smw` files - a way to hand someone an entire theme set or preset pack that installs in one action.

### Structure

```
retro-pixel.smwc
├-- collection.json # optional manifest
├-- WolfwithSword_Retro_Timer.smw
├-- WolfwithSword_Retro_Goal-Bar.smw
└-- WolfwithSword_Retro_Alerts.smw
```

Any entry ending in `.smw` is installed, regardless of what folder it sits in. Anything else in the archive is ignored.

### `collection.json`

The manifest is optional - a `.smwc` with nothing but `.smw` files still installs fine.

```json
{
  "format_version": "1",
  "app_version": "2.0.0",
  "collection": {
    "name": "Retro Pixel",
    "author": "WolfwithSword",
    "version": "1.0.0",
    "description": "The full Retro Pixel widget set.",
    "tags": ["retro", "pixel", "themeset"]
  }
}
```

If `name` is missing it falls back to the filename, and `version` defaults to `1.0.0`.

### Installing

Double-click the `.smwc`, or import it via the protocol handler. Each contained `.smw` is installed individually using the [normal package rules](#installing) - so a collection can safely mix updates to widgets you already have with brand new ones.
