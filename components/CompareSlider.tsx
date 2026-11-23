"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "./svg/Icon";

type Side = { src: string; alt: string; label: string };

/**
 * Gerçek before/after karşılaştırması: iki görsel aynı kadrajı paylaşır ve
 * "Sonrası" katmanı clip-path ile ortaya çıkar. Görseller aynı kamera ve
 * geometriye sahip olmalıdır (hero kareleri registration [1,0,0] ile hizalıdır).
 */
export function CompareSlider({
  befores,
  after,
  width,
  height,
}: {
  befores: Side[];
  after: Side;
  width: number;
  height: number;
}) {
  const [position, setPosition] = useState(50);
  const [active, setActive] = useState(0);
  const frame = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const touched = useRef(false);
  const before = befores[active];

  const move = useCallback((clientX: number) => {
    const box = frame.current?.getBoundingClientRect();
    if (!box || box.width === 0) return;
    setPosition(Math.min(100, Math.max(0, ((clientX - box.left) / box.width) * 100)));
  }, []);

  // Kısa, tek seferlik tanıtım hareketi: görünür olunca bir kez, kullanıcı dokunmadıysa.
  useEffect(() => {
    const el = frame.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const steps = [50, 42, 58, 50];
        steps.forEach((value, index) => {
          timer = window.setTimeout(() => {
            if (!touched.current) setPosition(value);
          }, 500 + index * 380);
        });
      },
      { threshold: 0.6 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="compare">
      <div
        ref={frame}
        className="compare-frame"
        style={{ aspectRatio: `${width} / ${height}`, ["--pos" as string]: `${position}%` }}
        onPointerDown={(event) => {
          dragging.current = true;
          touched.current = true;
          event.currentTarget.setPointerCapture(event.pointerId);
          move(event.clientX);
        }}
        onPointerMove={(event) => dragging.current && move(event.clientX)}
        onPointerUp={() => (dragging.current = false)}
        onPointerCancel={() => (dragging.current = false)}
      >
        <Image className="compare-after" src={after.src} alt={after.alt} fill sizes="(max-width: 980px) 100vw, 56vw" draggable={false} />
        <Image
          className="compare-before"
          key={before.src}
          src={before.src}
          alt={before.alt}
          fill
          sizes="(max-width: 980px) 100vw, 56vw"
          draggable={false}
        />
        <span className="compare-tag compare-tag-before">Öncesi · {before.label}</span>
        <span className="compare-tag compare-tag-after">Sonrası · {after.label}</span>
        <div
          className="compare-handle"
          role="slider"
          tabIndex={0}
          aria-label="Çizim ile render karşılaştırması"
          aria-orientation="horizontal"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(position)}
          aria-valuetext={`Sonrası görselin ${Math.round(100 - position)}% kadarı görünüyor`}
          onKeyDown={(event) => {
            const step = event.shiftKey ? 10 : 4;
            const keys: Record<string, number> = {
              ArrowLeft: position - step,
              ArrowDown: position - step,
              ArrowRight: position + step,
              ArrowUp: position + step,
              Home: 0,
              End: 100,
            };
            if (!(event.key in keys)) return;
            event.preventDefault();
            touched.current = true;
            setPosition(Math.min(100, Math.max(0, keys[event.key])));
          }}
        >
          <span aria-hidden="true">
            <Icon name="compare" size={22} />
          </span>
        </div>
      </div>
      {befores.length > 1 && (
        <div className="compare-tabs" role="group" aria-label="Öncesi görselini seçin">
          {befores.map((item, index) => (
            <button key={item.src} type="button" aria-pressed={index === active} onClick={() => setActive(index)}>
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
