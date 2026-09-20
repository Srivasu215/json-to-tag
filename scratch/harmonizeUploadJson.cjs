const fs = require('fs');
const path = require('path');

const docsDir = path.resolve(__dirname, '../docs');

// 1. Update docs/tags/index.html
const tagsIndexPath = path.join(docsDir, 'tags/index.html');
let tagsIndexHtml = fs.readFileSync(tagsIndexPath, 'utf8');

// Update navbar
tagsIndexHtml = tagsIndexHtml.replace(
  '<a class="nav-link px-2" href="../summary/index.html">Spec Review</a>',
  '<a class="nav-link px-2" href="../summary/index.html"><i class="bi bi-cloud-arrow-up me-1"></i>Upload JSON (Review)</a>'
);

// Update header action buttons to include Upload JSON Spec button
if (!tagsIndexHtml.includes('Upload JSON Spec')) {
  tagsIndexHtml = tagsIndexHtml.replace(
    `<div class="d-flex gap-2 flex-wrap">
        <a href="./individualTags/index.html" class="btn btn-primary btn-sm">`,
    `<div class="d-flex gap-2 flex-wrap">
        <a href="../summary/index.html" class="btn btn-warning text-dark btn-sm fw-semibold">
          <i class="bi bi-cloud-arrow-up me-1"></i> Upload JSON Spec
        </a>
        <a href="./individualTags/index.html" class="btn btn-primary btn-sm">`
  );
}

// Update footer
tagsIndexHtml = tagsIndexHtml.replace(
  '<a href="../summary/index.html" class="text-secondary text-decoration-none">Spec Review</a>',
  '<a href="../summary/index.html" class="text-secondary text-decoration-none">Upload JSON (Review)</a>'
);
fs.writeFileSync(tagsIndexPath, tagsIndexHtml, 'utf8');
console.log('Updated docs/tags/index.html');

// 2. Update docs/index.html
const indexPath = path.join(docsDir, 'index.html');
let indexHtml = fs.readFileSync(indexPath, 'utf8');
indexHtml = indexHtml.replace(
  '<a class="nav-link px-2" href="./summary/index.html">Spec Review</a>',
  '<a class="nav-link px-2" href="./summary/index.html"><i class="bi bi-cloud-arrow-up me-1"></i>Upload JSON (Review)</a>'
);
indexHtml = indexHtml.replace(
  '<h3 class="h5 fw-bold mb-0">Specification Review &amp; Summary Hub</h3>',
  '<h3 class="h5 fw-bold mb-0"><i class="bi bi-cloud-arrow-up text-warning me-2"></i>Upload JSON Specification &amp; Review Hub</h3>'
);
indexHtml = indexHtml.replace(
  `<a href="./summary/index.html" class="btn btn-outline-warning text-dark btn-sm px-3 fw-semibold">
            Open Review Hub <i class="bi bi-arrow-right ms-1"></i>
          </a>`,
  `<a href="./summary/index.html" class="btn btn-warning text-dark btn-sm px-3 fw-semibold">
            <i class="bi bi-cloud-arrow-up me-1"></i> Upload JSON Spec <i class="bi bi-arrow-right ms-1"></i>
          </a>`
);
indexHtml = indexHtml.replace(
  '<a href="./summary/index.html" class="text-secondary text-decoration-none">Spec Review</a>',
  '<a href="./summary/index.html" class="text-secondary text-decoration-none">Upload JSON (Review)</a>'
);
fs.writeFileSync(indexPath, indexHtml, 'utf8');
console.log('Updated docs/index.html');

// 3. Update docs/playground/index.html
const playgroundPath = path.join(docsDir, 'playground/index.html');
let playgroundHtml = fs.readFileSync(playgroundPath, 'utf8');
playgroundHtml = playgroundHtml.replace(
  '<a class="nav-link px-2" href="../summary/index.html">Spec Review</a>',
  '<a class="nav-link px-2" href="../summary/index.html"><i class="bi bi-cloud-arrow-up me-1"></i>Upload JSON (Review)</a>'
);
playgroundHtml = playgroundHtml.replace(
  '<a href="../summary/index.html" class="text-secondary text-decoration-none">Spec Review</a>',
  '<a href="../summary/index.html" class="text-secondary text-decoration-none">Upload JSON (Review)</a>'
);
fs.writeFileSync(playgroundPath, playgroundHtml, 'utf8');
console.log('Updated docs/playground/index.html');

// 4. Update docs/summary/index.html
const summaryIndexPath = path.join(docsDir, 'summary/index.html');
let summaryIndexHtml = fs.readFileSync(summaryIndexPath, 'utf8');
summaryIndexHtml = summaryIndexHtml.replace(
  '<a class="nav-link active px-2 fw-semibold text-warning" href="./index.html">Spec Review</a>',
  '<a class="nav-link active px-2 fw-semibold text-warning" href="./index.html"><i class="bi bi-cloud-arrow-up me-1"></i>Upload JSON (Review)</a>'
);
summaryIndexHtml = summaryIndexHtml.replace(
  '<i class="bi bi-pie-chart-fill text-primary me-2"></i>Specification Summary Hub',
  '<i class="bi bi-cloud-arrow-up-fill text-warning me-2"></i>Upload JSON Specification &amp; Review Hub'
);
summaryIndexHtml = summaryIndexHtml.replace(
  '<label for="jsonFileInput" class="form-label fw-bold mb-2">Select JSON Specification File:</label>',
  '<label for="jsonFileInput" class="form-label fw-bold mb-2 fs-6 text-dark"><i class="bi bi-cloud-arrow-up text-primary me-2"></i>Upload JSON Specification File:</label>'
);
summaryIndexHtml = summaryIndexHtml.replace(
  '<a href="./index.html" class="text-secondary text-decoration-none">Spec Review</a>',
  '<a href="./index.html" class="text-secondary text-decoration-none">Upload JSON (Review)</a>'
);
fs.writeFileSync(summaryIndexPath, summaryIndexHtml, 'utf8');
console.log('Updated docs/summary/index.html');

// 5. Update docs/summary/{tags-only, not-present, present}.html
const summaryPages = ['tags-only.html', 'not-present.html', 'present.html'];
for (const page of summaryPages) {
  const pPath = path.join(docsDir, 'summary', page);
  if (fs.existsSync(pPath)) {
    let html = fs.readFileSync(pPath, 'utf8');
    html = html.replace(
      '<a class="nav-link active px-2 fw-semibold text-warning" href="./index.html">Spec Review</a>',
      '<a class="nav-link active px-2 fw-semibold text-warning" href="./index.html"><i class="bi bi-cloud-arrow-up me-1"></i>Upload JSON (Review)</a>'
    );
    html = html.replace(
      '<label for="jsonFileInput" class="form-label fw-bold mb-2">Select JSON Specification File:</label>',
      '<label for="jsonFileInput" class="form-label fw-bold mb-2 fs-6 text-dark"><i class="bi bi-cloud-arrow-up text-primary me-2"></i>Upload JSON Specification File:</label>'
    );
    html = html.replace(
      '<a href="./index.html" class="text-secondary text-decoration-none">Spec Review</a>',
      '<a href="./index.html" class="text-secondary text-decoration-none">Upload JSON (Review)</a>'
    );
    fs.writeFileSync(pPath, html, 'utf8');
    console.log(`Updated docs/summary/${page}`);
  }
}

// 6. Update all individualTags files
const individualTagsDir = path.join(docsDir, 'tags/individualTags');
const files = fs.readdirSync(individualTagsDir);
for (const file of files) {
  if (file.endsWith('.html')) {
    const filePath = path.join(individualTagsDir, file);
    let html = fs.readFileSync(filePath, 'utf8');
    html = html.replace(
      '<a class="nav-link px-2" href="../../summary/index.html">Spec Review</a>',
      '<a class="nav-link px-2" href="../../summary/index.html"><i class="bi bi-cloud-arrow-up me-1"></i>Upload JSON (Review)</a>'
    );
    html = html.replace(
      '<a href="../../summary/index.html" class="text-secondary text-decoration-none">Spec Review</a>',
      '<a href="../../summary/index.html" class="text-secondary text-decoration-none">Upload JSON (Review)</a>'
    );
    fs.writeFileSync(filePath, html, 'utf8');
  }
}
console.log(`Updated ${files.length} individual tag pages`);
