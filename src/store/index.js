import {
  addProduct,
  editProduct,
  addProdToCart,
  removeProdFromCart
} from "./actions";

export const store = (products, setProducts, cart, setCart) => ({
  products: {
    get: products,
    add: (newProduct) => setProducts(addProduct(products, newProduct)),
    remove: (id) => setProducts(products.filter(prod => prod.id !== id)),
    edit: (id, newInfo) => setProducts(editProduct(products, id, newInfo))
  },
  cart: {
    get: cart,
    getValue: () =>
      cart.length > 0 ?
        cart.map(prod => prod.quantity * prod.price).reduce((acc, curr) => acc + curr).toFixed(2) :
        0,
    add: (newProduct) => setCart(addProdToCart(cart, newProduct)),
    remove: (id, removeAll=false) => setCart(removeProdFromCart(cart, id, removeAll)),
    edit: (id, newInfo) => setCart(editProduct(cart, id, newInfo))
  }
});