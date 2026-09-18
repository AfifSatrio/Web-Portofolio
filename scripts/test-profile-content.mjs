import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import ts from "typescript";

// Exercise the read-time content upgrade without connecting to or mutating Supabase.
const source = await readFile(
  new URL("../lib/profile-content.ts", import.meta.url),
  "utf8",
);
const { outputText } = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.ESNext },
});
const { normalizeAbout, normalizeSkills, PROFILE_ABOUT } = await import(
  `data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`
);
const seed = await readFile(
  new URL("../supabase/schema-and-seed.sql", import.meta.url),
  "utf8",
);
const rows = [
  ...seed.matchAll(
    /\('(00000000-0000-4000-8000-0000000001\d\d)', '([^']+)', '([^']+)', '([^']+)'\)/g,
  ),
].map(([, id, name, category, created_at]) => ({
  id,
  name,
  category,
  created_at,
}));
assert.equal(rows.length, 15);
const upgraded = normalizeSkills(rows);
assert.equal(upgraded.length, 15);
assert.deepEqual(
  upgraded.map((row) => row.id),
  rows.map((row) => row.id),
);
for (const name of [
  "Responsive Design",
  "MySQL",
  "UI/UX Prototyping",
  "Vercel",
  "Hosting Setup",
]) {
  assert.ok(
    upgraded.some((skill) => skill.name === name),
    `Missing Upwork skill: ${name}`,
  );
}
assert.ok(
  !upgraded.some(
    (row) => row.name === "OBS Studio" || row.category === "Soft Skills",
  ),
);
assert.deepEqual(
  normalizeSkills(upgraded),
  upgraded,
  "The upgrade must be idempotent",
);
assert.deepEqual(
  normalizeSkills([]),
  [],
  "Do not recreate intentionally deleted skills",
);
assert.equal(normalizeSkills(rows.slice(1)).length, 14);
const customized = { ...rows[0], name: "React Native", category: "Frontend" };
const customId = { ...rows[10], id: "custom-record" };
assert.deepEqual(
  normalizeSkills([customized, customId]),
  [customized, customId],
  "Keep administrator-owned content intact",
);

const customAbout = {
  ...PROFILE_ABOUT,
  bio: "My updated introduction.",
  tagline: "Custom developer title",
  cv_url: "/resume.pdf",
};
assert.deepEqual(normalizeAbout(customAbout), customAbout);
assert.equal(normalizeAbout(null).bio, PROFILE_ABOUT.bio);
assert.equal(
  normalizeAbout({ tagline: "Fullstack Web Developer | UI/UX Designer" })
    .tagline,
  PROFILE_ABOUT.tagline,
);
assert.equal(
  normalizeAbout({ bio: "First paragraph.\r\n\r\nSecond paragraph." }).bio,
  "First paragraph.\n\nSecond paragraph.",
);
console.log(
  "Profile checks passed: legacy upgrades, stable IDs, custom content, deleted skills, and multiline copy.",
);
