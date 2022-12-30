import wardsList from "hanhchinhvn/dist/xa_phuong.json";
import districtsList from "hanhchinhvn/dist/quan-huyen/01.json";

export const getDate = (date) => {
  const newDate = new Date(date);
  return `${newDate.getDate()}-${newDate.getMonth()+1}-${newDate.getFullYear()}`;
}

export const getDistrictName = (id) => {
  const wardId = id.toString();
  const newWardId = wardId.padStart(5, '0');
  const districtId = wardsList[newWardId]["parent_code"];
  const districtName = districtsList[districtId]["name_with_type"];
  return districtName;  
}

