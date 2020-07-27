import React, {useContext, useEffect, useState} from 'react';
import { AppContext } from '../App';

const productTemplate = {
  id: -1,
  title: '',
  img: '',
  description: '',
  price: ''
};

const InventoryItem = (props) => {
  const { products } = useContext(AppContext);
  const [ newProduct, setNewProduct ] = useState(productTemplate);
  const { currentProduct } = props;
  // initialization
  useEffect(() => {
    if (currentProduct) {
      setNewProduct(currentProduct);
    }
  }, []);
  // new product updated
  useEffect(() => {
    if (
      JSON.stringify(newProduct) !== JSON.stringify(currentProduct) &&
      newProduct.id !== -1
    ) {
      products.edit(currentProduct.id, newProduct)
    }
  }, [newProduct]);

  const changeNewProduct = (event) => {
    const name = event.target.name;
    const value = name === 'price' ? event.target.value.replace(',','.') : event.target.value;
    setNewProduct({
      ...newProduct,
      [name]: value
    });
  };

  const buttonClicked = () => {
    if (currentProduct) {
      products.remove(currentProduct.id);
    } else {
      products.add(newProduct);
      setNewProduct(productTemplate);
    }
  };

  return (
    <div className='inventory-item'>
      <div className='inventory-item__row'>
        <input name='title' placeholder='Title' value={newProduct.title} onChange={changeNewProduct}/>
        <input name='price' type='number' placeholder='Price' value={newProduct.price} onChange={changeNewProduct}/>
      </div>
      <div className='inventory-item__row'>
        <input name='img' placeholder='Image url' value={newProduct.img} onChange={changeNewProduct}/>
      </div>
      <div className='inventory-item__row'>
        <textarea
          name='description'
          placeholder='Description'
          value={newProduct.description}
          onChange={changeNewProduct}
        />
      </div>
      <div className='inventory-item__row'>
        <button onClick={() => buttonClicked()}>{currentProduct ? 'Remove Product' : 'Add Product'}</button>
      </div>
    </div>
  );
};
export default InventoryItem
