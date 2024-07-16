import axios from "axios";

export const fetchMemberById = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const result = await axios.get(
      `${process.env.REACT_APP_API_URL}/member/byId?id=${id}`,
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