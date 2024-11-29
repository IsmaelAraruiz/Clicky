import React from "react";
import Logo from "./Logo";
import NavBar from "./NavBar";
import CartWidget from "./CartWidget";
import { useContext } from "react";
import { Theme } from "../../context/ThemeProvider";

const Header = () => {

    //! Theme: light / dark
    const { theme } = useContext(Theme);

    return (
        <div className={`header-container-${theme ? "light" : "dark"}`}>
            <Logo />
            <NavBar />
            <CartWidget />
        </div>
    );
};

export default Header;
