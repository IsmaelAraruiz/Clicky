import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import SpinnerLoader from '../components/others/SpinnerLoader';


const OrderDetails = () => {
    const location = useLocation();
    const [orderInfo, setOrderInfo] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrderInfo = () => {
            const info = location.state; // Obtener la información de la orden desde el estado

            if (info) {
                setOrderInfo(info);
            }
            setLoading(false);
        };

        fetchOrderInfo();
    }, [location.state]);

    if (loading) {
        return <SpinnerLoader />;
    }

    if (!orderInfo) {
        return <h1>No order information available</h1>;
    }


    const getCurrentDate = () => {
        const today = new Date();
        return `${today.getDate().toString().padStart(2, '0')}/${(today.getMonth() + 1).toString().padStart(2, '0')
            }/${today.getFullYear()}`;
    };


    return (
        <div className="order-details">
            <h2 className="thank-you">Thank You for Your Order!</h2>
            <p className="review-info">Review your order information below:</p>
            <div className="order-date">
                <p><strong>Date:</strong> {getCurrentDate()}</p>
                <p><strong>Order ID:</strong> {orderInfo.id}</p>
            </div>
            <div className="items">
                <h3>Order Information</h3>
                <div className="items-info">
                    <p><strong>Name:</strong> {orderInfo.user.name}</p>
                    <p><strong>Last Name:</strong> {orderInfo.user.lastName}</p>
                    <p><strong>Phone:</strong> {orderInfo.user.phone}</p>
                    <p><strong>Email:</strong> {orderInfo.user.email}</p>
                    <p><strong>Total:</strong> ${orderInfo.total}</p>
                </div>
                <h3>Items: </h3>
                <ul className="product-list">
                    {orderInfo.products.map((product) => (
                        <li key={product.id} className="product-item">
                            <img src={product.image} alt={product.title} />
                            <p>{product.title}</p>
                            <p>keyboard {product.category}%</p>
                            <p>${product.price} CLP</p>
                            <p><strong>Quantity:</strong> {product.quantity}</p>
                        </li>
                    ))}
                </ul>
            </div>
            <NavLink to={"/"}>
                <button className='btn-goBackHome'>Go Back Home</button>
            </NavLink>
        </div>
    );
};

export default OrderDetails;
