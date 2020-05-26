import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchProfileFavorites } from "../store/actions/itineraryActions";
import { login } from "../store/actions/usersAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import {
  fetchItinerariesFavorite,
  fetchItinerariesDeleteFavorite,
} from "../store/actions/itineraryActions";
class UserAccount extends Component {
  componentDidMount() {
    const ids = this.props.users.favorites;
    console.log("ids", ids);
    // const ids =this.props.itineraries.favorites.includes(this.props.users.email)
    this.props.fetchProfileFavorites(ids);
  }
  handelFavorite = (id, name) => {
    if (this.props.users.email == null) {
      alert("you need to log in");
    } else {
      const emailAdded = this.props.user.email;

      this.props.fetchItinerariesFavorite(emailAdded, id, name);
    }
  };
  handelDeleteFavorite = (id, name) => {
    const emailAdded = this.props.users.email;
    console.log("emailAdded", emailAdded);
    this.props.fetchItinerariesDeleteFavorite(emailAdded, id, name);
  };

  render() {
    const itineraries = this.props.itineraries.favoriteitineraries;
    console.log("itineraries", itineraries);
    const email = this.props.users.email;
    console.log("from userAccount", this.props.users);
    return (
      <div className="container">
        {/* {users.isLoggedin && itineraries.includes(users.favorites) ? (
          <img src={itineraries.profile} />
        ) : (
          <h4>You Have No Liked Itinerary</h4>
        )} */}
        {/* {this.props.itineraries.includes(users.email) ? (
          <img src={itineraries.profile} />
        ) : (
          <h4>you have no favorite itinerary</h4>
        )} */}
        {itineraries &&
          itineraries.map((itinerary, index) => (
            <div key={index} itinerary={itinerary}>
              {/* <div>
                <img src={itinerary.profile} alt="" />
              </div>{" "} */}
              <div
                className="container m-2 itinerary rounded"
                key={index}
                itinerary={itinerary}
              >
                <div className="row justify-content-between">
                  <h4 className="card-title pt-3 text-light col-6">
                    Activities in {itinerary.name} : {itinerary.activities}
                  </h4>

                  <FontAwesomeIcon
                    className="pt-3"
                    icon={faHeart}
                    size="3x"
                    style={
                      itinerary.favorites.includes(email)
                        ? { color: "red" }
                        : { color: "#3986c3" }
                    }
                    // onClick={() => this.handelFavorite(itinerary.name)}
                    onClick={() =>
                      itinerary.favorites.includes(email)
                        ? this.handelDeleteFavorite(
                            itinerary._id,
                            itinerary.name
                          )
                        : this.handelFavorite(itinerary._id, itinerary.name)
                    }
                    // onClick={() =>
                    //   itinerary.favorites.includes(email) &&
                    //     this.props.user.favorites.includes(itinerary._id)
                    //     ? this.handelDeleteFavorite(itinerary._id, itinerary.name)
                    //     : this.handelFavorite(itinerary._id, itinerary.name)
                    // }
                  />
                </div>
                <img
                  className="card-body"
                  src={itinerary.profile}
                  alt={itinerary.name}
                />
                <div className="text-light pb-3">
                  <h4>
                    The Price for {itinerary.duration} With Hotels{" "}
                    {itinerary.price}
                  </h4>
                </div>
              </div>
            </div>
          ))}
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  console.log("state", state);
  return {
    users: state.users,
    itineraries: state.itineraries,
  };
};
const mapDispatchToProps = (dispatch) => ({
  login: (userData) => dispatch(login(userData)),
  fetchProfileFavorites: (ids) => dispatch(fetchProfileFavorites(ids)),
  fetchItinerariesFavorite: (emailAdded, id, name) =>
    dispatch(fetchItinerariesFavorite(emailAdded, id, name)),
  fetchItinerariesDeleteFavorite: (emailAdded, id, name) =>
    dispatch(fetchItinerariesDeleteFavorite(emailAdded, id, name)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserAccount);
