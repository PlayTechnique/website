// versiondiff.js
//
// Word-level diff toggle for showing human-final vs post-AI versions of writing.
// Dependency: jsdiff. Either load it globally (window.Diff) via a <script> tag,
// or pass it in: VersionDiff.init(target, { Diff }).
//
// Usage (in a page that loads jsdiff globally):
//   import { init } from "./versiondiff.js";
//   init();                                  // auto-finds [data-versiondiff]
//   init("#myArticle");                      // or target one container
//   init(el, { default: "diff" });           // with options
import *  as Diff from "https://esm.sh/diff@5.1.0";
const DEFAULTS = {
  default: "ai",
  labels:  { ai: "AI Edited", human: "Human", diff: "Diff" },
  Diff:    null,  // pass jsdiff here if it isn't on window.Diff
};

function readVersion(container, name) {
  const tpl = container.querySelector(`template[data-version="${name}"]`);
  return tpl ? tpl.innerHTML.trim() : "";
}

function toText(html) {
  const d = document.createElement("div");
  d.innerHTML = html;
  const parts = [...d.querySelectorAll("p")].map((p) => p.textContent.trim());
  return parts.length ? parts.join("\n\n") : d.textContent.trim();
}

function esc(s) {
  return s.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));
}

function renderDiff(humanHTML, aiHTML) {
  if (!Diff) return "<p>(jsdiff not available)</p>";
  const parts = Diff.diffWords(toText(humanHTML), toText(aiHTML));
  const out = parts
    .map((p) => {
      const v = esc(p.value);
      if (p.added)   return `<span class="vd-add">${v}</span>`;
      if (p.removed) return `<span class="vd-del">${v}</span>`;
      return v;
    })
    .join("");
  return out
    .split(/\n\n+/)
    .map((para) => `<p>${para.replace(/\n/g, "<br>")}</p>`)
    .join("");
}

function build(container, opts) {
  const o = { ...DEFAULTS, ...opts };
  o.labels = { ...DEFAULTS.labels, ...(opts && opts.labels) };



  const human = readVersion(container, "human");
  const ai    = readVersion(container, "ai");
  const views = { human, ai, diff: renderDiff(human, ai) };

  const bar = document.createElement("div");
  const btns = {};
  for (const k of ["human", "ai", "diff"]) {
    const b = document.createElement("button");
    b.type = "button";
    b.textContent = o.labels[k];
    b.addEventListener("click", () => show(k));
    bar.appendChild(b);
    btns[k] = b;
  }

  const stage = document.createElement("div");
  container.after(bar, stage);

  function show(k) {
    stage.innerHTML = views[k];
    for (const key of Object.keys(btns)) {
      btns[key].setAttribute("aria-pressed", String(key === k));
    }
  }

  show(o.default);
  return { show };
}

export function init(target, opts) {
  if (typeof target === "string") {
    const el = document.querySelector(target);
    return el ? build(el, opts) : null;
  }
  if (target instanceof Element) return build(target, opts);
  // no target -> auto-discover
  return [...document.querySelectorAll("[data-versiondiff]")].map((el) => build(el, opts));
}

export default { init };