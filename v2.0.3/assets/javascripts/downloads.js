const DL_REPO = "WolfwithSword/SubathonManager";
const DL_API = `https://api.github.com/repos/${DL_REPO}/releases`;
const DL_RELEASES = `https://github.com/${DL_REPO}/releases`;

const DL_TARGETS = [
  {
    rid: "win-x64",
    name: "Windows",
    detail: "64-bit - Windows 10 / 11",
    icon: "fa-brands fa-windows"
  },
  {
    rid: "osx-arm64",
    name: "macOS · Apple Silicon",
    detail: "M1 / M2 / M3 / M4",
    icon: "fa-brands fa-apple"
  },
  {
    rid: "osx-x64",
    name: "macOS - Intel",
    detail: "Intel-based Macs",
    icon: "fa-brands fa-apple"
  },
  {
    rid: "linux-x64",
    name: "Linux",
    detail: "64-bit - glibc",
    icon: "fa-brands fa-linux"
  }
];

const dlReleaseCache = {};
let dlLastFocus = null;

function initDownloadModal() {
  if (!document.querySelector("[data-download-channel]")) return;

  ensureDownloadModal();

  document.querySelectorAll("[data-download-channel]").forEach(btn => {
    if (btn.dataset.dlBound) return;
    btn.dataset.dlBound = "true";
    btn.addEventListener("click", e => {
      e.preventDefault();
      openDownloadModal(btn.dataset.downloadChannel);
    });
  });
}

if (typeof document$ !== "undefined") {
  document$.subscribe(initDownloadModal);
} else {
  document.addEventListener("DOMContentLoaded", initDownloadModal);
}

function detectRid() {
  const ua = navigator.userAgent || "";
  const platform = navigator.userAgentData?.platform || navigator.platform || "";

  if (/Android/i.test(ua)) return null;
  if (/iPhone|iPad|iPod/i.test(ua)) return null;

  if (/Win/i.test(platform) || /Windows/i.test(ua)) return "win-x64";
  if (/Linux|X11|CrOS/i.test(platform) || /Linux/i.test(ua)) return "linux-x64";
  if (/Mac/i.test(platform) || /Mac OS X/i.test(ua)) {
    return isAppleSilicon() ? "osx-arm64" : "osx-x64";
  }

  return null;
}


function isAppleSilicon() {
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (!gl) return true;

    const ext = gl.getExtension("WEBGL_debug_renderer_info");
    const renderer = ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER);

    if (/Apple\s?(GPU|M\d)/i.test(renderer || "")) return true;
    if (/Intel|AMD|Radeon/i.test(renderer || "")) return false;
  } catch { /**/ }

  return true;
}

async function fetchRelease(channel) {
  if (dlReleaseCache[channel]) return dlReleaseCache[channel];

  const cacheKey = `sm-release-${channel}`;
  try {
    const stored = sessionStorage.getItem(cacheKey);
    if (stored) {
      dlReleaseCache[channel] = JSON.parse(stored);
      return dlReleaseCache[channel];
    }
  } catch { /**/ }

  const url = channel === "nightly" ? `${DL_API}/tags/nightly` : `${DL_API}/latest`;

  const res = await fetch(url, { headers: { Accept: "application/vnd.github+json" } });
  if (!res.ok) throw new Error(`GitHub API returned ${res.status}`);

  const data = await res.json();
  const release = {
    tag: data.tag_name || (channel === "nightly" ? "nightly" : ""),
    page: data.html_url || DL_RELEASES,
    published: data.published_at || "",
    assets: (data.assets || []).map(a => ({
      name: a.name,
      url: a.browser_download_url,
      size: a.size,
      downloads: a.download_count
    }))
  };

  dlReleaseCache[channel] = release;
  try {
     sessionStorage.setItem(cacheKey, JSON.stringify(release));
  } catch { /**/ }

  return release;
}

function assetFor(release, rid) {
  const suffix = `_${rid}_`;
  return release.assets.find(a =>
    a.name.startsWith("SubathonManager") &&
    a.name.includes(suffix) &&
    a.name.endsWith(".zip")
  ) || null;
}

function fallbackUrl(tag, rid) {
  if (!tag) return null;
  return `${DL_RELEASES}/download/${tag}/SubathonManager_${rid}_${tag}.zip`;
}

function formatSize(bytes) {
  if (!bytes && bytes !== 0) return "";
  const mb = bytes / (1024 * 1024);
  return mb >= 1 ? `${mb.toFixed(1)} MB` : `${Math.round(bytes / 1024)} KB`;
}

function ensureDownloadModal() {
  if (document.getElementById("dl-modal-overlay")) return;

  const wrap = document.createElement("div");
  wrap.innerHTML = `
    <div id="dl-modal-overlay" style="display:none" role="dialog" aria-modal="true" aria-labelledby="dl-modal-title">
      <div id="dl-modal">
        <button id="dl-modal-close" type="button" aria-label="Close">&times;</button>
        <h2 id="dl-modal-title">Choose your platform</h2>
        <p id="dl-modal-sub"></p>
        <div id="dl-modal-list"></div>
        <div id="dl-modal-footer"></div>
      </div>
    </div>`;

  document.body.appendChild(wrap.firstElementChild);

  document.getElementById("dl-modal-close").addEventListener("click", closeDownloadModal);
  document.getElementById("dl-modal-overlay").addEventListener("click", e => {
    if (e.target.id === "dl-modal-overlay") closeDownloadModal();
  });
  document.addEventListener("keydown", e => {
    if (e.key !== "Escape") return;
    if (document.getElementById("dl-modal-overlay")?.style.display === "flex") closeDownloadModal();
  });
}

function closeDownloadModal() {
  const el = document.getElementById("dl-modal-overlay");
  if (!el) return;
  el.style.display = "none";
  document.body.style.overflow = "";
  dlLastFocus?.focus();
}

async function openDownloadModal(channel) {
  ensureDownloadModal();

  dlLastFocus = document.activeElement;

  const overlay = document.getElementById("dl-modal-overlay");
  const list = document.getElementById("dl-modal-list");
  const sub = document.getElementById("dl-modal-sub");
  const footer = document.getElementById("dl-modal-footer");

  sub.textContent = channel === "nightly"
    ? "Nightly build - latest code from main, may be unstable."
    : "Latest stable release.";

  list.innerHTML = `<div class="dl-loading">Fetching release info...</div>`;
  footer.innerHTML = "";

  overlay.style.display = "flex";
  document.body.style.overflow = "hidden";
  document.getElementById("dl-modal-close").focus();

  let release = null;
  try {
    release = await fetchRelease(channel);
  } catch {
    release = { tag: channel === "nightly" ? "nightly" : "", page: DL_RELEASES, assets: [] };
  }

  const detected = detectRid();
  const tag = release.tag || (channel === "nightly" ? "nightly" : "");

  const rows = DL_TARGETS.map(target => {
    const asset = assetFor(release, target.rid);
    const href = asset?.url || fallbackUrl(tag, target.rid);
    const recommended = target.rid === detected;

    const meta = [
      target.detail,
      asset ? formatSize(asset.size) : null
    ].filter(Boolean).join(" · ");

    if (!href) {
      return `
        <div class="dl-option disabled">
          <i class="${target.icon}" aria-hidden="true"></i>
          <span class="dl-option-text">
            <strong>${target.name}</strong>
            <small>Unavailable for this build</small>
          </span>
        </div>`;
    }

    return `
      <a class="dl-option${recommended ? " recommended" : ""}" href="${href}" download>
        <i class="${target.icon}" aria-hidden="true"></i>
        <span class="dl-option-text">
          <strong>${target.name}</strong>
          <small>${meta}</small>
        </span>
        ${recommended ? `<span class="dl-badge">Detected</span>` : ""}
        <span class="dl-arrow">⬇</span>
      </a>`;
  }).join("");

  list.innerHTML = rows;

  const label = channel === "nightly"
    ? "View the nightly release on GitHub"
    : `View release ${tag || ""} on GitHub`;

  footer.innerHTML = `
    <a class="dl-release-link" href="${release.page || DL_RELEASES}" target="_blank" rel="noopener">
      ${label.trim()} <i class="fa-brands fa-github"></i>
    </a>`;
}

window.closeDownloadModal = closeDownloadModal;
