import { buildSpecElement } from "../../dist/v3/min.js";
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
const fileInput = document.getElementById("playgroundFileInput");
const btnUploadJson = document.getElementById("btnUploadJson");
const activeSpecBadge = document.getElementById("activeSpecBadge");

const updateActiveBadge = ({ inName }) => {
    const localName = inName;
    if (activeSpecBadge) {
        activeSpecBadge.textContent = localName;
    }
};

export const compileCurrentSpec = ({ inSpecString, inSourceName }) => {
    const localSpecString = inSpecString ?? "";
    const localSourceName = inSourceName;

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

        // Keep sessionStorage in sync so user can navigate to Summary Hub seamlessly
        sessionStorage.setItem("json_to_tag_active_spec", JSON.stringify(parsedSpec));
        if (localSourceName) {
            sessionStorage.setItem("json_to_tag_active_name", localSourceName);
            updateActiveBadge({ inName: localSourceName });
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
    const presetLabel = `Preset: ${localPresetName}`;
    updateActiveBadge({ inName: presetLabel });
    compileCurrentSpec({ inSpecString: specInput ? specInput.value : "", inSourceName: presetLabel });
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

export const loadSpecFromFile = ({ inFile }) => {
    const localFile = inFile;
    if (!localFile) return;

    const reader = new FileReader();
    reader.onload = (event) => {
        try {
            const content = event.target.result;
            const parsed = JSON.parse(content);
            if (specInput) {
                specInput.value = JSON.stringify(parsed, null, 2);
            }
            compileCurrentSpec({ inSpecString: specInput.value, inSourceName: localFile.name });
        } catch (err) {
            alert("Invalid JSON file: " + err.message);
        }
    };
    reader.readAsText(localFile);
};

// Event Listeners
if (specInput) {
    specInput.addEventListener("input", () => {
        compileCurrentSpec({ inSpecString: specInput.value });
    });

    // Drag and drop JSON file support
    specInput.addEventListener("dragover", (e) => {
        e.preventDefault();
        specInput.classList.add("border-primary");
    });
    specInput.addEventListener("dragleave", () => {
        specInput.classList.remove("border-primary");
    });
    specInput.addEventListener("drop", (e) => {
        e.preventDefault();
        specInput.classList.remove("border-primary");
        const file = e.dataTransfer?.files?.[0];
        if (file && (file.type === "application/json" || file.name.endsWith(".json"))) {
            loadSpecFromFile({ inFile: file });
        }
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

if (btnUploadJson && fileInput) {
    btnUploadJson.addEventListener("click", () => {
        fileInput.click();
    });
}

if (fileInput) {
    fileInput.addEventListener("change", (e) => {
        const file = e.target.files?.[0];
        if (file) {
            loadSpecFromFile({ inFile: file });
        }
    });
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

// Check if an active spec was already loaded in Summary Hub or earlier session
const savedSpec = sessionStorage.getItem("json_to_tag_active_spec");
const savedName = sessionStorage.getItem("json_to_tag_active_name");
if (savedSpec) {
    try {
        const parsed = JSON.parse(savedSpec);
        if (specInput) {
            specInput.value = JSON.stringify(parsed, null, 2);
        }
        const label = savedName || "Active Spec";
        updateActiveBadge({ inName: label });
        compileCurrentSpec({ inSpecString: specInput.value, inSourceName: label });
    } catch {
        loadPresetSpec({ inPresetName: "card" });
    }
} else {
    // Default initial load
    loadPresetSpec({ inPresetName: "card" });
}
