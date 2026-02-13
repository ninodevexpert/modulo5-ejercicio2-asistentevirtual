# Asistente Virtual Nutricional

Aplicación web que genera planes nutricionales personalizados utilizando la API de OpenAI (Responses API) con Structured Outputs.

## Descripción

Este proyecto es un asistente virtual especializado en nutrición que crea planes de alimentación diarios personalizados basándose en las características individuales del usuario, incluyendo edad, peso, altura, nivel de actividad física, alergias e intolerancias, y preferencias alimentarias.

## Características Principales

- **Planes Personalizados**: Generación de planes nutricionales adaptados a cada usuario
- **Structured Outputs**: Uso de JSON Schema para garantizar respuestas consistentes y estructuradas
- **4 Comidas Diarias**: Desayuno, Almuerzo, Merienda y Cena con cantidades exactas
- **Restricciones Alimentarias**: Respeta alergias, intolerancias y preferencias del usuario
- **Interfaz Moderna**: UI/UX intuitiva y responsive
- **Responses API**: Implementación de la nueva API de OpenAI para respuestas estructuradas

## Tecnologías Utilizadas

### Backend
- **Node.js** con Express.js
- **OpenAI API** (Responses API con modelo gpt-4o-2024-08-06)
- **CORS** para manejo de peticiones cross-origin
- **dotenv** para gestión de variables de entorno

### Frontend
- HTML5
- CSS3 con variables CSS y diseño responsive
- JavaScript vanilla
- Google Fonts (Inter)

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

3. Crea un archivo `.env` en la raíz del proyecto con tu API Key de OpenAI:
```env
OPENAI_API_KEY=tu_api_key_aqui
PORT=3000
```

4. Inicia el servidor:
```bash
node server.js
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

El proyecto utiliza la nueva Responses API de OpenAI con Structured Outputs para garantizar respuestas consistentes:

```javascript
const response = await openai.responses.create({
    model: "gpt-4o-2024-08-06",
    instructions: instructions,
    input: "Genera mi plan nutricional para hoy.",
    text: {
        format: {
            type: "json_schema",
            name: "daily_nutrition_plan",
            strict: true,
            schema: nutritionSchema
        }
    }
});
```

### JSON Schema

Se utiliza un esquema JSON estricto que define la estructura exacta de cada comida:

- `title`: Título descriptivo de la comida
- `items`: Array de alimentos con cantidades exactas
- `notes`: Explicación nutricional y beneficios

## Dependencias

```json
{
  "cors": "^2.8.5",
  "dotenv": "^17.2.3",
  "express": "^5.1.0",
  "openai": "^6.9.1"
}
```

## Notas de Desarrollo

- El proyecto ha sido migrado desde Chat Completions API a Responses API para aprovechar las mejoras en structured outputs
- Se utiliza modo `strict: true` para validación estricta del esquema JSON
- El modelo GPT-4o (2024-08-06) es compatible con Structured Outputs

## Autor

Proyecto desarrollado como parte del Módulo 5 - Ejercicio 2

Nino - AI EXPERT Edición 2 - 2026