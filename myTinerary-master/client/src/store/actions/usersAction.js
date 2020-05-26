import axios from "axios";
import jwt_decode from "jwt-decode"; // import dependency
// import { Redirect } from "react-router-dom";
// import fetchItinerariesByCityName from "../../Component/Itinerary";
export const fetchUsersAction = () => {
  return (dispatch) => {
    //add the full url of your back end
    fetch("http://localhost:5000/api/users/all")
      .then((resp) => {
        return resp.json();
      })
      .then((json) => {
        dispatch({ type: "FETCH_USERS_SUCCESS", payload: json });
      })
      .catch((err) => {
        dispatch({ type: "FETCH_USERS_ERROR", payload: err });
      });
  };
};

export const register = (newUser) => {
  return (dispatch) => {
    axios
      .post("http://localhost:5000/api/users/register", newUser)
      .then((res) => {
        console.log("response", res);
        if (res.status === 200) {
          const token = res.data.token;
          localStorage.setItem("token", token);
          console.log("token", token);
          const decoded = jwt_decode(token); // decode your token here
          // window.location = "/Login";
          dispatch({
            type: "LOGIN_SUCCESS",
            payload: decoded,
            token: res.data.token,
          });
        }
      })
      .catch((error) => {
        console.log("error" + error.response);
        if (error.response) {
          if (error.response.status === 409) {
            alert("Register error");
          } else {
            //alert with something else
            alert("Be Sure From Your Register");
          }
        }
      });
    //add the full url of your back end
  };
};

export const googleAuth = (code) => {
  return (dispatch) => {
    localStorage.setItem("token", code);
    const decoded = jwt_decode(code);
    dispatch({
      type: "LOGIN_SUCCESS",
      payload: decoded,
      token: code,
    });
  };
};
export const login = (userData) => {
  return (dispatch) => {
    axios
      .post("http://localhost:5000/api/users/login", userData)
      .then((res) => {
        console.log("response", res.data.token);
        if (res.status === 200) {
          // decode the token
          const token = res.data.token;
          console.log(token);
          localStorage.setItem("token", res.data.token);
          const decoded = jwt_decode(token); // decode your token here
          dispatch({
            type: "LOGIN_SUCCESS",
            payload: decoded,
            token: res.data.token,
          });
        }
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 409) {
            alert("loggin error");
          } else {
            // alert("error from Login");
          }
        }
      });
    //add the full url of your back end
    // axios.get("http://localhost:3000/Landing");
  };
};
//////////////log out
export const logUserOut = () => {
  return (dispatch) => {
    axios.get("http://localhost:3000/Landing");
    localStorage.removeItem("token");
    dispatch({ type: "LOGED_OUT" });
  };
};

////////////delete email favorite from the itinerary
// export const fetchItinerariesDeleteFavorite = (emailAdded, id, name) => {
//   return (dispatch) => {
//     axios
//       .delete(`http://localhost:5000/api/itineraries/${id}/favorites`, {
//         id: id,
//       })
//       .then((res) => {
//         console.log("response", res);
//         if (res.status === 200) {
//           //send the user to his account page
//           dispatch({ type: "DELETE_USER_FAVORITE" });
//           dispatch(fetchItinerariesByCityName(name));
//         }
//       })
//       .catch((error) => {
//         console.log("error " + error.response);
//         if (error.response) {
//           if (error.response.status === 409) {
//             alert("problem with email");
//           } else {
//             //alert with something else
//             alert("Be Sure From Your email and link at delete fav");
//           }
//         }
//       });
//   };
// };
