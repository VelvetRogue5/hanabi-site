# Hanabi Site

Static GitHub Pages site for **Hanabi: Light Up the Sky** (`ai.hanabi.game`), including the marketing homepage,
iOS and Android privacy policies, platform terms, store-listing copy, and technical support. Structure follows the
Paper Boom! site.

## Pages

- `index.html`: public marketing homepage with current gameplay screenshots.
- `privacy.html`: iOS privacy policy for App Store Connect.
- `terms-of-use.html`: iOS terms of use.
- `marketing.html`: App Store marketing copy, review notes, and App Privacy label draft.
- `android/privacy.html`: Android privacy policy for Google Play Console.
- `android/terms-of-use.html`: Android terms of use.
- `android/marketing.html`: Google Play marketing copy, review notes, and Data safety draft.
- `support/index.html`: technical support page for both platforms.

## GitHub Pages

In repository settings, enable GitHub Pages using `Deploy from a branch`, branch `main`, and folder `/ (root)`.

- Home: `https://velvetrogue5.github.io/hanabi-site/`
- iOS privacy: `https://velvetrogue5.github.io/hanabi-site/privacy.html`
- iOS terms: `https://velvetrogue5.github.io/hanabi-site/terms-of-use.html`
- iOS marketing: `https://velvetrogue5.github.io/hanabi-site/marketing.html`
- Android privacy: `https://velvetrogue5.github.io/hanabi-site/android/privacy.html`
- Android terms: `https://velvetrogue5.github.io/hanabi-site/android/terms-of-use.html`
- Android marketing: `https://velvetrogue5.github.io/hanabi-site/android/marketing.html`
- Support: `https://velvetrogue5.github.io/hanabi-site/support/`

The game's `HanabiLinks.cs` currently opens `https://hanabi.colorpro.com.ai/hanabi/privacy.html` and
`https://hanabi.colorpro.com.ai/hanabi/android/privacy.html` (with equivalent terms paths). The GitHub Pages URLs
above are a separate copy; pushing this repository alone does not confirm that the production domain is updated.
Publish these static files through that domain's hosting workflow and verify the October 10, 2026 date.

## Screenshots

`assets/screenshots/` holds 540px-wide copies of captures taken on an Android phone (OPPO PMK110) from the
development build on September 22, 2026. The OPPO game-assistant edge handle and the "Development Build" corner
label were painted out with the surrounding sky; nothing else was edited. Full-resolution files are in the Unity
repository's `Diagnostics/StoreScreenshots/Android-2026-09-22/` (gitignored there, so they live only on the
build machine). iOS store sets still need to be captured.

## Current privacy posture

The policies were updated on October 10, 2026 against Android release **1.0.3 / vc4** and the shared iOS integration source. Validate the final iOS archive before submission.

- **No account, local saves** — progress, items, fireworks and settings stay on device. The app generates a persistent random CUID for Yideng reports and AppsFlyer's customer user ID; iOS stores a copy in the system keychain.
- **Advertising** — AppLovin MAX, AdMob, Unity Ads, Liftoff, DT Exchange, Mintegral, Pangle, BidMachine and ironSource. Bigo has been removed. Banner is disabled by default both in the app and in live Remote Config version 6; it can be enabled remotely. iOS placements depend on its release configuration.
- **Measurement** — Yideng reports installation, app opens, tutorial completion, ad format and estimated/cumulative revenue to `hanabi.colorpro.com.ai`. Reports include CUID and available SDK/advertising IDs and technical context. AppsFlyer and Meta also receive app-open and level-completion events; AppsFlyer receives MAX impression revenue and ad context.
- **Firebase** — automatic Analytics events, Remote Config and Google Cloud Storage level downloads. There is no separate game crash-reporting service; advertising SDKs may process diagnostics.
- **Choices** — IDFA requires iOS ATT permission; Android supports OS Advertising ID controls. Turning off an advertising ID does not disable all installation/event reporting or delete previous server records.
- **Not present** — in-app purchases, notifications, accounts, cloud saves.

Public support and privacy email: `velvet_rogue_5@proton.me`.

Update the policies and store declarations before release if the app adds gameplay analytics events, crash
reporting, notifications, purchases, accounts, cloud saves, or another data service, or if the ad network list
changes.

## Local validation

```bash
node tools/validate-site.mjs
```
