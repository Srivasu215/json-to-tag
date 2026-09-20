//#region src/v3/meta.js
var e = {
	version: "v3.0",
	description: "Pure DOM engine with JSON review and tags.json catalog verification"
}, t = (t) => {
	let n = t, r = typeof n == "function" ? n : n?.inFuncDefinition, i = n?.inReviewSpec;
	typeof globalThis > "u" || !r || (globalThis.ks ??= {}, globalThis.ks["json-to-tag"] = {
		meta: e,
		buildSpecElement: r,
		reviewSpec: i
	}, globalThis.ks["json-to-dom"] = globalThis.ks["json-to-tag"]);
}, n = ({ inSpec: e }) => e == null, r = ({ inSpec: e }) => typeof Node < "u" && e instanceof Node, i = ({ inSpec: e }) => {
	let t = e;
	return Array.isArray(t);
}, a = ({ inSpec: e, inShowLog: t = !1 }) => {
	let n = e, r = t;
	return Array.isArray(n) ? n.map((e) => h({
		inSpec: e,
		inShowLog: r
	})).flat().filter(Boolean) : [];
}, o = ({ inTagName: e }) => {
	let t = e?.toLowerCase();
	if (!t) return null;
	if (t === "checkbox") {
		let e = document.createElement("input");
		return e.type = "checkbox", e;
	}
	return document.createElement(t);
}, s = ({ inElement: e, inTextContent: t, inAllowsTextContent: n = !0, inTagName: r, inShowLog: i = !1 }) => {
	let a = e, o = t;
	return !a || o == null ? a : n ? (a.textContent = o, a) : (i && console.warn(`[json-to-tag v3] textContent is not allowed on <${r}>; discarded "${o}"`), a);
}, c = ({ inElement: e, inProperties: t }) => {
	let n = e, r = t;
	return n && r && typeof r == "object" && Object.assign(n, r), n;
}, l = ({ inElement: e, inAttributes: t }) => {
	let n = e, r = t;
	return !n || !r || typeof r != "object" || Object.entries(r).forEach(([e, t]) => {
		e === "class" ? n.className = t : typeof t == "boolean" ? t ? n.setAttribute(e, "") : n.removeAttribute(e) : t != null && n.setAttribute(e, String(t));
	}), n;
}, u = ({ inElement: e, inClassList: t }) => {
	let n = e, r = t;
	if (!n || !r) return n;
	let i = [];
	return typeof r == "string" ? i = r.split(/\s+/).filter(Boolean) : Array.isArray(r) && (i = r.filter((e) => typeof e == "string" && e.trim().length > 0)), i.length > 0 && n.classList.add(...i), n;
}, d = ({ inElement: e, inChildren: t, inAllowsChildren: n = !0, inTagName: r, inShowLog: i = !1 }) => {
	let a = e, o = t, s = n, c = r, l = i;
	return !a || !Array.isArray(o) || o.length === 0 ? a : s ? (o.forEach((e) => {
		typeof Node < "u" && e instanceof Node ? a.appendChild(e) : (typeof e == "string" || typeof e == "number") && a.appendChild(document.createTextNode(String(e)));
	}), a) : (l && console.warn(`[json-to-tag v3] Children are not allowed on void tag <${c}>; discarded ${o.length} child nodes.`), a);
}, f = ({ inSpec: e, inClassList: t }) => {
	let n = e, r = t || n?.classList;
	if (!n || !n.tagName) return null;
	let i = o({ inTagName: n.tagName });
	return i ? (s({
		inElement: i,
		inTextContent: n.textContent,
		inTagName: n.tagName
	}), c({
		inElement: i,
		inProperties: n.properties
	}), l({
		inElement: i,
		inAttributes: n.attributes
	}), u({
		inElement: i,
		inClassList: r
	}), d({
		inElement: i,
		inChildren: n.children,
		inTagName: n.tagName
	}), i) : null;
}, p = ({ inChildren: e, inShowLog: t = !1 }) => {
	let n = e, r = t;
	return Array.isArray(n) ? n.map((e) => h({
		inSpec: e,
		inShowLog: r
	})).flat().filter(Boolean) : [];
}, m = ({ inSpec: e, inShowLog: t = !1 }) => {
	let n = e, r = t, i = f({ inSpec: n }), a = [];
	return "children" in n && (a = Array.isArray(n.children) && n.children.length > 0 ? p({
		inChildren: n.children,
		inShowLog: r
	}) : [], i.append(...a)), i;
}, h = ({ inSpec: e, inShowLog: t = !1 } = {}) => {
	let o = e, s = t;
	return n({ inSpec: o }) ? null : r({ inSpec: o }) ? o : i({ inSpec: o }) ? a({
		inSpec: o,
		inShowLog: s
	}) : m({
		inSpec: o,
		inShowLog: s
	});
}, g = {
	$schema: "./tags.schema.json",
	div: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: ["title", "role"],
		childTags: []
	},
	input: {
		allowsTextContent: !1,
		allowsChildren: !1,
		allowedAttributes: [
			"type",
			"placeholder",
			"value",
			"name",
			"disabled",
			"readonly",
			"required",
			"list"
		]
	},
	checkbox: {
		allowsTextContent: !1,
		allowsChildren: !1,
		allowedAttributes: [
			"type",
			"checked",
			"name",
			"value",
			"disabled",
			"required"
		]
	},
	colgroup: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: ["span"],
		childTags: ["col"]
	},
	col: {
		allowsTextContent: !1,
		allowsChildren: !1,
		allowedAttributes: [
			"span",
			"style",
			"width"
		]
	},
	label: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: ["for"],
		childTags: []
	},
	form: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: [
			"action",
			"method",
			"autocomplete",
			"enctype",
			"name",
			"novalidate",
			"target"
		],
		childTags: []
	},
	select: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: [
			"name",
			"disabled",
			"required",
			"multiple",
			"size"
		],
		childTags: ["option"]
	},
	p: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: [],
		childTags: []
	},
	h1: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: [],
		childTags: []
	},
	h2: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: [],
		childTags: []
	},
	span: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: [],
		childTags: []
	},
	img: {
		allowsTextContent: !1,
		allowsChildren: !1,
		allowedAttributes: [
			"src",
			"alt",
			"width",
			"height",
			"loading"
		]
	},
	button: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: [
			"type",
			"disabled",
			"name",
			"value"
		],
		childTags: []
	},
	table: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: [
			"border",
			"cellpadding",
			"cellspacing"
		],
		childTags: [
			"caption",
			"colgroup",
			"thead",
			"tbody",
			"tfoot",
			"tr"
		]
	},
	thead: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: [],
		childTags: ["tr"]
	},
	tbody: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: [],
		childTags: ["tr"]
	},
	tfoot: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: [],
		childTags: ["tr"]
	},
	tr: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: [],
		childTags: ["td", "th"]
	},
	th: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: [
			"scope",
			"colspan",
			"rowspan"
		],
		childTags: []
	},
	td: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: ["colspan", "rowspan"],
		childTags: []
	},
	datalist: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: [],
		childTags: ["option"]
	},
	option: {
		allowsTextContent: !0,
		allowsChildren: !1,
		allowedAttributes: [
			"value",
			"label",
			"selected",
			"disabled"
		]
	},
	header: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: ["role"],
		childTags: []
	},
	a: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: [
			"href",
			"target",
			"rel",
			"title",
			"download"
		],
		childTags: []
	},
	i: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: ["aria-hidden"],
		childTags: []
	},
	small: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: [],
		childTags: []
	},
	ul: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: ["type"],
		childTags: ["li"]
	},
	li: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: ["value"],
		childTags: []
	}
}, _ = ({ inSpec: e }) => {
	let t = e;
	if (!t) return [];
	if (Array.isArray(t)) return t.flatMap((e) => _({ inSpec: e }));
	if (typeof t != "object") return [];
	let n = [];
	return typeof t.tagName == "string" && t.tagName.trim().length > 0 && n.push(t.tagName.toLowerCase()), Array.isArray(t.children) && t.children.length > 0 && t.children.forEach((e) => {
		let t = _({ inSpec: e });
		n.push(...t);
	}), n;
}, v = ({ inTagsFound: e, inAllowedTags: t }) => {
	let n = e ?? [], r = new Set(Object.keys(t ?? {}).filter((e) => e !== "$schema").map((e) => e.toLowerCase())), i = {}, a = [], o = [];
	n.forEach((e) => {
		i[e] = (i[e] || 0) + 1, r.has(e) ? a.includes(e) || a.push(e) : o.includes(e) || o.push(e);
	});
	let s = n.length, c = o.length === 0;
	return {
		totalTags: s,
		tagCounts: i,
		uniqueTags: Object.keys(i),
		recognizedTags: a,
		unrecognizedTags: o,
		areAllTagsPresent: c
	};
}, y = ({ inSpec: e, inTags: t = g } = {}) => {
	let n = e, r = t, i = v({
		inTagsFound: _({ inSpec: n }),
		inAllowedTags: r
	});
	return {
		areAllTagsPresent: i.areAllTagsPresent,
		totalTags: i.totalTags,
		tagCounts: i.tagCounts,
		uniqueTags: i.uniqueTags,
		recognizedTags: i.recognizedTags,
		unrecognizedTags: i.unrecognizedTags
	};
}, b = (e = {}) => {
	try {
		let t = e;
		return h({ inSpec: t.spec ?? t.inSpec });
	} catch (e) {
		throw console.error("error : ", e), e;
	}
}, x = b;
t({
	inFuncDefinition: b,
	inReviewSpec: y
});
//#endregion
export { h as buildSpec, b as buildSpecElement, b as default, e as meta, y as reviewSpec, x as specToDom };
