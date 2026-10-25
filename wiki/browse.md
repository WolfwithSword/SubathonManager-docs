---
title: Overlay Marketplace
description: Browse and download overlay themes for SubathonManager.
---

# Overlay Marketplace

<div class="marketplace-intro" markdown>
Browse and download premade overlays. These overlays can serve as starting points before customization, or be ready to go!

Looking for individual widgets instead of whole overlays? See the [Widget Marketplace](browse-widgets.md). For automations, see the [Action Marketplace](browse-actions.md).

To submit your own overlays to be included, please make a forum post in the [discord](https://discord.gg/qp4Te3bQTk).
</div>

<div id="marketplace"
     data-source="https://assets.subathonmanager.app/presets/overlays/data"
     data-collection="overlays"
     data-hash-key="overlay"
     data-noun="overlay">
  <div id="controls">
    <div class="controls-row">
      <input type="text" id="search" placeholder="Search..." />

      <button id="sort-toggle" class="sort-toggle">
        Sort by: Downloads ⬇
      </button>
    </div>

    <div id="tag-filters"></div>
  </div>
  <div id="gallery"></div>
  <div id="empty" style="display:none"
       data-unavailable="The overlay marketplace is unavailable right now. Please try again later.">
    No overlays match your search.
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
        <a id="modal-protocol" href="#" data-tooltip="Only available for v1.2.0+">
          ⚙ Open in App
        </a>
      </div>
      <p id="modal-appversion"></p>
    </div>
  </div>
  <div id="img-lightbox" style="display:none">
    <img id="lightbox-img" src="" alt="" />
  </div>
</div>
