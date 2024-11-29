import React, { useState, useEffect } from 'react';
import Item from './Item';
import { useParams } from 'react-router-dom';

const ItemList = ({ products }) => {
  const [title, setTitle] = useState("All Keyboards");
  const { categoryId } = useParams(); // Obtén el categoryId de la URL

  useEffect(() => {
    if (categoryId) {
      // Si hay un categoryId en la ruta, establece el título según la categoría
      switch (categoryId) {
        case '60':
          setTitle('Keyboards 60%');
          break;
        case '70':
          setTitle('Keyboards 70%');
          break;
        case '100':
          setTitle('Keyboards 100%');
          break;
        default:
          setTitle('Unrecognized category');
      }
    } else {
      setTitle("All Keyboards");
    }
  }, [categoryId]); // Actualiza cuando categoryId cambie

  return (
    <div className='itemList'>
      <h1 className='itemList-title'>{title}</h1>
      <div className='itemList-cards-container'>
        {products.map((product) => (
          <Item item={product} key={product.id} />
        ))}
      </div>
    </div>
  );
}

export default ItemList;
