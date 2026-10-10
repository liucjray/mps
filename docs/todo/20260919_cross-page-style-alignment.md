# 全站頁面樣式與結構一致性對齊規劃（Cross-Page Style & Layout Alignment Plan）

建立日期：2026-09-19  
目標範圍：全站 7 大路由頁面（`/`, `/services/[slug]`, `/knowledge`, `/knowledge/stretch-marks`, `/knowledge/dark-circles`, `/knowledge/striae-comparison`, `/knowledge/scars-camouflage`）與 `app/globals.css`  
分類：UI/UX 體驗對齊 / 程式碼重構 / 導覽系統補齊 / CRO 轉換優化  
對應文檔：`Projects/mps/06-技術/網站架構與部署.md`、`Projects/mps/00-總覽.md`  

---

## 1. 執行背景與現況診斷

經過多次功能迭代與專題擴充（新增肥胖紋比較頁、疤痕修飾專題頁、黑眼圈深化），全站在視覺風格、排版間距、導覽系統與組件階層上累積了部分細微不一致與技術債。

經 2026-09-19 全站全頁面交叉診斷，整理出以下 6 大主要不對齊面向：

| 維度 | 現況問題診斷 | 影響檔案 | 嚴重度 |
| :--- | :--- | :--- | :--- |
| **1. 導覽列與選單** | 專題選單缺漏項目（首頁漏生長紋與疤痕、服務頁漏生長紋）、專題排序顛倒、子頁面常見問題誤用相對錨點 `#faq` 導致無法跳轉 | `app/page.tsx`<br>`app/services/[slug]/page.tsx`<br>`app/knowledge/*/page.tsx` | **P1 (功能性缺損)** |
| **2. 麵包屑導覽** | 當前頁文字不統一（黑眼圈僅寫「黑眼圈」，其餘皆有專題或全稱）、服務頁中間層寫「服務項目」與導覽列「服務內容」不同步 | `app/services/[slug]/page.tsx`<br>`app/knowledge/*/page.tsx` | **P2 (UX/階層不一致)** |
| **3. 行內樣式與 Callout** | 各專題頁面散落 `style={{ marginTop: "16px" }}`、`style={{ marginBottom: "1rem" }}` 與 `style={{ paddingTop: "80px" }}`，Notice 外層容器邊距未統整 | `app/knowledge/page.tsx`<br>`app/knowledge/*/page.tsx` | **P2 (技術債/維護困難)** |
| **4. 側邊欄卡片** | 專題頁側欄「延伸閱讀」推薦清單不齊全（妊娠紋與生長紋頁漏列疤痕專題）、諮詢引導文案節奏未對齊 | `app/knowledge/*/page.tsx` | **P2 (內部連結與體驗)** |
| **5. 頁尾與預約聯絡區塊** | 知識中心各頁面底部僅有純文字按鈕，缺少首頁與服務頁具備的 3 張 QR Code 預約卡片（LINE/IG/須知）；頁尾 Logo 錨點混用 `/` 與 `/#top` | `app/knowledge/page.tsx`<br>`app/knowledge/*/page.tsx`<br>`app/services/[slug]/page.tsx` | **P2 (CRO 轉換率落差)** |
| **6. 表格外層與捲動提示** | 部分知識頁表格容器缺少統一的無障礙標籤（`role="region"`, `aria-label`）與手機版水平捲動視覺提示 | `app/knowledge/*/page.tsx` | **P3 (無障礙與細節)** |

---

## 2. 核心整改方案與規範

### 2.1 導覽系統（Header & Mobile Menu）全面對齊

1. **統一知識專題下拉選單項目（共 5 項，全站一致順序）**：
   - 知識中心首頁 (`/knowledge`)
   - 妊娠紋修飾指南 (`/knowledge/stretch-marks`)
   - 黑眼圈外觀評估 (`/knowledge/dark-circles`)
   - 肥胖紋與生長紋比對 (`/knowledge/striae-comparison`)
   - 白色疤痕與手術痕跡 (`/knowledge/scars-camouflage`)
2. **統一服務項目下拉選單（共 4 項，全站一致）**：
   - 草本撫紋 (`/services/herbal-stretch-care`)
   - 皮膚覆蓋術 (`/services/skin-camouflage`)
   - 科技測色 (`/services/colour-matching`)
   - 局部美學與科普 (`/services/beauty-education`)
3. **導覽錨點修復**：
   - 首頁：使用 `#about`, `#services`, `#faq`, `#contact`。
   - 服務頁與知識子頁面：一律使用絕對路徑錨點 `/#about`, `/#services`, `/#faq`, `/#contact`，解決在子頁點擊 FAQ 或關於我們無法跳轉的問題。

### 2.2 麵包屑導覽（Breadcrumb）層次規範化

- **服務子頁面**：
  `首頁 / 服務內容 / [當前服務名稱]`（將「服務項目」統一為與導覽列一致之「服務內容」）。
- **知識專題子頁面**：
  `首頁 / 知識中心 / [專題完整主題名]`
  - 妊娠紋：`首頁 / 知識中心 / 妊娠紋修飾知識`
  - 黑眼圈：`首頁 / 知識中心 / 黑眼圈外觀評估`（由簡短的「黑眼圈」修正為語意完整的專題名）
  - 生長紋：`首頁 / 知識中心 / 肥胖紋與生長紋`
  - 疤痕：`首頁 / 知識中心 / 疤痕外觀修飾`

### 2.3 樣式收斂：清除行內樣式（Inline Styles Removal）

在 `app/globals.css` 擴充標準樣式類，並在所有 TSX 中全面移除 `style={{ ... }}`：

```css
/* --- 新增通用輔助間距與 Callout 堆疊類別 --- */
.knowledge-callout-stack {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 16px;
}

.knowledge-callout-mb {
  margin-bottom: 16px;
}

.knowledge-section-top-space {
  padding-top: 80px;
}

.knowledge-article-notice-wrapper {
  margin-top: 24px;
}
```

- 將 `dark-circles/page.tsx`、`scars-camouflage/page.tsx`、`striae-comparison/page.tsx` 及 `knowledge/page.tsx` 的行內樣式全部替換為 CSS class。

### 2.4 側邊欄（Aside）關聯閱讀對稱性

- 在 4 篇知識專題的側邊欄中，一律包含其餘 **3 篇完整專題**，確保雙向內部連結權重與使用者導流無斷點。
- 統一諮詢準備指引卡片的文案排版風格（兼顧隱私與圖片指引，採用統一的 3 點式步驟結構）。

### 2.5 知識頁底部聯絡區塊（Contact CTA）規格升級

- 將知識中心首頁（`/knowledge`）及 4 篇知識專題（`/knowledge/*`）底部的諮詢區塊，升級為包含 **3 張 QR Code 預約卡片**（`.contact-qr-grid`：LINE 諮詢、Instagram 實例、預約須知），與首頁及服務頁保持視覺重量與 CRO 轉換體驗的一致性。
- 統一全站 Footer Logo 錨點為 `href="/#top"`，避免服務頁使用 `/` 導致未滾動到頂部。

### 2.6 表格無障礙標記規範化

- 確保全站所有知識比對表格之 `.knowledge-table-wrap` 皆具備 `role="region"` 與對應的 `aria-label="[表格主題說明]"`，且具備平滑滾動與手機陰影提示。

---

## 3. 實施步驟與 Worktree 規劃

依據 `AGENTS.md` 規範，建立獨立 Worktree，保留 `main` 預覽 port 1102：

- **Worktree 名稱**：`wt1104-style-alignment`
- **預覽 Port**：`1104`
- **生命週期**：
  1. 建立 worktree 並建立 `node_modules` 與 `.env*` 軟連結。
  2. `app/globals.css` 增修共用樣式類。
  3. `app/page.tsx` 與 `app/services/[slug]/page.tsx` 導覽選單與錨點對齊。
  4. `app/knowledge/page.tsx` 樣式收斂、選單補齊、Contact 區塊升級。
  5. 4 篇知識專題子頁（`stretch-marks`, `dark-circles`, `striae-comparison`, `scars-camouflage`）麵包屑、行內樣式移除、側欄推薦與底部 QR 卡片對齊。
  6. 更新 `tests/rendered-html.test.mjs` 加入全站導覽與麵包屑一致性測試。
  7. 本地驗證：`npm run lint` 與 `npm test`。
  8. 獨立代碼審查：呼叫 `codex-review` 執行雙模型審查，修復任何潛在問題。
  9. 同步更新 Obsidian 筆記（`Projects/mps/06-技術/網站架構與部署.md`）。
  10. 產出完工報告與交付。
