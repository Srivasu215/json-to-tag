import test from "node:test";
import assert from "node:assert/strict";
import { reviewSpecV1, reviewSpecV2 } from "../src/v3/review/index.js";

[
    { name: "v1", fn: reviewSpecV1 },
    { name: "v2", fn: reviewSpecV2 }
].forEach(({ name, fn }) => {
    test(`reviewSpec (${name}) accurately counts tags and validates presence in tags.json`, () => {
        const spec = {
            tagName: "div",
            children: [
                { tagName: "h1", textContent: "Heading" },
                { tagName: "p", textContent: "Text 1" },
                { tagName: "p", textContent: "Text 2" },
                { tagName: "button", textContent: "Submit" }
            ]
        };

        const review = fn({ inSpec: spec });

        assert.equal(review.totalTags, 5);
        assert.deepEqual(review.tagCounts, { div: 1, h1: 1, p: 2, button: 1 });
        assert.equal(review.areAllTagsPresent, true);
        assert.deepEqual(review.unrecognizedTags, []);
    });

    test(`reviewSpec (${name}) flags unknown / unsupported tags`, () => {
        const spec = {
            tagName: "div",
            children: [
                { tagName: "unknown-element", textContent: "Foo" },
                { tagName: "button", textContent: "Bar" }
            ]
        };

        const review = fn({ inSpec: spec });

        assert.equal(review.totalTags, 3);
        assert.equal(review.areAllTagsPresent, false);
        assert.deepEqual(review.unrecognizedTags, ["unknown-element"]);
        assert.ok(review.recognizedTags.includes("div"));
        assert.ok(review.recognizedTags.includes("button"));
    });

    test(`reviewSpec (${name}) handles arrays of specs correctly`, () => {
        const specArray = [
            { tagName: "tr", children: [{ tagName: "td", textContent: "Cell 1" }] },
            { tagName: "tr", children: [{ tagName: "td", textContent: "Cell 2" }] }
        ];

        const review = fn({ inSpec: specArray });

        assert.equal(review.totalTags, 4);
        assert.deepEqual(review.tagCounts, { tr: 2, td: 2 });
        assert.equal(review.areAllTagsPresent, true);
    });
});

test("reviewSpec (v2) successfully reviews samples/form/review/spec.json", async () => {
    const { default: formSpec } = await import("../samples/form/review/spec.json", { with: { type: "json" } });
    const review = reviewSpecV2({ inSpec: formSpec });

    assert.equal(review.totalTags, 36);
    assert.equal(review.areAllTagsPresent, true);
    assert.deepEqual(review.unrecognizedTags, []);
    assert.equal(review.tagCounts.div, 14);
    assert.equal(review.tagCounts.label, 7);
    assert.equal(review.tagCounts.input, 6);
    assert.equal(review.tagCounts.option, 4);
    assert.equal(review.tagCounts.button, 2);
    assert.equal(review.tagCounts.span, 2);
    assert.equal(review.tagCounts.select, 1);
});
