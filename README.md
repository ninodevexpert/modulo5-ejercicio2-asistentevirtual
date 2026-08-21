# Asistente Virtual Nutricional

Aplicación web que genera planes nutricionales personalizados utilizando la API de OpenAI (Responses API) con Structured Outputs.

## Descripción

Este proyecto es un asistente virtual especializado en nutrición que crea planes de alimentación diarios personalizados basándose en las características individuales del usuario, incluyendo edad, peso, altura, nivel de actividad física, alergias e intolerancias, y preferencias alimentarias.

## Características Principales

- **Planes Personalizados**: Generación de planes nutricionales adaptados a cada usuario
- **Structured Outputs**: Uso de Zod y el parser del SDK oficial para obtener respuestas validadas
- **4 Comidas Diarias**: Desayuno, Almuerzo, Merienda y Cena con cantidades exactas
- **Restricciones Alimentarias**: Respeta alergias, intolerancias y preferencias del usuario
- **Interfaz Moderna**: UI/UX intuitiva y responsive
- **Responses API**: Implementación de la nueva API de OpenAI para respuestas estructuradas

## Tecnologías Utilizadas

### Backend
- **Node.js** con Express.js
- **OpenAI API** (Responses API con un modelo configurable)
- **Zod** para validar tanto la entrada HTTP como la salida del modelo
- **dotenv** para gestión de variables de entorno

### Frontend
- HTML5
- CSS3 con variables CSS y diseño responsive
- JavaScript vanilla
- Google Fonts (DM Serif Display e Inter)

## Estructura del Proyecto

```
.
├── server.js              # Servidor Express y configuración de API
├── index.html            # Interfaz de usuario principal
├── js/
│   └── app.js           # Lógica del frontend
├── css/
│   └── styles.css       # Estilos de la aplicación
├── package.json         # Dependencias del proyecto
├── .env                 # Variables de entorno (no incluido en repo)
└── README.md           # Este archivo
```

## Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/ninodevexpert/modulo5-ejercicio2-asistentevirtual.git
cd modulo5-ejercicio2-asistentevirtual
```

2. Instala las dependencias:
```bash
npm install
```

3. Copia `.env.example` como `.env` y añade tu API key de OpenAI:
```env
OPENAI_API_KEY=tu_api_key_aqui
# Opcional; por defecto se usa gpt-5.6-terra
OPENAI_MODEL=gpt-5.6-terra
PORT=3000
```

4. Inicia el servidor:
```bash
npm start
```

5. Abre tu navegador en `http://localhost:3000`

## Uso

1. Completa el formulario con tus datos personales:
   - Edad
   - Peso (kg)
   - Altura (cm)
   - Nivel de actividad física

2. Opcionalmente, indica:
   - Alergias e intolerancias alimentarias
   - Gustos y preferencias alimentarias

3. Haz clic en "Obtener Plan Nutricional"

4. Espera mientras la IA genera tu plan personalizado

5. Revisa tu plan nutricional diario con 4 comidas detalladas

## API Endpoint

### POST `/api/get-nutrition-plan`

Genera un plan nutricional personalizado.

**Request Body:**
```json
{
  "age": 30,
  "weight": 70,
  "height": 175,
  "activityLevel": "moderate",
  "allergies": "lactosa",
  "preferences": "comida mediterránea"
}
```

**Response:**
```json
{
  "breakfast": {
    "title": "Desayuno Energético",
    "items": [
      "Avena integral (60g) con leche de almendras (200ml)",
      "Plátano (1 unidad mediana)",
      "Nueces (15g)"
    ],
    "notes": "Rico en fibra y proteínas..."
  },
  "lunch": { ... },
  "snack": { ... },
  "dinner": { ... }
}
```

## Implementación Técnica

### Responses API de OpenAI

El proyecto utiliza Responses API con el parser de Structured Outputs del SDK oficial. El cliente lee `OPENAI_API_KEY` del entorno, y el modelo se puede cambiar mediante `OPENAI_MODEL`:

```javascript
const response = await openai.responses.parse({
    model: process.env.OPENAI_MODEL || "gpt-5.6-terra",
    instructions: nutritionInstructions,
    input: [{
        role: "user",
        content: [{ type: "input_text", text: buildModelInput(profile) }]
    }],
    text: {
        format: zodTextFormat(nutritionPlanSchema, "daily_nutrition_plan")
    },
    store: false
});

const plan = response.output_parsed;
```

### JSON Schema

Se utiliza un esquema Zod estricto que el SDK convierte a JSON Schema y que define la estructura exacta de cada comida:

- `title`: Título descriptivo de la comida
- `items`: Array de alimentos con cantidades exactas
- `notes`: Explicación nutricional y beneficios

## Dependencias

```json
{
  "dotenv": "^17.2.3",
  "express": "^5.1.0",
  "openai": "^7.5.0",
  "zod": "^4.4.3"
}
```

## Notas de Desarrollo

- El proyecto usa `responses.parse`, `zodTextFormat` y `response.output_parsed`, evitando `JSON.parse` manual.
- Los datos del usuario se envían como entrada y no se interpolan en las instrucciones del desarrollador.
- Se contemplan respuestas incompletas, negativas de seguridad, límites de uso y errores de la API.
- `store: false` evita solicitar almacenamiento de la respuesta en OpenAI para este caso de uso.
- El frontend trata la salida del modelo como texto, sin insertarla mediante `innerHTML`.

## Pruebas

```bash
npm test
```

## Autor

Proyecto desarrollado como parte del Módulo 5 - Ejercicio 2

Nino - AI EXPERT Edición 2 - 2026
