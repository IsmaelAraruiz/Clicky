import React, { useContext } from "react";
import { Theme } from "../../context/ThemeProvider";
import { Cart as cartContext } from "../../context/CartProvider";
import ThemeSwitch from "./ThemeSwitch";
import { NavLink } from "react-router-dom";

const CartWidget = () => {

    //! Context
    const { theme, setTheme } = useContext(Theme);
    const { totalItems } = useContext(cartContext);

    return (
        <>
            <div className="operations-container">

                <section className="section-themSwitch">
                    <ThemeSwitch checked={theme} setChecked={setTheme}></ThemeSwitch>
                </section>

                <section className="section-cart">
                    <NavLink to="/cart">
                        <div className="cart-icon-box">
                            <div className="cart-icon" title="cart">
                                <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"  >
                                    <path d="M14.6646 2.32919C15.0351 2.14395 15.4856 2.29412 15.6708 2.6646L17.872 7.06692C19.2251 7.17087 20.0742 7.43628 20.6221 8.11398C21.0575 8.65255 21.1984 9.3226 21.1466 10.25H2.85346C2.80168 9.3226 2.94261 8.65255 3.378 8.11398C3.92585 7.43629 4.77494 7.17088 6.12802 7.06693L8.32918 2.6646C8.51442 2.29412 8.96493 2.14395 9.33541 2.32919C9.70589 2.51443 9.85606 2.96494 9.67082 3.33542L7.83589 7.00528C8.31911 7.00001 8.84638 7.00001 9.42196 7.00001H14.5781C15.1537 7.00001 15.6809 7.00001 16.1641 7.00528L14.3292 3.33542C14.1439 2.96494 14.2941 2.51443 14.6646 2.32919Z" fill="currentColor" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M3.55514 14.2572C3.34814 13.2912 3.17096 12.4643 3.04514 11.75H20.9549C20.8291 12.4643 20.6519 13.2911 20.4449 14.2571L20.0164 16.2572C19.5294 18.5297 19.2859 19.666 18.4608 20.333C17.6357 21 16.4737 21 14.1495 21H9.85053C7.52639 21 6.36432 21 5.53925 20.333C4.71418 19.666 4.47069 18.5297 3.98372 16.2572L3.55514 14.2572ZM10 13.25C9.58579 13.25 9.25 13.5858 9.25 14C9.25 14.4142 9.58579 14.75 10 14.75H14C14.4142 14.75 14.75 14.4142 14.75 14C14.75 13.5858 14.4142 13.25 14 13.25H10Z" fill="currentColor" />
                                </svg>
                                <p>{totalItems}</p>
                            </div>
                        </div>
                    </NavLink>
                </section>
            </div>

        </>
    );
};

export default CartWidget;
