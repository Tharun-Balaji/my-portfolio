# Engineered Dark Design Doc

## Goal

Redesign the portfolio into a polished, dark, story-led homepage that feels unmistakably engineered.

This design should:

- sell Tharun as an engineer with product taste
- preserve the existing site sections
- add Medium RSS in a way that feels intentional
- use motion and 3D selectively, never as the core value
- stay fast, responsive, and recruiter-readable

## Design Thesis

The portfolio should feel like a premium engineering product, not a themed portfolio experiment.

The strongest impression should be:

`This person cares about systems, craft, and performance at the same time.`

## Audience Priorities

### Hiring managers

Need to understand quickly:

- what Tharun does
- what outcomes he has shipped
- what level of product taste he has
- whether he is available

### Engineers and founders

Need to see:

- technical credibility
- clear opinions
- performance awareness
- stack judgment

## Visual Direction

### Tone

- dark
- premium
- technical
- calm but high-conviction

### Typography

- `Syne` for display headlines
- `IBM Plex Sans` for body copy
- `JetBrains Mono` for metadata, labels, and UI system cues

### Palette

- base: `#08090E`
- surface layers: `#0E1118`, `#131723`, `#1A2030`
- primary accent: cyan
- secondary accent: lime
- limited support accent: orange

### Shape Language

- rounded modern cards
- soft layered panels
- subtle glass where useful
- no pixel UI treatment
- no global scanline styling

## Content Strategy

### Hero

The hero must communicate:

- identity
- level of polish
- proof
- availability

It should include:

- one status line
- one dominant headline
- one supporting paragraph
- two actions
- three proof stats
- one portrait
- optional floating proof cards

### Projects

Projects should lead with:

1. problem
2. change made
3. measurable result

The section should use a ranked bento layout so one project clearly acts as the flagship.

### About

About should establish point of view, not just biography.

It should include:

- a short authored narrative
- three to four real engineering takes
- current obsessions
- performance / stack credibility

### Experience

Experience should be concise and outcome-led.

Each role should start with what changed, not what responsibilities existed.

### Skills + Lab

This split remains a strong differentiator and should stay.

- left side: trusted production skills
- right side: tools lab and side-project curiosity

### Writing

Medium content should feel integrated into the design system, not pasted in.

- one hero article
- two secondary cards
- clean fallback if RSS fails

### Contact

Contact should feel like the final conversion point.

- clear availability
- large email action
- quick social / resume links
- confidence without fluff

## Motion Strategy

Motion should support clarity and premium feel, not novelty.

### Tier 1

- static hero composition
- readable without effects

### Tier 2

- text reveals
- glow drift
- subtle hover polish

### Tier 3

- optional 3D hero enhancement
- loaded only for capable devices

## Performance Strategy

- no critical content depends on WebGL
- respect `prefers-reduced-motion`
- gate heavy animation behind capability checks
- mobile should prefer the lighter motion tier
- portrait and text hierarchy must remain intact even when motion is disabled

## Responsive Rules

- mobile-first layout behavior
- no horizontal overflow
- reduce floating card density on smaller screens
- simplify hero enhancement load on phones and lower-end devices
- preserve strong hierarchy, not identical desktop composition

## Deliverables In Repo

- Wireframe: [docs/retro-engineer-wireframe.md](./retro-engineer-wireframe.md)
- Visual reference board: [docs/retro-engineer-reference-board.html](./retro-engineer-reference-board.html)

## Implementation Notes

When implementation starts, prioritize:

1. content hierarchy first
2. responsive layout second
3. motion polish third
4. 3D enhancement last

The redesign only succeeds if the site still feels excellent when the heavy effects are disabled.
