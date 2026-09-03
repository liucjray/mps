# 全站 SEO／AEO 稽核待辦

建立日期：2026-08-31  
後續執行待辦：已統整至 `docs/todo/20260903_seo-aeo-audit.md`（供後續 session wt 執行）  
網站：<https://ycaura.com/>  

## 1. 目前判斷

技術 SEO／AEO 基礎已完成且正確，本次稽核未發現架構層級的問題。

已確認正常：

- canonical、Open Graph、Twitter Card、title template
- JSON-LD `@graph`：Organization+LocalBusiness、WebSite、WebPage、Service ×4、Article、BreadcrumbList、FAQPage
- `robots.txt` 已涵蓋 GPTBot、OAI-SearchBot、ClaudeBot、PerplexityBot、Google-Extended
- `llms.txt` 內容與網站服務、聯絡方式一致
- `www` → apex 301、`http` → `https` 301、尾斜線 → 無尾斜線 308、未知路徑 404
- `cache-control: public, max-age=300, stale-while-revalidate=86400`
- hero 圖以 `Link: rel=preload` 標頭預載，圖片皆為 WebP 且體積合理
- GA4（`G-1FTBFRZSVK`）已部署，CTA 點擊事件有埋設
- 知識頁已標示內容整理者、最後更新日期、醫療免責與外部資料來源

需要處理的項目依優先度整理於下。

## 2. P0：已確認的錯誤（2026-08-31 全部完成）

### 2.1 `googlebot` meta 語法錯誤（全站每一頁）

線上實際輸出：

```html
<meta name="googlebot" content="index, follow, maxSnippet:-1, maxImagePreview:large, maxVideoPreview:-1">
```

正確語法應為 kebab-case：`max-snippet:-1, max-image-preview:large, max-video-preview:-1`。

目前三個指令 Google 無法解析，等同未設定，搜尋結果無法取得大圖預覽與完整摘要長度，對 AEO 的可引用內容長度有直接影響。

根因：`app/layout.tsx` 的 `robots.googleBot` 使用駝峰 key。Next.js 官方 `RobotsInfo` 型別的 key 本來就是 `'max-snippet'`、`'max-image-preview'`、`'max-video-preview'`；vinext 的 metadata shim（`node_modules/vinext/dist/shims/metadata.js`）會將 key 原樣輸出，不做命名轉換。

- [x] 將 `app/layout.tsx` 的 `maxSnippet`／`maxImagePreview`／`maxVideoPreview` 改為 kebab-case key。
- [x] 在 `tests/rendered-html.test.mjs` 加入 `max-image-preview:large`、`max-snippet:-1` 斷言，並加上駝峰 key 的 `doesNotMatch` 防呆。

### 2.2 開發用 meta 上到正式站

`app/layout.tsx` 的 `other: { "codex-preview": "development" }` 會在每一頁輸出 `<meta name="codex-preview" content="development">`，屬於開發遺留物。

- [x] 移除該欄位。註：原測試是斷言此 meta「必須存在」，已一併反轉為 `doesNotMatch`，測試名稱改為 `renders SEO/AEO signals without development-only metadata`。

### 2.3 canonical 與 sitemap 的尾斜線不一致

- 實際 canonical 輸出：`https://ycaura.com`（無尾斜線）
- `public/sitemap.xml` 首頁 `loc`：`https://ycaura.com/`（有尾斜線）
- `app/site.ts` 的 `siteCanonicalUrl`：有尾斜線

同一頁存在兩種 URL 形式。Google 多半會自行合併，但屬於可免費消除的訊號雜訊。

- [x] 統一為無尾斜線：`siteCanonicalUrl` 改為 `siteUrl`，sitemap 首頁 `loc` 與 `llms.txt` 官方網站連結同步。
- [x] JSON-LD `@id` 隨之變為 `https://ycaura.com#organization`，圖譜內部參照仍一致，測試已同步。

### 2.4 最後更新日期三處互相矛盾

黑眼圈頁於 2026-08-30 上線，首頁的 trust strip 與知識區塊同日修改，但：

- `app/site.ts` 的 `siteLastModified` 仍為 `2026-08-27`
- 首頁 JSON-LD `WebPage.dateModified` 因此為 `2026-08-27`
- `public/sitemap.xml` 首頁 `lastmod` 為 `2026-08-27`
- `public/llms.txt` 開頭寫「最後更新：2026-08-27」，但連結清單中已包含黑眼圈頁

- [x] `siteLastModified` → `2026-08-31`；sitemap 各頁 `lastmod` 依實際異動日填寫（首頁與 4 個服務頁 08-31、妊娠紋 08-28、黑眼圈 08-30）；`llms.txt` 更新日期 → 08-31。
- [x] 妊娠紋頁原本借用 `siteLastModified`，已改為自行維護 `updatedAt`，避免被首頁改動連帶誤標。
- [x] 測試加入「每個 `<loc>` 都必須有對應 `<lastmod>`」的檢查。
- [ ] 後續新增或修改頁面時，將 `siteLastModified`、sitemap `lastmod`、`llms.txt` 視為同一組必改項目。

## 3. P1：在地 SEO 與結構化資料補強

### 3.1 LocalBusiness 缺少位置與可聯繫時段欄位

頁面上已可見「11:00–19:00（預約制）」與完整地址，但 JSON-LD 未包含 `geo`、`hasMap` 與任何時段資訊。

**營業型態已於 2026-08-31 由業主確認：純預約制，無現場營業時段。有預約才到工作室，平常以網路（Facebook、LINE、Instagram）聯繫，無固定公休日。**

因此本項的做法與一般實體店不同：

- [ ] **不要加 `openingHoursSpecification`。** 該欄位語意為「此時段到店有人」，Google 會據此在地圖與知識面板顯示「營業中／已打烊」。本店無現場營業時段，填入會發出可直接到店的錯誤訊號。
- [ ] 改在既有的 `contactPoint` 節點加上 `hoursAvailable`（`Mo–Su 11:00–19:00`），語意為「此時段可聯繫」，與實際運作一致。
- [ ] 頁面可見文字維持「11:00–19:00（預約制）」即可，不需改動；不要加「全年無休」，該詞會被理解為現場營業。
- [ ] 補 `geo` 與 `hasMap`（需取得實際座標或 Google Business Profile 連結）。
- [ ] `priceRange` 在沒有可維護的真實價格前不填寫，維持既有「不製造假價格」原則。
- [ ] 「僅接受預約」這件事的正確表達位置是 Google Business Profile 的預約屬性，不是網站 schema；待 GBP 確認後一併處理。

### 3.2 服務子頁的 Organization 節點資料較首頁少

`app/services/[slug]/page.tsx` 的 Organization 節點缺少首頁已有的 `alternateName`、`areaServed`、`knowsAbout`、`image`、`brand`。四個頁面共用同一個 `@id`，資料卻不一致。

- [ ] 將 Organization 與 `areaServed` 節點抽為 `app/site.ts` 的共用常數。
- [ ] 首頁、服務頁、兩個知識頁改為引用同一份定義，避免日後再次漂移。

### 3.3 部分服務頁 title／description 缺在地詞

`skin-camouflage` 與 `colour-matching` 兩頁的 title 前段沒有中和／南勢角等在地訊號（僅靠品牌名帶到「新北雙和」）。

- [ ] 於這兩頁的 description 補入在地詞即可，不改動 title 前段，避免關鍵字堆疊。
- [ ] 不對 `herbal-stretch-care` 與 `beauty-education` 做相同處理，兩頁已有足夠在地與主題訊號。

### 3.4 缺少 `/knowledge` 知識中心頁

目前妊娠紋與黑眼圈兩篇知識文只能從首頁與 `beauty-education` 服務頁進入，沒有 hub 頁。SEO 計畫 P2 已規劃 7 篇長尾文章，文章數增加後將缺少內部連結的組織節點。

- [ ] 於長尾文章開始產出前建立 `/knowledge` hub 頁，含 `CollectionPage` 或 `ItemList` schema、breadcrumb 與 sitemap 項目。

## 4. P2：加分與清理

### 4.1 E-E-A-T：缺少可驗證的作者／關於頁

所有頁面的 `author` 皆指向 Organization。知識頁已引用 PubMed、Mayo Clinic、Cleveland Clinic、AAD、ACOG、NHS、食藥署與 Cochrane，來源品質良好，但沒有承接的人物頁面。

- [ ] 先於 `99-待確認/待確認事項.md` 確認可公開且可驗證的資歷、年資與職稱。
- [ ] 未取得真實資歷前不建立作者頁，也不加入 `Person`／`Physician` schema。

### 4.2 QR SVG 被自動 preload

`app/contact-qr.tsx` 的三張 QR `<img>` 未標示 `loading="lazy"`，React 19 因此在 head 自動產生三個 `<link rel="preload" as="image">`。這三張圖位於頁面底部聯絡區，與 hero 圖競爭頻寬。

- [ ] 為 QR `<img>` 加上 `loading="lazy"` 與 `decoding="async"`。

### 4.3 `robots.txt` 可補充的 crawler

- [ ] 視需要補上 `Applebot-Extended`、`meta-externalagent`、`Bingbot`、`Amazonbot`。

### 4.4 未使用的樣板程式碼

`app/chatgpt-auth.ts` 未被任何頁面 import，與 SEO 無關，屬於可清理項目。

- [ ] 確認無後續用途後移除。

## 5. 建議執行順序

1. **第一批（P0 全部）**：2.1、2.2、2.3、2.4。皆為 bug 修正，改動小、不涉及新的對外事實宣稱，不需先查 `99-待確認`。
2. **第二批**：3.2、4.2、4.3、4.4。純程式重構與效能／爬蟲設定，同樣不涉及事實宣稱。
3. **第三批**：3.1 的 `contactPoint.hoursAvailable` 可直接做（營業型態已於 2026-08-31 確認）；`geo`／`hasMap` 需先取得實際座標或 Google Business Profile 連結，4.1 的作者資歷須先在 Obsidian `Projects/mps/99-待確認/待確認事項.md` 取得確認。
4. **第四批（需另行規劃）**：3.3、3.4。與 SEO 計畫 P2 的內容集群一併安排。

## 6. 驗收方式

- [ ] 每批完成後執行 `npm test` 與 `npm run lint`。
- [ ] 以 rendered HTML 確認 canonical、title、description、`googlebot` meta、JSON-LD 與 NAP。
- [ ] 桌面與手機版視覺檢查，確認 QR 區塊與 CTA 未受影響。
- [ ] 上線後於 Search Console 對首頁與兩個知識頁執行 URL Inspection，並重新提交 sitemap。
- [ ] 同步更新 `Projects/mps` 中對應的 SEO／AEO 筆記，記錄來源、確認狀態與更新日期。
