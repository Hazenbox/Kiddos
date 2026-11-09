# Kiddos A–Z Visual Reference Library: Curation Guideline

This document defines how images are chosen for the Kiddos alphabet library. It is the standard every reference must meet, the reason a reference is accepted or rejected, and the checklist to run before adding anything new.

Companion files in this folder:

| File | Purpose |
| --- | --- |
| `library.json` | Source of truth. One record per reference (104 total), including `ai_check` and `resolution.native_square`. |
| `library.csv` | Same data, flat, for spreadsheets. Generated from `library.json`. |
| `assets/<Letter>/` | Local copy of every curated image, named `<ID>-<word>.jpg`. |
| `index.html` | Visual preview of the whole library, grouped by letter and role. Open it in a browser. |

---

## 1. What the A–F foundation tells us

The 24 references supplied for A–F were analysed one by one. They are the benchmark. Everything below is derived from what they have in common, not from personal taste.

### 1.1 Observed patterns

| Dimension | What A–F does | Evidence |
| --- | --- | --- |
| **Format** | Always square (1:1). Source sizes 640–1200 px, most around 1000 px. | 23 of 24 exactly square; Cake is 1200×1098. |
| **Rendering** | Photorealistic. A few polished 3D renders that read as real objects. No flat vector, no cartoon, no watercolour. | Photoreal: 21. 3D render: Astronaut, Drum, Earth. |
| **Subject count** | One subject, one idea. Groups only when the word implies a group (a bunch of bananas, eggs on a plate). | 24 of 24. |
| **Framing** | Subject centred, whole subject visible, fills roughly 55–80% of the frame. Nothing important cropped. | Every animal is shown full-body, or full head and body. |
| **Pose / angle** | Front or three-quarter view. Animals usually look at the camera. Objects at a slight hero angle. | Dog, Cat, Fox, Bear: eye contact. Car, Ball, Drum: three-quarter. |
| **Background** | Two modes. **Studio:** clean white or very light grey with a soft grounding shadow. **Habitat:** the subject's natural setting, softly blurred, never busy. | Studio: 15 (≈62%). Habitat: 9 (≈38%): Airplane, Cloud, Duck, Dolphin, Elephant, Eagle, Fish, Frog, Fox. |
| **Colour** | Natural, saturated, high clarity. One dominant hue per image. Bright and even exposure; no moody grading, no heavy filters. | Red apple, orange basketball, yellow banana, pink rose, orange fox. |
| **Mood** | Friendly, calm and real. Nothing frightening (no bared teeth, no predators attacking). | Even the eagle and fox are calm and posed. |
| **Category mix per letter** | Each letter mixes categories (animal + food + object + nature) rather than four of the same kind. | A: food, insect, vehicle, person. C: animal, vehicle, food, nature. |

### 1.2 Issues found in A–F (kept, but flagged)

These are accepted as the foundation but are noted so the same issues are not repeated in G–Z:

- **A-03 Airplane:** shows Emirates airline livery and logo. Brand marks should be avoided in new picks.
- **C-02 Car:** a recognisable Ferrari with a visible badge. Same concern.
- **F-01 Fish:** carries a small "JIGSAW" watermark in the bottom-right corner. Watermarks are a rejection reason for new picks; this one should be replaced or cropped if it is ever shipped.
- **Suspected AI-generated (9):** A-04 Astronaut, B-01 Bear, C-03 Cake, D-02 Duck, D-03 Dolphin, D-04 Drum, E-04 Earth, F-01 Fish and F-02 Frog. These show render-like tells such as over-smooth fur and skin, merged anatomy, or a too-perfect background. Each is marked `ai_check: ai-generated-suspected` and `rights.status: replace-before-release` in `library.json`. This is a visual judgement, not proof.
- **Aspect:** 23 of the 24 are natively square. C-03 Cake (1200×1098) is padded to square.

### 1.2a Owner direction (2026-11-09)

After the first pass, the owner set two rules that override the A–F style where they conflict:

1. **Real photography first.** Use photographs of real subjects. Do not use AI-generated or AI-modified images, 3D renders or composites unless no real photo can work (for example, a fantasy subject like Unicorn is shown as a real soft toy instead).
2. **1:1 first.** Prefer images that are already square, so nothing is cropped or padded. A non-square source is used only when no square real photo is good enough, and the record notes it.

Because real photographs are rarely shot on pure white, these rules take priority over the background mix in section 2.4.

### 1.3 How the A–F roles were assigned

The four A–F images per letter were mapped to roles after the fact: the most canonical studio shot is Primary, a different category is Alternative, the most atmospheric is Exploration, and the most unusual angle or subject is Distinctive. B has no habitat image, so its Exploration slot (Banana) is a studio still life.

### 1.4 Library at a glance (all 104)

| | Count |
| --- | --- |
| Style | studio-photo 51 · habitat-photo 31 · scene-photo 19 · 3d-render 3 (all in A–F) |
| Category | see `library.csv` |
| AI check | G–Z: 75 likely-real, 5 uncertain. A–F: 9 suspected AI, 15 not assessed as suspect |
| Native 1:1 source | G–Z: 68 of 80 within 5% of square. A–F: 23 of 24 |
| Smallest side | 600 px (every reference is stored as a 1:1 square) |

### 1.5 Known exceptions to the role rules

Rule 2 in section 2.4 caps each letter at two non-white backgrounds, and rule 3 asks for at least three categories. These letters break those rules on purpose and are recorded here so nobody "fixes" them by accident:

- **D, F (foundation):** only two categories each (animal-heavy), and F has three habitat shots. Kept as supplied.
- **I, J, K, O, T, X:** three or four non-white backgrounds. This is the direct result of the real-photo rule: on Pinterest, white-background versions of these subjects (jaguar, koala, tiger, octopus and so on) were almost all AI renders, while the real photographs are wildlife or scene shots.
- **K:** two categories only (animal and object). King is shown as a chess piece, because every "king" person candidate was AI-made or a celebrity likeness.

---

## 2. Visual taxonomy

A reference belongs in this library when it can be described by the attributes below. The `library.json` fields use exactly these values.

### 2.1 Category (`category`)

| Value | Covers | Examples |
| --- | --- | --- |
| `animal` | Mammals, birds, reptiles, sea life, insects | Bear, Owl, Jellyfish |
| `food` | Fruit, vegetables, dishes, drinks | Apple, Pizza, Juice |
| `object` | Toys, tools, household items, clothing, instruments | Ball, Lamp, Violin |
| `vehicle` | Anything that moves people or things | Car, Train, Yacht |
| `nature` | Landscapes, weather, sky and space, plants, minerals | Cloud, Rainbow, Quartz |
| `place` | Buildings and places | House, Igloo, Zoo |
| `person` | People defined by role or action | Astronaut, Nurse, King |
| `concept` | Actions, colours, events, things that are not one physical object | Jump, Yellow, X-Mas |

### 2.2 Visual style (`style`)

| Value | Definition |
| --- | --- |
| `studio-photo` | Photoreal subject on white or very light neutral background. The house default. |
| `habitat-photo` | Photoreal subject in its natural setting, background softly out of focus. |
| `3d-render` | High-end 3D render that reads as a real object (Astronaut, Earth). Never cartoonish. |
| `scene-photo` | The subject is the environment itself (Ocean, Island, Rainbow). |

Cartoon, flat vector, clip-art, watercolour and line art are outside the taxonomy and are always rejected.

### 2.3 Background (`background`)

`white`, `light-neutral`, `natural`, `sky`, `water`, `dark`. Use `dark` only when the subject needs it (Moon) and never more than once per letter.

### 2.4 Role (`role`)

Every letter has exactly four references, one per role. The role describes the job the image does inside its letter.

| Role | Job | How it usually looks |
| --- | --- | --- |
| **Primary** | The strongest, clearest, most instantly recognisable representation of the letter. The image a child should see first. | The most iconic word for the letter, `studio-photo`, front or three-quarter view, perfect clarity. |
| **Alternative** | A different interpretation: a different category and a different visual mode from Primary. | If Primary is an animal on white, Alternative is food, an object or a vehicle, often still on white. |
| **Exploration** | A more atmospheric or creative direction that still stays inside the house style. | Habitat or scene photo, interesting light (sunset sky, glowing lamp, warm interior), more depth. |
| **Distinctive** | An unconventional but relevant composition: unusual subject, crop, scale or medium. Adds surprise to the set. | A close-up portrait, a top-down flat lay, a person or an action, a premium 3D render, an aerial view. |

Rules for roles within one letter:

1. At least two of the four are `studio-photo` or `3d-render` on a white or light background.
2. At most two use a natural, sky, water or dark background.
3. The four cover at least three different categories.
4. No two share the same pose and the same background.

---

## 3. Selection and rejection framework

Each candidate goes through three gates in order. Failing any gate rejects it; the reason is recorded.

### Gate 1: Hard rejections (any one is enough)

| Code | Reason |
| --- | --- |
| `R1-WATERMARK` | Visible watermark, stock-site stamp, signature or logo overlay. |
| `R2-FAKE-ALPHA` | Grey-and-white checkerboard baked into the pixels (a "fake transparent" PNG). Very common on Pinterest. |
| `R3-STYLE` | Cartoon, vector, clip-art, watercolour, line art or heavy filter. |
| `R4-LOWRES` | Shortest side under 600 px, or visibly blurry, noisy or over-compressed. |
| `R5-WRONG` | Not the named subject, or ambiguous (a leopard labelled as a jaguar, a sheep labelled as a goat). |
| `R6-UNSAFE` | Frightening, violent or inappropriate for young children (bared fangs, attack, injury). |
| `R7-LIKENESS` | Recognisable real person, celebrity likeness, or a minor's identifiable face from a personal photo. |
| `R8-BRAND` | Prominent logo, trademark or branded product as the main subject. |
| `R9-RIGHTS` | Pin links to a paid stock site, or the source forbids reuse. |
| `R10-AI` | AI-generated or AI-modified image, 3D render or composite: over-smooth fur or skin, merged or extra anatomy, too-perfect lighting, or pin text mentioning AI, Midjourney, render or PNG. Use a real photograph instead. |

### Gate 2: Quality scoring

Score each surviving candidate 1–5 on the seven criteria from the brief. A reference needs **at least 28 out of 35** and **no criterion below 3**.

| Criterion | 5 means | 1 means |
| --- | --- | --- |
| **Relevance** | Exactly the word, nothing else competing. | Word is a minor element. |
| **Recognisability** | A 3-year-old names it in one second at thumbnail size. | Needs an explanation. |
| **Visual quality** | Sharp, clean edges, even light, accurate colour. | Soft, noisy, colour cast. |
| **Composition** | Centred, whole subject, 55–80% fill, breathing room. | Cropped, tiny, cluttered. |
| **Uniqueness** | Adds a pose, angle or mood not already in the library. | Duplicates another reference. |
| **Consistency** | Looks like it belongs next to A–F. | Clashes with the set. |
| **Resolution** | Native 1:1 at 1000 px or more. | Below 600 px, or needs heavy cropping. |

### Gate 3: Library fit

Compare against the letter and the whole library:

- Does it fill the role it is assigned (section 2.4)?
- Does the letter still satisfy the four role rules?
- Is there a near-identical composition elsewhere in the library (same pose and background on a similar subject, e.g. two standing big cats side-on on white)? If so, keep the stronger one and change the other's angle or role.

---

## 4. Quality checklist for future additions

Copy this list into the pull request or note whenever a reference is added or replaced.

```
[ ] Word is a concrete, child-friendly noun (or a deliberate concept, tagged `concept`)
[ ] No watermark, stamp, signature, or baked-in checkerboard
[ ] Real photograph of a real subject: not AI-generated or AI-modified, not a 3D render, cartoon, vector or watercolour
[ ] One subject, centred, whole subject visible, ~55–80% fill
[ ] Source is already 1:1 (within 5%); if not, note why and check the crop keeps the whole subject
[ ] Shortest side ≥ 600 px (≥ 1000 px preferred)
[ ] White/light studio OR soft natural setting; not busy
[ ] Friendly mood; nothing frightening
[ ] No real-person likeness, no prominent brand/logo
[ ] Scores ≥ 28/35 with no criterion below 3
[ ] Role assigned; letter still meets the four role rules
[ ] Not a near-duplicate of any other reference in the library
[ ] Source pin URL, image URL and original source domain recorded
[ ] Rights status recorded (see section 5)
[ ] Image saved to assets/<Letter>/<ID>-<word>.jpg and record added to library.json
[ ] library.csv and index.html regenerated
```

---

## 5. Source and rights tracking

Kiddos is non-commercial, and the brief asks for Pinterest as the primary source. Pinterest is a discovery tool, not a licence: the rights belong to whoever made the original image. So every record keeps:

- `source.pinterest_image_url`: the exact `i.pinimg.com` file that was downloaded and checked.
- `source.pinterest_pin_url`: the pin page, where the API exposed it.
- `source.board_url` and `source.pinner`: who saved it on Pinterest.
- `source.original_link` / `source.original_domain`: where the pin says the image came from. `Uploaded by user` means Pinterest has no outside source on record.
- `rights.status`: one of
  - `unverified`: the default for everything sourced from Pinterest. The original creator's licence has not been checked.
  - `public-domain-claimed`: the original link is a public-domain or free-licence site (still worth a glance).
  - `cleared`: someone has confirmed the licence or obtained permission.
  - `replace-before-release`: known problem (watermark, brand) that must be fixed before shipping.
- `rights.notes`: anything specific.

`approval.status` is separate from rights. `curator-approved` means it passed all three gates in section 3. `owner-approved` means the product owner has signed off. Nothing should ship until both approval and rights are settled.

---

## 6. Naming and IDs

- Reference ID: `<Letter>-<NN>`, numbered 01–04 in the order the words appear in `constants.ts` (so `G-01` is Giraffe). IDs never get reused; if a reference is replaced, the record keeps its ID and records the old image in `history`.
- File name: `assets/<Letter>/<ID>-<word-slug>.jpg`, for example `assets/G/G-01-giraffe.jpg`.
- Words come from `ALPHABET_DATA` in `constants.ts`, so the library, the app images and the audio stay aligned. If a word changes in the app, update the record and re-curate that slot.

---

## 7. Process for adding or replacing a reference

1. Search Pinterest with the word plus `isolated on white background realistic` for studio roles, or `<word> photo` / `<word> in nature` for habitat and scene roles.
2. Drop anything that fails Gate 1. On Pinterest, most rejections are fake-alpha checkerboards, stock watermarks and cartoons.
3. Shortlist three, score them (Gate 2), check library fit (Gate 3).
4. Download the chosen image, confirm dimensions, save it under `assets/`.
5. Add or update the record in `library.json`, then regenerate the CSV and preview with `node docs/visual-library/build.mjs`.
6. Run the checklist in section 4.
