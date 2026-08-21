# Auditoría de la integración con OpenAI

## Arquitectura actual

La aplicación usa un backend Node.js con Express como intermediario entre el navegador y OpenAI. La clave `OPENAI_API_KEY` solo se lee en el servidor y `.env` está ignorado por Git.

El navegador llama a `POST /api/get-nutrition-plan`; el servidor valida los datos, consulta Responses API y devuelve al frontend únicamente el plan validado.

## Decisiones actualizadas

- Cliente oficial `OpenAI` configurado mediante variables de entorno, con timeout y reintentos acotados.
- Responses API mediante `openai.responses.parse`.
- Structured Outputs mediante un esquema Zod estricto y `zodTextFormat`.
- Resultado consumido desde `response.output_parsed`, sin `JSON.parse` manual.
- Modelo configurable con `OPENAI_MODEL`; valor predeterminado: `gpt-5.6-terra` para equilibrar calidad y coste.
- Datos del usuario separados de las instrucciones para reducir el riesgo de inyección de prompt.
- Validación estricta y límites de longitud en el cuerpo HTTP.
- Tratamiento explícito de negativas, respuestas incompletas, rate limits y errores de API.
- `store: false` para no solicitar almacenamiento de la respuesta en este flujo.
- Renderizado seguro en el navegador mediante `textContent` y nodos DOM.
- Solo se exponen como archivos estáticos `index.html`, `css/` y `js/`.

## Verificación

Ejecutar:

```bash
npm test
npm start
```

Las pruebas unitarias cubren la entrada del endpoint, la estructura del plan, la separación de datos e instrucciones y la detección de negativas.
