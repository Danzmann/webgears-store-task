import React, { useState, useContext } from 'react';
import './app.scss';

const AppContext = React.createContext({});

// =============== STORE =======

const editProduct = (products, id, newInfo) => {
  let index = products.findIndex(prod => prod.id === id);

  if (~index) {
    products[index] = newInfo;
  }
  return [ ...products ];
};

const addProdToCart = (cart, newProduct) => {
  let index = cart.length > 0 ? cart.findIndex(prod => prod.id === newProduct.id) : -1;
  if (~index) {
    cart[index].quantity += 1;
    return [ ...cart ];
  } else {
    const { id, title, price } = newProduct;
    return [ ...cart, { id, title, price, quantity: 1 } ];
  }
};

const removeProdFromCart = (cart, id) => {
  let index = cart.length > 0 ? cart.findIndex(prod => prod.id === id) : -1;
  if (cart[index].quantity > 1) {
    cart[index].quantity -= 1;
    return [ ...cart ];
  } else {
    return cart.filter(prod => prod.id !== id);
  }
};

// =============== END STORE =======

const productTest = {
  id: 0,
  title: 'Persian Safran',
  img: 'https://www.espaceagro.com/_affaire/345666.jpg',
  description: 'Safran from Faroogh is the best safran and juses its so good buy it please',
  price: 10
};

const productTest2 = {
  id: 1,
  title: 'Persian Pomegranade',
  img: 'https://familyspice.com/wp-content/uploads/2019/11/how-cut-pomegranate-1200-735x735.jpg',
  description: 'Pomegranade from the backyard is the most delicious',
  price: 20
};

const App = () => {
  const [products, setProducts] = useState([productTest, productTest2]);
  const [cart, setCart] = useState([]);

  const store = {
    products: {
      get: products,
      add: (newProduct) => setProducts([ ...products, { ...newProduct, id: products[products.length - 1].id++ || 0 }]),
      remove: (id) => setProducts(products.filter(prod => prod.id !== id)),
      edit: (id, newInfo) => setProducts(editProduct(products, id, newInfo))
    },
    cart: {
      get: cart,
      getValue: () => cart.length > 0 ? cart.map(prod => prod.quantity * prod.price).reduce((acc, curr) => acc + curr) : 0,
      add: (newProduct) => setCart(addProdToCart(cart, newProduct)),
      remove: (id) => setCart(removeProdFromCart(cart, id))
    }
  };

  return (
    <AppContext.Provider value={store}>
      <div className="main-wrapper">
        <ProductListing/>
        <ShoppingCart/>
      </div>
    </AppContext.Provider>
  );
};

export default App;




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


const ShoppingCart = () => {
  const { cart } = useContext(AppContext);
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
                  {product.price}
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
              <a onClick={() => cart.remove(product.id)}>
                X
              </a>
            </div>
          </div>
        ))
      }
      <div className='items-listing__total-price'>
        <span>{'Total value:  $' + parseFloat(cart.getValue())}</span>
      </div>
    </div>
  )
};