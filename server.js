require('dotenv').config();
const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.')); // Servir archivos estáticos del frontend

// Configuración OpenAI
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// Esquema para Structured Outputs
const nutritionSchema = {
    type: "object",
    properties: {
        breakfast: {
            type: "object",
            properties: {
                title: { type: "string", description: "Título de la comida (ej: Desayuno Energético)" },
                items: { 
                    type: "array", 
                    items: { type: "string" },
                    description: "Lista de alimentos con sus cantidades exactas"
                },
                notes: { type: "string", description: "Breve explicación de los beneficios nutricionales" }
            },
            required: ["title", "items", "notes"],
            additionalProperties: false
        },
        lunch: {
            type: "object",
            properties: {
                title: { type: "string" },
                items: { 
                    type: "array", 
                    items: { type: "string" }
                },
                notes: { type: "string" }
            },
            required: ["title", "items", "notes"],
            additionalProperties: false
        },
        snack: {
            type: "object",
            properties: {
                title: { type: "string" },
                items: { 
                    type: "array", 
                    items: { type: "string" }
                },
                notes: { type: "string" }
            },
            required: ["title", "items", "notes"],
            additionalProperties: false
        },
        dinner: {
            type: "object",
            properties: {
                title: { type: "string" },
                items: { 
                    type: "array", 
                    items: { type: "string" }
                },
                notes: { type: "string" }
            },
            required: ["title", "items", "notes"],
            additionalProperties: false
        }
    },
    required: ["breakfast", "lunch", "snack", "dinner"],
    additionalProperties: false
};

app.post('/api/get-nutrition-plan', async (req, res) => {
    try {
        const { age, weight, height, activityLevel, allergies, preferences } = req.body;

        if (!process.env.OPENAI_API_KEY) {
            return res.status(500).json({ error: "API Key no configurada en el servidor" });
        }

        const systemPrompt = `Eres un nutricionista experto. Crea un plan de alimentación diario personalizado y saludable.
        
        Perfil del usuario:
        - Edad: ${age} años
        - Peso: ${weight} kg
        - Altura: ${height} cm
        - Nivel de actividad: ${activityLevel}
        
        Restricciones y Preferencias:
        - Alergias/Intolerancias: ${allergies || 'Ninguna'}
        - Gustos: ${preferences || 'Sin preferencias específicas'}

        Instrucciones:
        1. Calcula mentalmente las necesidades calóricas aproximadas.
        2. Diseña 4 comidas equilibradas (Desayuno, Almuerzo, Merienda, Cena).
        3. Especifica CANTIDADES EXACTAS (en gramos/unidades) para cada alimento.
        4. Asegúrate de respetar estrictamente las alergias indicadas.
        5. Usa un tono profesional pero motivador en las notas.
        `;

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-2024-08-06", // Modelo que soporta Structured Outputs
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: "Genera mi plan nutricional para hoy." }
            ],
            response_format: {
                type: "json_schema",
                json_schema: {
                    name: "daily_nutrition_plan",
                    strict: true,
                    schema: nutritionSchema
                }
            }
        });

        const plan = JSON.parse(completion.choices[0].message.content);
        res.json(plan);

    } catch (error) {
        console.error('Error llamando a OpenAI:', error);
        res.status(500).json({ error: "Error generando el plan nutricional. Por favor intenta de nuevo." });
    }
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});

