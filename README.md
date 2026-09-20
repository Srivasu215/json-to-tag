# @keshavsoft/json-to-tag (v2 Engine)

> **Fast, zero-dependency declarative JSON-to-DOM compiler.**  
> Transforms serializable JSON specifications into live native DOM elements with a 6-stage assembly pipeline.

---

## Table of Contents

- [Overview](#overview)
- [Quick Start](#quick-start)
- [Engine Architecture (`src/v2`)](#engine-architecture-srcv2)
- [Specification Schema](#specification-schema)
- [API Reference](#api-reference)
- [Examples](#examples)
  - [1. Basic Element](#1-basic-element)
  - [2. Form Inputs & Checkbox Sugar](#2-form-inputs--checkbox-sugar)
  - [3. Nested Component (Card)](#3-nested-component-card)
  - [4. Array of Specs (Lists / Tables)](#4-array-of-specs-lists--tables)
  - [5. Browser Global Usage](#5-browser-global-usage)
- [Parameter Naming Convention](#parameter-naming-convention)
- [Additional Documentation](#additional-documentation)
- [License](#license)

---

## Overview

The **v2 engine** (`src/v2`) is a lightweight, pure JavaScript engine that converts JSON element specifications into real DOM nodes (`HTMLElement`, `DocumentFragment`, or arrays of elements).

- **Zero Runtime Dependencies**: Relies exclusively on native browser DOM APIs (`document.createElement`, `classList`, `setAttribute`).
- **Predictable 6-Stage Pipeline**: Modular stages (0 to 5) process tag creation, text, properties, attributes, classes, and children.
- **Dual Consumption**: Import as an ES Module or load via script tag into `window.ks['json-to-dom']`.
- **Hybrid Input Friendly**: Accepts raw JSON specs, string/number text leaves, or existing live DOM `Node` instances.

---

## Quick Start

### 1. ES Module Import

```javascript
import { buildSpecElement } from "./src/v2/index.js";

const spec = {
  tagName: "button",
  classList: "btn btn-primary",
  textContent: "Click Me",
  attributes: {
    type: "button",
    id: "submit-btn"
  }
};

const buttonElement = buildSpecElement({ inSpec: spec });
document.body.appendChild(buttonElement);
```

### 2. Browser Script Tag

When loaded via `<script type="module" src="/src/v2/index.js"></script>`, the engine automatically registers itself onto `globalThis.ks['json-to-dom']`:

```html
<div id="container"></div>

<script type="module" src="/src/v2/index.js"></script>
<script type="module">
  const { buildSpecElement } = window.ks["json-to-dom"];

  const el = buildSpecElement({
    inSpec: {
      tagName: "h1",
      textContent: "Hello from v2!"
    }
  });

  document.getElementById("container").appendChild(el);
</script>
```

---

## Engine Architecture (`src/v2`)

The `src/v2` engine is cleanly structured into orchestration, dispatching, and a modular element assembly line:

```
src/v2/
├── index.js                      # Primary entry point & public exports
├── meta.js                       # Engine metadata (version: "v2.0")
├── registerGlobal.js             # Registers API to globalThis.ks['json-to-dom']
└── buildSpec/                    # Dispatcher & builder logic
    ├── index.js                  # Dispatcher: null guard, node passthrough, array vs single element
    ├── guards.js                 # Type guards (isNullOrUndefined, isDomNode, isSpecArray)
    ├── buildSingleElement.js     # Builds single element and appends children
    ├── buildChildrenNodes.js     # Recursively resolves child spec arrays
    ├── buildSpecArray.js         # Resolves array of top-level specs
    └── elementBuilder/           # 6-Stage Assembly Pipeline:
        ├── index.js              # Pipeline coordinator (stages 0 to 5)
        ├── 0.createElement.js    # Stage 0: document.createElement & "checkbox" alias
        ├── 1.applyTextContent.js # Stage 1: element.textContent injection
        ├── 2.applyProperties.js  # Stage 2: Object.assign direct DOM properties
        ├── 3.applyAttributes.js  # Stage 3: setAttribute / boolean flags / class mapping
        ├── 4.applyClassList.js   # Stage 4: classList.add (space-split strings or arrays)
        └── 5.appendChildren.js   # Stage 5: Appends child nodes and text nodes
```

### The 6-Stage Assembly Line

For each element specification, `elementBuilder` executes in strict sequential order:

| Stage | File | Purpose |
|---|---|---|
| **0. Create** | `0.createElement.js` | Calls `document.createElement(tagName)`. Special case: `"checkbox"` creates `<input type="checkbox">`. |
| **1. Text** | `1.applyTextContent.js` | Sets `element.textContent` when `textContent` is provided. |
| **2. Properties** | `2.applyProperties.js` | Direct JS object assignment via `Object.assign(element, properties)`. |
| **3. Attributes** | `3.applyAttributes.js` | Sets HTML attributes via `setAttribute()`. Handles booleans (`true` sets empty attribute, `false` removes attribute). |
| **4. ClassList** | `4.applyClassList.js` | Adds classes via `element.classList.add(...)`. Accepts a space-delimited string or array of strings. |
| **5. Children** | `5.appendChildren.js` | Attaches immediate `Node` instances and converts string/number primitives to text nodes. |

---

## Specification Schema

Each element specification is a plain JavaScript object with the following optional fields:

| Field | Type | Description | Example |
|---|---|---|---|
| `tagName` | `string` | **Required**. HTML tag name (e.g., `"div"`, `"span"`, `"input"`). Also supports alias `"checkbox"`. | `"button"`, `"checkbox"` |
| `textContent` | `string \| number` | Text content to assign to the element. | `"Submit Form"` |
| `classList` | `string \| string[]` | CSS classes. Can be space-separated string or array of strings. | `"card p-3"`, `["btn", "btn-dark"]` |
| `attributes` | `object` | HTML attributes. Boolean `true` sets empty attribute; `false` removes it. | `{ type: "text", disabled: true }` |
| `properties` | `object` | Direct DOM properties applied with `Object.assign()`. | `{ id: "user-name", value: "John" }` |
| `children` | `array` | Child specs, strings, numbers, or existing DOM `Node`s. | `[{ tagName: "span", textContent: "Hi" }]` |

---

## API Reference

### `buildSpecElement(inArgs)`
Primary function to compile a spec or array of specs into native DOM elements.

- **Parameters**:
  - `inArgs.inSpec` *(or `inArgs.spec`)*: The JSON specification object or array of specs.
  - `inArgs.inShowLog` *(boolean, optional)*: Set `true` to enable runtime console warnings.
- **Returns**: `HTMLElement | Array<HTMLElement> | null`

```javascript
import { buildSpecElement } from "./src/v2/index.js";

const el = buildSpecElement({
  inSpec: { tagName: "h2", textContent: "Dashboard" }
});
```

### Aliases and Secondary Exports

```javascript
import { 
  buildSpecElement, // Primary export & default export
  specToDom,        // Alias of buildSpecElement
  buildSpec,        // Direct buildSpec dispatcher
  meta              // Metadata object: { version: "v2.0", description: ... }
} from "./src/v2/index.js";
```

---

## Examples

### 1. Basic Element
```javascript
import { buildSpecElement } from "./src/v2/index.js";

const badge = buildSpecElement({
  inSpec: {
    tagName: "span",
    classList: "badge bg-success",
    textContent: "Active"
  }
});
```

### 2. Form Inputs & Checkbox Sugar
The engine provides a built-in `"checkbox"` tag shortcut which creates `<input type="checkbox">`:

```javascript
const checkbox = buildSpecElement({
  inSpec: {
    tagName: "checkbox",
    classList: "form-check-input",
    attributes: {
      id: "agree-terms",
      checked: true
    }
  }
});
```

### 3. Nested Component (Card)
```javascript
const cardSpec = {
  tagName: "div",
  classList: "card shadow-sm p-4",
  children: [
    {
      tagName: "h4",
      classList: "card-title text-primary",
      textContent: "User Profile"
    },
    {
      tagName: "p",
      classList: "card-text text-muted",
      textContent: "Manage personal preferences and credentials."
    },
    {
      tagName: "button",
      classList: "btn btn-outline-primary",
      textContent: "Edit Profile",
      attributes: {
        type: "button"
      }
    }
  ]
};

const cardElement = buildSpecElement({ inSpec: cardSpec });
document.getElementById("app").appendChild(cardElement);
```

### 4. Array of Specs (Lists / Tables)
Passing an array returns a flattened array of DOM elements:

```javascript
const tableRowsSpec = [
  {
    tagName: "tr",
    children: [
      { tagName: "td", textContent: "1" },
      { tagName: "td", textContent: "Alice" }
    ]
  },
  {
    tagName: "tr",
    children: [
      { tagName: "td", textContent: "2" },
      { tagName: "td", textContent: "Bob" }
    ]
  }
];

const rowElements = buildSpecElement({ inSpec: tableRowsSpec });
const tbody = document.getElementById("table-body");
rowElements.forEach(row => tbody.appendChild(row));
```

### 5. Browser Global Usage
If you prefer not using a bundler or ES module imports in your script, load the v2 entry point in HTML:

```html
<script type="module" src="./src/v2/index.js"></script>

<script type="module">
  const engine = window.ks["json-to-dom"];
  console.log("Version:", engine.meta.version); // "v2.0"

  const container = document.getElementById("root");
  const el = engine.buildSpecElement({
    inSpec: {
      tagName: "div",
      classList: "alert alert-info",
      textContent: "Loaded successfully!"
    }
  });

  container.appendChild(el);
</script>
```

---

## Parameter Naming Convention

All functions in `src/v2` follow the repository's single-object parameter standard:
- Arguments are passed in a single object with `in`-prefixed property names (`inSpec`, `inChildren`, `inElement`, `inTagName`, etc.).
- Internal functions immediately unpack `in`-properties to `local`-prefixed variables at the top of the function body.
- For developer convenience, top-level `buildSpecElement` accepts either `inSpec` or `spec`:

```javascript
// Recommended standard:
buildSpecElement({ inSpec: mySpec });

// Also supported:
buildSpecElement({ spec: mySpec });
```

---

## Additional Documentation

Detailed documentation for `src/v2` is available in the `docs/` folder:
- [API Reference](docs/v2/API.md) — Comprehensive signatures and function breakdowns.
- [Specification Guide](docs/v2/SPEC_GUIDE.md) — Exhaustive specification schema, field rules, and advanced nesting.

---

## License

[ISC](LICENSE) © [KeshavSoft](https://github.com/keshavsoft)
