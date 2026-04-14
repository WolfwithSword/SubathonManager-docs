---
title: Import/Export Overlays
description: How to import and export custom overlays
---

Overlays can be import and exported using `.smo` files.

`.smo` files are essentially zip files containing all the required files and structure needed for an overlay, and all preconfigured values.

This can be used as a backup system, migrating across systems, or sharing preconfigured layouts of overlays. It also functions as an easy packaging system for distributing/sharing custom widgets and overlays.

# Exporting

When exporting an overlay, you are given a chance to preview what the contents will look like. Please ensure all required files are included. Many unused files may be included as well, due to being in the same folders as used files, so please be aware of this.

You can rename the exported `.smo` file before it is saved. All configuration of each widget will be saved. The file can be found in the `exports` folder in the installation path.

# Importing

When importing a `.smo` file, it will instantly create a new overlay named after the export. It can be found in the `imports` folder of the installation path of Subathon Manager, and is isolated from all other overlays unless it was an existing one being overwritten.

You can also import via double-clicking a valid `.smo` file, as it will open your latest install of Subathon Manager and auto import. If you already had it imported, it will update any changed files.

For developers, you can also import an `.smo` file from the web using the custom protocol `subathonmanager://import?url=` followed by a link to the file.