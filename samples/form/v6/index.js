import spec from "./spec.json" with { type: "json" };
// import { buildSpec } from "../../../src/v40/index.js";
const startFunc = async () => {
    try {
        const k1 = window.ks['json-to-dom'].buildSpecElement({ targetHtmlId: "form-container", inSpec: spec })
        console.log("k1 : ", k1);

        const cont1 = document.getElementById("form-container");
        cont1.append(k1);
        // const k1 = buildSpec({
        //     inSpec: spec
        // });
    } catch (err) {
        console.error("Failed to render v27 sample:", err);
    }
};

startFunc().then();
