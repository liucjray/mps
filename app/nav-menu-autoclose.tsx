"use client";

import { useEffect } from "react";

// 手機選單是原生 <details>：點選同頁錨點、按 Esc 或點選單外都不會自動收合，
// 這裡補上收合行為，其餘維持無 JS 也能展開。
export function NavMenuAutoClose() {
  useEffect(() => {
    const menu = document.querySelector<HTMLDetailsElement>("details.nav-menu");
    if (!menu) return;

    const close = () => { menu.open = false; };
    const handleClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      if (target.closest(".nav-menu-panel a") || !menu.contains(target)) close();
    };
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && menu.open) {
        close();
        menu.querySelector<HTMLElement>("summary")?.focus();
      }
    };

    document.addEventListener("click", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  return null;
}
