import axios from "axios";
import uuid from "react-uuid";

export const registerToilet = async (
  lat,
  lng,
  address,
  title,
  detail,
  separated,
  disabled,
  diaper,
  paper
) => {
  const token = localStorage.getItem("token");
  const writer = JSON.parse(localStorage.getItem("member")).memId;
  const sendData = {
    POI_ID: uuid(),
    memRegister: true,
    writer: writer,
    Y_WGS84: lat,
    X_WGS84: lng,
    toiletAddress: address,
    FNAME: title,
    detail: detail,
    disabled: disabled,
    diaper: diaper,
    separated: separated,
    paper: paper,
    toiletStatus: "registered",
  };
  console.log(sendData);
  const result = await axios.post(
    `${process.env.REACT_APP_API_URL}/toilet/register`,
    sendData,
    {
      headers: {
        Authorization: token,
      },
    }
  );
  return result;
};

export const registerToiletInfo = async (
  toiletNo,
  lat,
  lng,
  address,
  title,
  separated,
  disabled,
  diaper,
  paper
) => {
  const token = localStorage.getItem("token");
  const writer = JSON.parse(localStorage.getItem("member")).memId;
  const sendData = {
    POI_ID: toiletNo,
    memRegister: false,
    writer: writer,
    Y_WGS84: lat,
    X_WGS84: lng,
    toiletAddress: address,
    FNAME: title,
    disabled: disabled,
    diaper: diaper,
    separated: separated,
    paper: paper,
    toiletStatus: "registered",
  };
  console.log(sendData);
  const result = await axios.post(
    `${process.env.REACT_APP_API_URL}/toilet/registerInfo`,
    sendData,
    {
      headers: {
        Authorization: token,
      },
    }
  );
  return result;
};
