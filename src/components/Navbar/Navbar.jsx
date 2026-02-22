import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { assetPath } from "../../utils/assets";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const homePath = import.meta.env.BASE_URL || "/";
  const links = [
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Chatbot", href: "#chatbot" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -14, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.25 }}
      className="sticky top-0 z-40 px-4 pt-4 sm:px-6 lg:px-10"
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between rounded-xl border-2 border-neon-orange bg-neon-ink/95 p-3 shadow-retro backdrop-blur">
        <a
          className="font-display text-sm uppercase tracking-wider text-neon-orange sm:text-base"
          href={homePath}
        >
          Tharun.dev
        </a>
        <ul className="hidden items-center gap-2 md:flex">
          {links.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="rounded-lg border border-neon-cyan/70 px-3 py-2 text-sm font-semibold text-neon-cream transition hover:-translate-y-0.5 hover:bg-neon-cyan hover:text-neon-ink"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <button
          type="button"
          className="inline-flex rounded-lg border border-neon-pink bg-neon-pink/20 p-2 md:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <img
            className="h-6 w-6"
            src={assetPath(menuOpen ? "nav/closeIcon.png" : "nav/menuIcon.png")}
            alt="menu"
          />
        </button>
      </div>
      <AnimatePresence>
        {menuOpen ? (
          <motion.ul
            key="mobile-menu"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.2 }}
            className="mx-auto mt-3 flex w-full max-w-6xl flex-col gap-2 rounded-xl border-2 border-neon-lime bg-neon-ink p-3 shadow-retro md:hidden"
            onClick={() => setMenuOpen(false)}
          >
            {links.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="block rounded-lg border border-neon-cyan/60 px-3 py-2 text-sm font-semibold text-neon-cream"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </motion.ul>
        ) : null}
      </AnimatePresence>
    </motion.nav>
  );
}
