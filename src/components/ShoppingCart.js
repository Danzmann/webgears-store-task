import React, {useContext, useEffect} from 'react';
import { AppContext } from '../App';

const ShoppingCart = () => {
  const { cart, products } = useContext(AppContext);

  const checkDiscrepancies = () => {
    // check for products removed from products list
    const missingProduct = cart.get.filter(cartItem =>
      !products.get.map(prodItem => prodItem.id).includes(cartItem.id)
    )[0];
    if (missingProduct) {
      cart.remove(missingProduct.id, true);
      return
    }
    // check for products with changed price or title
    const changedProduct = cart.get.filter(
      cartItem => {
        const prod = products.get.find(prodItem => prodItem.id === cartItem.id);
        return prod.price !== cartItem.price || prod.title !== cartItem.title
      }
    )[0];
    if (changedProduct) {
      cart.edit(changedProduct.id, { ...changedProduct, ...products.get.find(prod => prod.id === changedProduct.id) });
    }
  };

  useEffect(() => {
    checkDiscrepancies();
  }, [products]);

  return (
    <div className='items-listing'>
      <span className='items-listing__header'> Shopping Cart </span>
      {
        cart.get.map(product => (
          <div className='cart-item' key={product.id}>
            <div className='cart-item__details'>
              <div className='cart-item__details_row'>
                <div className='cart-item__details__row__left'>
                  {product.title}
                </div>
                <div className='cart-item__details__row__right'>
                  {parseFloat(product.price).toFixed(2) + '$'}
                </div>
              </div>
              <div className='cart-item__details_row'>
                <div className='cart-item__details__row__left'>
                  Quantity:
                </div>
                <div className='cart-item__details__row__right'>
                  {product.quantity}
                </div>
              </div>
              <div className='cart-item__details__divisor'/>
            </div>
            <div className='cart-item__remove'>
              {/*eslint-disable-next-line*/}
              <a onClick={() => cart.remove(product.id)}>
                X
              </a>
            </div>
          </div>
        ))
      }
      <div className='items-listing__total-price'>
        <span>{'Total value:  ' + cart.getValue() + '$'}</span>
      </div>
    </div>
  )
};
export default ShoppingCart
