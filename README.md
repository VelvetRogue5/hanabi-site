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

The game's `AIPivotLinks.cs` opens the privacy and terms URLs above from the first-launch notice and Settings.

## Screenshots

`assets/screenshots/` holds 540px-wide copies of captures taken on an Android phone (OPPO PMK110) from the
development build on September 22, 2026. The OPPO game-assistant edge handle and the "Development Build" corner
label were painted out with the surrounding sky; nothing else was edited. Full-resolution files are in the Unity
repository's `Diagnostics/StoreScreenshots/Android-2026-09-22/` (gitignored there, so they live only on the
build machine). iOS store sets still need to be captured.

## Current privacy posture

The pages describe the build reviewed on September 22, 2026, with ads being integrated for release:

- **No account, local saves** — progress, hints and brooms, unlocked fireworks, tutorials, and settings on device.
  The app creates no identifier of its own.
- **Advertising** — AppLovin MAX rewarded, interstitial, and banner ads. Android mediates AppLovin, Google AdMob,
  Unity Ads, Vungle (Liftoff), Mintegral, Pangle, BidMachine, and Bigo Ads; the iOS list adds DT Exchange, but iOS
  has no ad units yet, so ads are off there.
- **Analytics** — Firebase Analytics, automatic events only (no custom gameplay events). No crash reporting.
- **Remote configuration and levels** — Firebase Remote Config (`cloud_levels_enabled`, `level_pack`,
  firework unlock pacing) and level packs from Google Cloud Storage.
- **Install measurement** — AppsFlyer (plus the Play Install Referrer on Android) and Meta App Events.
- **Tracking** — iOS shows the App Tracking Transparency prompt; AppsFlyer waits up to 60 seconds for the answer and
  Meta advertiser-ID collection stays off until Allow. On Android the SDKs read the Advertising ID.
- **Not present** — in-app purchases, notifications, accounts, cloud saves.

Public support and privacy email: `velvet_rogue_5@proton.me`.

Update the policies and store declarations before release if the app adds gameplay analytics events, crash
reporting, notifications, purchases, accounts, cloud saves, or another data service, or if the ad network list
changes.

## Local validation

```bash
node tools/validate-site.mjs
```
