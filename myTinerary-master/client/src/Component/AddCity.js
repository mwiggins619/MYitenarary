import React, { Component } from "react";
import { fetchCitiesAction, fetchAddCity } from "../store/actions/cityActions";
import { connect } from "react-redux";

class AddCity extends Component {
  constructor() {
    super();
    this.state = {
      name: null,
      country: null,
      picture: null,
    };
  }

  componentDidMount() {
    const city = this.props.cities;
    this.props.fetchCitiesAction(city);
  }

  handelChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };
  handelSubmit = (e) => {
    e.preventDefault();
    console.log(e);
    const newCity = {
      name: this.state.name,
      country: this.state.country,
      picture: this.state.picture,
    };
    // retrieve token from local storage and send it to the add city action0DEFFF
    //where to write condition for user login?
    var token = localStorage.getItem("token");
    this.props.fetchAddCity(newCity, token);

    console.log("submit", this.state);
  };
  render() {
    return (
      <div className="container-fluied">
        <form
          onSubmit={this.handelSubmit}
          className="App-header align-items-center"
        >
          <div className="d-block ">
            <label className="mx-2" htmlFor="name">
              {" "}
              Name:
            </label>
            <input type="text" id="name" onChange={this.handelChange} />
          </div>
          <div className="d-block">
            <label className="mx-2" htmlFor="country">
              {" "}
              Country:
            </label>
            <input type="text" id="country" onChange={this.handelChange} />
          </div>
          <div className="d-block">
            <label className="mx-2" htmlFor="picture">
              Picture:
            </label>
            <input type="url" id="picture" onChange={this.handelChange} />
          </div>
          <div className="d-block">
            <button className="mx-2" type="submit">
              Add New City
            </button>
          </div>
        </form>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    cities: state.cities.cities,
    user: state.users,
  };
};
const mapDispatchToProps = (dispatch) => ({
  fetchAddCity: (city, token) => dispatch(fetchAddCity(city, token)),
  fetchCitiesAction: (city) => dispatch(fetchCitiesAction(city)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddCity);
