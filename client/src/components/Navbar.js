import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const LogoutUser = () => {
    if (window.confirm("Do you want to logout?")) {
      localStorage.clear();
      window.location.href = "/login";
    } else {
      window.location.href = "/recipes";
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const auth = localStorage.getItem("token");

  const handleToggleMenu = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <nav>
        <div className="nav-left">
          <FontAwesomeIcon
            icon={faBars}
            onClick={toggleMenu}
            style={isOpen ? { transform: "rotate(90deg)" } : {}}
          />
          <h2>Foodie Finder</h2>
        </div>
        <div className={`nav-right ${isOpen ? "open" : ""}`}>
          <ul>
            {auth ? (
              <>
                <li>
                  <NavLink to="/recipes" onClick={handleToggleMenu}>
                    Recipes
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/addRecipe" onClick={handleToggleMenu}>
                    Add Recipe
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/favouriteRecipes" onClick={handleToggleMenu}>
                    Favourites
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/login" onClick={LogoutUser}>
                    Logout
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink to="/login" onClick={handleToggleMenu}>
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/signup" onClick={handleToggleMenu}>
                    SignUp
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/forgotPassword" onClick={handleToggleMenu}>
                    Forgot Password
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
