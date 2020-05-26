import React, { Component } from "react";
import { connect } from "react-redux";

class UserFavoriteItinerary extends Component {
  render() {
    return (
      <div>
        <h1>your Favorite Itinerary</h1>
        {this.props.user.favorite}
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    itineraries: state.itineraries.itineraries,
    user: state.users,
    favorites: state.itineraries.favorites,
  };
};
const mapDispatchToProps = (dispatch) => ({});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserFavoriteItinerary);
