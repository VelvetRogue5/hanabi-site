import assert from "node:assert/strict";
import { existsSync, readFileSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const pagePaths = [
  "index.html",
  "privacy.html",
  "terms-of-use.html",
  "marketing.html",
  "android/privacy.html",
  "android/terms-of-use.html",
  "android/marketing.html",
  "support/index.html",
];

function read(relativePath) {
  const fullPath = join(root, relativePath);
  assert.ok(existsSync(fullPath), `${relativePath} should exist`);
  return readFileSync(fullPath, "utf8");
}

function includes(file, expected) {
  assert.ok(read(file).includes(expected), `${file} should include ${JSON.stringify(expected)}`);
}

for (const relativePath of pagePaths) {
  const fullPath = join(root, relativePath);
  const html = read(relativePath);
  for (const expected of ["<!doctype html>", "<html lang=\"en\">", "<title>", "name=\"viewport\""]) {
    assert.ok(html.toLowerCase().includes(expected.toLowerCase()), `${relativePath} should include ${expected}`);
  }

  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const target = match[1];
    if (/^(?:https?:|mailto:|#)/.test(target)) continue;
    const localTarget = target.split("#", 1)[0].split("?", 1)[0];
    assert.ok(existsSync(resolve(dirname(fullPath), localTarget)), `${relativePath} should resolve ${target}`);
  }
}

includes("index.html", "Hanabi: Light Up the Sky | Fireworks Arrow Puzzle");
includes("index.html", "assets/screenshots/09_album.png");
includes("index.html", "android/privacy.html");
includes("index.html", "support/");

includes("privacy.html", "Privacy Policy (iOS) | Hanabi");
includes("privacy.html", "Apple's App Tracking Transparency");
includes("privacy.html", "id=\"att\"");
includes("privacy.html", "AppLovin MAX");
includes("privacy.html", "Firebase Analytics");
includes("privacy.html", "Firebase Remote Config");
includes("privacy.html", "AppsFlyer");
includes("privacy.html", "Meta (Facebook) App Events");
includes("privacy.html", "No In-App Purchases");
includes("privacy.html", "android/privacy.html");

includes("android/privacy.html", "Privacy Policy (Android) | Hanabi");
includes("android/privacy.html", "Android Advertising ID");
includes("android/privacy.html", "Android Permissions and Haptics");
includes("android/privacy.html", "install referrer");
includes("android/privacy.html", "No In-App Purchases");

includes("terms-of-use.html", "Hanabi iOS Terms");
includes("terms-of-use.html", "Apple Media Services Terms and Conditions");
includes("android/terms-of-use.html", "Hanabi Android Terms");
includes("android/terms-of-use.html", "Google Play Terms of Service");

includes("marketing.html", "App Store Connect");
includes("marketing.html", "Contains ads:</strong> Yes");
includes("marketing.html", "In-app purchases:</strong> No");
includes("marketing.html", "App Privacy Label Draft");
includes("android/marketing.html", "Data Safety Draft");

const iosMarketing = read("marketing.html");
for (const [id, max] of [["subtitle", 30], ["promotional-text", 170], ["keywords", 100], ["app-store-description", 4000]]) {
  const match = iosMarketing.match(new RegExp(`<pre id="${id}"[^>]*>([\\s\\S]*?)<\\/pre>`));
  assert.ok(match, `marketing.html should include #${id}`);
  assert.ok(match[1].trim().length <= max, `${id} should be at most ${max} characters (is ${match[1].trim().length})`);
}

const androidMarketing = read("android/marketing.html");
for (const [id, max] of [["short-description", 80], ["full-description", 4000]]) {
  const match = androidMarketing.match(new RegExp(`<pre id="${id}"[^>]*>([\\s\\S]*?)<\\/pre>`));
  assert.ok(match, `android/marketing.html should include #${id}`);
  assert.ok(match[1].trim().length <= max, `${id} should be at most ${max} characters (is ${match[1].trim().length})`);
}

const supportEmail = "velvet_rogue_5@proton.me";
for (const relativePath of pagePaths.filter((path) => !path.includes("marketing") && path !== "index.html")) {
  includes(relativePath, supportEmail);
}

assert.ok(existsSync(join(root, ".nojekyll")), ".nojekyll should exist");
assert.ok(statSync(join(root, "assets/app-icon.png")).size > 100_000, "app icon should be a real PNG");

for (const name of [
  "01_loading.png", "02_home.png", "03_level.png", "04_launch.png", "05_good.png",
  "06_aurora.png", "07_win.png", "08_landmark.png", "09_album.png",
]) {
  const path = join(root, "assets/screenshots", name);
  assert.ok(existsSync(path), `${name} should exist`);
  assert.ok(statSync(path).size > 20_000, `${name} should be a real screenshot`);
}

// Text that belongs to the Paper Boom or AIPivot sites this one was modeled on, or to
// features Hanabi does not have. Any of these showing up means copy leaked across.
const foreignClaims = [
  "Paper Boom",
  "paperboom",
  "AIPivot",
  "Night Bloom",
  "app-d.",
  "Crashlytics</",
  "uses Google Firebase Analytics and Firebase Crashlytics",
  "purchase_result",
  "Restore Purchases",
  "Starter Pack",
  "Remove Ads",
  "local reminder notifications",
  "support identifier",
  "keychain",
];
for (const relativePath of pagePaths) {
  const html = read(relativePath);
  for (const claim of foreignClaims) {
    assert.ok(!html.includes(claim), `${relativePath} should not contain ${JSON.stringify(claim)}`);
  }
}

// The builds ship ads, analytics and attribution. These phrases would be false.
const staleNoDataClaims = [
  "No in-app advertising",
  "does not show ads",
  "does not include advertising",
  "does not use third-party analytics",
  "does not present Apple's App Tracking Transparency prompt",
];
for (const relativePath of pagePaths) {
  const html = read(relativePath);
  for (const claim of staleNoDataClaims) {
    assert.ok(!html.includes(claim), `${relativePath} should not claim ${JSON.stringify(claim)}`);
  }
}

console.log(`Validated ${pagePaths.length} pages.`);
