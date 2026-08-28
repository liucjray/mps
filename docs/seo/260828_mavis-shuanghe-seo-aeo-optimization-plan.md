# 瑪菲斯雙和店 SEO／AEO 優化執行計畫

建立日期：2026-08-28  
網站：<https://ycaura.com/>  
主要研究頁面：`/knowledge/stretch-marks`、`/services/herbal-stretch-care`  
品牌：瑪菲斯雙和店／新北雙和店｜瑪菲斯皮膚覆蓋專家

## 1. 執行結論

目前網站已經具備不錯的技術 SEO／AEO 基礎：canonical、Open Graph、sitemap、robots.txt、JSON-LD、FAQ、雙和店 NAP 與資料來源都已存在。下一階段不應只增加「妊娠紋」關鍵字或文章長度，而應優先處理：

1. 知識頁與服務頁的搜尋意圖分工。
2. 內容負責人、更新日期、資料來源與服務限制的可見性。
3. 首段直接回答問題，讓搜尋引擎與回答引擎容易擷取。
4. 雙和／中和／新北的在地搜尋與預約轉換。
5. Search Console、GA4 與實際預約事件的成效追蹤。

## 2. 目前頁面分工

### 2.1 知識頁：`/knowledge/stretch-marks`

主要服務的搜尋意圖：

- 妊娠紋是什麼？
- 妊娠紋會自己消失嗎？
- 紅色與白色妊娠紋差異。
- 妊娠霜、妊娠油與保濕的限制。
- 產後妊娠紋與何時應詢問醫療專業人員。

此頁應保持中立衛教與外觀照護定位，不把內容寫成醫療療程銷售頁。

### 2.2 服務頁：`/services/herbal-stretch-care`

主要服務的搜尋意圖：

- 妊娠紋外觀修飾。
- 草本撫紋服務。
- 妊娠紋、肥胖紋、成長紋的個別諮詢。
- 雙和／中和／新北的服務與預約。

此頁應清楚說明服務範圍、評估流程、限制與預約方式，不使用「消除、根治、保證有效」等無法證明或可能造成誤解的表述。

## 3. P0：第一批必做項目

### 3.1 重新整理 Title、H1、Description

知識頁建議：

```text
Title：妊娠紋是什麼？產後變化與保養
Description：了解妊娠紋形成原因、紅白紋差異、產後變化與保濕限制，也認識瑪菲斯雙和店的妊娠紋外觀修飾與諮詢方式。
```

目前網站的 title template 會自動在頁面標題後加上品牌，因此程式中的 page title 不再重複寫品牌。

服務頁建議：

```text
Title：草本撫紋｜妊娠紋外觀修飾
```

Title 必須保持每頁唯一，主關鍵字靠前；Description 應描述真實頁面內容，不把外觀修飾寫成醫療治療。技術 SEO skill 建議 title 約 50–60 個字元、description 約 150–160 個字元，但中文 SERP 會依裝置與像素截斷，因此最後應以搜尋結果實測為準。

### 3.2 在 H1 後加入直接答案

知識頁第一段先放：

> 妊娠紋是皮膚在懷孕或快速伸展後可能形成的線狀紋路。它可能隨時間變淡，但不一定完全消失；保濕可以舒緩乾燥與搔癢，不能保證預防或移除妊娠紋。

服務頁第一段先放：

> 瑪菲斯雙和店的草本撫紋服務以妊娠紋、肥胖紋與成長紋的外觀狀態了解為起點，先討論顏色、紋理、部位與形成時間，再說明適合的外觀美化方向與限制。

之後再展開原因、流程與注意事項。這符合 AEO 對清楚、直接、可獨立擷取答案的要求。

### 3.3 顯示內容負責人與更新資訊

在知識頁與服務頁正文中加入：

- 內容整理者或品牌名稱。
- 實際可證明的職稱／經驗。
- 發布日期。
- 最後更新日期。
- 內容性質與非醫療聲明。
- 服務方與內容方的關係。

若沒有實際醫師參與審閱，不應標示「醫師審閱」或使用 `Physician` Schema。醫療內容必須有真的醫療專業人員審查，不能只靠 JSON-LD 製造權威感。

### 3.4 逐項複核健康與效果宣稱

逐句檢查：

- 懷孕／哺乳期間是否適用。
- 妊娠紋是否會消失。
- 草本、天然、保濕等詞彙是否被暗示成預防或治療效果。
- 案例圖片是否被寫成一般性保證。
- 是否有疼痛、發炎、傷口或快速變化時的就醫提醒。

每一個醫療或健康主張都應有可信來源；無法證明的數字與效果刪除或改為個案差異說明。

## 4. P1：第二批優化項目

### 4.1 建立 AEO 問題區塊

知識頁應以 H2／H3 直接使用使用者問題：

1. 妊娠紋是什麼？
2. 妊娠紋會自己消失嗎？
3. 紅色妊娠紋與白色妊娠紋有什麼不同？
4. 妊娠霜或妊娠油有用嗎？
5. 妊娠紋覆蓋是在做醫療治療嗎？
6. 什麼情況應該先看醫師？

每題的第一句先給結論，再補充解釋。現有 FAQ 已使用 `<details>`，這點符合 AEO 與無障礙方向，後續只需確認鍵盤操作、焦點樣式與 Schema 內容一致。

### 4.2 強化服務頁的轉換資訊

服務頁補齊：

- 適合先諮詢的狀況。
- 諮詢前要準備的資料。
- 服務流程：了解狀態 → 說明方向 → 確認是否安排。
- 不適用或應先尋求醫療意見的狀況。
- Facebook、LINE、Instagram、電話四種聯絡方式。
- 新北市中和區、南勢角站、雙和與雙北服務範圍。

費用只有在有真實且可維護的價格資料時才加入；若價格需現場評估，不要製造看似精準但沒有依據的價格表。

### 4.3 校正 JSON-LD，而不是盲目增加 Schema

目前應保留並驗證：

- `Organization`／適合實際業態的 `LocalBusiness`。
- `WebSite`。
- `WebPage`。
- `Article`（知識頁）。
- `Service`（服務頁）。
- `BreadcrumbList`。
- `FAQPage`。

只加入真實存在且頁面可見的資料，例如地址、電話、社群連結、服務區域與營業時間。瑪菲斯雙和店若不是醫療診所，不應套用 `MedicalClinic`；若沒有醫師，不應套用 `Physician`。結構化資料必須與可見內容一致，也不保證一定觸發 Google 富摘要。

### 4.4 補上在地搜尋訊號

確認以下資料完全一致：

- 官網。
- Google Business Profile。
- Facebook。
- Instagram。
- LINE／預約頁。

需確認名稱、地址、電話、營業時間、服務區域與品牌拼法一致。Google Business Profile 可持續補充真實服務、照片、案例說明、問答與顧客評論，但不可購買或製作虛假評論。

## 5. P2：內容集群

在確認兩個既有頁面分工後，再逐步新增：

- 妊娠紋會自己消失嗎？
- 白色妊娠紋怎麼改善？
- 紅色妊娠紋與白色妊娠紋差在哪？
- 妊娠油、妊娠霜有用嗎？
- 妊娠紋、肥胖紋、成長紋怎麼分辨？
- 妊娠紋外觀修飾前要注意什麼？
- 雙和／中和妊娠紋外觀修飾諮詢。

每一篇文章都應該有獨立搜尋目的、獨立 canonical、作者／更新資訊、資料來源，以及回到知識頁或服務頁的內部連結。不要為了長尾詞製作內容高度重複的頁面。

## 6. 我會修改的程式檔案

第一批實作會集中在：

| 檔案 | 變更內容 |
| --- | --- |
| `app/knowledge/stretch-marks/page.tsx` | Title、Description、首段答案、作者／更新資訊、FAQ 與來源呈現、知識頁 Schema |
| `app/services.ts` | 草本撫紋服務標題、描述、流程、限制、FAQ 與轉換文案 |
| `app/services/[slug]/page.tsx` | 服務頁 Metadata、Schema 關聯與可見信任／聯絡資訊 |
| `app/site.ts` | 品牌、地址、電話、營業時間與服務區域的單一資料來源 |
| `public/llms.txt` | 讓品牌、服務、雙和地區與妊娠紋知識頁資訊一致 |
| `public/sitemap.xml` | 新增頁面後補 URL 與更新日期 |
| `tests/rendered-html.test.mjs` | 驗證 Metadata、JSON-LD、FAQ、NAP、canonical 與關鍵內容 |

## 7. 與 SEO/AEO skill 的對照

| 我前面提出的做法 | Skill 是否支持 | 執行時的修正／限制 |
| --- | --- | --- |
| Title、Description、OG 優化 | 一致 | 每頁唯一；不保證固定字數一定完整顯示 |
| H1 後直接回答 | 一致 | 答案必須真實、簡短、可被正文支持 |
| 問句式 H2/H3、列表、表格、FAQ | 一致 | 不為堆關鍵字而重複問題；FAQ Schema 必須與可見答案一致 |
| 作者、資格、更新日、來源 | 一致 | 只有真的參與者才可標示作者或醫師審閱者 |
| Article、Service、FAQ、Breadcrumb JSON-LD | 一致 | Schema 是語意輔助，不保證排名或富摘要 |
| LocalBusiness／在地 SEO | 一致 | 只使用符合實際業態的類型；不把美容／外觀服務誤標為醫療診所 |
| AI crawler、`llms.txt` | 部分一致 | robots.txt 可表達 crawler 策略；`llms.txt` 可作補充，但不能取代 sitemap、HTML、canonical 或 Search Console |
| 增加長尾文章 | 一致但有條件 | 每頁必須有獨立意圖與實質內容，不能大量複製或只換關鍵字 |
| 案例與圖片 | 一致 | 案例要有真實條件、日期、拍攝差異與同意；不能當作普遍療效證明 |
| 40–80% 等效果數字 | 不應直接採用 | 除非有可核對的研究或自有統計方法，否則移除或改成不保證的個別差異描述 |
| 使用 `MedicalClinic`／`Physician` | 有條件 | 只有實際為醫療機構／醫師且資料可驗證時才使用；瑪菲斯目前應先使用符合實況的品牌與在地服務 Schema |

## 8. 驗證流程

### 開發階段

1. 修改 Metadata、正文與 Schema。
2. 執行 `npm test`。
3. 執行 `npm run lint`。
4. 用 rendered HTML 檢查 canonical、title、description、FAQ、JSON-LD 與 NAP。
5. 用手機與桌面版檢查首屏、FAQ 展開、CTA 與圖片載入。

### 上線後

1. 在 Search Console 使用 URL Inspection 檢查兩個主要頁面。
2. 重新提交 sitemap。
3. 建立查詢群組：`妊娠紋`、`產後妊娠紋`、`妊娠紋改善`、`妊娠紋外觀修飾`、`中和妊娠紋`、`雙和妊娠紋`。
4. 每週觀察曝光、平均排名、CTR、頁面與查詢是否互相競爭。
5. GA4 追蹤 Facebook、LINE、Instagram、電話與 Email 點擊。
6. 以 4–8 週資料決定下一輪內容，而不是只看單日排名。

## 9. 不做的事情

- 不把瑪菲斯雙和店寫成醫療診所或醫師品牌。
- 不複製競品的療效數字、療程宣稱或價格。
- 不用關鍵字堆疊取代真正的問題回答。
- 不製作虛假的評論、案例或作者資格。
- 不只改最後更新日期而沒有實質內容更新。
- 不大量新增互相重複、只差幾個地名的頁面。

## 10. 第一輪交付定義

第一輪完成的標準：

- 知識頁與草本撫紋服務頁有清楚且不重疊的搜尋意圖。
- Title、Description、H1、canonical、OG 與 Schema 一致。
- 首段可以直接回答主要問題。
- 作者／內容負責、更新日期、服務限制與來源可見。
- NAP 與雙和地區訊號一致。
- FAQ 可操作、可讀取，且 Schema 與可見內容一致。
- `npm test` 與 `npm run lint` 通過。
- 上線後有 Search Console 與 GA4 的量測基準。

## 11. 參考原則

- [SEO/AEO skill：技術 SEO、結構化資料、EEAT 與回答引擎最佳實務](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
- [Google：AI features and your website](https://developers.google.com/search/docs/appearance/ai-features)
- [Google：Structured data general guidelines](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)
- [Google：Build and submit a sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
