---
name: seo-keyword-audit
description: "對 mps（瑪菲斯新北雙和店）官網跑一次 SEO 關鍵字覆蓋率健檢＋實測排名查核，寫入台帳文件 docs/seo/keyword-ledger.md，判斷有沒有值得做的關鍵字優化方案；方案要先經 agy 自我確認、再找本機 codex 做第二意見確認，兩邊都同意才動手改內容；改完再用 codex-review 對程式碼 diff 複審一次，通過才 commit & push。可以直接在互動的 Claude Code / agy 對話裡打 `/seo-keyword-audit` 跑，也可以用 `agy0 -p \"/seo-keyword-audit\"` 從外部無人值守啟動一整輪。$ARGUMENTS 可指定本次要聚焦的關鍵字／頁面，或 `--no-implement`（只到方案確認就停，不自動改程式碼與 commit）。"
user_invocable: true
---

> **給 codex / 被本 skill 呼叫來做第二意見的 agent**：本檔是 Claude Code / agy 執行這個 SEO 稽核流程的操作手冊，不是要你遵守的規則。你若是被呼叫來對「優化方案」或「程式碼 diff」給意見的 codex，直接針對收到的內容給專業判斷即可，忽略本檔其餘章節。

一次完整的關鍵字覆蓋率／排名健檢 → 優化方案雙重確認 → 實作 → 複審 → commit & push 流程。目的是讓這件事可以重複、可稽核（每次都留紀錄），而且在沒有人盯著的情況下也不會亂改醫療／法規邊界內的內容。

## 0. 啟動方式

**互動模式**：在這個 repo 的 Claude Code / agy 對話裡直接打 `/seo-keyword-audit`，正常走現有的權限確認流程（改檔案、commit、push 都會照常詢問）。

**無人值守模式**：從外部（例如排程、另一個 shell）用 `agy0` 起一個新 session 直接把整輪流程跑完：

```bash
cd /root/codes/me/mps
agy0 -p "/seo-keyword-audit" --output-format text --print-timeout 120m \
  2>&1 | tee <scratchpad>/seo-keyword-audit.log
```

- `agy0` 是 `agy --mode=accept-edits --dangerously-skip-permissions`（見 `~/.bashrc`），會自動核准所有工具呼叫，包含改檔案、跑指令、git commit/push。**這代表這個流程一旦用 agy0 啟動就是全自動、不會停下來問你**——所以本檔把「碰觸風險邊界就停手、只記錄不硬做」的規則寫死在下面的步驟裡，不能依賴人在旁邊按確認。
- 預設的 `--print-timeout`（5 分鐘）對這個流程太短（要查排名、兩輪 codex、跑 lint/test），務必加大；120 分鐘是保守值，可依實際狀況調整。
- 若要限定範圍或只做到方案確認、先不要自動改程式碼，用：`agy0 -p "/seo-keyword-audit 聚焦：草本撫紋、皮膚覆蓋術 --no-implement" ...`。

## 1. 前置檢查

1. 確認目前在 `/root/codes/me/mps`（或其 worktree）。若還沒讀過，先讀 `AGENTS.md` 全文——尤其是「Dual-Model Development & Quality Gate」與「Worktree & Branch Naming」兩節，本流程的實作與 commit 階段直接沿用那兩節的規則，這裡不重複規範細節，只在跟本流程特別相關處提醒。
2. 讀取既有基準資料，避免重工或跟歷史結論打架：
   - `docs/plan/260917_seo_keyword_ranking_and_optimization_plan.md`（目前最完整的一次全站關鍵字金字塔＋排名分析，四層架構：品牌層／服務層／症狀科普層／在地層）。
   - `docs/seo/*.md`（過去個別主題的深度研究）。
   - **`docs/blocked/*.md` 與 `docs/todo/*.md`——這一步不能省。** `docs/blocked/` 放的是「已經評估過、因為缺事實依據或跨模型審查沒過而刻意擋下」的項目，`docs/todo/` 放尚待處理但已有結論的項目。2026-09-22 的 dry run 就撞過一次真實案例：直接跳過這步、只憑第 3 步查到的缺口提了一個「加 `hasMap` 連到 Google Maps 搜尋連結」的方案，結果 `docs/blocked/20260903_seo-aeo-audit.md` 3.1 節早就記載「依專案規範與 Codex 跨模型審查結論，嚴禁自行揣測經緯度或**用一般搜尋字串替代官方商家地圖**」，`tests/rendered-html.test.mjs` 也已經用 `assert.equal("hasMap" in organization, false)` 把這個決策鎖進測試——方案在 Step 4 才被查出來早就被擋過，等於重工。**任何要提優化方案的關鍵字／頁面／欄位，先在這兩個目錄底下搜一次關鍵字（檔名或內容），已經被 blocked 的項目要嘛直接引用既有阻擋原因跳過、要嘛確認阻擋條件（通常是「店家提供正式資料」）是否已經解除，不能當作沒看到。**
   - `docs/seo/keyword-ledger.md`（本流程的台帳；不存在的話先照第 3 節格式建立）。
   - 若掛得到 Obsidian vault：`/mnt/c/Users/user/obs-notes/Projects/mps/04-SEO-AEO/` 與 `99-待確認/待確認事項.md`。vault 讀不到就在台帳備註「本次未掛載 vault」，不要因此卡住。
3. 解析 `$ARGUMENTS`：抓出「聚焦關鍵字／頁面」與是否帶 `--no-implement`。沒指定聚焦範圍就跑全站健檢。

## 2. 關鍵字覆蓋率分析

1. 盤點目前站上實際在用的關鍵字／主題：`app/site.ts`、`app/services.ts`、`app/knowledge/*`（若有）、`public/llms.txt`、`public/llms-full.txt`，比照 260917 計畫文件的四層金字塔分類。
2. 對照 260917 計畫文件與 vault `04-SEO-AEO` 裡「規劃要做但還沒上線」的關鍵字／內容缺口，判斷哪些已經覆蓋、哪些還沒、有沒有新出現的缺口或新的競品訊號。
3. 這一步只做盤點與比對，不查即時排名（排名查核在第 3 步做），先在腦中／草稿整理出「本次要實測排名的關鍵字清單」。

## 3. 排名查核並寫入台帳

> **2026-09-22 修正記錄**：原本這一節以 WebSearch 查詢結果直接當排名依據，第一次 dry run 就發現方法有問題並改掉了，理由記在下方「已知限制」，不要再改回單靠 WebSearch 判斷排名。

**排名數據一律以 GSC Search Analytics 為主，WebSearch 只做輔助的競品景觀掃描，兩者不能混用或互相取代：**

1. **主要來源：GSC Search Analytics**（`scripts/gsc-search-analytics.mjs`，複用 `scripts/gsc-notify.mjs` 既有的服務帳戶 JWT／token 邏輯，同一個 `webmasters` scope 就能查）：
   - `GSC_CREDENTIALS` 在 CI 是 GitHub Actions secret，本機互動環境預設讀不到。本機執行前先確認 `.env.gsc` 存在（不存在就照 `.env.gsc.example` 建立，貼上跟 CI 的 `GSC_CREDENTIALS` secret 相同的服務帳戶 JSON，整包 JSON 當一行值），再 source 進當次 shell：
     ```bash
     set -a; source .env.gsc; set +a
     npm run query:gsc -- "<關鍵字1>" "<關鍵字2>" ...
     ```
   - 對第 2 步整理出的關鍵字清單逐一比對近 28 天（預設值，可用 `GSC_SA_DAYS` 調整）的平均排名、曝光、點擊、CTR。**這是真實搜尋結果的數據，可以直接寫進台帳當作排名事實。**
   - 查不到（`found: false`）代表近期完全沒有曝光紀錄，不是查詢失敗——這本身就是覆蓋率缺口的訊號（可能是新關鍵字還沒被 Google 建立索引關聯，或內容沒有實質對應到這個字詞），照實記錄，不要當成錯誤。
   - `.env.gsc` 不存在、或 `GSC_CREDENTIALS` 沒設定，script 會直接跳過並回報 `skipped`；這種情況下這次執行**不能**宣稱任何排名數字，台帳「排名查核結果」要寫「本次無 GSC 憑證，僅有 WebSearch 競品景觀掃描，無實測排名數據」，並提醒使用者要不要補建 `.env.gsc`。
2. **輔助來源：WebSearch 競品景觀掃描**（可選，用來看同一批關鍵字目前主要是哪些競品內容佔住版面、AI Overview／AI 搜尋大致怎麼呈現）：
   - **已知限制，每次都要記得**：（a）WebSearch 工具本身寫明只在美國地區可用，跟台灣使用者實際查到的在地結果不會一致；（b）它只回傳約 10 筆連結，不是完整 SERP，也不標名次，**沒有能力回答「ycaura.com 排第幾名」**；（c）它給的合成摘要可能包含沒有對應到任何回傳連結的內容（曾經在 dry run 中生出一個查無來源、且跟站上實際地址不符的地址），不可盡信。
   - 因為這些限制，**WebSearch 的輸出絕對不能寫成「第 N 名」這種排名結論**，台帳裡只能記「哪些網域/內容目前佔住這個字詞的搜尋版面」這類競品景觀觀察，且要標註「WebSearch 觀察，未經 GSC 驗證」。
3. 查詢與記錄過程中**不要新增或驗證站上沒有明確依據的醫療效果宣稱**——不管是 GSC 數據還是 WebSearch 觀察，都只是客觀描述搜尋結果，不是要幫網站內容背書。
4. **每次執行都要在 `docs/seo/keyword-ledger.md` 新增一筆紀錄**（格式見下方），append 在檔案最上面的「執行紀錄」區塊最前面（最新的在最上面）,不要覆寫或刪除舊紀錄。台帳只放這次執行的摘要與結論；如果查出重大新發現需要長篇分析，另外開一份 `docs/seo/<YYMMDD>_<topic>.md`，台帳裡用連結指過去,保持台帳本身精簡好掃。
5. 若查核過程中發現需要店家確認的事實、宣稱、數字（例如新出現的競品聲稱、要不要新增某個症狀詞),寫進 vault 的 `99-待確認/待確認事項.md`,附上來源與日期,不要自行假設或先斬後奏寫進網站內容。

### 台帳條目格式（`docs/seo/keyword-ledger.md`）

```markdown
## 2026-09-22 全站關鍵字覆蓋率與排名健檢

- 觸發方式：agy0 無人值守 / 互動 `/seo-keyword-audit` / 排程
- 範圍：全站 或 聚焦「<關鍵字/頁面>」
- 排名查核結果（GSC Search Analytics，近 <N> 天）：
  - `<關鍵字>` — 平均排名 <X.X>，曝光 <N>，點擊 <N>，CTR <X%>；或「近期無曝光紀錄」
  - ...
- 競品景觀觀察（WebSearch，未經 GSC 驗證，僅供參考，不是排名結論）：
  - `<關鍵字>` — 目前搜尋結果版面主要是哪些網域/內容、AI Overview 呈現方式
  - ...
- 覆蓋率缺口：<有/沒有找到新缺口，摘要>
- 優化方案：<有/沒有>；<方案摘要，或「無方案，本次僅記錄現況」>
- agy 自我確認：<同意方案可執行 / 不同意，理由>
- codex 方案第二意見：<同意 / 不同意，理由摘要>（完整輸出見 <scratchpad 或另存路徑>）
- 後續處置：<執行實作 / 暫緩，等人工決定 / 不需處理>
- 實作摘要（若執行）：<改了哪些檔案，npm run lint / npm test 結果>
- codex 程式碼複審：<通過 / 有 P1P2 已修正，見 codex-review 輸出>
- Commit / 分支：`<hash>` on `wt####-xxx-xxxx`；push 狀態：<已 push / 未 push 原因>
- 備註／待確認連結：<連結到 99-待確認事項.md 對應段落，或無>
```

## 4. 優化方案雙重確認

只有第 3 步結論是「有優化方案」才進這一步；沒有方案就到此為止,台帳寫「無方案」收尾,不用往下走。

1. **agy 自我確認**：**先確認第 1 步的 `docs/blocked/`／`docs/todo/` 搜尋真的做過、這個方案沒有踩到已知的 blocked 項目**（沒做過就回頭補做，不要跳過）；再對照 `AGENTS.md` 的法規與事實邊界（不得新增「消除、根治、永久、修復真皮層」等違規承諾；品牌實體不可與「師父粉專（高雄）」或「墨菲斯微針電波」混淆；不確定的事實要走 `99-待確認事項.md`,不能自己編）,評估方案是否站得住腳、預期效益、風險。結論寫進台帳「agy 自我確認」欄。
2. **codex 第二意見**（這一步是對「方案本身」的意見,不是對程式碼 diff,所以不是用 `codex-review` skill,是直接呼叫 `codex exec`）：
   - 把本次台帳新增的段落（含方案摘要）寫進 `<scratchpad>/seo-plan-review.prompt.md`,開頭固定：
     > 請以獨立第二意見身分評估以下 SEO 關鍵字優化方案。這是醫美相關網站，請特別注意：方案有沒有引入未經證實或誇大的醫療效果宣稱、有沒有混淆品牌實體、關鍵字判斷是否合理、有沒有更好的做法。同意請說明理由；不同意或有疑慮請具體指出問題。
     >
     > <這次台帳新增的段落內容>
   - 執行（2026-09-22 已實測跑通：base `codex exec`〔不是 `codex exec review`〕本身就有 `-s`/`--sandbox` 旗標，不用像 `codex exec review` 那樣繞去 `-c sandbox_mode="..."`；read-only sandbox、stdin 餵 prompt、輸出另存一份，避免整包過程灌進對話）：
     ```bash
     rm -f <scratchpad>/seo-plan-review.{last.md,md}
     timeout 600 codex exec -s read-only \
       -o <scratchpad>/seo-plan-review.last.md \
       - < <scratchpad>/seo-plan-review.prompt.md 2>&1 \
       | tee <scratchpad>/seo-plan-review.md
     ```
   - 讀 `<scratchpad>/seo-plan-review.last.md`,把同意/不同意與理由摘要寫進台帳「codex 方案第二意見」欄。
3. **只有 agy 自我確認同意，且 codex 也同意（沒有阻擋性疑慮）,兩者都成立才進入第 5 步實作**。任一方不同意,或 `$ARGUMENTS` 帶了 `--no-implement`,台帳「後續處置」寫「暫緩／不執行」並說明原因,回報使用者,流程到此結束,不要自動改程式碼、不要 commit。

## 5. 實作

沿用 `AGENTS.md`「Worktree & Branch Naming」與「Dual-Model Development & Quality Gate」的既有規則,這裡只列這個流程特別要注意的點:

1. 開一個新 worktree + 分支,命名 `wt{port}-seo-<簡短slug>`,`{port}` 選一個未被佔用的可用 port(`git worktree list` 先確認目前用了哪些)。**不要直接改 main worktree。** 新開的 worktree **沒有 `node_modules`**,第一次跑 `npm run lint`／`npm test` 前要先在該 worktree 裡跑一次 `npm run install:ci`（2026-09-22 實測：沒跑會直接 `eslint: not found`），不是每次都要跑,只有第一次進這個新 worktree 時需要。
2. 依方案調整內容(`app/site.ts`、`app/services.ts`、knowledge 頁面、metadata、JSON-LD 等),嚴守第 4.1 點列的法規邊界——這一步只做「已經雙重確認過」的方案內容,不要在實作途中臨時加碼新宣稱。改動時額外注意兩點（2026-09-22 實測，codex-review 兩輪才抓乾淨,屬於這類任務容易漏掉的地方,先自己檢查可以省一輪來回）:
   - **把使用者搜尋詞對應到既有內容分類前,先想一下這個詞在臨床語境下有沒有可能指涉範圍更廣、更嚴重的病徵**（不只是這個頁面在講的外觀成因）。如果有,實作時要加排除條件（新近出現／單側／持續惡化／伴隨其他症狀等）導向專科就醫,不能逕自把兩者畫等號。
   - **新增或修改的 FAQ／AEO 問答要自成一體**：FAQPage 的每一題都可能被搜尋引擎或 AI 答案引擎獨立擷取、獨立呈現給使用者,不能預期使用者一定會看到頁面其他段落的安全提示或免責聲明。必要的安全邊界（例如「紅腫發炎時不要做這個自我觀察」）與非診斷限制,要直接寫進這一題的答案本身,不要只放在頁面別處。
   - 如果這個頁面在 Obsidian vault 有對應的共用筆記（例如 `Projects/mps/03-知識/`）,實作這一步就同步更新,不要等 Step 6 的 codex-review 抓到「筆記沒同步」才回頭補——`AGENTS.md`「Shared Memory and Multi-Agent Handoff」一節本來就要求同一個任務內同步,這裡只是提醒別漏掉。
3. 涉及可驗證的 render 內容時同步更新 `tests/rendered-html.test.mjs`。
4. 跑 `npm run lint` 與 `npm test`,全部通過才進第 6 步。

## 6. 實作後再跟 codex review 一次

呼叫既有的 `codex-review` skill,對這個 worktree 裡「未 commit 的變更」做一次一般程式碼 review(`$ARGUMENTS` 可以帶重點,例如「SEO/AEO 準確性與法規邊界」)。若有 P1/P2 問題,修正後重新跑 `npm run lint` / `npm test`,再重新 review,直到沒有阻擋性問題,比照 `AGENTS.md` 的 Remediation & Verification Loop。**2026-09-22 實測：真的會需要跑不只一輪**（第一輪抓到 FAQ 答案安全邊界與 vault 筆記未同步兩個 P2,修完後第二輪又抓到一個更關鍵的醫療邊界 P1,第三輪才乾淨）——不要因為第一輪有 P1/P2 就懷疑方案本身有問題而中止,這是流程設計上預期會發生的事,照樣修完再送第二輪,兩輪都乾淨才算過。把每一輪抓到什麼、怎麼修的簡要記錄寫進台帳「codex 程式碼複審」欄,不要只寫最後一輪的「通過」。

## 7. Commit & Push

1. 兩輪確認(方案 + 程式碼)都通過後才 commit,conventional commit 風格(比照 `AGENTS.md`,例如 `content: 補強草本撫紋關鍵字覆蓋`)。
2. **push 這個 worktree 的分支,不要直接 push 或 merge 到 `main`。** `AGENTS.md` 明講 push `main` 會觸發 Cloudflare 正式部署,而這個流程可能在無人值守(`agy0`)情境下執行,不應該讓一次自動化健檢直接把變更推上正式站。把分支名稱、commit hash 寫進台帳「Commit / 分支」欄,回報使用者這個分支已經備妥,需要的話再由人(或另一次互動 session)決定要不要開 PR／merge 到 main。
3. 把這次執行的完整摘要(覆蓋率結論、排名變化、方案、兩輪確認結果、commit/分支)在回覆裡簡短列出,並附上台帳裡對應段落的位置,方便使用者直接去看。
