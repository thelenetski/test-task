import { configureStore } from "@reduxjs/toolkit";
import { pokemonsReducer } from "./pokemons/slice";
import { modalReducer } from "./modal/slice";

export const store = configureStore({
  reducer: {
    pokemons: pokemonsReducer,
    modal: modalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
