import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: [],
  },
  reducers: {
    addProduct: (state, { payload }) => {
      // Place productId to a variable
      let product = payload;

      // Copy state
      let productArr = [...state.products];
      let quantityArr = [...state.quantity];
      productArr.push(product);

      // Get the index of the product
      let index = state.products.indexOf(product);

      // Check of the array index exists
      if (quantityArr[index] == null) {
        console.log("Product quantity not exist, creating one");
        quantityArr.push(1);
      } else {
        console.log("Product quantity exist, updating it");
        quantityArr[index] += 1;
      }

      // Set states
      state.products = productArr;
      state.quantity = quantityArr;

      console.log(state);
    },
    updateQuantity: (state, { payload }) => {
      // payload: {productId,quantity}

      // Place productId to a variable
      let product = payload.productId;
      let quantity = payload.quantity;

      // Copy state
      let productArr = [...state.products];
      let quantityArr = [...state.quantity];

      // Get the index of the product
      let index = state.products.indexOf(product);

      // If quantity == 0, remove product from array
      if (quantity === 0) {
        console.log("Quantity is zero, removing records");
        productArr.splice(index, 1);
        quantityArr.splice(index, 1);
      } else {
        console.log("Product quantity exist, updating it");
        quantityArr[index] = quantity;
      }

      // Set states
      state.products = productArr;
      state.quantity = quantityArr;

      console.log(state);
    },
    removeProduct: (state, { payload }) => {
      // Place productId to a variable
      let product = payload;

      // Get the index of the product
      let index = state.products.indexOf(product);

      // Delete product quantity by 1
      if (!state.quantity[index] === 1) {
        state.quantity[index] -= 1;
      } else {
        // If there is only one, remove the index from both product and quantity arrays
        state.products.splice(index, 1);
        state.quantity.splice(index, 1);
      }
    },
  },
});
export const { addProduct, updateQuantity, removeProduct } = cartSlice.actions;

export default cartSlice.reducer;
