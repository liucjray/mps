# 本專案使用的 Skill 總覽

建立日期：2026-09-12
目的：整理目前 `AGENTS.md` 實際點名要用的 skill、它們是否已真的落地在這個 repo 裡、以及「每次改動要不要重新跑一次 skill 驗證」的規則,避免每個 session 重新猜一次。

---

## 1. Skill 清單與採用狀態

| Skill | 來源 | 是否已落地在 repo | 用途（摘自 `AGENTS.md`） |
| --- | --- | --- | --- |
| `design-taste-frontend` | [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill)，已抓取存放 | ✅ 已 vendor 進 `.claude/skills/design-taste-frontend/SKILL.md`（commit `2f4c582`） | 新頁面／視覺方向未定的改版，先產出一行 Design Read（頁面類型／受眾／語氣／design system 對照），再動手 |
| `frontend-design` | claude-plugins-official 內建 plugin | ❌ 未落地，依賴當次 Claude Code 環境是否啟用該 plugin | UI／響應式設計變更的主要設計哲學（避免 AI 樣板感）|
| `seo-aeo-best-practices` | 外部 plugin（未在本 repo 找到來源） | ❌ 未落地，依賴當次環境 | metadata、結構化資料、sitemap、robots、AI 搜尋相關改動 |
| `codex-review` | 本機 `codex` CLI（OpenAI，`gpt-5.6-luna`） | ⚠️ 半落地：呼叫方式（skill 指令）不在 repo 裡，但**執行環境**（本機 `codex` 指令）是外部依賴，不是 Claude Code plugin | **每一次**開發任務收尾前的強制獨立審查（見下方 Dual-Model 工作流程）|
| `seo-keyword-audit` | 本專案自建，2026-09-22 新增 | ✅ 已 vendor 進 `.claude/skills/seo-keyword-audit/SKILL.md` | 關鍵字覆蓋率健檢＋實測排名查核，寫入 `docs/seo/keyword-ledger.md`；優化方案需自我確認＋`codex exec` 第二意見雙重同意才實作，實作後再跑一次 `codex-review` 才 commit（預設只 push worktree 分支，要合併回 `main` 由使用者當場指示）。在互動的 Claude Code 對話裡打 `/seo-keyword-audit` 跑 |

**已知風險（有實例)**：`frontend-design` 和 `seo-aeo-best-practices`是否可用完全看當次 Claude Code session 有沒有裝對應 plugin，不保證每次都在。`docs/todo/20260831_ui-ux-audit.md` 第 8 行就記錄過一次：那次 session 沒有 `frontend-design`，只好改用 CSS 檢視 + CDP 量測代替，並註記「後續若該 skill 可用，建議在實作階段再跑一次」。**只有 `design-taste-frontend` 是穩定可用的**，因為它是專案內建檔案，不依賴外部環境。

---

## Worktree 與分支命名

依目前 `AGENTS.md` 規範，所有開發與測試任務都必須在獨立 Git worktree 進行，不直接修改共享 `main` worktree。`main` 固定使用預覽 port `1102`；開新的 worktree 時必須改用其他可用 port，設定對應的 `PORT`（例如 `PORT=1104 npm run dev`），且分支名稱固定攜帶該 port，格式為 `wt{port}-xxxxxx`，其中 `xxxxxx` 為簡短任務 slug。本專案範例：`wt1104-animation-polish`、`wt1104-seo-check`。worktree 路徑、分支名稱與預覽 port 應保持可辨識的一致性。

---

## 2. 每次更新是否需要重新跑 skill？

`AGENTS.md` 沒有「所有改動都要跑全部 skill」這種規則，是**按改動類型分流**，只有 `codex-review` 是無條件強制。整理成表：

| 改動類型 | 要不要跑 skill | 跑哪個 | 依據 |
| --- | --- | --- | --- |
| **每一個開發任務**（不限於準備要 commit 的；文件、WIP 探索性修改也算） | **一定要** | `codex-review`（獨立審查未 commit 的變更） | `AGENTS.md` Dual-Model Development & Quality Gate 第 2 步，寫明「Every development task must follow this 4-step quality gate lifecycle」，沒有排除未 commit 或 WIP 工作 |
| UI／響應式版面改動 | **一定要** | `frontend-design`（若當次環境沒有，退而求其次用 CSS 檢視 + 本機桌機/行動截圖，並在文件註記之後要補跑） | `AGENTS.md` Skill-Assisted Review 第一句 |
| 新頁面，或視覺方向未定的改版 | **一定要**（在 `frontend-design` 之外再加一次） | `design-taste-frontend`，先產出一行 Design Read 再寫 code | `AGENTS.md` Skill-Assisted Review 第二句 |
| metadata／結構化資料／sitemap／robots／AI 搜尋訊號改動 | **一定要** | `seo-aeo-best-practices`，並用 `npm test` 驗證 rendered HTML | `AGENTS.md` Skill-Assisted Review 第三句 |
| 既有版面的**小範圍精修**（例如文案/CTA 文字改動、既有 checkbox 補勾這類非結構性改動） | 視情況，不強制重跑整套 UI skill | 可以只用 `design-taste-frontend` 做局部覆核（例如 CTA 文案是否誠實對應行為），不必每次都重新產出完整 Design Read | 本次 2026-09-12 的實際案例：改 `.mobile-sticky-cta` 文案沒有重跑 `frontend-design`，因為不涉及版面/視覺方向 |
| 純文字／文件（`docs/`、Markdown）修正，不影響 render 出來的 HTML | 不需要 UI/SEO skill，但 `codex-review` 仍是強制項 | `codex-review` | Dual-Model 工作流程的「Every development task」沒有排除文件類改動 |
| 純 CSS 微調（不涉及 render 內容）但視覺會變 | **一定要** | `frontend-design`（`AGENTS.md:50` 對 UI/響應式改動沒有排除任何大小的例外）+ 桌機/行動雙寬度截圖驗證 + `codex-review` | `AGENTS.md` Skill-Assisted Review 第一句、Testing Guidelines 第 32 行「Visual changes should also be checked at desktop and mobile widths」|

### 判斷原則（沒明寫規則時怎麼決定）

1. **改動會不會被使用者看到、且改變版面/視覺方向？** 會 → 跑 `frontend-design`（+ 視情況 `design-taste-frontend`）。
2. **改動會不會影響爬蟲/搜尋引擎看到的內容？**（title、meta、JSON-LD、sitemap、robots）會 → 跑 `seo-aeo-best-practices` + `npm test`。
3. **不管前兩項答案是什麼，每一個開發任務都跑 `codex-review`，不限於已經要 commit 的。** 這是唯一無條件的一項。
4. 純粹「補勾已完成的 checkbox」「修正待辦文件裡的錯字」這類不影響 production 產出的文件變動,可以跳過 UI/SEO skill,但仍過一次 `codex-review` 確認沒有誤刪內容。

---

## 3. `design-taste-frontend` 的實際使用紀錄

| 日期 | 觸發原因 | 結果 | Commit |
| --- | --- | --- | --- |
| 2026-09-12 | 覆核 `docs/todo/20260831_ui-ux-audit.md` 2.3 節（行動版導覽） | 發現該項已由更早的 `bfd7c80` 完成、待辦沒同步勾選；並發現 `.mobile-sticky-cta` 文案「立即預約諮詢」與實際點擊行為（跳轉 Facebook 私訊）不一致 | `2f4c582` |

詳細評估過程見 [`docs/todo/20260912_design-skill-evaluation.md`](../todo/20260912_design-skill-evaluation.md)。

---

## 4. 尚未落地、暫緩的 skill

以下已評估過，暫時不導入，原因見 [`docs/todo/20260912_design-skill-evaluation.md`](../todo/20260912_design-skill-evaluation.md) 第 1 節：

- `emilkowalski/skills`（僅動效子集 `emil-design-eng`／`review-animations`／`animation-vocabulary`）：等下次要調整導覽選單、FAQ 展開、CTA 按壓回饋這類互動時再一併裝。
- `ui-ux-pro-max`：不裝 CLI，需要交叉驗證字級/對比度/觸控尺寸準則時再臨時查詢。
- `impeccable`：不採用。它的 setup 需要執行一支首次會自動下載的閉源二進位檔，且會繞過 Claude Code 一般的工具核准機制觸發下載，對本專案（持有 Cloudflare 部署金鑰）風險不划算。
