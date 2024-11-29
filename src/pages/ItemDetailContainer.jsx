import React, { useEffect, useState } from 'react'
import ItemDetail from '../components/others/ItemDetail'
import SpinnerLoader from "../components/others/SpinnerLoader"
import { useParams } from 'react-router-dom'
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";


const ItemDetailContainer = () => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(false);

    const { id } = useParams(); // Extrae valor del id

    useEffect(() => {

        const getProducts = async () => {
            setLoading(true);

            try {

                const docRef = doc(db, "products", id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setProduct({ ...docSnap.data(), id })

                }

            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false); // Ocultar el loader
            }
        }

        getProducts();

    }, [id])


    return (
        loading ? <SpinnerLoader /> : <ItemDetail product={product} />
    )
}

export default ItemDetailContainer