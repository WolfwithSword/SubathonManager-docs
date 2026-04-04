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

    If you do want to support development, you can sponsor/tip at any of the following:
    
    - :fontawesome-brands-github: [GH Sponsor](https://github.com/sponsors/WolfwithSword)
    - <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" height="1em" width="1em" style="vertical-align:middle;"><title>Ko-fi</title><path fill="#BEC1C6" d="M11.351 2.715c-2.7 0-4.986.025-6.83.26C2.078 3.285 0 5.154 0 8.61c0 3.506.182 6.13 1.585 8.493 1.584 2.701 4.233 4.182 7.662 4.182h.83c4.209 0 6.494-2.234 7.637-4a9.5 9.5 0 0 0 1.091-2.338C21.792 14.688 24 12.22 24 9.208v-.415c0-3.247-2.13-5.507-5.792-5.87-1.558-.156-2.65-.208-6.857-.208m0 1.947c4.208 0 5.09.052 6.571.182 2.624.311 4.13 1.584 4.13 4v.39c0 2.156-1.792 3.844-3.87 3.844h-.935l-.156.649c-.208 1.013-.597 1.818-1.039 2.546-.909 1.428-2.545 3.064-5.922 3.064h-.805c-2.571 0-4.831-.883-6.078-3.195-1.09-2-1.298-4.155-1.298-7.506 0-2.181.857-3.402 3.012-3.714 1.533-.233 3.559-.26 6.39-.26m6.547 2.287c-.416 0-.65.234-.65.546v2.935c0 .311.234.545.65.545 1.324 0 2.051-.754 2.051-2s-.727-2.026-2.052-2.026m-10.39.182c-1.818 0-3.013 1.48-3.013 3.142 0 1.533.858 2.857 1.949 3.897.727.701 1.87 1.429 2.649 1.896a1.47 1.47 0 0 0 1.507 0c.78-.467 1.922-1.195 2.623-1.896 1.117-1.039 1.974-2.364 1.974-3.897 0-1.662-1.247-3.142-3.039-3.142-1.065 0-1.792.545-2.338 1.298-.493-.753-1.246-1.298-2.312-1.298"/></svg> [KoFi](https://ko-fi.com/wolfwithsword)
    - :fontawesome-brands-stripe: [Stripe](https://www.wolfwithsword.com/#/portal/support)

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

??? question "My widgets look weird"
    If you are experiencing problems with your widgets, please check [their troubleshooting page](widgets/troubleshooting/Troubleshooting.md)

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