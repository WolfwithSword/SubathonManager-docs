# Installation

[![GitHub Release](https://img.shields.io/github/v/release/WolfwithSword/SubathonManager?include_prereleases&style=for-the-badge&logo=github&color=3f4fa3)](https://github.com/WolfwithSword/SubathonManager/releases/latest)
[![GitHub Downloads](https://img.shields.io/github/downloads/WolfwithSword/SubathonManager/total?style=for-the-badge&logo=github&color=3f4fa3)](https://github.com/WolfwithSword/SubathonManager/releases/latest)

{% if docs_version == "nightly" %}
[Download nightly :material-download:](https://github.com/WolfwithSword/SubathonManager/releases/nightly){ .md-button .md-button--primary }
{% else %}
[Download the latest release :material-download:](https://github.com/WolfwithSword/SubathonManager/releases/latest){ .md-button .md-button--primary }
{% endif %}

Extract the zip file to a location of your choosing.


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

Delete the installed files (`SubathonManager.exe` & related files).

!!! info
    Everything related to SubathonManager is located within the folder the executable is in.

---

!!! warning "Cloud Storage / Virtual Drives"
    If you install in Google Drive or similar cloud storage with a local virtual drive, even with "Offline Access" enabled, some config changes will not take effect until app restart.

    This includes app theme, currency, webhook settings, and more. This is due to limitations of the config file watcher not playing nicely with cloud storage virtual drives. Solution is to either restart the app after some config changes, or do not install in a virtual drive.