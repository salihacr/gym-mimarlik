"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import type { Media } from "@/content/model";
import { Icon } from "./svg/Icon";
export function Gallery({ images, title }: { images: Media[]; title: string }) {
  const [index, setIndex] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const image = images[index];
  const move = (n: number) =>
    setIndex((i) => (i + n + images.length) % images.length);
  return (
    <section className="gallery-section">
      <h2>{title}</h2>
      <div className="gallery-grid">
        {images.map((m, i) => (
          <button
            key={m.src + i}
            aria-label={m.alt + " — büyüt"}
            onClick={() => {
              setIndex(i);
              dialog.current?.showModal();
            }}
          >
            <Image
              src={m.src}
              alt={m.alt}
              width={1100}
              height={740}
              sizes="(max-width:760px) 95vw, 48vw"
            />
            <span>
              <Icon name="plus" />
            </span>
          </button>
        ))}
      </div>
      <dialog
        ref={dialog}
        aria-label={title}
        className="lightbox"
        onClick={(e) => {
          if (e.target === dialog.current) dialog.current?.close();
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") move(1);
          if (e.key === "ArrowLeft") move(-1);
        }}
      >
        <button
          className="dialog-close"
          aria-label="Galeriyi kapat"
          onClick={() => dialog.current?.close()}
        >
          <Icon name="close" />
        </button>
        <Image
          src={image.src}
          alt={image.alt}
          width={1400}
          height={920}
          sizes="92vw"
        />
        <div className="lightbox-tools">
          <p aria-live="polite">
            {image.caption || image.alt} · {index + 1}/{images.length}
          </p>
          {images.length > 1 && (
            <>
              <button aria-label="Önceki görsel" onClick={() => move(-1)}>
                <Icon name="left" />
              </button>
              <button aria-label="Sonraki görsel" onClick={() => move(1)}>
                <Icon name="right" />
              </button>
            </>
          )}
        </div>
      </dialog>
    </section>
  );
}
export function Comparison({
  drawing,
  render,
}: {
  drawing: Media;
  render: Media;
}) {
  const [amount, setAmount] = useState(50);
  return (
    <section className="gallery-section" id="karsilastirma">
      <h2>Çizimden üç boyuta.</h2>
      <div className="compare">
        <Image src={render.src} alt={render.alt} fill sizes="90vw" />
        <Image
          src={drawing.src}
          alt={drawing.alt}
          fill
          sizes="90vw"
          style={{ clipPath: "inset(0 " + (100 - amount) + "% 0 0)" }}
        />
        <i style={{ left: amount + "%" }} />
      </div>
      <label className="compare-input">
        Çizimin görünür alanı{" "}
        <input
          type="range"
          min="0"
          max="100"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
        <output>%{amount}</output>
      </label>
    </section>
  );
}
