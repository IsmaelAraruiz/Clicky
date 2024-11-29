import React, { useState, useEffect } from "react";
import ItemList from "../components/others/ItemList";
import SpinnerLoader from "../components/others/SpinnerLoader";
import { useParams } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore"; //Métodos de librería fireBase
import { db } from "../firebase/config";

const ItemListContainer = () => {

    //! States  
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);


    const { categoryId } = useParams(); // Extrae valor de categoryId

    useEffect(() => {

        const getProducts = async () => {
            setLoading(true);

            try {
                let productsFiltered = [];

                if (categoryId) {
                    //* Si hay categoría

                    const q = query(
                        collection(db, "products"),
                        where("category", "==", categoryId)); //Filtro

                    const querySnapshot = await getDocs(q);

                    querySnapshot.forEach((doc) => {

                        productsFiltered.push({ id: doc.id, ...doc.data() })
                    });

                } else {
                    //* Todos los productos
                    
                    const querySnapshot = await getDocs(collection(db, "products"))

                    querySnapshot.forEach((doc) => {
                        productsFiltered.push({ id: doc.id, ...doc.data() })
                    })
                }


                setProducts(productsFiltered);


            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false); // Ocultar el loader
            }
        }

        getProducts(); // Llama a la función para obtener los productos


    }, [categoryId]); // Vuelve a ejecutar si categoryId cambia

    return (
        loading ? <SpinnerLoader /> : <ItemList products={products} />
    );
}

export default ItemListContainer