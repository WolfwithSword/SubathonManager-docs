---
title: Widget Marketplace
description: Browse and download individual widgets for SubathonManager.
---

# Widget Marketplace

<div class="marketplace-intro" markdown>
Browse and download widgets. You can download a widget (or collection) and open it, or import it directly into SubathonManager.

Installed widgets can be found in the [Widget Browser](Usage.md#widget-browser), ready to use in any overlay. Note that already included preset widgets are also available here.


To submit your own widgets, please make a forum post in the [discord](https://discord.gg/qp4Te3bQTk) or contact me otherwise.

</div>

<div id="marketplace"
     data-source="https://assets.subathonmanager.app/presets/widgets/data"
     data-collection="widgets"
     data-hash-key="widget"
     data-noun="widget">
  <div id="controls">
    <div class="controls-row">
      <input type="text" id="search" placeholder="Search..." />

      <button id="sort-toggle" class="sort-toggle">
        Sort by: Downloads ⬇
      </button>

    </div>

    <div id="author-tabs" class="mp-tabs"></div>
    <div id="set-tabs" class="mp-tabs"></div>
    <div id="tag-filters"></div>
  </div>
  <div id="collection-actions"></div>
  <div id="gallery"></div>
  <div id="empty" style="display:none"
       data-unavailable="The widget marketplace isn't live yet - check back soon! Preset widgets are already installed with your install.">
    No widgets match your search.
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
        <a id="modal-protocol" href="#" data-tooltip="Only available for v2.0.0+">
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
