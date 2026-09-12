# 外部設計類 Skill 評估與導入規劃

建立日期：2026-09-12
背景：使用者詢問四個外部 skill（`taste` / `impeccable` / `ui/ux pro max` / `emilkowalski`）對本專案是否有幫助。這四個名稱都不在目前環境已安裝的 skill 清單中，經 WebSearch 確認實際對應到以下四個公開 repo，並已抓取各自 `SKILL.md` 逐一閱讀評估：

| 使用者說的名稱 | 實際 repo | 性質 |
| --- | --- | --- |
| taste | [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill)（install 名 `design-taste-frontend`） | 純 Markdown 指引，反 AI 樣板感 |
| impeccable | [pbakaus/impeccable](https://github.com/pbakaus/impeccable) | Markdown + **會下載並執行一支自帶二進位檔** 的 CLI 工具鏈 |
| ui/ux pro max | [nextlevelbuilder/ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) | Markdown + 本地 Python 查詢腳本（樣式/色票/字型/UX 規則資料庫） |
| emilkowalski | [emilkowalski/skills](https://github.com/emilkowalski/skills)（`emil-design-eng` 為主） | 純 Markdown 指引，動效與互動細節哲學 |

專案現況（供比對用）：本站 `ycaura.com` 是雙和店醫美診所的行銷型網站（Next.js + 手寫 CSS，編輯式排版、襯線大標、陶土色系），非 dashboard/多步驟產品型 UI。`AGENTS.md:46` 已規定「UI 或響應式設計變更要用 `frontend-design` skill」，且 `docs/todo/20260831_ui-ux-audit.md` 與 `docs/todo/20260904_typography-legibility-optimization.md` 顯示團隊近期正在做觸控熱區、字級、行動版導覽等實測修正，已有明確的量測方法論（CDP 截圖 + 實機尺寸）。

---

## 1. 逐一評估

### 1.1 taste-skill（Leonxlnx）— 建議採用（作為 `frontend-design` 的加強版）

- **內容**：先讀 brief 推斷「頁面類型 / 語氣 / 受眾 / 品牌既有素材」並輸出一行 Design Read，再用三個 0–10 dial（`DESIGN_VARIANCE` / `MOTION_INTENSITY` / `VISUAL_DENSITY`）決定版面大膽程度，並列出「brief 是官方 design system（如 Fluent／Carbon）」vs「brief 是純美學方向（如 bento／brutalism）」的判斷表，附大量「AI 樣板感」黑名單（置中英雄圖+紫色漸層、三張等寬卡片、Inter+slate-900 等）。
- **適配度：高**。文件開頭明寫「Landing pages, portfolios, and redesigns. Not dashboards」——正好是本站的形態。首頁／服務頁／知識頁本質都是行銷型 landing，`redesign - preserve` 模式（保留既有品牌識別、只精修）完全對應目前的漸進式優化節奏，而不是本專案已經避開的「置中漸層英雄圖」樣板。
- **風險**：無執行檔、無需安裝依賴，純 Markdown，風險最低。
- **與現有規範的關係**：可以視為 `frontend-design` skill 的**互補**而非取代——`frontend-design` 給的是設計哲學（避免樣板、排版原則），taste-skill 多了「brief 推斷 → dial 量化 → 官方 design system 對照表」這套更具體的決策流程，兩者不衝突。

### 1.2 emilkowalski/skills — 建議採用（限定動效相關子技能）

- **內容**：`emil-design-eng` 談的是「看不見的細節」哲學（何時不該動畫、easing 選擇決策樹、時長表、review 用 Before/After/Why 表格）；repo 內另有 `review-animations`（稽核既有動效）、`find-animation-opportunities`、`animation-vocabulary`（動效需求轉術語）等子技能。也有 `apple-design`、`write-swift`、`animate-expo` 等原生 App 向的技能，跟本站（Web/Next.js）無關。
- **適配度：中高，但要挑著用**。`20260831_ui-ux-audit.md` 已確認全站有處理 `prefers-reduced-motion`，代表團隊本來就重視動效節制，這正是 emil 哲學的核心（「100+ 次/天的操作不該有動畫」「UI 動效應 < 300ms」「禁用 `ease-in`」）。可以直接拿來覆核：導覽選單開合、FAQ 展開/收合、QR 卡片 hover、CTA 按鈕按壓回饋等既有動效的 duration/easing 是否符合這套標準。
- **不建議用的部分**：`apple-design`、`write-swift`、`animate-expo`、`pick-ui-library` 與本站技術棧（Next.js Web）無關，不需要一起裝。
- **風險**：純 Markdown 指引，無執行檔，風險低。

### 1.3 ui/ux pro max（nextlevelbuilder）— 可選用，當「查詢字典」而非主導向

- **內容**：本質是一個本地 Python 查詢工具，內建 CSV/JSON 資料庫（79 種風格、192 組產品配色、74 組字型搭配、119 條 UX 準則、105 個圖示建議、17 組 GSAP 動效預設、25 種圖表、22 種技術棧），用 `search.py "<關鍵字>" --domain <domain>` 查詢，可用 `--design-system --persist` 把結果寫成專案的 `design-system/<slug>/MASTER.md`。
- **適配度：中**。本站設計方向早已確定（陶土色系、襯線+無襯線混排、編輯式排版），不需要重新用它「生成」設計系統；但它的 `ux` domain（觸控尺寸、對比度、表單回饋）和 `typography` domain（字型搭配、字級規範）可以拿來**交叉驗證** `20260904_typography-legibility-optimization.md` 已列的字級表是否符合業界通用準則，例如查 `"body text minimum size mobile" --domain ux` 或 `"serif sans pairing editorial" --domain typography`。
- **風險/成本**：需要安裝 `npm install -g ui-ux-pro-max-cli` 並跑 `uipro init --ai claude`，等於在專案裡多引入一個第三方 CLI 依賴與一批資料檔案；且它的美學建議是通用資料庫比對，對「雙和店」這種已有成熟品牌調性的站來說，**參考價值大於指導價值**——不應讓它覆蓋既有品牌決策。
- **建議**：先不當作固定依賴安裝，改成需要交叉驗證某個設計判斷時再臨時查詢（或請它提供的資料表當人工參考，不必真的裝 CLI）。

### 1.4 impeccable（pbakaus）— 不建議現在導入

- **內容**：功能最完整也最重——`shape/critique/audit/polish/bolder/quieter/animate/colorize/typeset/layout/harden/onboard/live` 等十幾個子命令，會維護 `PRODUCT.md`/`DESIGN.md` 兩份專案級設計文件，並區分 Persuade/Operate/Read/Experience 四種頁面模式（本站屬於 **Persuade**，跟 taste-skill 的判斷一致）。
- **關鍵疑慮**：Setup 步驟要求執行 `scripts/impeccable context`，其說明是「啟動一支隨 skill 附帶、或**首次執行時下載**的自帶二進位檔（self-contained binary）」。這代表要跑這個 skill，必須讓 Claude 在專案裡執行一支來源不明、無法先審查原始碼的已編譯執行檔——這對一個會處理真實客戶資料/部署金鑰的專案（本站有 Cloudflare 部署 token）是不必要的供應鏈風險。
- **建議**：先不採用。如果之後真的想用，至少要先索取原始碼或改用「Launcher unavailable」的降級路徑（純讀 `PRODUCT.md`/`DESIGN.md`，不跑 binary），但那樣就等於放棄它一半以上的功能，性價比不高。它的 Commands 分類（`polish`/`typeset`/`layout`）思路可以參考，但不必真的安裝這個 skill。

---

## 2. 建議採用順序與導入方式

1. **taste-skill**：導入為常駐 skill。放到 `.claude/skills/design-taste-frontend/`（複製其 `skills/taste-skill/SKILL.md`），並在 `AGENTS.md` 的「Skill-Assisted Review」段落補一句：UI 變更除了 `frontend-design`，涉及新頁面/大改版時再一併讀 `design-taste-frontend` 做 Design Read 與官方 design system 比對。
2. **emilkowalski（僅動效子集）**：只取 `emil-design-eng`、`review-animations`、`animation-vocabulary` 三個資料夾放進 `.claude/skills/`，跳過 App 原生相關的技能。下次調整導覽選單、FAQ 展開、CTA 按壓回饋這類互動時使用；也可以先拿 `review-animations` 的 Before/After/Why 表格格式，對現有 `app/nav-menu-behavior.tsx`、`.contact-map-link` 等既有 hover/展開動效做一次覆核。
3. **ui-ux-pro-max**：不安裝 CLI，改成「需要時用 WebFetch 查它的 `references/quick-reference.md` 或請具備該 skill 的環境代查」的臨時參考，用在交叉驗證字級/對比度/觸控尺寸準則。
4. **impeccable**：不採用，原因如上（未經審查的下載執行檔）。若使用者仍想要它的十幾個子命令能力，之後可以另開一次獨立評估，先去 pbakaus/impeccable 找該 binary 的原始碼與建置方式做安全審查，而不是直接跑。

## 3. 對應到現有待辦的具體切入點

- `20260904_typography-legibility-optimization.md`：可用 taste-skill 的字級/密度 dial 交叉檢查目前調整是否落在合理區間；不需要重跑整份稽核。
- `20260831_ui-ux-audit.md` 剩餘未勾選項目（行動版區段導覽等）：導入 taste-skill 後，下次做這類調整時先產出一行 Design Read，確認調整方向沒有滑向「AI 樣板」清單裡的反例（如加對稱三卡片、無意義漸層）。
- 導覽選單、FAQ、QR 卡片等既有互動動效：用 emil 的動效決策框架（是否該動畫 → 目的 → easing → 時長）覆核一次，特別是 `ease-in` 誤用與 `transition: all` 這類常見毛病。

## 4. 執行結果（2026-09-12 更新）

第 1 項（taste-skill）已落地並實跑過一次，其餘維持原評估、尚未執行：

- [x] **taste-skill**：`.claude/skills/design-taste-frontend/SKILL.md` 已加入，`AGENTS.md` Skill-Assisted Review 段落已補使用時機說明。commit `2f4c582`，已合併進 `main`。
  - **實跑驗證**：用它覆核 `20260831_ui-ux-audit.md` 2.3 項（行動版導覽），發現該項其實已由更早的 `bfd7c80` commit 完成，待辦只是沒同步勾選——已補勾並附上出處。
  - **實跑額外發現**：taste-skill 的 CTA 誠實性檢查點出 `.mobile-sticky-cta` 文案「立即預約諮詢」與實際點擊行為（跳轉 Facebook 私訊，不是預約表單）不一致，這是舊版 CDP 稽核沒抓到的角度。已將全站 6 處同文案改為「Facebook 私訊預約」，經 `codex-review`（gpt-5.6-luna,read-only sandbox）覆核判定無功能性回歸，一併合併進 `main`。
  - 小結：taste-skill 對這個站的價值目前主要體現在「文案/CTA 一致性」這類非結構性問題上，而非抓版面樣板（本站本來就不是 AI 生成的樣板頁面，大部分反樣板規則本來就會過）。
- [ ] **emilkowalski（僅動效子集：`emil-design-eng`／`review-animations`／`animation-vocabulary`）**：尚未落地，等下次要調整導覽選單、FAQ 展開、CTA 按壓回饋這類互動時再一併裝、一併用。
- [ ] **ui-ux-pro-max**：維持「需要時臨時查詢，不裝 CLI」的結論，尚未實際查過。
- [ ] **impeccable**：維持不採用的結論。
