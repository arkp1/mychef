import React from "react";
import ClaudeRecipe from "./ClaudeRecipe";
import IngredientsList from "./IngredientsList";
import { getRecipeFromMistral } from "./AI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";

export default function Main() {
  const [ingredients, setIngredients] = React.useState([]);

  const ingredientsListItems = ingredients.map((ingredient) => (
    <li key={ingredient}>{ingredient}</li>
  ));

  //adding ingrediens to the array/list
  function addIngredient(event) {
    event.preventDefault();
    const formEl = event.currentTarget;
    const formData = new FormData(formEl);
    const newIngredient = formData.get("ingredient");
    setIngredients((prevIngredient) => [...ingredients, newIngredient]);
    formEl.reset();
  }

  const [recipe, setRecipe] = React.useState("");

  // function for getting recipe from AI model
  async function getRecipe() {
    const recipeMarkdown = await getRecipeFromMistral(ingredients);
    setRecipe(recipeMarkdown);
  }

  // reset function
  const resetButton = (e) => {
    e.preventDefault();
    window.location.reload();
  }

  return (
    <main>
      <form onSubmit={addIngredient} className="add-ingredient-form">
        <input
          type="text"
          placeholder="e.g. Oregano"
          aria-label="Add ingredient"
          name="ingredient"
          required
        />
        <button className="add-ingredient-button">Add ingredient</button>
        <button onClick={resetButton} className="reset-button">
          <FontAwesomeIcon icon={faRotateRight} />
        </button>
      </form>
      {!ingredients.length && (
        <div className="ingredient-note">
          <p>Add atleast 4 ingredients*</p>
        </div>
      )}
      {ingredients.length > 0 && (
        <IngredientsList 
        getRecipe={getRecipe}
        ingredients={ingredients} />
      )}
      {recipe && <ClaudeRecipe recipe={recipe} />}
    </main>
  );
}
