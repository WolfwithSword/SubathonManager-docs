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

## API Reference

### Amounts

`GET /api/data/amounts`

Returns a summary of all event amounts processed - number of subs by type, total dollars per currency, etc. Split between `real` and `simulated`/`system` events.

??? example "Example response"

    ```json
    {
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