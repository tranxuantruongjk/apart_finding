import wardsList from "hanhchinhvn/dist/xa_phuong.json";
import districtsList from "hanhchinhvn/dist/quan-huyen/01.json";

export const getDate = (date) => {
  const newDate = new Date(date);
  let [day, month, year] = [newDate.getDate(), newDate.getMonth() + 1, newDate.getFullYear()];
  day = day.toString().padStart(2, '0');
  month = month.toString().padStart(2, '0');
  return `${day}-${month}-${year}`;
}

export const getDetailDateTime = (date) => {
  const newDate = new Date(date);
  let [hour, minutes] = [newDate.getHours(), newDate.getMinutes()];
  let [day, month, year] = [newDate.getDate(), newDate.getMonth() + 1, newDate.getFullYear()];
  day = day.toString().padStart(2, '0');
  month = month.toString().padStart(2, '0');
  hour = hour.toString().padStart(2, '0');
  minutes = minutes.toString().padStart(2, '0');

  return `${hour}:${minutes}, ${day}-${month}-${year}`;
}

export const getWardName = (id) => {
  const wardId = id.toString();
  const newWardId = wardId.padStart(5, '0');
  const wardName = wardsList[newWardId]["name_with_type"];
  return wardName;
}

export const getDistrictName = (id) => {
  const wardId = id.toString();
  const newWardId = wardId.padStart(5, '0');
  const districtId = wardsList[newWardId]["parent_code"];
  const districtName = districtsList[districtId]["name_with_type"];
  return districtName;  
}

export const getWardDistrictName = (id) => {
  const wardName = getWardName(id);
  const districtName = getDistrictName(id);
  return `${wardName}, ${districtName}, Hà Nội`;
}

export const getContent = (content) => {
  const contentArr = content.split("\n");
  // const newContent = contentArr.join("\\n")
  const newContentArr = contentArr.map(str => (
    `<p>${str}</p><br />`
  ))
  // console.log(contentArr);
  return newContentArr.join('');
}

