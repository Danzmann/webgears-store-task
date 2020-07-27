import React, {useState, useContext, useEffect} from 'react';
import './app.scss';

const AppContext = React.createContext({});

// =============== STORE =======

const addProduct = (products, newProduct) => {
  newProduct.id = products.length > 0 ? products[products.length - 1].id + 1 : 0;
  products.push(newProduct);
  return [ ...products ];
};

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
  let index = cart.findIndex(prod => prod.id === id);

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

const productTest3 = {
  id: 2,
  title: 'Persian hue',
  img: 'https://familyspice.com/wp-content/uploads/2019/11/how-cut-pomegranate-1200-735x735.jpg',
  description: 'Pomegranade from the backyard is the most delicious',
  price: 20
};

const App = () => {
  const [products, setProducts] = useState([productTest, productTest2, productTest3]);
  const [cart, setCart] = useState([]);

  const store = {
    products: {
      get: products,
      add: (newProduct) => setProducts(addProduct(products, newProduct)),
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
        <InventoryList/>
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
  const { cart, products } = useContext(AppContext);

  useEffect(() => {

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
                  {product.price + '$'}
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
    setNewProduct({
      ...newProduct,
      [event.target.name]: event.target.value
    });
  };

  const buttonClicked = () => {
    if (currentProduct) {
      products.remove(currentProduct.id);
    } else {
      // :todo validation here
      products.add(newProduct);
    }
  };

  return (
    <div className='inventory-item'>
      <div className='inventory-item__row'>
        <input name='title' placeholder='Title' value={newProduct.title} onChange={changeNewProduct}/>
        <input name='price' placeholder='Price' value={newProduct.price} onChange={changeNewProduct}/>
      </div>
      <div className='inventory-item__row'>
        <input name='img' placeholder='Image url' value={newProduct.img} onChange={changeNewProduct}/>
      </div>
      <div className='inventory-item__row'>
        <textarea name='description' placeholder='Description' value={newProduct.description} onChange={changeNewProduct}/>
      </div>
      <div className='inventory-item__row'>
        <button onClick={() => buttonClicked()}>{currentProduct ? 'Remove Product' : 'Add Product'}</button>
      </div>
    </div>
  );
};

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
