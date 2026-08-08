---
title: Download
description: Download & Install SubathonManager
tags:
  - Installation
  - Setup
  - Subathon
---

# Installation

[![GitHub Release](https://img.shields.io/github/v/release/WolfwithSword/SubathonManager?include_prereleases&style=for-the-badge&logo=github&color=3f4fa3)](https://github.com/WolfwithSword/SubathonManager/releases/latest)
[![GitHub Downloads](https://img.shields.io/github/downloads/WolfwithSword/SubathonManager/total?style=for-the-badge&logo=github&color=3f4fa3&label=downloads)](https://github.com/WolfwithSword/SubathonManager/releases/latest)

{% if docs_version == "nightly" %}

[Download the latest release :material-download:](https://github.com/WolfwithSword/SubathonManager/releases/latest){ .md-button .md-button--primary data-download-channel="latest" }

[Download nightly :material-download:](https://github.com/WolfwithSword/SubathonManager/releases/tag/nightly){ .md-button .md-button--primary data-download-channel="nightly" }
{% else %}
[Download the latest release :material-download:](https://github.com/WolfwithSword/SubathonManager/releases/latest){ .md-button .md-button--primary data-download-channel="latest" }
{% endif %}

Extract the zip file to a location of your choosing, this will become your SubathonManager installation going forward.

---

## Platforms

As of `v2.0.0`, SubathonManager runs on Windows, macOS, and Linux. Every release ships one zip per platform, named `SubathonManager_[platform]_[version].zip`.

| Platform | Build | Notes |
|---|---|---|
| Windows | `win-x64` | Primary supported platform |
| macOS (Apple Silicon) | `osx-arm64` | For M1 / M2 / M3 / M4 Macs |
| macOS (Intel) | `osx-x64` | For Intel Macs |
| Linux | `linux-x64` | 64-bit linux (glibc) distributions |


=== "Windows"

    Extract the zip and run `SubathonManager.exe`.

    The app registers the `subathonmanager://` protocol and the `.smo`, `.smw`, and `.smwc` file associations for the current user on launch.

=== "macOS"

    Extract the zip, then drag `SubathonManager.app` **out of your Downloads folder** - into `Applications` or anywhere else.

    The app is not signed with an Apple Developer ID, so macOS will block it the first time. Open **System Settings -> Privacy & Security**, scroll to the message about SubathonManager, and click **Open Anyway**. On macOS 14 and older, right-click the app and choose **Open** instead.

    A `README.txt` with the same steps is included in the zip.

    !!! note
        macOS support is considered experimental and is not the primary support target.

=== "Linux"

    Extract the zip and run the `SubathonManager` binary (`chmod +x SubathonManager` if needed).

    The app self-registers the `subathonmanager://` protocol handler and the `.smo` / `.smw` / `.smwc` file associations after first launch. If you would rather do it manually, or want to point the associations at a specific install, a helper script is bundled at `linux/install.sh`:

    ```bash
    ./linux/install.sh                # register using the binary next to the script
    ./linux/install.sh /path/to/dir   # register using the binary in that directory
    ```

    !!! note
        Linux support is considered experimental. There is a known bug with the embedded WebView on some distributions.

---

## Updating

=== "Automatic"

    Go to the **Settings** tab and click **Check for Updates**. If one is available, you will be prompted to update in place.

    All your settings and configuration should be preserved after updating.

=== "Manual"

    We recommend backing up your old installation, then overwriting with the latest release zip.

    All your settings and configuration should be preserved after updating.

---

## Uninstallation

=== "Windows"

    Delete the installed files (`SubathonManager.exe` & related files).

=== "macOS"

    Delete `SubathonManager.app`.

=== "Linux"

    Delete the installed files, then unregister the desktop entry and file associations with the bundled helper script:

    ```bash
    ./linux/install.sh --uninstall
    ```

    This removes the `subathonmanager.desktop` entry, the `.smo` / `.smw` / `.smwc` MIME definitions, and the installed icons from your user's `~/.local/share` (or `$XDG_DATA_HOME`). Run it *before* deleting the app folder, since the script lives inside it.

!!! info
    Everything related to SubathonManager is located within the folder the executable is in (or, on macOS, inside the `.app` bundle). The only exception is the Linux desktop/MIME registration described above.

---

!!! warning "Cloud Storage / Virtual Drives"
    If you install in Google Drive or similar cloud storage with a local virtual drive, even with "Offline Access" enabled, some config changes will not take effect until app restart.

    This includes app theme, currency, webhook settings, and more. This is due to limitations of the config file watcher not playing nicely with cloud storage virtual drives. Solution is to either restart the app after some config changes, or do not install in a virtual drive.