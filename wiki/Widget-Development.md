# Widget Development

You can develop your own widgets by either modifying the existing [presets](https://github.com/WolfwithSword/SubathonManager/tree/main/presets) or building your own from scratch.

For custom widgets, you only need to implement certain function names to accept data pushed to each widget - the internal WebSocket connection is handled automatically.

Each widget is treated as an isolated iframe within an overlay, and will automatically connect to the localhost WebSocket.

!!! tip "Start from a preset"
    It is recommended to look at the existing [presets](https://github.com/WolfwithSword/SubathonManager/tree/main/presets) as a guide before building from scratch.

---

## Redistribution

As a widget developer, you have full rights to your developed widget(s) and associated files. You are free to redistribute your widgets, commercially or not, as you wish.

SubathonManager aims to be an open ecosystem for creatives, artists, hobbyists, and content creators. While the program itself is non-commercial and should not be redistributed, widgets are perfectly fine to share and sell.

!!! note "A note on AI assistance"
    Although, in the spirit of this project and in support of creatives and developers, we ask you to not use AI to assist in development of your widgets.