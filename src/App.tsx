import { useState } from "react";
import FormTeacher from "./components/FormTeacher/FormTeacher";
import { modalTypes } from "./redux/modal/slice";
import ModalWindow from "./components/ModalWindow/ModalWindow";
import { useSelector } from "react-redux";
import { selectTypeModal } from "./redux/modal/selectors";
import FinalTeam from "./components/FinalTeam/FinalTeam";

function App() {
  const type = useSelector(selectTypeModal);
  return (
    <div className="flex flex-col justify-center items-center w-full h-screen">
      <FormTeacher />
      <ModalWindow>{type === modalTypes.addTeam && <FinalTeam />}</ModalWindow>
    </div>
  );
}

export default App;
