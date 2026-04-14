const THEMES_URL = "https://assets.subathonmanager.app/presets/overlays/data";

let allThemes = [];
let activeTag = null;
let searchQuery = "";
let lightboxOpen = false;
let currentLightboxSrc = null;
let currentPreviewIndex = 0;
let currentPreviews = [];
let sortMode = "default"; // "default" | "downloads"
let currentPage = 1;
const PAGE_SIZE = 12;

function initMarketplace() {
  const root = document.getElementById("marketplace");
  if (!root) return;

  if (root.dataset.initialized) return;
  root.dataset.initialized = "true";

  setupListeners();
  loadThemes();
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
  const res = await fetch(THEMES_URL);
  const data = await res.json();

  allThemes = data.overlays || [];
  renderGallery();
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

  document.addEventListener("click", (e) => {

    if (e.target.id === "next-img") nextPreview();
    if (e.target.id === "prev-img") prevPreview();
    
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

// function renderGallery() {
//   const gallery = document.getElementById("gallery");
//   const empty = document.getElementById("empty");
//   if (!gallery || !empty) return;

//   const q = searchQuery.toLowerCase();

//   let filtered = allThemes.filter(t => {
//     const matchesTag = !activeTag || (t.tags || []).includes(activeTag);

//     const q = searchQuery.toLowerCase();
//     const matchesSearch =
//       !q ||
//       t.name.toLowerCase().includes(q) ||
//       t.description.toLowerCase().includes(q) ||
//       (t.author || "").toLowerCase().includes(q);

//     return matchesTag && matchesSearch;
//   });

//   if (sortMode === "downloads") {
//     filtered.sort((a, b) => (b.downloads || 0) - (a.downloads || 0));
//   }

//   if (!filtered.length) {
//     gallery.innerHTML = "";
//     empty.style.display = "block";
//     return;
//   }

//   empty.style.display = "none";

//   gallery.innerHTML = filtered.map(t => `
//     <div class="theme-card" data-index="${allThemes.indexOf(t)}">

//         <div class="card-image-wrapper">
//           <img src="${t.preview}" alt="${t.name}" loading="lazy" />

//           <div class="download-badge">
//             ⬇ ${t.downloads ? t.downloads >= 0  ? t.downloads : '?' : 0}
//           </div>
//         </div>

//         <div class="theme-card-body">
//           <h3>${t.name}</h3>

//           <div class="author">
//             by ${t.author || "Unknown"} · v${t.version || "?"}
//           </div>

//           <div class="card-tags">
//             ${(t.tags || []).map(tag => `
//               <span class="tag-pill">${tag}</span>
//             `).join("")}
//           </div>
//         </div>
//     </div>
//   `).join("");

// }

function renderGallery() {
  const gallery = document.getElementById("gallery");
  const empty = document.getElementById("empty");
  if (!gallery || !empty) return;

  const q = searchQuery.toLowerCase();

  let filtered = allThemes.filter(t => {
    const matchesTag = !activeTag || (t.tags || []).includes(activeTag);
    const matchesSearch =
      !q ||
      t.name.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      (t.author || "").toLowerCase().includes(q);
    return matchesTag && matchesSearch;
  });

  if (sortMode === "downloads") {
    filtered.sort((a, b) => (b.downloads || 0) - (a.downloads || 0));
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

  gallery.innerHTML = pageItems.map(t => `
    <div class="theme-card" data-index="${allThemes.indexOf(t)}">
      <div class="card-image-wrapper">
        <img src="${t.preview}" alt="${t.name}" loading="lazy" />
        <div class="download-badge">
          ⬇ ${t.downloads != null && t.downloads >= 0 ? t.downloads : '?'}
        </div>
      </div>
      <div class="theme-card-body">
        <h3>${t.name}</h3>
        <div class="author">by ${t.author || "Unknown"} · v${t.version || "?"}</div>
        <div class="card-tags">
          ${(t.tags || []).map(tag => `<span class="tag-pill">${tag}</span>`).join("")}
        </div>
      </div>
    </div>
  `).join("");

  renderPagination(currentPage, totalPages);
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
      html += `<span style="color:var(--md-default-fg-color--light);padding:0 4px">…</span>`;
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
  protocolBtn.href = t.protocol;
  
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
}

function switchPreview(src, el) {
  document.getElementById("modal-main-img").src = src;

  document.querySelectorAll("[data-preview-src]")
    .forEach(img => img.classList.remove("active"));

  el.classList.add("active");
}

window.closeLightbox = closeLightbox;
window.closeModal = closeModal;