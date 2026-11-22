"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { frameUrl, heroMotion as scene, stages } from "@/content/hero-motion";
import { createHeroPainter, decodeHeroImage, heroFrameAt } from "@/lib/hero-playback";

const last = stages.length - 1;
const [compact, large] = scene.variants;
const finalSources = scene.variants.map((width) => `${frameUrl(last, width)} ${width}w`).join(", ");
const sizes = "(max-width: 760px) 90vw, (max-width: 880px) 45vw, (max-width: 1780px) 53vw, 940px";

export function HeroArchitectureAnimation() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const posterRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const element = sceneRef.current!;
    const canvas = canvasRef.current!;
    const poster = posterRef.current!;
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    }).connection;
    const limited = connection?.saveData || ["slow-2g", "2g"].includes(connection?.effectiveType ?? "");
    let inView = false, disposed = false, failed = false, loading = false;
    let paint: ReturnType<typeof createHeroPainter> | undefined;
    let elapsed = 0, started: number | undefined, lastPaint = -Infinity;
    let raf = 0, timer = 0;
    let sourceWidth = large;
    const targetWidth = () => Math.min(large, Math.ceil(element.clientWidth * Math.min(devicePixelRatio, 2)));

    function stop() {
      if (started !== undefined) elapsed += performance.now() - started;
      started = undefined;
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    }

    function draw(now: number) {
      if (started === undefined || !paint) return;
      const time = elapsed + Math.max(0, now - started);
      const frame = heroFrameAt(time);
      const fps = element.clientWidth < 500 ? scene.mobileFps : scene.fps;
      if (now - lastPaint >= 1000 / fps - 1 || frame.wait > 0) {
        paint(frame);
        canvas.hidden = false;
        poster.style.visibility = "hidden";
        lastPaint = now;
      }
      if (frame.wait > 0) timer = window.setTimeout(() => { raf = requestAnimationFrame(draw); }, frame.wait);
      else raf = requestAnimationFrame(draw);
    }

    function resize() {
      const width = Math.min(sourceWidth, targetWidth());
      const height = Math.round(width * scene.height / scene.width);
      if (canvas.width === width && canvas.height === height) return;
      canvas.width = width;
      canvas.height = height;
      if (paint && !canvas.hidden) paint(heroFrameAt(elapsed + (started === undefined ? 0 : performance.now() - started)));
    }

    async function prepare() {
      loading = true;
      sourceWidth = targetWidth() <= compact || element.clientWidth <= 480 ? compact : large;
      try {
        const [frames, atlas] = await Promise.all([
          Promise.all(stages.map((_, index) => decodeHeroImage(frameUrl(index, sourceWidth)))),
          decodeHeroImage("/hero/reveal.png"),
        ]);
        if (disposed) return;
        paint = createHeroPainter(canvas, frames, atlas);
        resize();
      } catch {
        failed = true;
      }
      if (!disposed) sync();
    }

    function sync() {
      if (motion.matches || limited || failed) {
        stop();
        canvas.hidden = true;
        poster.style.visibility = "";
        // The picture source handles reduced motion even before hydration.
        poster.src = motion.matches ? "/hero/opening.webp" : frameUrl(last, compact);
        return;
      }
      poster.src = "/hero/opening.webp";
      if (!inView || document.hidden) {
        stop();
        return;
      }
      if (!paint) {
        if (!loading) void prepare();
      } else if (started === undefined) {
        started = performance.now();
        lastPaint = -Infinity;
        raf = requestAnimationFrame(draw);
      }
    }

    const visibility = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      sync();
    });
    const sizing = new ResizeObserver(resize);
    visibility.observe(element);
    sizing.observe(element);
    document.addEventListener("visibilitychange", sync);
    motion.addEventListener("change", sync);
    sync();
    return () => {
      disposed = true;
      stop();
      visibility.disconnect();
      sizing.disconnect();
      document.removeEventListener("visibilitychange", sync);
      motion.removeEventListener("change", sync);
    };
  }, []);

  return (
    <div className="hero-sequence" ref={sceneRef} role="img"
      aria-label="Kavramsal bir mimari çalışmanın müşteri karakaleminden beyaz modele ve ışıklandırılmış son görsele dönüşümü.">
      <picture>
        <source media="(prefers-reduced-motion: reduce), (scripting: none)" srcSet={finalSources} sizes={sizes} />
        <Image ref={posterRef} src="/hero/opening.webp" width={scene.width} height={scene.height}
          alt="" unoptimized loading="eager" fetchPriority="high" />
      </picture>
      <canvas ref={canvasRef} aria-hidden="true" hidden />
    </div>
  );
}
