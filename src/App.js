import React, { useState } from 'react';
import './style/app.scss';
import { store } from './store';
import ProductListing from './components/ProductListing.js'
import ShoppingCart from './components/ShoppingCart';
import InventoryList from './components/InventoryListing';

export const AppContext = React.createContext({});

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  return (
    <AppContext.Provider value={ store(products, setProducts, cart, setCart) }>
      <div className="main-wrapper">
        <ProductListing/>
        <ShoppingCart/>
        <InventoryList/>
      </div>
    </AppContext.Provider>
  );
};

export default App;
