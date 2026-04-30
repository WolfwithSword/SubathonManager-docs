
KoFi has two setup methods. The suggested method is using *DevTunnels*, which supports all KoFi events. The *Legacy* approach using *StreamerBot* remains as an option, although it requires use of an external tool and does not currently support Shop Orders or Commissions.


=== "DevTunnels"

KoFi requires DevTunnels to be setup and configured.


| Value | Description |
|---|---|
| **Donations** | Seconds per 1$, Points per 1$ (rounded down). 1$ of Default Currency after conversion. |
| **Memberships** | Seconds and points per membership. Add tiers with the **Add Membership Tier** button - the name must match the tier name from KoFi exactly. |
| **Shop Orders** | Seconds per X, Points per X (rounded down). Where X can be per Order, Item, or Dollar cost. |
| **Commissions** | Seconds per 1$, Points per 1$ (rounded down). 1$ of Default Currency after conversion. |

There are options to configure adding the value of an order as a donation, as well as an option to add the full value of a commission order as a donation.

Supports:

- Donation/Tips, Memberships subscriptions, Membership resubscriptions, Shop Orders, Commission Orders
- Monthly recurring tips are treated as Donation/Tips
- Commission Orders are orders but are set to be per dollar.
  
## Configuration

You can configure KoFi natively in the UI's Settings tab.

![kofi](https://assets.subathonmanager.app/docs/config/setup/kofisetupdevtunnels.png)

By default, all memberships/subs will be treated using the values for DEFAULT. If you want to support your custom membership tiers, please add new tiers with the button and match the tier name with the first text field.


=== "(Legacy) StreamerBot"


KoFi legacy setup requires Streamer.Bot. Clicking the **Setup** button will open this guide for connecting KoFi to Streamer.Bot and configuring the required actions.

| Value | Description |
|---|---|
| **Donations** | Seconds per 1$, Points per 1$ (rounded down). 1$ of Default Currency after conversion. |
| **Memberships** | Seconds and points per membership. Add tiers with the **Add Membership Tier** button - the name must match the tier name from KoFi exactly. |

## StreamerBot Setup

To integrate KoFi (Legacy Method), StreamerBot is currently required.

- Install & Setup [Streamer.Bot](https://streamer.bot/)
- [Set Up KoFi with Streamer.Bot](https://docs.streamer.bot/guide/integrations/ko-fi)
    - This requires the Streamer.bot Website Integration setup, with a logged in account.
- Copy the string/text from in SubathonManager
- In Streamer.Bot's desktop app, click "Import" and paste in the string.
- In Streamer.Bot, go to Server/Clients -> Custom WebSocket Clients -> Find `SubathonManager`. Right click it, and enable "Auto Connect" if it is not already enabled.


![img](https://assets.subathonmanager.app/docs/config/setup/streamerbotwebsocketsetup.png)

You can test the connection from KoFi -> StreamerBot -> SubathonManager by firing events from [KoFi here](https://ko-fi.com/manage/webhooks?src=sidemenu).

You can verify Streamer.Bot is connected to SubathonManager by checking its configuration in the settings and it will say Connected or Disconnected next to the import string copy button.

Supports:

- Donation/Tips, Memberships subscriptions, Membership resubscriptions
- Monthly recurring tips are treated as Donation/Tips
  
## Configuration

You can configure KoFi natively in the UI's Settings tab.

![kofi](https://assets.subathonmanager.app/docs/config/setup/kofisetuplegacy.png)

By default, all memberships/subs will be treated using the values for DEFAULT. If you want to support your custom membership tiers, please add new tiers with the button and match the tier name with the first text field.

To import the action string, you can copy it from within the application, find it in the latest release assets, or get the [raw file here](https://raw.githubusercontent.com/WolfwithSword/SubathonManager/refs/heads/main/external/streamerbot/SubathonManager_KoFi.sb).

---