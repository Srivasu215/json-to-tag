import test from "node:test";
import assert from "node:assert/strict";
import { JSDOM } from "jsdom";
import defaultExport, {
    buildSpecElement,
    specToDom,
    buildSpec,
    reviewSpec,
    meta
} from "../index.js";

const dom = new JSDOM("<!DOCTYPE html><html><body></body></html>");
globalThis.window = dom.window;
globalThis.document = dom.window.document;
globalThis.Node = dom.window.Node;

test("root index.js exports all expected symbols", () => {
    assert.equal(typeof defaultExport, "function");
    assert.equal(typeof buildSpecElement, "function");
    assert.equal(typeof specToDom, "function");
    assert.equal(typeof buildSpec, "function");
    assert.equal(typeof reviewSpec, "function");
    assert.equal(typeof meta, "object");
    assert.equal(meta.version, "v3.0");
});

test("root buildSpecElement creates native DOM elements", () => {
    const spec = {
        tagName: "div",
        classList: "container mx-auto",
        attributes: { id: "main-card" },
        children: [
            { tagName: "h1", textContent: "Hello World" },
            { tagName: "button", textContent: "Click Me" }
        ]
    };

    const element = buildSpecElement({ inSpec: spec });

    assert.ok(element);
    assert.equal(element.tagName.toLowerCase(), "div");
    assert.equal(element.id, "main-card");
    assert.equal(element.className, "container mx-auto");
    assert.equal(element.children.length, 2);
    assert.equal(element.children[0].tagName.toLowerCase(), "h1");
    assert.equal(element.children[0].textContent, "Hello World");
    assert.equal(element.children[1].tagName.toLowerCase(), "button");
    assert.equal(element.children[1].textContent, "Click Me");
});
