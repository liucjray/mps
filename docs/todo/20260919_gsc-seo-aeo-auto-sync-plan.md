# Push 後 GSC／SEO／AEO 自動同步流程規劃

建立日期：2026-09-19  
狀態：Phase 1 實作完成，已通過本地驗證與獨立 review；待 merge 到 `main` 與一次性授權設定  
目標網站：<https://ycaura.com/>  
相關文件：`docs/todo/20260904_gsc-automation-workflow.md`、`docs/todo/20260904_indexnow-automation.md`

---

## 1. 目標與結論先行

目標是讓日後 `push main` 後，不需要每次人工進入 Google Search Console 操作；系統會在部署成功後自行判斷這次變更是否值得通知 Google，必要時以 Search Console API 重新提交 sitemap，並同步完成既有的 IndexNow 與 SEO／AEO 驗證。

這裡的「自動索引」要分清楚兩件事：

1. 可以自動重新提交 sitemap，通知 Google sitemap 有新版本。
2. 不能把一般知識頁或服務頁透過 Google Indexing API 強制要求立即收錄。Google Indexing API 的正式適用範圍是 `JobPosting` 與直播事件頁面；本站一般頁面應依 sitemap、內部連結與 Google 自然抓取流程處理。

因此本方案承諾的是：

- 推送後自動部署、驗證、判斷與通知。
- 不要求每次 push 都刷新 GSC。
- 不用不適用的 Indexing API 硬推一般頁面。
- 不用自動生成未經店家確認的醫療、價格、資格、案例或預約規則。
- Google 最終何時抓取與收錄仍由 Google 排程與品質判斷決定，不承諾即時收錄。

每次 push 不必人工處理；但第一次設定 Google Cloud／Search Console 授權與 GitHub Actions 機密仍需要一次性人工完成。

## 2. 目前 repo 的實際狀態

### 已存在

- `.github/workflows/deploy.yml` 已在 push `main` 後執行 Cloudflare Worker build、部署與公開首頁驗證。
- `public/robots.txt` 已宣告 `https://ycaura.com/sitemap.xml`。
- `public/sitemap.xml` 是目前 11 個 canonical URL 的靜態 sitemap（含公開自動同步驗證頁）。
- `scripts/submit-indexnow.mjs` 已在部署後推送 sitemap 內的 URL 到 IndexNow。
- 最近一次部署已成功；IndexNow 已成功送出 10 個 URL。

### 本次已加入的自動化初版

- `scripts/gsc-notify.mjs`：驗證 sitemap、使用服務帳戶 JWT 取得 token，並呼叫 Search Console API。
- `scripts/classify-seo-aeo-change.mjs`：根據 commit diff 判斷是否需要提交 GSC sitemap。
- `scripts/seo-aeo-check.mjs`：部署後檢查公開 sitemap、robots、llms、canonical、title、H1 與 JSON-LD。
- `scripts/seo-aeo-check.mjs` 也會在部署前檢查 route-to-sitemap 一致性、llms 路由／聯絡入口、JSON-LD schema semantics 與多頁 metadata 重複；部署後再檢查正式站。
- deploy workflow：只有分類結果需要時才執行 GSC submit，並上傳 impact／validation report。
- `GSC_CREDENTIALS` 是否存在仍無法由 repo 程式碼確認；未設定時 workflow 會清楚記錄並非阻塞地跳過 GSC。

## 3. 什麼情況需要刷新 GSC sitemap

判斷依據不是「有沒有 push」，而是「公開搜尋訊號是否有實質變化」。

| 變更情況 | 更新 sitemap／`lastmod` | 自動提交 GSC sitemap | 建議另做 URL Inspection |
| --- | --- | --- | --- |
| 新增公開頁面或新的知識文章 | 新增 URL，填正確 `lastmod` | 是 | 新頁面很重要時可做一次 |
| 移除頁面、改 slug、改 canonical URL | 移除或更新 URL | 是 | 需要確認舊 URL 轉址或移除狀態 |
| sitemap URL 集合、XML 結構或圖片 URL 大幅變更 | 更新 | 是 | 通常不需要逐頁做 |
| 主要正文、title、description、FAQ、JSON-LD、重要內部連結改變 | 更新受影響頁面的 `lastmod` | 建議 | 重要頁面可做一次 |
| robots.txt、canonical、hreflang、`llms.txt` 改變 | 依影響範圍更新 | 建議 | 有索引風險時檢查 |
| 只有 CSS、排版、動畫、GA4、測試或 repo 文件改變 | 不更新 | 否 | 否 |
| 部署但公開 HTML、URL 與 sitemap 都沒有變 | 不更新 | 否 | 否 |
| sitemap 下載失敗、XML 錯誤、URL 大量 404 | 修正後更新 | 是 | 檢查錯誤 URL |

`lastmod` 不應因為每次部署而全部改成今天。Google 指的是頁面的「重大修改」；小幅 footer、sidebar 或樣式變更不需要更新，主要文字、結構化資料或重要連結改變才適合更新。

## 4. 推送後的自動流程

```text
push main
  │
  ├─ 1. Build、lint、rendered HTML、SEO/AEO deterministic checks
  │       └─ 失敗：停止部署，不通知 GSC
  │
  ├─ 2. 部署 Cloudflare Worker
  │
  ├─ 3. 驗證公開輸出
  │       ├─ 主要頁面 HTTP 200
  │       ├─ robots.txt 可讀
  │       ├─ sitemap.xml 為有效 XML 且 HTTP 200
  │       ├─ sitemap 內每個 URL 是 canonical URL
  │       └─ 新增／修改 URL 的 canonical、robots、JSON-LD 正常
  │
  ├─ 4. 產生 SEO／AEO 變更分類
  │       ├─ no-op：樣式、測試、文件等 → 跳過 GSC
  │       ├─ content-change：正文、metadata、schema、內鏈等 → 提交 GSC sitemap
  │       ├─ url-change：新增、移除、改 slug、canonical → 提交 GSC sitemap
  │       └─ sitemap-error：驗證失敗 → 顯示警告，必要時阻擋完成狀態
  │
  ├─ 5. needsGscSitemapSubmit = true 時
  │       └─ 呼叫 Search Console API：sitemaps.submit
  │
  ├─ 6. IndexNow
  │       └─ 維持現有推送，服務 Bing、Yandex 等支援的搜尋引擎
  │
  └─ 7. 上傳部署摘要
          ├─ 這次變更分類
          ├─ 受影響 URL
          ├─ sitemap 驗證結果
          ├─ GSC submit 結果
          └─ IndexNow 結果
```

## 5. 自動判斷規則

### 5.1 高確定性觸發條件

以下任一條件成立，就設定 `needsGscSitemapSubmit=true`：

- `public/sitemap.xml` 的 URL、`lastmod` 或 `image:loc` 改變。
- 新增或刪除 `app/**/page.tsx` 公開路由。
- 頁面 metadata、canonical、robots、JSON-LD、FAQ 或 Article 資料改變。
- `app/site.ts`、`app/services.ts` 或 `public/llms.txt`、`public/llms-full.txt` 改變。
- 主要知識文章或服務正文改變。
- `public/robots.txt`、站點 canonical host 或 hreflang 策略改變。

### 5.2 明確跳過條件

以下變更不刷新 GSC sitemap：

- `app/globals.css` 或只影響視覺呈現的 CSS。
- 純圖片壓縮或不在 sitemap 中的裝飾資產。
- 測試、文件、worktree、截圖與 CI 輔助檔案。
- 只改 GA4、事件名稱或非 SEO 的互動程式碼。

### 5.3 不確定變更的保守策略

若變更位於公開頁面，但分類器無法判斷是樣式還是內容，採取「提交 sitemap、不要自動改寫 `lastmod`」的策略。重複提交 sitemap 的風險低於漏掉重大公開內容更新；但錯誤的 `lastmod` 會逐漸降低 Google 對該訊號的信任，因此 `lastmod` 必須由頁面資料或明確 sitemap diff 驅動。

## 6. AEO／SEO 自動化範圍

### 6.1 可以完全自動化的項目

- 每個 sitemap URL 是否回傳 200。
- 是否是 HTTPS、canonical URL 是否一致。
- `robots.txt` 是否存在且仍指向 sitemap。
- title、description、Open Graph、canonical 是否存在且每頁唯一。
- JSON-LD 是否為合法 JSON，`@id`、Article、FAQPage、Breadcrumb、Organization 關聯是否可解析。
- 新頁面是否有 breadcrumb、內部連結與 sitemap 入口。
- `llms.txt`、`llms-full.txt` 是否仍列出實際公開路由與官方聯絡入口。
- 是否意外出現師父背景頁作為雙和店事實來源、未確認價格、資格、醫療承諾或預約規則。
- 將檢查結果輸出到 GitHub Actions Summary 與可下載 artifact。

### 6.2 不應在 CI 自動生成或自行猜測的項目

- 醫療成效、禁忌、孕期／哺乳規範。
- 操作者資格、療程程序、價格、退款或改期規則。
- 案例、照片、客戶同意與隱私描述。
- Google 尚未確認的排名、收錄或轉換成效。

AEO 自動化的第一階段應該是「確保答案來源完整、可抓取、彼此一致」，不是讓模型在沒有店家確認的情況下自動編寫公開宣稱。若未來要加入 AI 草稿，也只能產生待審草稿，不得直接部署到公開頁面。

## 7. GSC 自動提交的技術設計

### 7.1 一次性設定

需要人工完成一次，之後日常 push 不再需要人工操作：

1. 在 Google Cloud 建立或選擇專案。
2. 啟用 Google Search Console API。
3. 建立具最小權限的服務帳戶。
4. 在 Search Console 的 `https://ycaura.com/` URL-prefix property 授權該服務帳戶至少 Full 權限。
5. GitHub Actions 使用機密認證。

優先方案是 GitHub OIDC／Google Workload Identity Federation，避免長期 JSON 私鑰；若先採用現有規劃的 JSON 方案，完整 JSON 只能放在 GitHub Actions Secret `GSC_CREDENTIALS`，不能進 repo、`.env` 或工作日誌。

### 7.2 Workflow 與腳本

本次已新增：

- `scripts/gsc-notify.mjs`：驗證公開 sitemap、取得 OAuth token、呼叫 `sitemaps.submit`、過濾機密日誌。
- `scripts/seo-aeo-check.mjs`：執行公開輸出與結構化資料檢查。
- `scripts/classify-seo-aeo-change.mjs`：根據 commit diff 判斷是否需要提交 GSC sitemap。
- `.github/workflows/deploy.yml`：在 Cloudflare 部署成功並驗證公開輸出後，依分類結果條件式執行 GSC submit。
- `tests/seo-aeo-pipeline.test.mjs`：測試 deterministic checks、JWT 與分類器行為。

GSC API 失敗時不應回滾已成功的 Cloudflare 部署；應在 Actions Summary 顯示警告並保留 artifact。缺少 credential 時可以非阻塞跳過，但應清楚標記「GSC 自動同步尚未啟用」，避免誤以為已完成。

## 8. 驗收案例

| 情境 | 預期行為 |
| --- | --- |
| 只改 `globals.css` | 部署成功；GSC skip；IndexNow 可依現有策略執行 |
| 新增知識頁並加入 sitemap | build／SEO checks 通過後部署；GSC submit；IndexNow 推送；報告列出新 URL |
| 修改 Article 正文、FAQ 或 JSON-LD | 更新正確頁面的 `lastmod`；GSC submit；報告列出受影響頁面 |
| 只新增測試或 docs | GSC skip |
| sitemap XML 不合法 | 不執行 GSC submit；Actions 明確失敗或警告；不得假裝同步成功 |
| GSC 403／429／5xx | Cloudflare 部署保留成功；GSC step 顯示告警與重試結果 |
| 缺少 `GSC_CREDENTIALS` 或 OIDC 設定 | 部署不被 GSC 阻斷，但報告標為未啟用 |
| 一般服務頁想用 Indexing API 強制收錄 | 禁止；改走 sitemap 與必要時人工 URL Inspection |

### 8.1 使用公開驗證頁確認自動 GSC submit

公開驗證頁：`https://ycaura.com/knowledge/gsc-automation-check`

這個頁面是專門用來驗證「新增公開 URL → 部署 → 條件式提交 GSC sitemap」的保留頁面，不是服務頁，也不承諾 Google 收錄。它已加入 `public/sitemap.xml`、`public/llms.txt` 與 `public/llms-full.txt`，因此新增或修改它會被分類器視為搜尋相關變更。

驗證時應觀察同一次 GitHub Actions run：

1. `Classify SEO/AEO change` 的輸出包含 `sitemap URL set changed`，且 `needs_gsc_sitemap_submit=true`。
2. `Validate built SEO/AEO output before deploy` 通過，確認新頁面在部署前已具備 200、canonical、metadata 與 JSON-LD。
3. `Validate public SEO/AEO output` 通過，確認 Cloudflare 上的新頁面已公開。
4. `Submit sitemap to Google Search Console` 顯示執行，而不是 `-`；報告 artifact 的 `gsc-report.json` 應為 `status: "submitted"`。
5. GitHub Actions Summary 顯示 `GSC sitemap: submitted`。這代表 API 已接受 sitemap submit，不代表頁面立即收錄；Google 的抓取與收錄仍由 Google 排程及品質系統決定。

本次驗證 commit `2031894` 的實際結果：第 1～3 項通過，GSC step 確實執行，但 Google API 回傳 HTTP 403，因此 artifact 的 `gsc-report.json` 為 `status: "failed"`，尚未算完成授權驗證。完成授權修正後，可在 GitHub Actions 的 `Run workflow` 將 `force_gsc` 設為 true 重跑，不需要改動公開頁面；也可使用 `gh workflow run deploy.yml --ref main -f force_gsc=true`。

若 GSC step 顯示 `skipped`，先檢查 classifier 輸出與 `GSC_CREDENTIALS` Secret；若顯示 403，檢查 Service Account 是否已被加入正確的 `https://ycaura.com/` URL-prefix property；若顯示 401，檢查 Secret 內 JSON 是否完整。API 的 429／5xx 會依腳本設定重試，結果會保留在 Summary 與 artifact。

這個驗證頁不應在測試後刪除；刪除會再觸發 sitemap URL 移除同步，且不能把 GSC submit 誤解為立即索引測試。

## 9. 分階段實作建議

### Phase 0：確認本文件

- 確認「每次 push 不人工操作，但 Google Cloud／GSC 授權只需一次」符合期待。
- 確認採用 JSON Secret 的快速方案，或直接採用 OIDC／Workload Identity Federation。

### Phase 1：GSC sitemap 自動提交（本次實作）

- 實作變更分類器與 sitemap public verification。
- 實作 `sitemaps.submit` API。
- 將 GSC step 加入 deploy workflow。
- 補測試與 Actions Summary。

### Phase 2：SEO／AEO deterministic gate

- 將 metadata、canonical、JSON-LD、robots、sitemap、llms 檢查集中化。
- 對新增／刪除 URL 做 route-to-sitemap 一致性檢查。
- 產生每次部署的 SEO／AEO 變更報告。

### Phase 3：降低維護成本

- 讓 sitemap 與已確認的公開路由／內容資料有單一來源，減少手動漏改。
- 在允許的前提下改用 OIDC，移除長效 JSON 私鑰。
- 依 GSC sitemap report、URL Inspection 與 GA4／Cloudflare 訊號調整分類規則；不以猜測資料取代店家確認。

## 10. 完成定義

- 一般 push 後不需要人工重新提交 GSC sitemap。
- 只有涉及公開搜尋訊號的變更才會呼叫 GSC API。
- 新增／刪除頁面會被檢查是否同步 sitemap、canonical、robots、JSON-LD 與 `llms`。
- 樣式／測試／文件 push 不會製造假的 `lastmod` 或不必要的 GSC 通知。
- GSC API 失敗不會回滾已成功的部署，但會留下可追蹤警告。
- AEO／SEO 自動化不會自行生成未確認的醫療或商業公開宣稱。
- 所有結果都能在 GitHub Actions Summary 中看見：分類、URL、sitemap、GSC、IndexNow 與錯誤原因。

## 11. 官方依據

- [Google Search Console Sitemap 報告](https://support.google.com/webmasters/answer/7451001?hl=en)：sitemap 成功抓取後會定期重新抓取；只有 sitemap 有重大變更或抓取錯誤時，才需要重新提交。
- [Google Search Central：Build and Submit a Sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)：sitemap 是協助發現 URL 的提示，不保證下載或收錄；`robots.txt` 也可以宣告 sitemap。
- [Google Search Central：Sitemaps ping endpoint 與 `lastmod`](https://developers.google.com/search/blog/2023/06/sitemaps-lastmod-ping)：`lastmod` 應反映重大修改，不應因小幅樣式或邊欄變更而虛假更新。
- [Google Search Console API：Sitemaps submit](https://developers.google.com/webmaster-tools/v1/sitemaps/submit)：可用 API 重新提交 sitemap，需 Search Console property 授權。
- [Google Indexing API 使用限制](https://developers.google.com/search/apis/indexing-api/v3/using-api)：正式適用於 `JobPosting` 與直播事件頁面，不適用本站一般知識頁與服務頁。
