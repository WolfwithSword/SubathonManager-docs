---
title: Overlay Marketplace
description: Browse and download overlay themes for SubathonManager.
---

# Overlay Marketplace

Browse and download premade overlays. Click an overlay to preview it, then download directly or open it straight in SubathonManager if you have it installed.

These overlays are meant to serve as starting points before customization, or ready to go!

To submit your own overlays to be included, please make a forum post in the [discord](https://discord.gg/qp4Te3bQTk).

<div id="marketplace">
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
  <div id="empty" style="display:none">No overlays match your search.</div>
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
        <a id="modal-protocol" href="#" data-tooltip="Only available for v1.1.1+">
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

<style>

.md-content h1 .headerlink,
.md-content h2 .headerlink {
  display: none;
}

.md-main__inner.md-grid {
  max-width: 82rem !important; /*initial !important;*/
}

#lightbox-img {
  pointer-events: none;
  cursor: default;
}


#marketplace {
  margin-top: 1.5rem;
}

#controls {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.controls-row {
  display: flex;
  gap: 0.75rem;
  align-items: center;
  flex-wrap: wrap;
}

#search {
  flex: 1;
  width: 100%;
  max-width: 400px;
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--md-default-fg-color--lightest);
  border-radius: 6px;
  background: var(--md-default-bg-color);
  color: var(--md-default-fg-color);
  font-size: 0.9rem;
}

#tag-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag-btn {
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  border: 1px solid var(--md-primary-fg-color);
  background: transparent;
  color: var(--md-primary-fg-color);
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.15s;
}

.tag-btn.active,
.tag-btn:hover {
  background: var(--md-primary-fg-color);
  color: var(--md-primary-bg-color);
}

#gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.25rem;
  max-width: 100%;
}

/* @media (min-width: 1200px) {
  #gallery {
    grid-template-columns: repeat(4, 1fr);
  }
} */

.theme-card {
  border-radius: 10px;
  overflow: hidden;
  border: 2px solid var(--md-default-fg-color--lightest);
  background: var(--md-default-bg-color);
  cursor: pointer;
  transition: transform 0.15s, box-shadow 0.15s, opacity 0.15s;
}

.theme-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
}

.theme-card img {
  width: 100%;
  aspect-ratio: 16/9;
  object-fit: cover;
  display: block;
  background: var(--md-default-fg-color--lightest);
}

.theme-card-body {
  padding: 0.75rem 1rem;
}

.theme-card-body h3 {
  margin: 0 0 0.25rem;
  font-size: 1rem;
}

.theme-card-body .author {
  font-size: 0.8rem;
  color: var(--md-default-fg-color--light);
  margin-bottom: 0.5rem;
}

.theme-card-body .card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.tag-pill {
  font-size: 0.7rem;
  padding: 0.15rem 0.5rem;
  border-radius: 999px;
  background: var(--md-primary-fg-color--light);
  color: var(--md-primary-bg-color);
}

#modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.7);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

#modal {
  background: var(--md-default-bg-color);
  border-radius: 12px;
  max-width: 1100px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  display: grid;
  grid-template-columns: 2fr 1fr;
  position: relative;
  box-shadow: 0 24px 64px rgba(0,0,0,0.4);
}

@media (max-width: 600px) {
  #modal { grid-template-columns: 1fr; }
}
#modal-share {
  position: absolute;
  top: 2.65rem;
  right: 0.51rem;

  width: 34px;
  height: 34px;

  border-radius: 8px;
  border: 0px solid rgba(0, 0, 0, 0);

  background: rgba(0, 0, 0, 0);
  backdrop-filter: blur(6px);

  color: var(--md-default-fg-color);

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  transition: all 0.15s;
  z-index: 2;
}

#modal-share:hover {
  transform: scale(1.03);
  opacity: 0.9;
}

#modal-share:hover::after {
  content: attr(data-tooltip);
  position: absolute;
  top: 15%;
  left: 50%;
  transform: translateX(-130%);

  background: rgba(0,0,0,0.85);
  color: white;

  padding: 4px 6px;
  font-size: 11px;
  border-radius: 6px;

  white-space: nowrap;
  pointer-events: none;
}

#modal-close {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--md-default-fg-color);
  z-index: 1;
  line-height: 1;
}

.preview-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  background: black;
}
.nav-btn {
  position: absolute;
  bottom: 10px;

  width: 32px;
  height: 32px;

  border: none;
  border-radius: 8px;

  background: rgba(20, 20, 20, 0.55);
  backdrop-filter: blur(6px);

  color: white;
  font-size: 18px;
  font-weight: bold;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;

  transition: opacity 0.15s, transform 0.1s;
  z-index: 5;
}

.nav-btn:hover {
  opacity: 0.9;
  transform: scale(1.05);
}

.nav-btn.left {
  left: 10px;
}

.nav-btn.right {
  right: 10px;
}

.preview-wrapper:hover .nav-btn {
  opacity: 1;
}

.nav-btn {
  opacity: 0;
}

a.glightbox {
  pointer-events: none;
}

#modal-previews {
  border-radius: 12px 0 0 12px;
  overflow: hidden;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

#modal-main-img {
  width: 100%;
  flex: 1;
  object-fit: cover;
  min-height: 280px;
  object-position: center;
  cursor: zoom-in;
  display: block;
  background: #000;
  transition: transform 0.2s ease;
}

#modal-main-img:hover {
  transform: scale(1.02);
}

#modal-previews img {
  width: 100%;
  display: block;
  cursor: pointer;
}

#img-lightbox {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.92);
  z-index: 99999;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: zoom-out;
}

#img-lightbox img {
  max-width: 95vw;
  max-height: 95vh;
  object-fit: contain;
  border-radius: 4px;
}

.preview-thumbs {
  display: flex;
  gap: 4px;
  padding: 4px;
  background: rgba(0,0,0,0.3);
}

.preview-thumbs img {
  width: 60px;
  height: 40px;
  object-fit: cover;
  border-radius: 4px;
  opacity: 0.6;
  cursor: pointer;
  transition: opacity 0.15s;
}

.preview-thumbs img.active,
.preview-thumbs img:hover {
  opacity: 1;
}

#modal-info {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

#modal-name {
  margin: 0;
  font-size: 1.4rem;
}

#modal-meta {
  font-size: 0.85rem;
  color: var(--md-default-fg-color--light);
}

#modal-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin-top: 2px;
}

#modal-description {
  font-size: 0.85rem;
  line-height: 1.4;
  margin: 0;
  flex: 1;
}

#modal-actions {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

#modal-download,
#modal-protocol {
  display: block;
  text-align: center;
  padding: 0.6rem 1rem;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none !important;
  transition: opacity 0.15s;
}

#modal-download {
  background: var(--md-primary-fg-color);
  color: var(--md-primary-bg-color) !important;
}

#modal-protocol {
  border: 1px solid var(--md-primary-fg-color);
  color: var(--md-primary-fg-color) !important;
  position: relative;
}

#modal-protocol:hover::after {
  content: attr(data-tooltip);
  position: absolute;
  top: 120%;
  left: 50%;
  transform: translateX(-50%);

  background: rgba(0,0,0,0.85);
  color: white;
  padding: 6px 8px;
  font-size: 12px;
  border-radius: 6px;
  white-space: nowrap;

  pointer-events: none;
}

#modal-download:hover,
#modal-protocol:hover {
  opacity: 0.85;
}

#modal-appversion {
  font-size: 0.55rem;
  color: var(--md-default-fg-color--light);
  margin: 0;
}

#empty {
  text-align: center;
  padding: 3rem;
  color: var(--md-default-fg-color--light);
}

.card-image-wrapper {
  position: relative;
}

.download-badge {
  position: absolute;
  bottom: 6px;
  right: 6px;
  background: rgba(0,0,0,0.65);
  backdrop-filter: blur(6px);
  color: white;
  font-size: 0.75rem;
  padding: 3px 6px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 4px;
  pointer-events: none;
  transform: scale(1);
  opacity: 0.65;
  transition: transform 0.15s ease, opacity 0.15s ease;
}

.badge-new {
  position: absolute;
  top: 8px;
  left: 8px;
  background: #7b68f3d5;
  transform: scale(1);
  opacity: 0.85;
  color: white;
  font-size: 0.65rem;
  font-weight: 700;
  padding: 3px 6px;
  border-radius: 6px;
  z-index: 2;
  box-shadow: 0 2px 8px rgba(0,0,0,0.25);
}

.theme-card:hover .download-badge {
  transform: scale(1.05);
  opacity: 0.85;
}.theme-card:hover .badge-new {
  transform: scale(1.05);
  opacity: 0.95;
}

.sort-toggle {
  padding: 0.45rem 0.75rem;
  border-radius: 6px;

  border: 1px solid var(--md-primary-fg-color);
  background: transparent;
  color: var(--md-primary-fg-color);

  font-size: 0.8rem;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.15s;
}

.sort-toggle:hover {
  background: var(--md-primary-fg-color);
  color: var(--md-primary-bg-color);
}

#pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1.5rem;
  flex-wrap: wrap;
}

.page-btn {
  padding: 0.35rem 0.75rem;
  border-radius: 6px;
  border: 1px solid var(--md-primary-fg-color);
  background: transparent;
  color: var(--md-primary-fg-color);
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.15s;
  min-width: 36px;
}

.page-btn:hover {
  background: var(--md-primary-fg-color);
  color: var(--md-primary-bg-color);
}

.page-btn.active {
  background: var(--md-primary-fg-color);
  color: var(--md-primary-bg-color);
  font-weight: 600;
}

.page-btn:disabled {
  opacity: 0.35;
  cursor: default;
  pointer-events: none;
}

</style>