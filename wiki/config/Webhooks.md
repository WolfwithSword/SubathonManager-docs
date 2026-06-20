---
description: Configure Discord webhook URLs to log SubathonManager events, errors, and wheelspins to your Discord channels
---

Log certain events to Discord channels.


| Setting | Description |
|---|---|
| **Error Log URL** | Webhook URL to log errors and notices from the application |
| **Event Log URL** | Webhook URL to log subathon events for audit logging. Sends in batches every minute. |
| **Log Simulated Events?** | Whether to include simulated events in the event log |
| **Log Patches?** | Logs to the error URL when remote patches to your subathon values configuration are applied |
| **WheelSpin Log URL** | Webhook URL to log wheelspin related events |
| **Log WheelSpin Events?** | Logs specifically wheelspin events and status changes |
| **Log Trigger Fires?** | Logs whenever a WheelSpin Trigger is fired |


For each event type, you can choose which ones to log to the Event Log webhook. These are separated by source type and event type.