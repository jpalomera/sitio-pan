# Proyecto 1: El asistente que responde por tu negocio

## Negocio elegido

Panaderia La Miga Clara, una panaderia de barrio ubicada en Providencia.

## Canal y formato

Chat embebido en una pagina web estatica. No usa API pagada, servidor ni suscripcion. Se abre directamente desde `index.html`.

## Tono del asistente

Clara responde con un tono cercano, claro y honesto, como una persona amable de una panaderia de barrio. Si no tiene una respuesta en la base de conocimiento, lo admite y recomienda contactar al negocio por WhatsApp.

## Base de conocimiento

El asistente conoce estos datos concretos:

1. Nombre del negocio: Panaderia La Miga Clara.
2. Direccion: Av. Italia 1420, Providencia, Santiago.
3. Referencia: 6 minutos caminando desde Metro Santa Isabel.
4. Horario: lunes a sabado de 07:30 a 20:00.
5. Domingos y festivos: cerrado.
6. WhatsApp: +56 9 4321 8765.
7. Marraqueta: $1.900 el kilo.
8. Hornadas de marraqueta: 08:00, 12:30 y 18:00.
9. Hallulla: $2.200 el kilo.
10. Croissant de mantequilla: $1.400 por unidad.
11. Caja de 6 croissants: $7.500.
12. Torta tres leches de 15 porciones: $24.900.
13. Encargos de torta: minimo 24 horas de anticipacion.
14. Delivery: Providencia, Nunoa y Santiago Centro.
15. Costo de delivery: $2.500 en Providencia y $3.500 en Nunoa o Santiago Centro.
16. Pedido minimo para delivery: $8.000.
17. Medios de pago: efectivo, debito, credito y transferencia.
18. Producto vegano: pan de masa madre vegano a $3.200.
19. Sin gluten: no hay productos certificados sin gluten.
20. Politica de cambios: avisar el mismo dia con foto si el producto llega mal o distinto.
21. Reservas: hasta las 18:00 del dia anterior por WhatsApp.
22. Reservas guardadas: hasta 30 minutos antes del cierre.

## Ejemplos de prueba

- Pregunta: "Cual es el horario?"
  - Respuesta esperada: lunes a sabado de 07:30 a 20:00, domingos y festivos cerrado.
- Pregunta: "Cuanto cuesta la marraqueta?"
  - Respuesta esperada: $1.900 el kilo y horarios de hornada.
- Pregunta: "Hacen delivery en Providencia?"
  - Respuesta esperada: zonas, costo y pedido minimo de delivery.
- Pregunta: "Tienen productos sin gluten?"
  - Respuesta esperada: no hay productos certificados sin gluten.
- Pregunta: "Venden cafe?"
  - Respuesta esperada: admite que no tiene ese dato y no inventa.

## Como funciona

El archivo `script.js` tiene una base de conocimiento con preguntas por palabras clave. Cuando llega una pregunta, el asistente busca la coincidencia mas fuerte. Si no encuentra ningun dato relacionado, usa una respuesta de seguridad para no inventar informacion.
