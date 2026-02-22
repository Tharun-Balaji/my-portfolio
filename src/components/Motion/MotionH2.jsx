import { motion } from "framer-motion";

export default function MotionH2({ text, className = "" }) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={className}
    >
      {text}
    </motion.h2>
  );
}

MotionH2.propTypes = {
  text: () => null,
  className: () => null,
};
