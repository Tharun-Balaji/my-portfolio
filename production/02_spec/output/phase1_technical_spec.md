# Layer 4: Technical Specification - Phase 1: Content Restructuring (Updated)

## Feature: "Impact-First" Hero and Projects (with 3D & GSAP)

### 1. Technical Architecture
- **Framework:** Astro (Static) for content, React (Hydrated) for interactive cards.
- **3D Engine:** **Three.js** for the "Hero Enhancement" (Motion Tier 3).
- **Animation:** **GSAP** for high-precision text reveals and smooth layout transitions (Motion Tier 2).
- **Styling:** Tailwind CSS with #08090E (Base) and #0E1118 (Surface).

### 2. Motion Strategy (Tiered)
- **Tier 1 (Base):** Standard CSS transitions. Zero dependencies.
- **Tier 2 (GSAP):**
    - gsap.from() for headline reveals.
    - ScrollTrigger for bento card entrance animations.
    - Glow drift and hover effects.
- **Tier 3 (Three.js):**
    - ThreeScene.tsx: A lightweight, interactive 3D background or "Proof Card" enhancement.
    - Gated by device capability check to ensure performance.

### 3. Component Updates
- **Hero/Scene3D.tsx:** A React-based Three.js scene wrapper.
- **Animation/Entrance.tsx:** A GSAP-powered utility for standard reveals.
- **Performance:** Use IntersectionObserver to pause Three.js rendering when not in view.

### 4. Implementation Steps
1. **Install dependencies: 
pm install three gsap @types/three.**
2. Setup src/components/Motion/gsap-config.ts for unified animation defaults.
3. Create src/components/Hero/HeroScene.tsx (Three.js).
4. Integrate GSAP reveals into NewHero.astro and BentoGrid.astro.

---
**Status:** Phase 1 Specification updated with 3D/GSAP. Proceed to Build Room.
