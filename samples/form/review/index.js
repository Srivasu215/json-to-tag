import spec from "./spec.json" with { type: "json" };
import { reviewSpec, buildSpecElement } from "/src/v3/index.js";

const startFunc = async () => {
    try {
        // 1. Run Review on form/v6 spec
        const reviewResult = reviewSpec({ inSpec: spec });
        console.log("reviewSpec result:", reviewResult);

        // 2. Populate Diagnostic UI
        const statusBadge = document.getElementById("review-status-badge");
        const valTotalTags = document.getElementById("val-total-tags");
        const valUniqueTags = document.getElementById("val-unique-tags");
        const valUnknownTags = document.getElementById("val-unknown-tags");
        const tagFreqContainer = document.getElementById("tag-frequency-container");
        const rawJsonEl = document.getElementById("raw-review-json");

        if (valTotalTags) valTotalTags.textContent = reviewResult.totalTags;
        if (valUniqueTags) valUniqueTags.textContent = reviewResult.uniqueTags.length;
        if (valUnknownTags) {
            valUnknownTags.textContent = reviewResult.unrecognizedTags.length;
            valUnknownTags.className = reviewResult.unrecognizedTags.length === 0 
                ? "metric-value text-success" 
                : "metric-value text-danger";
        }

        if (statusBadge) {
            if (reviewResult.areAllTagsPresent) {
                statusBadge.innerHTML = `
                    <span class="badge bg-success-subtle text-success border border-success-subtle px-3 py-2">
                        <i class="bi bi-check-circle-fill me-1"></i> All ${reviewResult.totalTags} Tags Verified in tags.json
                    </span>`;
            } else {
                statusBadge.innerHTML = `
                    <span class="badge bg-danger-subtle text-danger border border-danger-subtle px-3 py-2">
                        <i class="bi bi-exclamation-triangle-fill me-1"></i> Unrecognized Tags: ${reviewResult.unrecognizedTags.join(", ")}
                    </span>`;
            }
        }

        if (tagFreqContainer) {
            tagFreqContainer.innerHTML = "";
            Object.entries(reviewResult.tagCounts)
                .sort(([, a], [, b]) => b - a)
                .forEach(([tag, count]) => {
                    const isAllowed = reviewResult.recognizedTags.includes(tag);
                    const pill = document.createElement("span");
                    pill.className = `tag-pill ${isAllowed ? "text-dark" : "text-danger border-danger"}`;
                    pill.innerHTML = `<strong>&lt;${tag}&gt;</strong> <span class="badge ${isAllowed ? "bg-secondary" : "bg-danger"} rounded-pill ms-1">${count}</span>`;
                    tagFreqContainer.appendChild(pill);
                });
        }

        if (rawJsonEl) {
            rawJsonEl.textContent = JSON.stringify(reviewResult, null, 2);
        }

        // 3. Build & Render DOM Form
        const formElement = buildSpecElement({ inSpec: spec });
        const formContainer = document.getElementById("form-container");
        if (formContainer && formElement) {
            formContainer.appendChild(formElement);
        }

    } catch (err) {
        console.error("Failed to review and render sample:", err);
    }
};

startFunc().then();
