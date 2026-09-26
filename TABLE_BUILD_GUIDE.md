# How to Build an HTML Table Using CDN (json-to-spec & json-to-tag)

## 1. Overview & Objective
This document explains how to dynamically construct and render a responsive, modern HTML table using **pure browser CDN links** without requiring npm installation, local build tools, or complex frontend frameworks.

The implementation relies on two complementary CDN engines:
1. **`json-to-spec` (Compiler)**: Merges raw data (`data.json`) into an abstract UI blueprint (`structure.json`).
2. **`json-to-tag` (DOM Engine)**: Transforms the compiled specification into live, interactive HTML DOM elements and mounts them on the page.

---

## 2. Core CDN Links

| Tool | CDN URL | Role |
| :--- | :--- | :--- |
| **Styling (Bootstrap 5)** | `https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css` | Provides modern, responsive table styling (borders, hover, stripes) |
| **json-to-spec** | `https://keshavsoft.github.io/json-to-spec/dist/v23/min.js` | Compiles structure blueprint + raw data |
| **json-to-tag** | `https://keshavsoft.github.io/json-to-tag/dist/v4/min.js` | Converts the compiled spec into native HTML DOM nodes |

---

## 3. Architecture & Data Flow

```
+---------------------------+       +---------------------------+
|        data.json          |       |      structure.json       |
|  (Columns definitions &   |   +   |   (Table HTML blueprint   |
|         Row records)      |       |    & loop directives)     |
+---------------------------+       +---------------------------+
               \                                 /
                \                               /
                 v                             v
           +-----------------------------------------+
           |       json-to-spec (v23) CDN            |
           |   buildSpecElement({ structure, data }) |
           +-----------------------------------------+
                                |
                                v Compiled Spec Object
           +-----------------------------------------+
           |        json-to-tag (v4) CDN             |
           |   window.ks.jsonToTag.buildSpecElement()|
           +-----------------------------------------+
                                |
                                v Native HTML DOM Element
           +-----------------------------------------+
           |  Mount to DOM Container: <div id="table">|
           +-----------------------------------------+
```

---

## 4. Implementation Options

### Option A: Complete Standalone HTML (Single-File Solution)
*Recommended for quick sharing and instant preview without needing a local web server (works on double-click).*

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Dynamic Table via CDN</title>

  <!-- 1. Bootstrap 5 CSS CDN for responsive table styles -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light py-4">
  <main class="container">
    <div class="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom">
      <div>
        <h1 id="head1" class="h3 fw-bold mb-1">Dynamic Table (CDN Engine)</h1>
        <p class="text-muted small mb-0">Built using <code>json-to-spec</code> and <code>json-to-tag</code> via CDN</p>
      </div>
      <span class="badge bg-primary text-white px-3 py-2 rounded-pill">CDN Powered</span>
    </div>

    <!-- Mount point for the rendered table -->
    <div id="table"></div>

    <!-- Loading / Status indicator -->
    <div id="dom-render-container">
      <div class="text-center py-5 text-muted">
        <div class="spinner-border spinner-border-sm text-primary me-2" role="status"></div>
        Building table via CDN...
      </div>
    </div>
  </main>

  <!-- 2. CDN JavaScript Modules -->
  <script type="module">
    // Load json-to-spec (v23) and json-to-tag (v4) directly from CDN
    import buildSpecElement from "https://keshavsoft.github.io/json-to-spec/dist/v23/min.js";
    import "https://keshavsoft.github.io/json-to-tag/dist/v4/min.js";

    // Blueprint: Defines table markup and templating loops
    const structure = {
      "tagName": "div",
      "attributes": {
        "class": "card shadow-sm"
      },
      "children": [
        {
          "tagName": "div",
          "attributes": {
            "class": "card-body p-4"
          },
          "children": [
            {
              "tagName": "table",
              "attributes": {
                "class": "table table-hover table-striped mb-0"
              },
              "children": [
                {
                  "tagName": "thead",
                  "children": [
                    {
                      "tagName": "tr",
                      "jsonToSpec": {
                        "operation": "loopArray",
                        "source": "columns",
                        "template": {
                          "tagName": "th",
                          "attributes": { "scope": "col" },
                          "textContent": "${title}"
                        }
                      },
                      "children": []
                    }
                  ]
                },
                {
                  "tagName": "tbody",
                  "jsonToSpec": {
                    "operation": "loopArray",
                    "source": "data",
                    "template": {
                      "tagName": "tr",
                      "jsonToSpec": {
                        "operation": "loopObject",
                        "source": "data",
                        "template": {
                          "tagName": "td",
                          "textContent": "${value}"
                        }
                      },
                      "children": []
                    }
                  },
                  "children": []
                }
              ]
            }
          ]
        }
      ]
    };

    // Raw Data: Column configurations and table records
    const data = {
      "id": "table1",
      "columns": [
        { "columnName": "id", "title": "#", "field": "id", "isVisible": true },
        { "columnName": "First", "title": "First", "field": "First", "isVisible": true },
        { "columnName": "Last", "title": "Last", "field": "Last", "isVisible": true },
        { "columnName": "Handle", "title": "Handle", "field": "Handle", "isVisible": true }
      ],
      "data": [
        { "id": "1", "First": "Mark", "Last": "Otto", "Handle": "@mdo" },
        { "id": "2", "First": "Jacob", "Last": "Thornton", "Handle": "@fat" },
        { "id": "3", "First": "John", "Last": "Doe", "Handle": "@social" }
      ]
    };

    function renderTable() {
      try {
        // Step 1: Merge blueprint + data using json-to-spec
        let specAsJsonToDom = buildSpecElement({ specJson: structure, dataJson: data });

        if (!("tagName" in specAsJsonToDom)) {
          specAsJsonToDom = specAsJsonToDom.children;
        }

        // Step 2: Convert spec to live DOM elements using json-to-tag
        const content = window.ks.jsonToTag.buildSpecElement(specAsJsonToDom);

        // Step 3: Append rendered element to the page
        const container = document.getElementById("table");
        if (container) {
          container.innerHTML = "";
          container.append(content);
        }

        // Hide loading indicator
        const loader = document.getElementById("dom-render-container");
        if (loader) loader.style.display = "none";

        // Display version badge
        const head1 = document.getElementById("head1");
        const version = window?.ks?.["json-to-spec"]?.meta?.version;
        if (version && head1) {
          head1.innerHTML += ` <span class="badge bg-secondary fs-6">${version}</span>`;
        }
      } catch (err) {
        const container = document.getElementById("dom-render-container");
        if (container) {
          container.innerHTML = `<div class="alert alert-danger" role="alert"><strong>Error:</strong> ${err.message}</div>`;
        }
      }
    }

    // Run table rendering
    renderTable();
  </script>
</body>
</html>
```

---

### Option B: Modular Multi-File Architecture
*Recommended for production projects where structure and data come from external APIs or separate JSON files.*

#### 1. `index.html`
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Dynamic Table via CDN</title>

  <!-- Bootstrap 5 CSS CDN for styling -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>

<body class="bg-light py-4">
  <main class="container">
    <div class="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom">
      <div>
        <h1 id="head1" class="h3 fw-bold mb-1">Dynamic Table (CDN Engine)</h1>
        <p class="text-muted small mb-0">Built using <code>json-to-spec</code> and <code>json-to-tag</code> via CDN</p>
      </div>
      <span class="badge bg-primary text-white px-3 py-2 rounded-pill">CDN Powered</span>
    </div>

    <!-- Table render container -->
    <div id="table"></div>

    <!-- Loading indicator (automatically hidden after render) -->
    <div id="dom-render-container">
      <div class="text-center py-5 text-muted">
        <div class="spinner-border spinner-border-sm text-primary me-2" role="status"></div>
        Loading table data...
      </div>
    </div>
  </main>

  <script type="module" src="./index.js"></script>
</body>
</html>
```

#### 2. `index.js`
```javascript
import buildSpecElement from "https://keshavsoft.github.io/json-to-spec/dist/v23/min.js";
import "https://keshavsoft.github.io/json-to-tag/dist/v4/min.js";

const folder = "input";
const htmlId = "table";

// 1. Fetch JSON files asynchronously
const loadInput = async () => {
  const [structure, data] = await Promise.all([
    fetch(`./${folder}/structure.json`).then((r) => r.json()),
    fetch(`./${folder}/data.json`).then((r) => r.json())
  ]);

  return { structure, data };
};

// 2. Render table into DOM
const render = (structure, data) => {
  let specAsJsonToDom = buildSpecElement({ specJson: structure, dataJson: data });

  if (!("tagName" in specAsJsonToDom)) {
    specAsJsonToDom = specAsJsonToDom.children;
  }

  const container = document.getElementById(htmlId);
  if (container) container.innerHTML = "";

  const content = window.ks.jsonToTag.buildSpecElement(specAsJsonToDom);
  container.append(content);

  // Hide loading indicator
  const loader = document.getElementById("dom-render-container");
  if (loader) loader.style.display = "none";
};

// 3. Initialize
const start = async () => {
  try {
    const { structure, data } = await loadInput();
    render(structure, data);
  } catch (err) {
    const container = document.getElementById("dom-render-container");
    if (container) {
      container.innerHTML = `<div class="alert alert-danger" role="alert"><strong>Error:</strong> ${err.message}</div>`;
    }
  }
};

start();

const head1 = document.getElementById("head1");
const version = window?.ks?.["json-to-spec"]?.meta?.version;
if (version && head1) {
  head1.innerHTML += ` <span class="badge bg-secondary fs-6">${version}</span>`;
}
```

---

## 5. How It Works (Step-by-Step Breakdown)

1. **Header Rendering (`columns` loop)**:
   In `structure.json`, under `thead > tr`, the `jsonToSpec` directive iterates over the `columns` array from `data.json`:
   ```json
   "jsonToSpec": {
     "operation": "loopArray",
     "source": "columns",
     "template": {
       "tagName": "th",
       "attributes": { "scope": "col" },
       "textContent": "${title}"
     }
   }
   ```
   For each column in `data.json`, a `<th>` element is created with the title (`#`, `First`, `Last`, `Handle`).

2. **Row & Cell Rendering (`data` loop)**:
   Under `tbody`, the outer loop iterates over the `data` records array:
   ```json
   "jsonToSpec": {
     "operation": "loopArray",
     "source": "data",
     "template": {
       "tagName": "tr",
       "jsonToSpec": {
         "operation": "loopObject",
         "source": "data",
         "template": {
           "tagName": "td",
           "textContent": "${value}"
         }
       }
     }
   }
   ```
   For each record in the data array, a `<tr>` is created, and each key-value pair inside that record produces a `<td>` cell.

3. **DOM Mounting**:
   The resulting DOM node is created via `window.ks.jsonToTag.buildSpecElement(...)` and appended directly into the container element `<div id="table">`.

---

## 6. How to Run & Verify

1. **Option 1 (Standalone File)**:
   Open `table4/standalone.html` directly in any web browser (Chrome, Edge, Firefox, Safari). No server required!
