import fs from "node:fs";
import path from "node:path";
const file = path.join(process.cwd(), "client/src/data/questions.json");
const questions = JSON.parse(fs.readFileSync(file, "utf8"));
let filled = 0;
for (const q of questions) {
  if (!q.explanation || !q.explanation.trim()) {
    const answer = q.options?.[q.answer];
    q.explanation = answer ? `Respuesta oficial: ${answer}` : "Consulta el balotario oficial para revisar esta respuesta.";
    filled++;
  }
}
fs.writeFileSync(file, JSON.stringify(questions, null, 2) + "\n");
console.log(`Explicaciones completadas: ${filled}`);
