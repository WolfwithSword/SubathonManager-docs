# Frequently Asked Questions


## General

??? question "What is this?"
    SubathonManager is an all-in-one Subathon/Donothon Manager for Twitch, YouTube and more.
    
    Manage your timer, goals, overlays, settings, and more - all locally.

??? question "Why did you make it?"
    Quite honestly, I was tired of having to debug and patch or workaround a variety of other subathon timers with their issues and figured I could take a crack at it, focusing on areas that I have heard people wanted most. And I needed a new project.

    The hope? Try to eliminate "timer scuff".

??? question "How much does it cost?"
    Completely free.

??? question "Is this open source?"
    Yes.

    We use the AGPL-3-0-only license for the software, indicating source must be made available in any and all distributions, including over a network.

    At its core, we do not wish for this software to be gatekept behind commercial, service, or otherwise restrictive means, or to be used to take advantage of a user. Although that cannot be prevented, we still want to keep the code open and encourage contributions.

    You are fully permitted to use the software for commercial purposes, and encouraged for purposes such as streaming, or developing widget assets for sale. Modifications are allowed, provided they retain this license and make available the source, though contributions back are preferred!

    Custom widgets for overlays you develop can be licensed however you want and distributed however you want and are not considered part of this software. In fact, we encourage you to share and even commercialize widgets you make.

---

## Supported Connections & Features

??? question "Platforms"

    For streaming platforms, SubathonManager currently supports?

    - Twitch
        - Cheers/Bits (including combos & powerups)
        - Follows, raids
        - Subscriptions & gift subs
        - Charity donations
        - Chat commands
        - Automations:
            - Lock/pause on stream end
            - Unlock/resume on stream start
        - Hype Trains (with optional automatic multiplier mode)
    - YouTube
        - SuperChats
        - Memberships (All tiers)
        - Gift Memberships
        - Chat Commands
    - Picarto
        - Follows
        - Subscriptions & gift subs
        - Kudos Tips
        - Chat Commands

    Plenty of platforms and integrations are supported, and I would recommend looking at the [configuration](Configuration.md) for more details, but here are a few:

    - Twitch, YouTube, Picarto  
    - StreamElements, StreamLabs, Blerp  
    - GoAffPro affiliate stores  
        - GamerSupps, UwUMarket, Orchid Eight, KatDragonz  
    - KoFi (via streamerbot integration)  
    - Custom External Services - make your own!

??? question "Integrations"

    Currently, we support the following integrations natively or with provided extensions.

    - StreamElements
    - StreamLabs
    - Blerp
    - GoAffPro Affiliate Store Orders
        - GamerSupps
        - UwUMarket
        - Orchid Eight
        - KatDragonz
    - KoFi (via streamerbot integration)
      - Tips & Memberships

    And a system for custom external integrations via API.

??? question "Features?"
    SubathonManager has quite a few features:

    - Default behaviour, Subathon Timer Mode (with points)  
    - Donation based "Donothon" support and goals  
    - Currency Conversion  
    - Built in overlay editor and browser source host  
    - Audit & Event logging to file, export CSV, or discord webhooks  
    - Goals list and progress tracking  
    - Multiplier modes for time and/or points with optional duration  
    - External API control for pushing custom events, custom integrations, or modifying configuration  
    - Reverse Subathon option  
    - And more!

??? question "Currency Conversion?"
    Yes, we use floatrates to get an approximate currency conversion for any incoming donation to your configured default currency.

    These rates update globally approximately every 12 hours, but our app only fetches new data per request then keeps it for 24 hours. While not perfect, this should be a good enough estimate for currency conversion at time of donation.

---

## Widgets

??? question "Where do I get widgets?"
    You can find a selection of premade widgets in the `presets` folder after installing. 

??? question "Can I make my own widgets?"
    Yes! We have a slew of documentation for this [here](Widget-Development.md).

    If you want to customize a preset beyond what the UI configuration allows, I recommend copying its source files somewhere else, so as to not wipe your changes if you update SubathonManager. Anything changed via the UI will never be overwritten like this.

??? question "Can I share or sell my custom widgets?"
    Yes! In fact, we encourage this.

    You have full rights to the files you make for custom widgets and overlays for SubathonManager.

    Our only ask is that, in the spirit of this program, you refrain from selling widgets that were made with the use of AI or AI assistance. Ideally, given the [development spec](Widget-Development.md), custom widgets can be made or commissioned by a human developer and/or artist.

---

## Support

??? question "Linux? Mac?"
    While this is a primarily Windows application, tweaks have been made and users have reported that it can work under WINE or Steam Proton.

    Not everything is tested or guaranteed to work — for example, the widget editor embedded preview will instead show a button to open it in your browser. Aside from that, most things should work.

??? question "Roadmap?"
    Currently planned features are (mostly) created as issues over on the [main repository](https://github.com/WolfwithSword/SubathonManager/issues). However, please contact me if you have any suggestions that are not over there!

??? question "Contact"
    For questions, issues, or other, you can leave an issue or discussion in the repo.

    Alternatively, you can contact me through Discord.

    ![](https://dcbadge.limes.pink/api/shield/153961246910185472?theme=discord-inverted)  
    [![](https://dcbadge.limes.pink/api/server/r8FUvUdCpP)](https://discord.gg/r8FUvUdCpP)