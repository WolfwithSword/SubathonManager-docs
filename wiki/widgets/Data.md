---
title: Widget Data
description: Functions and Data spec available for custom widgets
---

Implement only the functions you need. Each is called automatically when the corresponding WebSocket data is received.

| Function | `data.type` | Description |
|---|---|---|
| [`handleSubathonUpdate(data)`](#handlesubathonupdate) | `subathon_timer` | Timer, points, lock/pause status, multiplier - fires frequently |
| [`handleSubathonEvent(data)`](#handlesubathonevent) | `event` | Fired whenever an event is successfully processed |
| [`handlePromptUpdate(data)`](#handlepromptupdate) | `prompt_update` | Fired whenever a prompt starts, ends, is completed, or progresses |
| [`handleGoalsUpdate(data)`](#handlegoalsupdate) | `goals_list` | Goals list changes |
| [`handleGoalCompleted(data)`](#handlegoalcompleted) | `goal_completed` | A new goal is completed |
| [`handleSubathonDisconnect()`](#handlesubathondisconnect) | - | Socket disconnected from SubathonManager |
| [`handleValueConfig(data)`](#handlevalueconfig) | `value_config` | Seconds/points config updated |
| [`handleTotalsUpdate(data)`](#handletotalsupdate) | `subathon_totals` | Subathon totals updated |
| [`handleWheelData(data)`](#handlewheeldata) | `wheel_data` | Active wheel state and spins owed, fires when wheel spins or changes, or spins owed changes |
| [`handleWheelSpinStart(data)`](#handlewheelspinstart) | `wheel_spin_start` | Fires when a wheel spin begins, before the result |
| [`handleWheelSpinResult(data)`](#handlewheelspinresult) | `wheel_spin_result` | Fires when the spin result is determined, after a delay |
| [`handleWheelSpinStatus(data)`](#handlewheelspinstatus) | `wheel_spin_status` | Fires when a spin history entry's status changes from the initial |

See the [Overlay Websocket Data diagram](../Design.md#overlay-websocket-data) for field-level detail.

---

### handleSubathonUpdate

Fires very frequently - use for the timer display, points, lock/pause state, and multiplier values.

!!! note
    When `multiplier_points` or `multiplier_time` is `1`, no multiplier is active for that field.

??? example "Example payload"
    ```json
    {
      "type": "subathon_timer",
      "total_seconds": int,
      "days": int,
      "hours": int,
      "minutes": int,
      "seconds": int,
      "total_points": int,
      "is_paused": bool,
      "is_locked": bool,
      "is_reversed": bool,
      "multiplier_points": float,
      "multiplier_time": float,
      "multiplier_start_time": "timestamp | null",
      "multiplier_seconds_total": int,
      "multiplier_seconds_remaining": int,
      "total_seconds_elapsed": int,
      "total_seconds_added": int,
      "currency": "string",
      "rounded_money": double,
      "fractional_money": double
    }
    ```

---

### handleSubathonEvent

Fires whenever an event is successfully processed and has added to the subathon timer.

??? example "Example payload"
    ```json
    {
      "type": "event",
      "event_type": "string",
      "source": "string",
      "seconds_added": int,
      "points_added": int,
      "user": "string",
      "value": "string",
      "amount": int,
      "currency": "string",
      "command": "string",
      "event_timestamp": "datetime",
      "reversed": bool,
      "sub_type": "string",
      "secondary_value": "string",
      "tertiary_value": "string",
      "type_true_source": "string"
    }
    ```

| Field | Notes |
|---|---|
| `event_type` | [SubathonEventType](https://github.com/WolfwithSword/SubathonManager/tree/main/SubathonManager.Core/Enums/SubathonEventType.cs) - [alt view](../Design.md#enums) |
| `source` | [SubathonEventSource](https://github.com/WolfwithSword/SubathonManager/tree/main/SubathonManager.Core/Enums/SubathonEventSource.cs) - [alt view](../Design.md#enums) |
| `command` | [SubathonCommandType](https://github.com/WolfwithSword/SubathonManager/tree/main/SubathonManager.Core/Enums/SubathonCommandType.cs) - only populated if `event_type` is a Command |
| `sub_type` | [SubathonEventSubType](https://github.com/WolfwithSword/SubathonManager/tree/main/SubathonManager.Core/Enums/SubathonEventSubType.cs) - [alt view](../Design.md#enums) |
| `value` | For certain events: $ amount for tips, number of bits, tier of sub, etc. |
| `amount` | Number of gift subs for gift events; otherwise usually `1` |
| `reversed` | `true` if seconds were removed during a reverse subathon |
| `secondary_value` | Mostly used for Order events (commission value + currency) or other rare data |
| `tertiary_value` | Mostly used for Order events, will sometimes include an item name if available, but not always |
| `type_true_source` | For simulated events, the original source type rather than `"Simulated"`. For GoAffPro orders, the GoAffProSource. |

??? info "GenericEventTypes event behaviour"

    For `event_type: TwitchHypeTrain` or `ThroneCrowdGiftComplete`, the event is structured differently from other types - it is intended as a status signal, not a points/time event:

    - `seconds_added` and `points_added` will be `0`
    - for HypeTrain
        - `value` will be `start`, `progress`, or `end` (or `start ...` with multiplier details if one was started)
        - `amount` will be the current hype train level. `progress` is only sent when the level increases.
        - `user` will be your Twitch username
        - Events are sent regardless of the auto-multiplier setting - only the `start` value is modified when auto-multiplier is enabled.
    - for Throne Gift Complete
        - `value` fields (value, secondary, tertiary) will include information on the price ofthe item, and item name.

---



### handlePromptUpdate

Fires whenever a prompt run is started, progressed, completed, expired/cancelled.

??? example "Example payload"
    ```json
    {
      "type": "prompt_update",
      "status": string,
      "progress": int,
      "target": int,
      "seconds_remaining": double,
      "start_time": datetime,
      "end_time": datetime,
      "duration_seconds": double,
      "text": string,
      "prompt_type": string,
      "prompt_subtype": string, 
      "prompt_eventtype": string,
      "prompt_eventtype_metafilter": string

    }
    ```

| Field | Notes |
|---|---|
| `status` | Current prompt status. `None`, `Active`, `Completed`, `Expired`, `Cancelled` |
| `progress` | Current progress towards the goal |
| `target` | Current target for the goal for completion |
| `seconds_remaining` | How many seconds left until the prompt expires |
| `start_time` | When the prompt goal started to run |
| `end_time` | The expected time when the prompt goal expires |
| `duration_seconds` | How long the prompt's duration was setup to last |
| `text` | The prompt text to display |
| `prompt_type` | The type of the prompt. `Points`, `Money`, `Orders`, `Follows`, `Subs`, `Tokens`, `Event` |
| `prompt_subtype` | The subtype for filtering. `Default`, `Items`, `NormalSubs`, `GiftSubs`, `ByTier` |
| `prompt_eventtype` | [SubathonEventType](https://github.com/WolfwithSword/SubathonManager/tree/main/SubathonManager.Core/Enums/SubathonEventType.cs) - [alt view](../Design.md#enums) |
| `prompt_eventtype_metafilter` | Filter for specific event types. Such as tier name for subscriptions / memberships. |

---



### handleGoalsUpdate

Fires when the goals list updates - new goals, changed goals, or point changes. Including when goal list is swapped.

??? example "Example payload"
    ```json
    {
      "type": "goals_list",
      "points": long,
      "goals_type": "string",
      "goals": [
        {
          "text": "string",
          "points": long,
          "completed": bool
        }
      ]
    }
    ```

| Field | Notes |
|---|---|
| `points` | Current subathon points, or rounded (floor) sum of real money donations if `goals_type` is `Money` |
| `goals_type` | [GoalsType](https://github.com/WolfwithSword/SubathonManager/tree/main/SubathonManager.Core/Enums/GoalsType.cs) - `Points` or `Money` |

---

### handleGoalCompleted

Fires whenever a new goal is completed (and unchanged from the current list).

??? example "Example payload"
    ```json
    {
      "type": "goal_completed",
      "goal_text": "string",
      "goal_points": long,
      "points": long
    }
    ```

`points` is the current subathon points at time of completion, or rounded (floor) sum of real money donations if `goals_type` is `Money`.

---

### handleSubathonDisconnect

Fires whenever the socket disconnects from SubathonManager.

On reconnection, initial messages for all other handlers are always re-sent, so you can simply wait for new data to arrive.

---

### handleValueConfig

Fires whenever the subathon seconds/points configuration is updated - either from the UI or via a remote config patch.

??? example "Example payload"
    ```json
    {
      "type": "value_config",
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

`meta` is an empty string for most event types; it is used for sub/membership tier names.

---

### handleTotalsUpdate

Fires whenever subathon totals change - from events being processed, money recalculated, etc.

Keys in `*_by_type` objects are valid [SubathonEventTypes](https://github.com/WolfwithSword/SubathonManager/tree/main/SubathonManager.Core/Enums/SubathonEventType.cs).

??? example "Example payload"

    ```json
    {
      "type": "subathon_totals",
      "currency": "USD",
      "money_sum": 1234.50,
      "sub_like_total": 10,
      "sub_like_by_type": {
        "TwitchSub": 6,
        "YouTubeGiftMembership": 4
      },
      "token_like_total": 400,
      "token_like_by_type": {
        "TwitchCheer": 400
      },
      "order_count_by_type": {
        "OrchidEightOrder": 4,
        "GamerSuppsOrder": 10
      },
      "order_items_count_by_type": {
        "OrchidEightOrder": 5,
        "GamerSuppsOrder": 18
      },
      "follow_count": 130,
      "follow_count_by_type": {
        "TwitchFollow": 130
      },
      "simulated": {
        // same structure as above, for test/simulated events
        "sub_like_total": 10,
        "sub_like_by_type": {
          "TwitchSub": 6,
          "YouTubeGiftMembership": 4
        },
        "token_like_total": 400,
        "token_like_by_type": {
          "TwitchCheer": 400
        },
        "order_count_by_type": {
          "OrchidEightOrder": 4,
          "GamerSuppsOrder": 10
        },
        "order_items_count_by_type": {
          "OrchidEightOrder": 5,
          "GamerSuppsOrder": 18
        },
        "follow_count": 130,
        "follow_count_by_type": {
          "TwitchFollow": 130
        }
      }
    }
    ```

---

### handleWheelData

Fires when the active wheel state changes, such as when items are updated, or when spins owed changes or the wheel swaps.

??? example "Example payload"
    ```json
    {
      "type": "wheel_data",
      "spins_owed": 25,
      "wheel": {
        "id": "0fc719b6-b8ac-483d-a9b3-301cd3e30acc",
        "name": "My Wheel",
        "spin_count": 344,
        "items": [
          {
            "id": "45604618-978c-417e-b25b-103f051c742f",
            "text": "Chat sends a tweet",
            "weight": 1,
            "quantity": 1,
            "is_infinite": true,
            "enabled": true,
            "index": 1,
            "action": { "type": "AddTime", "parameter": "300" }
          },
          {
            "id": "d5f6a167-bf5d-4e05-b3c3-4ab1a0b8fece",
            "text": "2x multiplier for 5m",
            "weight": 2,
            "quantity": 1,
            "is_infinite": true,
            "enabled": true,
            "index": 5,
            "action": { "type": "SetMultiplier", "parameter": "2|300s|False|True" }
          },
          {
            "id": "049d0d51-18e1-4f94-a910-29060cac21fa",
            "text": "Reroll",
            "weight": 200,
            "quantity": 0,
            "is_infinite": false,
            "enabled": false,
            "index": 6,
            "action": { "type": "Reroll", "parameter": "3" }
          },
          {
            "id": "b586a720-7126-4534-a1cb-7edefda70810",
            "text": "I touch grass",
            "weight": 2,
            "quantity": 1,
            "is_infinite": true,
            "enabled": true,
            "index": 13,
            "action": null // manual
          }
        ]
      }
    }
    ```

| Field | Notes |
|---|---|
| `spins_owed` | Current number of spins remaining to be spun |
| `wheel.spin_count` | Total number of times this wheel has been spun |
| `wheel.name` | Wheel Name |
| `wheel.spin_count` | Times this wheel has ever been spun |
| `wheel.items[].id` | Id of the item |
| `wheel.items[].enabled` | Whether item is enabled. If false, do not use in wheel |
| `wheel.items[].text` | Text for the item |
| `wheel.items[].weight` | Relative weight used for probability |
| `wheel.items[].quantity` | Remaining uses; ignore when `is_infinite` is `true` |
| `wheel.items[].is_infinite` | Is the quantity infinite? |
| `wheel.items[].index` | Display order of the item in the wheel |
| `wheel.items[].action` | `null` for Manual items; otherwise an object with `type` and `parameter` |
| `wheel.items[].action.type` | `AddTime`, `SubtractTime`, `SetMultiplier`, or `Reroll` |
| `wheel.items[].action.parameter` | For `AddTime`/`SubtractTime`: a time string (e.g. `"300"`, `"20m"`). For `SetMultiplier`: `"multiplier\|duration\|forPoints\|forTime"` (e.g. `"2\|300s\|False\|True"`). For `Reroll`: number of spins to add (e.g. `"3"`). |

---

### handleWheelSpinStart

Fires when a wheel spin begins, before the result is revealed. Use this to start a spin animation. `spin_delay_seconds` is how long until the result arrives.

??? example "Example payload"
    ```json
    {
      "type": "wheel_spin_start",
      "wheel_id": "0fc719b6-b8ac-483d-a9b3-301cd3e30acc",
      "wheel_name": "My Wheel",
      "spin_delay_seconds": 4,
      "timestamp": "2026-06-16T22:29:04.9845951-03:00"
    }
    ```

| Field | Notes |
|---|---|
| `wheel_id` | ID of the wheel being spun |
| `spin_delay_seconds` | Seconds between spin start and result. Matches the delay configured in the Wheel Spin settings |
| `timestamp` | Time the spin was initiated |

---

### handleWheelSpinResult

Fires when the spin result is determined, after the configured delay. Contains the winning item and its new history entry.

??? example "Example payload"
    ```json
    {
      "type": "wheel_spin_result",
      "timestamp": "2026-06-16T22:29:09.0173429-03:00",
      "wheel": {
        "id": "0fc719b6-b8ac-483d-a9b3-301cd3e30acc",
        "name": "My Wheel"
      },
      "item": {
        "id": "b586a720-7126-4534-a1cb-7edefda70810",
        "text": "I touch grass",
        "weight": 2,
        "quantity": 1,
        "is_infinite": true,
        "enabled": true,
        "index": 13,
        "action": null
      },
      "history": {
        "id": "adb436a1-6146-4a8f-8dd3-3c31d4ef292e",
        "status": "Pending",
        "created_at": "2026-06-16T22:29:08.9868905-03:00",
        "updated_at": "2026-06-16T22:29:08.9868906-03:00"
      }
    }
    ```

| Field | Notes |
|---|---|
| `item` | The winning wheel item. Same as items in `handleWheelData` |
| `item.action` | `null` for Manual items; see [`handleWheelData`](#handlewheeldata) for action field details |
| `history.id` | Unique ID for this spin history entry |
| `history.status` | Initial status of the spin: `Pending`, `Done`, or `Cancelled` |
| `history.created_at` | When the spin history entry was created |
| `timestamp` | Time the result was resolved |

---

### handleWheelSpinStatus

Fires when a spin history entry's status is changesd. Only manually by the user action.

??? example "Example payload"
    ```json
    {
      "type": "wheel_spin_status",
      "history_id": "adb436a1-6146-4a8f-8dd3-3c31d4ef292e",
      "status": "Done",
      "updated_at": "2026-06-16T22:36:09.106471-03:00",
      "wheel_item": {
        "id": "b586a720-7126-4534-a1cb-7edefda70810",
        "text": "I touch grass",
        "weight": 2,
        "quantity": 1,
        "is_infinite": true,
        "enabled": true,
        "index": 13,
        "action": null
      }
    }
    ```

| Field | Notes |
|---|---|
| `history_id` | ID of the spin history entry being updated. Matches `history.id` from [`handleWheelSpinResult`](#handlewheelspinresult) |
| `status` | New status of the entry: `Pending`, `Done`, or `Cancelled` |
| `updated_at` | Time the status change was applied |
| `wheel_item` | The wheel item this history entry is for. Same as items in [`handleWheelData`](#handlewheeldata) |

---

