import axios from "axios";

export const fetchAddressFromCoords = async (lat, lng) => {
  try {
    const response = await axios.get(
      `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${lng}&y=${lat}`,
      {
        headers: {
          Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_RESTAPI_KEY}`,
        },
      }
    );

    const address = response.data.documents?.[0]?.address?.address_name;

    if (address) {
      return address;
    } else {
      throw new Error("No address found");
    }
  } catch (error) {
    console.error("주소를 가져오는 중 에러가 발생했습니다.", error);
    return "주소 오류";
  }
};

export const fetchCafeList = async (lat, lng) => {
  try {
    const response1 = await axios.get(
      `https://dapi.kakao.com/v2/local/search/keyword?query=스타벅스&category_group_code=CE7&y=${lat}&x=${lng}&radius=500`,
      {
        headers: {
          Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_RESTAPI_KEY}`,
        },
      }
    );
    const response2 = await axios.get(
      `https://dapi.kakao.com/v2/local/search/keyword?query=투썸플레이스&category_group_code=CE7&y=${lat}&x=${lng}&radius=500`,
      {
        headers: {
          Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_RESTAPI_KEY}`,
        },
      }
    );

    const response = [...response1.data.documents, ...response2.data.documents];
    const transformedData = response.map((cafeInfo) => {
      const {
        x,
        y,
        road_address_name,
        id,
        place_name,
        category_group_name,
        ...rest
      } = cafeInfo;
      return {
        ...rest,
        X_WGS84: x,
        Y_WGS84: y,
        POI_ID: id,
        FNAME: place_name,
        ANAME: category_group_name,
      };
    });

    return transformedData;
  } catch (error) {
    console.error("주소를 가져오는 중 에러가 발행했습니다.");
    return "";
  }
};

export const fetchWCongnamulCoord = async (lat, lng) => {
  try {
    const response = await axios.get(
      `https://dapi.kakao.com/v2/local/geo/transcoord.json?x=${lng}&y=${lat}&input_coord=WGS84&output_coord=WCONGNAMUL`,
      {
        headers: {
          Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_RESTAPI_KEY}`,
        },
      }
    );
    return response.data.documents;
  } catch (error) {
    console.error("주소를 가져오는 중 에러가 발행했습니다.");
  }
};

export const fetchCVSCoord = async (lat, lng) => {
  try {
    const response = await axios.get(
      `https://dapi.kakao.com/v2/local/search/keyword?query=편의점&x=${lng}&y=${lat}&page=1&size=1&sort=distance&CategoryGroupCode=CS2`,
      {
        headers: {
          Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_RESTAPI_KEY}`,
        },
      }
    );
    return response.data.documents;
  } catch (error) {
    console.error("주소를 가져오는 중 에러가 발행했습니다.");
  }
};

export const fetchGasStationList = async (lat, lng) => {
  try {
    const response = await axios.get(
      `https://dapi.kakao.com/v2/local/search/keyword?query=주유소&category_group_code=OL7&y=${lat}&x=${lng}&radius=500`,
      {
        headers: {
          Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_RESTAPI_KEY}`,
        },
      }
    );

    const transformedData = response.data.documents.map((gasStationInfo) => {
      const {
        x,
        y,
        road_address_name,
        id,
        place_name,
        category_group_name,
        ...rest
      } = gasStationInfo;
      return {
        ...rest,
        X_WGS84: x,
        Y_WGS84: y,
        POI_ID: id,
        FNAME: place_name,
        ANAME: category_group_name,
      };
    });

    return transformedData;
  } catch (error) {
    console.error("주소를 가져오는 중 에러가 발행했습니다.");
    return "";
  }
};
