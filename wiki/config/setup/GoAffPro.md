---
description: Connect GoAffPro affiliate stores to SubathonManager for tracking orders during your subathon - supports GamerSupps, UwUMarket, Orchid Eight, Cheeky Soap, and more
---

# GoAffPro Integrations


GoAffPro is the intermediary service many store partners use for affiliate services.

Click **Connect** and log in to your GoAffPro account in the popup. Your active stores will be detected and enabled below.

=== "Options"

    | Option | Description |
    |---|---|
    | **Lookback Days** | Number of days on connection to look back for events. Useful to catch up on offline purchases from days the app was inactive. |

=== "Per-Store Values"

    | Value | Description |
    |---|---|
    | **Enabled** | Whether or not to enable events for this store |
    | **Add Commission Amount** | For each store order, whether to treat the commission earned as a donation, adding to total money donated |
    | **Seconds** | Seconds configuration |
    | **Points** | Points configuration |
    | **Per X** | How the seconds/points values are counted. <br><br>**Dollar** = per whole unit of order total (excl. shipping) <br><br>**Order** = per individual order<br><br>**Item** = per individual item in the order |

## Known supported

GoAffPro compatible stores on your account are automatically detected and added. The below is a sample of known compatible storefronts which are included by default.

<div class="store-grid" markdown="0">
  <script>
  (function() {
    var stores = [
      { name: "GamerSupps",  url: "https://gamersupps.gg",  img: "https://cdn.shopify.com/s/files/1/1265/2145/files/GS-Logo-002_x320.png" },
      { name: "Orchid Eight", url: "https://orchideight.com", img: "https://www.orchideight.com/cdn/shop/files/O8_Website_Logo.png" },
      { name: "UwUMarket",   url: "https://uwumarket.us",    img: "https://uwumarket.us/cdn/shop/files/LOGO_UWUMARKET-2025-REVISION.png" },
      { name: "KatDragonz",  url: "https://katdragonz.com",  img: "https://katdragonz.com/cdn/shop/files/logo_32_4.png" },
      { name: "Cheeky Soap", url: "https://usecheeky.com/",  img: "https://usecheeky.com/cdn/shop/files/cheeky-logo-line.png?v=1726779683" },
      { name: "Advanced GG", url: "https://advanced.gg",     img: "https://advanced.gg/cdn/shop/files/ADV-Logo-Horizontal_600x.png" },
      { name: "Rogue Energy", url: "https://rogueenergy.com", img: "https://rogueenergy.com/cdn/shop/files/RlogoZ_6769a8b1-7e7d-4791-bb25-8ec5609fe904.png" },
      { name: "Saucy Biz",   url: "https://saucy.biz",    img: "https://saucy.biz/wp-content/uploads/2024/09/SaucyBiz_horz_purplewhite_4x_1ae1fdf6-7a76-4b5f-961c-dfd1e07267be_430x.webp" },
      { name: "GFuel",       url: "https://gfuel.com",       img: "https://gfuel.com/cdn/shop/files/sig_gfuel_logo.png" },
      { name: "Natura Pine", url: "https://naturapine.com",   img: "https://naturapine.com/cdn/shop/files/NP-Logo-DK.png" },
      { name: "Madrinas", url: "https://madrinas.com/",   img: "https://madrinas.com/cdn/shop/files/Madrinas-Logo-blk-Horizontal_eafe6a16-7aa2-4015-9f22-8c615bf895c7_400x.png" },
      { name: "Otaku", url: "https://otaku.shop",   img: "https://otaku.shop/cdn/shop/files/pfp_512px-02b_eb133fd1-9b1c-4403-9f64-0d4517e9e518.png?v=1765573471" },
      { name: "V1 Tech", url: "https://www.v1tech.com/",   img: "https://www.v1tech.com/cdn/shop/files/v1techlogo.png?v=1751174629" },
      { name: "Plush Foundry", url: "https://plushfoundry.com/",   img: "https://plushfoundry.com/cdn/shop/files/plush_foundry_WOOL_V2_BRIGHT_2c81cf69-973f-480c-9168-68d6dc3fc528.png?height=80&v=1690918071" },
      { name: "Horizons Merch", url: "https://horizonsmerch.com/",   img: "https://horizonsmerch.com/cdn/shop/files/HorizonsMerch_LogoWText_OGW_8x3_300.png?v=1729558999" }
    ];
    var grid = document.currentScript.parentElement;
    stores.forEach(function(s) {
      var a = document.createElement("a");
      a.className = "store-card";
      a.href = s.url;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      var logo = document.createElement("div");
      logo.className = "store-logo-wrap";
      if (s.img) {
        var img = document.createElement("img");
        img.src = s.img;
        img.alt = s.name;
        img.onerror = function() { logo.textContent = s.name[0]; };
        logo.appendChild(img);
      } else {
        logo.textContent = s.name[0];
      }
      a.appendChild(logo);
      var label = document.createElement("span");
      label.textContent = s.name;
      a.appendChild(label);
      grid.appendChild(a);
    });
  })();
  </script>
</div>