# 全站 UI／UX 稽核待辦

建立日期：2026-08-31
網站：<https://ycaura.com/>
稽核方式：`app/globals.css` 逐條檢視 + Chrome DevTools Protocol 實機量測（行動版 390×844 `mobile: true`、桌機 1440×844）+ 截圖比對
相關文件：`docs/todo/20260831_seo-aeo-audit.md`

> 註：`AGENTS.md` 指定 UI 變更應使用 `frontend-design` skill，但本次 session 的技能清單中沒有該 skill，因此改以 CSS 檢視加 CDP 量測進行。後續若該 skill 可用，建議在實作階段再跑一次。

## 1. 目前判斷

版面設計本身水準高，品牌調性成熟且一致：編輯式排版、襯線大標配無襯線內文、克制的陶土色系、大量留白。**結構面沒有問題**，本次未發現版面破版或語意錯誤。

已量測確認正常：

- 無「頁面層級」水平溢出：320／390／480／761／800／900／959／1024／1280／1440／1920px 各寬度下 `scrollWidth === clientWidth`（元素層級的溢出見 2.4）
- 標題階層乾淨：單一 `h1`，`h2`／`h3` 正確巢狀，無跳級
- `<html lang="zh-Hant-TW">` 正確
- 圖片 `alt` 完整：首頁 6 張（3 個空 `alt` 為 QR 圖，對應 anchor 有 `aria-label`，屬正確做法）；服務頁為 1 張服務圖加 3 張 QR，知識頁無視覺圖片
- 底部固定 CTA 不遮擋頁尾文字（頁尾末行文字底部 743px，CTA 頂端 776px，淨距 33px）
- 全站未出現 `outline: none`，瀏覽器預設焦點框保留
- 已處理 `prefers-reduced-motion`（動畫與 `scroll-behavior` 皆有降級）

以下依優先度整理需處理項目。

## 2. P0：直接影響可用性與轉換

### 2.1 觸控目標過小，兩處低於 WCAG 2.2 AA 門檻

行動版（390px）量測到 **20 個** 可點擊元素高度不足 44px。WCAG 2.2 SC 2.5.8（AA 級）要求至少 24×24 CSS px，其中兩類未通過：

| 元素 | 實測尺寸 | 判定 |
| --- | --- | --- |
| `.nav-cta`「雙和店」 | 36×**18**px | 未達 WCAG 2.2 AA（24px） |
| trust strip「妊娠紋」「黑眼圈」 | 61×**20**px | 未達 WCAG 2.2 AA（24px） |
| `.text-link`（多處） | 27px 高 | 過 WCAG，未達 Apple HIG 44pt |
| 服務項目連結 | 37px 高 | 過 WCAG，未達 Apple HIG 44pt |

`.nav-cta` 是行動版唯一的導覽動作，18px 高難以點準。

- [ ] `.nav-cta` 補垂直 padding，讓可點區域至少 44px 高（視覺尺寸可維持不變）。
- [ ] trust strip 的兩個連結同樣補可點區域。
- [ ] `.text-link` 與服務項目連結視情況拉到 44px；若會破壞行距節奏，至少確保 24px 並加大點擊熱區。

### 2.2 品牌拼字錯誤：`MAPHIS`

`app/page.tsx:149`：

```
<div className="image-caption"><span>MAPHIS PURE SKIN</span>
```

全站其餘 6 處均為 **MAVIS**（首頁與知識頁 JSON-LD 的 `alternateName`、`brand`、服務頁側欄 `雙和店 / MAVIS PURE SKIN`、`layout.tsx` 的 `keywords`）。首頁 hero 圖下方是視覺顯眼位置，且品牌名不一致對 SEO 的實體識別也不利。

- [ ] 修正為 `MAVIS PURE SKIN`。
- [ ] 於 `tests/rendered-html.test.mjs` 加 `doesNotMatch(/MAPHIS/i)` 防呆。
- [ ] 確認 Obsidian `01-品牌與據點` 的英文品牌拼法，若與網站不一致一併更新。

### 2.3 行動版沒有任何區段導覽

`.nav-links { display: none }`（`globals.css:285`）在 ≤760px 隱藏導覽連結，但沒有提供替代方案（無漢堡選單、無底部導覽）。行動版使用者失去「品牌理念／服務內容／常見問題」的跳轉能力，只能持續捲動。

更關鍵的是：**全站任何裝置的導覽列都沒有通往知識頁的入口**。兩篇知識文是主要 SEO 資產，目前的入口是首頁 trust strip（20px 高的小連結）、首頁知識區塊，以及服務頁側欄（`app/services/[slug]/page.tsx:172-173`）；文章間也有 breadcrumb 與相互連結。入口存在但都埋在頁面深處，導覽列完全沒有。

- [ ] 行動版加入導覽方案（漢堡選單，或在 hero 下方加一列可捲動的區段連結）。
- [ ] 導覽列加入「肌膚知識」入口，桌機與行動版皆需要。
- [ ] 與 `docs/todo/20260831_seo-aeo-audit.md` 的 3.4（建立 `/knowledge` hub 頁）一併規劃，導覽入口指向 hub 而非個別文章。

### 2.4 窄螢幕（320px）內容被裁切且無法取用

實測 320px（iPhone SE 等）時有兩處元素層級溢出，被 `overflow: hidden` 直接切掉：

| 元素 | 欄寬 | 內容寬 | 溢出 | 後果 |
| --- | --- | --- | --- | --- |
| `.trust-inner` | 280px | 329px | **+49px** | 「04 黑眼圈」完全看不到也點不到 |
| `.hero h1` | 256px | 265px | **+9px** | 主標最後一字被切 |

`.trust-inner` 在 ≤760px 設了 `overflow: hidden; white-space: nowrap`（`globals.css:307`），沒有捲動能力，因此被切掉的內容無法取用。黑眼圈知識頁是 SEO 資產，在 320px 裝置上等於從首頁消失。

`.hero h1` 的溢出來自 `.hero-title-line { white-space: nowrap }`（`globals.css:44`）。

- [ ] `.trust-inner` 改為可水平捲動（`overflow-x: auto` 加 `-webkit-overflow-scrolling: touch`），或在極窄寬度改為換行。
- [ ] `.hero-title-line` 在極窄寬度解除 `nowrap`。
- [ ] 驗收時把 320px 納入必測寬度。

### 2.5 一般連結 hover 對比不足

`globals.css:16`：

```css
.nav-links a:hover, .text-link:hover, .nav-cta:hover { color: var(--clay); }
```

`--clay` `#b8786e` 在 `--paper` `#f5f0e9` 上僅 **3.11:1**，而這些是 13–14px 的一般文字（需 4.5:1）。導覽連結、`.text-link`、`.nav-cta` 在 hover 時對比反而變差。

- [ ] hover 色改用 `--clay-dark` `#8d5c54`（4.89:1），與 `.trust-inner > a:hover`、`.topic-list a:hover`、`summary:hover` 的既有做法一致。

### 2.6 `.manifesto-bottom` 對比嚴重不足

`globals.css:119` 讓 `.manifesto-bottom` 使用 `--muted` `#756a63`，但其父層 `.manifesto` 背景是 `--ink` `#352b29`（深色）。對比僅 **2.61:1**，字級 10px。

這是全站最差的對比組合。該區塊內容為「雙和店 / 瑪菲斯」與「紋路美化・科技測色・肌膚知識」，屬品牌與服務資訊，不是純裝飾。

- [ ] 改用適合深色底的淺色（例如 `rgba(245,240,233,.72)`，實測 7.25:1）。

### 2.7 hover 效果未隔離觸控裝置

`@media (hover: hover) and (pointer: fine)`（`globals.css:84-87`）只包住 `.service-row:hover`。其餘 hover 規則皆為全域，觸控瀏覽器可能保留 hover 狀態導致樣式卡住：

`globals.css:16`（連結變色）、`:37`（按鈕位移）、`:39`(箭頭位移)、`:50`（hero 圖縮放）、`:61`、`:112`、`:126`、`:142`（contact 按鈕位移）、`:149`／`:158`（QR 卡片位移旋轉）。

- [ ] 將帶有 `transform` 的 hover 規則移入 `@media (hover: hover) and (pointer: fine)`；純變色的可視情況保留。

## 3. P1：建議修正

### 3.1 導覽 CTA 標籤語意不清

「雙和店」三個字未說明點擊後會發生什麼（實際行為是開新分頁前往 Facebook）。桌機與行動版皆然。

- [ ] 改為可預期結果的標籤，例如「Facebook 私訊」。
- [ ] 外開連結已有 `target="_blank" rel="noreferrer"`，可考慮補視覺化的外開提示。

### 3.2 行動版首屏 CTA 重複

hero 的主按鈕與底部固定 CTA 文案完全相同（皆為「雙和店 Facebook 私訊」），且同時出現在第一屏。固定 CTA 的價值在於使用者捲動遠離 hero 後仍可轉換，在第一屏重複會稀釋主按鈕的視覺權重。

- [ ] 讓 `.mobile-sticky-cta` 在捲過 hero 後才淡入（IntersectionObserver 或 scroll 事件）。
- [ ] 或將兩者文案區隔，例如固定 CTA 改為「立即預約」。

### 3.3 `white-space: nowrap` 已造成 `.intro h2` 實際溢出

`globals.css:270`：

```css
.intro h2, .section-heading h2, .knowledge h2, .manifesto h2, .faq h2, .contact h2 { white-space: nowrap; }
```

此規則只匹配這 6 個選擇器，不含服務頁的 `.service-detail-main h2`（`globals.css:189`）與知識頁的 `.knowledge-article-section h2`（`globals.css:228`）。

**這不是尚未觸發的風險，而是已經在發生**。實測 `.intro h2`（「不只是遮住，先把紋路看懂。」）在各寬度下超出自身 grid 欄位：

| 視窗寬度 | 欄寬 | 文字寬 | 溢出 |
| --- | --- | --- | --- |
| 1366px | — | — | 無 |
| 1440px | 445px | 466px | **+21px** |
| 1536px | 442px | 466px | **+24px** |
| ≥1600px | 440px | 466px | **+26px** |

目前尚未造成視覺破版，因為溢出的文字落在 grid gap 中，距離 `.intro-copy` 的左分隔線還有 37–38px。但這個緩衝只夠再多約半個字，標題一改就會撞上分隔線。`body { overflow-x: hidden }` 會讓這種溢出完全不產生錯誤訊號。

- [ ] 改用可控的斷行方式（既有 `<br />` 已在 JSX 中控制斷點，`nowrap` 多半是多餘的保險）。
- [ ] 若要保留，至少限縮到實際需要的少數標題，不要套用整組。

### 3.4 中文標題負字距過大

`h1 { letter-spacing: -.08em }`、`.hero h1 { letter-spacing: -.1em }`。

負字距是為拉丁顯示字體設計的手法。漢字為等寬方塊字，-0.1em 在 84px 字級下等於每字擠掉 8.4px，實際渲染中「讓肌膚的故事，」偏擠，標點處尤其明顯。

- [ ] 中文標題收斂到 `-0.02em ~ -0.04em`。
- [ ] 此項屬設計判斷，需業主／設計確認視覺方向後再改，不應逕自調整。

### 3.5 hover 狀態對比不足

`.service-row` hover 時背景由 `--paper` 變為 `--paper-deep`，此時 `.service-row p` 的 `--muted` 對比由 4.63:1 降至 **3.97:1**，未達 14px 內文所需的 4.5:1。

實測對比值（WCAG）：

| 組合 | 對比 | AA 內文 | AA 大字 |
| --- | --- | --- | --- |
| `--ink` #352b29 on `--paper` | 12.11:1 | 通過 | 通過 |
| `--clay-dark` #8d5c54 on `--paper` | 4.89:1 | 通過 | 通過 |
| `--muted` #756a63 on `--paper` | 4.63:1 | 通過 | 通過 |
| `--muted` on `--paper-deep`（hover） | **3.97:1** | 未通過 | 通過 |
| `--clay` #b8786e on `--paper` | 3.11:1 | 未通過 | 通過 |

註：`--clay` 僅用於大字（`h1 em`、`h2 em`、`.service-number` 24px），符合 AA 大字標準，不需處理。`.trust-inner b` 雖為 10px 但使用 `--clay-dark`（4.89:1），亦無問題。

- [ ] hover 時將 `.service-row p` 改用 `--ink` 或加深 `--muted`。

### 3.6 極小字級

行動版 `.image-caption` 為 8px、`.hero-notes` 9px、多處 10px。8px 在實機上接近不可讀。

- [ ] 行動版最小字級拉到 11px 以上，或改以其他方式呈現裝飾性文字。

## 4. P2：加分與清理

### 4.1 深色區塊的焦點樣式

全站未移除 `outline`，瀏覽器預設焦點框保留（這點是好的）。但深色 hero（`--hero` #342826）上的預設焦點環對比偏弱。

- [ ] 補 `:focus-visible` 樣式，針對深色區塊使用淺色焦點環。

### 4.2 缺少 skip link

`<main id="main-content">` 已存在，但沒有「跳至主要內容」的連結。

- [ ] 加入視覺隱藏、聚焦時顯示的 skip link。

### 4.3 死 CSS

以下 class 在所有 TSX 中皆為 0 次使用，但 CSS 含行動版覆寫共佔十餘行：

- `.hero-notes`（`globals.css:42-43` 與行動版覆寫）
- `.image-seal`（含 `.image-seal span`、`.image-seal strong` 與行動版覆寫）
- `.trust-arrow`（含選擇器排除條件與行動版覆寫）
- `.contact-arrow`（`globals.css:38,144`）
- `.row-arrow`（`globals.css:38,93`）

- [ ] 移除，並確認 `.trust-inner` 中排除 `.trust-arrow` 的選擇器可一併簡化。

### 4.4 QR 圖在行動版隱藏卻仍被預載

`.contact-qr-grid { display: none }`（`globals.css:354`），但三張 QR SVG 仍在 HTML 中，React 19 會為未標 `loading="lazy"` 的 `<img>` 自動產生 `<link rel="preload">`。

實際影響很小（三檔各約 1.7KB，合計約 5KB），屬整理性質而非效能問題。與 `docs/todo/20260831_seo-aeo-audit.md` 的 4.2 為同一項。

- [ ] 為 QR `<img>` 加上 `loading="lazy"` 與 `decoding="async"`。

## 5. 建議執行順序

1. **第一批**：2.1、2.2、2.4、2.5、2.6、2.7、3.3、3.5、4.1、4.2、4.3、4.4。皆為可量測的缺陷與無障礙修正，不涉及設計方向判斷，可直接做。
2. **第二批（需設計確認）**：2.3、3.1、3.2、3.4、3.6。這些會改變視覺或互動設計，應先與業主確認方向。2.3 另需與 SEO 稽核的 `/knowledge` hub 一併規劃。

## 6. 交叉驗證紀錄

本文件初稿由 Claude 產出後，以 `codex exec review`（gpt-5.6-luna）針對「每一項宣稱是否真實存在於程式碼中」做獨立查證，再由 Claude 逐條複測。結果：

- **雙方一致且查證屬實**：MAPHIS 拼字、觸控目標、死 CSS、QR 行動版隱藏仍預載、`.service-row` hover 對比、導覽列缺 `/knowledge` 入口、行動版無導覽替代方案。
- **codex 指出、Claude 複測確認的新問題**：2.5（連結 hover 對比 3.11:1）、2.6（`.manifesto-bottom` 2.61:1）、2.7（hover 未隔離觸控）、死 CSS 漏列 `.contact-arrow` 與 `.row-arrow`。
- **codex 指出的初稿錯誤，已更正**：`.nav-links` 行號 284→285、`.hero-notes` 行號 44-45→42-43、「≥960px 的所有 h2」過度概括、知識頁入口描述不完整、圖片數量未限定頁面範圍、「hover 已完全隔離」的錯誤結論。
- **codex 主張但複測不成立**：codex 認為 761–959px 時 hero 標題會溢出文字欄位。實測 761／800／900／959px 皆無溢出（`.hero h1` 的 `scrollWidth === clientWidth`）。codex 是從 CSS 推論而非量測。
- **由此延伸、雙方原本都沒抓到的**：2.4（320px 的 `.trust-inner` 與 `.hero h1` 裁切）與 3.3 的實測數據（`.intro h2` 在 ≥1440px 已實際溢出）。codex 「390px 無溢出不能代表其他寬度正常」的方向判斷是對的，只是指錯了寬度。

## 7. 驗收方式

- [ ] 每批完成後執行 `npm test` 與 `npm run lint`。
- [ ] 以 CDP 重新量測行動版觸控目標，確認不足 24px 的元素歸零。
- [ ] 以 CDP 確認 `scrollWidth === clientWidth`，無新增水平溢出。
- [ ] 桌機（1440px）與行動版（390px）截圖比對，確認視覺未退化。
- [ ] 鍵盤 Tab 逐一走過，確認焦點順序合理且在深色區塊可見。
- [ ] 同步更新 `Projects/mps` 中對應的技術／設計筆記。
