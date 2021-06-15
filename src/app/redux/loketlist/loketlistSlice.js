import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Environment configs
import { environment } from "../../environment";

export const loadAllItems = createAsyncThunk(
  "cart/loadAllItems",
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
  reducers: {},
  extraReducers: {},
});
export const { } = loketlistSlice.actions;

export default loketlistSlice.reducer;
