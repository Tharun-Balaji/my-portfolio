# Implementation Plan: Kinetic Terminal Redesign

## Task sequence
| # | Task type | Task | Depends on | Files or checks |
| --- | --- | --- | --- | --- |
| 1 | code | Update layout metadata, body state, and global styling foundations | - | `src/layouts/Layout.astro`, `src/index.css` |
| 2 | code | Rebuild navigation, motion shell, hero, and supporting sections to match the new direction | #1 | `src/components/**`, `src/pages/index.astro` |
| 3 | code | Add writing archive section and local console teaser behavior | #2 | `src/components/Writing/Writing.astro`, `src/components/Chatbot/ChatbotTeaser.astro` |
| 4 | code | Expand skill data model and adapt consumers | #2 | `src/data/skills.json`, `src/types/content.ts`, `src/components/skills/Skills.astro` |
| 5 | test | Update Playwright coverage for the redesigned page | #2, #3, #4 | `tests/**` |
| 6 | test | Run validation commands and confirm the branch is review-ready | #1, #2, #3, #4, #5 | `npm run lint`, `npm run type-check`, `npm run build`, `npm run test:e2e` |

## Code tasks
### Task 1
- Goal: Establish the shared dark terminal visual system and typography.
- Files: `src/layouts/Layout.astro`, `src/index.css`
- Commit subject: `feat(shell): replace retro portfolio theme with kinetic terminal system`

### Task 2
- Goal: Rewrite the homepage sections around the new information architecture.
- Files: `src/pages/index.astro`, `src/components/Navbar/Navbar.astro`, `src/components/Hero/Hero.astro`, `src/components/About/About.astro`, `src/components/Projects/*`, `src/components/Experience/Experience.astro`, `src/components/Contact/Contact.astro`
- Commit subject: `feat(home): rebuild portfolio sections around the new narrative flow`

### Task 3
- Goal: Add the missing wireframe-inspired surfaces without introducing backend complexity.
- Files: `src/components/Motion/ScrollEffects.astro`, `src/components/Writing/Writing.astro`, `src/components/Chatbot/ChatbotTeaser.astro`
- Commit subject: `feat(interactions): add loader, archive, and floating console teaser`

### Task 4
- Goal: Turn skills into richer capability groups and keep the content layer aligned.
- Files: `src/data/skills.json`, `src/types/content.ts`, `src/components/skills/Skills.astro`
- Commit subject: `feat(content): model stack capabilities with summaries and tags`

## Validation tasks
### Validation 1
- Covers: Syntax, formatting expectations, and lint-safe scripts
- Commands: `npm run lint`
- Notes: Required because most homepage files changed

### Validation 2
- Covers: Astro diagnostics, data typing, and inline script correctness
- Commands: `npm run type-check`
- Notes: Important after expanding the skill type and adding more DOM scripts

### Validation 3
- Covers: Production build output and asset resolution
- Commands: `npm run build`
- Notes: Confirms static generation still works

### Validation 4
- Covers: Homepage content, nav anchors, safe links, and scroll behavior
- Commands: `npm run test:e2e`
- Notes: Updated to match the new visual shell and content flow

## Definition of done
- [x] Acceptance criteria covered
- [x] Required states implemented
- [x] Required checks identified in Stage 3 are completed
- [x] Manual verification notes captured for review
