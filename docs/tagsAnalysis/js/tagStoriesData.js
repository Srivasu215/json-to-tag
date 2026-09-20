export const tagStoriesData = {
    div: {
        summary: "Universal generic block container element for flow layout, grouping, and styling wrappers.",
        semantics: "The <div> element has no special semantic meaning of its own. It is used as a styling container or structural block wrapper in web components and layouts.",
        bestPractices: "Use <div> for layout division, flexbox/grid containers, and cards. For specific semantic sections, consider headings, forms, or tables as appropriate."
    },
    input: {
        summary: "Fundamental interactive user data entry control and form field.",
        semantics: "The <input> element is a void (self-closing) element that accepts data from users. It does not enclose children or textContent; all data is managed via attributes.",
        bestPractices: "Always pair with a <label> using the for/id attribute association. Set appropriate type ('text', 'email', 'number', 'password') for mobile keyboard hints and native validation."
    },
    checkbox: {
        summary: "Specialized boolean toggle input for multi-selection and agreement checks.",
        semantics: "In @keshavsoft/json-to-tag, 'checkbox' is a dedicated alias for <input type='checkbox'>. It is a void element.",
        bestPractices: "Use checked: true to mark selected by default. Always provide an accessible text label or wrap inside a <label> container."
    },
    label: {
        summary: "Accessible text caption and click target for form controls.",
        semantics: "The <label> tag associates explanatory text with an interactive element. Clicking the label shifts focus to or toggles the linked input.",
        bestPractices: "Set the for attribute to the id of the target input, or nest the input directly inside the label as a child."
    },
    form: {
        summary: "Form container grouping user input controls for interactive submission.",
        semantics: "The <form> element encloses interactive controls (input, select, button) and specifies submission targets via action and method.",
        bestPractices: "Use novalidate if managing custom client-side validation, and specify enctype='multipart/form-data' when submitting files."
    },
    select: {
        summary: "Dropdown selection control presenting a menu of options.",
        semantics: "The <select> element provides a drop-down list of choices. In @keshavsoft/json-to-tag, its permitted children are strictly <option> elements.",
        bestPractices: "Use multiple for multi-select, and size to define the number of visible rows."
    },
    option: {
        summary: "Individual selectable item inside a <select> or <datalist>.",
        semantics: "The <option> element defines an item in a selection list. It allows textContent for user-visible text and a value attribute for form submission.",
        bestPractices: "Set selected: true on the default option and disabled for non-selectable placeholder items."
    },
    datalist: {
        summary: "Predefined autocomplete recommendation container for <input> controls.",
        semantics: "Contains a set of <option> elements that represent recommended options available to an <input list='...'> control.",
        bestPractices: "Set an id on <datalist> and link it to an <input> using its list attribute."
    },
    button: {
        summary: "Clickable interactive button element to trigger actions or form submissions.",
        semantics: "The <button> element represents a clickable button. Supports textContent and child elements (such as icons or badges).",
        bestPractices: "Explicitly specify type ('button', 'submit', 'reset') to prevent accidental form submissions on Enter keypress."
    },
    p: {
        summary: "Structural paragraph text block for running prose.",
        semantics: "The <p> element represents a paragraph of text. Browsers automatically apply standard vertical margins before and after paragraphs.",
        bestPractices: "Allows textContent and inline child elements (like <span>). Do not nest block-level elements like <div> or <table> inside."
    },
    h1: {
        summary: "Top-level heading representing the primary title of a page or major section.",
        semantics: "The <h1> element represents the highest level section heading. Search engines and screen readers use it to construct the document outline.",
        bestPractices: "Maintain a single <h1> per page for accessibility and SEO hierarchy."
    },
    h2: {
        summary: "Second-level section heading for major content divisions.",
        semantics: "The <h2> element represents subheadings subordinate to <h1>.",
        bestPractices: "Use to introduce distinct subsections of the page."
    },
    span: {
        summary: "Generic inline container for phrasing content, badges, and text styling.",
        semantics: "The <span> element is an inline container with no semantic meaning of its own, ideal for badges, highlights, and icons.",
        bestPractices: "Use with classList for utility classes like badges, colored text, or icon wrappers."
    },
    img: {
        summary: "Embedded image void element.",
        semantics: "The <img> element embeds an image. It is a void/leaf element that does not permit textContent or child elements.",
        bestPractices: "Always provide a meaningful alt attribute for accessibility. Use loading='lazy' for off-screen images to improve performance."
    },
    table: {
        summary: "Tabular data container representing information in a two-dimensional grid.",
        semantics: "The <table> element represents tabular data — that is, information expressed in rows and columns.",
        bestPractices: "Structure with <thead>, <tbody>, and optional <colgroup> or <tfoot> for clean DOM separation."
    },
    colgroup: {
        summary: "Table column group defining structural column specifications.",
        semantics: "The <colgroup> element specifies a group of one or more columns in a table for formatting. Strictly permits <col> children.",
        bestPractices: "Place immediately after <caption> (if present) and before <thead> to define column widths."
    },
    col: {
        summary: "Table column void element defining styles and widths for table columns.",
        semantics: "The <col> element is a void element placed inside <colgroup> to specify column-specific widths and styles.",
        bestPractices: "Use width attribute (e.g. width='120px') or style to fix table column sizing."
    },
    thead: {
        summary: "Table header section enclosing row(s) of column header cells.",
        semantics: "The <thead> element encapsulates a set of table rows (<tr>) that indicate the column headings of the table.",
        bestPractices: "Permits <tr> children containing <th> header cells."
    },
    tbody: {
        summary: "Table body section containing the primary tabular data rows.",
        semantics: "The <tbody> element encapsulates a set of table rows (<tr>) that contain the primary body data of the table.",
        bestPractices: "Encapsulates multiple <tr> elements for organized table rendering."
    },
    tfoot: {
        summary: "Table footer section enclosing summary or total rows.",
        semantics: "The <tfoot> element encapsulates summary rows (<tr>) for a table, such as sums or averages.",
        bestPractices: "Contains <tr> elements with summary cells (<td>/<th>)."
    },
    tr: {
        summary: "Table row container enclosing header (<th>) or data (<td>) cells.",
        semantics: "The <tr> element defines a row of cells in a table.",
        bestPractices: "Strictly permits <th> and <td> cells as children."
    },
    th: {
        summary: "Table header cell defining a title for a column or row.",
        semantics: "The <th> element defines a cell as the header of a group of table cells. Its text is rendered bold and centered by default.",
        bestPractices: "Use scope='col' or scope='row' to assist screen readers in associating data cells with headers."
    },
    td: {
        summary: "Table data cell containing a single data value in a tabular grid.",
        semantics: "The <td> element defines a cell of a table that contains data.",
        bestPractices: "Supports colspan and rowspan for multi-column or multi-row cell spanning."
    }
};

export default tagStoriesData;
