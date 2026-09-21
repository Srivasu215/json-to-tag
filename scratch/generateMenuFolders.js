import fs from "fs";
import path from "path";

const menuJsonPath = path.resolve("docs/menu/menu.json");
const menuDir = path.resolve("docs/menu");

const menuData = JSON.parse(fs.readFileSync(menuJsonPath, "utf-8"));

const variants = [
    {
        key: "purchasesMenu",
        title: "Purchases Hybrid Menu",
        desc: "Responsive two-tier double header with mobile hamburger collapse, desktop icon navigation, search, and action buttons.",
        badge: "Hybrid & Responsive",
        badgeClass: "bg-success-subtle text-success border border-success-subtle"
    },
    {
        key: "simpleHeader",
        title: "1. Simple Header",
        desc: "Bootstrap 5.3 simple header with brand logo and title on the left and active navigation pills on the right.",
        badge: "Bootstrap Example 1",
        badgeClass: "bg-primary-subtle text-primary border border-primary-subtle"
    },
    {
        key: "centeredNav",
        title: "2. Centered Nav Pills",
        desc: "Bootstrap 5.3 minimalist centered navigation pills bar with active states.",
        badge: "Bootstrap Example 2",
        badgeClass: "bg-primary-subtle text-primary border border-primary-subtle"
    },
    {
        key: "headerWithButtons",
        title: "3. Header with Buttons",
        desc: "Bootstrap 5.3 three-column layout: brand logo on left, centered nav links, and Login/Sign-up buttons on right.",
        badge: "Bootstrap Example 3",
        badgeClass: "bg-primary-subtle text-primary border border-primary-subtle"
    },
    {
        key: "darkHeaderWithSearch",
        title: "4. Dark Header with Search",
        desc: "Bootstrap 5.3 full dark theme header with brand icon, nav links, dark search input, and authentication buttons.",
        badge: "Bootstrap Example 4",
        badgeClass: "bg-dark text-white border border-secondary"
    },
    {
        key: "searchAndProfileDropdown",
        title: "5. Search & Profile Dropdown",
        desc: "Bootstrap 5.3 header featuring nav links, search input, and user avatar dropdown with divider.",
        badge: "Bootstrap Example 5",
        badgeClass: "bg-info-subtle text-info-emphasis border border-info-subtle"
    },
    {
        key: "gridHeaderWithDropdown",
        title: "6. Grid Header (Project Menu & Avatar)",
        desc: "Bootstrap 5.3 CSS grid header with project selector dropdown on left and search with user avatar on right.",
        badge: "Bootstrap Example 6",
        badgeClass: "bg-info-subtle text-info-emphasis border border-info-subtle"
    },
    {
        key: "doubleHeaderWithSearch",
        title: "7. Double Header with Search",
        desc: "Bootstrap 5.3 two-tier header with top navigation/auth bar and secondary bottom search bar with branding.",
        badge: "Bootstrap Example 7",
        badgeClass: "bg-warning-subtle text-warning-emphasis border border-warning-subtle"
    },
    {
        key: "iconNavDoubleHeader",
        title: "8. Icon Nav Double Header",
        desc: "Bootstrap 5.3 two-tier header with top dark bar featuring icon navigation and bottom bar with search and auth.",
        badge: "Bootstrap Example 8",
        badgeClass: "bg-secondary-subtle text-secondary-emphasis border border-secondary-subtle"
    }
];

// Generate individual folders
for (const v of variants) {
    const folderPath = path.join(menuDir, v.key);
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
    }

    // index.js
    const jsContent = `import { buildSpecElement } from "../../dist/min.js";

const render = async ({ inVariantKey, inMountId }) => {
    const localVariantKey = inVariantKey;
    const localMountId = inMountId;

    const response = await fetch("../menu.json");
    const data = await response.json();
    const spec = data[localVariantKey];

    const element = buildSpecElement({ inSpec: spec });
    const mount = document.getElementById(localMountId);
    mount.appendChild(element);

    // Wire collapse if present
    const toggleBtn = element.querySelector('[data-bs-toggle="collapse"]');
    const collapseTarget = element.querySelector('#mobileNavCollapse');
    if (toggleBtn && collapseTarget) {
        toggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (window.bootstrap?.Collapse) {
                const bsCollapse = window.bootstrap.Collapse.getOrCreateInstance(collapseTarget, { toggle: false });
                bsCollapse.toggle();
            } else {
                collapseTarget.classList.toggle('show');
            }
        });
    }
};

render({ inVariantKey: "${v.key}", inMountId: "header-mount" });
`;

    fs.writeFileSync(path.join(folderPath, "index.js"), jsContent, "utf-8");

    // index.html
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${v.title} • @keshavsoft/json-to-tag</title>
  <meta name="description" content="${v.desc}" />

  <!-- Bootstrap 5.3 CSS -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />
  <!-- Bootstrap Icons -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" />
</head>
<body class="bg-light">

  <!-- Minimal Top Navigation Bar -->
  <nav class="navbar bg-white border-bottom py-2 shadow-sm">
    <div class="container-fluid px-3">
      <a class="btn btn-sm btn-outline-secondary" href="../index.html">
        <i class="bi bi-arrow-left me-1"></i> All Headers
      </a>
      <div class="d-none d-sm-flex align-items-center gap-2">
        <span class="badge ${v.badgeClass}">${v.badge}</span>
        <span class="small text-muted font-monospace">menu.json["${v.key}"]</span>
      </div>
      <a class="btn btn-sm btn-outline-primary" href="../menu.json" target="_blank">
        <i class="bi bi-file-earmark-code me-1"></i> View menu.json
      </a>
    </div>
  </nav>

  <!-- Mount point for this header -->
  <div id="header-mount"></div>

  <!-- Content to demonstrate page layout -->
  <main class="container py-5 text-center text-secondary">
    <div class="p-5 bg-white border rounded-3 shadow-sm">
      <h1 class="h3 fw-bold text-dark mb-2">${v.title}</h1>
      <p class="lead text-secondary mb-3 fs-6">${v.desc}</p>
      <div class="d-flex justify-content-center gap-2 flex-wrap mb-4">
        <span class="badge bg-primary-subtle text-primary border border-primary-subtle px-3 py-2">
          <i class="bi bi-code-slash me-1"></i> Key: <code>${v.key}</code>
        </span>
        <span class="badge bg-success-subtle text-success border border-success-subtle px-3 py-2">
          <i class="bi bi-check-circle me-1"></i> Validated Against tags.json
        </span>
      </div>
      <p class="small text-muted mb-0">
        Standalone page in its own dedicated folder. Loads the shared <code>menu.json</code> and extracts only this key.
      </p>
    </div>
  </main>

  <!-- Bootstrap 5.3 JS Bundle -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/bootstrap.bundle.min.js"></script>
  <!-- Simple supporting JS -->
  <script type="module" src="./index.js"></script>
</body>
</html>
`;

    fs.writeFileSync(path.join(folderPath, "index.html"), htmlContent, "utf-8");
}

console.log("Generated all 9 individual folders successfully!");

// Now generate docs/menu/index.html (the clean directory listing all 9 header folders)
const cardsHtml = variants.map(v => `
        <div class="col-md-6 col-lg-4">
          <div class="card h-100 border shadow-sm">
            <div class="card-body d-flex flex-column">
              <div class="d-flex justify-content-between align-items-start mb-2">
                <span class="badge ${v.badgeClass}">${v.badge}</span>
                <code class="small text-muted">${v.key}</code>
              </div>
              <h2 class="h5 fw-bold text-dark mb-2">${v.title}</h2>
              <p class="small text-secondary flex-grow-1 mb-3">${v.desc}</p>
              <a href="./${v.key}/index.html" class="btn btn-primary btn-sm w-100 fw-semibold">
                Open Header Demo <i class="bi bi-arrow-right ms-1"></i>
              </a>
            </div>
          </div>
        </div>
`).join("");

const directoryHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Header Templates Directory • @keshavsoft/json-to-tag</title>
  <meta name="description" content="Dedicated individual folders for each Bootstrap 5.3 header pattern and Purchases menu, powered by a single menu.json." />

  <!-- Bootstrap 5.3 CSS -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />
  <!-- Bootstrap Icons -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" />
</head>
<body class="bg-light p-3 p-md-4">
  <div class="container" style="max-width: 1040px;">

    <!-- Top Navigation Bar -->
    <nav class="navbar navbar-expand-md navbar-dark bg-dark px-3 py-2 rounded-3 mb-4 shadow-sm">
      <div class="container-fluid p-0">
        <a class="navbar-brand fw-bold fs-6 d-flex align-items-center gap-2" href="../index.html">
          <i class="bi bi-tag-fill text-primary"></i> json-to-tag
        </a>
        <div class="navbar-nav d-flex flex-row gap-1 flex-wrap">
          <a class="nav-link px-2" href="../index.html">Home</a>
          <a class="nav-link px-2 text-info" href="../tags/index.html">Tags Catalog</a>
          <a class="nav-link active px-2 fw-semibold text-white" href="./index.html">Headers (9)</a>
          <a class="nav-link px-2" href="../summary/index.html"><i class="bi bi-cloud-arrow-up me-1"></i>Upload JSON</a>
          <a class="nav-link px-2 text-warning" href="../playground/index.html"><i class="bi bi-play-circle me-1"></i>Playground</a>
        </div>
      </div>
    </nav>

    <!-- Header -->
    <div class="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2 pb-3 border-bottom">
      <div>
        <div class="d-flex align-items-center gap-2 mb-1">
          <i class="bi bi-layout-text-window-reverse text-primary fs-3"></i>
          <h1 class="h3 fw-bold mb-0">Header Templates Directory</h1>
          <span class="badge bg-primary-subtle text-primary border border-primary-subtle">9 Variants</span>
        </div>
        <p class="text-muted small mb-0">
          Each header variant lives in its own folder with a simple <code>index.html</code> and <code>index.js</code>, powered by the single <code>menu.json</code>.
        </p>
      </div>
      <div class="d-flex gap-2 flex-wrap">
        <a href="./menu.json" target="_blank" class="btn btn-outline-primary btn-sm">
          <i class="bi bi-file-earmark-code me-1"></i> View menu.json (SSOT)
        </a>
        <a href="https://getbootstrap.com/docs/5.3/examples/headers/" target="_blank" rel="noopener noreferrer" class="btn btn-outline-info btn-sm">
          <i class="bi bi-bootstrap me-1"></i> Bootstrap Docs
        </a>
      </div>
    </div>

    <!-- Cards Grid -->
    <div class="row g-3 mb-4">
      ${cardsHtml}
    </div>

    <!-- Footer -->
    <footer class="text-center text-muted small py-4 border-top">
      <p class="mb-0">
        Powered by <strong>@keshavsoft/json-to-tag</strong> • 
        <a href="../index.html" class="text-secondary text-decoration-none">Docs Home</a> • 
        <a href="../tags/index.html" class="text-secondary text-decoration-none">Tags Catalog</a> • 
        <a href="./menu.json" class="text-secondary text-decoration-none">menu.json</a>
      </p>
    </footer>

  </div>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/bootstrap.bundle.min.js"></script>
</body>
</html>
`;

fs.writeFileSync(path.join(menuDir, "index.html"), directoryHtml, "utf-8");
console.log("Generated docs/menu/index.html directory successfully!");
