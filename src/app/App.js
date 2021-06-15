import React from 'react'

// Redux
import store from "./redux/store";
import { Provider } from "react-redux";

// Root
import Root from './Root'

export default function App() {
  return(
    <Provider store={store}>
      <Root/>
    </Provider>
  )
}