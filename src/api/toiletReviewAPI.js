import axios from "axios";

export const fetchReviewListByToiletNo = async (toiletNo) => {
  try {
    const token = localStorage.getItem("token");
    const result = await axios.get(
      `${process.env.REACT_APP_API_URL}/review/list/byToiletNo?no=${toiletNo}`,
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

export const fetchReviewListByWriter = async () => {
  try {
    const writer = JSON.parse(localStorage.getItem("member")).memId;
    const token = localStorage.getItem("token");
    const result = await axios.get(
      `${process.env.REACT_APP_API_URL}/review/list/byWriter?writer=${writer}`,
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

export const getAvgScoreByToiletNo = async (toiletNo) => {
  try {
    const token = localStorage.getItem("token");
    const result = await axios.get(
      `${process.env.REACT_APP_API_URL}/review/score?no=${toiletNo}`,
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

export const registerToiletReview = async (
  toiletNo,
  content,
  score,
  toiletTitle
) => {
  const token = localStorage.getItem("token");
  const writer = JSON.parse(localStorage.getItem("member")).memId;
  const sendData = {
    toiletNo: toiletNo,
    writer: writer,
    reviewContent: content,
    reviewScore: score,
    toiletTitle: toiletTitle,
  };
  const result = await axios.post(
    `${process.env.REACT_APP_API_URL}/review/register`,
    sendData,
    {
      headers: {
        Authorization: token,
      },
    }
  );
  return result;
};

export const deleteToiletReview = async (reviewNo) => {
  const token = localStorage.getItem("token");
  const result = await axios.get(
    `${process.env.REACT_APP_API_URL}/review/delete?no=${reviewNo}`,
    {
      headers: {
        Authorization: token,
      },
    }
  );
  return result;
};
