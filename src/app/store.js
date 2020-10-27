import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import basketReducer from "../features/amazon/basketSlice";
import userReducer from "../features/amazon/userSlice";

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});

export default configureStore({
  reducer: {
    basket: basketReducer,
    user: userReducer,
  },
  customizedMiddleware,
});
