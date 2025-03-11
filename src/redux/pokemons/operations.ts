import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface Pokemon {
  name: string;
  url: string;
}

export interface PokemonResponse {
  count: number;
  next: string;
  previous: string | null;
  results: Pokemon[];
}

export interface PokemonError {
  message: string;
}

axios.defaults.baseURL = "https://pokeapi.co/api/v2/";

export const getPokemons = createAsyncThunk<
  PokemonResponse,
  void,
  { rejectValue: PokemonError }
>("pokemons/getPokemons", async (_, thunkAPI) => {
  try {
    const res = await axios.get<PokemonResponse>("pokemon");

    return res.data;
  } catch (error: any) {
    if (error.response) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
    return thunkAPI.rejectWithValue(error.message || "Unknown error");
  }
});

export const getAbilityPokemons = createAsyncThunk<
  PokemonResponse,
  void,
  { rejectValue: PokemonError }
>("pokemons/getAbilityPokemons", async (filter, thunkAPI) => {
  try {
    const res = await axios.get<PokemonResponse>(`ability/${filter}`);
    return res.data?.pokemon;
  } catch (error: any) {
    if (error.response) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
    return thunkAPI.rejectWithValue(error.message || "Unknown error");
  }
});

export const getTeams = createAsyncThunk<
  PokemonResponse,
  void,
  { rejectValue: PokemonError }
>("pokemons/getTeams", async (data, thunkAPI) => {
  try {
    const promises = data.map((id) =>
      axios.get<PokemonResponse>(`pokemon/${id}`)
    );

    const res = await Promise.all(promises);
    return res.map((item) => item.data.sprites.front_default);
  } catch (error: any) {
    if (error.response) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
    return thunkAPI.rejectWithValue(error.message || "Unknown error");
  }
});
