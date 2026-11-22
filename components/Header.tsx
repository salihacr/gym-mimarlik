"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navigation } from "@/content/studio";
import { BrandMark, Icon } from "./Graphics";

export function Brand() {
  return (
    <Link
      href="/"
      className="brand"
      aria-label="GYM MİMARLIK &amp; 3D STUDIO, ana sayfa"
    >
      <BrandMark />
      <span>
        <strong>GYM MİMARLIK</strong>
        <small>&amp; 3D STUDIO</small>
      </span>
    </Link>
  );
}
export function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!open) return;
    function close(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        button.current?.focus();
      }
    }
    function outside(e: PointerEvent) {
      if (!header.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("keydown", close);
    document.addEventListener("pointerdown", outside);
    return () => {
      document.removeEventListener("keydown", close);
      document.removeEventListener("pointerdown", outside);
    };
  }, [open]);
  return (
    <header
      className="header"
      ref={header}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setOpen(false);
      }}
    >
      <div className="wrap header-inner">
        <Brand />
        <button
          ref={button}
          type="button"
          className="mobile-toggle"
          aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
          aria-expanded={open}
          aria-controls="main-nav"
          onClick={() => setOpen(!open)}
        >
          <Icon name={open ? "close" : "menu"} />
        </button>
        <nav
          id="main-nav"
          className={open ? "nav open" : "nav"}
          aria-label="Ana gezinme"
        >
          {navigation.map(([href, label]) => (
            <Link
              key={href}
              href={href}
              aria-current={
                path === href || (href !== "/" && path.startsWith(href + "/"))
                  ? "page"
                  : undefined
              }
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
        </nav>
        <Link className="header-cta" href="/iletisim">
          Projenizi Konuşalım <Icon name="diagonal" size={16} />
        </Link>
      </div>
    </header>
  );
}
