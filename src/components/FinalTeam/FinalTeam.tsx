import { useSelector } from "react-redux";
import { selectLoading, selectTeams } from "../../redux/pokemons/selectors";

const FinalTeam = () => {
  const teams = useSelector(selectTeams);
  const loading = useSelector(selectLoading);

  return (
    <>
      <h4 className="w-full text-center text-lg uppercase font-bold">
        Your pokemons team
      </h4>
      {loading ? (
        <p className="text-black-400">Loading...</p>
      ) : (
        teams?.map((item, index) => {
          return <img key={index} src={item} />;
        })
      )}
    </>
  );
};

export default FinalTeam;
