# 近期搜尋成效改善：紋路比較頁標題

日期：2026-11-04
範圍：`/knowledge/striae-comparison` 的搜尋結果標題與摘要文字

## 背景

Search Console 以最近完整 28 天（2026-10-06 至 2026-11-02）對照前一個完整 28 天（2026-09-08 至 2026-10-05）：

- 全站彙總由 153 曝光／2 點擊，增加至 489 曝光／21 點擊。
- `/knowledge/striae-comparison` 本期 251 曝光、6 點擊、平均排名 8.2；前期 30 曝光、0 點擊、平均排名 20.8。
- 可見查詢「生長紋肥胖紋差別」本期 16 曝光、平均排名 6.8、0 點擊；「striae 中文」21 曝光、平均排名 10.4、0 點擊。
- GSC 查詢維度不包含所有曝光與點擊，低樣本平均排名不能視為穩定排名，也不能據此判斷實際搜尋結果一定由頁面標題造成。

現行 title 已使用「肥胖紋、成長紋與妊娠紋怎麼分」，description 和正文則已有「生長紋」一詞。此項修改把可見查詢採用的「生長紋」及「差別」提前到 title，保留成長紋別名、妊娠紋、成因與外觀評估主題。

## 本次決策

使用者指示先記錄方案，再開始補強。獨立第二意見認為用詞調整可做低風險 CTR 測試，但建議先觀察一個固定 28 天窗口；依使用者本次指示，先落地有限的 metadata 用詞調整，不新增正文主張、服務細節或醫療效果承諾。

### 修改範圍

- 更新頁面 title 與 description；Open Graph、Twitter、Article/WebPage 結構化資料沿用同一組常數，維持一致。
- 不調整可見 H1、正文、FAQ 或作者資格。依 repo SEO 同步規則，title／description 變更會同步更新頁面 `dateModified`、可見最後更新日期與 sitemap `lastmod` 至 2026-11-04。
- 不調整 `/services/skin-camouflage`、`/knowledge/dark-circles` 等低樣本頁面；先累積下一個完整窗口。

### 成效觀察方式

部署後至少觀察一個完整 28 天窗口，對照相同長度前期的：

1. `/knowledge/striae-comparison` 曝光、點擊、CTR 與平均排名。
2. `生長紋肥胖紋差別`、`striae 中文`，以及新出現的相關查詢列。
3. 頁面標題變更前後的點擊變化；不把 GSC 平均排名當成固定名次，也不將搜尋點擊推論為預約或有效詢問。

Google 可能依頁面內容自行產生 title link 或 snippet，故本修改不保證搜尋結果原樣顯示，也不承諾排名或點擊提升。

## 後續資料缺口

- 官網已送出 `contact_click` 與 `content_navigation` 事件，但目前沒有已確認的預約完成／有效諮詢事件報表。需先連接 GA4、檢查事件是否實際收到，再將「聯絡點擊」與實際成效分開解讀。
- 此次未連接 GA4，沒有修改分析帳戶設定或對外服務。
- Google Business Profile／官方地圖資料沿用既有 blocked 決策；未取得正式資料前不加 `hasMap` 或座標。

## 實作結果（2026-11-04）

- 實作分支：`feat/seo-striae-title-alignment`；正式部署使用以 `origin/main` 為基底的隔離分支 `feat/deploy-striae-title`，避免帶入本機 main 上其他 24 個待推提交。
- 已更新比較頁 title／description；OG、Twitter、WebPage 與 Article 使用同一組值；可見最後更新日期、WebPage／Article `dateModified` 與 sitemap `lastmod` 同步更新至 2026-11-04。
- 渲染測試新增 title、description、OG/Twitter、JSON-LD 日期與 sitemap `lastmod` 同步斷言。
- `npm run lint` 通過；`npm test` 通過，39/39；唯讀 `codex-review` 複審無發現。
- 部署前乾淨分支驗證：`npm test` 35/35、`npm run lint` 通過。獨立 review 指出 SEO 台帳／活表同步、`lastmod`／日期同步、原始發布日保留及 Obsidian 同步問題；均已修正，最後一輪無可執行發現。
- 部署提交：`d0d68ee`（metadata 與 SEO 文件）、`dc27ee6`（只部署 Cloudflare 管理的網域）、`fc858c0`（移除已停用網域 redirect）。首次 workflow `41857774164` 因舊網域不屬於 Cloudflare zone 失敗；修正後 `41859197383` 全綠，並成功提交 Sitemap 至 GSC（HTTP 204）與 IndexNow。
- 正式環境：`https://ycaura.com/knowledge/striae-comparison` HTTP 200；已確認 title、description、canonical、H1、FAQ、醫療界線、JSON-LD 發布／更新日期及 sitemap `lastmod` 正常。舊網域已從 deploy target、Worker redirect、測試與 README 移除。
- GA4 成效仍待確認；部署後至少觀察一個完整 28 天窗口。

## 驗收

- 渲染 HTML 的 title、description、Open Graph、Twitter 與 Article/WebPage headline 使用一致的新文案。
- 既有 canonical、FAQ、安全提示、非醫療界線與內容日期維持正確。
- 執行 `npm run lint`、`npm test`，並由本機 `codex-review` 審查未提交 diff。
