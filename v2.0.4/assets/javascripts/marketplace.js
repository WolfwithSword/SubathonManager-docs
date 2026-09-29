const DL_PROTOCOL = "subathonmanager://import?url=";

const MARKETPLACE_DEFAULTS = {
  source: "https://assets.subathonmanager.app/presets/overlays/data",
  collection: "overlays",
  hashKey: "overlay",
  noun: "overlay"
};

let marketConfig = { ...MARKETPLACE_DEFAULTS };
let allThemes = [];
let activeTag = null;
let searchQuery = "";
let lightboxOpen = false;
let currentLightboxSrc = null;
let currentPreviewIndex = 0;
let currentPreviews = [];
let sortMode = "default"; // "default" | "downloads"
let activeAuthor = null;
let activeGroup = null;
let currentPage = 1;
let globalListenersBound = false;
let tabData = { author: [], set: [] };
let pickerKind = null;
const PAGE_SIZE = 12;
const CHIP_LIMIT = 5;

function initMarketplace() {
  const root = document.getElementById("marketplace");
  if (!root) return;

  if (root.dataset.initialized) return;
  root.dataset.initialized = "true";

  marketConfig = {
    source: root.dataset.source || MARKETPLACE_DEFAULTS.source,
    collection: root.dataset.collection || MARKETPLACE_DEFAULTS.collection,
    hashKey: root.dataset.hashKey || MARKETPLACE_DEFAULTS.hashKey,
    noun: root.dataset.noun || MARKETPLACE_DEFAULTS.noun
  };

  allThemes = [];
  activeTag = null;
  searchQuery = "";
  sortMode = "default";
  activeAuthor = null;
  activeGroup = null;
  tabData = { author: [], set: [] };
  currentPage = 1;
  closePicker();

  setupListeners();
  loadThemes();
  initIntroCollapse();
}


function registerInit() {
  if (typeof document$ !== "undefined") {
    document$.subscribe(initMarketplace);
  } else {
    document.addEventListener("DOMContentLoaded", initMarketplace);
  }
}

registerInit();

async function loadThemes() {
  try {
    const res = await fetch(marketConfig.source);
    if (!res.ok) throw new Error(`Source returned ${res.status}`);

    const data = await res.json();
    allThemes = data[marketConfig.collection] || [];
  } catch {
    allThemes = [];
    showUnavailable();
    return;
  }

  renderGallery();
  openFromHash();
}

function showUnavailable() {
  const gallery = document.getElementById("gallery");
  const empty = document.getElementById("empty");
  const controls = document.getElementById("controls");

  if (gallery) gallery.innerHTML = "";
  if (controls) controls.style.display = "none";
  if (empty) {
    empty.textContent = empty.dataset.unavailable ||
      `Nothing here yet - check back soon.`;
    empty.style.display = "block";
  }

  renderPagination(0, 0);
}

function setupListeners() {
  const search = document.getElementById("search");

  if (search && !search.dataset.bound) {
    search.dataset.bound = "true";

    search.addEventListener("input", e => {
      searchQuery = e.target.value;
      currentPage = 1;
      renderGallery();
    });
  }

  const toggle = document.getElementById("sort-toggle");

  function updateSortLabel() {
    toggle.textContent =
      sortMode === "downloads"
        ? "Sort by: Default"
        : "Sort by: Downloads ⬇";
  }

  if (toggle && !toggle.dataset.bound) {
    toggle.dataset.bound = "true";

    updateSortLabel();

    toggle.addEventListener("click", () => {
      sortMode = sortMode === "default" ? "downloads" : "default";
      currentPage = 1;
      updateSortLabel();
      renderGallery();
    });
  }

  if (globalListenersBound) return;
  globalListenersBound = true;

  window.addEventListener("popstate", () => {
    const hash = new URLSearchParams(window.location.hash.slice(1));
    const slug = hash.get(marketConfig.hashKey);

    if (!slug) {
      closeModal();
      return;
    }

    const index = allThemes.findIndex(t =>
      slugify(t.name) === slug
    );

    if (index !== -1) {
      openModal(index);
    }
  });

  document.addEventListener("click", (e) => {

    if (e.target.id === "next-img") nextPreview();
    if (e.target.id === "prev-img") prevPreview();

    const more = e.target.closest("[data-more]");
    if (more) {
      openPicker(more.dataset.more);
      return;
    }

    const pick = e.target.closest("[data-pick]");
    if (pick) {
      const value = pick.dataset.pick;

      if (pickerKind === "author") {
        activeAuthor = value;
        activeGroup = null;
      } else {
        activeGroup = value;
      }

      currentPage = 1;
      closePicker();
      renderGallery();
      return;
    }

    const chip = e.target.closest(".mp-chip");
    if (chip) {
      const value = chip.dataset.value || null;

      if (chip.dataset.tab === "author") {
        activeAuthor = value;
        activeGroup = null;
      } else {
        activeGroup = value;
      }

      currentPage = 1;
      renderGallery();
      return;
    }

    const card = e.target.closest(".theme-card");
    if (card) {
      openModal(parseInt(card.dataset.index));
      return;
    }

    const lightboxTarget = e.target.closest("[data-lightbox]");
    if (lightboxTarget) {
        const src = lightboxTarget.src;

        if (lightboxOpen && currentLightboxSrc === src) {
            closeLightbox();
        } else {
            openLightbox(src);
        }

        return;
    }

    const thumb = e.target.closest("[data-preview-src]");
    if (thumb) {
      switchPreview(thumb.dataset.previewSrc, thumb);
      return;
    }

    if (e.target.id === "modal-overlay") {
      closeModal();
    }

    if (e.target.id === "modal-close") {
      closeModal();
    }

    const lightbox = document.getElementById("img-lightbox");

    if (!lightbox || lightbox.style.display !== "flex") return;
    if (e.target.id === "img-lightbox" || e.target.id === "lightbox-img") {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (e) => {
    const activeTag = document.activeElement?.tagName;
    if (activeTag === "INPUT" || activeTag === "TEXTAREA") return;
    const lightboxOpenNow = document.getElementById("img-lightbox")?.style.display === "flex";

    if (!lightboxOpenNow) return;

    switch (e.key) {
        case "Escape":
        closeLightbox();
        break;
        case "ArrowRight":
        cycleLightbox(1);
        break;
        case "ArrowLeft":
        cycleLightbox(-1);
        break;
    }
  });

  document.addEventListener("keydown", (e) => {
    const activeTag = document.activeElement?.tagName;
    if (activeTag === "INPUT" || activeTag === "TEXTAREA") return;
    const modalOpen = document.getElementById("modal-overlay")?.style.display === "flex";
    const lightboxOpenNow = document.getElementById("img-lightbox")?.style.display === "flex";

    if (lightboxOpenNow) {
        if (e.key === "Escape") {
        closeLightbox();
        }
        return;
    }

    if (!modalOpen) return;

    switch (e.key) {
        case "ArrowRight":
        nextPreview();
        break;

        case "ArrowLeft":
        prevPreview();
        break;

        case "Escape":
        closeModal();
        break;
    }
    });
}

function cycleLightbox(dir) {
  if (!currentPreviews.length) return;

  let currentIndex = currentPreviews.indexOf(currentLightboxSrc);
  if (currentIndex === -1) currentIndex = 0;

  currentIndex = (currentIndex + dir + currentPreviews.length) % currentPreviews.length;

  const nextSrc = currentPreviews[currentIndex];
  openLightbox(nextSrc);
}

function renderGallery() {
  const gallery = document.getElementById("gallery");
  const empty = document.getElementById("empty");
  if (!gallery || !empty) return;

  const q = searchQuery.toLowerCase();

  const searched = allThemes.filter(t => {
    const matchesTag = !activeTag || (t.tags || []).includes(activeTag);
    const matchesSearch =
      !q ||
      t.name.toLowerCase().includes(q) ||
      (t.description || "").toLowerCase().includes(q) ||
      (t.author || "").toLowerCase().includes(q) ||
      (t.group || "").toLowerCase().includes(q);
    return matchesTag && matchesSearch;
  });

  renderTabs(searched);

  let filtered = searched;
  if (activeAuthor) filtered = filtered.filter(t => fieldOf(t, "author") === activeAuthor);
  if (activeGroup) filtered = filtered.filter(t => fieldOf(t, "group") === activeGroup);

  renderCollectionActions(filtered);

  if (sortMode === "downloads") {
    filtered.sort((a, b) => (b.downloads || 0) - (a.downloads || 0));
  }
  else {
    filtered.sort((a, b) =>
      (b.created || "").localeCompare(a.created || "")
    );
  }

  if (!filtered.length) {
    gallery.innerHTML = "";
    empty.style.display = "block";
    renderPagination(0, 0);
    return;
  }

  empty.style.display = "none";

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);

  if (currentPage > totalPages) currentPage = totalPages;

  const start = (currentPage - 1) * PAGE_SIZE;
  const pageItems = filtered.slice(start, start + PAGE_SIZE);

  gallery.innerHTML = pageItems.map(cardHtml).join("");

  renderPagination(currentPage, totalPages);
}

function cardHtml(t) {
  return `
    <div class="theme-card" data-index="${allThemes.indexOf(t)}">
      <div class="card-image-wrapper">

        ${isNew(t.created) ? `<div class="badge-new">New</div>` : ""}
        <img src="${t.preview}" alt="${escAttr(t.name)}" loading="lazy" />
        <div class="download-badge">
          ⬇ ${t.downloads != null && t.downloads >= 0 ? t.downloads : '?'}
        </div>
      </div>
      <div class="theme-card-body">
        <h3>${esc(t.name)}</h3>
        <div class="author">by ${esc(t.author || "Unknown")} · v${esc(t.version || "?")}${t.group ? ` · ${esc(t.group)}` : ""}</div>
        <div class="card-tags">
          ${(t.tags || []).map(tag => `<span class="tag-pill">${esc(tag)}</span>`).join("")}
        </div>
      </div>
    </div>
  `;
}

function esc(s) {
  return String(s ?? "").replace(/[&<>"']/g, c =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

const escAttr = esc;

function fieldOf(item, key) {
  return (item[key] || "").trim() || "Unknown";
}

function groupItems(items, key) {
  const map = new Map();

  for (const item of items) {
    const label = fieldOf(item, key);
    if (!map.has(label)) map.set(label, []);
    map.get(label).push(item);
  }

  return [...map.entries()].sort((a, b) =>
    a[0].localeCompare(b[0], undefined, { sensitivity: "base" }));
}

function chip(value, label, count, active, kind) {
  return `<button class="tag-btn mp-chip${active ? " active" : ""}"
    data-tab="${kind}" data-value="${escAttr(value ?? "")}"
    >${esc(label)}<span class="mp-count">${count}</span></button>`;
}

const COLLECTION_BASE =
  "https://assets.subathonmanager.app/presets/widgets/collections/";

function collectionBtn(href, label, count) {
  return `<span class="mp-collection-group">
    <a class="mp-collection" href="${escAttr(href)}" download>
      <span>⬇ ${esc(label)}</span>
      <span class="mp-count">${count} widget${count === 1 ? "" : "s"}</span>
    </a>
    <a class="mp-collection-protocol" href="${escAttr(DL_PROTOCOL + href)}"
       data-tooltip="Installs all ${count} into your Widget Browser · v2.0.0+"
       >⚙ Import into App</a>
  </span>`;
}

function renderCollectionActions(items) {
  const el = document.getElementById("collection-actions");
  if (!el) return;

  el.innerHTML = "";
  if (searchQuery.trim() || !items.length) return;

  const authors = [...new Set(items.map(t => fieldOf(t, "author")))];
  const buttons = [];

  if (activeGroup) {
    const author = activeAuthor || (authors.length === 1 ? authors[0] : null);

    if (author) {
      buttons.push(collectionBtn(
        `${COLLECTION_BASE}${encodeURIComponent(author)}/${encodeURIComponent(activeGroup)}.smwc`,
        `Download ${activeGroup} collection`,
        items.length));
    }
  }

  if (activeAuthor && !activeGroup) {
    buttons.push(collectionBtn(
      `${COLLECTION_BASE}${encodeURIComponent(activeAuthor)}.smwc`,
      `Download everything by ${activeAuthor}`,
      items.length));
  }

  el.innerHTML = buttons.join("");
}

function renderTabs(items) {
  const authorRow = document.getElementById("author-tabs");
  const setRow = document.getElementById("set-tabs");
  if (!authorRow) return;

  const authors = groupItems(items, "author");

  if (activeAuthor && !authors.some(([a]) => a === activeAuthor)) {
    activeAuthor = null;
    activeGroup = null;
  }

  tabData.author = authors;
  authorRow.innerHTML = authors.length < 2
    ? ""
    : chipRow("author", authors, items.length, activeAuthor, "All authors");

  if (!setRow) return;

  const scoped = activeAuthor
    ? items.filter(t => fieldOf(t, "author") === activeAuthor)
    : items;

  const sets = groupItems(scoped, "group").filter(([g]) => g !== "Unknown");

  if (activeGroup && !sets.some(([g]) => g === activeGroup)) activeGroup = null;

  tabData.set = sets;
  setRow.innerHTML = sets.length < 2
    ? ""
    : chipRow("set", sets, scoped.length, activeGroup, "All sets");
}

function chipRow(kind, all, total, activeValue, allLabel) {
  const parts = [chip(null, allLabel, total, !activeValue, kind)];

  if (all.length <= CHIP_LIMIT) {
    parts.push(...all.map(([label, list]) =>
      chip(label, label, list.length, activeValue === label, kind)));
    return parts.join("");
  }

  const shown = [];
  const pinned = activeValue && all.find(([label]) => label === activeValue);
  if (pinned) shown.push(pinned);

  for (const entry of [...all].sort((a, b) => b[1].length - a[1].length)) {
    if (shown.length >= CHIP_LIMIT) break;
    if (shown.some(([label]) => label === entry[0])) continue;
    shown.push(entry);
  }

  shown.sort((a, b) => a[0].localeCompare(b[0], undefined, { sensitivity: "base" }));

  parts.push(...shown.map(([label, list]) =>
    chip(label, label, list.length, activeValue === label, kind)));

  parts.push(`<button class="tag-btn mp-chip mp-more" data-more="${kind}"
    >More...<span class="mp-count">${all.length}</span></button>`);

  return parts.join("");
}

function ensurePicker() {
  if (document.getElementById("mp-picker-overlay")) return;

  const wrap = document.createElement("div");
  wrap.innerHTML = `
    <div id="mp-picker-overlay" style="display:none" role="dialog" aria-modal="true">
      <div id="mp-picker">
        <button id="mp-picker-close" type="button" aria-label="Close">&times;</button>
        <h3 id="mp-picker-title"></h3>
        <input type="text" id="mp-picker-search" placeholder="Filter..." />
        <div id="mp-picker-list"></div>
      </div>
    </div>`;

  document.body.appendChild(wrap.firstElementChild);

  document.getElementById("mp-picker-overlay").addEventListener("click", e => {
    if (e.target.id === "mp-picker-overlay" || e.target.id === "mp-picker-close") closePicker();
  });

  document.getElementById("mp-picker-search").addEventListener("input", e => {
    renderPickerList(e.target.value);
  });

  document.addEventListener("keydown", e => {
    if (e.key !== "Escape") return;
    if (document.getElementById("mp-picker-overlay")?.style.display === "flex") closePicker();
  });
}

function openPicker(kind) {
  ensurePicker();
  pickerKind = kind;

  document.getElementById("mp-picker-title").textContent =
    kind === "author" ? "All authors" : "All sets";

  const search = document.getElementById("mp-picker-search");
  search.value = "";
  renderPickerList("");

  document.getElementById("mp-picker-overlay").style.display = "flex";
  search.focus();
}

function renderPickerList(query) {
  const list = document.getElementById("mp-picker-list");
  if (!list) return;

  const needle = (query || "").toLowerCase();
  const active = pickerKind === "author" ? activeAuthor : activeGroup;
  const rows = (tabData[pickerKind] || [])
    .filter(([label]) => label.toLowerCase().includes(needle));

  list.innerHTML = rows.length
    ? rows.map(([label, items]) => `
        <button class="mp-picker-item${active === label ? " active" : ""}" data-pick="${escAttr(label)}">
          <span>${esc(label)}</span><span class="mp-count">${items.length}</span>
        </button>`).join("")
    : `<div class="mp-picker-empty">No matches</div>`;
}

function closePicker() {
  const el = document.getElementById("mp-picker-overlay");
  if (el) el.style.display = "none";
  pickerKind = null;
}

function renderPagination(current, total) {
  const el = document.getElementById("pagination");
  if (!el) return;

  if (total <= 1) {
    el.innerHTML = "";
    return;
  }

  const pages = new Set([1, total, current, current - 1, current + 1].filter(p => p >= 1 && p <= total));
  const sorted = [...pages].sort((a, b) => a - b);

  let html = `<button class="page-btn" ${current === 1 ? "disabled" : ""}
    onclick="goToPage(${current - 1})">‹</button>`;

  let prev = null;
  for (const p of sorted) {
    if (prev !== null && p - prev > 1) {
      html += `<span style="color:var(--md-default-fg-color--light);padding:0 4px">...</span>`;
    }
    html += `<button class="page-btn ${p === current ? "active" : ""}"
      onclick="goToPage(${p})">${p}</button>`;
    prev = p;
  }

  html += `<button class="page-btn" ${current === total ? "disabled" : ""}
    onclick="goToPage(${current + 1})">›</button>`;

  el.innerHTML = html;
}

function goToPage(page) {
  currentPage = page;
  renderGallery();
  document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

window.goToPage = goToPage;

function showPreview(index) {
  if (!currentPreviews.length) return;

  currentPreviewIndex =
    (index + currentPreviews.length) % currentPreviews.length;

  const src = currentPreviews[currentPreviewIndex];

  document.getElementById("modal-main-img").src = src;

  const thumbs = document.querySelectorAll("#modal-previews [data-preview-src]");
    thumbs.forEach((img, i) => {
    img.classList.toggle("active", img.dataset.previewSrc === currentPreviews[currentPreviewIndex]);
  });
}

function nextPreview() {
  showPreview(currentPreviewIndex + 1);
}

function prevPreview() {
  showPreview(currentPreviewIndex - 1);
}

function openModal(index) {
  const t = allThemes[index];

  const previews = t.previews?.length ? t.previews : [t.preview];

  currentPreviews = previews;
  currentPreviewIndex = 0;

  document.getElementById("modal-name").textContent = t.name;
  document.getElementById("modal-meta").innerHTML = `
    by ${t.author || "Unknown"} · v${t.version || "?"}`;

  document.getElementById("modal-description").textContent = t.description || "";

  document.getElementById("modal-download").href = t.file;
  const protocolBtn = document.getElementById("modal-protocol");
  protocolBtn.href = `${DL_PROTOCOL}${t.file}`;

  const tagHTML = Array.isArray(t.tags)
    ? t.tags.map(tag => `<span class="tag-pill">${tag}</span>`).join("")
    : "";

  document.getElementById("modal-tags").innerHTML = tagHTML;

  const el = document.getElementById("modal-appversion");

  if (t.app_version) {
    el.textContent = `⬇ ${t.downloads ? t.downloads >= 0  ? t.downloads : '?' : 0} downloads | Made with app ${t.app_version}`;
    el.style.display = "block";
  } else {
    el.style.display = "none";
  }

  const slug = slugify(t.name);

  history.replaceState(null, "", `#${marketConfig.hashKey}=${slug}`);
  const url = `${window.location.origin}${window.location.pathname}#${marketConfig.hashKey}=${slug}`;
  const shareBtn = document.getElementById("modal-share");
  shareBtn.onclick = async (e) => {
    e.preventDefault();
    try {
      const icon = shareBtn.querySelector("i");
      icon.className = "fa-solid fa-check";
      setTimeout(() => {
        icon.className = "fa-solid fa-link";
      }, 1500);
      await navigator.clipboard.writeText(url);
    } catch { }
  };

  const hasMultiple = previews.length > 1;
  let previewsEl = document.getElementById("modal-previews");
  previewsEl.innerHTML = `
    <div class="preview-wrapper">
        <img id="modal-main-img"
        src="${previews[0]}"
        data-lightbox="true" />

        ${hasMultiple ? `
        <button class="nav-btn left" id="prev-img">‹</button>
        <button class="nav-btn right" id="next-img">›</button>
        ` : ""}
    </div>

    ${hasMultiple ? `
        <div class="preview-thumbs">
        ${previews.map((src, i) => `
            <img src="${src}"
                data-preview-src="${src}"
                class="${i === 0 ? "active" : ""}" />
        `).join("")}
        </div>
    ` : ""}
  `;

  document.getElementById("modal-overlay").style.display = "flex";
}

function openLightbox(src, e) {
  if (e) e.preventDefault();
  if (e) e.stopPropagation();

  currentLightboxSrc = src;
  lightboxOpen = true;

  const img = document.getElementById("lightbox-img");
  const box = document.getElementById("img-lightbox");

  img.src = src;
  box.style.display = "flex";

  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightboxOpen = false;
  currentLightboxSrc = null;

  const box = document.getElementById("img-lightbox");
  const img = document.getElementById("lightbox-img");

  box.style.display = "none";
  img.src = "";

  document.body.style.overflow = "";
}

function closeModal() {
  document.getElementById("modal-overlay").style.display = "none";
  document.body.style.overflow = "";
  history.replaceState(null, "", window.location.pathname);
}

function switchPreview(src, el) {
  document.getElementById("modal-main-img").src = src;

  document.querySelectorAll("[data-preview-src]")
    .forEach(img => img.classList.remove("active"));

  el.classList.add("active");
}

function isNew(created) {
  if (!created) return false;
  const createdDate = new Date(created);
  const now = new Date();
  const diffDays = (now - createdDate) / (1000 * 60 * 60 * 24);
  return diffDays <= 30;
}

function slugify(name) {
  return name.toLowerCase().replace(/\s+/g, "-");
}

function initIntroCollapse() {
  const intro = document.querySelector(".marketplace-intro");
  const controls = document.getElementById("controls");
  if (!intro || !controls) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      intro.classList.toggle("collapsed", !entry.isIntersecting);
    },
    { threshold: 0.1 }
  );

  observer.observe(controls);
}

function openFromHash() {
  const hash = new URLSearchParams(window.location.hash.slice(1));
  const slug = hash.get(marketConfig.hashKey);
  if (!slug) return;

  const index = allThemes.findIndex(t =>
    slugify(t.name) === slug
  );

  if (index !== -1) {
    openModal(index);
  }
}

window.closeLightbox = closeLightbox;
window.closeModal = closeModal;
