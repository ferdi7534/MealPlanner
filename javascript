let currentStep = 0;
const steps = document.querySelectorAll(".step");

const DAYS = ["Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi","Dimanche"];

const MEALS = {
  standard: ["Poulet riz", "Pâtes", "Steak", "Poisson", "Burger", "Pizza", "Tacos"],
  vegetarien: ["Pâtes pesto", "Riz légumes", "Salade", "Curry", "Wrap", "Pizza fromage", "Falafel"]
};

function showStep(index) {
  steps.forEach(step => step.classList.remove("active"));
  steps[index].classList.add("active");
}

function nextStep() {
  currentStep++;
  showStep(currentStep);
}

function prevStep() {
  currentStep--;
  showStep(currentStep);
}

function generatePlan() {
  const diet = document.getElementById("diet").value;
  const people = document.getElementById("people").value;
  const budget = document.getElementById("budget").value;

  let html = `<p>👥 ${people} personne(s) • 💰 ${budget}€/pers</p>`;

  DAYS.forEach((day, i) => {
    html += `
      <div style="margin:10px;padding:10px;border-bottom:1px solid #eee">
        <strong>${day}</strong><br>
        🍽 ${MEALS[diet][i]}<br>
        ℹ️ ~600 kcal • IG moyen
      </div>
    `;
  });

  document.getElementById("result").innerHTML = html;
  nextStep();
}

function resetApp() {
  currentStep = 0;
  showStep(currentStep);
}
const isUserAllowed = false;

if (!isUserAllowed) {
  window.location.href = "not-registered.html";
}
  

showStep(0);
const steps = ["Régime", "Allergies", "Repas", "Budget"];
let currentStep = 0;

function renderStepIndicator() {
  const container = document.getElementById("step-indicator");
  container.innerHTML = "";

  steps.forEach((step, index) => {
    const circle = document.createElement("div");
    circle.classList.add("step-circle");

    if (index < currentStep) {
      circle.classList.add("step-completed");
      circle.textContent = "✔";
    } else if (index === currentStep) {
      circle.classList.add("step-current");
      circle.textContent = index + 1;
    } else {
      circle.classList.add("step-upcoming");
      circle.textContent = index + 1;
    }

    container.appendChild(circle);

    if (index < steps.length - 1) {
      const line = document.createElement("div");
      line.classList.add(
        "step-line",
        index < currentStep ? "step-line-active" : ""
      );
      container.appendChild(line);
    }
  });
}
renderStepIndicator();
const MEAL_ICONS = {
  petit_dejeuner: "☕",
  dejeuner: "☀️",
  diner: "🌙"
};

const MEAL_LABELS = {
  petit_dejeuner: "Petit-déj",
  dejeuner: "Déjeuner",
  diner: "Dîner"
};

function getGIClass(gi) {
  if (gi <= 55) return "badge-gi-low";
  if (gi <= 69) return "badge-gi-mid";
  return "badge-gi-high";
}

function getGILabel(gi) {
  if (gi <= 55) return "IG Bas";
  if (gi <= 69) return "IG Moyen";
  return "IG Élevé";
}

function createMealCard(day, meals, mealsToShow) {
  let html = `
    <div class="meal-card">
      <div class="meal-card-header">${day}</div>
      <div class="meal-card-body">
  `;

  mealsToShow.forEach(type => {
    const meal = meals[type];
    if (!meal) return;

    const name = typeof meal === "string" ? meal : meal.name;
    const calories = meal.calories_per_100g;
    const gi = meal.glycemic_index;

    html += `
      <div class="meal-row">
        <div class="meal-icon">${MEAL_ICONS[type]}</div>
        <div>
          <div class="meal-label">${MEAL_LABELS[type]}</div>
          <div class="meal-name">${name}</div>
    `;

    if (calories || gi) {
      html += `<div class="badges">`;
      if (calories) {
        html += `<div class="badge badge-cal">🔥 ${calories} kcal</div>`;
      }
      if (gi) {
        html += `<div class="badge ${getGIClass(gi)}">⚡ ${getGILabel(gi)} (${gi})</div>`;
      }
      html += `</div>`;
    }

    html += `</div></div>`;
  });

  html += `</div></div>`;
  return html;
}
const container = document.getElementById("meal-cards");
container.innerHTML = "";

mealPlan.meals.forEach((dayMeal, index) => {
  container.innerHTML += createMealCard(
    dayMeal.day || DAYS[index],
    dayMeal,
    ["petit_dejeuner", "dejeuner", "diner"]
  );
});
const CATEGORY_ICONS = {
  "Fruits & Légumes": "🍎",
  "Viandes & Poissons": "🥩",
  "Produits laitiers": "🥛",
  "Féculents & Céréales": "🌾",
  "Épicerie": "📦",
  "Autre": "🛒"
};

const CATEGORY_COLORS = {
  "Fruits & Légumes": "#dcfce7",
  "Viandes & Poissons": "#fee2e2",
  "Produits laitiers": "#e0f2fe",
  "Féculents & Céréales": "#fef3c7",
  "Épicerie": "#ede9fe",
  "Autre": "#f1f5f9"
};

let checkedItems = {};

function renderShoppingList(items, totalPrice) {
  const container = document.getElementById("shopping-list");
  checkedItems = {};

  // Regroupement par catégorie
  const grouped = {};
  items.forEach(item => {
    const cat = item.category || "Autre";
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push(item);
  });

  let checkedCount = 0;

  let html = `
    <div class="shopping-header">
      <div class="shopping-title">🛒 Liste de courses</div>
      <div class="shopping-badge">
        <span id="checked-count">0</span> / ${items.length} articles
      </div>
    </div>
  `;

  Object.entries(grouped).forEach(([category, catItems]) => {
    html += `
      <div class="category-card">
        <div class="category-header" style="background:${CATEGORY_COLORS[category] || CATEGORY_COLORS["Autre"]}">
          ${CATEGORY_ICONS[category] || "🛒"} ${category}
          <span class="category-count">${catItems.length}</span>
        </div>
        <div class="category-body">
    `;

    catItems.forEach(item => {
      html += `
        <div class="shopping-item" data-name="${item.item}">
          <input type="checkbox" onchange="toggleShoppingItem('${item.item}')" />
          <div>
            <div class="shopping-name">${item.item}</div>
            <div class="shopping-qty">${item.quantity}</div>
          </div>
          <div class="shopping-price">${item.estimated_price.toFixed(2)}€</div>
        </div>
      `;
    });

    html += `</div></div>`;
  });

  html += `
    <div class="total-card">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <span>Total estimé</span>
        <span class="total-price">${totalPrice.toFixed(2)}€</span>
      </div>
      <p style="font-size:12px;opacity:0.8;margin-top:4px">
        *Prix indicatifs basés sur les moyennes du marché
      </p>
    </div>
  `;

  container.innerHTML = html;
}

function toggleShoppingItem(name) {
  checkedItems[name] = !checkedItems[name];

  const itemEl = document.querySelector(`.shopping-item[data-name="${name}"]`);
  const nameEl = itemEl.querySelector(".shopping-name");
  const priceEl = itemEl.querySelector(".shopping-price");

  itemEl.classList.toggle("checked", checkedItems[name]);
  nameEl.classList.toggle("checked", checkedItems[name]);
  priceEl.classList.toggle("checked", checkedItems[name]);

  const count = Object.values(checkedItems).filter(Boolean).length;
  document.getElementById("checked-count").textContent = count;
}
renderShoppingList(
  mealPlan.shopping_list,
  mealPlan.total_estimated_price
);
const COMMON_ALLERGIES = [
  "Gluten", "Lactose", "Arachides", "Fruits à coque",
  "Œufs", "Poisson", "Crustacés", "Soja", "Sésame", "Moutarde"
];

let selectedAllergies = [];

function renderAllergiesSelector() {
  const container = document.getElementById("allergies-selector");
  container.innerHTML = "";

  // Allergies communes
  const commonDiv = document.createElement("div");
  commonDiv.className = "allergy-badges";

  COMMON_ALLERGIES.forEach(allergy => {
    const badge = document.createElement("div");
    const selected = selectedAllergies.includes(allergy);

    badge.className = `badge ${selected ? "badge-selected" : "badge-outline"}`;
    badge.innerHTML = selected ? `${allergy} <span class="badge-x">✕</span>` : allergy;

    badge.onclick = () => toggleAllergy(allergy);
    commonDiv.appendChild(badge);
  });

  container.appendChild(commonDiv);

  // Input allergie personnalisée
  const inputRow = document.createElement("div");
  inputRow.className = "allergy-input-row";
  inputRow.innerHTML = `
    <input id="custom-allergy" class="allergy-input" placeholder="Autre allergie..." />
    <button id="add-allergy" class="add-btn">+</button>
  `;
  container.appendChild(inputRow);

  const input = inputRow.querySelector("#custom-allergy");
  const btn = inputRow.querySelector("#add-allergy");

  btn.onclick = () => addCustomAllergy(input.value);
  input.onkeypress = e => e.key === "Enter" && addCustomAllergy(input.value);

  // Allergies personnalisées
  const custom = selectedAllergies.filter(a => !COMMON_ALLERGIES.includes(a));
  if (custom.length) {
    const customDiv = document.createElement("div");
    customDiv.className = "allergy-badges";
    customDiv.style.marginTop = "10px";

    custom.forEach(allergy => {
      const badge = document.createElement("div");
      badge.className = "badge badge-selected";
      badge.innerHTML = `${allergy} <span class="badge-x">✕</span>`;
      badge.onclick = () => toggleAllergy(allergy);
      customDiv.appendChild(badge);
    });

    container.appendChild(customDiv);
  }
}

function toggleAllergy(allergy) {
  if (selectedAllergies.includes(allergy)) {
    selectedAllergies = selectedAllergies.filter(a => a !== allergy);
  } else {
    selectedAllergies.push(allergy);
  }
  renderAllergiesSelector();
}

function addCustomAllergy(value) {
  const allergy = value.trim();
  if (allergy && !selectedAllergies.includes(allergy)) {
    selectedAllergies.push(allergy);
    renderAllergiesSelector();
  }
}
renderAllergiesSelector();
console.log(selectedAllergies);
let budgetValue = 50;

function renderBudgetSelector() {
  const container = document.getElementById("budget-selector");

  container.innerHTML = `
    <div class="budget-container">
      <div class="budget-label">
        Budget hebdomadaire par personne
      </div>

      <div class="budget-input-wrapper">
        <div class="budget-icon">💼</div>
        <input
          id="budget-input"
          class="budget-input"
          type="number"
          min="10"
          max="500"
          step="5"
          value="${budgetValue}"
        />
        <div class="budget-euro">€</div>
      </div>

      <div class="budget-help">
        Entrez votre budget souhaité pour la semaine
      </div>

      <div class="budget-presets">
        <button class="budget-btn budget-eco" onclick="setBudget(25)">
          <small>Économique</small>
          <strong>25€</strong>
        </button>
        <button class="budget-btn budget-mid" onclick="setBudget(50)">
          <small>Moyen</small>
          <strong>50€</strong>
        </button>
        <button class="budget-btn budget-comfort" onclick="setBudget(80)">
          <small>Confort</small>
          <strong>80€</strong>
        </button>
      </div>
    </div>
  `;

  document
    .getElementById("budget-input")
    .addEventListener("input", e => {
      budgetValue = parseFloat(e.target.value) || 0;
    });
}

function setBudget(value) {
  budgetValue = value;
  document.getElementById("budget-input").value = value;
}
renderBudgetSelector();
console.log(budgetValue);
const DIET_OPTIONS = [
  { value: "standard", label: "Standard", icon: "🍽️", color: "#475569" },
  { value: "halal", label: "Halal", icon: "🌙", color: "#059669" },
  { value: "kasher", label: "Kasher", icon: "⭐", color: "#2563eb" },
  { value: "vegetarien", label: "Végétarien", icon: "🥬", color: "#16a34a" },
  { value: "vegan", label: "Vegan", icon: "✨", color: "#7c3aed" },
  { value: "autre", label: "Autre", icon: "❓", color: "#d97706" },
];

let dietValue = "standard";
let customDietValue = "";

function renderDietSelector() {
  const container = document.getElementById("diet-selector");
  container.innerHTML = "";

  const grid = document.createElement("div");
  grid.className = "diet-grid";

  DIET_OPTIONS.forEach(opt => {
    const card = document.createElement("div");
    card.className = `diet-card ${dietValue === opt.value ? "selected" : ""}`;
    card.onclick = () => setDiet(opt.value);

    card.innerHTML = `
      <div class="diet-icon" style="background:${opt.color}">
        ${opt.icon}
      </div>
      <div class="diet-label">${opt.label}</div>
    `;

    grid.appendChild(card);
  });

  container.appendChild(grid);

  if (dietValue === "autre") {
    const textareaWrap = document.createElement("div");
    textareaWrap.className = "diet-textarea";
    textareaWrap.innerHTML = `
      <textarea
        placeholder="Décrivez votre régime alimentaire spécifique..."
      >${customDietValue}</textarea>
    `;

    textareaWrap.querySelector("textarea").oninput = e => {
      customDietValue = e.target.value;
    };

    container.appendChild(textareaWrap);
  }
}

function setDiet(value) {
  dietValue = value;
  if (value !== "autre") customDietValue = "";
  renderDietSelector();
}
renderDietSelector();
console.log(dietValue, customDietValue);
const MEALS = [
  { value: "petit_dejeuner", label: "Petit-déjeuner", icon: "☕", time: "7h - 9h" },
  { value: "dejeuner", label: "Déjeuner", icon: "☀️", time: "12h - 14h" },
  { value: "diner", label: "Dîner", icon: "🌙", time: "19h - 21h" },
];

let selectedMeals = ["dejeuner", "diner"];

function renderMealsSelector() {
  const container = document.getElementById("meals-selector");
  container.innerHTML = "";

  const grid = document.createElement("div");
  grid.className = "meals-grid";

  MEALS.forEach(meal => {
    const isSelected = selectedMeals.includes(meal.value);

    const card = document.createElement("div");
    card.className = `meal-option ${isSelected ? "selected" : ""}`;
    card.onclick = () => toggleMeal(meal.value);

    card.innerHTML = `
      ${isSelected ? `<div class="meal-check">✔</div>` : ""}
      <div class="meal-icon">${meal.icon}</div>
      <div class="meal-label">${meal.label}</div>
      <div class="meal-time">${meal.time}</div>
    `;

    grid.appendChild(card);
  });

  container.appendChild(grid);
}

function toggleMeal(value) {
  if (selectedMeals.includes(value)) {
    selectedMeals = selectedMeals.filter(v => v !== value);
  } else {
    selectedMeals.push(value);
  }
  renderMealsSelector();
}
renderMealsSelector();
console.log(selectedMeals);
