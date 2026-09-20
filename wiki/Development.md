---
title: Development
description: View the API and development documentation
tags:
  - API
  - Develop
  - dev
  - Subathon
---

# Development

## External Services

SubathonManager supports external services via **REST API** or **WebSocket**. Three integration types are supported: External Commands, ExternalDonations, and ExternalSubs.

**Endpoint summary:**

| Type | REST | WebSocket |
|---|---|---|
| Commands | `POST /api/data/control` | `/ws` |
| Donations | `POST /api/data/control` | `/ws` |
| Subs | `POST /api/data/control` | `/ws` |

### External Commands

Push a command as if it came from Twitch/YouTube chat. Commands are processed through the CommandService - see [Usage - Chat Commands](Usage.md#chat-commands) for message formatting details.

=== "REST"

    `POST /api/data/control`

    ```json
    {
        "type": "Command",
        "command": "CommandName",
        "message": "",
        "user": "name"
    }
    ```

=== "WebSocket"

    ```json
    {
        "type": "Command",
        "ws_type": "Command",
        "command": "CommandName",
        "message": "",
        "user": "name"
    }
    ```

| Field | Type | Required | Notes |
|---|---|---|---|
| `type` | string | ✅ | Must be `"Command"` |
| `command` | string | ✅ | Must match a `SubathonCommandType` enum name |
| `message` | string | ✅ | Command parameters, or empty string |
| `ws_type` | string | WS only | Must be `"Command"` |
| `user` | string | ❌ | Defaults to `"External"` |

### ExternalDonation

External donations follow the configured seconds/points per dollar unit of default currency after conversion, with exceptions for certain overrides such as `KoFiDonation`.

!!! note
    Setting `user` to `"SYSTEM"` treats the event as a Simulated source instead of External.

=== "REST"

    `POST /api/data/control`

    ```json
    {
        "type": "ExternalDonation",
        "currency": "USD",
        "amount": "12.34",
        "user": "name",
        "id": "5fa57900-a69d-4944-9ff1-64c25801fb62"
    }
    ```

=== "WebSocket"

    ```json
    {
        "type": "ExternalDonation",
        "ws_type": "IntegrationSource",
        "currency": "USD",
        "amount": "12.34",
        "user": "name",
        "id": "5fa57900-a69d-4944-9ff1-64c25801fb62"
    }
    ```

| Field | Type | Required | Notes |
|---|---|---|---|
| `type` | string | ✅ | Must be `"ExternalDonation"` |
| `currency` | string | ✅ | Any valid 3-char currency code |
| `amount` | string | ✅ | Float as string, e.g. `"12.34"` |
| `ws_type` | string | WS only | Must be `"IntegrationSource"` |
| `user` | string | ❌ | Defaults to `"External"`. Use `"SYSTEM"` for simulated. |
| `id` | string (GUID) | ❌ | Persist a unique ID from your service |

### ExternalSub

External subscriptions/memberships can be pre-configured in the UI by adding a perfect-matching name, and then supplying the `value` field with this name.

If no value is provided, it requires seconds and points to be supplied, otherwise (or if value does not match) it will use the DEFAULT configuration. Provided seconds/points will be affected by active multipliers.

!!! note
    Setting `user` to `"SYSTEM"` treats the event as a Simulated source instead of External.

=== "REST"

    `POST /api/data/control`

    ```json
    {
        "type": "ExternalSub",
        "amount": 1,
        "value": "Tier 1",
        "seconds": 60,
        "points": 1,
        "user": "name",
        "id": "5fa57900-a69d-4944-9ff1-64c25801fb62"
    }
    ```

=== "WebSocket"

    ```json
    {
        "type": "ExternalSub",
        "ws_type": "IntegrationSource",
        "amount": 1,
        "value": "Tier 1",
        "seconds": 60,
        "points": 1,
        "user": "name",
        "id": "5fa57900-a69d-4944-9ff1-64c25801fb62"
    }
    ```

| Field | Type | Required | Notes |
|---|---|---|---|
| `type` | string | ✅ | Must be `"ExternalSub"` |
| `ws_type` | string | WS only | Must be `"IntegrationSource"` |
| `seconds` | int | ✅* | How many seconds to add. Can be `0`. *Optional if `value` matches a UI config name |
| `points` | int | ✅* | How many points to add. Can be `0`. *Optional if `value` matches a UI config name |
| `amount` | int | ❌ | Number of subs. Defaults to `1` |
| `value` | string | ❌ | Tier name. Attempts to match a configured name in the UI |
| `user` | string | ❌ | Defaults to `"External"`. Use `"SYSTEM"` for simulated. |
| `id` | string (GUID) | ❌ | Persist a unique ID from your service |

---

## Config Management

Remotely read or update the seconds/points values for most event types.

### Reading Values

=== "REST"

    `GET /api/data/values`

    ```json
    [
      {
        "eventType": "TwitchSub",
        "source": "Twitch",
        "meta": "1000",
        "seconds": 60,
        "points": 1
      },
      {
        "eventType": "TwitchSub",
        "source": "Twitch",
        "meta": "2000",
        "seconds": 120,
        "points": 2
      }
    ]
    ```

=== "WebSocket (subscribe)"

    Send to subscribe - you'll then receive config values any time they update:

    ```json
    { "ws_type": "ValueConfig" }
    ```

    Response format:

    ```json
    {
      "type": "value_config",
      "ws_type": "ValueConfig",
      "data": [
        {
          "eventType": "TwitchSub",
          "source": "Twitch",
          "meta": "1000",
          "seconds": 60,
          "points": 1
        }
      ]
    }
    ```

Returns all event values that have a points or seconds configuration, along with source and meta data.

### Updating Values

Any remote PATCH changes will be logged to the Error Log Webhook URL (depending on configuration).

=== "REST"

    `PATCH /api/data/values` (also accepts `POST` / `PUT`)

    ```json
    [
      {
        "eventType": "TwitchSub",
        "source": "Twitch",
        "meta": "1000",
        "seconds": 20,
        "points": 1
      }
    ]
    ```

=== "WebSocket"

    ```json
    {
      "type": "value_config",
      "ws_type": "ValueConfig",
      "data": [
        {
          "eventType": "TwitchSub",
          "source": "Twitch",
          "meta": "1000",
          "seconds": 20,
          "points": 1
        }
      ]
    }
    ```

You can send any number of values - only those provided will be modified. `seconds` or `points` can be absent (but at least one must be present); absent fields will not be updated.

| Field | Notes |
|---|---|
| `eventType` | Required |
| `source` | Required |
| `meta` | Required. Empty string for most types; used for sub/membership tier names (matches their `value` string) |
| `seconds` | Optional if `points` present |
| `points` | Optional if `seconds` present |

---

## WheelSpin

### WheelSpin Control

You can update the status of any wheelspin history event if you have its `history id` and a valid status.

Currently, this request is websocket only. For getting the history id, check the [wheelspin result data](./widgets/Data.md#handlewheelspinresult).

There is an example of this control in the [StreamerBot Extension](./config/setup/StreamerBot.md).

=== "WebSocket"

    ```json
    {
      "ws_type": "WheelControl",
      "source": "External",
      "status": "Done", // Cancelled, Pending
      "id": "48453875-4078-4626-86ac-2faa87e0228e", // matches a history_id from WheelSpinResult
    }
    ```
---

## Resources

SubathonManager provides a `resources` directory at the root of your installation, which is served as an accessible path via the webserver. This is useful for having shared assets or scripts for widgets, or anything else you want served from a webserver.

`/resources/...`


## API Reference

### Amounts

`GET /api/data/amounts`

Returns a summary of all event amounts processed - number of subs by type, total dollars per currency, etc. Split between `real` and `simulated`/`system` events.

| Query Parameter | Description |
|---|---|
| `subathon` | Optional. A subathon Id, or `active`. Defaults to the active subathon. |

??? example "Example response"

    ```json
    {
      "subathon_id": "0b6f3c1e-2a4d-4f7e-9c1a-6d2e8f4b7a90",
      "subathon_name": "Subathon 2026",
      "subathon_active": true,
      "simulated": {
        "DonationAdjustment": { "CAD": -138990 },
        "TwitchCheer": 15300,
        "TwitchCharityDonation": { "CAD": 310 },
        "TwitchSub": { "T1": 100 },
        "TwitchGiftSub": { "T1": 1595, "T2": 240, "T3": 50 },
        "TwitchRaid": { "count": 2, "total_viewers": 50 },
        "YouTubeSuperChat": { "CAD": 20 },
        "YouTubeMembership": { "DEFAULT": 1 },
        "YouTubeGiftMembership": { "DEFAULT": 199 }
      },
      "real": {
        "TwitchFollow": 1,
        "ExternalDonation": { "USD": 119057.12 }
      }
    }
    ```

### Status

`GET /api/data/status`

Returns the current state of the subathon.

??? example "Example response"

    ```json
    {
      "millis_cumulated": 2231441768,
      "millis_elapsed": 11652000,
      "millis_remaining": 2219789768,
      "total_seconds": 2219789,
      "days": 25,
      "hours": 16,
      "minutes": 36,
      "seconds": 29,
      "points": 2754,
      "is_paused": true,
      "is_locked": false,
      "is_reversed": false,
      "multiplier": {
        "running": false,
        "apply_points": false,
        "apply_time": false,
        "is_from_hypetrain": false,
        "started_at": "2025-12-21T18:05:06.9150335",
        "duration_seconds": 0,
        "duration_remaining_seconds": 0
      }
    }
    ```

### Leaderboard

`GET /api/data/leaderboard`

Groups a subathon's events by user and ranks them. Use it to get the top contributers for one or many events in a widget, bot, spreadsheet, or other tool. You can build a leaderboard and copy its URL from the [Subathon Summary](SubathonSummary.md#leaderboard) window.

```text
/api/data/leaderboard?type=TwitchGiftSub,YouTubeGiftMembership&top=5&blacklist=SYSTEM*
```

Usernames are grouped without regard to casing, and a leading `@` is ignored. Only processed events are counted unless `includeUnprocessed` is set.

| Query Parameter | Aliases | Description |
|---|---|---|
| `type` | `types`, `event`, `eventtype`, `eventtypes` | **Required.** One or more event type names, comma separated or repeated, such as `TwitchSub`, `KoFiDonation`. Case-insensitive. More than one type makes a **combined** leaderboard (see below). |
| `method` | `mode` | How users are ranked. Defaults depend on the event type. See [Methods](#leaderboard-methods). |
| `top` | `n`, `limit` | How many users to return. Default `10`. Use `all` or `0` for everyone. Maximum `10000`. |
| `meta` | `metas`, `tier`, `tiers` | Only count events with one of these meta values, comma separated. `T1`/`T2`/`T3` are the same as `1000`/`2000`/`3000`. Ignored for combined leaderboards. |
| `blacklist` | `exclude`, `ignore` | Comma-separated users to leave out. A trailing `*` matches by prefix, e.g. `SYSTEM*`. |
| `alias` | `aliases`, `merge` | Count several names as one user. See [Aliases](#leaderboard-aliases). |
| `includeUnprocessed` | `unprocessed` | `true` to also count events that were not applied to the subathon. |
| `currency` | `target` | Three-letter currency code to convert money into. Defaults to your primary currency. Only used by money methods. |
| `subathon` | `subathonid` | A subathon ID, or `active`. Defaults to the active subathon. |

#### Leaderboard Methods

Which methods you can use depends on the category of the event type. If you leave `method` out, the **default** for that category is used.

| Category | Example Types | Methods | Default |
|---|---|---|---|
| Subscriptions & Gifts | `TwitchSub`, `TwitchGiftSub`, `YouTubeMembership`, `KoFiSub` | `ByPoints`, `ByCount` | `ByPoints` |
| Tokens | `TwitchCheer`, `BlerpBits`, `BlerpBeets` | `ByValue`, `ByPoints`, `ByCount` | `ByValue` |
| Donations | `KoFiDonation`, `YouTubeSuperChat`, `ExternalDonation` | `ByAmount`, `ByPoints`, `ByCount` | `ByAmount` |
| Orders | Merch store order events | `ByValue`, `ByOrder`, `ByItems`, `ByPoints` | `ByValue` |
| Other | `TwitchFollow`, `TwitchRaid` | `ByCount`, `ByPoints` | `ByCount` |
| Combined (2+ types) | Any mix | `ByPoints` | `ByPoints` |

| Method | Ranks By | Unit |
|---|---|---|
| `ByPoints` | Total points added, after multipliers. | `points` |
| `ByCount` | Total event amount, e.g. number of subs gifted. | `count` |
| `ByValue` | **Tokens:** total tokens, e.g. bits. **Orders:** money spent, converted to `currency`. | `tokens` / currency code |
| `ByAmount` | Money donated, converted to `currency`. | currency code |
| `ByOrder` | Number of orders placed. | `orders` |
| `ByItems` | Number of items ordered. | `items` |

Some methods are accepted as aliases of another: `ByAmount` and `ByValue` are the same for donations, tokens and orders, and `ByCount` is the same as `ByOrder` for orders. A method that doesn't apply to the event type returns an error.

#### Leaderboard Aliases

Aliases combine the events of several usernames into one user, without editing the saved events. This is useful when a viewer uses different names across different platforms,

If trying to attribute a merch order where the username is not available, it's recommended to change the username via the `Events` tab for that order manually, if you know it.

Each entry is the name to show, a colon, then the other names separated by `|`. Separate entries with commas, or repeat the parameter:

```text
alias=someguy1:AltGuy_ttv|AltGuy_YT,other:alt
```

Chains are followed, so `a:b` together with `b:c` counts all three as `a`. A name mapped to two different users, or a loop, returns an error.

!!! note
    Encode `|` as `%7C` if your HTTP client doesn't do it for you.

#### Response

??? example "Example response - `?type=TwitchGiftSub&top=3`"

    ```json
    {
      "subathon_id": "0b6f3c1e-2a4d-4f7e-9c1a-6d2e8f4b7a90",
      "subathon_name": "Subathon 2026",
      "subathon_active": true,
      "event_type": "TwitchGiftSub",
      "event_types": [ "TwitchGiftSub" ],
      "source": "Twitch",
      "sources": [ "Twitch" ],
      "label": "Gift Subscription",
      "combined": false,
      "method": "ByPoints",
      "unit": "points",
      "currency": null,
      "meta": null,
      "meta_ignored": false,
      "blacklist": [],
      "aliases": null,
      "include_unprocessed": false,
      "top": 3,
      "user_count": 42,
      "event_count": 118,
      "total": 1885,
      "unconverted_currencies": null,
      "results": [
        { "rank": 1, "user": "SomeViewer", "value": 500, "events": 6, "count": 500 },
        { "rank": 2, "user": "AnotherViewer", "value": 250, "events": 3, "count": 250 },
        { "rank": 3, "user": "ThirdViewer", "value": 100, "events": 10, "count": 100 }
      ]
    }
    ```

| Field | Description |
|---|---|
| `subathon_id` / `subathon_name` / `subathon_active` | The subathon the leaderboard was built from. |
| `event_type` / `source` / `label` | The single event type, its source and display label. `null` for combined leaderboards. |
| `event_types` / `sources` | Every event type and source included. |
| `combined` | `true` when more than one event type was requested. |
| `method` / `unit` | The method used, and the unit of `value` (`points`, `count`, `tokens`, `orders`, `items`, or a currency code). |
| `currency` | The currency that money was converted into. `null` if the method isn't a money method. |
| `meta` / `meta_ignored` | The meta filter used. `meta_ignored` is `true` if a meta filter was sent with a combined leaderboard. |
| `blacklist` / `aliases` | The blacklist and aliases that were applied. `aliases` is grouped by the name shown. |
| `include_unprocessed` | Whether unprocessed events were counted. |
| `top` | The number of results requested. `0` means all. |
| `user_count` / `event_count` / `total` | Totals across **all** ranked users, not just the ones returned by `top`. |
| `unconverted_currencies` | Currencies that could not be converted and so were counted as `0`. `null` if there were none. |
| `results[]` | The ranked users: `rank`, `user`, `value` (rounded to 2 decimals), `events` (number of events), and `count` (total event amount, e.g. subs or items). |

Invalid requests return status `400` with an error message:

```json
{ "error": "Method 'ByItems' is not valid for subscription events" }
```

---

## WebSocket Notes

Connect to the WebSocket server at the `/ws` endpoint, e.g. `ws://localhost:14040/ws`.

### Subscription Types

Send a message with a `ws_type` to subscribe to a data stream. A client can hold multiple subscriptions simultaneously by sending additional messages. Currently, you cannot unsubscribe from a type without disconnecting - the default type on connect is `Generic`, which is replaced once a valid type is sent.

| `ws_type` | What you receive |
|---|---|
| `IntegrationConsumer` | All WebSocket data that overlay widgets receive, except value config changes |
| `ValueConfig` | Config value updates whenever they change |

!!! info
    See [Widget Development](Widget-Development.md) for details on the overlay WebSocket data format.