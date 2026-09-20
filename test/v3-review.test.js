import test from "node:test";
import assert from "node:assert/strict";
import { reviewSpec } from "../src/v3/review/index.js";

test("reviewSpec accurately counts tags and validates presence in tags.json", () => {
    const spec = {
        tagName: "div",
        children: [
            { tagName: "h1", textContent: "Heading" },
            { tagName: "p", textContent: "Text 1" },
            { tagName: "p", textContent: "Text 2" },
            { tagName: "button", textContent: "Submit" }
        ]
    };

    const review = reviewSpec({ inSpec: spec });

    assert.equal(review.totalTags, 5);
    assert.deepEqual(review.tagCounts, { div: 1, h1: 1, p: 2, button: 1 });
    assert.equal(review.areAllTagsPresent, true);
    assert.deepEqual(review.unrecognizedTags, []);
});

test("reviewSpec flags unknown / unsupported tags", () => {
    const spec = {
        tagName: "div",
        children: [
            { tagName: "unknown-element", textContent: "Foo" },
            { tagName: "button", textContent: "Bar" }
        ]
    };

    const review = reviewSpec({ inSpec: spec });

    assert.equal(review.totalTags, 3);
    assert.equal(review.areAllTagsPresent, false);
    assert.deepEqual(review.unrecognizedTags, ["unknown-element"]);
    assert.ok(review.recognizedTags.includes("div"));
    assert.ok(review.recognizedTags.includes("button"));
});

test("reviewSpec handles arrays of specs correctly", () => {
    const specArray = [
        { tagName: "tr", children: [{ tagName: "td", textContent: "Cell 1" }] },
        { tagName: "tr", children: [{ tagName: "td", textContent: "Cell 2" }] }
    ];

    const review = reviewSpec({ inSpec: specArray });

    assert.equal(review.totalTags, 4);
    assert.deepEqual(review.tagCounts, { tr: 2, td: 2 });
    assert.equal(review.areAllTagsPresent, true);
});
