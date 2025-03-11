import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface Pokemon {
  name: string;
  url: string;
}

interface PokemonDetails {
  pokemon: Pokemon;
}

export interface PokemonResponse {
  results?: Pokemon[];
  pokemon?: PokemonDetails[];
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
  string,
  { rejectValue: PokemonError }
>("pokemons/getAbilityPokemons", async (filter, thunkAPI) => {
  try {
    const res = await axios.get<PokemonResponse>(`ability/${filter}`);
    return res.data;
  } catch (error: any) {
    if (error.response) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
    return thunkAPI.rejectWithValue(error.message || "Unknown error");
  }
});

export const getTeams = createAsyncThunk<
  string[],
  number[],
  { rejectValue: PokemonError }
>("pokemons/getTeams", async (data, thunkAPI) => {
  try {
    const promises = data.map((id) =>
      axios.get<Record<string, any>>(`pokemon/${id}`)
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
