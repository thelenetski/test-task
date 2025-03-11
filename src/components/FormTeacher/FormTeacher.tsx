import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { selectFilter, selectPokemons } from "../../redux/pokemons/selectors";
import {
  getAbilityPokemons,
  getPokemons,
  getTeams,
} from "../../redux/pokemons/operations";
import Select from "react-select";
import {
  Controller,
  SubmitHandler,
  useForm,
  FieldErrors,
} from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { openAddTeam } from "../../redux/modal/slice";
import Filter from "../Filter/Filter";

type Option = { value: string; label: string };

type FormData = {
  name: string;
  surname: string;
  pokemons: Option[];
};

const schema = yup.object().shape({
  name: yup
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(12, "Name must be less than 12 characters")
    .matches(/\b[A-Za-z'-]+(?:\s+[A-Za-z'-]+)*\b/, "Please enter a valid name")
    .required("Field is required"),
  surname: yup
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(12, "Name must be less than 12 characters")
    .matches(
      /\b[A-Za-z'-]+(?:\s+[A-Za-z'-]+)*\b/,
      "Please enter a valid surname"
    )
    .required("Field is required"),
  pokemons: yup
    .array()
    .min(1, "Pokemons is required")
    .required("Pokemons is required"),
});

const FormTeacher = () => {
  const dispatch = useDispatch<AppDispatch>();
  const pokemons = useSelector(selectPokemons);
  const filter = useSelector(selectFilter);
  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    dispatch(getPokemons());
  }, [dispatch]);

  useEffect(() => {
    filter !== null && dispatch(getAbilityPokemons(filter));
  }, [dispatch, filter]);

  const labelPokemons = (pokemons?.results || pokemons?.pokemon)?.map(
    (item) => {
      const pokemon = "pokemon" in item ? item.pokemon : item;
      const { name, url, ...rest } = pokemon;
      return { label: name, value: url, ...rest };
    }
  );

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const pokemonIds: number[] = data.pokemons
      .map((pokemon) => {
        const match = pokemon.value.match(/\/(\d+)\/$/);
        return match ? Number(match[1]) : null;
      })
      .filter((value): value is number => value !== null);
    dispatch(getTeams(pokemonIds));
    dispatch(openAddTeam());
  };

  return (
    <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      <label>
        <p className="font-bold">Name</p>
        <input
          className="max-w-96 w-full pl-2 h-[38px] mt-5 rounded-s border border-[#cccccc]"
          placeholder="Name"
          type="text"
          {...register("name")}
        />
      </label>
      {errors.name && (
        <p className="text-red-400 mt-2">{errors.name.message}</p>
      )}
      <label>
        <p className="font-bold mt-5">Surname</p>
        <input
          className="max-w-96 w-full pl-2 h-[38px] mt-5 rounded-s border border-[#cccccc]"
          placeholder="Surname"
          type="text"
          {...register("surname")}
        />
      </label>
      {errors.surname && (
        <p className="text-red-400 mt-2">{errors.surname.message}</p>
      )}
      <label className="font-bold mt-5">Choose 4 pokemons</label>
      <Filter />
      <Controller
        name="pokemons"
        control={control}
        render={({ field }) => (
          <div className="max-w-96 mt-5">
            <Select
              {...field}
              closeMenuOnSelect={false}
              name="pokemons"
              options={labelPokemons}
              isMulti
              onChange={(selected) => {
                setValue("pokemons", selected.slice(0, 4));
              }}
              className="basic-multi-select"
              classNamePrefix="select"
            />
          </div>
        )}
      />
      {errors.pokemons && (
        <p className="text-red-400 mt-2 mb-5">{errors.pokemons.message}</p>
      )}
      <button
        className="mt-5 px-5 py-1 rounded-md text-[#ffffff] bg-violet-500 hover:bg-violet-600 focus:outline-2 focus:outline-offset-2 focus:outline-violet-500 active:bg-violet-700 "
        type="submit"
      >
        Save
      </button>
    </form>
  );
};

export default FormTeacher;
