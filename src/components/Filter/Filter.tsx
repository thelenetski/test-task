import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setFilters } from "../../redux/pokemons/slice";

const Filter = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: string) => dispatch(setFilters(data));

  return (
    <>
      <h2 className="mt-2 font-medium">Filter ability</h2>
      <div className="flex flex-wrap gap-x-4 gap-y-1 w-full max-w-96">
        <>
          <label className="flex items-center">
            <input
              className="mr-1"
              type="radio"
              value="overgrow"
              {...register("filter")}
              onChange={(e) => handleSubmit(() => onSubmit(e.target.value))()}
            />
            <span className="text-xs uppercase">Overgrow</span>
          </label>

          <label className="flex items-center">
            <input
              className="mr-1"
              type="radio"
              value="chlorophyll"
              {...register("filter")}
              onChange={(e) => handleSubmit(() => onSubmit(e.target.value))()}
            />
            <span className="text-xs uppercase">Chlorophyll</span>
          </label>
          <label className="flex items-center">
            <input
              className="mr-1"
              type="radio"
              value="blaze"
              {...register("filter")}
              onChange={(e) => handleSubmit(() => onSubmit(e.target.value))()}
            />
            <span className="text-xs uppercase">Blaze</span>
          </label>
          <label className="flex items-center">
            <input
              className="mr-1"
              type="radio"
              value="solar-power"
              {...register("filter")}
              onChange={(e) => handleSubmit(() => onSubmit(e.target.value))()}
            />
            <span className="text-xs uppercase">Solar-power</span>
          </label>
          <label className="flex items-center">
            <input
              className="mr-1"
              type="radio"
              value="torrent"
              {...register("filter")}
              onChange={(e) => handleSubmit(() => onSubmit(e.target.value))()}
            />
            <span className="text-xs uppercase">Torrent</span>
          </label>
          <label className="flex items-center">
            <input
              className="mr-1"
              type="radio"
              value="rain-dish"
              {...register("filter")}
              onChange={(e) => handleSubmit(() => onSubmit(e.target.value))()}
            />
            <span className="text-xs uppercase">Rain-dish</span>
          </label>
        </>
      </div>
    </>
  );
};

export default Filter;
