import React, { useContext } from 'react';
import { Cart as CartContext } from "../../context/CartProvider";


const CartItem = ({ item }) => {

    const { deleteItem } = useContext(CartContext);

    return (

        <div className='cartItem'>
            <img src={item.image} />
            <section className='productCart-container'>
                <div className='productCart-title-container'>
                    <h1>{item.title}</h1>
                    <p>Keyboard {item.category}%</p>
                </div>

                <div className='productCart-information-container'>
                    <p className='price-productCart'>${item.price} CLP</p>
                    <p className='quantity-productCart'>Quantity: {item.quantity}</p>

                </div>

                <div className='productCart-operation-container'>
                    <button className='btn-productCart-delete' title='delete' onClick={() => deleteItem(item.id)}>
                        <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.755,20.283,4,8H20L18.245,20.283A2,2,0,0,1,16.265,22H7.735A2,2,0,0,1,5.755,20.283ZM21,4H16V3a1,1,0,0,0-1-1H9A1,1,0,0,0,8,3V4H3A1,1,0,0,0,3,6H21a1,1,0,0,0,0-2Z" fill="currentColor" />
                        </svg>
                    </button>
                </div>
            </section>

        </div>
    )
}

export default CartItem