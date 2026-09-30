---
title: Privacy Policy
description: How SubathonManager and this documentation site handle your data
---

# Privacy Policy

_Last updated: September 29, 2026_

SubathonManager is built to run locally. Your subathon data, settings, and connected accounts live on your computer, not on our servers. This page explains the few cases where data leaves your machine, and what this documentation site does.

"We", "us" and "our" refer to the SubathonManager project and its maintainer. "The app" means the SubathonManager desktop application. "The site" means this documentation site, including the Marketplace pages.

---

## Summary

- We do not sell, rent, or share your data, and there are no ads.
- Everything the app tracks (events, timers, goals, logs, settings) is stored locally on your computer.
- Anonymous usage data is **opt-in** and contains only your app version, a random install ID, and which integrations are active.
- Some service logins use our OAuth relay as a redirect URL. It passes your tokens back to your app and stores nothing.
- This site uses no cookies or trackers, only Cloudflare's basic, aggregate traffic analytics.

---

## The App

### Data stored on your computer

The app saves the following to its local data folder (**Settings -> Open Data Folder**):

- Configuration and settings
- Subathon data, including events, usernames and amounts from your connected platforms, timers, points, goals, and history
- Log files
- Overlays and widgets you have created or imported

Access tokens, API keys, and other credentials for connected services are kept in an encrypted file using your operating system's secure storage encryption where it is available.

We do not have access to any of this. To delete it, uninstall the app and delete the data folder.

### Optional anonymous data collection

On first launch, the app asks whether you want to send anonymous usage data. You can change this at any time from **Settings -> Data Collection**.

If you opt in, the app sends the following to `telemetry.subathonmanager.app` shortly after startup and then about once an hour:

| Data | Example | Purpose |
|---|---|---|
| Install ID | A random ID generated on first launch | Count unique installs without identifying anyone |
| App version | `2.0.4` | See which versions are in use |
| Integration status | `Twitch: connected`, `KoFi: disconnected` | See which services to prioritize |

No usernames, channel names, keys, tokens, event data, or other personal information is included. We don't store IP addresses. Requests pass through Cloudflare, which handles standard request data under the [Cloudflare Privacy Policy](https://www.cloudflare.com/privacypolicy/).

If you opt out, nothing is sent.

### OAuth login relay

Some services (such as Twitch, Tiltify, and FourthWall) need a redirect URL to grant the app access to your account. For these, `oauth.subathonmanager.app` acts as the callback/redirect URL.

When you click **Connect**, your browser opens the service's own login page, and you sign in with them, not with us. Once you approve access, the relay passes the resulting tokens back to your install of SubathonManager. Token refreshes work the same way.

**Nothing is kept.** The relay only provides the redirect and hands the tokens to your app. You can revoke the app's access at any time from the connected service's account settings.

### Direct connections to third parties

When you enable an integration, the app connects **directly** from your computer to that service using the credentials or keys you provide if applicable. Examples where it may not be applicable would be publicly available data that can be requested from the web.

Other features that make outbound connections:

| Feature | Connects to | When |
|---|---|---|
| Currency conversion | floatrates.com | When a donation needs converting and cached rates are older than 24 hours |
| Update check | GitHub | On launch or when you click **Check for Updates** |
| DevTunnels | Microsoft Azure DevTunnels | Only if you set it up, to receive webhooks from KoFi, FourthWall, Throne, etc. |
| Discord logging | Your Discord webhook(s) | Only if you configure them |
| Widget & overlay downloads | `assets.subathonmanager.app` | When you install something from the Marketplace on this site |

Each of these services has its own privacy policy, which governs the data they receive. We don't control them and aren't responsible for them.

Custom widgets may make connections to third parties, such as to import fonts. Custom widgets are a use-at-your-own-risk or self-developped, and are not considered part of the app - the exception being preset widgets included with the app, and they allow you to configure importing external fonts and to modify their code directly.

### Local web server

The app runs a web server on your computer to serve your overlays to OBS or other browser sources and to accept API calls. It is meant for use on your own machine or network. If you expose it to the internet (for example with port forwarding or a tunnel), you are responsible for securing it.

---

## This Documentation Site

This site is served through **Cloudflare**. We use Cloudflare's basic web analytics for site stability, security, and general traffic information, such as page views and which countries visitors come from. It is aggregate only. It doesn't use cookies, doesn't identify individual visitors, and we don't store IP addresses. See the [Cloudflare Privacy Policy](https://www.cloudflare.com/privacypolicy/) for how Cloudflare handles request data.

The site itself:

- Uses **no tracking or advertising**.
- Sets **no cookies**.
- Uses your browser's local storage only for convenience, such as remembering your light/dark theme and briefly caching release information for the download buttons. This never leaves your browser.

Pages load some resources from third parties, which will see standard request data from your browser:

- Fonts from Google Fonts
- Icons and scripts from cdnjs (Cloudflare) and the diagrams.net viewer
- Badges from shields.io and dcbadge
- Release information from the GitHub API
- Images, overlays, and widgets from `assets.subathonmanager.app`, which is considered as part of the site's resources.

### Marketplace

The Overlay and Widget Marketplace pages only list and let you download files. They don't require an account and don't collect anything about you. Download counts may be tracked, but not on a per-user or instanced basis.

New overlay and widget submissions are reviewed before they are listed. If you submit an overlay or widget through Discord, the name or handle you want credited may be shown publicly with your submission.

---

## Children

SubathonManager is a tool for streamers and is not directed at children. Because we don't collect personal information, we don't knowingly collect any from children. You must meet the age requirements of the streaming platforms you connect.

---

## Changes

If this policy changes, the updated version will be posted here with a new "Last updated" date. Significant changes to what the app collects will also be noted in the release notes.

---

## Contact

For privacy questions, reach out on the [Discord server](https://discord.gg/qp4Te3bQTk) or open an issue on [GitHub](https://github.com/WolfwithSword/SubathonManager/issues). See also the [FAQ](FAQ.md#general) and the [Terms of Service](Terms.md).
