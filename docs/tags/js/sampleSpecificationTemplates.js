export const sampleSpecificationTemplates = {
    div: { tagName: "div", classList: "container p-3", children: [] },
    input: { tagName: "input", attributes: { type: "text", placeholder: "Enter text..." } },
    checkbox: { tagName: "checkbox", attributes: { type: "checkbox", checked: true } },
    colgroup: { tagName: "colgroup", children: [{ tagName: "col", attributes: { width: "150px" } }] },
    col: { tagName: "col", attributes: { width: "150px" } },
    label: { tagName: "label", attributes: { for: "input-id" }, textContent: "User Label" },
    form: { tagName: "form", attributes: { action: "/submit", method: "POST" }, children: [] },
    select: { tagName: "select", attributes: { name: "role" }, children: [{ tagName: "option", textContent: "Admin" }] },
    p: { tagName: "p", classList: "lead", textContent: "Paragraph content." },
    h1: { tagName: "h1", classList: "fw-bold", textContent: "Main Title" },
    h2: { tagName: "h2", textContent: "Section Header" },
    span: { tagName: "span", classList: "badge bg-info", textContent: "Inline badge" },
    img: { tagName: "img", attributes: { src: "image.png", alt: "Logo", width: "120" } },
    button: { tagName: "button", attributes: { type: "button" }, classList: "btn btn-primary", textContent: "Click Me" },
    table: { tagName: "table", attributes: { border: "1" }, classList: "table", children: [] },
    thead: { tagName: "thead", children: [{ tagName: "tr", children: [] }] },
    tbody: { tagName: "tbody", children: [{ tagName: "tr", children: [] }] },
    tfoot: { tagName: "tfoot", children: [{ tagName: "tr", children: [] }] },
    tr: { tagName: "tr", children: [{ tagName: "td", textContent: "Data" }] },
    th: { tagName: "th", attributes: { scope: "col" }, textContent: "Header Name" },
    td: { tagName: "td", textContent: "Cell Value" },
    datalist: { tagName: "datalist", attributes: { id: "items" }, children: [{ tagName: "option", attributes: { value: "Choice 1" } }] },
    option: { tagName: "option", attributes: { value: "1" }, textContent: "Option Label" }
};

export default sampleSpecificationTemplates;
