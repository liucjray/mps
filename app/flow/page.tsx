/* eslint-disable @next/next/no-html-link-for-pages -- static HTML links avoid Vinext client-router hydration issues. */
import type { Metadata } from "next";
import { SiteNavigation } from "../site-navigation";
import {
  contactPath,
  darkCirclesKnowledgePath,
  scarsCamouflageKnowledgePath,
  siteName,
  siteServiceArea,
  stretchMarksKnowledgePath,
  striaeKnowledgePath,
} from "../site";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "客戶諮詢決策流程（預覽）",
  description: "新北雙和店瑪菲斯皮膚覆蓋專家客戶決策流程視覺預覽：從安全前提確認、困擾部位分流、私訊準備到評估預約。",
  robots: { index: false, follow: false },
};

export default function DecisionFlowPreviewPage() {
  return (
    <>
      <a className="skip-link" href="#main-content">跳至主要內容</a>
      <SiteNavigation />

      <main id="main-content" className="flow-page">
        <header className="section-shell flow-hero">
          <div className="section-label">DECISION FLOW / 客戶決策流程預覽</div>
          <h1>
            從困擾到預約，
            <br />
            <em>一步步看懂怎麼選。</em>
          </h1>
          <p className="flow-lede">
            這份流程圖依網站現有內容整理，讓訪客一眼看懂「自己適不適合」、「該選哪個方向」以及「聯繫前要準備什麼」；標示虛線框的區塊為目前尚待店家確認的內容。
          </p>
        </header>

        <section className="section-shell flow-canvas" aria-label="客戶決策流程圖">
          {/* Step 1: Safety Gate */}
          <div className="flow-node flow-node-primary">
            <span className="flow-step-tag">STEP 01 · 安全前提確認</span>
            <h2>目前肌膚是否有開放性傷口、紅腫發炎、疼痛或快速變化？</h2>
            <p>雙和店提供非醫療美容外觀美化與肌膚美學討論，先確認不在急性醫療狀態，才進入外觀修飾評估。</p>
          </div>

          <div className="flow-split-branch" aria-hidden="true">
            <div className="flow-stem" />
            <div className="flow-crossbar flow-crossbar-2">
              <span className="flow-drop-arrow">▼</span>
              <span className="flow-drop-arrow">▼</span>
            </div>
          </div>

          <div className="flow-gate-grid">
            <div className="flow-node flow-node-stop">
              <span className="flow-branch-pill flow-branch-warn">是 · 有上述狀況（中止）</span>
              <h3>先諮詢合格專科醫師</h3>
              <p>傷口、發炎、感染、蟹足腫疑慮或皮膚疾病需由醫師診斷處置，不直接進行外觀覆蓋或撫紋。</p>
            </div>

            <div className="flow-node flow-node-pass">
              <span className="flow-branch-pill flow-branch-ok">否 · 已穩定外觀困擾（往下）</span>
              <h3>進入困擾部位分流</h3>
              <p>確認肌膚狀態已穩定後，依最在意的部位與問題，對應下方三個主要了解方向。</p>
            </div>
          </div>

          <div className="flow-split-branch flow-split-from-right" aria-hidden="true">
            <div className="flow-stem-right" />
            <div className="flow-elbow" />
            <div className="flow-arrow-pill">▼ 依最在意的困擾分流</div>
            <div className="flow-stem" />
            <div className="flow-crossbar flow-crossbar-3">
              <span className="flow-drop-arrow">▼</span>
              <span className="flow-drop-arrow">▼</span>
              <span className="flow-drop-arrow">▼</span>
            </div>
          </div>

          {/* Step 2: Service Routing */}
          <div className="flow-branch-grid">
            <article className="flow-branch-card">
              <span className="flow-step-tag">路線 A · 紋路類</span>
              <h3>妊娠紋／肥胖紋／成長紋</h3>
              <p>先看紅紋或白紋差異與形成時間，了解非醫療外觀調和方向。</p>
              <div className="flow-card-target">
                <strong>建議方向：草本撫紋</strong>
                <span>搭配：紋路比較、妊娠紋知識</span>
              </div>
              <div className="flow-card-links">
                <a href="/services/herbal-stretch-care">看草本撫紋 →</a>
                <a href={striaeKnowledgePath}>成長紋與妊娠紋差別 →</a>
                <a href={stretchMarksKnowledgePath}>妊娠紋知識 →</a>
              </div>
            </article>

            <article className="flow-branch-card">
              <span className="flow-step-tag">路線 B · 疤痕與色差</span>
              <h3>成熟白色疤痕／手術痕跡／色澤落差</h3>
              <p>評估局部色澤與周圍原生肌膚的視覺落差，搭配膚色比對。</p>
              <div className="flow-card-target">
                <strong>建議方向：皮膚覆蓋術＋科技測色</strong>
                <span>追求自然社交距離下的色澤協調</span>
              </div>
              <div className="flow-card-links">
                <a href="/services/skin-camouflage">看皮膚覆蓋術 →</a>
                <a href="/services/colour-matching">看科技測色 →</a>
                <a href={scarsCamouflageKnowledgePath}>白色疤痕指南 →</a>
              </div>
            </article>

            <article className="flow-branch-card">
              <span className="flow-step-tag">路線 C · 眼周困擾</span>
              <h3>黑眼圈／淚溝／眼周陰影</h3>
              <p>先區分表面色澤型與立體結構凹陷，不把結構問題當成單純遮瑕。</p>
              <div className="flow-card-target">
                <strong>建議方向：先看局部美學科普</strong>
                <span>確認困擾屬於色澤、陰影或複合型</span>
              </div>
              <div className="flow-card-links">
                <a href={darkCirclesKnowledgePath}>看黑眼圈分類評估 →</a>
                <a href="/services/beauty-education">看局部美學科普 →</a>
              </div>
            </article>
          </div>

          <div className="flow-merge-down" aria-hidden="true">
            <div className="flow-merge-bar" />
            <div className="flow-arrow-pill">▼ 選好方向後，準備聯繫</div>
            <div className="flow-stem-arrow">▼</div>
          </div>

          {/* Step 3: Contact Prep */}
          <div className="flow-node">
            <span className="flow-step-tag">STEP 03 · 聯繫雙和店（LINE / Facebook / 電話）</span>
            <h2>私訊前先整理 3 件事，溝通更有效率</h2>
            <div className="flow-prep-grid">
              <div className="flow-prep-item">
                <b>01</b>
                <strong>在意部位</strong>
                <span>妊娠紋、白色疤痕、眼周或局部色澤位置</span>
              </div>
              <div className="flow-prep-item">
                <b>02</b>
                <strong>狀態時間</strong>
                <span>困擾出現多久，以及目前顏色或質地變化</span>
              </div>
              <div className="flow-prep-item">
                <b>03</b>
                <strong>清楚照片（或文字）</strong>
                <span>自然光無濾鏡近照；不便拍照亦可文字描述</span>
              </div>
            </div>
          </div>

          <div className="flow-straight-down" aria-hidden="true">
            <div className="flow-arrow-pill">▼ 傳送資料後，一對一說明</div>
            <div className="flow-stem-arrow">▼</div>
          </div>

          {/* Step 4: 1-on-1 Assessment */}
          <div className="flow-node">
            <span className="flow-step-tag">STEP 04 · 一對一初步了解與預約決定</span>
            <h2>說明可行方向與限制，再由客戶決定是否預約</h2>
            <p>
              {siteServiceArea}。雙和店為純預約制（有預約才到工作室），會依個別肌膚狀態說明可能方向與注意事項，不先保證固定效果；確認清楚後再預約到店時段。
            </p>
          </div>

          <div className="flow-straight-down" aria-hidden="true">
            <div className="flow-arrow-pill">▼ 決定預約後，到店服務</div>
            <div className="flow-stem-arrow">▼</div>
          </div>

          {/* Step 5: Post-care (Draft / Pending confirmation) */}
          <div className="flow-node flow-node-pending">
            <span className="flow-step-tag">STEP 05 · 到店服務與【術後保養】（待店家確認補齊）</span>
            <h2>這段需要您提供實際做法後才能正式放上網站</h2>
            <ul className="flow-pending-list">
              <li><strong>方案選擇標準</strong>：什麼情況建議「草本撫紋」、什麼情況建議「皮膚覆蓋術」？</li>
              <li><strong>術後保養重點</strong>：做完後幾天內不能碰水、防曬、擦拭或穿著需注意什麼？</li>
              <li><strong>照片與預約規則</strong>：傳照片後多久回覆、照片保存原則、諮詢是否收費與改期規定？</li>
            </ul>
          </div>
        </section>

        <section className="section-shell flow-footer-cta">
          <p>確認好想了解的方向了嗎？</p>
          <div className="flow-footer-actions">
            <a className="button button-primary" href={contactPath}>前往聯絡與預約入口 <span>→</span></a>
            <a className="text-link" href="/">回到首頁 <span>→</span></a>
          </div>
        </section>
      </main>

      <footer className="site-footer section-shell">
        <a className="wordmark" href="/" aria-label={siteName}>
          <span className="wordmark-mark">M</span>
          <span>{siteName}</span>
        </a>
        <span>紋路美化・科技測色・肌膚知識</span>
        <span>© 2026</span>
      </footer>
    </>
  );
}
