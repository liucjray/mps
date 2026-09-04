# Google Search Console 自動化通知與 Sitemap 提交工作流建置指南

建立日期：2026-09-04  
最後修訂：2026-09-04（經 Codex 跨模型架構審查覆核校準）  
目標網站：<https://ycaura.com/>  
分類：DevOps 自動化 / 技術 SEO / 索引加速  

---

## 1. 架構與設計理念

### 1.1 核心痛點與正確認知
- 每次網站發布新頁面（長尾知識頁、新服務說明、FAQ 更新）後，Googlebot 通常依賴定期被動輪詢 `sitemap.xml`，索引收錄常有數天至數週的延遲。
- Google 早已廢止公開的 `ping?sitemap=...` HTTP 端點，手動在 GSC 逐頁點擊「要求編入索引」費時費力。
- **客觀效益邊界**：呼叫 GSC API 的 `sitemaps.submit` 旨在**主動告知 Googlebot Sitemap 已有新版本並請求排程重新檢索**；此 API 能加速爬蟲的排程發現，但**絕非保證當日即時收錄**，最終檢索與索引時程仍由 Google 演算法依網站品質與配額排程決定。

### 1.2 自動化架構
透過 **GitHub Actions** 搭配 **GitHub Secrets** 與 **Google Cloud 服務帳戶 (Service Account)**，實現全自動、免人工介入且高安全性的通知流水線：

```mermaid
flowchart TD
    A[git push main] --> B[GitHub Actions: Deploy to Cloudflare]
    B --> C[驗證網站部署成功 (Verify public site & sitemap.xml)]
    C --> D{檢查 GSC_CREDENTIALS Secret}
    D -- 未設定 --> E[記錄提示並優雅跳過 (Exit 0, 部署完全不受影響)]
    D -- 已設定 --> F[scripts/gsc-notify.mjs (限時 2 分鐘, continue-on-error)]
    F --> G[構造 JWT Claims: iss, sub, aud, scope, iat, exp]
    G --> H[使用私鑰生成 RS256 JWT 取得 Google OAuth2 Token]
    H --> I[呼叫 GSC Search Console API: sitemaps.submit]
    I --> J[驗證 HTTP 200/204 成功確認；若遇 429/5xx 實施退避重試]
```

### 1.3 安全防護與非阻塞部署原則
1. **零金鑰入庫**：Google 服務帳號私鑰**絕對不進入 Git 倉庫**，亦不需要存放在本地開發環境。
2. **機敏資訊隔離**：私鑰完整 JSON 僅儲存在 GitHub 倉庫的 `Settings` -> `Secrets and variables` -> `Actions` 加密儲存庫（Secret 名稱：`GSC_CREDENTIALS`）。
3. **高階替代方案（推薦企業級環境）**：未來若環境允許，可進一步升級為 **GitHub OIDC + Google Workload Identity Federation**，全面消除靜態長效私鑰。
4. **非阻塞性失敗策略（Non-blocking Failure Policy）**：
   - 通知步驟標註 `continue-on-error: true`，且設定有限逾時（`timeout-minutes: 2`）。
   - 無論 Google API 遇到 403 權限不足、429 配額超限、5xx 暫時性錯誤或網路斷線，腳本與 CI 皆**僅記錄告警，絕不標記部署為失敗**，保障生產環境的發布穩定性。
5. **前置驗證公開 Sitemap**：在發送 API 提交前，先在本地或公開端點驗證 `https://ycaura.com/sitemap.xml` 狀態為 HTTP 200 且具備正確 XML 結構與最新 `<lastmod>`，避免向 Google 提交無效或陳舊的站點地圖。
6. **原生輕量實作**：使用 Node.js 原生 `node:crypto` 與 `fetch` 簽署 JWT，無需額外安裝重型外部相依套件，保持 CI 構建極速乾淨。

---

## 2. 使用者設定指南（一次性設定）

### 步驟 1：建立 Google Cloud 服務帳戶並下載金鑰（約 2 分鐘）
1. 登入 [Google Cloud Console](https://console.cloud.google.com/)。
2. 建立新專案（例如 `mps-gsc-automation`）或選擇現有專案。
3. 前往「**API 和服務**」>「**已啟用的 API 和服務**」> 點擊「**啟用 API 和服務**」。
4. 搜尋並啟用 **Google Search Console API**。
5. 前往「**IAM 與管理**」>「**服務帳戶 (Service Accounts)**」> 點擊「**建立服務帳戶**」：
   - 服務帳戶名稱：`gsc-sitemap-submitter`
   - 角色：**不需**授予任何 GCP 專案層級特權（遵循最小權限原則）。
   - 點擊「完成」。
6. 在列表中點選剛建立的服務帳戶，切換至「**金鑰 (Keys)**」分頁。
7. 點擊「**新增金鑰**」>「**建立新的金鑰**」> 選擇 **JSON** 格式下載。
8. 記下該服務帳戶的電子郵件地址（例如 `gsc-sitemap-submitter@xxxx.iam.gserviceaccount.com`）。

### 步驟 2：在 Google Search Console 授權該服務帳戶（約 1 分鐘）
1. 開啟 [Google Search Console](https://search.google.com/search-console)。
2. 於左上角選取目標資源：
   - **重要規範**：請務必選取或建立 **網址前置字元（URL-prefix）資源** `https://ycaura.com/`（帶斜線）。
   - *注意*：若僅在網域型資源（`sc-domain:ycaura.com`）授權，API siteUrl 識別碼不同將導致 403 拒絕存取。
3. 點擊左下角「**設定**」>「**使用者與權限**」。
4. 點擊右上角「**新增使用者**」：
   - 電子郵件地址：貼上剛才的服務帳戶 Email。
   - 權限：選擇「**完整權限 (Full)**」或「**擁有者 (Owner)**」（Sitemap 提交至少需要 Full 權限）。
5. 點擊「新增」完成綁定。

### 步驟 3：在 GitHub 倉庫設定 Secret（約 1 分鐘）
1. 前往 GitHub 專案倉庫：`https://github.com/liucjray/mps`。
2. 點擊「**Settings**」> 左側選單「**Secrets and variables**」>「**Actions**」。
3. 於「Repository secrets」區塊點擊「**New repository secret**」：
   - **Name**：`GSC_CREDENTIALS`
   - **Secret**：打開步驟 1 下載的 `.json` 金鑰檔案，將完整內容複製並貼入。
4. 點擊「Add secret」保存。

---

## 3. 專案程式碼實作規範

### 3.1 推播腳本：`scripts/gsc-notify.mjs`
核心職責與邊界處理：
1. **環境檢查**：
   - 若 `process.env.GSC_CREDENTIALS` 未設定或為空字串，輸出提示「GSC_CREDENTIALS not configured, skipping sitemap submission」並 `process.exit(0)`。
2. **前置 Sitemap 有效性檢查**：
   - 發送 HEAD/GET 檢查 `https://ycaura.com/sitemap.xml`，確認狀態碼為 200 且 Content-Type 符合 XML，避免提交空檔或 404 頁面。
3. **標準 JWT Bearer 結構構造**：
   - Header: `{ "alg": "RS256", "typ": "JWT" }`
   - Payload Claims:
     - `iss`: `client_email`
     - `sub`: `client_email`
     - `aud`: `https://oauth2.googleapis.com/token`
     - `scope`: `https://www.googleapis.com/auth/webmasters`
     - `iat`: Math.floor(Date.now() / 1000) - 30（扣除 30 秒防止時鐘偏差）
     - `exp`: Math.floor(Date.now() / 1000) + 3600（最長 1 小時）
4. **簽署與 Token 交換**：
   - 使用 `node:crypto.createSign("RSA-SHA256")` 針對 Header + Payload 進行私鑰簽署。
   - 向 `https://oauth2.googleapis.com/token` 交換 Access Token。
5. **呼叫 Search Console API**：
   - 端點：`PUT https://www.googleapis.com/webmasters/v3/sites/https%3A%2F%2Fycaura.com%2F/sitemaps/https%3A%2F%2Fycaura.com%2Fsitemap.xml`
   - Header: `Authorization: Bearer <TOKEN>`
   - 重試機制：針對 HTTP 429 或 5xx 實施指數退避重試（最多 2 次，每次間隔 2 秒、4 秒）。
6. **日誌防護**：
   - 任何錯誤訊息中過濾私鑰與敏感 token 內容，避免印在 CI Log。

### 3.2 工作流整合：`.github/workflows/deploy.yml`
在 Cloudflare Worker 部署並通過 `Verify public site` 後執行：

```yaml
      - name: Verify public sitemap
        run: |
          curl --fail --silent --show-error --retry 3 --retry-delay 3 \
            --output /tmp/ycaura-sitemap.xml https://ycaura.com/sitemap.xml
          grep -q '<urlset' /tmp/ycaura-sitemap.xml

      - name: Notify Google Search Console of updated sitemap
        continue-on-error: true
        timeout-minutes: 2
        env:
          GSC_CREDENTIALS: ${{ secrets.GSC_CREDENTIALS }}
        run: node scripts/gsc-notify.mjs
```

### 3.3 測試覆蓋規劃
1. **Mock 離線單元測試**：
   - 模擬缺少 Secret 時返回 0。
   - 模擬 JWT 生成驗證其 Header、Claims（含 `iat`、`exp` 數值正確性）與簽章結構。
   - 模擬 GSC API 返回 200/204 成功、403 權限錯誤、429 配額重試等邊界情境，確保例外均被安全捕獲且不洩漏金鑰。

---

## 4. 驗收標準與效益評估

1. **部署流水線絕對安全**：未配置 Secret 時 CI 100% 順暢通過；配置 Secret 後自動在每次生產部署後主動提交 Sitemap。
2. **零阻斷生產環境**：若 Google 服務暫時中斷或 API 額度超限，Cloudflare 部署依然成功生效。
3. **SEO 發現加速**：發布新長尾文章或服務 FAQ 時，Googlebot 在部署當下即收到更新排程通知。
