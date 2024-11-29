import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';

// addCart es una función
const ItemCount = ({ addCart, stock }) => {

    let [count, setCount] = useState(1);

    let increment = () => {
        if (count < stock) {
            setCount(prevCount => prevCount + 1);
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Limit Reached',
                text: `You can only add up to ${stock} ${stock === 1 ? 'unit' : 'units'}.`
            });
        }
    }

    let decrement = () => {
        setCount((prevCount) => (prevCount > 1 ? prevCount - 1 : prevCount));
    }

    const handleChange = (event) => {
        let value = Math.max(1, parseInt(event.target.value || 1));
        if (value > stock) {
            Swal.fire({
                icon: 'error',
                title: 'Limit Reached',
                text: `You can only add up to ${stock} ${stock === 1 ? 'unit' : 'units'}.`
            });
            setCount(stock);
        } else {
            setCount(value);
        }
    }

    return (
        <>
            <h3>Quantity: </h3>
            <p>Stock available: {stock}</p>
            <div className='input-container'>
                <button className='btn-decrement' onClick={decrement}>-</button>
                <input type="number" value={count} onChange={handleChange} min="1" max={stock} />
                <button className='btn-increment' onClick={increment}>+</button>
            </div>

            <div className='btnDetail-container'>
                <button className='btn-addCartDetail' onClick={() => addCart(count)}>Add Cart</button>
                <NavLink to={"/"}>
                    <button className='btn-continueShopping'>Continue Shopping</button>
                </NavLink>
            </div>

        </>
    )
}

export default ItemCount