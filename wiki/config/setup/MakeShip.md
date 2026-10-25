---
description: Connect MakeShip to SubathonManager to track pledges and campaign sales during your subathon
---

# MakeShip

!!! warning "Use at your own risk"
    MakeShip may block the requests SubathonManager makes to fetch sale/pledge counts at any time. If that happens, events will stop coming in for your items. This integration is considered **use at your own risk**.

You can connect MakeShip to any number of makeship **petitions** or **campaigns** - but not permanent products.

Each product is polled every 30s and the number of campaign sales / petition pledges are checked, and produce a subathon event with the number sold/pledged. It does not count any that occurred while the app was offline.

To start tracking the sales/pledges of a product, simply add its product URL **MakeShip** tab under **External Services**. The "User" of the event that comes in will be the product name.

![makeshipconfig](https://assets.subathonmanager.app/docs/config/setup/makeshippreview.png)

You can set a default value for seconds/points per sale, or override per product.