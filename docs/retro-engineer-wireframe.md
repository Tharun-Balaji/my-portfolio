# Engineered Dark Homepage Wireframe

## Purpose

This document defines the next homepage wireframe direction for the portfolio redesign.

It is intentionally focused on:

- section hierarchy
- content priorities
- visual tone
- interaction rules
- performance guardrails

This is the reference we should finalize before resuming implementation.

## Direction Summary

The site should move toward a darker, sharper, more cinematic version of the portfolio.

It should feel like:

- a high-end engineer portfolio with product taste
- polished and opinionated
- dark, technical, and bright in the accents
- animated with restraint
- premium on desktop and clear on mobile

It should not feel like:

- a nostalgic pixel-art demo
- a safe SaaS template
- a motion-heavy experiment that weakens the content
- a design exercise that hides proof

## Core Story

The homepage should sell one idea clearly:

`I am an engineer who can shape both the system and the product experience.`

Every section should reinforce that claim from a different angle:

1. Hero: identity and taste
2. Projects: proof
3. About: point of view
4. Experience: outcomes over time
5. Skills: production confidence plus curiosity
6. Writing: technical thinking
7. Contact: availability and responsiveness
8. AI assistant: fast hiring context on demand

## Existing Sections To Preserve

The redesign still needs to accommodate these site areas:

1. Hero
2. About
3. Experience
4. Skills
5. Projects
6. Chatbot / AI assistant
7. Contact

It should also include:

8. Medium RSS / Writing

## Recommended New Order

The homepage should be structured as:

1. Navigation
2. Hero
3. Projects
4. About
5. Experience
6. Skills + Tools Lab
7. Writing from Medium
8. Contact
9. Floating AI assistant

## Visual Language

### Typography

- Display: `Syne`
- Body: `IBM Plex Sans`
- Mono / labels / metadata: `JetBrains Mono`

### Color Direction

- Base background: near-black with blue undertone
- Surfaces: layered charcoal panels
- Primary accent: cyan
- Secondary accent: lime
- Support accent: orange used sparingly

### Shape Language

- rounded but crisp cards
- soft glass only where it helps layering
- no pixel borders
- no arcade UI chrome
- no global scanlines

### Motion Tone

- buttery, not frantic
- reveals should feel intentional and paced
- one strong hero enhancement is enough
- hover states should communicate precision, not playfulness

## Performance Rules

Performance is part of the design story.

- Important content must render without WebGL.
- Heavy animation must be gated behind capability checks.
- Respect `prefers-reduced-motion`.
- Tier the hero experience as:
  1. static poster and text
  2. text reveals and subtle glow motion
  3. enhanced 3D scene for capable devices
- Load 3D only when it will not become the bottleneck.
- Mobile should default to the lighter motion tier unless testing proves otherwise.

## Navigation

### Purpose

Orient quickly and keep contact accessible.

### Labels

- `Work`
- `About`
- `Experience`
- `Skills`
- `Writing`
- CTA: `Let's Talk ->`

### Desktop Wireframe

```text
+--------------------------------------------------------------------------------------+
| Tharun Balaji.         Work  About  Experience  Skills  Writing      [ Let's Talk ] |
+--------------------------------------------------------------------------------------+
```

### Rules

- fixed pill-style container
- centered within page width
- translucent dark shell
- subtle blur
- recruiter-readable labels

## Hero

### Purpose

Create the strongest emotional and strategic first impression on the page.

### Content Requirements

- one status / availability line
- one dominant headline
- one support paragraph
- two clear actions
- three proof stats max
- one portrait
- optional floating proof cards
- optional 3D enhancement behind or around the portrait

### Hero Copy Direction

Status:

`Open to select opportunities - Chennai, IN`

Headline:

`Engineer the interface. Shape the product.`

Support copy:

`I build frontend systems that are fast by design, product-aware, and polished enough to survive real use.`

### Desktop Wireframe

```text
+--------------------------------------------------------------------------------------------------+
| status line                                                                                      |
|                                                                                                  |
| Engineer the                                                                                     |
| interface.                                                                                       |
| Shape the product.                                                                               |
|                                                                                                  |
| support paragraph                                                                                |
|                                                                                                  |
| [ View Work ] [ Read Writing ]                                                                   |
|                                                                                                  |
| [ 12+ systems shipped ] [ 40% avg render gain ] [ 100 lighthouse ]                              |
|                                                                                                  |
|                                                floating proof cards around portrait              |
|                                                portrait anchored to the right                    |
|                                                optional 3D motion layer                          |
+--------------------------------------------------------------------------------------------------+
```

### Mobile Wireframe

```text
+--------------------------------------------------+
| status line                                      |
| Engineer the interface.                          |
| Shape the product.                               |
|                                                  |
| support paragraph                                |
|                                                  |
| [ View Work ]                                    |
| [ Read Writing ]                                 |
|                                                  |
| portrait                                         |
|                                                  |
| stat row / stacked stat chips                    |
+--------------------------------------------------+
```

### Hero Rules

- Portrait is the human anchor.
- 3D supports the atmosphere but never dominates the hierarchy.
- Floating cards must sit in negative space, not on top of key facial detail.
- Use real metrics only.
- Avoid gimmicky labels like `.EXE` in the main hero actions.

## Projects

### Purpose

Show ranked proof immediately after the hero.

### Layout Direction

Use a bento composition:

- one flagship project
- one tall supporting project
- two smaller supporting cards

### Card Content Order

1. preview image
2. visible outcome metric
3. problem statement
4. project title
5. short explanation of what changed
6. tech tags
7. link

### Desktop Wireframe

```text
+--------------------------------------------------------------------------------------------------+
| Selected Work                                                                                    |
| What I've shipped.                                                                               |
| Proof over claims.                                                                               |
|                                                                                                  |
| +---------------------------------------------+ +------------------------------+                 |
| | flagship card                               | | tall supporting card         |                 |
| | image + metric                              | | image + metric               |                 |
| | problem                                     | | problem                      |                 |
| | title                                       | | title                        |                 |
| | desc                                        | | desc                         |                 |
| | tags                                        | | tags                         |                 |
| | link                                        | | link                         |                 |
| +---------------------------------------------+ +------------------------------+                 |
| +------------------------------+ +------------------------------+                                 |
| | supporting card              | | supporting card              |                                 |
| +------------------------------+ +------------------------------+                                 |
+--------------------------------------------------------------------------------------------------+
```

### Rules

- One project must clearly read as the flagship.
- Every project needs one visible outcome number.
- Problem statement should be more memorable than the project title.
- Cards can glow or lift slightly, but all key content stays visible without hover.

## About

### Purpose

Show the thinking behind the work without turning into autobiography.

### Layout Direction

Two columns:

- left: narrative and engineering takes
- right: supporting cards

### Desktop Wireframe

```text
+--------------------------------------------------------------------------------------------------+
| About                                                                                            |
|                                                                                                  |
| +--------------------------------------------+ +-----------------------------------------------+ |
| | short narrative paragraph                  | | Currently obsessing over                      | |
| |                                            | | item                                          | |
| | take                                       | | item                                          | |
| | take                                       | | item                                          | |
| | take                                       | | item                                          | |
| | take                                       | +-----------------------------------------------+ |
| +--------------------------------------------+ | Lighthouse score card                         | |
|                                                +-----------------------------------------------+ |
|                                                | Built with / stack rationale                  | |
|                                                +-----------------------------------------------+ |
+--------------------------------------------------------------------------------------------------+
```

### Rules

- First-person takes should be direct and defensible.
- Cap at 4 takes.
- This section should feel editorial, not theatrical.
- Supporting cards should reinforce credibility rather than repeat the copy.

## Experience

### Purpose

Show progression through outcomes, not task lists.

### Layout Direction

Minimal timeline:

- year
- central line
- role, company, impact

### Wireframe

```text
+--------------------------------------------------------------------------------------------------+
| Experience                                                                                       |
| Where I've worked.                                                                               |
| Outcome-first over role-description first.                                                       |
|                                                                                                  |
| 2024   | Senior Frontend Engineer                                                                |
|        | Company                                                                                 |
|        | short outcome-led summary                                                               |
|        | [ impact chip ]                                                                         |
|                                                                                                  |
| 2022   | Frontend Engineer                                                                       |
|        | Company                                                                                 |
|        | short outcome-led summary                                                               |
|        | [ impact chip ]                                                                         |
+--------------------------------------------------------------------------------------------------+
```

### Rules

- Each role starts with what changed.
- Keep company metadata lightweight.
- No long paragraphs.
- Two to four entries are enough on the homepage.

## Skills + Tools Lab

### Purpose

Show both production trust and exploratory range.

### Layout Direction

Two panels:

- left: work skills
- right: tools lab

### Wireframe

```text
+--------------------------------------------------------------------------------------------------+
| Skills & Lab                                                                                     |
| What I reach for.                                                                                |
|                                                                                                  |
| +--------------------------------------------+ +-----------------------------------------------+ |
| | Work Skills                                | | Tools Lab                                     | |
| | skill row + badge                          | | chip grid                                     | |
| | skill row + badge                          | | chip grid                                     | |
| | skill row + badge                          | | chip grid                                     | |
| | skill row + badge                          | | last shipped with card                        | |
| +--------------------------------------------+ +-----------------------------------------------+ |
+--------------------------------------------------------------------------------------------------+
```

### Rules

- No fake progress bars.
- Badges should be honest: `Expert`, `Proficient`, `Use carefully`, `Exploring`.
- Work panel should feel disciplined.
- Lab panel can feel a bit more playful.

## Writing from Medium

### Purpose

Demonstrate technical judgment in writing, not just in shipped code.

### Layout Direction

- one hero article
- two supporting article cards

### Wireframe

```text
+--------------------------------------------------------------------------------------------------+
| Writing                                                                                          |
| What I think about.                                                                              |
|                                                                                                  |
| +----------------------------------------------------------------------------------------------+ |
| | hero article cover + metadata + title + short TLDR + CTA                                    | |
| +---------------------------------------------+ +----------------------------------------------+ |
| | supporting article                          | | supporting article                           | |
| +---------------------------------------------+ +----------------------------------------------+ |
+--------------------------------------------------------------------------------------------------+
```

### Rules

- Pull live content from Medium RSS when available.
- If RSS fails, show a clean fallback card to the Medium profile.
- Metadata should use mono styling.
- Summaries must stay short and skimmable.

## Contact

### Purpose

Close the page with availability, clarity, and confidence.

### Wireframe

```text
+--------------------------------------------------------------------------------------------------+
| availability line                                                                                |
|                                                                                                  |
| Let's build something                                                                            |
| worth building.                                                                                  |
|                                                                                                  |
| short direct support copy                                                                        |
|                                                                                                  |
| [ large email button ]                                                                           |
| copied-to-clipboard confirmation                                                                 |
|                                                                                                  |
| [ LinkedIn ] [ GitHub ] [ Resume PDF ] [ Medium ]                                                |
+--------------------------------------------------------------------------------------------------+
```

### Rules

- Email is the primary action.
- Copy should be clear and confident.
- Contact section should feel like a destination, not an afterthought.

## Floating AI Assistant

### Purpose

Provide ambient hiring context from anywhere on the page.

### Placement

- fixed bottom-right
- compact floating button
- expands into a panel

### Panel Contents

- short intro
- 4 prompt chips
- input field

### Prompt Set

- `What makes Tharun stand out?`
- `Most complex technical challenge?`
- `Is he available right now?`
- `Best projects to look at?`

### Rules

- response voice should be first person
- useful for recruiters, not gimmicky
- must never block the contact path

## Section Tone Distribution

Not every section should be equally loud.

- Hero: highest emotional intensity
- Projects: crisp and proof-heavy
- About: thoughtful and authored
- Experience: quiet and structured
- Skills: systematic
- Writing: editorial
- Contact: bright and decisive

## Mobile Rules

- stack sections cleanly with no horizontal overflow
- simplify floating card density in the hero
- reduce or disable 3D by default on smaller devices
- preserve clear spacing rhythm
- keep tap targets generous in nav, chat, and contact

## Implementation Guardrails

- mobile-first behavior must stay solid
- important content must render before enhancements
- no critical dependency on heavy animation
- all text must stay recruiter-readable
- visual polish should make the proof stronger, not noisier

## Supporting Artifact

- Design doc: [docs/engineered-dark-design-doc.md](./engineered-dark-design-doc.md)
- Visual reference board: [docs/retro-engineer-reference-board.html](./retro-engineer-reference-board.html)
