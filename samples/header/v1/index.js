// import { buildSpecElement } from "../../dist/min.js";

import menuJson from "https://keshavsoft.github.io/json-to-tag/tags/menu.json" with { type: "json" };

const render = async ({ inVariantKey, inMountId }) => {
    const localVariantKey = inVariantKey;
    const localMountId = inMountId;
    console.log("menuJson : ", menuJson);

    const spec = menuJson[localVariantKey];
    console.log("spec : ", spec);

    const element = window.ks['json-to-tag'].buildSpecElement({ inSpec: spec });
    console.log("element : ", element);

    const mount = document.getElementById(localMountId);
    mount.appendChild(element);

    // Wire collapse if present
    const toggleBtn = element.querySelector('[data-bs-toggle="collapse"]');
    const collapseTarget = element.querySelector('#mobileNavCollapse');
    if (toggleBtn && collapseTarget) {
        toggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (window.bootstrap?.Collapse) {
                const bsCollapse = window.bootstrap.Collapse.getOrCreateInstance(collapseTarget, { toggle: false });
                bsCollapse.toggle();
            } else {
                collapseTarget.classList.toggle('show');
            }
        });
    }
};

render({ inVariantKey: "purchasesMenu", inMountId: "header-mount" });
