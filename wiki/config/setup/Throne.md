Throne requires DevTunnels to be set up and running. If it is not configured, the app will prompt you to set it up before you can connect.

Unlike other services, Throne does not use an OAuth login flow. Click **Connect** to enable the integration, then click **Setup Throne** to complete webhook registration.

## Webhook Setup

Throne does not create webhooks automatically. To finish setup:

1. Click **Copy** next to the Webhook URL field to copy your unique endpoint.
2. Open your [Throne webhook settings](https://throne.com/profile/integrations/webhook) in your browser.
3. Enable webhooks on this page
3. Paste the URL into Throne's webhook configuration as a subscriber URL and save.

![throne](https://assets.subathonmanager.app/docs/config/setup/throne2.png)

Once saved, Throne will begin sending events to SubathonManager.

## Configuration

![throne](https://assets.subathonmanager.app/docs/config/setup/throne1.png)

Once connected, your **Status** will show as **Connected** and **DevTunnels** as **Running**. Use **Disconnect** to disable the integration.

| Value | Description |
|---|---|
| **Contributions** | Seconds and points per contribution, always counted per Dollar. |
| **Gifts** | Seconds and points per gift. Where X can be per Dollar or per Item. |
| **Crowd Funding Completed** | Fires when a crowd funding campaign completes. Triggers visible alerts only - does not contribute to the timer or points. |

Supports:

- Contributions, Gifts Purchased, Crowd Funding Gift Completed

Please keep an eye on the webhook URL or if you are missing events every couple months. It is possible for the webhook URL to change after 3-6 months. If this is the case, all you need to do is update the URL on Throne's webpage.