# Design Spec: Kinetic Terminal Redesign

## User journey
1. A visitor lands on a boot-loader driven hero that immediately frames the site as a more cinematic engineering portfolio.
2. The hero introduces Tharun's positioning and offers direct paths to project logs or contact.
3. Supporting sections clarify trajectory, featured builds, stack groupings, work history, and writing direction in a scannable order.
4. The visitor can use sticky navigation, anchor links, and the floating console teaser to move through the page quickly.
5. The contact section closes with clear outreach channels.

## UI surfaces
| Surface | Type | Notes |
| --- | --- | --- |
| Global shell | page frame | Dark terminal-inspired background, loader, progress bar, and scroll-to-top affordance |
| Navigation | sticky header + mobile overlay | Section links, active state, mobile menu |
| Hero | section | Positioning copy, CTA buttons, metrics, portrait dossier |
| System brief | section | Three cards explaining background, work mode, and current direction |
| Project logs | card grid | Curated featured projects with screenshots, tags, and external links |
| Stack DNA | accordion list | Capability groups with summaries and tags |
| History | timeline | Experience entries with impact bullets |
| Research archive | card grid | Medium, GitHub, and current thinking |
| Contact protocol | section | Email, GitHub, LinkedIn, and closing CTA |
| Neural agent | floating panel | Local interactive teaser with canned answers |

## States to handle
| State | What the user sees | Recovery or follow-up |
| --- | --- | --- |
| Loading | Boot log overlay with progress bar | Auto-dismiss once the shell initializes |
| Empty | Not expected for current static data | Future data additions should add fallback copy if collections are empty |
| Error | Not a dedicated UI state for this iteration | Broken links and asset errors are covered by tests |
| Success | All sections render, anchors work, and interactions respond | User can continue scrolling or contact directly |
| Reduced motion | Static reveals and faster initialization | Keep the site readable without animated dependencies |

## Acceptance criteria
- [ ] The home route uses the new kinetic terminal shell and no longer reads like the older retro neon layout.
- [ ] The project section presents curated featured work with working outbound links.
- [ ] Stack, history, and contact sections remain readable and interactive on mobile and desktop.
- [ ] The writing or research area gives the redesign a clearer future-facing content lane.
- [ ] The floating console opens, closes, and responds with relevant local guidance.

## MVP scope
Ship the redesigned homepage shell, rewritten section hierarchy, mobile navigation, scroll behaviors, loader, and updated tests.

## Deferred to later
- Real case-study pages or a multi-route writing system.
- A downloadable resume asset.
- Backend-powered chatbot behavior.

## Open questions for engineering
- How far should future iterations go with motion before it starts to compete with readability?
- Should project curation move into structured data so featured ordering is editable without code changes?
