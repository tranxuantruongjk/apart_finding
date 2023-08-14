import wardsList from "hanhchinhvn/dist/xa_phuong.json";
import districtsList from "hanhchinhvn/dist/quan-huyen/01.json";

import { RiEBikeLine } from "react-icons/ri";
import { BiTimeFive, BiWifi, BiBed } from "react-icons/bi";
import { TbAirConditioning, TbFridge, TbWashMachine } from "react-icons/tb";
import { MdBalcony } from "react-icons/md";
import { SiPetsathome } from "react-icons/si";
import heater from "../assets/images/water-heater.svg";
import kitchen from "../assets/images/kitchen.png";
import toilet from "../assets/images/toilet.svg";
import wardrobe from "../assets/images/wardrobe.png";
import stair from "../assets/images/stair.png";
import guard from "../assets/images/guard.png";
import key from "../assets/images/owner.png";

export const utilities = [
  {
    id: "room_bathroom",
    title: "WC riêng",
    icon: <img src={toilet} alt="toilet" />,
  },
  {
    id: "parking_situation",
    title: "Chỗ để xe",
    icon: <RiEBikeLine />,
  },
  {
    id: "curfew_situation",
    title: "Giờ giấc tự do",
    icon: <BiTimeFive />,
  },
  {
    id: "room_wifi",
    title: "Wifi",
    icon: <BiWifi />,
  },
  {
    id: "air_conditioner",
    title: "Điều hòa",
    icon: <TbAirConditioning />,
  },
  {
    id: "water_heater",
    title: "Bình nóng lạnh",
    icon: <img src={heater} alt="heater" />,
  },
  {
    id: "room_kitchen",
    title: "Nhà bếp",
    icon: <img src={kitchen} alt="kitchen" />,
  },
  {
    id: "room_refrigerator",
    title: "Tủ lạnh",
    icon: <TbFridge />,
  },
  {
    id: "room_washing_machine",
    title: "Máy giặt",
    icon: <TbWashMachine />,
  },
  {
    id: "room_bed",
    title: "Giường",
    icon: <BiBed />,
  },
  {
    id: "room_closet",
    title: "Tủ đồ",
    icon: <img src={wardrobe} alt="wardrobe" />,
  },
  {
    id: "loft",
    title: "Gác lửng",
    icon: <img src={stair} alt="stair" />,
  },
  {
    id: "balcony",
    title: "Ban công",
    icon: <MdBalcony />,
  },
  {
    id: "room_pets_allowed",
    title: "Thú cưng",
    icon: <SiPetsathome />,
  },
  {
    id: "security_guard",
    title: "Bảo vệ",
    icon: <img src={guard} alt="guard" />,
  },
  {
    id: "share_home_as_landlord",
    title: "Không chung chủ",
    icon: <img src={key} alt="key" />,
  },
];

export const getDate = (date) => {
  const newDate = new Date(date);
  let [day, month, year] = [
    newDate.getDate(),
    newDate.getMonth() + 1,
    newDate.getFullYear(),
  ];
  day = day.toString().padStart(2, "0");
  month = month.toString().padStart(2, "0");
  return `${day}-${month}-${year}`;
};

export const getDetailDateTime = (date) => {
  const newDate = new Date(date);
  let [hour, minutes] = [newDate.getHours(), newDate.getMinutes()];
  let [day, month, year] = [
    newDate.getDate(),
    newDate.getMonth() + 1,
    newDate.getFullYear(),
  ];
  day = day.toString().padStart(2, "0");
  month = month.toString().padStart(2, "0");
  hour = hour.toString().padStart(2, "0");
  minutes = minutes.toString().padStart(2, "0");

  return `${hour}:${minutes}, ${day}-${month}-${year}`;
};

export const getWardName = (id) => {
  const wardId = id.toString();
  const newWardId = wardId.padStart(5, "0");
  const wardName = wardsList[newWardId]["name_with_type"];
  return wardName;
};

export const getDistrictName = (id) => {
  const wardId = id.toString();
  const newWardId = wardId.padStart(5, "0");
  const districtId = wardsList[newWardId]["parent_code"];
  const districtName = districtsList[districtId]["name_with_type"];
  return districtName;
};

export const getWardDistrictName = (id) => {
  const wardName = getWardName(id);
  const districtName = getDistrictName(id);
  return `${wardName}, ${districtName}, Hà Nội`;
};

export const getContent = (content) => {
  const contentArr = content.split("\n");
  // const newContent = contentArr.join("\\n")
  const newContentArr = contentArr.map((str) => `<p>${str}</p><br />`);
  // console.log(contentArr);
  return newContentArr.join("");
};

export const fillDistrictCode = (districtCode) => {
  if (typeof districtCode === "string") {
    if (districtCode.length === 3) {
      return districtCode;
    } else {
      return districtCode.padStart(3, "0");
    }
  }
  if (typeof districtCode === "number") {
    if (districtCode.toString().length === 3) {
      return districtCode.toString();
    } else {
      return districtCode.toString().padStart(3, "0");
    }
  }
};

export const fillWardCode = (wardCode) => {
  if (typeof wardCode === "string") {
    if (wardCode.length === 5) {
      return wardCode;
    } else {
      return wardCode.padStart(5, "0");
    }
  }
  if (typeof wardCode === "number") {
    if (wardCode.toString().length === 5) {
      return wardCode.toString();
    } else {
      return wardCode.toString().padStart(5, "0");
    }
  }
};

export const maskNumber = (phone) => {
  const first7Digits = phone.toString().slice(0, 7);
  const maskedNumber = first7Digits.padEnd(phone.toString().length, "*");

  return maskedNumber;
};
