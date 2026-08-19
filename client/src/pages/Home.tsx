/**
 * Ruta Clara — tablero móvil-first para practicar reglas de tránsito MTC.
 * Este archivo prioriza decisiones rápidas, señalética útil y progreso visible.
 */
import { useMemo, useState } from "react";
import { Link } from "wouter";
import {
  ArrowRight,
  Award,
  BookOpen,
  CarFront,
  Check,
  ChevronRight,
  CircleHelp,
  Clock3,
  Flag,
  Gauge,
  Home as HomeIcon,
  Menu,
  Play,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Target,
  Trophy,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import officialQuestions from "@/data/questions.json";

const heroImage = "/manus-storage/mtc-hero_7b107290.png";
const markImage = "/manus-storage/mtc-mark_71cec40b.png";
const combinedSignalSvg = `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><rect width="800" height="600" rx="28" fill="#f8f5ed"/><path d="M0 470h800" stroke="#d9e5dc" stroke-width="100"/><path d="M400 470V600M0 470h800" stroke="#fff" stroke-width="10" stroke-dasharray="28 22"/><rect x="610" y="116" width="108" height="230" rx="24" fill="#162b3a"/><circle cx="664" cy="176" r="26" fill="#ff5c45"/><path d="M664 204v44m0 0-16-16m16 16 16-16" stroke="#ff5c45" stroke-width="8" fill="none" stroke-linecap="round"/><circle cx="664" cy="280" r="26" fill="#6bd39d"/><path d="M160 470c0-55 45-100 100-100s100 45 100 100v45H160z" fill="#537b9c" stroke="#162b3a" stroke-width="8"/><path d="M260 420v-105" stroke="#f26b38" stroke-width="9" stroke-linecap="round"/><path d="M260 315l-22 28m22-28 22 28" stroke="#f26b38" stroke-width="9" fill="none" stroke-linecap="round"/><path d="M90 405h100" stroke="#f26b38" stroke-width="14" stroke-linecap="round"/><path d="M110 385l-30 20 30 20" fill="none" stroke="#f26b38" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/><text x="400" y="90" text-anchor="middle" font-family="Arial,sans-serif" font-size="26" font-weight="700" fill="#162b3a">Avanza de frente · no gires a la izquierda</text></svg>`)}`;

const visualAssets = {
  signs: "/manus-storage/mtc-visual-signs_0e80c40a.png",
  intersection: "/manus-storage/mtc-visual-intersection_2cf38d14.png",
  roadLines: "/manus-storage/mtc-visual-road-lines_5f69afbd.png",
  trafficLight: "/manus-storage/mtc-visual-traffic-light_c47254e6.png",
  r3: "/manus-storage/mtc-sign-r3_37336e42.png",
  r6: "/manus-storage/mtc-sign-r6_5ea348f4.png",
  amber: "/manus-storage/mtc-amber-light_b8f282c5.png",
  r53: "/manus-storage/mtc-sign-r53_94eea8d9.png",
  combinedSignal: combinedSignalSvg,
} as const;

type Question = {
  id: number;
  category: string;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
};

const questions: Question[] = (officialQuestions as Array<{ id: string; license: string; question: string; options: string[]; answer: number; explanation?: string }>).map((item, index) => ({
  id: index + 1,
  category: item.license,
  question: item.question,
  options: item.options,
  answer: item.answer,
  explanation: item.explanation || `Respuesta oficial: ${item.options[item.answer] || "Revisa el balotario oficial."}`,
}));

const licenseOptions = [
  { value: "ALL", label: "Todas las categorías", short: "Todas" },
  { value: "A-I", label: "Clase A — Categoría I", short: "A-I" },
  { value: "A-IIA", label: "Clase A — Categoría II-A", short: "A-IIA" },
  { value: "A-IIB", label: "Clase A — Categoría II-B", short: "A-IIB" },
  { value: "A-IIIA", label: "Clase A — Categoría III-A", short: "A-IIIA" },
  { value: "A-IIIB", label: "Clase A — Categoría III-B", short: "A-IIIB" },
  { value: "A-IIIC", label: "Clase A — Categoría III-C", short: "A-IIIC" },
  { value: "B-IIA", label: "Clase B — Categoría II-A", short: "B-IIA" },
  { value: "B-IIB", label: "Clase B — Categoría II-B", short: "B-IIB" },
  { value: "B-IIC", label: "Clase B — Categoría II-C", short: "B-IIC" },
];

const categoryMeta = [
  { title: "Clase A — Categoría I", license: "A-I", icon: Flag, color: "orange", description: "Vehículos particulares y reglas generales." },
  { title: "Clase A — Categorías II y III", license: "A-IIA", icon: CarFront, color: "blue", description: "Transporte y conducción profesional." },
  { title: "Clase B — Categorías II y III", license: "B-IIA", icon: ShieldCheck, color: "mint", description: "Vehículos menores y motorizados." },
];

const categories = categoryMeta.map((item) => ({ ...item, count: questions.filter((question) => question.category === item.license || (item.license === "A-IIA" && question.category.startsWith("A-II")) || (item.license === "B-IIA" && question.category.startsWith("B-"))).length }));

function Logo() {
  return <div className="brand-lockup"><img src={markImage} alt="" className="brand-mark" /><span>MTC <em>Examen Pro</em></span></div>;
}

function visualForQuestion(question: string) {
  if (/flecha roja hacia la izquierda y la luz circular verde/i.test(question)) return { src: visualAssets.combinedSignal, alt: "Flecha roja hacia la izquierda y luz circular verde: se puede avanzar de frente, pero no girar a la izquierda" };
  if (/R-53\b/i.test(question)) return { src: visualAssets.r53, alt: "Señal reglamentaria R-53 y vehículo detenido antes del área de una intersección" };
  if (/color ámbar o amarillo del semáforo significa/i.test(question)) return { src: visualAssets.amber, alt: "Semáforo con luz ámbar encendida y vehículo detenido antes de la línea de intersección" };
  if (/R-6\b/i.test(question)) return { src: visualAssets.r6, alt: "Señal reglamentaria R-6 que prohíbe voltear a la izquierda" };
  if (/R-3\b/i.test(question)) return { src: visualAssets.r3, alt: "Señal reglamentaria R-3 con flecha hacia arriba y vehículo continuando de frente" };
  if (/semáforo|luz (verde|ámbar|amarilla|roja)|flecha verde/i.test(question)) return { src: visualAssets.trafficLight, alt: "Ilustración de un semáforo con luces roja, ámbar, verde y flecha direccional" };
  if (/línea|marcas? en el pavimento|pavimento|malla ortogonal/i.test(question)) return { src: visualAssets.roadLines, alt: "Ilustración de una carretera con líneas centrales y laterales" };
  if (/intersección|cruce peatonal|paso peatonal|peatón está cruzando/i.test(question)) return { src: visualAssets.intersection, alt: "Ilustración de una intersección con cruce peatonal y vehículo detenido" };
  // No mostrar una imagen genérica para un código de señal que aún no tenga ilustración exacta.
  return null;
}

function dayKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default function Home() {
  const [activeTab, setActiveTab] = useState("inicio");
  const [selectedLicense, setSelectedLicense] = useState("ALL");
  const [practiceIndex, setPracticeIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(() => Number(localStorage.getItem("mtc-score") || 0));
  const [answeredCount, setAnsweredCount] = useState(() => Number(localStorage.getItem("mtc-answered") || 0));
  const [streak, setStreak] = useState(() => Number(localStorage.getItem("mtc-streak") || 0));

  const filteredQuestions = selectedLicense === "ALL" ? questions : questions.filter((item) => item.category === selectedLicense);
  const question = filteredQuestions[practiceIndex % Math.max(filteredQuestions.length, 1)] || questions[0];
  const answeredCorrect = selected === question.answer;
  const questionVisual = visualForQuestion(question.question);
  const progress = Math.min(100, Math.round((answeredCount / 10) * 100));
  const accuracy = answeredCount ? Math.round((score / answeredCount) * 100) : 0;

  const saveProgress = (newScore: number, newAnswered: number, newStreak: number) => {
    localStorage.setItem("mtc-score", String(newScore));
    localStorage.setItem("mtc-answered", String(newAnswered));
    localStorage.setItem("mtc-streak", String(newStreak));
  };

  const chooseAnswer = (index: number) => {
    if (answered) return;
    setSelected(index);
    setAnswered(true);
    const newAnswered = answeredCount + 1;
    const newScore = index === question.answer ? score + 1 : score;
    const today = dayKey();
    const yesterday = dayKey(new Date(Date.now() - 86400000));
    const lastActivity = localStorage.getItem("mtc-last-activity");
    const newStreak = lastActivity === today ? Math.max(streak, 1) : lastActivity === yesterday ? streak + 1 : 1;
    setScore(newScore);
    setAnsweredCount(newAnswered);
    setStreak(newStreak);
    localStorage.setItem("mtc-last-activity", today);
    saveProgress(newScore, newAnswered, newStreak);
  };

  const nextQuestion = () => {
    setPracticeIndex((value) => value + 1);
    setSelected(null);
    setAnswered(false);
  };

  const reset = () => {
    setScore(0);
    setAnsweredCount(0);
    setStreak(0);
    localStorage.removeItem("mtc-last-activity");
    saveProgress(0, 0, 0);
  };

  const tabTitle = useMemo(() => ({ inicio: "Tu ruta de hoy", practicar: "Práctica rápida", progreso: "Tu progreso" }[activeTab] || "Tu ruta de hoy"), [activeTab]);

  return (
    <div className="app-shell">
      <header className="topbar container">
        <Logo />
        <button className="icon-button" aria-label="Abrir menú"><Menu size={20} /></button>
      </header>

      <main className="container page-content">
        <div className="eyebrow"><span className="eyebrow-dot" /> EXAMEN DE REGLAS MTC <span className="eyebrow-line" /></div>
        <section className="hero-card">
          <div className="hero-copy">
            <span className="hero-kicker"><Sparkles size={14} /> Sesión de 10 minutos</span>
            <h1>Hoy avanzas<br /><span>una señal más.</span></h1>
            <p>Practica con preguntas oficiales, entiende tus errores y llega al examen con más seguridad.</p>
            <Button className="primary-cta" onClick={() => setActiveTab("practicar")}><Play size={16} fill="currentColor" /> Empezar práctica <ArrowRight size={17} /></Button>
          </div>
          <div className="hero-art"><img src={heroImage} alt="Persona preparándose para conducir" /></div>
        </section>

        <div className="content-heading"><div><span className="section-label">{tabTitle}</span><h2>{activeTab === "inicio" ? "Elige cómo quieres practicar" : activeTab === "practicar" ? "Pregunta oficial del balotario" : "Cada respuesta suma"}</h2></div><span className="tiny-status"><span /> Guardado en este dispositivo</span></div>

        {activeTab === "inicio" && <>
          <section className="mode-grid">
            <button className="mode-card mode-card-orange" onClick={() => setActiveTab("practicar")}><div className="mode-icon"><Target size={22} /></div><div><h3>Práctica rápida</h3><p>5 preguntas para entrar en ritmo.</p></div><ChevronRight /></button>
            <button className="mode-card mode-card-navy" onClick={() => setActiveTab("practicar")}><div className="mode-icon"><Trophy size={22} /></div><div><h3>Simulacro MTC</h3><p>Preguntas oficiales según tu licencia.</p></div><ChevronRight /></button>
          </section>

          <section className="progress-panel">
            <div className="progress-top"><div><span className="section-label">TU RUTA</span><h3>Vas tomando el control</h3></div><strong>{progress}%</strong></div>
            <Progress value={progress} className="route-progress" />
            <div className="route-stops"><span className="stop done"><Check size={12} /></span><span className="route-segment filled" /><span className="stop current">2</span><span className="route-segment" /><span className="stop">3</span><span className="route-segment" /><span className="stop">4</span></div>
            <div className="progress-foot"><span><Award size={15} /> {score} respuestas correctas</span><span><Gauge size={15} /> Racha de {streak} días</span></div>
          </section>

          <div className="section-row"><div><span className="section-label">POR TEMA</span><h2>Refuerza lo importante</h2></div><button className="text-link" onClick={() => setActiveTab("practicar")}>Ver todo <ArrowRight size={15} /></button></div>
          <section className="category-list">{categories.map(({ title, count, icon: Icon, color, description }) => <button className="category-card" key={title} onClick={() => setActiveTab("practicar")}><div className={`category-icon ${color}`}><Icon size={20} /></div><div className="category-copy"><h3>{title}</h3><p>{description}</p><small>{count} preguntas</small></div><ChevronRight className="category-arrow" size={19} /></button>)}</section>
          <div className="ad-slot"><span>PUBLICIDAD</span><div>Espacio reservado para AdSense</div></div>
        </>}

        {activeTab === "practicar" && <section className="practice-panel">
          <label className="license-picker"><span>Practicar balotario</span><select value={selectedLicense} onChange={(event) => { setSelectedLicense(event.target.value); setPracticeIndex(0); setSelected(null); setAnswered(false); }}>{licenseOptions.map((option) => <option value={option.value} key={option.value}>{option.label}</option>)}</select></label>
          <div className="question-meta"><span className="question-number">PREGUNTA {practiceIndex + 1} · {question.category}</span><span><Clock3 size={14} /> Sin límite de tiempo</span></div>
          <div className="question-progress"><span style={{ width: `${((practiceIndex % 5) + 1) * 20}%` }} /></div>
          {questionVisual && <div className="question-visual"><img src={questionVisual.src} alt={questionVisual.alt} loading="lazy" /><span>Apoyo visual de estudio</span></div>}
          <h3 className="question-title">{question.question}</h3>
          <div className="answer-list">{question.options.map((option, index) => <button key={option} className={`answer-option ${answered && index === question.answer ? "correct" : ""} ${answered && selected === index && index !== question.answer ? "wrong" : ""}`} onClick={() => chooseAnswer(index)}><span className="answer-letter">{String.fromCharCode(65 + index)}</span><span>{option}</span>{answered && index === question.answer && <Check size={18} />}{answered && selected === index && index !== question.answer && <X size={18} />}</button>)}</div>
          {answered && <div className={`explanation ${answeredCorrect ? "explanation-correct" : "explanation-wrong"}`}><div className="explanation-icon">{answeredCorrect ? <Check size={18} /> : <CircleHelp size={18} />}</div><div><strong>{answeredCorrect ? "¡Muy bien!" : "Casi. Mira la pista."}</strong><p>{question.explanation}</p></div></div>}
          <div className="practice-actions">{answered ? <Button className="primary-cta wide" onClick={nextQuestion}>Siguiente pregunta <ArrowRight size={17} /></Button> : <span className="practice-hint">Toca una respuesta para continuar</span>}</div>
        </section>}

        {activeTab === "progreso" && <section className="progress-page"><div className="big-score"><div className="score-ring"><strong>{accuracy}%</strong><span>aciertos</span></div><div><span className="section-label">PUNTAJE ACTUAL</span><h3>{score >= 7 ? "Vas muy bien" : "Sigue avanzando"}</h3><p>Completa más preguntas para mejorar tu dominio.</p></div></div><div className="stat-grid"><div><Trophy size={19} /><strong>{streak}</strong><span>racha de días</span></div><div><BookOpen size={19} /><strong>{answeredCount}</strong><span>preguntas vistas</span></div><div><ShieldCheck size={19} /><strong>{score}</strong><span>respuestas correctas</span></div></div><button className="reset-button" onClick={reset}><RotateCcw size={15} /> Reiniciar mi progreso</button></section>}
      </main>

      <nav className="bottom-nav" aria-label="Navegación principal"><button className={activeTab === "inicio" ? "active" : ""} onClick={() => setActiveTab("inicio")}><HomeIcon size={20} /><span>Inicio</span></button><button className={activeTab === "practicar" ? "active" : ""} onClick={() => setActiveTab("practicar")}><BookOpen size={20} /><span>Practicar</span><i /></button><button className={activeTab === "progreso" ? "active" : ""} onClick={() => setActiveTab("progreso")}><Gauge size={20} /><span>Progreso</span></button></nav>
      <footer className="site-footer container"><span>© 2026 MTC Examen Pro</span><span className="footer-links"><Link href="/legal">Privacidad</Link><Link href="/legal">Términos</Link><Link href="/legal">Cookies</Link></span></footer>
    </div>
  );
}
