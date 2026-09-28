import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import ts from "typescript";

// Catch common editing mistakes before publishing the site.
async function readContent(name) {
  const source = await readFile(new URL(`../content/${name}.ts`, import.meta.url), "utf8");
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.ESNext },
  });
  return import(`data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`);
}

function nonempty(value, label) {
  assert.ok(typeof value === "string" && value.trim(), `${label} must not be empty`);
}

function webUrl(value, label) {
  assert.ok(["http:", "https:"].includes(new URL(value).protocol), `${label} must use http or https`);
}

const { projects } = await readContent("projects");
const { site } = await readContent("site");
const { home } = await readContent("home");
const ids = new Set();
for (const project of projects) {
  nonempty(project.id, "Project ID");
  assert.match(project.id, /^[a-zA-Z0-9_-]+$/, "Project IDs must be safe URL segments");
  assert.ok(!ids.has(project.id), `Duplicate project ID: ${project.id}`);
  ids.add(project.id);
  nonempty(project.title, `${project.id}: title`);
  nonempty(project.description, `${project.id}: description`);
  assert.ok(Array.isArray(project.techStack), `${project.id}: techStack must be an array`);
  project.techStack.forEach((tech) => nonempty(tech, `${project.id}: technology`));
  for (const field of ["websiteUrl", "sourceUrl"]) {
    if (project[field]) webUrl(project[field], `${project.id}: ${field}`);
  }
}
for (const key of ["name", "brand", "title", "description"]) nonempty(site[key], `site.${key}`);
assert.match(site.email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid contact email");
for (const social of site.socialLinks) {
  nonempty(social.label, "Social label");
  nonempty(social.handle, "Social handle");
  webUrl(social.url, social.label);
  assert.ok(["github", "linkedin", "instagram"].includes(social.icon), `Unknown icon: ${social.icon}`);
}
for (const link of site.navigation) {
  assert.ok(["/#about", "/#projects", "/#contact"].includes(link.href), `Unknown section: ${link.href}`);
}
for (const [section, copy] of Object.entries(home)) {
  for (const [key, value] of Object.entries(copy)) nonempty(value, `${section}.${key}`);
}
console.log(`Content valid: ${projects.length} projects, unique project IDs, contact details, and homepage copy.`);
