import { useEffect, useState } from "react";

const TypewriterKeywords = ({ items, speed = 2000 }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, speed);
    return () => clearInterval(interval);
  }, [items, speed]);

  return (
    <span className="inline-flex min-w-[180px] animate-pulse items-center justify-center rounded-full border border-neon.pink/40 bg-neon.pink/10 px-4 py-1 font-mono text-sm text-neon.pink">
      {items[index]}
    </span>
  );
};

export default TypewriterKeywords;

