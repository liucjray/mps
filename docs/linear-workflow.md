# Linear 自動工單流程

1. 開發票由 Linear team `MPS` 驅動，票面內容以 Linear description 為準。
2. 每張票使用獨立 worktree，並建立 `feat/<slug>` 分支。
3. 預覽 port 記錄在 Linear 認領留言中，不放入分支名稱。
4. 合併前必須執行 `npm test` 與 `npm run lint`，並完成第二 AI review。
5. `Review Done` 代表核准上線。
6. Merge worker 合併並通過驗證後，會 push `main`。
7. `main` 的 push 觸發 GitHub Actions，部署至 Cloudflare。
8. 若 push 被拒絕或驗證失敗，流程會停住並在票上留言；不會 force push。
進入 `Review` 狀態後，Herdr 會開啟一個 PMAI 互動 pane，可向 devAI 或 reviewAI 提問。
