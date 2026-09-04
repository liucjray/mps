export function ContactConsultationGuide() {
  return (
    <div className="contact-guide" aria-label="預約諮詢 3 步驟指南">
      <div className="contact-guide-badge">私訊前可先整理 3 件事</div>
      <ol className="contact-guide-steps">
        <li>
          <strong>01 在意部位</strong>
          <span>在意的紋路、眼周、局部疤痕或膚色落差位置</span>
        </li>
        <li>
          <strong>02 狀態時間</strong>
          <span>困擾出現時間長短，以及局部的色澤、陰影或外觀質地變化</span>
        </li>
        <li>
          <strong>03 清楚照片</strong>
          <span>若方便，可提供自然光下無濾鏡近照；亦可先以文字描述狀況</span>
        </li>
      </ol>
      <p className="contact-guide-hint">若不便提供照片，直接以文字說明外觀困擾與想了解的方向亦可。</p>
    </div>
  );
}
