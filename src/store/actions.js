export const addProduct = (products, newProduct) => {
  newProduct.id = products.length > 0 ? products[products.length - 1].id + 1 : 0;
  products.push(newProduct);
  return [ ...products ];
};

export const editProduct = (products, id, newInfo) => {
  products[products.findIndex(prod => prod.id === id)] = newInfo;
  return [ ...products ];
};

export const addProdToCart = (cart, newProduct) => {
  let index = cart.length > 0 ? cart.findIndex(prod => prod.id === newProduct.id) : -1;
  if (~index) {
    cart[index].quantity += 1;
    return [ ...cart ];
  } else {
    const { id, title, price } = newProduct;
    return [ ...cart, { id, title, price, quantity: 1 } ];
  }
};

export const removeProdFromCart = (cart, id, removeAll) => {
  let index = cart.findIndex(prod => prod.id === id);

  if (cart[index].quantity > 1 && !removeAll) {
    cart[index].quantity -= 1;
    return [ ...cart ];
  } else {
    return cart.filter(prod => prod.id !== id);
  }
};