# Sitemap `lastmod` 維護

`public/sitemap.xml` 維持靜態檔案與既有 URL 格式。妊娠紋知識頁的內容更新日期以 `app/knowledge/stretch-marks/updated-at.mjs` 為單一來源；更新實際內容時，同步更新該日期與 sitemap 中 `/knowledge/stretch-marks` 的 `<lastmod>`。

`tests/rendered-html.test.mjs` 會比對來源日期與 sitemap 日期，並驗證日期不一致時檢查會失敗。不得為了促使重新抓取而更新日期，也不要批次刷新未變更頁面的 `lastmod`。
