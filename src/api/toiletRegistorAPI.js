import axios from "axios";

export const registerToilet = async (
  toiletNo,
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
    toiletNo: toiletNo,
    memRegister: true,
    writer: writer,
    lat: lat,
    lng: lng,
    toiletAddress: address,
    toiletName: title,
    detail: detail,
    disabled: disabled,
    diaper: diaper,
    separated: separated,
    paper: paper,
    toiletStatus: "registered",
  };
  console.log(sendData);
  const result = await axios.post(
    `${process.env.REACT_APP_API_URL}/toilet/list`,
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
    toiletNo: toiletNo,
    memRegister: false,
    writer: writer,
    lat: lat,
    lng: lng,
    toiletAddress: address,
    toiletName: title,
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
