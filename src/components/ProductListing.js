import React, {useContext} from 'react';
import {AppContext} from '../App';

const ProductListing = () => {
  const { products, cart } = useContext(AppContext);
  return (
    <div className='items-listing'>
      <span className='items-listing__header'> List of Products </span>
      {
        products.get.map(product => (
          <div className='product' key={product.id}>
            <div className='product__image'>
              <img src={product.img} alt={product.title}/>
            </div>
            <div className='product-info'>
              <div className='product-info__header'>
                <div className='product-info__header__title'>
                  {product.title}
                </div>
                <div className='product-info__header__price'>
                  {product.price}$
                </div>
              </div>
              <div className='product-info__description'>
                <p>
                  {product.description}
                </p>
              </div>
              <div className='product-info__cart-button'>
                <button onClick={() => cart.add(product)}>Add to Order</button>
              </div>
            </div>
          </div>
        ))
      }
    </div>
  )
};
export default ProductListing