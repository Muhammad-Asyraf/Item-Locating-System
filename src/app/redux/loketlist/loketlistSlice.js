import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Environment configs
import { environment } from "../../environment";

export const loadAllItems = createAsyncThunk(
  "loketlist/loadAllItems",
  async (params, thunkAPI) => {
    const { data } = await axios.get(
      environment.host + "/api/mobile/planning-cart-service/cart/" + params
    );
    return data.products;
  }
);

export const addItem = createAsyncThunk(
  "loketlist/addItem",
  async (params, thunkAPI) => {
    
    const { data } = await axios.post(
      environment.host + "/api/mobile/planning-cart-service/cart/items/add",
      {
        cart_uuid: params.cart_uuid,
        product_uuid: params.product_uuid,
        quantity: params.quantity,
      }
    );
    if (data === 1) console.log("Database updated");

    return params;
  }
)

export const changeItemQuantity = createAsyncThunk(
  "loketlist/changeItemQuantity",
  async (params, thunkAPI) => {
    const { data } = await axios.post(
      environment.host + "/api/mobile/planning-cart-service/cart/items/update",
      {
        cart_uuid: params.cart_uuid,
        product_uuid: params.product_uuid,
        quantity: params.quantity,
      }
    );
    if (data === 1) console.log("Database updated");

    return params;
  }
);
export const loketlistSlice = createSlice({
  name: "loketlist",
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
      // payload: {product_uuid,quantity}

      // Place productId to a variable
      let product = payload.product_uuid;
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
  extraReducers: {
    [loadAllItems.fulfilled]: (state, { payload }) => {
      let productArr = [];
      let quantityArr = [];

      payload.forEach((product) => {
        productArr.push(product.uuid);
        quantityArr.push(product.quantity);
      });

      state.products = productArr;
      state.quantity = quantityArr;
      console.log(state);
    },
    [changeItemQuantity.fulfilled]: (state, { payload }) => {
      // addProduct and updateQuantity algo
      // Place productId to a variable
      let product = payload.product_uuid;
      let quantity = payload.quantity;

      console.log("Product uuid: " + product + ` (${quantity})`);

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
    [changeItemQuantity.rejected]: (state, { payload }) => {
      console.log("changeItemQuantity rejected");
    },
    [addItem.fulfilled]: (state, { payload }) => {
      // Place productId to a variable
      let product = payload.product_uuid;

      // Copy state
      let productArr = [...state.products];
      let quantityArr = [...state.quantity];

      // Get the index of the product
      let index = state.products.indexOf(product);

      if(index == -1){
        productArr.push(product)
        index = state.products.indexOf(product);
      }

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
    }
  },
});
export const { addProduct, updateQuantity, removeProduct } = loketlistSlice.actions;

export default loketlistSlice.reducer;
