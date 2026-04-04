### KoFi

KoFi setup requires Streamer.Bot. Clicking the **Setup** button will open the [setup guide](https://github.com/WolfwithSword/SubathonManager/discussions/108) for connecting KoFi to Streamer.Bot and configuring the required actions.

| Value | Description |
|---|---|
| **Donations** | Seconds per 1$, Points per 1$ (rounded down). 1$ of Default Currency after conversion. |
| **Memberships** | Seconds and points per membership. Add tiers with the **Add Membership Tier** button - the name must match the tier name from KoFi exactly. |

### GoAffPro

GoAffPro is the intermediary service many store partners use for affiliate services - including GamerSupps, OrchidEight, and UwUMarket.

Click **Connect** and log in to your GoAffPro account in the popup. Your active supported stores will be listed below.

=== "Options"

    | Option | Description |
    |---|---|
    | **Lookback Days** | Number of days on connection to look back for events. Useful to catch up on offline purchases from days the app was inactive. |

=== "Per-Store Values"

    | Value | Description |
    |---|---|
    | **Enabled** | Whether or not to enable events for this store |
    | **Add Commission Amount** | For each store order, whether to treat the commission earned as a donation, adding to total money donated |
    | **Seconds** | Seconds configuration |
    | **Points** | Points configuration |
    | **Per X** | How the seconds/points values are counted. <br><br>**Dollar** = per whole unit of order total (excl. shipping) <br><br>**Order** = per individual order<br><br>**Item** = per individual item in the order |

### External Generic Services

Generic external services can push both Subs and Donations. Subs require values in their body unless their value matches a configured subscription name. Donations can be configured per converted currency dollar unit.

See [Development - External Services](../Development.md#external-services) for integration details.

| Value | Description |
|---|---|
| **Donations** | Seconds per 1$, Points per 1$ (rounded down). 1$ of Default Currency after conversion. |
| **Subscriptions** | Seconds/Points per known/named subscription as configured, and default values. |

---