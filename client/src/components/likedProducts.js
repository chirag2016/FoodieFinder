import React, { useState, useEffect } from "react";
import "../styles/likedProducts.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LikedProducts = () => {
  const [likedProducts, setLikedProducts] = useState([]);

  useEffect(() => {
    fetchLikedProducts();
  }, []);

  const fetchLikedProducts = async () => {
    try {
      const response = await fetch("http://localhost:2000/auth/likedRecipes");

      if (!response.ok) {
        toast.error("Failed to fetch liked recipes");
        return;
      }

      const data = await response.json();
      setLikedProducts(data);
    } catch (error) {
      console.error(error);
      toast.error("Error fetching liked recipes");
    }
  };

  const handleRemoveItem = async (recipeId) => {
    try {
      const confirm = window.confirm("Are you sure you want to remove this recipe from favourites?");
      if (!confirm) return;

      const response = await fetch(`http://localhost:2000/auth/removeLiked/${recipeId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Recipe removed from favourites");
        fetchLikedProducts();
      } else {
        const data = await response.json();
        toast.error(data.error || "Failed to remove recipe");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error removing recipe");
    }
  };

  return (
    <div className="likedRecipes">
      <h2>Favourites</h2>
      <ul>
        {likedProducts.map((product) => (
          <li key={product._id} className="list">
            <div>
              <h3>{product.title}</h3>
              <p>{product.description}</p>
              <img src={product.imageUrl} alt={product.title} />

              <h4>Ingredients:</h4>
              {product.ingredients.length > 0 ? (
                <ul className="ingredients-list">
                  {product.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              ) : (
                <p>No ingredients listed.</p>
              )}

              <div className="instructions-container">
                <h4>Instructions:</h4>
                <div className="instructions-list">
                  {product.instructions
                    ? product.instructions.split("\n").map((step, index) => (
                        <p key={index}>{step}</p>
                      ))
                    : <p>No instructions provided.</p>}
                </div>
              </div>

              <button
                className="remove-item-button"
                onClick={() => handleRemoveItem(product._id)}
              >
                Remove Item
              </button>
            </div>
          </li>
        ))}
      </ul>
      <ToastContainer />
    </div>
  );
};

export default LikedProducts;
