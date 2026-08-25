# NBA 2K27 Build Lab v10.1 — v7 Full Private Beta

All-position web/PWA build planner based on the user-supplied NBA 2K HQ Android client and public badge/takeover data supplied in the conversation.

## Included in this sweep
- PG / SG / SF / PF / C body profiles.
- 18,935 legal height/weight/wingspan combinations.
- 1,545 extracted linked-attribute rules with recursive dependency solving.
- Badge and takeover live unlock detection.
- Live body max-potential beta.
- Exact decoded **21-direct-slider OVR proxy** across 15 player-type weighting paths and height transform.
- Automatic all-position body + target compiler search.
- Automatic beta build generation/ranking.
- Build compare.
- Local saved builds.
- Shareable build URL hashes.
- PWA manifest/service worker for add-to-home-screen behavior when hosted.
- Cap Breaker beta preview using the recovered native five-step formula.

## Cap Breaker math recovered from native code
For each of five sequential boosts:

`factor = 15 + trunc((350 - 14 * currentRating) / 74)`

`boost = round(((maxWeight - selectedWeight) / maxWeight) * factor)`

Then force at least +1 while upgrade room remains and clamp to the natural max. The remaining parity issue is that 2K scans 155 player-data weights; the browser currently uses the maximum of the 21 directly decoded builder weights for the active direct-OVR player type.

## Accuracy labels
**Decoded/strong:** legal body ranges, dependency rules, badge/takeover thresholds, direct-21 OVR proxy math, height transform, cap-breaker sequence formula.

**Beta:** extreme-body final max-cap adjustment, exact displayed OVR (derived player-data slots remain), exact cap-breaker 155-slot maximum-weight lookup, therefore automatic 99 OVR legality.

The UI deliberately says `proxy`, `beta`, or `~` where exact parity is not established.

## Run locally
From the folder:

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000/`. Static hosting such as Vercel, Netlify, GitHub Pages, or Cloudflare Pages can host the same folder.


## v7.1 hotfix
- Fixed Automatic Build Finder crash caused by referencing `rules.constraints` instead of the extracted `rules.attributeConstraints` collection.
- Added an explicit Auto Build result state.
- Fixed the **Open** button navigation helper.
- Added visible searching/error states so failures no longer look like a dead button.


## v7.2 cache hotfix
The prior beta registered a cache-first service worker under `localhost`. Because every local version uses the same origin, Chrome/Safari could continue serving the old v7 page even after you unzipped a newer folder.

v7.2:
- unregisters prior Build Lab service workers
- deletes old Build Lab caches
- cache-busts the data JSON files
- disables PWA caching during local beta testing
- displays `v7.2 loaded` in Auto Build so you can confirm the new code is actually running


## v7.3 height-aware optimizer
Auto Build now supports:
- Size-aware guard (default): 6'5"+, favors 6'6"–6'8"
- Tall guard: 6'6"+ only
- Balanced: 6'5"+ with a smaller size bonus
- No height preference

The height preference is separate from 2K's hard builder rules so the gameplay/meta weighting can be changed later.


## v8 visual redesign
The Builder page was redesigned around the provided reference layout:
- large build identity / OVR header
- reverse-builder body controls on the left
- live max-potential attribute summary on the right
- max-potential badge and takeover previews
- cleaner lower Attributes + Badges/Takeovers workspace
- lighter utility-style interface designed to feel closer to a polished 2K companion tool

The design is inspired by the reference's information architecture, not a pixel-for-pixel copy.


## v8.1 interaction hotfix
The v8 visual redesign removed two legacy counter elements (`#badgeCount` and `#takeCount`) but the startup code still tried to write into them. That JavaScript error stopped the rest of initialization, which is why the page rendered but position controls, reset, attribute sliders, and tabs did nothing.

Fixed:
- startup crash from removed legacy counters
- PG / SG / SF / PF / C segmented position controls
- height slider binding to the hidden legal-height selector
- body sliders repainting the max-potential panel
- Reset repainting the redesigned Builder
- explicit initial UI synchronization
- data cache-busting for the hosted beta


## v8.3 mobile visual / slider update
- Restored the red + black visual theme.
- Rebuilt iPhone range-slider touch behavior so horizontal dragging adjusts the slider instead of dragging the page.
- Enlarged mobile slider thumbs and tracks for easier touch control.
- Added icon rendering hooks for the real NBA 2K27 badge/takeover artwork.

### Badge / Takeover icons
The uploaded NBA 2K HQ Unity asset pack contains the actual game icon bundles:
- `badgeatlas_assets_all_...bundle`
- `takeovers_discipline_icons_assets_all_...bundle`
- `takeovers_specialability_icons_assets_all_...bundle`

Those Unity atlases still need to be decoded into individual PNG/Sprite files before the website can map each named badge/takeover to its real artwork. The UI is now ready to consume those extracted images once available.


## v8.4 deployment/cache verification hotfix
- Adds an unmistakable `MOBILE BUILD 8.4 • 7:30 PM HOTFIX` marker at the top of the live page.
- Forces service-worker unregistration and Cache Storage deletion before app initialization.
- Adds Netlify `_headers` and `netlify.toml` with `Cache-Control: no-store`.
- Keeps the v8.3 dark red/black theme and iPhone slider improvements.


## v8.5 mobile attribute fix
- Final red/black theme override is loaded after the light-theme CSS.
- Attribute sliders no longer rebuild their DOM while your finger is dragging.
- iPhone attribute sliders use larger touch targets and `touch-action:none`.
- Linked/forced attributes move their visible slider thumbs to the effective 2K rating.
- Attribute numbers, forced-link messages, badges, takeovers, OVR and optimizer update live during drag.


## v8.6 Build Finder explanation layer
- Recommended builds now explain **why they ranked where they did**.
- Cards show the strongest trait and the main tradeoff.
- Checks core shooting, contact-dunk, perimeter-defense, creation, movement and ball-security targets.
- Calls out important badge and takeover unlocks.
- Adds a top-three quick comparison in the search summary.
- Adds **Add to Compare** directly from the top Auto Build results.
- Keeps the stable v8.5 mobile slider/link-sync behavior.


## v8.7 attribute locks + mobile badge/takeover labels
- Tap potential badge/takeover chips on mobile to see the name; desktop hover titles still work.
- Every attribute now has a lock toggle.
- Locking freezes the exact effective rating.
- If another attribute would force a locked rating higher, that change is blocked and a warning explains the conflict.
- **Unlock & Apply** unlocks the conflicting rating(s) and retries the requested change.
- **Keep Locked** cancels the attempted change.
- Saved builds record the lock list.


## v8.8 lock conflict + 99 OVR guard
- Lock conflict detection now solves the full dependency chain first, so cascading requirements cannot silently bypass a locked rating.
- A locked attribute that would need to move higher now always triggers the conflict dialog.
- Added an active 99 OVR legality guard: attribute changes are blocked once the current decoded OVR model exceeds 99.
- The warning offers **Use Max Allowed**, which finds the highest legal value for the attribute under the current model.
- Important: the 99 OVR guard uses the decoded direct-attribute OVR proxy until the remaining derived-player-data slots are fully mapped.


## v8.9 hard caps + lock snap + live OVR
- Attribute sliders now use the selected body profile's current max-potential cap as their actual HTML slider max. If 3PT max is 89, the slider physically stops at 89.
- Attribute changes are also clamped in JavaScript, so a value cannot be pushed above its body-profile ceiling through another UI path.
- Locking an attribute immediately rebuilds that slider. This ends an active mobile drag and reappears locked at the exact rating where the user stopped.
- Unlocking restores the slider from that same saved rating.
- Added a live OVR badge at the top-right of the **Attributes** panel, updating while ratings change.


## v8.10 hard-stop lock conflicts
- Fixes the iPhone behavior shown in the screen recording where a range slider could keep moving underneath the lock-conflict modal until the finger lifted.
- On the first illegal linked-attribute step, the app now terminates the active native range gesture, restores the last legal value, rebuilds the slider, and only then opens the warning.
- The same hard-stop behavior is applied to the 99 OVR guard.
- Directly pressing an attribute lock also terminates any active slider gesture before the locked control is rebuilt.


## v8.12 Optimizer priorities + validated cap profile
- Completely reworks Optimizer Custom mode around **Current Rating + Priority 1–10**.
- Removes target-rating input from Optimizer. The user tells the app how important an attribute is; the optimizer decides which next threshold is worth pursuing.
- Current Rating is synced to the Builder and respects body caps and attribute locks.
- Presets now define priority weights only.
- Optimizer ranks next useful badge/takeover/general-improvement opportunities by priority and distance.
- Fixes the Max Potential `undefined 99` Free Throw mapping.
- Adds an exact 2KHQ-validated cap override for **SG / 6'6" / 187 lb / 6'6" wingspan** using the supplied screenshot:
  92 Close, 92 Layup, 90 Dunk, 80 Standing Dunk, 89 Post Control,
  99 Mid, 94 3PT, 99 FT, 99 Pass, 93 Handle, 86 SWB,
  80 Interior, 87 Perimeter, 90 Steal, 64 Block,
  67 OREB, 71 DREB, 95 Speed, 93 Agility, 75 Strength, 99 Vertical.
- Other body profiles remain explicitly beta until directly validated or the missing native final-adjustment logic is recovered.
- Keeps v8.10 hard-stop lock-conflict behavior and v8.9 hard body-cap sliders/live OVR.


## v9.0 Slim workflow
- Main navigation: Builder, My Builds, Compare, Optimizer.
- Optimizer automatically copies the current Builder build when opened.
- Optimizer can instead load any saved build.
- Current ratings are source data; the user changes Priority 1–10, not target ratings.
- Save Optimized Build always creates a new saved build and never overwrites the source.
- Optimized copies are named `Original — Optimized`, `Original — Optimized 2`, etc.
- Original and optimized versions can then be compared side by side.


## v9.1 startup hotfix
- Fixes the blank Attributes panel and dead buttons caused by v9.0 still binding JavaScript to Auto Build / Body Scout / Target Compiler controls that were removed from the slim UI.
- Standardizes saved-build storage on the existing `2k27-builds` key.
- Adds an Open button to My Builds.
- Optimizer is now initialized only when its tab is opened, after the Builder has a valid state.
- Keeps the slim four-tab navigation: Builder, My Builds, Compare, Optimizer.


## v9.2 badge/takeover icon tiers + 99 OVR freeze
- Adds a visual icon tile for every badge and takeover shown in Potential and Unlocked sections.
- Badge icon tiles are tier-coded Bronze, Silver, Gold, or Hall of Fame.
- Takeover icon tiles are discipline-coded by Shooting, Finishing, Playmaking, Defense, Rebounding, or Universal.
- Desktop hover and mobile tap labels remain available for the icon tiles.
- Once the current OVR model reaches 99, every attribute range control is increase-locked at its current rating.
- Users can still lower an attribute to drop below 99; once below 99, normal body-cap maximums are restored.
- The exact drag that reaches 99 is terminated immediately so a held finger/mouse cannot keep pushing the slider farther.


## v9.3 real badge/takeover artwork
- Replaces the letter-only badge/takeover placeholders with the actual artwork extracted from the supplied NBA 2K HQ Unity assets.
- Includes mappings for all 53 badges currently used by the app and all 24 takeover abilities.
- Badge artwork keeps the Bronze / Silver / Gold / Hall of Fame tier treatment.
- Takeover artwork keeps its discipline color treatment.
- Desktop hover continues to expose the full icon name.
- Mobile tap opens a persistent bottom sheet showing the full badge/takeover name plus tier/category/requirement.
- Tapping the backdrop or close button dismisses the mobile sheet.
- Keeps v9.2's 99 OVR slider freeze behavior.


## v9.4 badge atlas correction
- Fixes the broken/blank badge artwork seen in v9.3.
- v9.3 was double-flipping the Unity SpriteAtlas Y coordinate after the ASTC atlas had already been normalized for browser canvas rendering.
- Badge crops now use the correct atlas coordinates.
- Reads Unity `settingsRaw` for every badge sprite and honors packed horizontal/vertical/180-degree flips.
- Keeps the real takeover artwork and mobile tap information sheet.


## v9.5 tier-colored badge artwork
- Removes the colored square/tile background from badge icons.
- The actual extracted 2K27 badge artwork now carries the tier color:
  Bronze, Silver, Gold, or Hall of Fame purple.
- Preserves the highlights/shadows of the original badge artwork instead of
  replacing it with a flat colored box.
- Takeovers now display as their extracted artwork without an added colored tile.
- Mobile tap-to-name/details and desktop hover behavior are unchanged.
- Keeps the v9.4 corrected Unity badge-atlas crop logic and v9.2 99 OVR freeze.


## v9.6 icon orientation + tile cleanup
- Removes the leftover gray/glossy square shading still appearing behind badge/takeover icons.
- Disables the old icon wrapper pseudo-elements entirely.
- Flips the rendered icon artwork so badges and takeovers display upright on the site.
- Keeps the tier-colored badge artwork from v9.5.
- Keeps mobile tap-to-name/details and the 99 OVR freeze.


## v10.1 parity-engine pass

### Displayed OVR
- Added the extracted `AttributeRatingWeightScale` table for all 21 Builder attributes.
- Replaced the old unscaled OVR proxy with the recovered 15-player-type weighting path:
  height/player-type weight × rating weight scale, height OVR lerp, strongest player type, nearest-integer display.
- Corrected the previous research note that claimed the Builder was blocked by 155 derived slots.
- Regression validation now matches both supplied OVR states:
  - 6'5" DD93 linked state → 65 OVR.
  - 6'4" / 205 / 6'7" finishing-max linked state → 87 OVR.
- The 99 OVR freeze now uses the displayed OVR from this upgraded engine.

### Max potential
- Added exact 2KHQ cap data for the latest SG 6'4" / 205 / 6'7" screenshot.
- Retains the exact SG 6'6" / 187 / 6'6" validation and the two existing 6'5" recording validations.
- Exact validated profiles are labeled as such.
- Other body profiles use the extracted height/weight/wingspan tuning and remain marked `~` because the final native edge-case adjustment has not been independently recovered for every physical profile.

### Cap Breakers
- Keeps the recovered native five-step arithmetic.
- Replaces the old unscaled 21-weight approximation with the same extracted rating-scaled weights used by the upgraded OVR engine.
- Still presented as a preview because no supplied 2KHQ screenshot contains an exact five-step Cap Breaker sequence to regression-test.

### Optimizer
- Correctly preserves the body profile and locks when loading a saved build.
- Locked attributes are excluded from optimization recommendations.
- `Save Optimized Build` now spends ratings iteratively, respects linked attributes/body caps/locks, stops at displayed 99 OVR, and always saves a new copy.

### Visuals
- Keeps the v9.6 real badge/takeover artwork, tier-colored badges, mobile tap details, upright icon orientation, and removed tile shading.


## v10.1 unlock-audit refresh
- Fixed Dishmaster at exactly 80 Pass Accuracy.
- Rebuilt the shared badge/takeover requirement parser.
- Audited all 53 badges and 24 takeovers.
- Verified all 53 badge icons and all 24 takeover icons are mapped.
- Fixed the Optimizer badge height-requirement lookup.


## v10.1 profile validation refresh
Added exact 2KHQ max-potential values for:
- SG
- 6'7"
- 194 lb
- 6'8" wingspan

Corrected the reconstructed estimates that were too high:
- Close Shot: 99 → 94
- Driving Layup: 99 → 94
- Driving Dunk: 97 → 92
- Perimeter Defense: 97 → 90
- Block: 76 → 73

All other displayed maxes for this body already matched the supplied 2KHQ screenshot.

## v10.1 native max-potential parity
- Decoded `GameLib/careermode_progression_tuning` from the supplied NBA 2K HQ v1.1.3 Unity data (`bab033426e223d749b70f893a7b9f6b9`).
- Recovered the complete 21-attribute height table plus all 58 weight and 58 wingspan endpoint records.
- Max potential now mirrors native float32 interpolation and ARM64 `fcvtns` nearest/ties-to-even rounding.
- Exhaustive validation covers every legal integer height/weight/wingspan combination used by the app, with all cap outputs constrained to 25–99.
- Current validated screenshots match 84/84 attribute ceilings across four profiles, including the 6'7" / 194 lb / 6'8" profile that previously exposed the parsing bug.
- The older 6'5" / 190 lb / 6'5" recording is retained as a legacy-tuning/profile discrepancy instead of overriding the current v1.1.3 native data.
- Cap Breakers remain a preview; this max-potential change does not claim full Cap Breaker parity.
