import styled from "styled-components";
import { Roadview } from "react-kakao-maps-sdk";
import { PiStarFill, PiStarLight } from "react-icons/pi";
import { TbRoadSign } from "react-icons/tb";
import { useEffect, useState } from "react";
import {
  fetchAddressFromCoords,
  fetchCVSCoord,
  fetchWCongnamulCoord,
} from "../api/kakaoMapAPI";
import ToiletComment from "./ToiletComment";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, selectMember } from "../features/member/memberSlice";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import {
  fetchReviewListByToiletNo,
  getAvgScoreByToiletNo,
  registerToiletReview,
} from "../api/toiletReviewAPI";
import { FaCoins } from "react-icons/fa6";
import { registerToiletInfo } from "../api/toiletRegistorAPI";
import { fetchMemberById } from "../api/memberAPI";
import ToiletCommentUser from "./ToiletCommentUser";

const ToiletDetailContainer = styled.div`
  background-color: #ffffff;
  width: 100%;
  height: 100%;
  border-radius: 16px;
  overflow: hidden;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 12px;
`;

const RoadViewWrapper = styled.div`
  border-radius: 12px;
  height: 280px;
  overflow: hidden;
`;

const ToiletInfoCommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  gap: 8px;
`;

const ToiletInfoContainer = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 8px;
`;

const ToiletScoreDistanceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ToiletScoreContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const ToiletCommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
  overflow-y: auto;
  max-height: 200px;
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background: #ccc;
  }
`;

const MemIdScoreInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ScoreWrapper = styled.div`
  cursor: pointer;
`;

const MemIdScoreContainer = styled.div`
  display: flex;
  gap: 8px;
`;

const BottonGroupContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
`;

const SearchButton = styled.button`
  padding: 0 16px;
  font-size: 16px;
  border-radius: 18px;
  border: none;
  background-color: #0067c7;
  color: #ffffff;
  font-weight: 600;
  height: 40px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
  @media screen and (max-width: 767px) {
    flex: 1;
    justify-content: center;
  }
`;

const GoToListButton = styled.button`
  padding: 0 16px;
  font-size: 16px;
  border-radius: 18px;
  border: none;
  background-color: #0067c7;
  color: #ffffff;
  font-weight: 600;
  height: 40px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  white-space: nowrap;
`;

const StyledTbRoadSign = styled(TbRoadSign)`
  height: 22px;
  width: 22px;
  @media screen and (max-width: 767px) {
    display: none;
  }
`;

const StyledPiStarFill = styled(PiStarFill)`
  color: #f6c002;
  height: 16px;
  width: 16px;
`;

const StyledPiStarLight = styled(PiStarLight)`
  color: #f6c002;
  height: 16px;
  width: 16px;
`;

const StyledTitle = styled.p`
  font-size: 18px;
  font-weight: 600;
  color: #000000;
  text-align: start;
  vertical-align: middle;
`;

const StyledContent = styled.p`
  font-size: 16px;
  font-weight: 400;
  color: #000000;
  text-align: start;
  vertical-align: middle;
`;

const StlyedHr = styled.hr`
  margin: 0;
`;

const ToiletRegisterButton = styled.button`
  padding: 0 16px;
  font-size: 16px;
  border-radius: 18px;
  border: none;
  background-color: #ffffff;
  color: #0067c7;
  border: solid 2px #0067c7;
  font-weight: 600;
  height: 40px;
  border-radius: 8px;
  display: flex;
  gap: 12px;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const StyledFormCheck = styled(Form.Check)`
  display: flex;
  align-items: flex-end;
  gap: 8px;
`;

function ToiletDetail() {
  const { toilet, location, toggleListUpdated } = useOutletContext();
  const { Y_WGS84, X_WGS84, FNAME, ANAME, distance, separated, disabled, diaper, paper} = toilet || {};
  const { toiletNo } = useParams();
  const member = useSelector(selectMember);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [address, setAddress] = useState("");
  const [comment, setComment] = useState("");
  const [inputScore, setInputScore] = useState(3);
  const [commentList, setCommentList] = useState([]);
  const [toiletScore, setToiletScore] = useState(3.0);
  const [regModalShow, setRegModalShow] = useState(false);
  const [separatedChecked, setSeparatedChecked] = useState(false);
  const [disabledChecked, setDisabledChecked] = useState(false);
  const [diaperChecked, setDiaperChecked] = useState(false);
  const [paperChecked, setPaperChecked] = useState(false);
  const [toggleCommentList, setToggleCommentList] = useState(false);

  useEffect(() => {
    setSeparatedChecked(separated || false);
    setDisabledChecked(disabled || false);
    setDiaperChecked(diaper || false);
    setPaperChecked(paper || false);
  }, [toilet]);

  useEffect(() => {
    const getAddress = async () => {
      if (X_WGS84 === undefined) {
        return;
      }
      const address = await fetchAddressFromCoords(Y_WGS84, X_WGS84);
      setAddress(address);
    };
    getAddress();
  }, [toilet]);

  useEffect(() => {
    const getCommentList = async () => {
      const result = await fetchReviewListByToiletNo(toiletNo);
      setCommentList(result);
    };
    getCommentList();

    const getAvgScore = async () => {
      const result = await getAvgScoreByToiletNo(toiletNo);
      setToiletScore(result);
    };
    getAvgScore();
  }, [toggleCommentList]);

  const handleCommentList = () => {
    setToggleCommentList(!toggleCommentList);
  }

  if (!address || !toilet) {
    return;
  }

  const sortedCommentList = commentList?.sort(
    (a, b) => new Date(b.regDate) - new Date(a.regDate)
  );

  const handleFindRoute = async (lat, lng, name) => {
    try {
      const startResult = await fetchWCongnamulCoord(
        location.center.lat,
        location.center.lng
      );
      const destResult = await fetchWCongnamulCoord(lat, lng);
      const url = `https://map.kakao.com/?map_type=TYPE_MAP&target=walk&rt=${startResult[0].x}%2C${startResult[0].y}%2C${destResult[0].x}%2C${destResult[0].y}&rt1=내위치&rt2=${name}&rtIds=%2C&rtTypes=%2C`;
      window.open(url, "_blank");
    } catch (error) {
      console.error(error);
    }
  };

  const handleReviewButton = async () => {
    if (comment) {
      const result = await registerToiletReview(
        toiletNo,
        comment,
        inputScore,
        FNAME
      );
      await registerToiletInfo(
        toiletNo,
        Y_WGS84,
        X_WGS84,
        address,
        FNAME,
        separatedChecked,
        disabledChecked,
        diaperChecked,
        paperChecked
      );
      setComment("");
      if (result) {
        const getReviewList = async () => {
          const result = await fetchReviewListByToiletNo(toiletNo);
          setCommentList(result);
        };
        getReviewList();
        const getAvgScore = async () => {
          const result = await getAvgScoreByToiletNo(toiletNo);
          setToiletScore(result);
        };
        getAvgScore();
      }
    } else {
      window.alert("내용을 입력하세요");
    }
  };

  const handleFindRouteWithCVS = async (lat, lng, name) => {
    try {
      const startResult = await fetchWCongnamulCoord(
        location.center.lat,
        location.center.lng
      );
      const CVSCoord = await fetchCVSCoord(lat, lng);
      const CVSResult = await fetchWCongnamulCoord(
        CVSCoord[0].y,
        CVSCoord[0].x
      );
      const destResult = await fetchWCongnamulCoord(lat, lng);
      const url = `https://map.kakao.com/?map_type=TYPE_MAP&target=walk&rt=${startResult[0].x}%2C${startResult[0].y}%2C${CVSResult[0].x}%2C${CVSResult[0].y}%2C${destResult[0].x}%2C${destResult[0].y}&rt1=내위치&rt2=${CVSCoord[0].place_name}&rt2=${name}&rtIds=%2C&rtTypes=%2C`;
      window.open(url, "_blank");
    } catch (error) {
      console.error(error);
    }
  };

  const handleClose = () => setRegModalShow(false);
  const hadleModlaShow = () => {
    if (!member) {
      alert("로그인을 해 주세요.");
      return;
    }
    setRegModalShow(true);
  };

  const handleSeparatedChange = (e) => {
    setSeparatedChecked(e.target.checked);
  };
  const handleDisabledChange = (e) => {
    setDisabledChecked(e.target.checked);
  };
  const handleDiaperChange = (e) => {
    setDiaperChecked(e.target.checked);
  };
  const handlePaperChange = (e) => {
    setPaperChecked(e.target.checked);
  };


  const handleToiletRegister = async () => {
    const result = await registerToiletInfo(
      toiletNo,
      Y_WGS84,
      X_WGS84,
      address,
      FNAME,
      separatedChecked,
      disabledChecked,
      diaperChecked,
      paperChecked
    );
    if (result.status === 201) {
      handleClose();
      alert("감사합니다. 500포인트가 지급되었습니다.");
      setSeparatedChecked(false);
      setDisabledChecked(false);
      setDiaperChecked(false);
      setPaperChecked(false);
      toggleListUpdated();
      const getMemberByID = async () => {
        const result = await fetchMemberById(member.memId);
        localStorage.setItem("member", JSON.stringify(result));
        dispatch(loginSuccess(result));
        
      };
      getMemberByID();
      if (result.data === 'VIP') {
        alert('축하합니다. VIP 등급으로 변경되었습니다.')
      }
      navigate(`/`);
    } else {
      handleClose();
      alert("화장실 정보 등록 중 오류가 발생하였습니다.");
      setSeparatedChecked(false);
      setDisabledChecked(false);
      setDiaperChecked(false);
      setPaperChecked(false);
      navigate(`/`);
    }
  };

  return (
    <ToiletDetailContainer>
      <RoadViewWrapper>
        <Roadview
          position={{
            lat: Y_WGS84,
            lng: X_WGS84,
            radius: 50,
          }}
          style={{
            width: "100%",
            height: "280px",
          }}
        />
      </RoadViewWrapper>
      <ToiletInfoCommentContainer>
        <ToiletInfoContainer>
          <StyledTitle>
            {FNAME} {ANAME && `(${ANAME})`}
          </StyledTitle>
          <ToiletScoreDistanceContainer>
            <ToiletScoreContainer>
              <StyledPiStarFill />
              <StyledContent>{toiletScore}</StyledContent>
            </ToiletScoreContainer>
            <StyledContent>{distance}m</StyledContent>
          </ToiletScoreDistanceContainer>
          <StyledContent>{address}</StyledContent>
        </ToiletInfoContainer>
        {sortedCommentList?.length > 0 && <StlyedHr />}
        <ToiletCommentContainer>
          {sortedCommentList
            ?.filter((comment) => comment.writer === member?.memId)
            .map((comment) => (
              <ToiletCommentUser key={comment.reviewNo} comment={comment} handleCommentList={handleCommentList}/>
            ))}
          {sortedCommentList
            ?.filter((comment) => comment.writer !== member?.memId)
            .map((comment) => (
              <ToiletComment key={comment.reviewNo} comment={comment} />
            ))}
        </ToiletCommentContainer>
        {sortedCommentList?.length > 0 && <StlyedHr />}
        <MemIdScoreInputContainer>
          <MemIdScoreContainer>
            <StyledTitle>
              {member ? member.memId : "로그인해 주세요."}
            </StyledTitle>
            <ScoreWrapper>
              {[...Array(inputScore)].map((a, i) => (
                <StyledPiStarFill
                  className="star-lg"
                  key={i}
                  onClick={() => setInputScore(i + 1)}
                />
              ))}
              {[...Array(5 - inputScore)].map((a, i) => (
                <StyledPiStarLight
                  className="star-lg"
                  key={i}
                  onClick={() => setInputScore(inputScore + i + 1)}
                />
              ))}
            </ScoreWrapper>
          </MemIdScoreContainer>
          <InputGroup>
            <Form.Control
              placeholder="댓글을 입력하세요."
              disabled={!member}
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
              }}
            />
            <Button
              variant="outline-secondary"
              id="button-addon2"
              disabled={!member}
              onClick={handleReviewButton}
            >
              저장
            </Button>
          </InputGroup>
        </MemIdScoreInputContainer>
      </ToiletInfoCommentContainer>
      <BottonGroupContainer>
        <ButtonContainer>
          <SearchButton
            onClick={() => handleFindRoute(Y_WGS84, X_WGS84, FNAME)}
          >
            <StyledTbRoadSign />
            길찾기
          </SearchButton>
          <SearchButton
            onClick={() => handleFindRouteWithCVS(Y_WGS84, X_WGS84, FNAME)}
          >
            <StyledTbRoadSign />
            편의점 경유 길찾기
          </SearchButton>
          <GoToListButton onClick={() => navigate("/")}>
            돌아가기
          </GoToListButton>
        </ButtonContainer>
        <ButtonContainer>
          <ToiletRegisterButton onClick={hadleModlaShow}>
            <FaCoins />
            화장실 정보 입력하고 포인트 받기
          </ToiletRegisterButton>
        </ButtonContainer>
      </BottonGroupContainer>
      <Modal
        show={regModalShow}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>화장실 추가 정보 입력</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <StyledFormCheck
            type="checkbox"
            id="separated-checkbox"
            label="남녀 화장실이 구분되어 있습니다."
            checked={separatedChecked}
            onChange={handleSeparatedChange}
          />
          <StyledFormCheck
            type="checkbox"
            id="disabled-checkbox"
            label="장애인 화장실이 있습니다."
            checked={disabledChecked}
            onChange={handleDisabledChange}
          />
          <StyledFormCheck
            type="checkbox"
            id="diaper-checkbox"
            label="아기 기저귀 갈이대가 있습니다."
            checked={diaperChecked}
            onChange={handleDiaperChange}
          />
          <StyledFormCheck
            type="checkbox"
            id="paper-checkbox"
            label="화장지가 구비되어 있습니다."
            checked={paperChecked}
            onChange={handlePaperChange}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            닫기
          </Button>
          <Button
            variant="primary"
            style={{
              display: "flex",
              gap: "8px",
              alignItems: "center",
              background: "#0067c7",
            }}
            onClick={handleToiletRegister}
          >
            <FaCoins />
            제출하기
          </Button>
        </Modal.Footer>
      </Modal>
    </ToiletDetailContainer>
  );
}

export default ToiletDetail;
