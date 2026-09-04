import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const courseHtmlPath = path.join(projectRoot, "public", "cursos", "index.html");
const stylesheet = '<link rel="stylesheet" href="/cursos/mobile-kit.css">';
const script = '<script src="/cursos/mobile-course.js" defer></script>';

const originalHtml = await readFile(courseHtmlPath, "utf8");

if (!originalHtml.includes(stylesheet) || !originalHtml.includes(script)) {
  const preparedHtml = originalHtml.replace(
    "</head>",
    `${stylesheet}\n${script}\n</head>`,
  );

  await writeFile(courseHtmlPath, preparedHtml, "utf8");
}
