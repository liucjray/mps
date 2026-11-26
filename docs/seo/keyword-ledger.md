# SEO 關鍵字覆蓋率與排名台帳

建立日期：2026-09-22
目的：`seo-keyword-audit` skill（`.claude/skills/seo-keyword-audit/SKILL.md`）每次執行的紀錄台帳，累積關鍵字覆蓋率、實測排名、優化方案與雙重確認（agy 自我確認 + codex 第二意見）結果，讓每一輪健檢都可回溯、可稽核。

**寫入規則**：新紀錄一律 append 在下方「執行紀錄」區塊最上面（最新在最上），不要覆寫或刪除舊紀錄；長篇深度分析另開 `docs/seo/<YYMMDD>_<topic>.md`，這裡只放摘要並連結過去。條目格式與寫入時機見 `seo-keyword-audit` SKILL.md 第 3、4、6 節。

---

## 執行紀錄

## 2026-11-26 首頁首屏與諮詢流程入口

- 11-26 查核的台灣搜尋資料（2026-10-27 至 2026-11-23）有 368 次曝光、9 次點擊，其中手機 265 次曝光、7 次點擊。此數據提供優先檢視手機首屏的依據。
- `feat/home-consultation-hero` worktree 將新北中和、南勢角地點與紋路、疤痕外觀修飾諮詢放在首頁首屏。主按鈕直達既有諮詢流程，首屏另有 LINE 和 Facebook 聯絡入口。
- 首頁更新日期與 sitemap、兩份 llms 對齊。首頁至流程用 `content_navigation` 及 `home_hero` 位置識別，後續可依裝置與流量來源檢視站內點擊。

## 2026-11-26 草本撫紋服務頁在地搜尋資訊

- 依 11-26 的 Search Console 頁面維度盤點，草本撫紋服務頁在 2026-10-27 至 2026-11-23 有 21 次曝光、1 次點擊。URL Inspection 確認已收錄。
- 在 `feat/herbal-stretch-local-search` worktree 調整搜尋標題與首段，並對齊首頁服務摘要、諮詢 FAQ、社群預覽、結構化資料、sitemap 及兩份 llms。首段只使用已確認的店址與文字諮詢方式。
- 成效以正式部署並重抓後的第一個完整 28 天與前一個等長區間比較。記錄服務頁曝光、點擊、CTR 與可見在地查詢，樣本偏少時持續觀察。

## 2026-11-26 紋路比較文章首段與對照表

- 依據 11-26 Search Console 頁面維度盤點，`/knowledge/striae-comparison` 在 2026-10-27 至 2026-11-23 有 239 次曝光、2 次點擊，台灣篩選為 54 次曝光、0 次點擊。
- 在 `feat/striae-quick-comparison` worktree 將常見出現情境整理成頁首答案與三列對照表。搜尋標題與 meta description 沿用 11-04 版本，等完整觀察資料補齊後再評估摘要；本次頁面日期、sitemap 及兩份 llms 資料同步。
- 內容依既有頁面與 AAD、NHS 資料整理。出現情境可供理解，外觀與部位可能重疊。資料來源與詳細醫療邊界見文章。

## 2026-11-25 皮膚覆蓋術服務頁搜尋標題與摘要

- 依據 2026-11-22 台帳的頁面維度資料，皮膚覆蓋術服務頁在 2026-10-24 至 2026-11-20 有 36 次曝光、0 次點擊、平均排名 10.8。樣本偏少，在地詞尚缺可見查詢資料。
- 本次內容更新以「中和皮膚覆蓋術｜紋路與疤痕外觀修飾」作為搜尋標題主文，摘要與首段說明地點、諮詢範圍和預約資訊。同步更新首頁服務摘要、社群標題、WebPage 結構化資料、sitemap 日期、`llms.txt` 與 `llms-full.txt`。
- 成效觀察以正式部署後的第一個完整 28 天為準，對照前一個等長區間的服務頁曝光、點擊、CTR、平均排名與可見在地查詢。以 URL Inspection 核對 Google 重抓日期，並記錄搜尋結果實際呈現的標題。低樣本或查詢組成變動時持續觀察。
- 實作來源：`feat/skin-camouflage-search` worktree。正式站以部署版本為準。

## 2026-11-22 GSC 近 28 天搜尋成效追蹤

- 觸發方式：使用者詢問「檢查成效」；唯讀 Search Console API 查核，未變更網站程式碼、SEO 設定或部署。
- 範圍與資料來源：`sc-domain:ycaura.com` 的 Search Analytics API；全站彙總、query 維度與 page 維度分開查詢。查詢字詞只回傳可見列，與全站彙總不可混為一談。
- 查詢期間：查詢日期 2026-11-22；API 最近有日資料至 2026-11-20。最近完整 28 天為 2026-10-24 至 2026-11-20；前一個完整 28 天為 2026-09-26 至 2026-10-23。
- 全站彙總（不帶維度）：本期 489 曝光、13 點擊、CTR 2.66%、平均排名 10.5；前期 301 曝光、16 點擊、CTR 5.32%、平均排名 18.8。曝光較前期 +62.5%、平均排名推進約 8.2 位；點擊由 16 變為 13（小基數波動），CTR 因知識頁曝光放大而降至 2.66%。尚不能推論諮詢或預約轉換。
- 查詢維度：本期 29 組可見查詢（均為 0 點擊），前期 23 組（含 1 筆與網站主題無關的異常文字列，未引用）。主要本期可見列：`生長紋肥胖紋差別` 25 曝光／平均排名 7.0（另有 `生長紋 肥胖紋 差別` 4／7.8、`生長紋 肥胖紋` 2／3.0、`肥胖紋跟生長紋一樣嗎` 1／1.0、`肥胖紋 生長紋` 1／11.0）；`眼窩凹陷黑眼圈 常見問題` 22 曝光／37.7；`皮膚覆蓋術` 21／34.2；`生長紋` 18／15.9；`striae 中文` 5／9.0；新出現 `疤痕覆蓋術` 3／40.3、`白色疤痕` 1／24.0、`生長紋是什麼` 3／5.7、`成長紋` 2／7.5、`想了解費用` 1／3.0、品牌詞 `瑪菲斯` 1／2.0。13 次點擊均來自匿名化未顯示查詢。
- 頁面維度：本期 10 頁、合計 532 曝光、13 點擊；前期 8 頁、合計 334 曝光、16 點擊。主要本期頁面：`/knowledge/striae-comparison` 252 曝光／3 點擊／CTR 1.19%／平均排名 7.1（前期 142／4／10.0）；首頁 `/` 103／8／7.77%／9.4（前期 57／11／9.4）；`/knowledge/dark-circles` 68／0／21.7（前期 64／0／44.0）；`/knowledge/stretch-marks` 37／0／18.2（前期 24／0／32.2）；`/services/skin-camouflage` 36／0／10.8（前期 16／0／12.6）；`/services/herbal-stretch-care` 18／1／5.56%／6.3（前期 15／1／6.1）；`/services/colour-matching` 11／1／9.09%／4.5（前期 12／0／5.4，首次出現點擊）；`/services/beauty-education` 4／0／4.8；`/knowledge/scars-camouflage` 2／0／14.5（首次出現曝光）；`/knowledge` 1／0／4.0。頁面維度列曝光加總可能高於全站彙總；不將兩者相加。
- 觀察與後續優化建議：
  1. `/knowledge/striae-comparison` 於 `2026-11-04` 調整標題詞序後，本期（含調整後約 17 天）平均排名穩在第一頁（7.1），但 CTR 僅 1.19%，仍待滿 28 天（約 2026-12 月初）再做完整比較，暫不重複改動標題。
  2. `/knowledge/scars-camouflage` 首次於 GSC 頁面維度出現曝光（2 次、平均排名 14.5），且查詢維度同步出現 `疤痕覆蓋術`（3／40.3）與 `白色疤痕`（1／24.0），顯示該頁已開始進入自然搜尋曝光。
  3. `/services/skin-camouflage` 曝光升至 36、平均排名 10.8（逼近第一頁），`/services/colour-matching` 首獲 1 次點擊（排名 4.5）。
  4. `草本撫紋`、品牌加地區詞與多數商業＋在地詞仍無可見查詢列；GBP／地圖資料維持既有 blocked 決策。
- GA4／轉換：本次未查 GA4。GSC 無法判斷工作階段、LINE／Facebook 點擊、有效私訊或預約；因此只報告自然搜尋曝光、點擊與平均排名。
- 優化方案／後續處置：無方案，本次僅記錄現況與追蹤進度（比較頁仍在 28 天觀察窗口內）。
- 自我確認／codex 方案第二意見／程式碼複審：不適用（本次無優化實作方案與程式碼變更）。
- 文件同步：已更新 `docs/seo/keyword-database.md` 與 Obsidian `Projects/mps/04-SEO-AEO/SEO與AEO策略.md`。無程式碼變更，不需重新執行測試（同次對話前已確認 `npm run lint` 與 `npm test` 40/40 通過）。
- 備註：額外執行 `npm run validate:seo-aeo` 實測正式站全部 12 個公開 URL 皆回 `HTTP 200`（`ok: true`、`issues: []`、`warnings: []`）；URL Inspection 確認 `/knowledge/scars-camouflage` 已轉為 `PASS`／`Submitted and indexed`（`lastCrawlTime: 2026-11-14T07:09:51Z`），`/contact` 經使用者手動要求索引後已推進至 `Crawled - currently not indexed`（`lastCrawlTime: 2026-11-22T15:53:34Z`，`pageFetchState: SUCCESSFUL`）。未查 Sitemap API、人工搜尋排名或 AI Overview。
- Commit / 分支：未提交；接續工作區現有紀錄更新。

## 2026-11-14 GSC 近 28 天搜尋成效追蹤

- 觸發方式：使用者詢問「查一下 近期的 網站的 狀況如何」並要求補記台帳與評估優化方向；唯讀 Search Console API 查核與線上路由 `HTTP 200` 檢查，未變更網站程式碼、SEO 設定或部署。
- 範圍與資料來源：`sc-domain:ycaura.com` 的 Search Analytics API；全站彙總、query 維度與 page 維度分開查詢。查詢字詞只回傳可見列，與全站彙總不可混為一談。
- 查詢期間：查詢日期 2026-11-14；API 最近有日資料至 2026-11-10。最近完整 28 天為 2026-10-14 至 2026-11-10；前一個完整 28 天為 2026-09-16 至 2026-10-13。
- 全站彙總（不帶維度）：本期 507 曝光、15 點擊、CTR 2.96%、平均排名 11.9；前期 194 曝光、11 點擊、CTR 5.67%、平均排名 28.3。曝光 +161.3%、點擊由 11 增至 15（+36.4%）；平均排名數值改善約 16.4 位；CTR 因知識頁曝光快速放大而由 5.67% 降至 2.96%。點擊基數仍小，不能推論預約或有效詢問增加。
- 查詢維度：本期 25 組回傳列（含 1 筆與網站主題無關的異常文字列，未引用、未用於內容判斷；其餘 24 組可見查詢均為 0 點擊），前期 19 組。主要本期可見列：`眼窩凹陷黑眼圈 常見問題` 38 曝光／平均排名 40.8；`皮膚覆蓋術` 26／29.4；`生長紋肥胖紋差別` 16／6.2（另有 `生長紋 肥胖紋 差別` 5／7.2）；`striae 中文` 14／10.1；`生長紋` 12／14.5；`板橋妊娠紋` 2／41.0；品牌詞 `瑪菲斯` 1／2.0。查詢列未涵蓋彙總中的所有曝光／點擊（15 次點擊均來自匿名化未顯示查詢）。
- 頁面維度：本期 9 頁、合計 539 曝光、15 點擊；前期 8 頁、合計 229 曝光、11 點擊。主要本期頁面：`/knowledge/striae-comparison` 275 曝光／4 點擊／CTR 1.45%／平均排名 7.2（前期 66／2／13.6）；首頁 `/` 87／9／10.34%／12.9（前期 45／9／10.1）；`/knowledge/dark-circles` 86／0／25.8（前期 43／0／45.2）；`/knowledge/stretch-marks` 33／0／16.6（前期 36／0／58.1）；`/services/skin-camouflage` 33／0／11.2（前期 7／0／4.9）；`/services/herbal-stretch-care` 12／2／16.67%／6.1（前期 15／0／6.2）；`/services/colour-matching` 8／0／5.1；`/services/beauty-education` 4／0／4.8；`/knowledge` 1／0／4.0。頁面維度列可能因同一搜尋對應多個 URL 而使曝光加總高於全站彙總；不將兩者相加。
- 線上狀態抽檢：實測 `https://ycaura.com/`、主要服務頁、知識頁、`/sitemap.xml`、`/robots.txt`、`/llms.txt` 共 10 個路由皆為 `HTTP 200`（回應時間 0.19s–0.69s）。
- 觀察與後續優化建議：
  1. `2026-11-04` 已部署 `/knowledge/striae-comparison` 標題詞序調整，目前該頁已進入第一頁（平均排名 7.2、曝光 275），但 CTR 僅 1.45%；因 11-04 至 11-10 僅剛滿 7 天資料，建議待累積滿完整 28 天（約 2026-12 月初）再評估標題調整對 CTR 的實際影響，暫不重複改動同一頁標題。
  2. `/services/skin-camouflage` 本期曝光升至 33、平均排名 11.2（第二頁前段），且 `皮膚覆蓋術` 穩定有 26 曝光（排名 29.4、0 點擊），是目前最接近第一頁的商業服務頁，後續可列為優先健檢標的。
  3. `/knowledge/scars-camouflage` 本期仍無任何曝光紀錄（延續 10-11 URL Inspection 顯示 `URL is unknown to Google` 的待釐清狀態），值得在 Search Console 網頁版確認索引覆蓋狀態。
  4. `妊娠紋`、`妊娠紋原因` 與多數商業＋在地詞仍無可見查詢列；GBP／地圖資料維持既有 blocked 決策。
- GA4／轉換：本次未查 GA4。GSC 無法判斷工作階段、LINE／Facebook 點擊、有效私訊或預約；因此只報告自然搜尋曝光、點擊與平均排名。
- 自我確認／codex 方案第二意見／程式碼複審：不適用（本次僅補充台帳與觀察建議，尚未提出或實作程式碼變更）。
- 文件同步：已更新 `docs/seo/keyword-database.md` 與 Obsidian `Projects/mps/04-SEO-AEO/SEO與AEO策略.md`。無程式碼變更，不需執行 lint 或測試。
- 備註：未查 URL Inspection、Sitemap API、人工搜尋排名或 AI Overview；本報告不代表索引狀態或 AI 搜尋引用狀態。
- Commit / 分支：未提交；接續工作區現有紀錄更新。

## 2026-11-04 生長紋比較頁 metadata 詞序測試

- 觸發方式：使用者檢視近期搜尋成效後，要求先寫文件再開始補強。此為前一筆唯讀 GSC 查核的後續實作，不是新的 Search Analytics 查詢。
- 範圍與資料來源：依 2026-11-04 Search Console API 紀錄（`2026-10-06` 至 `2026-11-02`），`/knowledge/striae-comparison` 為 251 曝光、6 點擊、平均排名 8.2，「生長紋肥胖紋差別」為 16 曝光、0 點擊、平均排名 6.8；實作修改 `app/knowledge/striae-comparison/page.tsx` 與 `public/sitemap.xml`。
- 優化方案／後續處置：調整 `/knowledge/striae-comparison` 的 `title` 與 `description` 詞序，讓「生長紋、肥胖紋與妊娠紋差別」靠前並保留「生長紋（成長紋）」與非醫療外觀修飾界線；同步更新 `updatedAt`／JSON-LD `dateModified` 與 sitemap `lastmod` 為 `2026-11-04`。此變更為用詞排序測試，未改 H1、正文、FAQ，未新增醫療或效果宣稱，且不保證點擊或排名改善（Google 可能自行改寫 title link／snippet）。
- 自我確認：已對照 `AGENTS.md`、醫療／法規邊界及 `docs/blocked/20260903_seo-aeo-audit.md`，確認無未確認事實或受阻項目。
- codex 方案第二意見與程式碼複審：本次依既有計畫執行有限 metadata 詞序測試，未新增內容區塊；先執行 `npm run lint` 與 `npm test` 驗證，並在 `feat/deploy-striae-title` 分支補充 `tests/rendered-html.test.mjs` 檢查與刪除舊的停用網域 redirect，確保部署健康。
- 驗證與文件同步：已完成 `npm run lint`（通過）與 `npm test`（38/38 通過）；已同步更新 `docs/seo/keyword-database.md`、`docs/todo/261104_search-performance-improvements.md` 與 Obsidian `Projects/mps/04-SEO-AEO/SEO與AEO策略.md`。
- 部署：首次 workflow `41857774164` 因 Cloudflare 帳戶沒有舊網域 zone 而失敗；修正部署設定後，workflow `41859197383` 成功。Cloudflare deploy、正式 SEO/AEO 驗證、GSC sitemap 提交（HTTP 204）與 IndexNow 均成功。
- 正式環境驗證：`https://ycaura.com/knowledge/striae-comparison` 回 HTTP 200；title、description、canonical、新的 `dateModified` 與 sitemap `lastmod=2026-11-04` 正確，原始 `datePublished=2026-09-19`、H1、FAQ 與醫療界線仍在。後續至少觀察一個完整 28 天窗口；GA4 有效諮詢／預約追蹤仍待確認。

## 2026-11-04 GSC 近 28 天搜尋成效追蹤

- 觸發方式：使用者詢問「檢視一下近期成效」；唯讀 Search Console API 查核，未變更網站內容、SEO 設定或部署。
- 範圍與資料來源：`sc-domain:ycaura.com` 的 Search Analytics API；全站彙總、query 維度與 page 維度分開查詢。查詢字詞只回傳可見列，與全站彙總不可混為一談。
- 查詢期間：查詢日期 2026-11-04；API 最近有日資料至 2026-11-02。最近完整 28 天為 2026-10-06 至 2026-11-02；前一個完整 28 天為 2026-09-08 至 2026-10-05。
- 全站彙總（不帶維度）：本期 489 曝光、21 點擊、CTR 4.29%、平均排名 13.6；前期 153 曝光、2 點擊、CTR 1.31%、平均排名 43.4。曝光 +219.6%、點擊由 2 增至 21；平均排名數值改善約 29.8 位。點擊基數仍小，不能推論預約或有效詢問增加。
- 查詢維度：本期 26 組可見查詢、147 曝光、0 點擊；前期 17 組、103 曝光、0 點擊。主要本期可見列：`眼窩凹陷黑眼圈 常見問題` 38 曝光／平均排名 45.7；`皮膚覆蓋術` 25／30.2；`striae 中文` 21／10.4；`生長紋肥胖紋差別` 16／6.8；`生長紋` 9／15.8；`板橋妊娠紋` 4／44.0。查詢列未涵蓋彙總中的所有曝光／點擊；一筆與網站主題無關的異常文字列未引用、未用於內容判斷。`妊娠紋` 單列在兩次回傳中出現 0 與 1 次曝光差異，標記為低樣本／資料列不穩定。
- 頁面維度：本期 9 頁、合計 539 曝光、21 點擊；前期 8 頁、合計 164 曝光、2 點擊。主要本期頁面：`/knowledge/striae-comparison` 251 曝光／6 點擊／平均排名 8.2；首頁 100／13／12.1；`/knowledge/dark-circles` 84／0／32.3；`/services/skin-camouflage` 28／0／11.3；`/knowledge/stretch-marks` 28／0／17.9；`/services/herbal-stretch-care` 22／2／6.4。頁面維度列可能因同一搜尋對應多個 URL 而使曝光加總高於全站彙總；不將兩者相加。
- 觀察：全站自然搜尋點擊與曝光明顯高於前期，點擊主要落在首頁與生長紋／肥胖紋比較頁；草本撫紋服務頁首次有 2 次點擊。查詢維度開始出現 `皮膚覆蓋術` 25 次曝光，但平均排名約 30、沒有點擊；多數精確商業詞與品牌加地區詞仍無可見查詢列。知識頁的查詢列平均排名改善不等同點擊或轉換成長。
- GA4／轉換：本次未查 GA4。GSC 無法判斷工作階段、LINE／Facebook 點擊、有效私訊或預約；因此只報告自然搜尋曝光、點擊與平均排名。
- 優化方案／後續處置：無立即內容修改方案；再累積一個可比的完整窗口，重點追蹤 `/knowledge/striae-comparison`、首頁、`/services/herbal-stretch-care` 與「皮膚覆蓋術」查詢是否持續帶來點擊。GBP／地圖資料維持既有 blocked 決策，除非取得官方資料，不提出替代地圖標記方案。
- 自我確認／codex 方案第二意見／程式碼複審：不適用（本次沒有實作方案或程式碼變更）。
- 文件同步：已更新 `docs/seo/keyword-database.md` 與 Obsidian `Projects/mps/04-SEO-AEO/SEO與AEO策略.md` 的本期數據。無程式碼變更，不需執行 lint 或測試。
- 備註：未查 Sitemap、URL Inspection、人工搜尋排名或 AI Overview；本報告不代表索引狀態或 AI 搜尋引用狀態。
- Commit / 分支：未提交；僅在目前 checkout 更新成效紀錄與關鍵字活表。

## 2026-10-11 GSC 近 28 天與前期變化、索引狀態稽核

- 觸發方式：AUT-197；只讀 Search Console API 稽核，未變更網站、SEO 設定或部署流程。
- 範圍與資料來源：Search Console API `searchAnalytics.query`，`sc-domain:ycaura.com`，分別以 `query`、`page` 維度查詢；`sitemaps.get` 讀取 `https://ycaura.com/sitemap.xml`；`urlInspection.index.inspect` 檢查首頁、知識 Hub、4 篇知識頁及 4 個服務頁。憑證僅用於 API 呼叫，沒有輸出或寫入報告。
- 查詢期間：最近完整 28 天 `2026-09-11` 至 `2026-10-08`；前一個完整 28 天 `2026-08-14` 至 `2026-09-10`。兩段首尾均含在內。以 2026-10-11 查詢時，最新資料日停在 10-08；GSC 有資料延遲，故不把 10-09 至 10-11 當成零曝光。
- GSC Search Analytics 整體（依回傳列彙總；平均排名為曝光加權的 GSC 回傳平均值）：
  - 查詢字詞：本期 16 組、87 曝光、0 點擊、CTR 0%；前期 11 組、52 曝光、0 點擊、CTR 0%。本期較前期 +35 曝光（+67.3%）。查詢列中的排名不能跨不同查詢直接當作同一關鍵字排名變化。
  - 頁面：本期 8 頁、152 曝光、3 點擊、CTR 1.97%；前期 8 頁、140 曝光、8 點擊、CTR 5.71%。頁面總量是頁面維度，不應與 query 維度曝光相加；一個搜尋可關聯多個維度列。
- 本期有曝光查詢（查詢｜曝光｜點擊｜CTR｜平均排名）：`眼窩凹陷黑眼圈 常見問題`｜28｜0｜0%｜61.9；`妊娠紋`｜25｜0｜0%｜66.7；`妊娠 纹`｜7｜0｜0%｜76.0；`妊娠紋原因`｜6｜0｜0%｜62.5；`板橋妊娠紋`｜5｜0｜0%｜43.6；`肥胖紋`｜3｜0｜0%｜6.7；`生長紋是什麼`｜2｜0｜0%｜27.5；`生長紋肥胖紋差別`｜2｜0｜0%｜31.0；`肥胖 紋`｜2｜0｜0%｜97.5；`striae 中文`｜1｜0｜0%｜7.0；`上眼皮黑黑的`｜1｜0｜0%｜68.0；`妊娠 紋`｜1｜0｜0%｜76.0；`成長 紋`｜1｜0｜0%｜56.0；`生長紋 肥胖紋 差別`｜1｜0｜0%｜7.0；`眼皮黑`｜1｜0｜0%｜89.0；`肥胖紋 妊娠紋 差別`｜1｜0｜0%｜11.0。
- 主要查詢比較（本期曝光／排名；前期曝光／排名；排名變化以「前期排名減本期排名」計，正數代表改善）：`妊娠紋` 25／66.7；10／52.2；-14.5（下滑）；`眼窩凹陷黑眼圈 常見問題` 28／61.9；19／51.2；-10.6（下滑）；`妊娠紋原因` 6／62.5；9／61.3；-1.2（近似持平、微幅下滑）；`板橋妊娠紋` 5／43.6；2／62.5；+18.9（改善，仍只有 5 次曝光）。新出現但樣本極小的詞包括 `肥胖紋` 3 次曝光／排名 6.7、`生長紋是什麼` 2／27.5、`striae 中文` 1／7.0，以及 `上眼皮黑黑的`、`眼皮黑` 各 1 次；單次排名不可視為穩定位置或成效。
- 頁面主要變化（URL｜本期點擊／曝光／CTR／排名；前期點擊／曝光／CTR／排名）：首頁 `/`｜3／18／16.67%／16.9；4／30／13.33%／3.2（曝光 -12、點擊 -1、排名下滑 13.7）；`/knowledge/stretch-marks`｜0／45／0%／64.6；3／49／6.12%／36.0（曝光 -4、點擊 -3、排名下滑 28.6）；`/knowledge/dark-circles`｜0／46／0%／43.8；0／22／0%／46.3（曝光 +24、排名改善 2.5）；`/knowledge/striae-comparison`｜0／28／0%／23.3；0／8／0%／17.6（曝光 +20、排名下滑 5.7）。服務頁 `/services/skin-camouflage` 本期 0 點擊／7 曝光／排名 5.9（前期 0／19／4.2）；`/services/herbal-stretch-care` 本期 0／4／5.3（前期 1／8／17.6）；`/services/colour-matching` 本期 0／3／38.0（前期 0／3／10.0）；`/services/beauty-education` 本期 0／1／8.0（前期 0／1／10.0）。少數曝光的平均排名波動很大，不宜解讀成排名承諾。
- Sitemap 報告：`sitemaps.get` 成功（HTTP 200）；`lastSubmitted=2026-09-22T07:33:26.006Z`、`lastDownloaded=2026-10-07T05:47:45.429Z`、warnings=0、errors=0。API 回報 web submitted=11/indexed=0、image submitted=8/indexed=0。這個摘要與下方 URL Inspection 的單頁狀態不一致，不能據此推論 11 個 URL 都未索引；需由 Search Console 網頁版核對報告口徑／更新狀態。
- URL Inspection：10 個重要 URL 均成功取得回應；首頁、`/knowledge`、`/knowledge/stretch-marks`、`/knowledge/dark-circles`、`/knowledge/striae-comparison`、4 個服務頁全為 `PASS`／`Submitted and indexed`，Google canonical 與本站 canonical 相同。`/knowledge/scars-camouflage` 回報 `NEUTRAL`／`URL is unknown to Google`，沒有 canonical 或最後抓取時間。這是查詢當時狀態，不代表其他未檢查 URL 的狀態。
- 資料核對差異與限制：ticket 背景引述 2026-10-11 一次近 28 天為 16 組、82 曝光；本次明確固定 09-11 至 10-08 的查詢為 16 組、87 曝光。可用資料沒有保存該 82 次的日期邊界／API 原始結果，故不能調和 5 次差異；本紀錄以可重跑核對的固定日期 API 結果為準，不把兩者併算。Search Analytics 只回有曝光列，長尾詞和少量曝光樣本不完整；平均排名是彙總指標，受查詢、裝置、地區和呈現影響。索引檢查為 10 個抽樣頁面，不能代表全站；Sitemap 摘要與 URL Inspection 有矛盾，需人工在 GSC 報告介面再核實。
- 觀察與建議（對應 `docs/plan/260917_seo_keyword_ranking_and_optimization_plan.md` 的關鍵字四層架構及其搜尋排名診斷；也參照 `docs/todo/20260919_gsc-seo-aeo-auto-sync-plan.md` 對 sitemap 發現與索引並非保證的說明）：
  1. 優先在下一輪同期間觀察 `妊娠紋`、`眼窩凹陷黑眼圈 常見問題` 及其承接頁；它們本期合計 53 次曝光、0 點擊，平均排名分別 66.7、61.9，較前期都下滑。先累積更多週期再判斷是否需要內容調整，不因 28 天小樣本新增醫療或效果宣稱。
  2. 追蹤 `/knowledge/stretch-marks` 的點擊從 3 降至 0、平均排名 36.0 降至 64.6；和妊娠紋查詢的變化一起觀察。`/knowledge/dark-circles` 與 `/knowledge/striae-comparison` 曝光增加但目前無點擊，先累積樣本。服務頁曝光很少，不能據此判斷服務頁的整體需求或保證排名。
  3. `板橋妊娠紋` 平均排名改善但只有 5 次曝光；`肥胖紋`、`striae 中文` 等新詞分別只有 1–3 次曝光，列為探索訊號，與計畫文件中的科普／在地詞方向核對即可，暫不據此改寫頁面或推導店家營運事實。
  4. 在 Search Console 網頁版比對 sitemap 的 11 個 web URL 索引摘要與本次 9 個已索引／1 個未知的 URL Inspection 結果；單獨檢視 `/knowledge/scars-camouflage` 的 GSC 覆蓋狀態。依 `20260919` 計畫，sitemap 提交或發現不等於已收錄；本票未提交 sitemap、未要求索引。
- 優化方案／後續處置：本次無網站內容、程式、SEO 設定或部署變更；建議以相同兩個 28 天窗口再觀察一次，並由人工核對 GSC sitemap 報告摘要。未將平均排名當保證，未由 GSC 推導醫療、效果、價格、資格或店家營運事實。
- 自我確認／codex 方案第二意見／程式碼複審：不適用（純資料檢查與既有台帳紀錄，無優化實作方案）。
- 可核對資料：本次 Search Analytics 原始 API 列、Sitemap API 回應及 10 筆 URL Inspection 回應在執行期間保存於 worktree `.at-scratch/gsc-period-audit.json`；上方已記錄區間、彙總及全部本期查詢列，可在該檔仍保留時交叉核對。未保存或顯示憑證。
- 文件同步自檢：僅新增稽核紀錄，沒有新增／改名／移除 CLI 指令、旗標、設定鍵或行為；README、AGENTS、docs 現行操作說明無需同步修改。Obsidian vault 沒有因網站事實或程式行為變更而更新。
- Commit / 分支：待驗證與提交。

## 2026-09-22（四）黑眼圈相關長尾詞排名記錄（部署後追蹤）

- 觸發方式：互動 session，手動 `npm run query:gsc` 查核，非完整 `/seo-keyword-audit` 流程
- 範圍：黑眼圈／眼窩／淚溝／眼袋相關長尾詞，部署「眼窩凹陷黑眼圈」關鍵字對齊變更（見上一則紀錄，commit `c822b91`／`b955dac`，已合併進 main `49852eb` 並上線）後的追蹤基準
- 排名查核結果（GSC Search Analytics，近 28 天，部署後數據尚未反映本次變更——GSC 通常有 1-3 天延遲）：
  - `眼窩凹陷黑眼圈 常見問題` — 平均排名 56.1，曝光 34，點擊 0，CTR 0%
  - 篩選 `黑眼圈|眼窩|淚溝|眼袋` 這組詞根，目前近 28 天資料裡**只有這一組**查詢有曝光紀錄，沒有其他黑眼圈相關長尾詞
- 覆蓋率缺口：黑眼圈相關搜尋量目前集中在單一長尾組合，樣本小（34 曝光、0 點擊），排名第 56 名（第 6 頁）看不到有效流量；還沒有足夠數據判斷這次關鍵字對齊調整有沒有效果，需要之後再查一次比對排名變化
- 優化方案：無，本次僅記錄現況作為部署後追蹤基準，不評估新方案
- agy 自我確認：不適用（無方案）
- codex 方案第二意見：不適用（無方案）
- 後續處置：待之後排名穩定後（建議 1-2 週後）再查一次 `眼窩凹陷黑眼圈 常見問題` 的排名/曝光變化，比對這次調整是否有效；若持續沒有改善，代表光是關鍵字對齊不夠，需要重新評估
- 實作摘要：無程式碼變更
- codex 程式碼複審：不適用
- Commit / 分支：不適用（純查詢記錄）
- 備註／待確認連結：無

## 2026-09-22（三）skill 完整流程實測：Step 1-7 全部跑完，第一個真正落地的優化

- 觸發方式：互動 session，延續同日前兩輪 dry run；這次透過 `Skill` 工具正式呼叫 `/seo-keyword-audit`（帶聚焦參數），走完整份 SKILL.md 全部七步
- 範圍：聚焦「GSC 近 28 天已有曝光的長尾字詞」（妊娠紋原因、板橋妊娠紋、眼窩凹陷黑眼圈 常見問題等）
- 排名查核結果（GSC Search Analytics，近 28 天，沿用同日稍早已驗證的 `.env.gsc`）：
  - `眼窩凹陷黑眼圈 常見問題` — 平均排名 56.1，曝光 34，點擊 0
  - `妊娠紋原因` — 平均排名 61.8，曝光 15，點擊 0
  - `板橋妊娠紋` — 平均排名 57.7，曝光 3，點擊 0
- 覆蓋率缺口：`/knowledge/dark-circles`（`docs/todo/20260919_dark-circles-enhancement.md` 已於 commit `d108e80` 實作）內容已涵蓋「結構型黑眼圈」概念，但用詞是「眼眶骨骼凹陷」，跟使用者實際搜尋的「眼窩凹陷」沒對齊；`public/llms-full.txt` 早就用「眼窩凹陷」描述同一概念，屬於既有已確認用詞，不是新事實
- 優化方案：比對表結構型描述加「眼窩」用詞、新增一則解釋「眼窩凹陷黑眼圈」口語說法的 FAQ、Article keywords 加一項，dateModified／sitemap lastmod 同步更新
- **第一步前置檢查**（本次驗證新補的規則）：已搜尋 `docs/blocked/`／`docs/todo/`，確認 `docs/blocked/20260903_seo-aeo-audit.md`（GBP／geo 相關）與本方案無關，沒有踩到既有阻擋項目
- agy 自我確認：同意執行——低風險、可驗證、沒有新增醫療宣稱
- codex 方案第二意見：有條件同意——同意風險判斷，但指出「眼窩凹陷」與「眼眶骨骼凹陷」不完全同義（有些過度等同），建議用更穩妥的措辭，並建議直接加一則 FAQ 承接「常見問題」查詢意圖比單靠 JSON-LD keyword 更有效益。完整輸出見 `<scratchpad>/seo-plan-review-2.last.md`
- 後續處置：**通過，執行實作**（採納 codex 的措辭建議，用「眼眶骨骼或眼窩區域凹陷」而非直接畫等號）
- 實作摘要：開 worktree `wt1110-dark-circles-orbital-kw`（port 1110），改 `app/knowledge/dark-circles/page.tsx`、`public/sitemap.xml`、`tests/rendered-html.test.mjs` 共 3 個檔案；`npm run lint`／`npm test` 全數通過（35/35）
- codex 程式碼複審：**跑了三輪才乾淨**——
  - 第一輪：P2×2（新 FAQ 答案未重申安全邊界／非診斷限制；Obsidian 黑眼圈知識筆記未同步）→ 已修正 FAQ 答案加入安全與非診斷限制、同步 vault 筆記
  - 第二輪：P1×1（「眼窩凹陷」臨床語境下也可能指真正的眼窩／眼球退縮等健康變化，需排除新近／單側／進展性情形，否則可能把需要就醫的變化誤判成外觀成因）→ 已在 FAQ 答案加入排除條件，優先建議眼科/皮膚科評估
  - 第三輪：乾淨，無 P1/P2（`npm test` 在 codex 的 read-only sandbox 裡因 EROFS 跑不了 build，非本次變更造成，已自行在一般環境驗證 35/35 通過）
- Commit / 分支：`c822b91` on `wt1110-dark-circles-orbital-kw`；**已 push**（`git push -u origin wt1110-dark-circles-orbital-kw`），尚未開 PR／merge 到 main，等使用者決定
- 備註／待確認連結：Obsidian `03-知識/黑眼圈知識.md` 已同步更新（結構型描述、更新日期、2026-09-22 更新紀錄段落）。這是這個 skill 第一次真正跑完 Step 5-7（worktree 建立、codex-review 對程式碼 diff 複審、commit、push），驗證了機制本身可行；同時也證明了 Step 6 的「跑到乾淨為止」迴圈是必要的——兩輪 codex 都抓到不是我自己會想到的真實問題（尤其第二輪的醫療邊界疑慮），如果只跑一輪就直接 commit 會帶著問題上線

## 2026-09-22（續）skill 驗證性 dry run 第二輪：Step 4-7 實測

- 觸發方式：互動 session，延續同日稍早的 dry run，這次要把 Step 4（雙重確認）以後也實際跑一次，不再只是紙上作業
- 範圍：鎖定 Direction A（GBP／地圖）子題，因為上一輪已確認這是唯一還沒解決的覆蓋率缺口
- GSC 憑證：使用者本次已建好 `.env.gsc` 並驗證可用——`npm run query:gsc`（不帶關鍵字）近 28 天真的拉到 12 組有曝光字詞（例如「妊娠紋」平均排名 55.9／曝光 22、「板橋妊娠紋」平均排名 57.7／曝光 3、「眼窩凹陷黑眼圈 常見問題」平均排名 56.1／曝光 34）。**值得注意的落差**：260917 報告靠人工搜尋認為品牌/技術精準詞（如「瑪菲斯 雙和」「草本撫紋 新北」）排第一，但這兩個字詞近 28 天 GSC 完全 0 曝光——GSC 只算「被搜尋顯示」的次數，跟人工搜尋當下看到排第幾名是兩件事，兩種數據不能互相取代，這點也已經寫進 SKILL.md 第 3 節的方法論分流裡
- 提出的方案：在 `app/site.ts` 的 LocalBusiness JSON-LD 加入 `hasMap`，指向既有的 `googleMapsSearchUrl`（Google Maps 搜尋連結，非官方 GBP 連結），`GeoCoordinates` 因地理編碼查「景新街」回傳三段不同路段（跨三個郵遞區號、約 1.3 公里）而不在本次範圍
- agy 自我確認（第一版，**後來推翻**）：一度同意做 `hasMap`，理由是資料來自已公開地址、不涉及捏造事實
- codex 方案第二意見：同意技術拆分（`hasMap` 可做、`GeoCoordinates` 該緩做），但要求 `hasMap` 的敘述必須降級——不能宣稱「解鎖 Map Pack」，只能定位成「地點語意／導覽補充」；並指出應該先確認 GBP 資格（純預約制是否符合 Google 的到店面對面接觸要求）。完整輸出見 `<scratchpad>/seo-plan-review.last.md`
- **關鍵轉折**：在準備實作前又搜了一次 `docs/blocked/`（照 SKILL.md 剛補上的規則），發現 `docs/blocked/20260903_seo-aeo-audit.md` 3.1 節**早就記載同一個結論**：「依專案規範與 Codex 跨模型審查結論，嚴禁自行揣測經緯度或**用一般搜尋字串替代官方商家地圖**」，並且 `tests/rendered-html.test.mjs` 已經用 `assert.equal("hasMap" in organization, false)` 把這個決策鎖進測試。也就是說，就連「hasMap 指到 Maps 搜尋連結」這個看似安全的折衷方案，這個 repo 三週前就已經評估過、擋下來過——跟本次 codex 意見獨立收斂到接近的結論，但更嚴格（連降級敘述的版本都不行，只要不是官方 GBP 連結就不放進 JSON-LD）
- agy 自我確認（**最終版**）：**推翻第一版，不執行 `hasMap`**。理由：已有明確在先的 blocked 決策與測試守門，方案本身沒有帶來新事實或新資料，沒有理由推翻既有判斷
- 後續處置：**Direction A 全案維持 blocked，不實作**；本輪真正的產出是修正 `seo-keyword-audit` skill 自己的流程漏洞——**Step 1 前置檢查原本沒有要求搜尋 `docs/blocked/`／`docs/todo/`，導致方案走到 Step 4 才被查出早就被擋過，等於重工**。已補到 SKILL.md 第 1 步（列為不可省略項）與第 4.1 步（自我確認前要先確認第 1 步真的搜過）
- 實作摘要：**沒有網站內容/程式碼變更**（因為方案被否決），只有 SKILL.md 本身的流程修正（見上）
- codex 程式碼複審：不適用（沒有程式碼 diff）
- Commit / 分支：尚未 commit，也尚未驗證 Step 5（開 worktree）／Step 7（push 分支）的實際機制——這兩輪 dry run 都在「方案被否決」或「還沒到需要改網站內容」的地方停下來，**worktree 建立、`codex-review` 對 diff 複審、commit/push 這三個環節目前仍是 0 次驗證**
- 備註／待確認連結：Direction A 若要解鎖，需要業主提供官方 GBP 連結／精確座標，對應 vault `99-待確認/待確認事項.md` 第 31 行既有項目（「Google Business Profile／地圖連結與營業資訊是否一致」），本次沒有新增待確認項，只是再次確認它還沒解除。`codex exec`（非 `codex exec review`）的呼叫語法本次已驗證可行：`codex exec -s read-only -o <file> - < <prompt file>`，比原本 SKILL.md 寫的 `-c sandbox_mode="read-only"` 更直接，SKILL.md 第 4.2 節已同步更新

## 2026-09-22 skill 驗證性 dry run（`--no-implement`）

- 觸發方式：互動 session 手動逐步執行，驗證剛寫好的 `seo-keyword-audit` skill 本身，非例行健檢
- 範圍：全站；沿用 260917 計畫文件的基準關鍵字組（品牌+在地精準詞、技術+在地詞、泛意圖在地詞、高競爭醫療大詞共 8 組）
- 覆蓋率缺口（讀 repo 得出，可信）：
  - Direction B（AEO 比較矩陣／症狀問答深度）：已上線，`5f83623` 加入妊娠紋三方客觀比對表與墨菲斯去混淆問答
  - Direction C（長尾主題擴充）：已上線，`8deffe2` 白色疤痕／手術痕跡知識頁、`d108e80` 黑眼圈知識頁結構化升級；`app/knowledge/` 目前有 `dark-circles`、`scars-camouflage`、`stretch-marks`、`striae-comparison`
  - Direction A（GBP／geo 地標）：**仍是缺口**，`app/site.ts` 等檔案沒有任何 `geo`／`GeoCoordinates`／`hasMap` 內容
- 排名查核結果（GSC Search Analytics，近 28 天）：**本次無數據**——`GSC_CREDENTIALS` 只存在於 GitHub Actions secret，本機互動環境沒有設定，`npm run query:gsc` 正常走 skip 路徑（exit 0，訊息「GSC_CREDENTIALS not configured」），不是程式錯誤
- 競品景觀觀察（WebSearch，未經 GSC 驗證，僅供參考，不是排名結論）：8 組查詢的回傳連結清單裡都沒有出現 `ycaura.com`；`中和 妊娠紋`、`黑眼圈 淚溝` 等大詞版面被康健、時人醫美誌、各醫美診所衛教文佔住，跟 260917 報告的既有判斷一致
- 優化方案：無——本次排名數據不足（無 GSC、WebSearch 不可靠），依 SKILL.md 新規則不能只憑 WebSearch 結論推優化方案；覆蓋率缺口（Direction A）維持 260917 報告已有的既定結論，非本次新發現
- agy 自我確認：不適用（無方案）
- codex 方案第二意見：不適用（無方案）
- 後續處置：**發現並修正 skill 本身的方法論 bug**——原始 SKILL.md 直接用 WebSearch 結果當排名依據，實測發現 (a) WebSearch 工具聲明僅美國地區可用，跟台灣在地搜尋結果不一致，(b) 回傳連結清單裡 8 組查詢從未出現 `ycaura.com`，且不含名次資訊，(c) 其中一次查詢的合成摘要生出一個查無來源、且跟站上實際地址不符的地址（疑似幻覺）。已改為：新增 `scripts/gsc-search-analytics.mjs`（`npm run query:gsc`，複用 `gsc-notify.mjs` 的服務帳戶驗證邏輯）作為排名主要來源，WebSearch 降級為「競品景觀觀察」輔助用途且台帳需標註「未經 GSC 驗證」。SKILL.md 第 3 節與本條目格式已同步更新
- 實作摘要：新增 `scripts/gsc-search-analytics.mjs`、`package.json` 加 `query:gsc` script、`tests/seo-aeo-pipeline.test.mjs` 加 3 個新測試（endpoint 組裝、查詢區間、關鍵字比對）、`scripts/gsc-notify.mjs` 把 `getAccessToken`／`fetchWithRetry` 改為 export 供新 script 重用；`npm run lint` 與 `npm test` 皆通過（35/35 tests pass）
- codex 程式碼複審：**尚未執行**——這次是互動 dry run，還沒進到 SKILL.md 第 6 步；下次要 commit 這批 script/skill 修正前需先跑 `codex-review`
- Commit / 分支：尚未 commit（目前在 main working tree，未依 SKILL.md 規則開 worktree，因為這次改的是 skill 本身與輔助 script，不是網站內容/程式碼優化產出）
- 備註／待確認連結：**後續待辦**——要讓這個 skill 在本機互動模式下也能拉到真實排名數據，需要使用者決定怎麼讓本機 shell 取得 `GSC_CREDENTIALS`（例如本機 `.env` 之類機制），這個決定不由 skill 自己做；在那之前，本機執行這個 skill 的排名查核永遠只有「無 GSC 數據＋WebSearch 競品景觀觀察」，效力有限
