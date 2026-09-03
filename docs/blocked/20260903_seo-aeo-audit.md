# 全站 SEO／AEO 優化執行待辦清單（Blocked / 待外部資料清單）

建立日期：2026-09-03  
更新日期：2026-09-04  
檔案狀態：已移入 `docs/blocked/`（Batch 1、Batch 2 與 3.3 已全數實作完成；3.1 與 3.2 因欠缺外部店家必要資訊而暫時 Blocked）  
網站：<https://ycaura.com/>  
前置文件：
- `docs/todo/20260831_seo-aeo-audit.md`（2026-08-31 稽核與已完成 P0）
- `docs/seo/260828_mavis-shuanghe-seo-aeo-optimization-plan.md`（總體規劃）
- Obsidian 共享記憶庫：`Projects/mps/04-SEO-AEO/SEO與AEO策略.md`

---

## 1. 執行背景與進度摘要

本清單自 2026-09-03 建立並依序執行全站結構化資料統一、在地關鍵字加強、知識中心 Hub 建置與主題集群（Topic Cluster）串聯。
至 2026-09-04 已完成 Batch 1（基礎架構）、Batch 2（知識中心路由與 AEO 大模型索引）以及 Batch 3 中的 3.3（肥胖紋與生長紋科普長尾文章）。

由於剩餘的 **3.1（Google 商家地標與座標）** 與 **3.2（E-E-A-T 具名作者真實資歷）** 均受限於外部事實資料，依據專案規範嚴禁自行揣測或捏造，故在店家提供資料前無法進行程式寫入，文件狀態更新後移入 `docs/blocked/` 列管。

---

## 2. 項目執行狀態清單

### Batch 1：結構化資料統一與基礎設定優化（程式重構，不涉新事實宣稱）

- [x] **1.1 統一全站 Organization Schema 節點（解決跨頁屬性漂移）**
  - **改動檔案**：
    - `app/site.ts`：抽取出共用的 `sharedServedAreas`、`sharedContactPoint` 與 `sharedOrganizationEntity` 常數。
    - `app/page.tsx`：改為引用 `sharedOrganizationEntity`。
    - `app/services/[slug]/page.tsx`：改為引用 `sharedOrganizationEntity`。
    - `app/knowledge/stretch-marks/page.tsx`：改為引用 `sharedOrganizationEntity`。
    - `app/knowledge/dark-circles/page.tsx`：改為引用 `sharedOrganizationEntity`。
  - **狀態**：已於 2026-09-03 完成，測試通過。

- [x] **1.2 `contactPoint` 加入可聯繫時段（`hoursAvailable`）**
  - **背景**：店家營業型態為純預約制，避免使用 `openingHoursSpecification` 防範 Google 誤判為可直接現場走入。
  - **改動檔案**：`app/site.ts` 增加 `hoursAvailable`（11:00–19:00）。
  - **狀態**：已於 2026-09-03 完成，測試通過。

- [x] **1.3 擴充 `public/robots.txt` AI 搜尋爬蟲與代表性機器人**
  - **改動檔案**：`public/robots.txt`（補齊 `Applebot-Extended`, `meta-externalagent`, `Amazonbot`, `cohere-ai`, `Bingbot`）。
  - **狀態**：已於 2026-09-03 完成，測試通過。

- [x] **1.4 補強服務頁 Description 的在地關鍵字（Local SEO）**
  - **改動檔案**：`app/services.ts`（補入「位於新北中和、南勢角站附近的雙和店…」）。
  - **狀態**：已於 2026-09-03 完成，測試通過。

- [x] **1.5 清理未使用的範本代碼與空目錄**
  - **改動檔案**：移除 `app/chatgpt-auth.ts` 與空目錄 `app/services/[slug]/[topic]`。
  - **狀態**：已於 2026-09-03 完成，測試通過。

---

### Batch 2：知識中心 Hub 頁面與 AEO 深度佈局（路由與內容擴充）

- [x] **2.1 建立 `/knowledge` 知識中心索引頁**
  - **改動檔案**：新增 `app/knowledge/page.tsx`、更新 `public/sitemap.xml` 與 `public/llms.txt`。
  - **狀態**：已於 2026-09-03 完成，測試通過。

- [x] **2.2 強化知識文章的內部鏈結網（Topic Cluster）**
  - **改動檔案**：更新 `stretch-marks` 與 `dark-circles` 麵包屑、延伸閱讀與首頁肌膚知識導覽。
  - **狀態**：已於 2026-09-03 完成，測試通過。

- [x] **2.3 建立 `public/llms-full.txt`**
  - **改動檔案**：新增 `public/llms-full.txt`，匯整全站品牌、服務、限制與衛教核心。
  - **狀態**：已於 2026-09-03 完成，測試通過。

---

### Batch 3：需外部店家確認與長期項目（P1／P2）

- [ ] **3.1 補齊 Google 商家（GBP）連結與座標 ⚠️ [BLOCKED - 待店家資料]**
  - **阻擋原因**：尚未取得店家 Google Business Profile 專屬短網址及店址精確經緯度。依據專案規範，嚴禁自行揣測或以非官方定位填入，以免與商家地標不符。
  - **解除阻擋後動作**：取得資料後，於 `app/site.ts` 的 `sharedOrganizationEntity` 補上 `hasMap` 與 `geo` (`GeoCoordinates`)。

- [ ] **3.2 E-E-A-T 具名作者與專家實體 ⚠️ [BLOCKED - 待店家資料]**
  - **阻擋原因**：店家尚未於 `Projects/mps/99-待確認/待確認事項.md` 提供操作者真實姓名、專業證照與培訓認證背景。依據專案規範，嚴禁臆測或偽造專家實體。
  - **解除阻擋後動作**：取得正式背景事實後，再於知識頁面建立作者簡介並於 JSON-LD 注入 `Person` Schema。

- [x] **3.3 長尾衛教文章產出（P2）**
  - **改動內容**：
    - 依據 SEO 計畫 P2（肥胖紋、成長紋、妊娠紋之成因差異與紅白演變），完成文獻查核與撰寫。
    - 建立專屬路由：`app/knowledge/striae-comparison/page.tsx`。
    - 清楚標註皮膚擴張紋（Striae Distensae）真皮結締組織之生理機轉、紅紋（充血發炎）與白紋（成熟萎縮）之階段差異，並區隔妊娠線與橘皮組織。
    - 明確宣稱外觀修飾服務邊界，嚴格遵守非醫療、不保證紋路完全消除、不使用未驗證專利詞彙之規定。
    - 同步更新：`app/site.ts`、`app/knowledge/page.tsx`、`stretch-marks` 與 `dark-circles` 雙向鏈結、`public/sitemap.xml`、`public/llms.txt`、`public/llms-full.txt`。
  - **驗證**：已於 2026-09-04 完成，通過 `npm test`（9 項測試全數通過）與 OpenAI Codex 獨立代碼審查確認無誤。

---

## 3. 驗收與測試記錄

1. **單元與整合測試**：
   - 執行 `npm test`（包含 `npm run build` 與 `node --test tests/rendered-html.test.mjs`）。
   - 測試套件包含 9 項測試，全數通過（含 `/knowledge/striae-comparison`、Sitemap、LLMs、JSON-LD 等斷言）。
2. **語法與代碼檢查**：
   - 執行 `npm run lint`，ESLint 0 錯誤、0 警告通過。
3. **第二意見代碼審查（Codex Review）**：
   - 透過本機 OpenAI Codex 進行深度審查，已依審查意見精確修正皮膚解剖層名詞（真皮層彈性纖維與表皮支撐萎縮）、移除未驗證專利設備字眼、將服務範圍調整為諮詢評估導向。
