Log certain events to Discord channels.


| Setting | Description |
|---|---|
| **Error Log URL** | Webhook URL to log errors and notices from the application |
| **Event Log URL** | Webhook URL to log subathon events for audit logging. Sends in batches every minute. |
| **Log Simulated Events?** | Whether to include simulated events in the event log |
| **Log Patches?** | Logs to the error URL when remote patches to your subathon values configuration are applied |


For each event type, you can choose which ones to log to the Event Log webhook. These are separated by source type and event type.