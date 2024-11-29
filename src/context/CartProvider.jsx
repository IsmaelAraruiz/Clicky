import React, { createContext, useState, useMemo } from 'react';
import Swal from 'sweetalert2';

export const Cart = createContext();


const CartProvider = ({ children }) => {

    //! States
    // Estado `cart` que almacena un array de productos en el carrito. Inicialmente es un array vacío.
    const [cart, setCart] = useState([]);

    // Estado `quantity` que almacena la cantidad de productos diferentes en el carrito. Inicialmente es 0.
    const [quantity, setQuantity] = useState(0);


    //! Function AddCart 
    // Función `addCart` que agrega productos al carrito. Recibe dos parámetros: 
    // `product`, que es el producto a agregar, y `productQuantity`, que es la cantidad de ese producto.

    const addCart = (product, productQuantity) => {

        //* Aquí se llama a la función `isInCart` para verificar si el producto ya está en el carrito. 
        // Devuelve `true` o `false` dependiendo de si el producto con el mismo `id` ya está en el carrito.
        const productInCart = isInCart(product.id);

        //* Se crea una copia del estado actual del carrito. Los estados en React son inmutables, 
        // por lo que es necesario hacer una copia antes de modificarlo.
        let cartUpdated = [...cart];


        if (productInCart) {
            //? Si el producto ya está en el carrito (es decir, `productInCart` es true):

            cartUpdated = cart.map(cartProduct => {

                // Si el `id` del producto en el carrito coincide con el `id` del producto que queremos agregar:
                if (cartProduct.id === product.id) {


                    return {
                        //* Se retorna un nuevo objeto con todas las propiedades del producto original en el carrito...
                        ...cartProduct,

                        //* ... pero se actualiza su cantidad sumando la cantidad actual (`cartProduct.quantity`) 
                        // con la cantidad nueva (`productQuantity`).
                        quantity: cartProduct.quantity + productQuantity

                    };
                }
                //* Si el producto no coincide con el `id`, simplemente se devuelve el producto tal cual está en el carrito.
                return cartProduct;

            });

        } else {
            //? Si el producto NO está en el carrito (es decir, `productInCart` es false):

            //* Se agrega el producto al carrito junto con la cantidad deseada (`productQuantity`).
            // Se usa `push` para agregar el nuevo producto al array `cartUpdated`.
            cartUpdated.push({ ...product, quantity: productQuantity });

        }

        //* Se actualiza el estado `cart` con el carrito modificado (con el producto agregado o actualizado).
        setCart(cartUpdated);

        //* Se actualiza el estado `quantity` con la nueva longitud del carrito, es decir, la cantidad 
        // de productos únicos que hay en el carrito.
        setQuantity(cartUpdated.length);

    }

    //! Function isInCart

    //* Función `isInCart` que revisa si el producto con el `id` especificado ya está en el carrito.
    const isInCart = (productId) => {


        //* Utiliza el método `some` para verificar si existe algún producto en el carrito 
        // cuyo `id` coincida con `productId`. Devuelve true si lo encuentra, false en caso contrario.
        return cart.some(cartProduct => cartProduct.id === productId);

    }

    //! Function deleteProductCart

    //* Función para eliminar productos del carrito
    const deleteProductCart = (productId) => {

        // Muestra un cuadro de confirmación antes de eliminar el producto
        Swal.fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                // Trae todos los productos menos el que tenga el mismo Id
                const updatedCart = cart.filter(cartProduct => cartProduct.id !== productId);
                setCart(updatedCart);

                // Muestra un mensaje de éxito
                Swal.fire({
                    icon: 'success',
                    title: 'Product Removed',
                    text: 'The product has been successfully removed from your cart.'
                });
            }
        });
    }

    //! Function getTotalItems

    //* Calcula la cantidad total de productos en el carrito
    const getTotalItems = () => {
        return cart.reduce((acc, cartProduct) => acc + cartProduct.quantity, 0);
    }

    //! Function getTotalPrice

    //* Calcula el precio total del carrito
    const getTotalPrice = useMemo(() => {
        return cart.reduce((acc, cartProduct) => acc + cartProduct.price * cartProduct.quantity, 0);
    }, [cart]); // Dependencia en 'cart' para recalcular solo cuando cambia


    //! Function clearCart

    const clearCart = () => {
        setCart([]);
    }

    return (
        //* Aquí se devuelve el proveedor del contexto `Cart.Provider`,
        // que comparte los valores `cart`, `addCart` y `quantity` a todos los componentes hijos.
        <Cart.Provider value={{ cart, clearCart, addCart, quantity, totalItems: getTotalItems(), getTotalPrice, deleteItem: deleteProductCart }}>
            {children}
        </Cart.Provider>
    );
}

export default CartProvider;

