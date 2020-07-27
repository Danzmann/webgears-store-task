import React, {useContext, useEffect} from 'react';
import { AppContext } from '../App';
import InventoryItem from './InventoryItem';

const InventoryList = () => {
  const { products } = useContext(AppContext);
  useEffect(() => {

  }, [products]);
  const productList = [ ...products.get ];

  return (
    <div className='items-listing'>
      <span className='items-listing__header'> Inventory </span>
      {
        productList.map(product => {
          return (
            <InventoryItem currentProduct={product} key={product.id}/>
          )})
      }
      <InventoryItem/>
    </div>
  )
};
export default InventoryList;
