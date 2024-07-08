import axios from "axios";

export const fetchAddressFromCoords = async (lat, lng) => {
  try {
    const response = await axios.get(`https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${lng}&y=${lat}`, {
      headers: {
        'Authorization': `KakaoAK ${process.env.REACT_APP_KAKAO_RESTAPI_KEY}`
      }
    });

    const address = response.data.documents?.[0]?.address?.address_name;
    

    if (address) {
      return address;
    } else {
      throw new Error('No address found');
    }
  } catch (error) {
    console.error('주소를 가져오는 중 에러가 발생했습니다.', error);
    return '주소 오류';
  }
};

export const fetchStarbucksList = async (lat, lng) => {
  try {
    const response = await axios.get(`https://dapi.kakao.com/v2/local/search/keyword?query=스타벅스&category_group_code=CE7&y=${lat}&x=${lng}&radius=500`, {
      headers: {
        'Authorization': `KakaoAK ${process.env.REACT_APP_KAKAO_RESTAPI_KEY}`
      }
    });

    const transformedData = response.data.documents.map(starbucksInfo => {
      const { x, y, road_address_name, id, place_name, category_group_name, ...rest } = starbucksInfo;
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
    console.error('주소를 가져오는 중 에러가 발행했습니다.');
    return ''
  }
}