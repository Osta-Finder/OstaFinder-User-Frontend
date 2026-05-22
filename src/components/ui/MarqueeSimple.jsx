import { useEffect, useRef, useState } from "react";
import Card from "./MarqueeCard";

export default function MarqueeSimple({
  data = [],
  direction = "right",
  speed = 25,
}) {
  const [items, setItems] = useState(() => [...data, ...data]);
  const posRef = useRef(0);
  const rafRef = useRef(null);
  const containerRef = useRef(null);
  const cardWidthRef = useRef(0);

  useEffect(() => {
    setItems([...data, ...data]);
  }, [data]);

  useEffect(() => {
    const el = containerRef.current?.querySelector(".flex-none");
    if (el) {
      const style = getComputedStyle(el);
      cardWidthRef.current =
        el.offsetWidth +
        parseFloat(style.marginLeft) +
        parseFloat(style.marginRight);
    }

    if (cardWidthRef.current === 0 || data.length === 0) return;

    const setWidth = cardWidthRef.current * data.length;
    const pxPerMs = setWidth / speed / 1000;
    const isRight = direction === "right";
    let lastTime = performance.now();

    if (!isRight) {
      posRef.current = -setWidth;
      containerRef.current.style.transform = `translateX(${posRef.current}px)`;
    }

    const animate = (now) => {
      const dt = now - lastTime;
      lastTime = now;

      posRef.current += pxPerMs * dt * (isRight ? -1 : 1);

      if (isRight && posRef.current <= -setWidth) {
        posRef.current += setWidth;
        setItems((prev) => {
          const next = prev.slice(data.length);
          next.push(...prev.slice(0, data.length));
          return next;
        });
      } else if (!isRight && posRef.current >= 0) {
        posRef.current -= setWidth;
        setItems((prev) => {
          const next = prev.slice(data.length);
          next.push(...prev.slice(0, data.length));
          return next;
        });
      }

      if (containerRef.current) {
        containerRef.current.style.transform = `translateX(${posRef.current}px)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [data, direction, speed]);

  return (
    <div className="relative w-full overflow-hidden">
      <div className="pointer-events-none absolute left-0 top-0 h-full w-24 md:w-32 z-10 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-24 md:w-32 z-10 bg-gradient-to-l from-white to-transparent" />
      <div ref={containerRef} className="flex flex-nowrap" dir="ltr">
        {items.map((item, i) => (
          <Card key={`${item.name}-${i}`} item={item} />
        ))}
      </div>
    </div>
  );
}
