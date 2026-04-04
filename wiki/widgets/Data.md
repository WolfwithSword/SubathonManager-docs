
Implement only the functions you need. Each is called automatically when the corresponding WebSocket data is received.

| Function | `data.type` | Description |
|---|---|---|
| [`handleSubathonUpdate(data)`](#handlesubathonupdate) | `subathon_timer` | Timer, points, lock/pause status, multiplier - fires frequently |
| [`handleSubathonEvent(data)`](#handlesubathonevent) | `event` | Fired whenever an event is successfully processed |
| [`handleGoalsUpdate(data)`](#handlegoalsupdate) | `goals_list` | Goals list changes |
| [`handleGoalCompleted(data)`](#handlegoalcompleted) | `goal_completed` | A new goal is completed |
| [`handleSubathonDisconnect()`](#handlesubathondisconnect) | - | Socket disconnected from SubathonManager |
| [`handleValueConfig(data)`](#handlevalueconfig) | `value_config` | Seconds/points config updated |
| [`handleTotalsUpdate(data)`](#handletotalsupdate) | `subathon_totals` | Subathon totals updated |

See the [Overlay Websocket Data diagram](../Design.md#overlay-websocket-data) for field-level detail.

---

### handleSubathonUpdate

Fires very frequently - use for the timer display, points, lock/pause state, and multiplier values.

!!! note
    When `multiplier_points` or `multiplier_time` is `1`, no multiplier is active for that field.

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
| `type_true_source` | For simulated events, the original source type rather than `"Simulated"`. For GoAffPro orders, the GoAffProSource. |

??? info "TwitchHypeTrain event behaviour"

    For `event_type: TwitchHypeTrain`, the event is structured differently from other types - it is intended as a status signal, not a points/time event:

    - `seconds_added` and `points_added` will be `0`
    - `value` will be `start`, `progress`, or `end` (or `start ...` with multiplier details if one was started)
    - `amount` will be the current hype train level. `progress` is only sent when the level increases.
    - `user` will be your Twitch username

    Events are sent regardless of the auto-multiplier setting - only the `start` value is modified when auto-multiplier is enabled.

---

### handleGoalsUpdate

Fires when the goals list updates - new goals, changed goals, or point changes.

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
