import axios from "axios";
export const fetchCitiesAction = () => {
  return (dispatch) => {
    //add the full url of your back end
    fetch("http://localhost:5000/api/cities/all")
      .then((resp) => {
        return resp.json();
      })
      .then((json) => {
        dispatch({ type: "FETCH_CITIES_SUCCESS", payload: json });
      })
      .catch((err) => {
        dispatch({ type: "FETCH_CITIES_ERROR", payload: err });
      });
  };
};
export const fetchAddCity = (newCity, token) => {
  return (dispatch) => {
    const config = {
      headers: {
        Authorization: token,
      },
    };

    axios
      .post("http://localhost:5000/api/cities/", newCity, config)
      .then((res) => {
        console.log("response", res);
        if (res.status === 200) {
          dispatch({ type: "ADD_CITY", token });
          dispatch(fetchCitiesAction());
        }
      })
      .catch((error) => {
        console.log("error" + error.response);
        if (error.response) {
          if (error.response.status === 409) {
            alert("problem with email");
          } else {
            //alert with something else
            alert("Be Sure From Your email and link");
          }
        }
      });
  };
};
// add the token to the headers of the axios request
