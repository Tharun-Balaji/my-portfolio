# Layer 4: Technical Specification - Phase 1: Content Restructuring

## Feature: "Impact-First" Hero and Projects

### 1. Technical Architecture
- **Framework:** Astro (Static) for content-heavy sections, React (Hydrated) for interactive cards.
- **Styling:** Tailwind CSS with a primary color palette of #08090E (Base) and #0E1118 (Surface).
- **Typography:** 
    - Display: Syne
    - Body: IBM Plex Sans
    - UI Elements: JetBrains Mono

### 2. Hero Component Structure
- **Hero.astro:** Primary shell.
- **StatusLine.tsx:** React component with a dynamic "Availability" status.
- **ProofStats.astro:** Simple grid-based component for "Impact" metrics.
- **ActionButtons.astro:** High-contrast buttons with custom hover states (Cyan/Lime accents).

### 3. Project Bento Grid
- **Projects.astro:** Container using CSS Grid for the bento layout.
- **ProjectCard.tsx:** Reusable React component for interactive project details.
- **Bento Logic:** One "Flagship" project with a col-span-2 on larger screens.
- **Narrative Data:** Move project content into a structured data format (JSON/Markdown) to follow the "Problem -> Change -> Result" pattern.

### 4. Implementation Steps
1. Create src/components/Hero/NewHero.astro and its supporting sub-components.
2. Develop src/components/Projects/BentoGrid.astro and ProjectCard.tsx.
3. Migrate project data to a new structured format in src/data/projects.json.
4. Test responsive layout behaviors (Grid collapse on mobile).

---
**Status:** Phase 1 Specification complete. Proceed to Build Room.
