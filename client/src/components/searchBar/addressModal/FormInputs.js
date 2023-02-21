import DistrictsForm from "./DistrictsForm";
import WardsForm from "./WardsForm";
import useAddressContext from "../../../hooks/useAddressContext";

const FormInputs = () => {
  const { page } = useAddressContext();

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