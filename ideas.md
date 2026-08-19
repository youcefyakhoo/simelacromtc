# Ideas de diseño — MTC Examen Pro

## Tres direcciones iniciales

### Tema: Ruta Clara
Una experiencia educativa luminosa, editorial y móvil-first que combina señales viales, tarjetas de estudio y progreso visible. Se siente confiable, optimista y muy fácil de escanear.

**Probabilidad:** 0.07

### Tema: Cabina Nocturna
Una interfaz oscura de alto contraste inspirada en paneles de conducción, con acentos vivos y sensación de modo práctica intensiva.

**Probabilidad:** 0.04

### Tema: Cuaderno de Tránsito
Una estética cálida de apuntes de estudio, con papel, resaltadores y anotaciones visuales para hacer que memorizar reglas se sienta menos rígido.

**Probabilidad:** 0.09

## Dirección elegida: Ruta Clara

### Design Movement
Editorial digital contemporáneo con influencias de señalética suiza y diseño de servicios públicos: jerarquía clara, formas funcionales, contraste alto y pequeños gestos humanos.

### Core Principles
1. **Primero la decisión:** cada pantalla debe dejar claro qué practicar, cuánto falta y cuál es el siguiente paso.
2. **Señalética útil:** color, iconos y etiquetas deben comunicar estado o acción, no decorar sin propósito.
3. **Confianza móvil:** controles grandes, lectura rápida y navegación inferior al alcance del pulgar.
4. **Energía contenida:** el naranja impulsa la acción; el azul tinta sostiene la confianza; el menta marca avance.

### Color Philosophy
El azul tinta comunica reglas y seguridad sin verse corporativo. El naranja de seguridad convierte la acción en un momento visible y cálido. El menta se reserva para respuestas correctas y progreso, mientras el marfil reduce la fatiga visual de sesiones largas. La firma cromática es **naranja cono #F26B38**.

### Layout Paradigm
Composición de tablero de ruta: una cabecera asimétrica con contexto y una acción principal, tarjetas apiladas con esquinas variables, una banda de progreso tipo carril y navegación inferior persistente. En desktop la columna de contenido se desplaza ligeramente a la izquierda para reservar una zona respirable de anuncios sin interrumpir el flujo.

### Signature Elements
- Insignias de categoría con pequeños pictogramas de señal vial.
- Barra de progreso como carretera segmentada con hitos numerados.
- Tarjetas con borde lateral de color para distinguir práctica, simulacro y repaso.

### Interaction Philosophy
Cada interacción debe confirmar que el usuario avanzó: una opción elegida se fija con contraste, la respuesta correcta revela una explicación breve y el progreso se guarda en el dispositivo. No hay pantallas muertas; siempre existe una acción de volver, continuar o repasar.

### Animation
Entradas breves de 180–240 ms con desplazamiento vertical de 8 px y opacidad, escalonadas por tarjeta. Las respuestas usan un pulso sutil de borde y una transición de color, no rebotes. Los botones reducen escala a 0.97 al presionar. Se respeta `prefers-reduced-motion` y se evitan animaciones que cambien el layout.

### Typography System
Titulares en **Plus Jakarta Sans**, 800, con tracking ligeramente negativo para sensación de producto. Texto y preguntas en **DM Sans**, 400–600, por legibilidad en pantallas pequeñas. La jerarquía usa titulares compactos de 32–44 px, subtítulos de 15–17 px y etiquetas en 11–12 px con mayúsculas controladas.

### Brand Essence
**La práctica de manejo que convierte dudas en decisiones seguras, para postulantes peruanos que quieren llegar preparados al examen MTC, sin clases pesadas ni interfaces confusas.**

Personalidad: **clara, alentadora, práctica**.

### Brand Voice
Los titulares hablan como un acompañante que conoce el camino: directos, positivos y sin promesas exageradas. Las CTA usan verbos concretos y microcopy tranquilizador.

- “Hoy avanzas una señal más.”
- “Haz un simulacro y mide tu ruta.”

### Wordmark & Logo
El símbolo es una placa de señal redondeada con un check integrado en dos carriles de carretera. El wordmark usa el nombre en Plus Jakarta Sans ExtraBold con un corte naranja en la palabra “Pro”; el símbolo aparece visible en la cabecera y como favicon.

### Signature Brand Color
**Naranja cono — #F26B38**, un naranja de seguridad propio que se reconoce como el momento de actuar.
