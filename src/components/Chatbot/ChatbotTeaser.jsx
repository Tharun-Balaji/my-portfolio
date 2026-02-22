import { motion } from "framer-motion";

export default function ChatbotTeaser() {
  return (
    <section className="px-4 py-10 sm:px-6 lg:px-10" id="chatbot">
      <div className="mx-auto w-full max-w-6xl rounded-2xl border-2 border-neon-pink bg-neon-ink/90 p-6 shadow-card lg:p-10">
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.65 }}
          transition={{ duration: 0.35 }}
          className="font-display text-2xl uppercase text-neon-pink sm:text-3xl"
        >
          Portfolio Chatbot
        </motion.h2>
        <p className="mt-2 max-w-3xl text-sm text-neon-cream/90 sm:text-base">
          I&apos;m building a portfolio assistant that answers questions about my projects, skills,
          and experience.
        </p>
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.35 }}
          className="mt-6 rounded-xl border-2 border-neon-lime bg-neon-ink p-5"
        >
          <div className="flex flex-wrap items-center gap-3">
            <motion.span
              animate={{ scale: [1, 1.12, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 0.6 }}
              className="inline-flex h-3 w-3 rounded-full bg-neon-lime"
            />
            <p className="text-sm font-bold uppercase tracking-wider text-neon-lime">Coming Soon</p>
          </div>
          <p className="mt-3 text-sm text-neon-cream/95 sm:text-base">
            Planned features: smart Q&A about my profile, project recommendations, and quick
            navigation prompts.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
