# Retro Engineer Homepage Wireframe

## Purpose

This document defines the homepage wireframe for the next portfolio redesign pass.

It is intentionally focused on:

- section hierarchy
- content roles
- interaction priorities
- the retro engineer visual voice
- what must stay grounded in hiring clarity

This wireframe should guide design decisions before we resume implementation.

## Design Intent

The homepage should feel like:

- an engineer's personal operating system
- a portfolio with conviction
- a retro-tech interface with modern product thinking
- expressive, but still recruiter-readable

The homepage should not feel like:

- a generic SaaS landing page
- a nostalgia demo with résumé text pasted into it
- a heavy 3D experiment
- a visual joke that makes the work harder to scan

## Existing Sections To Keep

The current app structure on this branch includes:

1. Hero
2. About
3. Experience
4. Skills
5. Projects
6. Chatbot
7. Contact

The new wireframe should keep all of these, but it should also add:

8. Medium RSS / Writing

## Recommended New Order

To improve proof and flow, the homepage should be reordered as:

1. Navigation
2. Hero
3. Marquee / stack strip
4. Projects
5. About
6. Experience
7. Skills + Tools Lab split
8. Writing from Medium
9. Contact
10. Floating AI assistant available globally

## Core Experience Rules

- Project proof should appear before biography.
- The page should feel scannable in under 20 seconds.
- Only one portrait should be used.
- The hero should own the emotional tone.
- Retro styling should support the story, not overpower it.
- Every section should answer a hiring question.

## Navigation

### Purpose

Create fast orientation and a strong contact path.

### Labels

- `WORK`
- `ABOUT`
- `EXP`
- `SKILLS`
- `BLOG`
- CTA: `HIRE.ME`

### Desktop Wireframe

```text
+--------------------------------------------------------------------------------+
| THARUN.EXE                           WORK ABOUT EXP SKILLS BLOG    [ HIRE.ME ] |
+--------------------------------------------------------------------------------+
```

### Behavior

- fixed to top
- dark translucent shell
- sharp neon border and glow
- no more than 5 text links plus one CTA

## Hero

### Purpose

State identity, capability, and style immediately.

### Content Requirements

- one eyebrow line
- one dominant headline
- one supporting paragraph
- 2 primary actions
- 3 proof metrics max
- one portrait
- optional 3D scene only for capable devices

### Hero Copy Direction

Eyebrow:

`FRONTEND ENGINEER - CHENNAI, IN`

Headline:

`ENGINEER THE INTERFACE. SHAPE THE PRODUCT.`

Support copy:

`Frontend systems built fast by design - product-aware, performance-conscious, and polished enough to survive real use.`

### Desktop Wireframe

```text
+--------------------------------------------------------------------------------------------------+
| EYEBROW: FRONTEND ENGINEER - CHENNAI, IN                                                         |
|                                                                                                  |
| ENGINEER                                                                                         |
| THE INTERFACE.                                                                                   |
| SHAPE THE                                                                                        |
| PRODUCT.                                                                                         |
|                                                                                                  |
| Supporting paragraph                                                                             |
|                                                                                                  |
| [ VIEW_WORK.EXE ]   [ READ_WRITING ]                                                             |
|                                                                                                  |
| [ 30% manual effort cut ] [ $25K saved ] [ 100 lighthouse target ]                              |
|                                                                                                  |
|                                                          portrait frame + optional 3D field      |
+--------------------------------------------------------------------------------------------------+
```

### Mobile Wireframe

```text
+----------------------------------------------+
| EYEBROW                                      |
| ENGINEER THE INTERFACE.                      |
| SHAPE THE PRODUCT.                           |
|                                              |
| short supporting paragraph                   |
|                                              |
| portrait                                     |
|                                              |
| [ VIEW_WORK.EXE ]                            |
| [ READ_WRITING ]                             |
|                                              |
| metric chips                                 |
+----------------------------------------------+
```

### Motion Rules

- grid motion and 3D are enhancement layers
- core text must be readable without motion
- 3D must be disabled on low-power or reduced-motion devices
- the portrait must remain the visual anchor even if 3D is off

## Marquee / Stack Strip

### Purpose

Bridge hero energy into proof with a fast scan of technical range.

### Wireframe

```text
+--------------------------------------------------------------------------------+
| REACT ★ TYPESCRIPT ★ NEXT.JS ★ ASTRO ★ GSAP ★ THREE.JS ★ NODE.JS ★ STORYBOOK |
+--------------------------------------------------------------------------------+
```

### Rule

- purely supportive
- short enough to not feel like filler
- should not replace real skills content lower on the page

## Projects

### Purpose

Projects are the first proof-heavy section and should feel ranked, not equal.

### Layout Direction

Use a bento grid:

- one flagship card
- one tall supporting card
- two smaller supporting cards

### Card Content Order

1. preview image
2. visible metric
3. problem statement
4. project title
5. short outcome description
6. tech tags
7. links

### Desktop Wireframe

```text
+--------------------------------------------------------------------------------------------------+
| 001 - SELECTED WORK                                                                              |
| WHAT_I'VE_SHIPPED.LOG                                                                            |
| > proof over claims. problem first, outcome visible.                                             |
|                                                                                                  |
| +---------------------------------------------+ +------------------------------+                 |
| | flagship card                               | | tall supporting card         |                 |
| | preview + metric                            | | preview + metric             |                 |
| | problem                                     | | problem                      |                 |
| | title                                       | | title                        |                 |
| | desc                                        | | desc                         |                 |
| | tags                                        | | tags                         |                 |
| | links                                       | | links                        |                 |
| +---------------------------------------------+ +------------------------------+                 |
| +------------------------------+ +------------------------------+                                 |
| | supporting card              | | supporting card              |                                 |
| +------------------------------+ +------------------------------+                                 |
+--------------------------------------------------------------------------------------------------+
```

### Wireframe Rule

- the flagship project must be visually dominant
- all cards should show proof, not just titles
- hover may intensify border/glow, but must not hide the important content

## About

### Purpose

Humanize the engineer while reinforcing technical judgment.

### Layout Direction

Two-column split:

- left: terminal-style intro plus strong takes
- right: current obsessions, site proof, stack note

### Desktop Wireframe

```text
+--------------------------------------------------------------------------------------------------+
| 002 - ABOUT.TXT                                                                                  |
| THE_ENGINEER_BEHIND_THE_CODE                                                                     |
|                                                                                                  |
| +--------------------------------------------+ +-----------------------------------------------+ |
| | terminal frame                             | | CURRENTLY_OBSESSING_OVER.LOG                  | |
| | TB:~$ cat about.md                         | | item                                          | |
| | comments                                   | | item                                          | |
| |                                            | | item                                          | |
| | TAKE_01                                    | +-----------------------------------------------+ |
| | TAKE_02                                    | | LIGHTHOUSE SCORE CARD                         | |
| | TAKE_03                                    | +-----------------------------------------------+ |
| | TAKE_04                                    | | STACK_THIS_SITE_RUNS_ON                       | |
| +--------------------------------------------+ +-----------------------------------------------+ |
+--------------------------------------------------------------------------------------------------+
```

### Content Rules

- takes should sound authored, not performative
- 3 to 4 takes max
- "currently obsessing over" should be current and believable
- stack card should explain why the site is built this way

## Experience

### Purpose

Show progression and outcomes, not duties.

### Layout Direction

Vertical timeline:

- year
- central line
- role block

### Wireframe

```text
+--------------------------------------------------------------------------------------------------+
| 003 - EXPERIENCE.JSON                                                                            |
| WHERE_I'VE_WORKED.LOG                                                                            |
| > outcome-first. measured by what changed, not by task lists.                                    |
|                                                                                                  |
| 2024   |  SENIOR FRONTEND ENGINEER                                                               |
|        |  // COMPANY                                                                             |
|        |  short description                                                                      |
|        |  [ outcome chip ]                                                                       |
|                                                                                                  |
| 2022   |  FRONTEND ENGINEER                                                                      |
|        |  // COMPANY                                                                             |
|        |  short description                                                                      |
|        |  [ outcome chip ]                                                                       |
+--------------------------------------------------------------------------------------------------+
```

### Rules

- lead with impact
- keep the line simple and readable
- 2 to 4 timeline entries is enough on homepage

## Skills + Tools Lab

### Purpose

Separate production confidence from exploratory energy.

### Layout Direction

Two columns:

- left: work skills
- right: tools lab / side stack

### Desktop Wireframe

```text
+--------------------------------------------------------------------------------------------------+
| 004 - SKILLS & LAB                                                                               |
| WHAT_I_REACH_FOR.INI                                                                             |
| > left: daily production. right: building for myself.                                            |
|                                                                                                  |
| +--------------------------------------------+ +-----------------------------------------------+ |
| | WORK_SKILLS                                | | TOOLS_LAB                                     | |
| | skill row + badge                          | | chip grid                                     | |
| | skill row + badge                          | | chip grid                                     | |
| | skill row + badge                          | | chip grid                                     | |
| | skill row + badge                          | | LAST_SHIPPED_WITH card                        | |
| +--------------------------------------------+ +-----------------------------------------------+ |
+--------------------------------------------------------------------------------------------------+
```

### Rules

- work side must feel more disciplined
- lab side can be looser and more playful
- do not use fake progress bars
- "careful" or "exploring" labels are acceptable when honest

## Writing from Medium

### Purpose

Show reflective thinking and technical communication.

### Layout Direction

- one large hero article
- two supporting articles

### Wireframe

```text
+--------------------------------------------------------------------------------------------------+
| 005 - WRITING.RSS                                                                                |
| WHAT_I_THINK_ABOUT.MD                                                                            |
| > published on medium - honest, technical, and readable.                                         |
|                                                                                                  |
| +----------------------------------------------------------------------------------------------+ |
| | hero article cover + metadata + title + tldr + link                                         | |
| +---------------------------------------------+ +----------------------------------------------+ |
| | article card                                | | article card                                 | |
| +---------------------------------------------+ +----------------------------------------------+ |
+--------------------------------------------------------------------------------------------------+
```

### Fallback Rule

If the RSS feed fails:

- show one large Medium profile card
- do not show broken placeholders

## Contact

### Purpose

End with clarity and confidence.

### Wireframe

```text
+--------------------------------------------------------------------------------------------------+
| CONTACT background text                                                                          |
|                                                                                                  |
| OPEN TO FULL-TIME ROLES - 2026                                                                   |
| LET'S BUILD SOMETHING                                                                            |
| WORTH_BUILDING.EXE                                                                               |
|                                                                                                  |
| support copy                                                                                     |
|                                                                                                  |
| [ EMAIL ADDRESS / COPY ]                                                                         |
| // COPIED_TO_CLIPBOARD.SUCCESS                                                                   |
|                                                                                                  |
| [ LINKEDIN ] [ GITHUB ] [ MEDIUM ] [ EMAIL ]                                                     |
+--------------------------------------------------------------------------------------------------+
```

### Rules

- email is the hero action
- social links are secondary
- copy should sound direct, not corporate

## Floating AI Assistant

### Purpose

Make the AI guide ambient instead of making it a full page section.

### Placement

- fixed bottom-right
- collapsed as a compact button
- expands to panel with:
  - intro message
  - 4 prompt chips
  - input

### Prompt Set

- `What makes Tharun stand out?`
- `Most complex technical challenge?`
- `Is he available right now?`
- `Best frontend projects to see?`

### Rules

- useful, not gimmicky
- should speak in first person
- should never block contact paths

## Visual System Notes

### Keep

- dark base
- magenta / cyan / yellow retro accents
- sharp pixel display type for labels and key moments
- mono / terminal voice for support language
- one portrait as anchor

### Use Carefully

- scanlines
- glitch effects
- neon glow
- wireframe 3D

### Avoid

- making every section equally loud
- long unreadable all-caps paragraphs
- heavy motion on mobile
- 3D that runs on every device by default

## Implementation Guardrails

- mobile-first behavior must remain solid
- no horizontal overflow from hero, marquee, or floating assistant
- all important content must work without WebGL
- retro language should still be understandable by recruiters
- the page should feel like a product portfolio, not only a visual theme

## Recommended Next Artifact

After this wireframe is approved, create:

- a visual reference board in HTML or Figma style

That board should define:

- spacing rhythm
- exact card proportions
- hero composition
- desktop/mobile states
- color distribution per section
