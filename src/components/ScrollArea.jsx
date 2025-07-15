// ScrollArea.tsx
import { useEffect, useRef } from "react";
export default function ScrollArea({ children, className }) {
  const scrollRef = useRef(null);
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let timeout;
    const handleScroll = () => {
      clearTimeout(timeout);

      el.classList.add("showScollbar");
      timeout = setTimeout(() => {
        el.classList.remove("showScollbar");
      }, 800);
    };
    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div
      ref={scrollRef}
      className={`overflow-y-auto custom-scroll ${className}`}
    >
      {children}
    </div>
  );
}
