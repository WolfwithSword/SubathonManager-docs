
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

!!! tip
    Since KoFi only supports a single webhook url, you can configure any number of Forward URLs, which will forward all data to any other webhook url, such as streamerbot!
---

Please keep an eye on the webhook URL or if you are missing events every couple months. It is possible for the webhook URL to change after 3-6 months. If this is the case, all you need to do is update the URL on KoFi's webpage.

---