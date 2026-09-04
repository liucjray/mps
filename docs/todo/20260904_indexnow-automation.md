# IndexNow 即時索引推播系統建置

建立日期：2026-09-04  
網站：<https://ycaura.com/>  
分類：技術 SEO / GEO（生成式引擎最佳化）自動化  

---

## 1. 執行背景與效益

Google Search Console 雖具備 API，但官方嚴格限制一般內容網頁無法使用 Indexing API 進行「要求建立索引」，必須透過網頁後台手動逐一操作；且過去的 Sitemap Ping 機制已被 Google 廢止。

相較之下，微軟與 Bing 所主導的 **IndexNow 協定** 是目前搜尋引擎生態系（Bing、Yandex、Naver、Seznam 等）共同支援的 URL 變更主動通知標準：
- **免複雜認證**：僅需在站點根目錄存放金鑰驗證 txt 檔。
- **主動推播通知**：每次發布新內容或修訂頁面後，主動發送 API 請求通知參與的搜尋引擎有更新，促使爬蟲及時排程抓取，相較於純被動等待 sitemap 輪巡更能降低發現延遲（實際爬取與索引時程仍由各搜尋引擎演算法排程決定）。

---

## 2. 待辦項目清單

- [x] **2.1 產生唯一 IndexNow 金鑰與驗證檔案**（已完成於 2026-09-04）
  - 產生一組 32 位元唯一 hex 金鑰（`e9bc2e27a67fe6a725cf2b64a15917a0`）。
  - 於 `public/` 建立 `e9bc2e27a67fe6a725cf2b64a15917a0.txt`，內容包含金鑰本身，確保可透過 `https://ycaura.com/e9bc2e27a67fe6a725cf2b64a15917a0.txt` 公開讀取。

- [x] **2.2 撰寫 Node.js 推播腳本 (`scripts/submit-indexnow.mjs`)**（已完成於 2026-09-04）
  - 讀取 `public/sitemap.xml` 解析出全站所有有效 URL。
  - 發送標準 HTTP POST 請求至 `https://api.indexnow.org/indexnow`。
  - 支援 `--dry-run` 模式以供離線驗收與測試。

- [x] **2.3 整合至專案工作流程**（已完成於 2026-09-04）
  - 在 `package.json` 加入腳本指令：`"submit:indexnow": "node scripts/submit-indexnow.mjs"`。
  - 在 GitHub Actions 的部署工作流（`.github/workflows/deploy.yml`）中加入自動執行步驟（`continue-on-error: true`，不阻斷生產部署）。

---

## 3. 影響檔案與驗證標準

- **預計新增/改動檔案**：
  - `public/<key>.txt`
  - `scripts/submit-indexnow.mjs`
  - `package.json`
  - `tests/rendered-html.test.mjs`（追加金鑰檔案公開可存取斷言）
- **驗收標準**：
  - `curl https://localhost/<key>.txt` 返回 200 且內容為正確金鑰。
  - 腳本能正確解析 Sitemap 並成功向 IndexNow API 送出請求。
  - 通過 `npm test` 與 `npm run lint`。
