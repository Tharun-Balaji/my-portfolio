# Architecture Spec: Kinetic Terminal Redesign

## Repo integration points
- `src/layouts/Layout.astro` - updates fonts, metadata, and body loading state
- `src/index.css` - replaces the visual system with shared terminal-style classes and motion rules
- `src/pages/index.astro` - reorders the page flow and adds the writing section
- `src/components/Navbar/Navbar.astro` - sticky nav and mobile menu logic
- `src/components/Motion/ScrollEffects.astro` - boot loader, reveal observer, progress bar, and scroll-to-top behavior
- `src/components/Hero/Hero.astro` - new hero composition and portrait dossier
- `src/components/About/About.astro` - compact system brief cards
- `src/components/Projects/` - featured project curation and updated cards
- `src/components/skills/Skills.astro` - accordion-based stack framing
- `src/components/Experience/Experience.astro` - timeline UI and progress logic
- `src/components/Writing/Writing.astro` - new writing or research archive section
- `src/components/Chatbot/ChatbotTeaser.astro` - floating console teaser
- `src/components/Contact/Contact.astro` - closing CTA and verified channels
- `src/data/skills.json` - richer capability-group data model
- `src/types/content.ts` - updated skill type
- `tests/` - updated Playwright expectations for the redesigned shell

## Component and file plan
| Area | Action | Notes |
| --- | --- | --- |
| `Layout.astro` | extend | Keep Astro shell, swap typography and metadata defaults |
| `index.css` | extend | Centralize the new shared visual language and interaction styling |
| Existing homepage sections | extend | Preserve Astro-first structure while rewriting markup to match the new direction |
| `Writing/Writing.astro` | new | Add a missing content surface from the wireframe direction |
| `skills.json` | extend | Model stack capabilities with summaries and tags rather than icon-only entries |
| Playwright specs | extend | Align tests with new headings, nav behavior, and page title |

## Data or content model
```ts
type Skill = {
  title: string;
  imageSrc: string;
  summary: string;
  tags: string[];
};
```

## State and side effects
| Concern | Location | Notes |
| --- | --- | --- |
| Boot loader visibility | `ScrollEffects.astro` script | Removes `is-loading` on ready and skips repeated boot in session storage |
| Reveal-on-scroll | `ScrollEffects.astro` script | Shared IntersectionObserver for `[data-reveal]` surfaces |
| Scroll progress + top button | `ScrollEffects.astro` script | Uses window scroll position |
| Mobile menu state | `Navbar.astro` script | Toggles overlay and active section styles |
| Timeline progress | `Experience.astro` script | Measures wrapper position to animate the active rail |
| Stack accordion state | `Skills.astro` script | Keeps one details element open at a time |
| Floating console state | `ChatbotTeaser.astro` script | Handles open, close, canned prompt replies, and message rendering |

## Test strategy
| Layer | Required | Why |
| --- | --- | --- |
| Lint | Yes | Scripts and Astro files changed across the homepage |
| Type-check | Yes | Astro inline scripts and updated data types need validation |
| Build | Yes | Full homepage shell and styling changed |
| E2E | Yes | Navigation, scroll behavior, links, and visible content changed |
| Manual verification | Yes | Visual direction is a major part of the change |

## Technical risks
- Large CSS changes could accidentally hide interactive elements or reduce contrast.
- The loader and floating console could introduce usability problems if they block content too aggressively.
- Curating featured projects in component code is acceptable for now, but future edits may want data-level control.
