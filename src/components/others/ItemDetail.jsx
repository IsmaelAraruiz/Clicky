import React, { useContext, useState } from 'react';
import ItemCount from './ItemCount';
import { Cart } from "../../context/CartProvider";
import { NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';

const ItemDetail = ({ product }) => {
    //! Context
    const { addCart } = useContext(Cart);

    //! States
    const [addedToCartVisibility, setAddedToCartVisibility] = useState(false);

    //! Function handleCart
    const handleCart = (quantity) => {
        if (quantity > product.stock) {
            Swal.fire({
                icon: 'error',
                title: 'Limit Reached',
                text: `You can only add up to ${product.stock} ${product.stock === 1 ? 'unit' : 'units'}.`
            });
            return;
        }

        Swal.fire({
            icon: 'success',
            title: 'Product Added',
            text: `${quantity} ${quantity === 1 ? 'unit' : 'units'} added to the cart!`
        });

        // Llama a `addCart` del contexto `Cart` para agregar el producto con la cantidad seleccionada al carrito.
        addCart(product, quantity);

        // Cambia el estado para indicar que se ha agregado al carrito
        setAddedToCartVisibility(true);
    }

    if (!product) {
        return (
            <div className="product-notFound-container">
                <h2 className='title-notFound'>Oops! Product not found</h2>
                <NavLink to={"/"}>
                    <button className="btn-productNotFound">Go Back Home</button>
                </NavLink>
            </div>
        )
    }

    return (
        <div className='itemDetail'>
            <img src={product.image} alt={product.title} />
            <div className='detail-container'>
                <section className='section-title'>
                    <h2>{product.title}</h2>
                    <hr />
                    <p className='price'>${product.price} CLP</p>
                </section>

                <section className='section-details'>
                    <h3>Product Details</h3>
                    <dl>
                        <dt>Size: </dt>
                        <dd>Keyboard {product.category} %</dd>
                        <dt>Description: </dt>
                        <dd>{product.description}</dd>
                    </dl>
                </section>

                <section className='section-quantity'>
                    {!addedToCartVisibility ? (
                        <>
                            <ItemCount addCart={handleCart} stock={product.stock} />
                        </>
                    ) : (
                        <>
                            <div className='btnDetail-container'>
                                <NavLink to="/cart">
                                    <button className="btn-addCartDetail">Go to Cart</button>
                                </NavLink>
                                <NavLink to="/">
                                    <button className="btn-continueShopping">Continue Shopping</button>
                                </NavLink>
                            </div>
                        </>
                    )}
                </section>
            </div>
        </div>
    );
}

export default ItemDetail;
