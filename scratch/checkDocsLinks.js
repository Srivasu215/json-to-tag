import fs from "fs";
import path from "path";

const docsDir = path.resolve("docs");

function getHtmlFiles(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat && stat.isDirectory()) {
            results = results.concat(getHtmlFiles(filePath));
        } else if (file.endsWith(".html")) {
            results.push(filePath);
        }
    });
    return results;
}

const htmlFiles = getHtmlFiles(docsDir);
console.log(`Found ${htmlFiles.length} HTML files to inspect.`);

let totalChecked = 0;
let brokenLinks = [];

const linkRegex = /(?:href|src)=["']([^"']+)["']/g;

htmlFiles.forEach(file => {
    const content = fs.readFileSync(file, "utf-8");
    let match;

    while ((match = linkRegex.exec(content)) !== null) {
        const url = match[1];

        // Ignore external urls, data urls, mailto, tel, anchors only (#)
        if (
            url.startsWith("http://") ||
            url.startsWith("https://") ||
            url.startsWith("//") ||
            url.startsWith("data:") ||
            url.startsWith("mailto:") ||
            url.startsWith("#") ||
            url.includes("${")
        ) {
            continue;
        }

        totalChecked++;

        // Strip query string and hash
        const cleanUrl = url.split("?")[0].split("#")[0];
        if (!cleanUrl) continue;

        const resolvedPath = path.resolve(path.dirname(file), cleanUrl);

        if (!fs.existsSync(resolvedPath)) {
            brokenLinks.push({
                file: path.relative(process.cwd(), file),
                link: url,
                resolvedPath: path.relative(process.cwd(), resolvedPath)
            });
        }
    }
});

console.log(`Total relative links verified: ${totalChecked}`);

if (brokenLinks.length > 0) {
    console.error(`Found ${brokenLinks.length} broken link(s):`);
    console.error(JSON.stringify(brokenLinks, null, 2));
    process.exit(1);
} else {
    console.log("All relative links in docs/*.html are 100% VALID!");
}
