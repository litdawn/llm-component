import {configureStore, Tuple} from "@reduxjs/toolkit";
import {reducer} from "../reducer";

const init  = {}

const store = configureStore({
    reducer:reducer,
    // middleware:()=>new Tuple(),
    // devTools:process.env.NODE_ENV !== "production"
  })
export default store;