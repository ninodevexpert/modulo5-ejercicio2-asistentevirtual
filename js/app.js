// Datos de ejemplo (mock) para mostrar resultados
const mockNutritionPlan = {
    breakfast: {
        title: "Desayuno",
        items: [
            "Avena integral (60g) con leche de almendras (200ml)",
            "Plátano (1 unidad mediana)",
            "Nueces (15g)",
            "Té verde o café sin azúcar"
        ],
        notes: "Rico en fibra y proteínas para mantenerte saciado hasta el almuerzo."
    },
    lunch: {
        title: "Almuerzo",
        items: [
            "Pechuga de pollo a la plancha (150g)",
            "Arroz integral (80g cocido)",
            "Ensalada mixta con tomate, lechuga y pepino (150g)",
            "Aceite de oliva virgen extra (1 cucharada)",
            "Agua o infusión"
        ],
        notes: "Combinación equilibrada de proteínas, carbohidratos complejos y vegetales."
    },
    snack: {
        title: "Merienda",
        items: [
            "Yogur griego natural (125g)",
            "Fresas frescas (100g)",
            "Semillas de chía (10g)"
        ],
        notes: "Snack ligero y nutritivo para mantener los niveles de energía."
    },
    dinner: {
        title: "Cena",
        items: [
            "Salmón al horno (120g)",
            "Brócoli al vapor (150g)",
            "Quinoa cocida (60g)",
            "Aguacate (50g)",
            "Infusión digestiva"
        ],
        notes: "Cena ligera rica en omega-3 y proteínas de alta calidad."
    }
};

// Referencias a elementos del DOM
const form = document.getElementById('nutritionForm');
const submitBtn = document.getElementById('submitBtn');
const loadingIndicator = document.getElementById('loadingIndicator');
const resultsContainer = document.getElementById('resultsContainer');
const resetBtn = document.getElementById('resetBtn');

// Función para recopilar datos del formulario
function collectFormData() {
    return {
        age: parseInt(document.getElementById('age').value),
        weight: parseFloat(document.getElementById('weight').value),
        height: parseInt(document.getElementById('height').value),
        activityLevel: document.getElementById('activityLevel').value,
        allergies: document.getElementById('allergies').value.trim(),
        preferences: document.getElementById('preferences').value.trim()
    };
}

// Función para renderizar el plan nutricional
function renderNutritionPlan(plan) {
    const meals = [
        { id: 'breakfast', data: plan.breakfast },
        { id: 'lunch', data: plan.lunch },
        { id: 'snack', data: plan.snack },
        { id: 'dinner', data: plan.dinner }
    ];

    meals.forEach(meal => {
        const mealCard = document.getElementById(meal.id);
        const mealContent = mealCard.querySelector('.meal-content');
        
        let html = '<ul>';
        meal.data.items.forEach(item => {
            html += `<li>${item}</li>`;
        });
        html += '</ul>';
        
        if (meal.data.notes) {
            html += `<p style="margin-top: 12px; font-style: italic; color: var(--text-secondary);">${meal.data.notes}</p>`;
        }
        
        mealContent.innerHTML = html;
    });
}

// Función para mostrar el indicador de carga
function showLoading() {
    form.classList.add('hidden');
    loadingIndicator.classList.remove('hidden');
    resultsContainer.classList.add('hidden');
}

// Función para mostrar los resultados
function showResults() {
    loadingIndicator.classList.add('hidden');
    resultsContainer.classList.remove('hidden');
    
    // Scroll suave hacia los resultados
    resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Función para resetear el formulario
function resetForm() {
    form.reset();
    form.classList.remove('hidden');
    resultsContainer.classList.add('hidden');
    loadingIndicator.classList.add('hidden');
    
    // Scroll hacia arriba
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Función principal que maneja el envío del formulario
function handleFormSubmit(e) {
    e.preventDefault();
    
    // Recopilar datos del formulario
    const formData = collectFormData();
    
    // Mostrar indicador de carga
    showLoading();
    
    // Simular tiempo de carga (simulando llamada a API)
    setTimeout(() => {
        // Aquí en el futuro se haría la llamada a la API de OpenAI
        // Por ahora, usamos datos mock
        console.log('Datos del formulario recopilados:', formData);
        console.log('En el futuro, estos datos se usarán para crear el system prompt y llamar a OpenAI API');
        
        // Renderizar plan nutricional con datos mock
        renderNutritionPlan(mockNutritionPlan);
        
        // Mostrar resultados
        showResults();
    }, 2000); // Simula 2 segundos de carga
}

// Event Listeners
form.addEventListener('submit', handleFormSubmit);
resetBtn.addEventListener('click', resetForm);

