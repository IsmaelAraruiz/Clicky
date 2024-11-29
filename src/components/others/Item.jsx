import React from 'react'
import { NavLink } from "react-router-dom";

const Item = ({ item }) => {

  return (

    <article className='item-card'>
      <div className='item-card-img-container'>
        <NavLink to={`/detail/${item.id}`} title='More Details'>
          <img src={item.image} alt={item.title} />
        </NavLink>
        <p>Size {item.category} %</p>
      </div>
      <h2>{item.title}</h2>
      <p>${item.price} CLP</p>
      <NavLink to={`/detail/${item.id}`}>
        <button className='btn-viewDetail'>View Details</button>
      </NavLink>
    </article>
  )
}

export default Item