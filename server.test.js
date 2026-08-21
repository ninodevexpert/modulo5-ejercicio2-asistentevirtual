const test = require('node:test');
const assert = require('node:assert/strict');

const {
    buildModelInput,
    findRefusal,
    nutritionPlanSchema,
    nutritionRequestSchema
} = require('./server');

const validProfile = {
    age: 30,
    weight: 70,
    height: 175,
    activityLevel: 'moderate',
    allergies: 'lactosa',
    preferences: 'comida mediterranea'
};

const validMeal = {
    title: 'Comida equilibrada',
    items: ['Alimento (100 g)'],
    notes: 'Ejemplo orientativo.'
};

test('acepta un perfil valido y rechaza campos inesperados', () => {
    assert.equal(nutritionRequestSchema.safeParse(validProfile).success, true);
    assert.equal(
        nutritionRequestSchema.safeParse({ ...validProfile, admin: true }).success,
        false
    );
});

test('rechaza valores fuera de rango', () => {
    assert.equal(nutritionRequestSchema.safeParse({ ...validProfile, age: 0 }).success, false);
    assert.equal(
        nutritionRequestSchema.safeParse({ ...validProfile, activityLevel: 'unknown' }).success,
        false
    );
});

test('valida la estructura completa del plan', () => {
    const plan = {
        breakfast: validMeal,
        lunch: validMeal,
        snack: validMeal,
        dinner: validMeal
    };

    assert.equal(nutritionPlanSchema.safeParse(plan).success, true);
    assert.equal(nutritionPlanSchema.safeParse({ ...plan, extra: true }).success, false);
});

test('serializa el perfil como datos separados de las instrucciones', () => {
    const input = JSON.parse(buildModelInput(validProfile));

    assert.equal(input.profile.age_years, 30);
    assert.equal(input.profile.allergies_or_intolerances, 'lactosa');
});

test('detecta una negativa estructurada de la Responses API', () => {
    const refusal = findRefusal({
        output: [
            {
                type: 'message',
                content: [{ type: 'refusal', refusal: 'No puedo ayudar con eso.' }]
            }
        ]
    });

    assert.equal(refusal, 'No puedo ayudar con eso.');
});
