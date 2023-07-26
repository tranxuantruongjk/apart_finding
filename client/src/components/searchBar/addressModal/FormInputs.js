import DistrictsForm from "./DistrictsForm";
import WardsForm from "./WardsForm";
import useSearchContext from "../../../hooks/useSearchContext";

const FormInputs = () => {
  const { addressPage } = useSearchContext();

  const display = {
    0: <DistrictsForm />,
    1: <WardsForm />
  };

  return (
    <div>
      {display[addressPage]}
    </div>
  )
}

export default FormInputs;