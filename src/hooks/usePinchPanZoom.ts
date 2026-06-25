"use client";

import { useCallback, useRef, useState } from "react";

export type PinchPanTransform = {
  scale: number;
  x: number;
  y: number;
};

const MIN_SCALE = 1;
const MAX_SCALE = 3.5;
const ZOOM_THRESHOLD = 1.04;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function distance(t1: { clientX: number; clientY: number }, t2: { clientX: number; clientY: number }) {
  const dx = t1.clientX - t2.clientX;
  const dy = t1.clientY - t2.clientY;
  return Math.hypot(dx, dy);
}

function clampPan(scale: number, x: number, y: number, width: number, height: number) {
  if (scale <= 1) return { x: 0, y: 0 };
  const maxX = ((scale - 1) * width) / 2;
  const maxY = ((scale - 1) * height) / 2;
  return {
    x: clamp(x, -maxX, maxX),
    y: clamp(y, -maxY, maxY),
  };
}

export function usePinchPanZoom() {
  const containerRef = useRef<HTMLDivElement>(null);
  const transformRef = useRef<PinchPanTransform>({ scale: 1, x: 0, y: 0 });
  const pinchRef = useRef<{ distance: number; scale: number } | null>(null);
  const panRef = useRef<{ startX: number; startY: number; originX: number; originY: number } | null>(null);
  const lastTapRef = useRef(0);

  const [transform, setTransform] = useState<PinchPanTransform>({ scale: 1, x: 0, y: 0 });

  const applyTransform = useCallback((next: PinchPanTransform) => {
    const el = containerRef.current;
    const width = el?.clientWidth ?? 0;
    const height = el?.clientHeight ?? 0;
    const scale = clamp(next.scale, MIN_SCALE, MAX_SCALE);
    const pan = clampPan(scale, next.x, next.y, width, height);
    const value = { scale, ...pan };
    transformRef.current = value;
    setTransform(value);
    return value;
  }, []);

  const reset = useCallback(() => {
    applyTransform({ scale: 1, x: 0, y: 0 });
  }, [applyTransform]);

  const isZoomed = transform.scale > ZOOM_THRESHOLD;

  const onTouchStart = useCallback(
    (event: React.TouchEvent) => {
      if (event.touches.length === 2) {
        event.preventDefault();
        pinchRef.current = {
          distance: distance(event.touches[0], event.touches[1]),
          scale: transformRef.current.scale,
        };
        panRef.current = null;
        return;
      }

      if (event.touches.length === 1 && transformRef.current.scale > ZOOM_THRESHOLD) {
        event.preventDefault();
        const touch = event.touches[0];
        panRef.current = {
          startX: touch.clientX,
          startY: touch.clientY,
          originX: transformRef.current.x,
          originY: transformRef.current.y,
        };
      }
    },
    [],
  );

  const onTouchMove = useCallback(
    (event: React.TouchEvent) => {
      if (event.touches.length === 2 && pinchRef.current) {
        event.preventDefault();
        const nextDistance = distance(event.touches[0], event.touches[1]);
        const ratio = nextDistance / pinchRef.current.distance;
        applyTransform({
          scale: pinchRef.current.scale * ratio,
          x: transformRef.current.x,
          y: transformRef.current.y,
        });
        return;
      }

      if (event.touches.length === 1 && panRef.current && transformRef.current.scale > ZOOM_THRESHOLD) {
        event.preventDefault();
        const touch = event.touches[0];
        applyTransform({
          scale: transformRef.current.scale,
          x: panRef.current.originX + (touch.clientX - panRef.current.startX),
          y: panRef.current.originY + (touch.clientY - panRef.current.startY),
        });
      }
    },
    [applyTransform],
  );

  const onTouchEnd = useCallback(
    (event: React.TouchEvent) => {
      if (event.touches.length < 2) pinchRef.current = null;
      if (event.touches.length === 0) panRef.current = null;

      if (transformRef.current.scale < ZOOM_THRESHOLD) {
        applyTransform({ scale: 1, x: 0, y: 0 });
      }

      const now = Date.now();
      if (event.changedTouches.length === 1 && now - lastTapRef.current < 300) {
        reset();
        lastTapRef.current = 0;
        return;
      }
      if (event.changedTouches.length === 1) {
        lastTapRef.current = now;
      }
    },
    [applyTransform, reset],
  );

  return {
    containerRef,
    transform,
    isZoomed,
    reset,
    handlers: {
      onTouchStart,
      onTouchMove,
      onTouchEnd,
    },
  };
}
