---
title: Action Marketplace
description: Browse and download custom actions for SubathonManager.
---

# Action Marketplace

<div class="marketplace-intro" markdown>
Browse and download [custom actions](actions/index.md). You can download an action's `.sma` file and open it, or import it directly into SubathonManager.

Imported actions show up in the [Actions Manager](actions/index.md#actions-manager). After importing, check the action in the editor - steps that point at your own setup (OBS sources, VTube Studio hotkeys, Streamer.bot actions, etc.) may need re-picking, and any [secrets](actions/Globals.md#secrets) it uses need your own values.

Looking for overlays or widgets instead? See the [Overlay Marketplace](browse.md) and [Widget Marketplace](browse-widgets.md).

To submit your own actions, please make a forum post in the [discord](https://discord.gg/qp4Te3bQTk) or contact me another way.
</div>

<div id="marketplace"
     data-source="https://assets.subathonmanager.app/presets/actions/data"
     data-collection="actions"
     data-hash-key="action"
     data-noun="action"
     data-placeholder-icon="fa-solid fa-diagram-project">
  <div id="controls">
    <div class="controls-row">
      <input type="text" id="search" placeholder="Search..." />

      <button id="sort-toggle" class="sort-toggle">
        Sort by: Downloads ⬇
      </button>

    </div>

    <div id="author-tabs" class="mp-tabs"></div>
    <div id="tag-filters"></div>
  </div>
  <div id="gallery"></div>
  <div id="empty" style="display:none"
       data-unavailable="The action marketplace isn't live yet - check back soon!">
    No actions match your search.
  </div>
  <div id="pagination"></div>
</div>

<div id="modal-overlay" style="display:none">
  <div id="modal">
    <button id="modal-close">&times;</button>
    <div id="modal-previews"></div>
    <div id="modal-info">
      <div id="modal-header">
        <h2 id="modal-name"></h2>
        <div id="modal-meta"></div>
        <button id="modal-share" type="button" data-tooltip="Copy link">
          <i class="fa-solid fa-link"></i>
        </button>
        <div id="modal-tags"></div>
      </div>
      <p id="modal-description"></p>
      <div id="modal-actions">
        <a id="modal-download" href="#" download>
          ⬇ Download
        </a>
        <a id="modal-protocol" href="#" data-tooltip="Only available for v2.0.5+">
          ⚙ Import into App
        </a>
      </div>
      <p id="modal-appversion"></p>
    </div>
  </div>
  <div id="img-lightbox" style="display:none">
    <img id="lightbox-img" src="" alt="" />
  </div>
</div>
