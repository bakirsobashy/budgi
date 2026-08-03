import { Box } from "@expo/ui/jetpack-compose";
import { background, fillMaxWidth, height } from "@expo/ui/jetpack-compose/modifiers";
import { useEffect, useState } from "react";

// Animated fill bar that tweens from 0 to `percentage` (0–1+) over ~400ms.
// Capped at 1.0 for width; the caller passes the real color for over-budget.
// Rendered as a sibling below the card content (not inside a button) so it
// gets proper width constraints from the parent Column.
export default function FillBar({
  percentage,
  color,
}: {
  percentage: number;
  color: string;
}) {
  const target = Math.min(Math.max(percentage, 0), 1);
  const [fraction, setFraction] = useState(0);

  useEffect(() => {
    if (target <= 0) {
      const r = requestAnimationFrame(() => setFraction(0));
      return () => cancelAnimationFrame(r);
    }
    const duration = 400;
    const start = Date.now();
    let raf = 0;
    const tick = () => {
      const elapsed = Date.now() - start;
      const t = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setFraction(target * eased);
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setFraction(target);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target]);

  if (fraction <= 0) return null;

  return (
    <Box
      modifiers={[
        fillMaxWidth(fraction),
        height(10),
        background(color),
      ]}
    />
  );
}