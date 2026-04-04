Generic external services can push both Subs and Donations. Subs require values in their body unless their value matches a configured subscription name. Donations can be configured per converted currency dollar unit.

See [Development - External Services](../../Development.md#external-services) for integration details.

| Value | Description |
|---|---|
| **Donations** | Seconds per 1$, Points per 1$ (rounded down). 1$ of Default Currency after conversion. |
| **Subscriptions** | Seconds/Points per known/named subscription as configured, and default values. |

---