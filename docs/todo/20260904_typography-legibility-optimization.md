# 全站排版字級與繁體中文易讀性優化

建立日期：2026-09-04  
網站：<https://ycaura.com/>  
分類：UI/UX 設計規範 · 無障礙易讀性 (Accessibility) · 繁體中文排版  

---

## 1. 執行背景與痛點分析

雙和店主要客群涵蓋產後媽媽、紋路困擾者、疤痕修飾與眼周色澤評估者，族群年齡跨度廣，且多數透過行動裝置（手機）瀏覽網頁與前往門市導航。

經視覺排查與文字大小稽核，發現目前網站存在以下排版痛點：

1. **極小字（8px～10px）導致繁體中文粘連**：
   - 繁體中文字筆畫結構複雜（例如「諮、詢、覆、蓋、證、券、衛、範」等字）。
   - 在多處標籤、Meta 資訊與 QR Code 說明中出現了 8px、9px、10px 的極小字級，在手機端與一般 PPI 螢幕上筆畫嚴重粘連，讀者難以清楚辨識。
2. **關鍵轉換與指引資訊弱化（11px）**：
   - 「私訊諮詢前可先準備 3 件事」、「01 在意部位」、「地圖導航 ↗」等引導使用者進行下一步行動的核心元素，字級僅有 10px～11px，視覺權重過低，缺乏指引性。
   - 門市地址在手機端被縮小至 12px，對於需要邊走邊看門牌核對的顧客而言閱讀吃力。
3. **行動端內文偏小（13px）**：
   - 手機版 Media Query（`@media (max-width: 760px)`）將服務說明、流程說明與 FAQ 解答等主要正文從桌機的 14px 降至 13px，不符合現代行動端正文建議的 14px～16px 舒適閱讀規範。

---

## 2. 字級調整對照表 (Audit & Specification)

| 類別 | 選擇器 / 元素 | 目前字級 | 目標字級 | 調整理由與視覺預期 |
| :--- | :--- | :--- | :--- | :--- |
| **極小微字 (Microcopy)** | `.contact-qr-eyebrow` | 8px | **11px** | 徹底消除不可讀的 8px，保持英文字母大寫追蹤感（letter-spacing）。 |
| **極小微字 (Microcopy)** | `.knowledge-article-meta`（手機端） | 9px | **12px** | 專文標題下的「內容整理：... 最後更新：...」繁體中文正常可讀。 |
| **極小微字 (Microcopy)** | `.contact-details > span` | 10px | **12px** | 「地址」、「交通」、「時間」、「預約」小標籤更清晰，與數值文字協調。 |
| **極小微字 (Microcopy)** | `.contact-guide-badge` | 10px | **12px** | 「私訊諮詢前可先準備 3 件事」徽章提高能見度，強化導引心理提示。 |
| **極小微字 (Microcopy)** | `.contact-qr-copy small` | 10px | **12px** | 「掃描加入好友」、「查看最新分享」更易閱讀。 |
| **極小微字 (Microcopy)** | `.knowledge-card-label`, `.knowledge-card-note` | 10px | **11px** | 保持卡片俐落風格，同時提升識別度。 |
| **指引與互動標籤** | `.contact-guide-steps strong` | 11px | **13px** | 步驟標題「01 在意部位」、「02 狀態時間」、「03 清楚照片」更醒目。 |
| **指引與互動標籤** | `.contact-guide-steps li / span` | 12px | **13px** | 步驟描述內容維持 13px，與標題字重自然對比。 |
| **指引與互動標籤** | `.contact-guide-hint` | 11px | **12px** | 補充說明文字放大，維持柔和提示調性。 |
| **指引與互動標籤** | `.contact-map-link` | 11px | **12px～13px** | 「地圖導航 ↗」互動連結更具點擊引導力，符合點擊熱區感。 |
| **指引與互動標籤** | `.contact-details`（手機版） | 12px | **13px** | 手機核對門牌地址「景新街347號9樓之9（元大證券 6F 樓上）」清晰好讀。 |
| **手機端正文** | `.service-row p`（手機版） | 13px | **14px** | 服務項目摘要對齊桌機標準，消除行氣擁擠。 |
| **手機端正文** | `.process-step p`（手機版） | 13px | **14px** | 預約諮詢流程步驟內文更舒適易讀。 |
| **手機端正文** | `.faq-answer p`（手機版） | 13px | **14px** | FAQ 展開後的詳細解答更易於吸收。 |

---

## 3. 待辦項目清單

- [x] **1. 淘汰全站低於 11px 之極小字**（已完成於 2026-09-04）
  - 將 `.contact-qr-eyebrow` 由 8px 提升至 11px。
  - 將 `.knowledge-article-meta`（手機版）由 9px 提升至 12px。
  - 將 `.contact-details > span` 由 10px 提升至 12px。
  - 將 `.contact-guide-badge` 由 10px 提升至 12px。
  - 將 `.contact-qr-copy small` 由 10px 提升至 12px。
  - 將 `.knowledge-card-label`, `.knowledge-card-note` 由 10px 提升至 11px。

- [x] **2. 優化聯絡指引與導航互動元件字級**（已完成於 2026-09-04）
  - 將 `.contact-guide-steps strong` 由 11px 提升至 13px。
  - 將 `.contact-guide-steps li / span` 由 12px 提升至 13px。
  - 將 `.contact-guide-hint` 由 11px 提升至 12px。
  - 將 `.contact-map-link` 由 11px 提升至 12px。
  - 將手機端 `.contact-details` 由 12px 提升至 13px。

- [x] **3. 調優手機端內文標準正文字級（13px ➜ 14px）**（已完成於 2026-09-04）
  - 將手機版 `.service-row p`、`.process-step p`、`.faq-answer p` 提升為 14px。
  - 確保在 390px（iPhone 等寬度）與 360px（Android 小型寬度）下無非預期的文字折斷或版面溢出。

- [x] **4. 雙模型驗證與雙端截圖驗收**（已完成於 2026-09-04）
  - 執行 Headless Chrome 進行桌機（1440px）與手機（390px）實體驗收截圖。
  - 執行 `npm run lint` 與 `npm test`，確保各項自動化斷言與樣式皆綠燈。
  - 呼叫 `codex-review` 進行獨立跨模型審查，確認無障礙與視覺層次規範。

---

## 4. 影響檔案與驗證標準

- **改動檔案**：
  - `app/globals.css`
  - `tests/rendered-html.test.mjs`（若有相關排版或結構測試需同步）
- **驗收標準**：
  - 全站不再出現低於 11px 的不可讀字級。
  - 手機版（390px / 360px）所有中文字筆畫清晰分明，無橫向破版或多餘換行。
  - 視覺上維持瑪菲斯純粹簡約、留白優雅的美學氛圍，不因字級放大而顯得粗笨。
