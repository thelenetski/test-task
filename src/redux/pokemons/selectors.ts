import { RootState } from "../store";

export const selectPokemons = (state: RootState) => state.pokemons.items;
export const selectTeams = (state: RootState) => state.pokemons.teams;
export const selectFilter = (state: RootState) => state.pokemons.filters;
export const selectLoading = (state: RootState) => state.pokemons.loading;
