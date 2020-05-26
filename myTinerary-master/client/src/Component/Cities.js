import React, { Component } from "react";
import { connect } from "react-redux";
import { Spinner } from "react-bootstrap";
import { fetchCitiesAction } from "../store/actions/cityActions";
import { Link } from "react-router-dom";
class Cities extends Component {
  constructor() {
    super();
    this.state = {
      cities: [],
      search: "",
    };
  }

  componentDidMount() {
    this.props.fetchCitiesAction();
  }
  cutArray() {
    return this.props.cities.map((city, index) => {
      return index < 15;
    });
  }
  handleChange = (e) => {
    this.setState({
      search: e.target.value,
    });
  };
  filter() {
    if (this.props.cities) {
      const filterCity = this.props.cities.filter((city, index) => {
        let cityName = city.name.toLowerCase();
        return cityName.startsWith(this.state.search.toLowerCase());
      });
      return filterCity;
    } else return [];
  }

  render() {
    const filterList = this.filter();

    return (
      <div className="container-fluied ">
        <div className="justify-content-center col-sm-12 col-md-12 my-3 ">
          {/* <label htmlFor="filter"> </label> */}
          <input
            placeholder="Search for City:"
            className="btn btn-outline-info mr-2"
            type="search"
            id="filter"
            value={this.state.search}
            onChange={this.handleChange}
          />
          <Link to="/AddCity">
            <button className="btn btn-outline-info">Add city you like</button>
          </Link>
        </div>
        {!this.props.cities && (
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        )}

        {filterList &&
          filterList.map((city, index) => (
            <Link key={index} to={"itineraries/all/" + city.name}>
              <div
                city={city}
                className="col-sm-12
                col-md-12
                city
                col-lg-3 justify-content-between container mx-2 "
              >
                <div className="card border-info ">
                  <h3 className="card-title">{city.name}</h3>
                  <img className="card-img " src={city.picture} alt="city" />
                </div>
              </div>
            </Link>
          ))}
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    cities: state.cities.cities,
  };
};
const mapDispatchToProps = (dispatch) => ({
  fetchCitiesAction: (city) => dispatch(fetchCitiesAction(city)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Cities);
