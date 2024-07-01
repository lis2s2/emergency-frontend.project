export const fetchAddressFromCoords = async (lng, lat) => {
  try {
    const response = await fetch(`https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${lng}&y=${lat}`, {
      headers: {
        'Authorization': `KakaoAK ${process.env.REACT_APP_KAKAO_RESTAPI_KEY}`
      }
    
    });
    const data = await response.json();
    const address = data.documents[0].address.address_name;
    return (`${address}`);
  } catch (error) {
    console.error('주소를 가져오는 중 에러가 발생했습니다.', error);
  }
};