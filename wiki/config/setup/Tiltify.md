---
description: Connect Tiltify to SubathonManager to track charity campaign donations and donation matches during your subathon
---

# Tiltify

Tiltify is configured under **External Services**.

Click **Connect** to open a browser tab and authorize SubathonManager to access your Tiltify account. Once approved, you will be logged in and your Tiltify username will be shown next to the buttons.

Use **Reconnect** to refresh the connection, or **Disconnect** to unlink your account.

## Campaigns

Once connected, your active campaigns will show up under **Campaigns**, each with a checkbox to enable or disable tracking for it. This includes campaigns on your own account as well as campaigns from any teams you are a member of (marked with **(team)**).

Donations are only tracked for **checked** campaigns. If nothing is checked, no donations will be tracked.

If you create a new campaign, or join a team campaign, after connecting, click **Refresh** to add it to the list.

!!! info
    Tiltify donations are checked for every ~15 seconds, so they may take a few moments to show up in SubathonManager after they appear on Tiltify.

## Configuration

| Value | Description |
|---|---|
| **Donations** | Seconds per 1$, Points per 1$ (rounded down). |

You can send a test donation with the **Test** button, choosing the amount, currency and which campaign the test donation is tagged with.

For the subathon, currency is convered to your selected primary currency and the "1$" is relative to that currency.

!!! warning "Donation Matches"
    When a donation comes in that fulfills part or all of a **donation match**, you will receive a **second event** right after the original donation for the matched amount, as if it were a donation itself. It will show the name of the matcher (or **Donation Match** if none is set) as the user.

    This means a matched donation will add its own time and points for the newly matched amount added.
