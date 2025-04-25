import React, { useEffect, useState } from "react";
import "../styles/RecipeStyle.css";
import { Link } from "react-router-dom";
import "../styles/Searchbar.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    getRecipes();
  }, []);

  const getRecipes = async () => {
    try {
      const response = await fetch("http://localhost:2000/auth/recipe", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch recipe data");
      }

      const data = await response.json();
      setRecipes(data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  const handleDeleteRecipe = async (recipeId) => {
    try {
      if (window.confirm("Are you sure you want to delete this recipe?")) {
        const response = await fetch(
          `http://localhost:2000/auth/recipe/${recipeId}`,
          { method: "DELETE" }
        );

        if (response.ok) {
          toast.success("Recipe deleted successfully");
          getRecipes();
        } else {
          toast.error("Failed to delete recipe");
        }
      }
    } catch (error) {
      toast.error("An error occurred while deleting the recipe");
    }
  };

  const handleAddToFavorites = async (recipeId) => {
    try {
      const response = await fetch(
        `http://localhost:2000/auth/likedRecipes/${recipeId}`,
        { method: "POST" }
      );

      if (response.ok) {
        toast.success("Recipe added to favorites successfully");
      } else {
        const data = await response.json();
        if (data.error === "Recipe already exists in your favorites") {
          toast.warn(data.error);
        } else {
          toast.error(data.error);
        }
      }
    } catch (error) {
      toast.error("An error occurred while adding to favorites");
    }
  };

  const SearchRecipes = async (e) => {
    const value = e.target.value;
    setSearchInput(value); // track input

    try {
      if (value) {
        const response = await fetch(
          `http://localhost:2000/auth/searchRecipes/${value}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const Searchedrecipes = await response.json();
        if (!Searchedrecipes.message) {
          setRecipes(Searchedrecipes);
        } else {
          setRecipes([]);
        }
      } else {
        setRecipes([]);
        getRecipes();
      }
    } catch (e) {
      console.error("Error during search:", e);
    }
  };

  return (
    <div className="RecipesPage">
      <div className="search-bar-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search recipes"
          value={searchInput}
          onChange={SearchRecipes}
        />
      </div>

      {recipes.length > 0 ? (
        <div className="Recipes">
          {recipes.map((recipe) => (
            <div key={recipe._id} className="Recipe">
              <h2>{recipe.title}</h2>
              <img src={recipe.imageUrl} alt={recipe.title} />
              <h3>Ingredients:</h3>
              <ul>
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>

              <div className="instructions-container">
                <h3>Instructions:</h3>
                {recipe.instructions.match(/^\d+\./) ? (
                  <div className="instructions-text">
                    {recipe.instructions.split("\n").map((step, index) => (
                      <p key={index}>{step}</p>
                    ))}
                  </div>
                ) : (
                  <ol className="instructions-list">
                    {recipe.instructions.split("\n").map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ol>
                )}
              </div>

              <button
                className="delete-button"
                onClick={() => handleDeleteRecipe(recipe._id)}
              >
                Delete
              </button>
              <button
                className="add-to-favorites-button"
                onClick={() => handleAddToFavorites(recipe._id)}
              >
                Add to Favorites
              </button>
              <Link to={"/addRecipe"}>Add more recipes</Link>
            </div>
          ))}
        </div>
      ) : (
        searchInput === "" && <h2 className="no-recipes">Discover delicious recipes and save your favorites with Foodie Finder – your flavor companion! <h1>Loading Recipes. . .</h1></h2>
      )}

      <ToastContainer />
    </div>
  );
};

export default Recipes;
