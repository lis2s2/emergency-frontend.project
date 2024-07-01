import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectMember } from "../features/member/memberSlice";

function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const member = useSelector(selectMember);

  const handleLogout = async () => {
    const token = localStorage.getItem('token');
    const result = await axios.get(`http://localhost:8080/logout?${formData.memId}&${formData.memPwd}`, {
      headers: {
        Authorization: token
      }
    });
    console.log(result);

    // 전역 상태 초기화
    dispatch(logoutSuccess());
    // 로컬 스토리지 초기화
    localStorage.removeItem('member');
    navigate('/');
  };

  return (
    <>
      <button onChange={handleLogout}>로그아웃</button>
    </>
  );
};

export default Logout;