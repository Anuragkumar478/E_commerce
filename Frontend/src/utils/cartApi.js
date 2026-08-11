// Cart APIs
export const addToCart = async (productId, quantity = 1) => {
  const res = await api.post("/cart/add", { productId, quantity });
  return res.data;
};

export const getCart = async () => {
  const res = await api.get("/cart/");
  return res.data;
};

export const updateCart = async (productId, quantity) => {
  const { data } = await api.put("/cart/update", { productId, quantity });
  return data;
}; 

export const placeOrder = async ({ shippingAddress }) => {
  if (!shippingAddress) throw new Error("Shipping address is required");
  const res = await api.post("/order/place", { shippingAddress });
  return res.data;
};

//  getCart, updateCart, placeOrder