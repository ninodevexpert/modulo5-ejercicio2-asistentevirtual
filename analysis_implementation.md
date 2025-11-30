# Plan de Integración OpenAI

## Análisis y Estrategia

Para integrar la API de OpenAI de forma segura y utilizar Structured Outputs, necesitamos evolucionar la arquitectura actual. Dado que el frontend (HTML/JS) se ejecuta en el navegador del usuario, no puede leer archivos `.env` directamente ni guardar secretos de forma segura.

Por ello, la estrategia recomendada es implementar un **Backend For Frontend (BFF)** ligero utilizando Node.js. Este servidor actuará como intermediario: recibirá los datos del formulario, inyectará la API Key (guardada en el servidor) y hará la petición a OpenAI, devolviendo solo el JSON limpio al frontend.

## Pasos de Implementación

### 1. Configuración del Entorno (Backend)
- [ ] Inicializar proyecto Node.js (`npm init -y`).
- [ ] Instalar dependencias:
    - `express`: Servidor web.
    - `dotenv`: Para leer variables de entorno (`.env`).
    - `openai`: SDK oficial de OpenAI.
    - `cors`: Para permitir peticiones desde el frontend (si fuera necesario).
- [ ] Crear archivo `.env` (añadir al `.gitignore`) con `OPENAI_API_KEY`.

### 2. Definición de Structured Outputs (Schema)
- [ ] Diseñar el esquema JSON (Zod o JSON Schema) para garantizar que la IA devuelva estrictamente:
    - Desayuno, Almuerzo, Merienda, Cena.
    - Cada comida con: título, lista de alimentos (cantidad + nombre), notas/consejos.
    - Macros aproximados (opcional pero útil).

### 3. Desarrollo del Servidor (`server.js`)
- [ ] Configurar servidor Express simple.
- [ ] Crear endpoint `POST /api/get-nutrition-plan`.
- [ ] Implementar lógica en el endpoint:
    - Recibir datos del body (edad, peso, altura, etc.).
    - Construir el **System Prompt** dinámico:
        - Rol: "Nutricionista experto".
        - Contexto: Datos del usuario.
        - Instrucción: "Generar plan diario basado en X...".
    - Llamar a `openai.chat.completions.create` con:
        - Modelo: `gpt-4o-2024-08-06` o `gpt-4o-mini` (soportan Structured Outputs).
        - `response_format`: Definido con el schema del paso 2.
    - Manejar errores y devolver JSON al cliente.

### 4. Adaptación del Frontend (`js/app.js`)
- [ ] Modificar `handleFormSubmit`:
    - Reemplazar el `setTimeout` y mock por una llamada real `fetch` al endpoint local (ej. `http://localhost:3000/api/get-nutrition-plan`).
    - Enviar los datos del formulario en el body del POST.
- [ ] Manejar la respuesta asíncrona.
- [ ] Actualizar `renderNutritionPlan` para que coincida exactamente con la estructura devuelta por la API (si difiere del mock actual).
- [ ] Añadir manejo de errores en UI (ej. "Error al conectar con el nutricionista virtual").

### 5. Ejecución
- [ ] Script para correr frontend y backend (o correrlos en terminales separadas).
- [ ] Verificar que `.env` no se sube al repo.

## Estructura de Archivos Propuesta

```
/
├── .env                # API Key (Ignorado por git)
├── .gitignore
├── package.json
├── server.js           # Nuevo Backend
├── index.html
├── css/
│   └── styles.css
└── js/
    └── app.js          # Frontend actualizado
```

