import React from "react";
import { NavLink } from "react-router-dom";
import logoClicky from "../../assets/logoClicky.png";

const Logo = () => {
    return (
        <div className="logoClicky-box">
            <NavLink to="/" end>
                <img src={logoClicky} alt="Logo de la página" />
            </NavLink>

        </div>
    );
};

export default Logo;