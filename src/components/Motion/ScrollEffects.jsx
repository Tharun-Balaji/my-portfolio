import { motion, useScroll, useSpring, useTransform } from "framer-motion";

export default function ScrollEffects() {
  const { scrollYProgress } = useScroll();
  const progressScale = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    mass: 0.25,
  });

  const orbOneY = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const orbTwoY = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const orbOneRotate = useTransform(scrollYProgress, [0, 1], [0, 20]);
  const orbTwoRotate = useTransform(scrollYProgress, [0, 1], [0, -24]);

  return (
    <>
      <motion.div
        className="fixed left-0 top-0 z-50 h-1 w-full origin-left bg-neon-orange"
        style={{ scaleX: progressScale }}
      />

      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <motion.div
          style={{ y: orbOneY, rotate: orbOneRotate }}
          className="absolute left-[-68px] top-[20%] h-40 w-40 rounded-3xl border-2 border-neon-cyan/70 bg-neon-cyan/20 shadow-card blur-[1px]"
        />
        <motion.div
          style={{ y: orbTwoY, rotate: orbTwoRotate }}
          className="absolute right-[-52px] top-[56%] h-32 w-32 rounded-full border-2 border-neon-pink/70 bg-neon-pink/20 shadow-card blur-[1px]"
        />
      </div>
    </>
  );
}
