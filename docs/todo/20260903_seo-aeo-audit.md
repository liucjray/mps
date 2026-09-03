# 全站 SEO／AEO 優化執行待辦清單

建立日期：2026-09-03  
網站：<https://ycaura.com/>  
前置文件：
- `docs/todo/20260831_seo-aeo-audit.md`（2026-08-31 稽核與已完成 P0）
- `docs/seo/260828_mavis-shuanghe-seo-aeo-optimization-plan.md`（總體規劃）
- Obsidian 共享記憶庫：`Projects/mps/04-SEO-AEO/SEO與AEO策略.md`

---

## 1. 執行背景與目標

2026-08-31 已完成 P0 項目（修正 `googlebot` kebab-case 指令、移除開發用 meta、統一 canonical/sitemap 無尾斜線、修正更新日期矛盾）。

本次（2026-09-03）針對現行代碼與線上行為進行全面檢視，確認技術 SEO 與 AEO 基礎良好，後續 session wt 可直接依循本文件的三批次順序執行，進一步提升結構化資料一致性、搜尋爬蟲覆蓋率、內部鏈結結構與在地搜尋意圖匹配。

---

## 2. 待辦項目清單

### Batch 1：結構化資料統一與基礎設定優化（程式重構，不涉新事實宣稱）

- [x] **1.1 統一全站 Organization Schema 節點（解決跨頁屬性漂移）**
  - **問題**：所有頁面使用相同的 `@id` (`https://ycaura.com#organization`)，但首頁有完整欄位（`alternateName`, `brand`, `image`, `knowsAbout`, `contactPoint`），而 4 個服務頁與 2 個知識頁缺少上述屬性。
  - **改動檔案**：
    - `app/site.ts`：抽取出共用的 `sharedServedAreas`、`sharedContactPoint` 與 `sharedOrganizationEntity` 常數。
    - `app/page.tsx`：改為引用 `sharedOrganizationEntity`（附加首頁特有的 `hasOfferCatalog`）。
    - `app/services/[slug]/page.tsx`：改為引用 `sharedOrganizationEntity`，刪除重複且不完整的定義。
    - `app/knowledge/stretch-marks/page.tsx`：改為引用 `sharedOrganizationEntity`。
    - `app/knowledge/dark-circles/page.tsx`：改為引用 `sharedOrganizationEntity`。
  - **驗證**：各頁輸出的 JSON-LD `@graph` 中，`Organization` 節點包含一致的完整屬性。
  - **狀態**：已於 2026-09-03 完成，測試通過。

- [x] **1.2 `contactPoint` 加入可聯繫時段（`hoursAvailable`）**
  - **背景**：店家營業型態為「純預約制，無現場營業時段，11:00–19:00 為可聯繫／安排預約時段，無固定公休日」。避免使用 `openingHoursSpecification`（防範 Google 誤判為可直接現場走入）。
  - **改動檔案**：
    - `app/site.ts`：在 `sharedContactPoint` 增加：
      ```json
      "hoursAvailable": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "11:00",
        "closes": "19:00"
      }
      ```
  - **驗證**：`npm test` 斷言 `hoursAvailable` 正確渲染且未引入頂層 `openingHoursSpecification`。
  - **狀態**：已於 2026-09-03 完成，測試通過。

- [x] **1.3 擴充 `public/robots.txt` AI 搜尋爬蟲與代表性機器人**
  - **改動檔案**：`public/robots.txt`
  - **內容**：在既有的 `GPTBot`, `OAI-SearchBot`, `ClaudeBot`, `PerplexityBot`, `Google-Extended` 之外，補齊：
    - `Applebot-Extended`（Apple Intelligence）
    - `meta-externalagent`（Meta AI 爬蟲）
    - `Amazonbot`
    - `cohere-ai`
    - `Bingbot`
  - **驗證**：`npm test` 的 crawler 支援測試確認所有目標 bot 正確輸出。
  - **狀態**：已於 2026-09-03 完成，測試通過。

- [x] **1.4 補強服務頁 Description 的在地關鍵字（Local SEO）**
  - **問題**：`skin-camouflage` 與 `colour-matching` 兩頁的 description 缺少「新北中和・捷運南勢角站」或「雙北」等具體在地關鍵字。
  - **改動檔案**：`app/services.ts`
    - `skin-camouflage`：在描述中適度補入「位於新北中和、南勢角站附近的雙和店…」。
    - `colour-matching`：在描述中適度補入「位於新北中和、南勢角站附近的雙和店…」。
    - *注意*：維持 Title 前段簡潔唯一，避免關鍵字堆疊。
  - **狀態**：已於 2026-09-03 完成，測試通過。

- [x] **1.5 清理未使用的範本代碼與空目錄**
  - **改動檔案**：
    - 移除未被引用的範本遺留物 `app/chatgpt-auth.ts`（共 87 行）。
    - 移除空目錄 `app/services/[slug]/[topic]`。
  - **驗證**：`npm run lint` 與 `npm test` 確認無任何中斷。
  - **狀態**：已於 2026-09-03 完成，eslint 與測試無警示通過。

---

### Batch 2：知識中心 Hub 頁面與 AEO 深度佈局（路由與內容擴充）

- [x] **2.1 建立 `/knowledge` 知識中心索引頁**
  - **問題**：目前訪客或爬蟲訪問 `https://ycaura.com/knowledge` 回傳 404 Not Found。妊娠紋與黑眼圈兩篇知識文章缺少統一的彙總樞紐。
  - **改動檔案**：
    - 新增 `app/knowledge/page.tsx`：
      - 導言清楚說明雙和店將肌膚常見紋路、色澤、眼周困擾拆解為科普知識。
      - 包含妊娠紋與黑眼圈兩篇文章的卡片入口與簡介。
      - 包含非醫療聲明與預約諮詢 CTA。
      - 結構化資料：包含 `CollectionPage` 或 `ItemList`（列出文章項目）、`BreadcrumbList` 與共用 `Organization`。
    - `public/sitemap.xml`：新增 `<loc>https://ycaura.com/knowledge</loc>` 及對應 `<lastmod>`。
    - `public/llms.txt`：在官方來源中加入 `[知識中心](https://ycaura.com/knowledge)`。
  - **驗證**：訪問 `/knowledge` 回傳 200，Sitemap 與 HTML 測試通過。
  - **狀態**：已於 2026-09-03 完成，測試通過。

- [x] **2.2 強化知識文章的內部鏈結網（Topic Cluster）**
  - **改動檔案**：
    - `app/knowledge/stretch-marks/page.tsx`：麵包屑改為 `首頁 > 知識中心 > 妊娠紋知識`；文末或側欄增加相關文章連結（指向黑眼圈知識與知識中心）。
    - `app/knowledge/dark-circles/page.tsx`：麵包屑同步調整為 `首頁 > 知識中心 > 黑眼圈`；增加指向妊娠紋知識與知識中心之連結。
    - 首頁 `app/page.tsx`：主導覽與肌膚知識區塊的「閱讀更多」明確導向 `/knowledge`。
  - **狀態**：已於 2026-09-03 完成，側欄與麵包屑鏈結完整串接並通過測試。

- [x] **2.3 評估建立 `public/llms-full.txt`**
  - **改動檔案**：新增 `public/llms-full.txt`
  - **內容**：匯整雙和店核心品牌資訊、所有服務說明與限制、QA 問答全文、知識頁面衛教精華，提供給支援完整讀取的 LLM 引擎（如 Cursor、Perplexity、ChatGPT Search）。
  - **狀態**：已於 2026-09-03 完成建立並通過爬蟲驗證測試。

---

### Batch 3：需外部店家確認與長期項目（P1／P2）

- [ ] **3.1 補齊 Google 商家（GBP）連結與座標**
  - 待取得店家 Google Business Profile 專屬連結與精確座標後，於 `sharedOrganizationEntity` 補上 `hasMap` 與 `geo` (`GeoCoordinates`)。
- [ ] **3.2 E-E-A-T 具名作者與專家實體**
  - 待店家於 `Projects/mps/99-待確認/待確認事項.md` 提供操作者之姓名、專業證照、培訓經歷後，再行建立作者專頁與 `Person` Schema。未取得前不得擅自臆測或偽造。
- [ ] **3.3 長尾衛教文章產出**
  - 依據 SEO 計畫 P2（肥胖紋、成長紋、疤痕色澤與紋理差異），在取得醫療文獻查核後逐步產出新文章並掛載至 `/knowledge`。

---

## 3. 驗收與測試規範

執行完成後，需依序完成以下驗證：

1. **單元與整合測試**：
   - 執行 `npm test`（包含 `npm run build` 與 `node --test tests/rendered-html.test.mjs`）。
   - 在 `tests/rendered-html.test.mjs` 中追加：
     - Organization 在首頁、服務頁、知識頁的屬性一致性斷言。
     - `hoursAvailable` 存在且無 `openingHoursSpecification` 斷言。
     - `/knowledge` 路由渲染 200、包含 `CollectionPage` 或 `ItemList` 斷言。
     - `robots.txt` 新增爬蟲之斷言。
2. **語法與代碼檢查**：
   - 執行 `npm run lint`，確保無 ESLint 警告或錯誤。
3. **共享記憶庫同步**：
   - 更新 WSL 路徑 `/mnt/c/Users/user/obs-notes/Projects/mps/04-SEO-AEO/SEO與AEO策略.md` 之更新日期與執行進度。
