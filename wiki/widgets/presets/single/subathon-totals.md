# Subathon Totals

[:fontawesome-brands-github: View Source](#TODOTODO){ .md-button } &nbsp;&nbsp;
**Author:** [WolfwithSword](https://github.com/WolfwithSword)

A customizable widget for displaying the total values for the subathon. You can show total subs/memberships, bits/tokens, follows, total donated, and number of orders for each compatible store. Each type can be shown or hidden, and filtered by event type - e.g. show Twitch subs but exclude gifted, or exclude YouTube memberships entirely.

Has both a **vertical** and **horizontal** layout. Horizontal view scales in width to match the widget width.

![Subathon Totals preview](https://assets.subathonmanager.app/docs/widgets/single/subathon-totals.png)

---

## Configuration

=== "CSS Variables"

    | Variable | Type | Description |
    |---|---|---|
    | `background-color` | color | Widget background colour |
    | `border-color` | color | Border colour |
    | `border-thickness` | size | Border thickness |
    | `font-size` | size | Primary font size |
    | `small-font-size` | size | Secondary/label font size |
    | `font-family` | string | Font family |
    | `text-color` | color | Main text colour |
    | `accent-color` | color | Accent colour for highlights |
    | `icon-color` | color | Icon colour |
    | `label-color` | color | Label text colour |
    | `row-gap` | size | Vertical gap between rows in vertical mode |
    | `col-gap` | size | Horizontal gap between items in horizontal mode |
    | `base-width` | size | Width of the panel in vertical mode |
    | `header-alignment` | alignment | Alignment of header text |
    | `value-alignment` | alignment | Alignment of value text |

=== "JS Variables"

    | Variable | Type | Description |
    |---|---|---|
    | `orientation` | StringSelect | Layout direction: `vertical` or `horizontal` |
    | `includeSimulated` | Boolean | Include simulated/test events in counts. Does not affect total donated - that always shows the raw total. |
    | `showSubs` | Boolean | Show the subs/memberships section |
    | `subsHeader` | String | Label for the subs section |
    | `subEvents` | [`SubEventTypeList`](../../Structure.md#js-variable-injection) | EventTypes to include in the sub count |
    | `subCountOffset` | Int | Offset to add or subtract from the sub total |
    | `showBitsTokens` | Boolean | Show the bits/tokens section |
    | `tokensHeader` | String | Label for the bits/tokens section |
    | `tokenEvents` | [`TokenEventTypeList`](../../Structure.md#js-variable-injection) | EventTypes to include in the token count |
    | `tokensCountOffset` | Int | Offset to add or subtract from the token total |
    | `showFollows` | Boolean | Show the follows section |
    | `followsHeader` | String | Label for the follows section |
    | `followEvents` | [`FollowEventTypeList`](../../Structure.md#js-variable-injection) | EventTypes to include in the follow count |
    | `followCountOffset` | Int | Offset to add or subtract from the follow total |
    | `showTotalDonated` | Boolean | Show the total donated section |
    | `donatedHeader` | String | Label for the donated section |
    | `donatedOffset` | Float | Offset to add or subtract from the donated total |
    | `showOrders` | Boolean | Show order count sections |
    | `ordersHeaderShowOrdersTag` | Boolean | If `true`, order headers show as "StoreName Orders". If `false`, shows only the store name. |
    | `orderEvents` | [`OrderEventTypeList`](../../Structure.md#js-variable-injection) | EventTypes to include in the order count |

---