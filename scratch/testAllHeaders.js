import fs from "fs";
import path from "path";
import { reviewSpecV2 } from "../src/v3/review/index.js";

// Read current menu.json
const currentMenu = JSON.parse(fs.readFileSync("docs/menu/menu.json", "utf-8"));

// Define all 9 variants
const allHeaders = {
    simpleHeader: {
        tagName: "div",
        attributes: { class: "container" },
        children: [
            {
                tagName: "header",
                attributes: { class: "d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom" },
                children: [
                    {
                        tagName: "a",
                        attributes: {
                            href: "#/",
                            class: "d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
                        },
                        children: [
                            {
                                tagName: "i",
                                attributes: { class: "bi bi-bootstrap-fill fs-2 me-2 text-primary" }
                            },
                            {
                                tagName: "span",
                                attributes: { class: "fs-4 fw-semibold" },
                                textContent: "Simple header"
                            }
                        ]
                    },
                    {
                        tagName: "ul",
                        attributes: { class: "nav nav-pills" },
                        children: [
                            { tagName: "li", attributes: { class: "nav-item" }, children: [{ tagName: "a", attributes: { href: "#/", class: "nav-link active", "aria-current": "page" }, textContent: "Home" }] },
                            { tagName: "li", attributes: { class: "nav-item" }, children: [{ tagName: "a", attributes: { href: "#/features", class: "nav-link" }, textContent: "Features" }] },
                            { tagName: "li", attributes: { class: "nav-item" }, children: [{ tagName: "a", attributes: { href: "#/pricing", class: "nav-link" }, textContent: "Pricing" }] },
                            { tagName: "li", attributes: { class: "nav-item" }, children: [{ tagName: "a", attributes: { href: "#/faqs", class: "nav-link" }, textContent: "FAQs" }] },
                            { tagName: "li", attributes: { class: "nav-item" }, children: [{ tagName: "a", attributes: { href: "#/about", class: "nav-link" }, textContent: "About" }] }
                        ]
                    }
                ]
            }
        ]
    },
    centeredNav: {
        tagName: "div",
        attributes: { class: "container" },
        children: [
            {
                tagName: "header",
                attributes: { class: "d-flex justify-content-center py-3 mb-4 border-bottom" },
                children: [
                    {
                        tagName: "ul",
                        attributes: { class: "nav nav-pills" },
                        children: [
                            { tagName: "li", attributes: { class: "nav-item" }, children: [{ tagName: "a", attributes: { href: "#/", class: "nav-link active", "aria-current": "page" }, textContent: "Home" }] },
                            { tagName: "li", attributes: { class: "nav-item" }, children: [{ tagName: "a", attributes: { href: "#/features", class: "nav-link" }, textContent: "Features" }] },
                            { tagName: "li", attributes: { class: "nav-item" }, children: [{ tagName: "a", attributes: { href: "#/pricing", class: "nav-link" }, textContent: "Pricing" }] },
                            { tagName: "li", attributes: { class: "nav-item" }, children: [{ tagName: "a", attributes: { href: "#/faqs", class: "nav-link" }, textContent: "FAQs" }] },
                            { tagName: "li", attributes: { class: "nav-item" }, children: [{ tagName: "a", attributes: { href: "#/about", class: "nav-link" }, textContent: "About" }] }
                        ]
                    }
                ]
            }
        ]
    },
    headerWithButtons: {
        tagName: "div",
        attributes: { class: "container" },
        children: [
            {
                tagName: "header",
                attributes: { class: "d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom" },
                children: [
                    {
                        tagName: "div",
                        attributes: { class: "col-md-3 mb-2 mb-md-0" },
                        children: [
                            {
                                tagName: "a",
                                attributes: { href: "#/", class: "d-inline-flex link-body-emphasis text-decoration-none align-items-center" },
                                children: [
                                    { tagName: "i", attributes: { class: "bi bi-bootstrap-fill fs-2 text-primary me-2" } },
                                    { tagName: "span", attributes: { class: "fs-5 fw-bold" }, textContent: "Brand" }
                                ]
                            }
                        ]
                    },
                    {
                        tagName: "ul",
                        attributes: { class: "nav col-12 col-md-auto mb-2 justify-content-center mb-md-0" },
                        children: [
                            { tagName: "li", children: [{ tagName: "a", attributes: { href: "#/", class: "nav-link px-2 link-secondary fw-semibold" }, textContent: "Home" }] },
                            { tagName: "li", children: [{ tagName: "a", attributes: { href: "#/features", class: "nav-link px-2 link-body-emphasis" }, textContent: "Features" }] },
                            { tagName: "li", children: [{ tagName: "a", attributes: { href: "#/pricing", class: "nav-link px-2 link-body-emphasis" }, textContent: "Pricing" }] },
                            { tagName: "li", children: [{ tagName: "a", attributes: { href: "#/faqs", class: "nav-link px-2 link-body-emphasis" }, textContent: "FAQs" }] },
                            { tagName: "li", children: [{ tagName: "a", attributes: { href: "#/about", class: "nav-link px-2 link-body-emphasis" }, textContent: "About" }] }
                        ]
                    },
                    {
                        tagName: "div",
                        attributes: { class: "col-md-3 text-end" },
                        children: [
                            { tagName: "button", attributes: { type: "button", class: "btn btn-outline-primary me-2" }, textContent: "Login" },
                            { tagName: "button", attributes: { type: "button", class: "btn btn-primary" }, textContent: "Sign-up" }
                        ]
                    }
                ]
            }
        ]
    },
    darkHeaderWithSearch: {
        tagName: "header",
        attributes: { class: "p-3 text-bg-dark mb-4 shadow-sm" },
        children: [
            {
                tagName: "div",
                attributes: { class: "container" },
                children: [
                    {
                        tagName: "div",
                        attributes: { class: "d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start" },
                        children: [
                            {
                                tagName: "a",
                                attributes: { href: "#/", class: "d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none me-lg-3" },
                                children: [
                                    { tagName: "i", attributes: { class: "bi bi-bootstrap-fill fs-2 text-warning me-2" } },
                                    { tagName: "span", attributes: { class: "fs-5 fw-bold" }, textContent: "DarkPortal" }
                                ]
                            },
                            {
                                tagName: "ul",
                                attributes: { class: "nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0" },
                                children: [
                                    { tagName: "li", children: [{ tagName: "a", attributes: { href: "#/", class: "nav-link px-2 text-secondary fw-semibold" }, textContent: "Home" }] },
                                    { tagName: "li", children: [{ tagName: "a", attributes: { href: "#/features", class: "nav-link px-2 text-white" }, textContent: "Features" }] },
                                    { tagName: "li", children: [{ tagName: "a", attributes: { href: "#/pricing", class: "nav-link px-2 text-white" }, textContent: "Pricing" }] },
                                    { tagName: "li", children: [{ tagName: "a", attributes: { href: "#/faqs", class: "nav-link px-2 text-white" }, textContent: "FAQs" }] },
                                    { tagName: "li", children: [{ tagName: "a", attributes: { href: "#/about", class: "nav-link px-2 text-white" }, textContent: "About" }] }
                                ]
                            },
                            {
                                tagName: "form",
                                attributes: { class: "col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3", role: "search" },
                                children: [
                                    {
                                        tagName: "input",
                                        attributes: {
                                            type: "text",
                                            class: "form-control form-control-dark text-bg-dark border-secondary",
                                            placeholder: "Search..."
                                        }
                                    }
                                ]
                            },
                            {
                                tagName: "div",
                                attributes: { class: "text-end" },
                                children: [
                                    { tagName: "button", attributes: { type: "button", class: "btn btn-outline-light me-2" }, textContent: "Login" },
                                    { tagName: "button", attributes: { type: "button", class: "btn btn-warning" }, textContent: "Sign-up" }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    },
    searchAndProfileDropdown: {
        tagName: "header",
        attributes: { class: "p-3 mb-3 border-bottom shadow-sm bg-white" },
        children: [
            {
                tagName: "div",
                attributes: { class: "container" },
                children: [
                    {
                        tagName: "div",
                        attributes: { class: "d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start" },
                        children: [
                            {
                                tagName: "a",
                                attributes: { href: "#/", class: "d-flex align-items-center mb-2 mb-lg-0 link-body-emphasis text-decoration-none me-lg-3" },
                                children: [
                                    { tagName: "i", attributes: { class: "bi bi-bootstrap-fill fs-2 text-primary me-2" } },
                                    { tagName: "span", attributes: { class: "fs-5 fw-bold" }, textContent: "Portal" }
                                ]
                            },
                            {
                                tagName: "ul",
                                attributes: { class: "nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0" },
                                children: [
                                    { tagName: "li", children: [{ tagName: "a", attributes: { href: "#/", class: "nav-link px-2 link-secondary fw-semibold" }, textContent: "Overview" }] },
                                    { tagName: "li", children: [{ tagName: "a", attributes: { href: "#/inventory", class: "nav-link px-2 link-body-emphasis" }, textContent: "Inventory" }] },
                                    { tagName: "li", children: [{ tagName: "a", attributes: { href: "#/customers", class: "nav-link px-2 link-body-emphasis" }, textContent: "Customers" }] },
                                    { tagName: "li", children: [{ tagName: "a", attributes: { href: "#/products", class: "nav-link px-2 link-body-emphasis" }, textContent: "Products" }] }
                                ]
                            },
                            {
                                tagName: "form",
                                attributes: { class: "col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3", role: "search" },
                                children: [
                                    {
                                        tagName: "input",
                                        attributes: {
                                            type: "text",
                                            class: "form-control",
                                            placeholder: "Search..."
                                        }
                                    }
                                ]
                            },
                            {
                                tagName: "div",
                                attributes: { class: "dropdown text-end" },
                                children: [
                                    {
                                        tagName: "button",
                                        attributes: {
                                            type: "button",
                                            class: "btn p-0 border-0 dropdown-toggle d-block link-body-emphasis text-decoration-none",
                                            "data-bs-toggle": "dropdown",
                                            "aria-expanded": "false"
                                        },
                                        children: [
                                            {
                                                tagName: "img",
                                                attributes: {
                                                    src: "https://github.com/mdo.png",
                                                    alt: "mdo",
                                                    width: "32",
                                                    height: "32",
                                                    class: "rounded-circle"
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        tagName: "ul",
                                        attributes: { class: "dropdown-menu text-small shadow" },
                                        children: [
                                            { tagName: "li", children: [{ tagName: "a", attributes: { class: "dropdown-item", href: "#/new-project" }, textContent: "New project..." }] },
                                            { tagName: "li", children: [{ tagName: "a", attributes: { class: "dropdown-item", href: "#/settings" }, textContent: "Settings" }] },
                                            { tagName: "li", children: [{ tagName: "a", attributes: { class: "dropdown-item", href: "#/profile" }, textContent: "Profile" }] },
                                            { tagName: "li", children: [{ tagName: "hr", attributes: { class: "dropdown-divider" } }] },
                                            { tagName: "li", children: [{ tagName: "a", attributes: { class: "dropdown-item text-danger", href: "#/sign-out" }, textContent: "Sign out" }] }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    },
    gridHeaderWithDropdown: {
        tagName: "header",
        attributes: { class: "py-3 mb-4 border-bottom shadow-sm bg-white" },
        children: [
            {
                tagName: "div",
                attributes: {
                    class: "container-fluid d-grid gap-3 align-items-center",
                    style: "grid-template-columns: 1fr 2fr;"
                },
                children: [
                    {
                        tagName: "div",
                        attributes: { class: "dropdown" },
                        children: [
                            {
                                tagName: "button",
                                attributes: {
                                    type: "button",
                                    class: "btn btn-outline-secondary d-flex align-items-center dropdown-toggle",
                                    "data-bs-toggle": "dropdown",
                                    "aria-expanded": "false"
                                },
                                children: [
                                    { tagName: "i", attributes: { class: "bi bi-bootstrap-fill fs-4 text-primary me-2" } },
                                    { tagName: "span", attributes: { class: "fw-bold" }, textContent: "Project Menu" }
                                ]
                            },
                            {
                                tagName: "ul",
                                attributes: { class: "dropdown-menu text-small shadow" },
                                children: [
                                    { tagName: "li", children: [{ tagName: "a", attributes: { class: "dropdown-item active", href: "#/overview" }, textContent: "Overview" }] },
                                    { tagName: "li", children: [{ tagName: "a", attributes: { class: "dropdown-item", href: "#/inventory" }, textContent: "Inventory" }] },
                                    { tagName: "li", children: [{ tagName: "a", attributes: { class: "dropdown-item", href: "#/customers" }, textContent: "Customers" }] },
                                    { tagName: "li", children: [{ tagName: "a", attributes: { class: "dropdown-item", href: "#/products" }, textContent: "Products" }] },
                                    { tagName: "li", children: [{ tagName: "hr", attributes: { class: "dropdown-divider" } }] },
                                    { tagName: "li", children: [{ tagName: "a", attributes: { class: "dropdown-item", href: "#/reports" }, textContent: "Reports" }] },
                                    { tagName: "li", children: [{ tagName: "a", attributes: { class: "dropdown-item", href: "#/analytics" }, textContent: "Analytics" }] }
                                ]
                            }
                        ]
                    },
                    {
                        tagName: "div",
                        attributes: { class: "d-flex align-items-center" },
                        children: [
                            {
                                tagName: "form",
                                attributes: { class: "w-100 me-3", role: "search" },
                                children: [
                                    {
                                        tagName: "input",
                                        attributes: {
                                            type: "text",
                                            class: "form-control",
                                            placeholder: "Search..."
                                        }
                                    }
                                ]
                            },
                            {
                                tagName: "div",
                                attributes: { class: "flex-shrink-0 dropdown" },
                                children: [
                                    {
                                        tagName: "button",
                                        attributes: {
                                            type: "button",
                                            class: "btn p-0 border-0 dropdown-toggle d-block link-body-emphasis text-decoration-none",
                                            "data-bs-toggle": "dropdown",
                                            "aria-expanded": "false"
                                        },
                                        children: [
                                            {
                                                tagName: "img",
                                                attributes: {
                                                    src: "https://github.com/mdo.png",
                                                    alt: "mdo",
                                                    width: "32",
                                                    height: "32",
                                                    class: "rounded-circle"
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        tagName: "ul",
                                        attributes: { class: "dropdown-menu dropdown-menu-end text-small shadow" },
                                        children: [
                                            { tagName: "li", children: [{ tagName: "a", attributes: { class: "dropdown-item", href: "#/new-project" }, textContent: "New project..." }] },
                                            { tagName: "li", children: [{ tagName: "a", attributes: { class: "dropdown-item", href: "#/settings" }, textContent: "Settings" }] },
                                            { tagName: "li", children: [{ tagName: "a", attributes: { class: "dropdown-item", href: "#/profile" }, textContent: "Profile" }] },
                                            { tagName: "li", children: [{ tagName: "hr", attributes: { class: "dropdown-divider" } }] },
                                            { tagName: "li", children: [{ tagName: "a", attributes: { class: "dropdown-item text-danger", href: "#/sign-out" }, textContent: "Sign out" }] }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    },
    doubleHeaderWithSearch: {
        tagName: "header",
        attributes: { class: "mb-4 shadow-sm" },
        children: [
            {
                tagName: "div",
                attributes: { class: "py-2 bg-body-tertiary border-bottom" },
                children: [
                    {
                        tagName: "div",
                        attributes: { class: "container d-flex flex-wrap align-items-center" },
                        children: [
                            {
                                tagName: "ul",
                                attributes: { class: "nav me-auto" },
                                children: [
                                    { tagName: "li", attributes: { class: "nav-item" }, children: [{ tagName: "a", attributes: { href: "#/", class: "nav-link link-body-emphasis px-2 active", "aria-current": "page" }, textContent: "Home" }] },
                                    { tagName: "li", attributes: { class: "nav-item" }, children: [{ tagName: "a", attributes: { href: "#/features", class: "nav-link link-body-emphasis px-2" }, textContent: "Features" }] },
                                    { tagName: "li", attributes: { class: "nav-item" }, children: [{ tagName: "a", attributes: { href: "#/pricing", class: "nav-link link-body-emphasis px-2" }, textContent: "Pricing" }] },
                                    { tagName: "li", attributes: { class: "nav-item" }, children: [{ tagName: "a", attributes: { href: "#/faqs", class: "nav-link link-body-emphasis px-2" }, textContent: "FAQs" }] },
                                    { tagName: "li", attributes: { class: "nav-item" }, children: [{ tagName: "a", attributes: { href: "#/about", class: "nav-link link-body-emphasis px-2" }, textContent: "About" }] }
                                ]
                            },
                            {
                                tagName: "ul",
                                attributes: { class: "nav" },
                                children: [
                                    { tagName: "li", attributes: { class: "nav-item" }, children: [{ tagName: "a", attributes: { href: "#/login", class: "nav-link link-body-emphasis px-2" }, textContent: "Login" }] },
                                    { tagName: "li", attributes: { class: "nav-item" }, children: [{ tagName: "a", attributes: { href: "#/signup", class: "nav-link link-body-emphasis px-2" }, textContent: "Sign up" }] }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                tagName: "div",
                attributes: { class: "py-3 bg-white border-bottom" },
                children: [
                    {
                        tagName: "div",
                        attributes: { class: "container d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start" },
                        children: [
                            {
                                tagName: "a",
                                attributes: { href: "#/", class: "d-flex align-items-center mb-3 mb-lg-0 me-lg-auto link-body-emphasis text-decoration-none" },
                                children: [
                                    { tagName: "i", attributes: { class: "bi bi-bootstrap-fill fs-2 text-primary me-2" } },
                                    { tagName: "span", attributes: { class: "fs-4 fw-bold" }, textContent: "Double header" }
                                ]
                            },
                            {
                                tagName: "form",
                                attributes: { class: "col-12 col-lg-auto mb-3 mb-lg-0", role: "search" },
                                children: [
                                    {
                                        tagName: "input",
                                        attributes: {
                                            type: "text",
                                            class: "form-control",
                                            placeholder: "Search..."
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    },
    iconNavDoubleHeader: {
        tagName: "header",
        attributes: { class: "mb-4 shadow-sm" },
        children: [
            {
                tagName: "div",
                attributes: { class: "px-3 py-2 text-bg-dark border-bottom" },
                children: [
                    {
                        tagName: "div",
                        attributes: { class: "container" },
                        children: [
                            {
                                tagName: "div",
                                attributes: { class: "d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start" },
                                children: [
                                    {
                                        tagName: "a",
                                        attributes: { href: "#/", class: "d-flex align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none" },
                                        children: [
                                            { tagName: "i", attributes: { class: "bi bi-bootstrap-fill fs-2 text-primary me-2" } },
                                            { tagName: "span", attributes: { class: "fs-5 fw-bold" }, textContent: "IconNav" }
                                        ]
                                    },
                                    {
                                        tagName: "ul",
                                        attributes: { class: "nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small text-center" },
                                        children: [
                                            {
                                                tagName: "li",
                                                children: [
                                                    {
                                                        tagName: "a",
                                                        attributes: { href: "#/", class: "nav-link text-secondary px-3" },
                                                        children: [
                                                            { tagName: "i", attributes: { class: "bi bi-house d-block mx-auto mb-1 fs-5" } },
                                                            { tagName: "span", textContent: "Home" }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                tagName: "li",
                                                children: [
                                                    {
                                                        tagName: "a",
                                                        attributes: { href: "#/dashboard", class: "nav-link text-white px-3" },
                                                        children: [
                                                            { tagName: "i", attributes: { class: "bi bi-speedometer2 d-block mx-auto mb-1 fs-5" } },
                                                            { tagName: "span", textContent: "Dashboard" }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                tagName: "li",
                                                children: [
                                                    {
                                                        tagName: "a",
                                                        attributes: { href: "#/orders", class: "nav-link text-white px-3" },
                                                        children: [
                                                            { tagName: "i", attributes: { class: "bi bi-table d-block mx-auto mb-1 fs-5" } },
                                                            { tagName: "span", textContent: "Orders" }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                tagName: "li",
                                                children: [
                                                    {
                                                        tagName: "a",
                                                        attributes: { href: "#/products", class: "nav-link text-white px-3" },
                                                        children: [
                                                            { tagName: "i", attributes: { class: "bi bi-grid d-block mx-auto mb-1 fs-5" } },
                                                            { tagName: "span", textContent: "Products" }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                tagName: "li",
                                                children: [
                                                    {
                                                        tagName: "a",
                                                        attributes: { href: "#/customers", class: "nav-link text-white px-3" },
                                                        children: [
                                                            { tagName: "i", attributes: { class: "bi bi-people d-block mx-auto mb-1 fs-5" } },
                                                            { tagName: "span", textContent: "Customers" }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                tagName: "div",
                attributes: { class: "px-3 py-2 border-bottom bg-white" },
                children: [
                    {
                        tagName: "div",
                        attributes: { class: "container d-flex flex-wrap justify-content-center align-items-center" },
                        children: [
                            {
                                tagName: "form",
                                attributes: { class: "col-12 col-lg-auto mb-2 mb-lg-0 me-lg-auto", role: "search" },
                                children: [
                                    {
                                        tagName: "input",
                                        attributes: {
                                            type: "text",
                                            class: "form-control",
                                            placeholder: "Search..."
                                        }
                                    }
                                ]
                            },
                            {
                                tagName: "div",
                                attributes: { class: "text-end" },
                                children: [
                                    { tagName: "button", attributes: { type: "button", class: "btn btn-light text-dark border me-2" }, textContent: "Login" },
                                    { tagName: "button", attributes: { type: "button", class: "btn btn-primary" }, textContent: "Sign-up" }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    },
    purchasesMenu: currentMenu.purchasesMenu || currentMenu // preserve our existing rich purchases double header
};

console.log("Total variants to test:", Object.keys(allHeaders).length);

for (const [key, spec] of Object.entries(allHeaders)) {
    const review = reviewSpecV2({ inSpec: spec });
    console.log(`- ${key}: totalTags=${review.totalTags}, areAllTagsPresent=${review.areAllTagsPresent}, unrecognizedTags=${JSON.stringify(review.unrecognizedTags)}`);
    if (!review.areAllTagsPresent || review.unrecognizedTags.length > 0) {
        console.error(`FAILED on ${key}!`);
        process.exit(1);
    }
}

console.log("ALL 9 HEADER VARIANTS PASSED 100% CLEAN REVIEW!");
