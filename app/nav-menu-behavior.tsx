// 原生 <details> 沒有「點擊外部」或 Esc 關閉的行為。
// 以不需 hydration 的行內腳本補上，與 google-analytics.tsx 的設定腳本同一種做法。
const script = `
(function () {
  var open = function () { return document.querySelectorAll("details.nav-menu[open]"); };
  document.addEventListener("click", function (event) {
    open().forEach(function (menu) {
      if (!menu.contains(event.target)) menu.open = false;
    });
  });
  document.addEventListener("keydown", function (event) {
    if (event.key !== "Escape") return;
    open().forEach(function (menu) {
      menu.open = false;
      var summary = menu.querySelector("summary");
      if (summary) summary.focus();
    });
  });
})();
`;

export function NavMenuBehavior() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
