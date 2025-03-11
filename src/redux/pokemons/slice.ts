import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAbilityPokemons, getPokemons, getTeams } from "./operations";
import { PokemonResponse, PokemonError } from "./operations";

interface Sprites {
  front_default: string;
}

interface PokemonsState {
  items: PokemonResponse | null;
  teams: Sprites[] | null;
  filters: string | null;
  error:
    | {
        message: string;
      }
    | null
    | undefined;
  loading: boolean;
}

const initialState: PokemonsState = {
  items: null,
  teams: null,
  filters: null,
  loading: false,
  error: null,
};

const handlePending = (state: PokemonsState) => {
  state.loading = true;
};

const handleRejected = (
  state: PokemonsState,
  action: PayloadAction<PokemonError | null | undefined>
) => {
  state.loading = false;
  state.error = action.payload;
};

const pokemonsSlice = createSlice({
  name: "pokemons",
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
    resetFilters: (state) => {
      state.filters = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getPokemons.pending, handlePending)
      .addCase(
        getPokemons.fulfilled,
        (state, action: PayloadAction<PokemonResponse>) => {
          state.items = action.payload;
          state.loading = false;
          state.error = null;
        }
      )
      .addCase(getPokemons.rejected, handleRejected)
      .addCase(getAbilityPokemons.pending, handlePending)
      .addCase(
        getAbilityPokemons.fulfilled,
        (state, action: PayloadAction<PokemonResponse>) => {
          state.items = action.payload;
          state.loading = false;
          state.error = null;
        }
      )
      .addCase(getAbilityPokemons.rejected, handleRejected)
      .addCase(getTeams.pending, handlePending)
      .addCase(
        getTeams.fulfilled,
        (state, action: PayloadAction<Sprites[]>) => {
          state.teams = action.payload;
          state.loading = false;
          state.error = null;
        }
      )
      .addCase(getTeams.rejected, handleRejected);
  },
});

export const { setFilters, resetFilters } = pokemonsSlice.actions;

export const pokemonsReducer = pokemonsSlice.reducer;
