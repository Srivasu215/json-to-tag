import fs from "fs";
import path from "path";
import { sampleSpecificationTemplates } from "../docs/tags/js/sampleSpecificationTemplates.js";

const tagsJsonPath = path.resolve("docs/tags/tags.json");
const outputDir = path.resolve("docs/tags/individualTags");

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

const rawTags = JSON.parse(fs.readFileSync(tagsJsonPath, "utf-8"));
const tagKeys = Object.keys(rawTags).filter(k => k !== "$schema").sort();

const TABLE_TAGS = ["table", "colgroup", "col", "thead", "tbody", "tfoot", "tr", "th", "td"];
const FORM_TAGS = ["form", "input", "checkbox", "label", "select", "option", "datalist", "button"];
const TYPO_TAGS = ["p", "h1", "h2", "span", "small"];
const LIST_TAGS = ["ul", "li"];
const INLINE_TAGS = ["a", "i"];

function getCategory(tag) {
    if (TABLE_TAGS.includes(tag)) return { name: "Table Tag", badgeClass: "bg-primary-subtle text-primary border border-primary-subtle" };
    if (FORM_TAGS.includes(tag)) return { name: "Form & Input", badgeClass: "bg-success-subtle text-success border border-success-subtle" };
    if (TYPO_TAGS.includes(tag)) return { name: "Typography", badgeClass: "bg-info-subtle text-info-emphasis border border-info-subtle" };
    if (LIST_TAGS.includes(tag)) return { name: "List Element", badgeClass: "bg-primary-subtle text-primary border border-primary-subtle" };
    if (INLINE_TAGS.includes(tag)) return { name: "Inline & Navigation", badgeClass: "bg-info-subtle text-info-emphasis border border-info-subtle" };
    if (tag === "img") return { name: "Media", badgeClass: "bg-warning-subtle text-warning-emphasis border border-warning-subtle" };
    if (tag === "header") return { name: "Semantic Structure", badgeClass: "bg-secondary-subtle text-secondary border" };
    if (tag === "hr") return { name: "Divider & Structure", badgeClass: "bg-secondary-subtle text-secondary border" };
    return { name: "Container", badgeClass: "bg-secondary-subtle text-secondary border" };
}

function getTagDescription(tag) {
    const map = {
        div: "Universal generic block container element for layout, grouping, and styling wrappers.",
        header: "Semantic landmark element representing introductory content or navigational aids.",
        input: "Interactive user data entry control supporting various HTML input types.",
        checkbox: "Specialized Boolean check control for toggle selections and forms.",
        colgroup: "Specifies column groupings within a data table to manage widths and styles.",
        col: "Specifies column-level attributes within a colgroup element.",
        thead: "Groups header content rows (tr with th) in a data table.",
        tbody: "Contains data rows (tr with td) representing table body content.",
        tfoot: "Contains summary or footer rows at the bottom of a table structure.",
        tr: "Defines a single horizontal row of cells in a table.",
        th: "Defines a header cell in a table, providing a semantic label for a column or row.",
        td: "Defines a standard data cell within a table row.",
        table: "Top-level container for tabular structured data.",
        form: "Container representing a document section containing interactive controls for user input.",
        label: "Semantic text caption element for form controls and interactive inputs.",
        select: "Form control providing a selectable drop-down menu list of options.",
        option: "Represents an individual choice item within a select menu or datalist.",
        datalist: "Contains a set of option elements representing recommended options for an input.",
        button: "Clickable button element for triggering actions or submitting forms.",
        p: "Represents a paragraph of text content.",
        h1: "Top-level section heading representing the primary subject.",
        h2: "Secondary section heading for structuring content sections.",
        span: "Generic inline container for phrasing content and styling.",
        img: "Embeds an image into the document with src and alt attributes.",
        a: "Hyperlink anchor element providing navigation to URLs, fragments, or download triggers.",
        i: "Inline idiomatic text or icon container commonly used for vector/font glyphs.",
        small: "Inline element representing side-comments, secondary notes, and small print.",
        ul: "Unordered list container for bulleted collections of list items (li).",
        li: "List item element representing an individual entry within a list structure.",
        hr: "Horizontal rule element representing a thematic break between paragraph-level elements or dropdown divider."
    };
    return map[tag] || `Standard HTML <${tag}> element specification.`;
}

tagKeys.forEach((tag, idx) => {
    const category = getCategory(tag);
    const desc = getTagDescription(tag);
    const sample = sampleSpecificationTemplates[tag] || { tagName: tag };
    const sampleJson = JSON.stringify(sample, null, 2);

    const prevTag = tagKeys[(idx - 1 + tagKeys.length) % tagKeys.length];
    const nextTag = tagKeys[(idx + 1) % tagKeys.length];

    const optionsHtml = tagKeys
        .map(t => `<option value="${t}" ${t === tag ? "selected" : ""}>&lt;${t}&gt;</option>`)
        .join("\n            ");

    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>&lt;${tag}&gt; Tag Specification • @keshavsoft/json-to-tag</title>
  <meta name="description" content="Individual specification, catalog rules, and authoring templates for the HTML &lt;${tag}&gt; element." />

  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" />

  <style>
    body {
      background-color: #f8fafc;
      font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
      color: #1e293b;
    }
    .story-card {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 0.5rem;
      padding: 1.25rem 1.5rem;
      margin-bottom: 1.25rem;
    }
    .attr-pill {
      font-family: monospace;
      font-size: 0.85rem;
      background: #f1f5f9;
      border: 1px solid #cbd5e1;
      padding: 0.2rem 0.5rem;
      border-radius: 0.25rem;
      display: inline-block;
      margin: 0.15rem;
    }
    .code-box {
      background: #0f172a;
      color: #e2e8f0;
      font-family: monospace;
      font-size: 0.825rem;
      padding: 1rem;
      border-radius: 0.375rem;
      overflow-x: auto;
    }
  </style>
</head>
<body class="p-3 p-md-4">
  <div class="container" style="max-width: 860px;">
    
    <!-- Unified Top Navigation Bar -->
    <nav class="navbar navbar-expand-md navbar-dark bg-dark px-3 py-2 rounded-3 mb-4 shadow-sm">
      <div class="container-fluid p-0">
        <a class="navbar-brand fw-bold fs-6 d-flex align-items-center gap-2" href="../../index.html">
          <i class="bi bi-tag-fill text-primary"></i> json-to-tag
        </a>
        <div class="navbar-nav d-flex flex-row gap-1 flex-wrap">
          <a class="nav-link px-2" href="../../index.html">Home</a>
          <a class="nav-link px-2 text-info" href="../index.html">Tags Catalog</a>
          <a class="nav-link px-2" href="../../summary/index.html"><i class="bi bi-cloud-arrow-up me-1"></i>Upload JSON (Review)</a>
          <a class="nav-link px-2 text-warning" href="../../playground/index.html"><i class="bi bi-play-circle me-1"></i>Playground</a>
        </div>
      </div>
    </nav>

    <!-- Inside Switcher Menu for Individual Tags -->
    <div class="card shadow-sm border-0 mb-3">
      <div class="card-body p-3 d-flex justify-content-between align-items-center flex-wrap gap-2">
        <div class="d-flex align-items-center gap-2">
          <label for="selectTag" class="form-label small fw-bold text-muted mb-0 text-uppercase">Jump to Tag:</label>
          <select id="selectTag" class="form-select form-select-sm font-monospace" style="width: 170px;">
            ${optionsHtml}
          </select>
        </div>
        <div class="btn-group btn-group-sm" role="group">
          <a href="./${prevTag}.html" class="btn btn-outline-secondary" id="btnPrevTag">
            <i class="bi bi-chevron-left me-1"></i> Previous (${prevTag})
          </a>
          <a href="./index.html" class="btn btn-outline-primary">
            <i class="bi bi-grid me-1"></i> All Tags
          </a>
          <a href="./${nextTag}.html" class="btn btn-outline-secondary" id="btnNextTag">
            Next (${nextTag}) <i class="bi bi-chevron-right ms-1"></i>
          </a>
        </div>
      </div>
    </div>

    <!-- Header for Selected Tag -->
    <div class="pb-3 mb-3 border-bottom d-flex justify-content-between align-items-center flex-wrap gap-2">
      <div>
        <div class="d-flex align-items-center gap-2 mb-1">
          <span class="badge bg-primary fs-5 font-monospace px-3 py-1">&lt;${tag}&gt;</span>
          <span class="badge ${category.badgeClass}">${category.name}</span>
        </div>
        <p class="text-muted small mb-0">${desc}</p>
      </div>
      <div class="d-flex gap-2">
        <a href="../../summary/index.html" class="btn btn-warning text-dark btn-sm fw-semibold">
          <i class="bi bi-cloud-arrow-up me-1"></i> Upload JSON Spec
        </a>
        <a href="../tags.json" target="_blank" class="btn btn-outline-secondary btn-sm">
          <i class="bi bi-filetype-json me-1"></i> tags.json (SSOT)
        </a>
      </div>
    </div>

    <!-- Error Notice (hidden unless fetch fails) -->
    <div id="catalogErrorNotice" class="alert alert-danger" style="display: none;"></div>

    <!-- Section 1: Live Catalog Rules (Loaded from tags.json SSOT) -->
    <div class="story-card border-primary-subtle">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h2 class="h6 fw-bold mb-0 text-uppercase text-secondary" style="letter-spacing: 0.05em;">
          <i class="bi bi-database-check text-primary me-1"></i> Live Rules from <code>tags.json</code> (SSOT)
        </h2>
        <span class="badge bg-primary-subtle text-primary">Dynamically Loaded</span>
      </div>

      <div class="row g-3 mb-3">
        <div class="col-sm-6">
          <span class="small text-muted d-block mb-1">Allows Direct Text Content:</span>
          <span id="badgeAllowsText" class="badge bg-light text-muted border px-2 py-1">Loading...</span>
        </div>
        <div class="col-sm-6">
          <span class="small text-muted d-block mb-1">Allows Child Elements:</span>
          <span id="badgeAllowsChildren" class="badge bg-light text-muted border px-2 py-1">Loading...</span>
        </div>
      </div>

      <div class="mb-3">
        <span class="small text-muted fw-bold d-block mb-1">Allowed Attributes Defined in Catalog:</span>
        <div id="catalogAllowedAttributes" class="d-flex flex-wrap gap-1">
          <span class="text-muted small">Loading allowed attributes...</span>
        </div>
      </div>

      <div>
        <span class="small text-muted fw-bold d-block mb-1">Permitted Child Tags:</span>
        <div id="catalogPermittedChildren" class="small">
          <span class="text-muted">Loading permitted children...</span>
        </div>
      </div>
    </div>

    <!-- Section 2: Authoring Specification in json-to-tag -->
    <div class="story-card">
      <div class="d-flex justify-content-between align-items-center mb-2 flex-wrap gap-2">
        <h2 class="h6 fw-bold mb-0 text-uppercase text-secondary" style="letter-spacing: 0.05em;">
          <i class="bi bi-code-square me-1"></i> Authoring Specification in <code>json-to-tag</code>
        </h2>
        <div class="d-flex gap-2">
          <button class="btn btn-outline-secondary btn-sm" id="btnCopySample">
            <i class="bi bi-clipboard me-1"></i> Copy Sample JSON
          </button>
          <a href="../../playground/index.html" class="btn btn-outline-primary btn-sm">
            <i class="bi bi-play-circle me-1"></i> Test in Playground
          </a>
        </div>
      </div>
      <p class="small text-muted mb-2">Baseline JSON element specification for compiling this tag:</p>
      <pre class="code-box mb-0"><code id="sampleSpecCode">${sampleJson}</code></pre>
    </div>

    <!-- Section 3: Raw SSOT Slice -->
    <div class="story-card">
      <h2 class="h6 fw-bold mb-2 text-uppercase text-secondary" style="letter-spacing: 0.05em;">
        <i class="bi bi-braces me-1"></i> Exact <code>tags.json</code> Definition Slice
      </h2>
      <pre class="code-box mb-0"><code id="rawCatalogSlice">Loading slice from tags.json...</code></pre>
    </div>

    <!-- Footer -->
    <footer class="text-center text-muted small py-4 border-top">
      <p class="mb-0">
        Powered by <strong>@keshavsoft/json-to-tag</strong> • 
        <a href="../../index.html" class="text-secondary text-decoration-none">Docs Home</a> • 
        <a href="../index.html" class="text-secondary text-decoration-none">Tags Catalog</a> • 
        <a href="../../summary/index.html" class="text-secondary text-decoration-none">Upload JSON (Review)</a> • 
        <a href="../../playground/index.html" class="text-secondary text-decoration-none">Playground</a> • 
        <a href="../tags.json" class="text-secondary text-decoration-none">tags.json (SSOT)</a>
      </p>
    </footer>

  </div>

  <!-- Modular Script Loading SSOT data -->
  <script type="module">
    import { loadTagSchemaFromCatalog } from "./js/loadTagSchemaFromCatalog.js";
    loadTagSchemaFromCatalog({ inTagName: "${tag}", inCatalogUrl: "../tags.json" });

    document.getElementById("selectTag").addEventListener("change", (e) => {
      if (e.target.value) {
        window.location.href = "./" + e.target.value + ".html";
      }
    });

    document.getElementById("btnCopySample").addEventListener("click", async () => {
      const code = document.getElementById("sampleSpecCode").textContent;
      await navigator.clipboard.writeText(code);
      const btn = document.getElementById("btnCopySample");
      btn.innerHTML = '<i class="bi bi-check-lg me-1 text-success"></i> Copied!';
      setTimeout(() => {
        btn.innerHTML = '<i class="bi bi-clipboard me-1"></i> Copy Sample JSON';
      }, 1800);
    });
  </script>
</body>
</html>
`;

    const filePath = path.join(outputDir, `${tag}.html`);
    fs.writeFileSync(filePath, htmlContent, "utf-8");
});

console.log(`Generated ${tagKeys.length} individual tag HTML pages in ${outputDir}.`);
