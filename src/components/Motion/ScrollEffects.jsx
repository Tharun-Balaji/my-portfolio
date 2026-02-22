import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useState } from "react";

export default function ScrollEffects() {
  const { scrollYProgress } = useScroll();
  const [isTopButtonVisible, setIsTopButtonVisible] = useState(false);
  const progressScale = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    mass: 0.25,
  });

  const orbOneY = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const orbTwoY = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const orbOneRotate = useTransform(scrollYProgress, [0, 1], [0, 20]);
  const orbTwoRotate = useTransform(scrollYProgress, [0, 1], [0, -24]);
  const haloOpacity = useTransform(scrollYProgress, [0, 0.4, 1], [0.15, 0.4, 0.25]);
  const haloScale = useTransform(scrollYProgress, [0, 1], [1, 1.35]);
  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setIsTopButtonVisible(value > 0.12);
  });

  return (
    <>
      <motion.div
        className="fixed left-0 top-0 z-50 h-1 w-full origin-left bg-neon-orange"
        style={{ scaleX: progressScale }}
      />

      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <motion.div
          style={{ opacity: haloOpacity, scale: haloScale }}
          className="absolute left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon-violet/25 blur-3xl"
        />
        <motion.div
          style={{ y: orbOneY, rotate: orbOneRotate }}
          className="absolute left-[-68px] top-[20%] h-40 w-40 rounded-3xl border-2 border-neon-cyan/70 bg-neon-cyan/20 shadow-card blur-[1px]"
        />
        <motion.div
          style={{ y: orbTwoY, rotate: orbTwoRotate }}
          className="absolute right-[-52px] top-[56%] h-32 w-32 rounded-full border-2 border-neon-pink/70 bg-neon-pink/20 shadow-card blur-[1px]"
        />
      </div>

      <AnimatePresence>
        {isTopButtonVisible ? (
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 12, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-5 right-5 z-40 rounded-full border-2 border-neon-yellow bg-neon-orange px-3 py-2 text-xs font-bold uppercase tracking-wider text-neon-ink shadow-retro"
            aria-label="Scroll to top"
          >
            Top
          </motion.button>
        ) : null}
      </AnimatePresence>
    </>
  );
}
