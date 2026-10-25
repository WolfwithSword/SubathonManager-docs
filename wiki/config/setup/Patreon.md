---
description: Connect Patreon to SubathonManager to add time and points for new pledges, renewals and upgrades during your subathon
---

# Patreon

Patreon is configured under **External Services**. It adds time and points when someone pledges to your Patreon campaign, renewals, or upgrades.

Patreon requires [DevTunnels](./DevTunnels.md) to be set up and running, so Patreon can reach SubathonManager. If it is not configured, the app will prompt you to set it up before you can connect.

!!! note
    You need a Patreon **creator** account with a campaign. Connecting a patron-only account will show an error.

## Connecting

Click **Connect** to open a browser tab and authorize SubathonManager to access your Patreon campaign. Once approved, you will be logged in and a webhook is automatically made.

![patreon-authorize](https://assets.subathonmanager.app/docs/config/setup/2.0.5/patreon_authorize.webp)

| Button | Description |
|---|---|
| **Connect** | Log in to Patreon and let it create the webhook. |
| **Disconnect** | Remove the webhook from Patreon and forget your login. |
| **Recreate Webhook** | Deletes and remakes the webhook. Use this if pledges stop coming in. |
| **Manage** | Opens Patreon's webhook management page, where you can see the webhook SubathonManager created. |

Your webhook URL is shown (hidden by default) and can be copied with the **Copy** button. If your DevTunnel's URL changes, the webhook is updated for you.

## Configuration

![patreon-settings](https://assets.subathonmanager.app/docs/config/setup/2.0.5/patreon_settings.png)

Your campaign's tiers are filled in automatically when you connect, on startup, and whenever a pledge arrives for a tier that's new or renamed.

| Value | Description |
|---|---|
| **Memberships** | Seconds and points per membership, configured per tier, plus a **Default** for anything that doesn't match a tier. |
| **Per 1$ pledged** | Seconds and points per 1$ pledged. Only used when **Add time/points per 1$ pledged instead of per tier** is checked. |

| Option | Description |
|---|---|
| **Count the pledged amount as a donation** | Adds the amount pledged to the subathon's money total. |
| **Add time/points per 1$ pledged instead of per tier** | Ignores the tier settings, and adds time and points based on the amount actually charged instead. Only affects new pledges, not ones already received. |

### Annual Pledges

- **Per tier** (default): an annual pledge counts as **12** memberships of its tier.
- **Per 1$**: an annual pledge uses the full amount charged for the year.

### Details

| Patreon event | Details |
|---|---|
| **New pledge** | Unless free or payment declined |
| **Renewal** | On new charge to member's payment method |
| **Upgrade** | For the amount charged to the member for the tier |
| **Free trials/tiers, declined payments, cancellations** | Not included |

In short, only memberships or pledges with an actual charged amount to payment are counted. Upgrades, Annuals, Discounts, etc, only provide the amount charged at time of - but will always include their new/current tier.
