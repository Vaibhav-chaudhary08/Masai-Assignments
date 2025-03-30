document.getElementById("recipe-form").addEventListener("submit", function(event){
    event.preventDefault();

    const recipeName = document.getElementById("recipe-name").value;
    const ingredients = document.getElementById("ingredients").value.split('\n');
    const category = document.getElementById("category").value;
    const steps = document.getElementById("steps").value;

    const recipe = { name: recipeName, ingredients, category, steps};
    const recipes = JSON.parse(localStorage.getItem("recipes")) || [];
    recipes.push(recipe);
    localStorage.setItem("recipes", JSON.stringify(recipes));

    displayRecipes();
    this.reset();
});

function displayRecipes(){
    const recipeList = document.getElementById("recipe-list");
    recipeList.innerHTML = "";

    const recipes = JSON.parse(localStorage.getItem("recipes")) || [];
    recipes.forEach((recipe, index) => {
        const card = document.createElement("div");
        card.className = "recipe-card";
        card.innerHTML = `
        <h3>${recipe.name}</h3>
        <p><strong>Category:</strong> #{recipe.category}</p>
        <table>
            <tr><th>Ingredients</th></tr>
            ${recipe.ingredients.map(ing => `<tr><td>${ing}</td></tr>`).join("")}
        </table>
        <p>${recipe.steps}</p>
        `;
        recipeList.appendChild(card);
    });
}

displayRecipes();