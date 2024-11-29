import React, { useState} from "react";
import { NavLink } from "react-router-dom";


const NavBar = () => {

  const [isDropDownOpen, setisDropDownOpen] = useState(false);

  //! Function handleDropDown

  //* Función para abrir el dropDownMenu
  const handleDropDown = () => {
    setisDropDownOpen(!isDropDownOpen);
  };

  //! Function handleDropDown

  //* Función para cerrar el dropDownMenu cuando se elije una categoría
  const closeDropDown = () => {
    setisDropDownOpen(false);
  };

  return (
    <nav className="navBar">
      <ul>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? "isActive" : undefined)}
            to="/" onClick={closeDropDown} end>
            Home
          </NavLink>
        </li>

        {/* Menú desplegable - Categorías*/}
        <li>
          {/* Botón para desplegar categorías */}
          <button className={`btn-dropDown-toggle ${isDropDownOpen ? "open" : ""}`} // Clase condicional
            onClick={handleDropDown} aria-expanded={isDropDownOpen}>
            Categories
          </button>

          {/* Lista de categorías */}
          <ul className={`dropDownMenu-container ${isDropDownOpen ? "open" : ""}`}>

            <li>
              <NavLink
                className={({ isActive }) => (isActive ? "isActive" : undefined)}
                to="/category/100" onClick={closeDropDown}>
                Keyboards - 100%
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? "isActive" : undefined)}
                to="/category/70" onClick={closeDropDown}>
                Keyboards - 70%
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? "isActive" : undefined)}
                to="/category/60" onClick={closeDropDown}>
                Keyboards - 60%
              </NavLink>
            </li>

          </ul>

        </li>

      </ul>
    </nav>
  );
};

export default NavBar;