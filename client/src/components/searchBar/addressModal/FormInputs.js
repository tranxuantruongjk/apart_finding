import DistrictsForm from "./DistrictsForm";
import WardsForm from "./WardsForm";
import useSearchContext from "../../../hooks/useSearchContext";

const FormInputs = () => {
  const { page } = useSearchContext();

  const display = {
    0: <DistrictsForm />,
    1: <WardsForm />
  };

  return (
    <div>
      {display[page]}
    </div>
  )
}

export default FormInputs;