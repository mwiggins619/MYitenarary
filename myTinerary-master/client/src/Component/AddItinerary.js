import React, { Component } from "react";
import { fetchNewItinerary } from "../store/actions/itineraryActions";
import { connect } from "react-redux";
// import { Redirect } from "react-router-dom";
// import { Form, Button } from "react-bootstrap";
class AddItinerary extends Component {
  constructor() {
    super();
    this.state = {
      name: null,
      profile: null,
      activities: [],
      hashtags: [],
      price: null,
      duration: null,
      rating: null,
    };
  }

  handelChange = (e) => {
    console.log("e", e);
    this.setState({
      [e.target.id]: e.target.value,
    });
    console.log("e.target.value", e.target.value);
    console.log("state", this.state);
  };
  handelSubmit = (e) => {
    e.preventDefault();
    if (!this.props.user.isLoggedin) {
      alert(" you need to login");
      // return <Redirect to="/Login" />;
    } else if (
      this.state.name === "" ||
      this.state.profile === "" ||
      this.state.activities === ""
    ) {
      alert("You need to fill these fields");
    } else {
      const newitinerary = {
        name: this.state.name,
        profile: this.state.profile,
        rating: this.state.rating,
        hashtags: this.state.hashtags,
        activities: this.state.activities,
        duration: this.state.duration,
        price: this.state.price,
      };

      var token = localStorage.getItem("token");
      this.props.fetchNewItinerary(newitinerary, token);
      console.log("itinerary", newitinerary, token);
    }
  };
  render() {
    return (
      <div
        className="card p-2 card-itinerary-add border-info"
        style={{ width: "80%" }}
      >
        {/* <Form onSubmit={this.handelSubmit}>
          <Form.Group controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="name" placeholder="Enter city name" />
          </Form.Group>

          <Form.Group controlId="formBasicProfile">
            <Form.Label>Profile</Form.Label>
            <Form.Control
              type="url"
              placeholder="Profile"
              onChange={this.handelChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicDuration">
            <Form.Label>duration</Form.Label>
            <Form.Control
              type="text"
              placeholder="duration"
              onChange={this.handelChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicRating">
            <Form.Label>rating</Form.Label>
            <Form.Control
              type="number"
              placeholder="rating"
              onChange={this.handelChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicActivities">
            <Form.Label>activities</Form.Label>
            <Form.Control
              type="text"
              placeholder="activities"
              onChange={this.handelChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicHashtags">
            <Form.Label>Hashtags</Form.Label>
            <Form.Control
              type="text"
              placeholder="Hashtags"
              onChange={this.handelChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPrice">
            <Form.Label>price</Form.Label>
            <Form.Control
              type="text"
              placeholder="price"
              onChange={this.handelChange}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form> */}
        {/* className="card p-2 card-itinerary-add border-info"  style=
        {{ width: "18rem" }}
       >  */}
        <form onSubmit={this.handelSubmit} className="m-2">
          <div className="align-items-center block">
            <label className="mx-2 " htmlFor="name">
              Name:
            </label>
            <input type="text" id="name" onChange={this.handelChange} />{" "}
          </div>
          <div className="align-items-center block">
            <label className="mx-2" htmlFor="profile">
              profile
            </label>
            <input type="url" id="profile" onChange={this.handelChange} />
          </div>
          <div className="align-items-center block">
            <label className="mx-2" htmlFor="duration">
              duration:
            </label>
            <input type="text" id="duration" onChange={this.handelChange} />
          </div>
          <div className="align-items-center block">
            <label className="mx-2" htmlFor="rating">
              rating:
            </label>
            <input type="number" id="rating" onChange={this.handelChange} />
          </div>
          <div className="align-items-center block">
            <label className="mx-2" htmlFor="activities">
              activites:
            </label>
            <input type="text" id="activites" onChange={this.handelChange} />
          </div>
          <div className="align-items-center block">
            <label className="mx-2" htmlFor="hashtags">
              hashtags:
            </label>
            <input type="text" id="hashtags" onChange={this.handelChange} />
          </div>
          <div className="align-items-center block">
            <label className="mx-2 " htmlFor="price">
              price:
            </label>
            <input type="text" id="price" onChange={this.handelChange} />
          </div>
          <button className="mx-2 btn-info" type="submit">
            Add New Itinerary
          </button>
        </form>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    cities: state.cities.cities,
    user: state.users,
    itineraries: state.itineraries.itineraries,
  };
};
const mapDispatchToProps = (dispatch) => ({
  fetchNewItinerary: (newitinerary, token) =>
    dispatch(fetchNewItinerary(newitinerary, token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddItinerary);
