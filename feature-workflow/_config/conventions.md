# Conventions

## General

- Follow the repo-level rules in `AGENTS.md`.
- Keep changes focused and avoid unrelated cleanup.
- Default to ASCII text unless the file already uses other characters.

## UI and structure

- Preserve the existing visual language of the site unless the feature explicitly changes it.
- Prefer extending the current section structure over creating disconnected pages.
- Reuse existing section patterns from `src/components/` before creating new top-level systems.
- Keep content easy to scan on both desktop and mobile.

## Astro and component patterns

- Prefer Astro components for mostly static sections.
- Introduce client-side logic only when interaction requires it.
- Keep data definitions in `src/data/` when content is structured or reused.
- Put static assets in `public/assets/` using feature-relevant subfolders.
- Keep integration points explicit in `src/pages/` or section-level imports instead of hidden side effects.

## Naming

- Use descriptive kebab-case for asset folders and feature slugs.
- Use PascalCase for component filenames.
- Use clear, domain-relevant names over generic labels like `Section`, `Widget`, or `Helper`.

## Documentation

- Human edits to workflow output files are authoritative.
- When a stage raises open questions, carry them forward explicitly instead of silently guessing.
- Call out reused components and known constraints directly in the stage outputs.
