import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const dataPath = path.join(root, "client/src/data/questions.json");
const questions = JSON.parse(fs.readFileSync(dataPath, "utf8"));
const errors = [];
const licenses = new Set(questions.map((q) => q.license));

if (!Array.isArray(questions) || questions.length < 900) errors.push("El banco tiene menos de 900 preguntas.");
for (const q of questions) {
  if (!q.question?.trim()) errors.push(`Pregunta vacía: ${q.id}`);
  if (!Array.isArray(q.options) || q.options.length !== 4) errors.push(`Alternativas inválidas: ${q.id}`);
  if (!Number.isInteger(q.answer) || q.answer < 0 || q.answer > 3) errors.push(`Respuesta inválida: ${q.id}`);
  if (!q.explanation?.trim()) errors.push(`Explicación vacía: ${q.id}`);
  if (!q.license?.trim()) errors.push(`Licencia vacía: ${q.id}`);
}
for (const file of ["client/public/robots.txt", "client/public/sitemap.xml", "client/src/pages/Legal.tsx"]) {
  if (!fs.existsSync(path.join(root, file))) errors.push(`Falta archivo: ${file}`);
}
const home = fs.readFileSync(path.join(root, "client/src/pages/Home.tsx"), "utf8");
for (const token of ["mtc-answered", "mtc-last-activity", "Reiniciar mi progreso", "R-53", "R-6", "R-3", "bottom-nav"]) {
  if (!home.includes(token)) errors.push(`Falta integración esperada: ${token}`);
}
console.log(JSON.stringify({ questions: questions.length, licenses: [...licenses].sort(), errors }, null, 2));
if (errors.length) process.exit(1);
