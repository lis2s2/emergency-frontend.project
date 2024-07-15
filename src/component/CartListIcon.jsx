// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import styled from "styled-components";
// import { setCartItems } from "../features/cart/cartSlice";

// const CartIcon = styled.div`
//   position: fixed;
//   width: 100px;
//   height: 100px;
//   right: 82px;
//   top: 140px;
//   border-radius: 50%;
//   background: #FFFFFF;
//   box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   transition: 0.2s background ease-in;
//   z-index: 999;

//   &:hover{
//     background: #f0f0f0;
//   }
// `;

// const CartNumDiv = styled.div`
//   position: fixed;
//   width: 30px;
//   height: 30px;
//   right: 100px;
//   top: 163px;
//   border-radius: 50%;
//   background: #FF6E4E;
//   z-index: 10;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// const CartNum = styled.span`
//   color: #fff;
//   font-size: 20px;
// `;


// function CartListIcon() {
//   const [cartCount, setCartCount] = useState(0);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const memId = JSON.parse(localStorage.getItem("member")).memId;
//     try {
//       axios.get(`${process.env.REACT_APP_API_URL}/carts/count?memberMemId=${memId}`)
//       .then((res) => {
//         dispatch(setCartItems(res.data));
//         setCartCount(res.data);
//       })
//     } catch (error) {
//       console.log(error);
//     }
    
//   }, []);



//   return (
//     <CartIcon className="cursor-pointer" onClick={() => navigate('/cart')}>
//         <svg width="50" height="53" viewBox="0 0 21 23" fill="none" xmlns="http://www.w3.org/2000/svg">
//           <path d="M19.5474 7.64287C19.4476 6.64179 19.005 5.71796 18.3075 5.05446C17.6099 4.39097 16.7083 4.03622 15.7812 4.06053H14.7116C14.5281 2.92319 13.9812 1.89254 13.1669 1.14984C12.3527 0.407154 11.3234 0 10.26 0C9.19661 0 8.16728 0.407154 7.35306 1.14984C6.53884 1.89254 5.99188 2.92319 5.80838 4.06053H4.72372C3.79666 4.03622 2.89501 4.39097 2.19746 5.05446C1.49992 5.71796 1.05738 6.64179 0.957552 7.64287L0.0160087 18.5698C-0.0311897 19.1057 0.0262609 19.6464 0.184608 20.1566C0.342956 20.6668 0.598638 21.135 0.934955 21.5306C1.29579 21.9548 1.73384 22.2931 2.22136 22.524C2.70888 22.7549 3.23524 22.8734 3.76712 22.8719H16.7529C17.2848 22.8734 17.8111 22.7549 18.2986 22.524C18.7862 22.2931 19.2242 21.9548 19.585 21.5306C19.9214 21.135 20.177 20.6668 20.3354 20.1566C20.4937 19.6464 20.5512 19.1057 20.504 18.5698L19.5474 7.64287ZM10.26 1.60688C10.9263 1.60923 11.573 1.85132 12.0991 2.29528C12.6252 2.73924 13.0009 3.36003 13.1675 4.06053H7.35251C7.51908 3.36003 7.89479 2.73924 8.42087 2.29528C8.94695 1.85132 9.59372 1.60923 10.26 1.60688ZM18.4703 20.4182C18.2525 20.6772 17.9871 20.8838 17.6914 21.0247C17.3956 21.1656 17.0759 21.2376 16.7529 21.2361H3.76712C3.44413 21.2376 3.12444 21.1656 2.82865 21.0247C2.53286 20.8838 2.26752 20.6772 2.04974 20.4182C1.85533 20.1915 1.70719 19.9228 1.61503 19.6296C1.52288 19.3365 1.48877 19.0255 1.51495 18.717L2.47909 7.79827C2.54128 7.20562 2.80683 6.66018 3.22282 6.27063C3.63882 5.88107 4.17471 5.67601 4.72372 5.6963H5.74059V7.33207C5.74059 7.54899 5.81995 7.75702 5.96121 7.9104C6.10247 8.06379 6.29406 8.14996 6.49383 8.14996C6.6936 8.14996 6.88518 8.06379 7.02644 7.9104C7.1677 7.75702 7.24706 7.54899 7.24706 7.33207V5.6963H13.2729V7.33207C13.2729 7.54899 13.3523 7.75702 13.4936 7.9104C13.6348 8.06379 13.8264 8.14996 14.0262 8.14996C14.2259 8.14996 14.4175 8.06379 14.5588 7.9104C14.7001 7.75702 14.7794 7.54899 14.7794 7.33207V5.6963H15.7963C16.3478 5.6718 16.8875 5.87495 17.3067 6.26491C17.7259 6.65486 17.9936 7.2027 18.056 7.79827L19.0201 18.7252C19.0432 19.0335 19.0062 19.3437 18.9115 19.6354C18.8167 19.9271 18.6664 20.1939 18.4703 20.4182Z" fill="#010035"/>
//         </svg>

//         {cartCount != 0 &&
//           <CartNumDiv>
//             <CartNum>{cartCount}</CartNum>
//           </CartNumDiv>
//         }

//       </CartIcon>
//   );
// };

// export default CartListIcon;


import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const CartIcon = styled.div`
  position: fixed;
  width: 100px;
  height: 100px;
  right: 82px;
  top: 140px;
  border-radius: 50%;
  background: #FFFFFF;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.2s background ease-in;
  z-index: 999;

  &:hover{
    background: #f0f0f0;
  }
`;

const CartNumDiv = styled.div`
  position: fixed;
  width: 30px;
  height: 30px;
  right: 100px;
  top: 163px;
  border-radius: 50%;
  background: #FF6E4E;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CartNum = styled.span`
  color: #fff;
  font-size: 20px;
`;

function CartListIcon() {
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const memId = JSON.parse(localStorage.getItem("member")).memId;
    try {
      axios.get(`${process.env.REACT_APP_API_URL}/carts/count?memberMemId=${memId}`)
      .then((res) => {
        setCartCount(res.data);
      })
    } catch (error) {
      console.log(error);
    }
    
  }, []);

  return (
    <CartIcon className="cursor-pointer" onClick={() => navigate('/cart')}>
        <svg width="50" height="53" viewBox="0 0 21 23" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19.5474 7.64287C19.4476 6.64179 19.005 5.71796 18.3075 5.05446C17.6099 4.39097 16.7083 4.03622 15.7812 4.06053H14.7116C14.5281 2.92319 13.9812 1.89254 13.1669 1.14984C12.3527 0.407154 11.3234 0 10.26 0C9.19661 0 8.16728 0.407154 7.35306 1.14984C6.53884 1.89254 5.99188 2.92319 5.80838 4.06053H4.72372C3.79666 4.03622 2.89501 4.39097 2.19746 5.05446C1.49992 5.71796 1.05738 6.64179 0.957552 7.64287L0.0160087 18.5698C-0.0311897 19.1057 0.0262609 19.6464 0.184608 20.1566C0.342956 20.6668 0.598638 21.135 0.934955 21.5306C1.29579 21.9548 1.73384 22.2931 2.22136 22.524C2.70888 22.7549 3.23524 22.8734 3.76712 22.8719H16.7529C17.2848 22.8734 17.8111 22.7549 18.2986 22.524C18.7862 22.2931 19.2242 21.9548 19.585 21.5306C19.9214 21.135 20.177 20.6668 20.3354 20.1566C20.4937 19.6464 20.5512 19.1057 20.504 18.5698L19.5474 7.64287ZM10.26 1.60688C10.9263 1.60923 11.573 1.85132 12.0991 2.29528C12.6252 2.73924 13.0009 3.36003 13.1675 4.06053H7.35251C7.51908 3.36003 7.89479 2.73924 8.42087 2.29528C8.94695 1.85132 9.59372 1.60923 10.26 1.60688ZM18.4703 20.4182C18.2525 20.6772 17.9871 20.8838 17.6914 21.0247C17.3956 21.1656 17.0759 21.2376 16.7529 21.2361H3.76712C3.44413 21.2376 3.12444 21.1656 2.82865 21.0247C2.53286 20.8838 2.26752 20.6772 2.04974 20.4182C1.85533 20.1915 1.70719 19.9228 1.61503 19.6296C1.52288 19.3365 1.48877 19.0255 1.51495 18.717L2.47909 7.79827C2.54128 7.20562 2.80683 6.66018 3.22282 6.27063C3.63882 5.88107 4.17471 5.67601 4.72372 5.6963H5.74059V7.33207C5.74059 7.54899 5.81995 7.75702 5.96121 7.9104C6.10247 8.06379 6.29406 8.14996 6.49383 8.14996C6.6936 8.14996 6.88518 8.06379 7.02644 7.9104C7.1677 7.75702 7.24706 7.54899 7.24706 7.33207V5.6963H13.2729V7.33207C13.2729 7.54899 13.3523 7.75702 13.4936 7.9104C13.6348 8.06379 13.8264 8.14996 14.0262 8.14996C14.2259 8.14996 14.4175 8.06379 14.5588 7.9104C14.7001 7.75702 14.7794 7.54899 14.7794 7.33207V5.6963H15.7963C16.3478 5.6718 16.8875 5.87495 17.3067 6.26491C17.7259 6.65486 17.9936 7.2027 18.056 7.79827L19.0201 18.7252C19.0432 19.0335 19.0062 19.3437 18.9115 19.6354C18.8167 19.9271 18.6664 20.1939 18.4703 20.4182Z" fill="#010035"/>
        </svg>

        {cartCount != 0 &&
          <CartNumDiv>
            <CartNum>{cartCount}</CartNum>
          </CartNumDiv>
        }

      </CartIcon>
  );
}

export default CartListIcon;
