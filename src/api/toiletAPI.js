// import axios from "axios";
import axios from "axios";
import jsonData from "./toileAPI.json";

export const fetchToiletLocations = async () => {
  try {
    // const responses = await Promise.all([
    //   axios.get(
    //     `http://openAPI.seoul.go.kr:8088/${process.env.REACT_APP_SEOUL_TOILET_KEY}/json/SearchPublicToiletPOIService/1/1000`
    //   ),
    //   axios.get(
    //     `http://openAPI.seoul.go.kr:8088/${process.env.REACT_APP_SEOUL_TOILET_KEY}/json/SearchPublicToiletPOIService/1001/2000`
    //   ),
    //   axios.get(
    //     `http://openAPI.seoul.go.kr:8088/${process.env.REACT_APP_SEOUL_TOILET_KEY}/json/SearchPublicToiletPOIService/2001/3000`
    //   ),
    //   axios.get(
    //     `http://openAPI.seoul.go.kr:8088/${process.env.REACT_APP_SEOUL_TOILET_KEY}/json/SearchPublicToiletPOIService/3001/4000`
    //   ),
    //   axios.get(
    //     `http://openAPI.seoul.go.kr:8088/${process.env.REACT_APP_SEOUL_TOILET_KEY}/json/SearchPublicToiletPOIService/4001/5000`
    //   ),
    // ]);

    // const data1 = responses[0].data.SearchPublicToiletPOIService.row;
    // const data2 = responses[1].data.SearchPublicToiletPOIService.row;
    // const data3 = responses[2].data.SearchPublicToiletPOIService.row;
    // const data4 = responses[3].data.SearchPublicToiletPOIService.row;
    // const data5 = responses[4].data.SearchPublicToiletPOIService.row;
    // const combinedData = [...data1, ...data2, ...data3, ...data4, ...data5];

    // return combinedData;
    return jsonData.SearchPublicToiletPOIService.row;
  } catch (err) {
    console.error(err);
  }
};

export const fetchUserToiletList = async () => {
  try {
    const token = localStorage.getItem("token");
    const result = await axios.get(
      `${process.env.REACT_APP_API_URL}/toilet/list`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return result.data;
  } catch (err) {
    console.error(err);
  }
};
