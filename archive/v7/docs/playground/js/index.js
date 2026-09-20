import { buildSpecElement } from "../../src/v3/index.js";
import { playgroundPresets } from "./presets.js";

const specInput = document.getElementById("spec-input");
const renderTarget = document.getElementById("render-target");
const rawHtml = document.getElementById("raw-html");
const statusMsg = document.getElementById("status-msg");
const tabVisual = document.getElementById("tab-visual");
const tabHtml = document.getElementById("tab-html");
const previewCanvas = document.getElementById("preview-canvas");
const htmlView = document.getElementById("html-view");
const btnFormat = document.getElementById("btn-format");
const btnCompile = document.getElementById("btn-compile");
const presetButtons = document.querySelectorAll(".preset-btn");

export const compileCurrentSpec = ({ inSpecString }) => {
    const localSpecString = inSpecString ?? "";

    if (!renderTarget || !rawHtml) return;

    try {
        const parsedSpec = JSON.parse(localSpecString);
        renderTarget.innerHTML = "";

        if (Array.isArray(parsedSpec)) {
            parsedSpec.forEach(item => {
                const domNode = buildSpecElement({ inSpec: item });
                if (domNode) renderTarget.appendChild(domNode);
            });
        } else if (typeof parsedSpec === "object" && parsedSpec !== null) {
            const domNode = buildSpecElement({ inSpec: parsedSpec });
            if (domNode) renderTarget.appendChild(domNode);
        }

        rawHtml.textContent = renderTarget.innerHTML;

        if (statusMsg) {
            statusMsg.textContent = "Valid Spec";
            statusMsg.className = "badge bg-success-subtle text-success border border-success-subtle small py-1";
        }
    } catch (err) {
        if (statusMsg) {
            statusMsg.textContent = "JSON Error: " + err.message;
            statusMsg.className = "badge bg-danger-subtle text-danger border border-danger-subtle small py-1";
        }
    }
};

export const loadPresetSpec = ({ inPresetName }) => {
    const localPresetName = inPresetName ?? "card";
    const selectedPreset = playgroundPresets[localPresetName] || playgroundPresets.card;

    if (specInput) {
        specInput.value = JSON.stringify(selectedPreset, null, 2);
    }
    compileCurrentSpec({ inSpecString: specInput ? specInput.value : "" });
};

export const formatInputJson = () => {
    if (!specInput) return;
    try {
        const parsed = JSON.parse(specInput.value);
        specInput.value = JSON.stringify(parsed, null, 2);
    } catch {
        // Keep as-is if malformed
    }
};

// Event Listeners
if (specInput) {
    specInput.addEventListener("input", () => {
        compileCurrentSpec({ inSpecString: specInput.value });
    });
}

if (btnCompile) {
    btnCompile.addEventListener("click", () => {
        compileCurrentSpec({ inSpecString: specInput ? specInput.value : "" });
    });
}

if (btnFormat) {
    btnFormat.addEventListener("click", formatInputJson);
}

presetButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const presetKey = btn.dataset.preset;
        loadPresetSpec({ inPresetName: presetKey });
    });
});

if (tabVisual && tabHtml && previewCanvas && htmlView) {
    tabVisual.addEventListener("click", () => {
        tabVisual.classList.add("active");
        tabHtml.classList.remove("active");
        previewCanvas.style.display = "block";
        htmlView.style.display = "none";
    });

    tabHtml.addEventListener("click", () => {
        tabHtml.classList.add("active");
        tabVisual.classList.remove("active");
        previewCanvas.style.display = "none";
        htmlView.style.display = "block";
    });
}

// Initial load
loadPresetSpec({ inPresetName: "card" });
