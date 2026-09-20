import { fetchTagsCatalog } from "./fetchTagsCatalog.js";
import { sampleSpecificationTemplates } from "./sampleSpecificationTemplates.js";
import { tagStoriesData } from "./tagStoriesData.js";

const TABLE_TAGS = ["table", "colgroup", "col", "thead", "tbody", "tfoot", "tr", "th", "td"];
const FORM_TAGS = ["form", "input", "checkbox", "label", "select", "option", "datalist", "button"];
const TYPO_TAGS = ["p", "h1", "h2", "span"];

export const getCategoryForTag = ({ inTag }) => {
    const localTag = inTag ?? "";
    if (TABLE_TAGS.includes(localTag)) {
        return { name: "Table Tag", badgeClass: "bg-primary-subtle text-primary border border-primary-subtle" };
    }
    if (FORM_TAGS.includes(localTag)) {
        return { name: "Form & Input", badgeClass: "bg-success-subtle text-success border border-success-subtle" };
    }
    if (TYPO_TAGS.includes(localTag)) {
        return { name: "Typography", badgeClass: "bg-info-subtle text-info-emphasis border border-info-subtle" };
    }
    if (localTag === "img") {
        return { name: "Media", badgeClass: "bg-warning-subtle text-warning-emphasis border border-warning-subtle" };
    }
    return { name: "Container", badgeClass: "bg-secondary-subtle text-secondary border" };
};

export const escapeHtmlText = ({ inString }) => {
    const localString = inString ?? "";
    return String(localString)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
};

// Global state
let fullCatalogData = {};
let allTagKeys = [];
let activeTag = "label";

export const renderSelectedTag = ({ inTagName }) => {
    const localTagName = inTagName ?? "label";
    activeTag = localTagName;

    const tagDefinition = fullCatalogData[localTagName] || {};
    const category = getCategoryForTag({ inTag: localTagName });
    const story = tagStoriesData[localTagName] || {
        summary: `HTML <${localTagName}> element definition in json-to-tag.`,
        semantics: `Semantic HTML element ${localTagName}.`,
        bestPractices: `Refer to tags.json for allowed attributes and nesting constraints.`
    };
    const sampleSpec = sampleSpecificationTemplates[localTagName] || { tagName: localTagName };

    // Update document title and header badges
    document.title = `<${localTagName}> Story & Rules • @keshavsoft/json-to-tag`;
    const titleTagBadge = document.getElementById("titleTagBadge");
    if (titleTagBadge) titleTagBadge.textContent = `<${localTagName}>`;

    const titleCategoryBadge = document.getElementById("titleCategoryBadge");
    if (titleCategoryBadge) {
        titleCategoryBadge.textContent = category.name;
        titleCategoryBadge.className = `badge ${category.badgeClass}`;
    }

    const tagSummaryText = document.getElementById("tagSummaryText");
    if (tagSummaryText) tagSummaryText.textContent = story.summary;

    // Capability badges
    const badgeAllowsChildren = document.getElementById("badgeAllowsChildren");
    if (badgeAllowsChildren) {
        badgeAllowsChildren.innerHTML = tagDefinition.allowsChildren
            ? '<i class="bi bi-check-circle-fill text-success me-1"></i> allowsChildren: <strong>true</strong> (Container)'
            : '<i class="bi bi-x-circle text-muted me-1"></i> allowsChildren: <strong>false</strong> (Void / Leaf element)';
        badgeAllowsChildren.className = tagDefinition.allowsChildren
            ? "badge bg-success-subtle text-success border border-success-subtle px-2 py-1"
            : "badge bg-light text-muted border px-2 py-1";
    }

    const badgeAllowsText = document.getElementById("badgeAllowsText");
    if (badgeAllowsText) {
        badgeAllowsText.innerHTML = tagDefinition.allowsTextContent
            ? '<i class="bi bi-check-circle-fill text-info me-1"></i> allowsTextContent: <strong>true</strong>'
            : '<i class="bi bi-x-circle text-muted me-1"></i> allowsTextContent: <strong>false</strong>';
        badgeAllowsText.className = tagDefinition.allowsTextContent
            ? "badge bg-info-subtle text-info-emphasis border border-info-subtle px-2 py-1"
            : "badge bg-light text-muted border px-2 py-1";
    }

    // Allowed Attributes
    const catalogAllowedAttributes = document.getElementById("catalogAllowedAttributes");
    if (catalogAllowedAttributes) {
        const attrs = tagDefinition.allowedAttributes || [];
        if (attrs.length > 0) {
            catalogAllowedAttributes.innerHTML = attrs
                .map(attr => `<span class="attr-pill">${attr}</span>`)
                .join(" ");
        } else {
            catalogAllowedAttributes.innerHTML = '<span class="text-muted small fst-italic">Standard attributes only (id, class, style, title)</span>';
        }
    }

    // Permitted Children
    const catalogPermittedChildren = document.getElementById("catalogPermittedChildren");
    if (catalogPermittedChildren) {
        const children = tagDefinition.childTags || [];
        if (children.length > 0) {
            catalogPermittedChildren.innerHTML = children
                .map(child => `<a href="./tag.html?tag=${child}" class="badge bg-secondary-subtle text-secondary font-monospace text-decoration-none me-1">&lt;${child}&gt;</a>`)
                .join(" ");
        } else if (tagDefinition.allowsChildren) {
            catalogPermittedChildren.innerHTML = '<span class="text-muted small">Any valid DOM specification</span>';
        } else {
            catalogPermittedChildren.innerHTML = '<span class="badge bg-warning-subtle text-warning-emphasis">None (Void / Leaf Element)</span>';
        }
    }

    // Story & Semantics
    const storySemantics = document.getElementById("storySemantics");
    if (storySemantics) storySemantics.textContent = story.semantics;

    const storyBestPractices = document.getElementById("storyBestPractices");
    if (storyBestPractices) storyBestPractices.textContent = story.bestPractices;

    // Sample JSON Spec
    const sampleSpecCode = document.getElementById("sampleSpecCode");
    if (sampleSpecCode) {
        sampleSpecCode.textContent = JSON.stringify(sampleSpec, null, 2);
    }

    // Raw catalog slice
    const rawCatalogSlice = document.getElementById("rawCatalogSlice");
    if (rawCatalogSlice) {
        const slice = { [localTagName]: tagDefinition };
        rawCatalogSlice.textContent = JSON.stringify(slice, null, 2);
    }

    // Sync select dropdown
    const selectTag = document.getElementById("selectTag");
    if (selectTag && selectTag.value !== localTagName) {
        selectTag.value = localTagName;
    }

    // Update browser URL without reload
    const currentUrl = new URL(window.location.href);
    if (currentUrl.searchParams.get("tag") !== localTagName) {
        currentUrl.searchParams.set("tag", localTagName);
        window.history.pushState({ tag: localTagName }, "", currentUrl.toString());
    }
};

export const initTagStoryPage = async () => {
    try {
        const { tagsData } = await fetchTagsCatalog({ inUrl: "./tags.json" });
        fullCatalogData = tagsData;
        allTagKeys = Object.keys(tagsData);

        // Populate <select> dropdown
        const selectTag = document.getElementById("selectTag");
        if (selectTag) {
            selectTag.innerHTML = "";
            allTagKeys.forEach(tag => {
                const opt = document.createElement("option");
                opt.value = tag;
                opt.textContent = `<${tag}>`;
                selectTag.appendChild(opt);
            });

            selectTag.addEventListener("change", (e) => {
                renderSelectedTag({ inTagName: e.target.value });
            });
        }

        // Handle prev/next buttons
        const btnPrevTag = document.getElementById("btnPrevTag");
        const btnNextTag = document.getElementById("btnNextTag");

        if (btnPrevTag) {
            btnPrevTag.addEventListener("click", () => {
                const currentIndex = allTagKeys.indexOf(activeTag);
                const prevIndex = (currentIndex - 1 + allTagKeys.length) % allTagKeys.length;
                renderSelectedTag({ inTagName: allTagKeys[prevIndex] });
            });
        }

        if (btnNextTag) {
            btnNextTag.addEventListener("click", () => {
                const currentIndex = allTagKeys.indexOf(activeTag);
                const nextIndex = (currentIndex + 1) % allTagKeys.length;
                renderSelectedTag({ inTagName: allTagKeys[nextIndex] });
            });
        }

        // Handle copy sample spec
        const btnCopySample = document.getElementById("btnCopySample");
        if (btnCopySample) {
            btnCopySample.addEventListener("click", () => {
                const sampleSpec = sampleSpecificationTemplates[activeTag] || { tagName: activeTag };
                navigator.clipboard.writeText(JSON.stringify(sampleSpec, null, 2));
                btnCopySample.innerHTML = '<i class="bi bi-check2 text-success"></i> Copied!';
                setTimeout(() => {
                    btnCopySample.innerHTML = '<i class="bi bi-clipboard me-1"></i> Copy Sample JSON';
                }, 1500);
            });
        }

        // Determine initial tag from URL ?tag=...
        const urlParams = new URLSearchParams(window.location.search);
        const requestedTag = (urlParams.get("tag") || "").toLowerCase().trim();
        const initialTag = allTagKeys.includes(requestedTag) ? requestedTag : (allTagKeys[0] || "label");

        renderSelectedTag({ inTagName: initialTag });

        // Handle browser Back/Forward navigation
        window.addEventListener("popstate", () => {
            const params = new URLSearchParams(window.location.search);
            const tagFromUrl = params.get("tag");
            if (tagFromUrl && allTagKeys.includes(tagFromUrl)) {
                renderSelectedTag({ inTagName: tagFromUrl });
            }
        });
    } catch (err) {
        const errorNotice = document.getElementById("catalogErrorNotice");
        if (errorNotice) {
            errorNotice.style.display = "block";
            errorNotice.textContent = `Failed to load catalog: ${err.message}`;
        }
    }
};

initTagStoryPage();
