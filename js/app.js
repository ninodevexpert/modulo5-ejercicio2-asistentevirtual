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
        
        const itemsList = document.createElement('ul');

        meal.data.items.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = item;
            itemsList.appendChild(listItem);
        });

        mealContent.replaceChildren(itemsList);
        
        if (meal.data.notes) {
            const notes = document.createElement('p');
            notes.textContent = meal.data.notes;
            mealContent.appendChild(notes);
        }
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
async function handleFormSubmit(e) {
    e.preventDefault();
    
    // Recopilar datos del formulario
    const formData = collectFormData();
    
    // Mostrar indicador de carga
    showLoading();
    
    try {
        const response = await fetch('/api/get-nutrition-plan', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const payload = await response.json().catch(() => ({}));

        if (!response.ok) {
            throw new Error(payload.error || 'Error en la respuesta del servidor');
        }
        
        // Renderizar plan nutricional real
        renderNutritionPlan(payload);
        
        // Mostrar resultados
        showResults();

    } catch (error) {
        console.error('Error:', error);
        alert(error.message || 'Hubo un error al generar tu plan. Por favor, intenta de nuevo más tarde.');
        resetForm();
    }
}

// Event Listeners
form.addEventListener('submit', handleFormSubmit);
resetBtn.addEventListener('click', resetForm);
