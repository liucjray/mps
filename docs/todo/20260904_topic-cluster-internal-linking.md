# 紋路科普與草本撫紋主題集群（Topic Cluster）內部連結加固規劃

建立日期：2026-09-04
目標網站：<https://ycaura.com/>
分類：內容 SEO / 內部鏈結結構 (Internal Linking) / 使用者體驗 (UX)

---

## 1. 執行背景與核心效益

### 1.1 現況缺口
站點近期已完成文獻級深度衛教專題：
- `/knowledge/striae-comparison`（肥胖紋、成長紋與妊娠紋之成因機轉與紅白演變差異）

然而，全站核心入口尚未與其建立緊密的情境式內部連結：
1. **首頁信任導覽條 (`trust-strip`)**：`01 妊娠紋` 與 `04 黑眼圈` 為可點擊連結，但 `02 肥胖紋` 目前仍為純文字 `<span>`。
2. **首頁肌膚知識區 (`knowledge-links` & `topic-list`)**：連結清單中缺少專門導向「肥胖紋與生長紋深度比對」的入口；主題標籤中的「肥胖紋」與「成長紋」為無連結的靜態標籤。
3. **草本撫紋服務頁 (`app/services/[slug]/page.tsx`)**：服務第一段即提及「從妊娠紋、肥胖紋與成長紋的顏色開始評估」，但底部延伸閱讀尚未串聯肥胖紋與生長紋科普專題。
4. **妊娠紋知識頁 (`app/knowledge/stretch-marks/page.tsx`)**：在解釋真皮結締組織拉扯與紅白紋理階段時，缺乏向「生長紋與肥胖紋成因差異」的延伸閱讀導引。

### 1.2 預期效益
- **SEO 權重傳遞（PageRank Flow）**：建立首頁、核心服務頁與兩篇紋路知識頁之間的雙向權重流動，強化 Google 與 Bing 對「肥胖紋」、「成長紋」在地與科普意圖的專業權威判定（E-E-A-T）。
- **降低跳出率並增加閱讀深度**：非產後但受生長紋或肥胖紋困擾的客群，在首頁與相關頁面能立即找到精準的科普入口，提升停留時間與諮詢信任感。
- **全站 GA4 追蹤標準化**：新增之內部連結均配置 `data-ga-event="content_navigation"` 與對應 `data-ga-cta-location`，利於追蹤訪客在內容網絡中的導航路徑。

---

## 2. 待辦項目與實作清單

- [x] **2.1 首頁內部連結打通 (`app/page.tsx`)**（已完成於 2026-09-04）
  - 將 `.trust-inner` 中的 `<span><b>02</b> 肥胖紋</span>` 改為 `<a href={striaeKnowledgePath} data-ga-event="content_navigation" data-ga-cta-location="trust_strip"><b>02</b> 肥胖紋</a>`。
  - 在 `.knowledge-links` 新增：`<a className="text-link" href={striaeKnowledgePath} data-ga-event="content_navigation" data-ga-cta-location="knowledge_section">閱讀肥胖紋與生長紋比對 <span aria-hidden="true">↗</span></a>`。
  - 在 `.knowledge-topics .topic-list` 中，將「肥胖紋」與「成長紋」升級為錨點連結，指向 `striaeKnowledgePath`。

- [x] **2.2 草本撫紋服務頁串聯 (`app/services/[slug]/page.tsx`)**（已完成於 2026-09-04）
  - 於服務頁側欄卡片及 `beauty-education` 推薦主題中，加入 `striaeKnowledgePath` 連結。
  - 讓訪客在了解外觀美化前，有完整的成因與限制科普可供對照。

- [x] **2.3 妊娠紋知識頁情境互聯 (`app/knowledge/stretch-marks/page.tsx`)**（已完成於 2026-09-04）
  - 於正文第一章「名詞說明」段落中，自然嵌入語境雙向連結，指引欲了解青春期成長或體重波動紋路之讀者至 `striae-comparison`。

- [x] **2.4 更新自動化測試斷言 (`tests/rendered-html.test.mjs`)**（已完成於 2026-09-04）
  - 驗證首頁 `trust-strip` 包含 `striaeKnowledgePath` 連結且帶有正確 GA4 屬性。
  - 驗證首頁 `knowledge-links` 與主題清單中的肥胖紋連結。
  - 驗證服務頁與妊娠紋頁均正確輸出 `striae-comparison` 內部連結。

---

## 3. 驗收標準

1. **可點擊性與語意結構**：所有新增連結在桌機與行動版皆有足夠觸控範圍，文字連結保持全站無尾斜線的 canonical 格式。
2. **非醫療宣稱與客觀邊界**：連結錨點文字專注於「成因比對」、「生長與體重變化」、「外觀評估」，不使用任何暗示療效之字眼。
3. **代碼檢查與回歸測試**：
   - 通過 `npm run lint`。
   - 通過 `npm test`（9/9 passed）。
   - 通過 `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-TEST123 npm test`。
