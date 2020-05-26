import React, { Component } from "react";
import "../App.css";
import Circle from "../Component/images/Circle.png";
import CarouselImg from "./CarouselImg";
// import HeaderMatirial from "./HeaderMatirial";
import { googleAuth } from "../store/actions/usersAction";
import { Link } from "react-router-dom";
import { fetchCitiesAction } from "../store/actions/cityActions";
import { connect } from "react-redux";
class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: null,
    };
  }
  componentDidMount() {
    this.props.fetchCitiesAction();

    console.log(this.props.location);
    const code = this.props.location.search.split("=")[1];
    if (code) {
      this.props.googleAuth(code);
      console.log(code);
    }
  }
  render() {
    const cities = this.props.cities;
    return (
      <div className="container-fluied ">
        <header className="col-12 header">
          <section className="container-for-header-text col-12">
            <div className="header-text-wrapper col-sm-12">
              <h1>My Itinerary</h1>
              <p>make your trip with Love</p>
            </div>
          </section>

          {/* <img src={PhotoWithCamera} className="App-logo " alt="logo" /> */}
        </header>

        <div className="transperant">
          <p className="pt-4 textSize col-sm-12 ">
            Find your perfect trip ,designed by insiders who know their cities{" "}
          </p>
          <h1 className="textSize mt-4 col-sm-12 ">Start Browing</h1>
          <Link to="/Cities">
            <img src={Circle} alt="looking" className="circle" />
          </Link>
          <p className="mt-4 textSize col-sm-12">
            Want to build your own Itinerary ?
          </p>

          {cities.length > 0 && <CarouselImg cities={cities} />}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  console.log("state", state);
  return {
    cities: state.cities.cities,
  };
};
const mapDispatchToProps = (dispatch) => ({
  fetchCitiesAction: (city) => dispatch(fetchCitiesAction(city)),
  googleAuth: (code) => dispatch(googleAuth(code)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Landing);
