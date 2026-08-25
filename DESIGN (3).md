# DESIGN.md — ProjectMatch

Clean, confident, commerce-style UI. Lavender background, white cards, bold
black type, one yellow accent for the primary action. Nothing else decorative.

## Colors
| Token | Hex | Use |
|---|---|---|
| `--bg` | `#EDE7FB` | Page background |
| `--surface` | `#FFFFFF` | Cards, panels |
| `--surface-2` | `#F7F5FC` | Input backgrounds |
| `--ink` | `#141414` | Primary text |
| `--ink-soft` | `#5B5B5B` | Secondary text |
| `--line` | `#E7E2F5` | Borders |
| `--accent` | `#FFC72C` | Primary button, top-match badge — ONLY these two places |
| `--brand` | `#2E7D32` | Strong match signal |
| `--warn` | `#D6483C` | Errors, weak match |
| `--focus` | `#7B5CF0` | Input focus ring |

## Type
- Display (headlines): `Poppins`, 700, 24-40px
- Body: `Inter`, 400/500, 14-16px
- Labels/tags: `Inter`, 600, 12-13px, uppercase

## Spacing / shape
- Spacing scale: 4/8/12/16/24/32/48/64px
- Radius: 8px inputs/chips, 14px cards, 22px page/hero panels
- Shadow: soft two-layer (`0 2px 6px rgba(20,20,20,.05), 0 12px 28px rgba(20,20,20,.08)`)

## Screens

**Form (`/`)** — centered white card, max-width 560px, floating on lavender bg.
Headline + one-line pitch, then stacked fields (Title, Description, Required
Skills, Team Size, Roles Filled), then a full-width yellow submit button.

**Results (`/results`)** — max-width 900px. Project summary bar at top
(title + skill chips). Below: ranked white cards, one per candidate, stacked.
Each card: score (bold number, top-left) — name, skills, past work — AI
reasoning text below. Top-ranked card gets a yellow left border + "TOP MATCH"
badge; everything else stays visually equal.

## Rules
- Yellow accent appears in exactly two places: submit button, top-match badge.
  Nowhere else.
- Lavender bg + white cards is the entire visual identity — keep that contrast,
  don't add more colors.
- Bold display type for headlines, no thin/light weights.
- No serif fonts. No second accent color. No decorative gradients.
