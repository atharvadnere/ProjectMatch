# DESIGN.md

## Project

**ProjectMatch**

---

# 1. Purpose

This document defines complete visual design direction. Authoritative for
Visual Design, UI Design, Layout, Typography, Color.
Functionality is defined in `MASTER.md`, not here.

---

# 2. Core Vision

Bold, flat, confident — like a product landing page, not a form wizard.
Thick black outlines, punchy flat color blocks, big bold type. Playful but
sharp, never soft or corporate.

Reference vibe: Gumroad's bold pink/black landing blocks, Prism's
lavender-and-yellow product card, 90s-retro flat poster energy — minus the
literal retro decoration, keep the confidence and contrast.

---

# 3. Emotional Goals

| Priority | Emotion    |
| -------- | ---------- |
| 1        | Confidence |
| 2        | Clarity    |
| 3        | Playfulness|

Progression: **Bold → Clear → Trustworthy.**

---

# 4. Design Principles

## P1 — Flat & Outlined, Never Soft
Black outlines on cards and buttons. No soft drop shadows pretending to be
depth — use a hard offset shadow or none at all.

## P2 — One Background, One Card, One Accent
Lavender background, white cards, black outlines, yellow accent. That's the
whole palette. Nothing else decorative.

## P3 — Type Does the Talking
Big, bold, black headlines carry the personality. Not icons, not
illustration, not color noise.

## P4 — Accent Means Something
Yellow only marks the primary action or the top match. Never a background,
never decoration.

---

# 4.1 Must Not Feel Like
SaaS dashboard, soft pastel corporate site, generic Bootstrap form, AI-chat
output in a card.

---

# 5. Color System

```yaml
bg:         "#EDE7FB"   # page background, lavender
surface:    "#FFFFFF"   # cards, panels
ink:        "#141414"   # primary text, borders
ink-soft:   "#5B5B5B"   # secondary text
line:       "#141414"   # borders are BLACK, not gray — this is the outline system

accent:     "#FFC72C"   # primary button + top-match badge ONLY
brand:      "#2E7D32"   # strong match signal (optional use)
warn:       "#D6483C"   # errors, weak match
focus:      "#7B5CF0"   # input focus ring
```

### Color Rules
* Borders are solid black (`ink`), 2px, not soft gray hairlines
* `accent` yellow appears in exactly two places: submit button, top-match
  badge. Nowhere else.
* Background stays lavender, cards stay white — non-negotiable contrast

---

# 6. Typography

| Role | Family | Weight / Size |
|---|---|---|
| Display (headlines) | Poppins | 700–800, 28–44px |
| Body | Inter | 400/500, 14–16px |
| Labels / tags | Inter | 600, 12–13px, uppercase |

## Rules
* Headlines always bold/extrabold — this is where the personality lives
* No serif, no thin weights, no script fonts

---

# 7. Shape & Shadow

```ts
radius: {
  sm: 8,    // inputs, chips, buttons
  md: 12,   // cards
}

border: "2px solid #141414"   // black outline on cards + buttons

shadow: "4px 4px 0 #141414"   // hard offset shadow, NOT soft/blurred
```

Buttons and cards use the hard offset shadow (flat design), not soft blur —
this is what gives the Gumroad/poster confidence instead of a SaaS feel.

---

# 8. Layout

## Form Screen (`/`)
* Centered white card, max-width 560px, black 2px border, hard offset shadow
* Bold headline + one-line pitch
* Stacked fields, black-outlined inputs
* Full-width yellow submit button, black border, hard shadow, bold black text

## Results Screen (`/results`)
* Max-width 900px
* Project summary bar: title + required-skill chips (black-outlined pills)
* Ranked white cards, black 2px border, hard offset shadow, stacked
* Top-ranked card: yellow fill on badge only, thicker black border (3px)
* All other cards visually equal

## Card Layout
```text
[ score | name, skills, past work ]
[       | reasoning (if present)  ]
```

---

# 9. Component Rules
* Every card and button: black 2px border + hard offset shadow, no exceptions
* No soft/blurred shadows anywhere
* No gradients anywhere
* No values outside this file — no invented colors, fonts, or radii

---

# 10. Acceptance Criteria

Success:
> "This looks like a bold, confident real product — not a form."

Failure looks like:
* Soft pastel SaaS card with blurred shadow
* Gray hairline borders instead of black outlines
* Default unstyled form
