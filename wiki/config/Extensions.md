---
description: Connect extensions like StreamElements, Tangia, StreamLabs, or Blerp to SubathonManager for donation and tip tracking
tags:
  - Subathon
  - StreamElements
  - StreamLabs
  - TipeeeStream
  - Blerp
  - Tangia
  - TreatStream
---

### StreamElements

Go to [your dashboard](https://streamelements.com/dashboard/account/channels) and copy your **JWT Token**, paste it in and click **Connect**.

| Value | Description |
|---|---|
| **Tips** | Seconds per 1$, Points per 1$ (rounded down). 1$ of Default Currency after conversion. |

### StreamLabs

Go to your [dashboard API Settings](https://streamlabs.com/dashboard#/settings/api-settings), navigate to **API Tokens**, and copy your **Socket API Token**, paste it in and click **Connect**.

| Value | Description |
|---|---|
| **Donations** | Seconds per 1$, Points per 1$ (rounded down). 1$ of Default Currency after conversion. |

### TipeeeStream

Click the connect button and you will be prompted to authorize with the SubathonManager app for TipeeeStream.

| Value | Description |
|---|---|
| **Donations** | Seconds per 1$, Points per 1$ (rounded down). 1$ of Default Currency after conversion. |

### Blerp

To use Blerp, you need to have the default chat message notifications enabled, as we rely on parsing chat for the Blerp account. Supports both Bits and Beets for both Twitch and YouTube chats.

| Value | Description |
|---|---|
| **Bits** | Seconds per 100, Points per 100 (rounded down). **Modifier** is the fraction that counts towards currency - e.g. `0.8` means 80% of bits count as money donations. |
| **Beets** | Seconds per 100, Points per 100 (rounded down). **Modifier** works the same as Bits above. |

### Tangia

Tangia will work as long as you have the overlay page open somewhere in your stream. Supports both Tangia's Coins/Tokens and Twitch Bits usage - however there is no way to distinguish them.

To connect Tangia, click the `Get Key` button and paste in your Tangia overlay URL.

| Value | Description |
|---|---|
| **Tokens** | Seconds per 100, Points per 100 (rounded down).

---

### TreatStream

To integrate TreatStream, go to the connection setup in **Stream Extensions** and click connect. This will open your browser and ask you to sign in and approve the connection.

![treatstream](https://assets.subathonmanager.app/docs/config/setup/treatstream_connect.png)

For each treat order, you can configure seconds and points per.

| Value | Description |
|---|---|
| **Treats** | Seconds per treat order, Points per treat order.

---
