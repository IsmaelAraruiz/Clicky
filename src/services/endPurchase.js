import {
    addDoc,
    collection,
    doc,
    runTransaction,
    serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/config";
import Swal from 'sweetalert2';

const endPurchase = async (cart, userData) => {
    const productsToUpdateRefs = [];

    // Crea una referencia a todos los productos del carrito
    for (const cartProduct of cart) {
        const productRef = doc(db, "products", cartProduct.id);
        productsToUpdateRefs.push({ ref: productRef, id: cartProduct.id, quantity: cartProduct.quantity });
    }

    // Referencia a colección de orders
    const orderCollectionRef = collection(db, "orders");

    try {
        const order = await runTransaction(db, async (transaction) => {
            //* Array auxiliar para actualizar el stock
            const stockUpdated = [];
            let totalAmount = 0;

            //TODO: 1-. Verifica el stock de cada producto en el carrito 
            for (const productToUpdate of productsToUpdateRefs) {
                const { ref, quantity } = productToUpdate;
                //* Consulta a Firebase para obtener el producto
                const product = await transaction.get(ref);
                if (!product.exists()) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Product does not exist!',
                        confirmButtonText: 'OK'
                    });
                    return;
                }

                const productData = product.data();
                const productInCart = cart.find((cartElement) => cartElement.id === product.id);

                // Calcular el total usando el precio del producto
                totalAmount += productData.price * quantity;

                //* Verifica el stock resultante
                const resultStock = productData.stock - productInCart.quantity;

                if (resultStock < 0) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Stock insuficiente',
                        text: `Producto: ${productData.title}, no tiene suficiente stock. 
                               Stock actual: ${productData.stock}, cantidad solicitada: ${productInCart.quantity}`,
                        confirmButtonText: 'Aceptar'
                    });
                    return;
                }

                //* Añade el stock resultante al array auxiliar
                stockUpdated.push({
                    productId: product.id,
                    stock: resultStock,
                });
            }

            //TODO 2-. Actualizar el stock del producto
            for (const product of productsToUpdateRefs) {
                const { ref, id } = product;
                const stockItem = stockUpdated.find((stock) => stock.productId === id);

                if (stockItem) {
                    transaction.update(ref, {
                        stock: stockItem.stock,
                    });
                }
            }

            //TODO: 3-. Crear la orden
            const order = {
                products: [...cart],
                user: userData,
                total: totalAmount,
                estado: 'generada',
                timestamp: serverTimestamp(),
            };

            const orderRef = await addDoc(orderCollectionRef, order); // Esperar a que se cree la orden
            const orderDetails = { id: orderRef.id, ...order }; // Obtener el ID de la orden creada
            return orderDetails; // Retornar la información de la orden
        });

        return order; // Retornar la orden al final de la transacción

    } catch (error) {
        console.error("Error fetching products:", error);
        throw new Error(error);
    }
};

export default endPurchase;
