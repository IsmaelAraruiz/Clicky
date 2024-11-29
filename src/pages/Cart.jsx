import React, { useContext, useState } from 'react'
import { Cart as CartContext } from "../context/CartProvider"
import { NavLink, useNavigate } from 'react-router-dom'
import CartItem from '../components/others/CartItem';
import endPurchase from '../services/endPurchase';
import ModalEndPurchase from '../components/others/ModalEndPurchase';
import SpinnerLoader from '../components/others/SpinnerLoader';


const Cart = () => {

  //! Context
  const { cart, totalItems, getTotalPrice, clearCart } = useContext(CartContext);

  //! State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handlePurchase = async (userData) => {
    setIsLoading(true);

    try {
      const orderDetails = await endPurchase(cart, userData); // Espera a que se complete la compra
      clearCart();
      setIsModalOpen(false);
      navigate('/order-details', { state: orderDetails }); // Redirigir a la página de detalles de la orden
    } catch (error) {
      console.error("Error during purchase:", error);
    } finally {
      setIsLoading(false);
    }

  };

  if (isLoading) {
    return <SpinnerLoader />;
  }

  return (
    <>
      <div className="cart-page">
        <section className="cart-details">
          {cart.length ? (
            <>             
              {cart.map((cartItem) => (
                <CartItem item={cartItem} key={cartItem.id} />
              ))}
            </>
          ) : (
            <div className="cart-empty-container">
              <h1 className="title-cartEmpty">The cart is empty</h1>
              <NavLink to={"/"}>
                <button className="btn-cartEmpty">Go back Home</button>
              </NavLink>
            </div>
          )}
        </section>

        {cart.length > 0 && (
          <section className="cart-summary">
            <h2>Purchase Summary</h2>           
            <p>Total products: ({totalItems})</p>
            <p>Total: ${getTotalPrice} CLP</p>
            <button className="btn-finishOrder" onClick={() => setIsModalOpen(true)}>
              End purchase
            </button>
            <ModalEndPurchase
              isOpen={isModalOpen}
              onRequestClose={() => setIsModalOpen(false)}
              onSubmit={handlePurchase}             
            />
          </section>
        )}
      </div>
    </>
  )
}

export default Cart