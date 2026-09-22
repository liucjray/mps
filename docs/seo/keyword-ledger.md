# SEO 關鍵字覆蓋率與排名台帳

建立日期：2026-09-22
目的：`seo-keyword-audit` skill（`.claude/skills/seo-keyword-audit/SKILL.md`）每次執行的紀錄台帳，累積關鍵字覆蓋率、實測排名、優化方案與雙重確認（agy 自我確認 + codex 第二意見）結果，讓每一輪健檢都可回溯、可稽核。

**寫入規則**：新紀錄一律 append 在下方「執行紀錄」區塊最上面（最新在最上），不要覆寫或刪除舊紀錄；長篇深度分析另開 `docs/seo/<YYMMDD>_<topic>.md`，這裡只放摘要並連結過去。條目格式與寫入時機見 `seo-keyword-audit` SKILL.md 第 3、4、6 節。

---

## 執行紀錄

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
