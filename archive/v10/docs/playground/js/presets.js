export const playgroundPresets = {
    card: {
        tagName: "div",
        classList: "card shadow-sm border-0",
        children: [
            {
                tagName: "div",
                classList: "card-body p-4",
                children: [
                    {
                        tagName: "span",
                        classList: "badge bg-primary-subtle text-primary mb-2 px-2 py-1",
                        textContent: "FEATURED SPEC"
                    },
                    {
                        tagName: "h4",
                        classList: "card-title fw-bold text-dark",
                        textContent: "Interactive User Card"
                    },
                    {
                        tagName: "p",
                        classList: "card-text text-muted",
                        textContent: "This entire component is compiled from a pure JSON specification using json-to-tag v3."
                    },
                    {
                        tagName: "div",
                        classList: "d-flex gap-2 pt-2",
                        children: [
                            {
                                tagName: "button",
                                classList: "btn btn-primary btn-sm px-3",
                                textContent: "View Details",
                                attributes: { type: "button" }
                            },
                            {
                                tagName: "button",
                                classList: "btn btn-outline-secondary btn-sm px-3",
                                textContent: "Dismiss",
                                attributes: { type: "button" }
                            }
                        ]
                    }
                ]
            }
        ]
    },
    form: {
        tagName: "form",
        classList: "p-3 border rounded bg-white shadow-sm",
        attributes: { onsubmit: "return false;" },
        children: [
            {
                tagName: "h5",
                classList: "fw-bold mb-3 text-dark",
                textContent: "Newsletter Subscription"
            },
            {
                tagName: "div",
                classList: "mb-3",
                children: [
                    {
                        tagName: "label",
                        classList: "form-label small fw-semibold",
                        textContent: "Email Address",
                        attributes: { for: "sample-email" }
                    },
                    {
                        tagName: "input",
                        classList: "form-control",
                        attributes: {
                            id: "sample-email",
                            type: "email",
                            placeholder: "name@example.com",
                            required: true
                        }
                    }
                ]
            },
            {
                tagName: "div",
                classList: "form-check mb-3",
                children: [
                    {
                        tagName: "checkbox",
                        classList: "form-check-input",
                        attributes: { id: "sample-check", checked: true }
                    },
                    {
                        tagName: "label",
                        classList: "form-check-label small text-muted",
                        textContent: "Send me product updates and release notes",
                        attributes: { for: "sample-check" }
                    }
                ]
            },
            {
                tagName: "button",
                classList: "btn btn-success btn-sm px-3 fw-semibold",
                textContent: "Subscribe Now",
                attributes: { type: "submit" }
            }
        ]
    },
    table: {
        tagName: "table",
        classList: "table table-hover table-bordered align-middle mb-0",
        children: [
            {
                tagName: "thead",
                classList: "table-light",
                children: [
                    {
                        tagName: "tr",
                        children: [
                            { tagName: "th", textContent: "User ID" },
                            { tagName: "th", textContent: "Full Name" },
                            { tagName: "th", textContent: "Role" },
                            { tagName: "th", textContent: "Status" }
                        ]
                    }
                ]
            },
            {
                tagName: "tbody",
                children: [
                    {
                        tagName: "tr",
                        children: [
                            { tagName: "td", textContent: "#1001" },
                            { tagName: "td", textContent: "Keshav Soft" },
                            { tagName: "td", textContent: "Administrator" },
                            {
                                tagName: "td",
                                children: [
                                    {
                                        tagName: "span",
                                        classList: "badge bg-success-subtle text-success border border-success-subtle",
                                        textContent: "Active"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    },
    badge: {
        tagName: "div",
        classList: "d-flex gap-2 flex-wrap p-2",
        children: [
            { tagName: "span", classList: "badge bg-primary", textContent: "Primary" },
            { tagName: "span", classList: "badge bg-secondary", textContent: "Secondary" },
            { tagName: "span", classList: "badge bg-success", textContent: "Success" },
            { tagName: "span", classList: "badge bg-danger", textContent: "Danger" },
            { tagName: "span", classList: "badge bg-warning text-dark", textContent: "Warning" },
            { tagName: "span", classList: "badge bg-info text-dark", textContent: "Info" }
        ]
    }
};

export default playgroundPresets;
