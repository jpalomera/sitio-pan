const business = {
  name: "Panaderia La Miga Clara",
  assistantName: "Clara",
  tone:
    "cercano, claro y honesto; responde como una persona amable de una panaderia de barrio, sin inventar datos.",
  facts: [
    {
      id: "horario",
      keywords: ["horario", "abren", "abierto", "cierran", "atienden", "hora"],
      answer:
        "Atendemos de lunes a sabado de 07:30 a 20:00. Los domingos y festivos estamos cerrados.",
    },
    {
      id: "ubicacion",
      keywords: ["ubicacion", "direccion", "donde", "local", "queda", "providencia"],
      answer:
        "Estamos en Av. Italia 1420, Providencia, Santiago. La referencia mas facil es que quedamos a 6 minutos caminando del Metro Santa Isabel.",
    },
    {
      id: "telefono",
      keywords: ["telefono", "whatsapp", "contacto", "llamar", "numero"],
      answer:
        "Puedes escribirnos por WhatsApp al +56 9 4321 8765. Respondemos mensajes durante el horario de atencion.",
    },
    {
      id: "marraqueta",
      keywords: ["marraqueta", "pan batido", "pan frances"],
      answer:
        "La marraqueta cuesta $1.900 el kilo. Sale del horno a las 08:00, 12:30 y 18:00.",
    },
    {
      id: "hallulla",
      keywords: ["hallulla", "hallullas"],
      answer:
        "La hallulla cuesta $2.200 el kilo. Tambien vendemos media bolsa desde $1.100.",
    },
    {
      id: "croissant",
      keywords: ["croissant", "croissants", "dulce", "pasteleria"],
      answer:
        "El croissant de mantequilla cuesta $1.400 por unidad. La caja de 6 unidades cuesta $7.500.",
    },
    {
      id: "torta",
      keywords: ["torta", "tortas", "cumpleanos", "encargo"],
      answer:
        "Hacemos torta tres leches de 15 porciones por $24.900. Los encargos se toman con minimo 24 horas de anticipacion.",
    },
    {
      id: "delivery",
      keywords: ["delivery", "despacho", "envio", "reparto", "domicilio"],
      answer:
        "Tenemos delivery en Providencia, Nunoa y Santiago Centro. Cuesta $2.500 en Providencia y $3.500 en Nunoa o Santiago Centro. El pedido minimo es de $8.000.",
    },
    {
      id: "pago",
      keywords: ["pago", "tarjeta", "efectivo", "transferencia", "debito", "credito"],
      answer:
        "Aceptamos efectivo, debito, credito y transferencia bancaria. Para delivery pedimos pago por transferencia antes del despacho.",
    },
    {
      id: "vegano",
      keywords: ["vegano", "vegana", "sin leche", "sin huevo"],
      answer:
        "Tenemos pan de masa madre vegano a $3.200 la unidad. Por ahora los croissants y tortas no son veganos porque contienen mantequilla, leche o huevo.",
    },
    {
      id: "gluten",
      keywords: ["gluten", "celiaco", "sin gluten", "celiaca"],
      answer:
        "No contamos con productos certificados sin gluten. Trabajamos con harina de trigo en el mismo obrador, asi que no recomendamos nuestros productos para personas celiacas.",
    },
    {
      id: "cambios",
      keywords: ["cambio", "devolucion", "reclamo", "politica", "problema"],
      answer:
        "Si un producto llega en mal estado o distinto a lo pedido, debes avisarnos el mismo dia con una foto. Podemos hacer cambio del producto o devolucion del dinero.",
    },
    {
      id: "reservas",
      keywords: ["reserva", "reservar", "guardar", "apartar"],
      answer:
        "Si quieres asegurar pan o pasteleria, puedes reservar por WhatsApp hasta las 18:00 del dia anterior. Guardamos reservas hasta 30 minutos antes del cierre.",
    },
  ],
};

const fallback =
  "Me encantaria ayudarte, pero no tengo ese dato en la base de conocimiento de La Miga Clara. Para no inventar, te recomiendo escribir al WhatsApp +56 9 4321 8765.";

const greeting =
  "Hola, soy Clara, asistente de Panaderia La Miga Clara. Puedo responder sobre horarios, ubicacion, precios, delivery, pagos, reservas y politicas. Si no lo se, te lo voy a decir sin inventar.";

const messages = document.querySelector("#messages");
const form = document.querySelector("#chat-form");
const input = document.querySelector("#question");
const suggestionButtons = document.querySelectorAll("[data-question]");

function normalize(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function scoreFact(question, fact) {
  const normalizedQuestion = normalize(question);
  return fact.keywords.reduce((score, keyword, index) => {
    const normalizedKeyword = normalize(keyword);
    if (!normalizedQuestion.includes(normalizedKeyword)) return score;
    const intentBoost = index === 0 ? 100 : 0;
    return score + intentBoost + normalizedKeyword.length;
  }, 0);
}

function answerQuestion(question) {
  const rankedFacts = business.facts
    .map((fact) => ({ fact, score: scoreFact(question, fact) }))
    .sort((a, b) => b.score - a.score);

  if (!rankedFacts[0] || rankedFacts[0].score === 0) {
    return fallback;
  }

  return rankedFacts[0].fact.answer;
}

function addMessage(author, text) {
  const message = document.createElement("article");
  message.className = `message ${author === "Cliente" ? "user" : "assistant"}`;

  const label = document.createElement("strong");
  label.textContent = author;

  const content = document.createElement("span");
  content.textContent = text;

  message.append(label, content);
  messages.append(message);
  messages.scrollTop = messages.scrollHeight;
}

function ask(question) {
  const cleanQuestion = question.trim();
  if (!cleanQuestion) return;

  addMessage("Cliente", cleanQuestion);
  addMessage(business.assistantName, answerQuestion(cleanQuestion));
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  ask(input.value);
  input.value = "";
  input.focus();
});

suggestionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    ask(button.dataset.question);
  });
});

addMessage(business.assistantName, greeting);
