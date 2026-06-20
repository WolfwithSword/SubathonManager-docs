---
description: SubathonManager general app settings including port, currency, and timer behaviour configuration
---

=== "Config"

    | Setting | Description |
    |---|---|
    | **Port** | The port the webserver runs on for your browser sources |
    | **Default Currency** | The currency to convert donations to when calculating time/points |
    | **Bits-Like as Donation** | Whether or not to count Bits from Twitch, Bits/Beets from Blerp, etc, as money donations to count towards the donation sum |
    | **Events when Locked?** | If checked, events will still come in and be accepted by the app and overlays when the timer is locked. |
    | **Values when Locked?** | If checked, values for money and points will still add to the subathon when locked. Time will not add in any case. |

=== "Options"

    | Option | Description |
    |---|---|
    | **Open Data Folder** | Open the folder that all data is saved to |
    | **Export Events** | Export all events for the current subathon to a CSV |
    | **Check for Updates** | Check for updates, and if available, prompt to auto install |
    | **Help?** | Opens your browser to this wiki |
    | **Undo Simulated Events** | For the current subathon, delete all simulated events and undo their points/seconds that came from this settings page. **Warning** - this may bring you to negative time/points. |
    | **Data Collection** | Opens up the configuration for optional data collection |

---