import { useEffect, useRef, type ReactNode, type ElementType, type CSSProperties } from "react";

interface FadeUpProps {
  as?: ElementType;
  delay?: number;
  /** ms entre a entrada de cada filho direto */
  stagger?: number;
  className?: string;
  children: ReactNode;
  style?: CSSProperties;
  [key: string]: unknown;
}

export function FadeUp({ as: Tag = "div", delay = 0, stagger = 0, className = "", children, style, ...rest }: FadeUpProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add("is-visible");
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const cls = stagger > 0 ? `reveal-stagger ${className}` : `reveal ${className}`;
  const mergedStyle: CSSProperties =
    stagger > 0
      ? ({ "--stagger": `${stagger}ms`, "--stagger-delay": `${delay}ms`, ...style } as CSSProperties)
      : { transitionDelay: `${delay}ms`, ...style };

  return (
    <Tag ref={ref as never} className={cls} style={mergedStyle} {...rest}>
      {children}
    </Tag>
  );
}
