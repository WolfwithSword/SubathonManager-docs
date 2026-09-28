---
description: Connect FourthWall to SubathonManager to track store purchases, gifts, memberships, and donation events during your subathon
---

FourthWall requires [DevTunnels](./DevTunnels.md) to be set up and running. If it is not configured, the app will prompt you to set it up before you can connect.

Click **Connect** to open a browser tab and authorize the SubathonManager FourthWall App to access your store. Once approved, the tab will close automatically and you will be logged in. A webhook will be created on your store automatically - no manual configuration is needed on the FourthWall side.

## Configuration

![fourthwall](https://assets.subathonmanager.app/docs/config/setup/2.0.0/fourthwall1.png)

Once connected, your **Status** will show as **Connected** and **DevTunnels** as **Running**. Your webhook URL is shown (hidden by default) and can be copied with the **Copy** button.

![fourthwall](https://assets.subathonmanager.app/docs/config/setup/fourthwall2.png)

Use **Reconnect** to refresh the connection, or **Disconnect** to unlink your store. Membership tiers are pre-filled automatically and will update on bootup or whenever you reconnect.

| Value | Description |
|---|---|
| **Donations** | Seconds per 1$, Points per 1$ (rounded down). |
| **Orders** | Seconds and points per order. Where X can be per Order, Item, or Dollar cost. |
| **Gift Orders** | Seconds and points per gift order. Where X can be per Order, Item, or Dollar cost. |
| **Memberships** | Seconds and points per membership, configured per tier. Tiers are sourced from your FourthWall store and refreshed automatically. |

There are checkboxes which if enabled, will count the commission value of **Orders** and **Gift Orders** as a donation toward your subathon's total money donated.

### Cancelled Orders

There is a tiny bit of support for cancelled orders. If **Auto delete cancelled orders?** is enabled, when a shop order is cancelled its event is removed from the subathon, along with the time, points, and money it added.

This only works if SubathonManager was running and connected both when the order was placed and when it was cancelled, and only for orders in the active subathon. Gift orders are not covered. It is off by default.

!!! note
    If you connected FourthWall before this feature was added, the existing webhook is updated automatically to also receive order updates.

Supports:

- Donations, Orders, Gift Orders, Memberships
- Order cancellations (optional, see [Cancelled Orders](#cancelled-orders))
