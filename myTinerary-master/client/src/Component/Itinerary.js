import React, { Component } from "react";
import { connect } from "react-redux";
import AddComments from "../Component/AddComments";
import { fetchItinerariesByCityName } from "../store/actions/itineraryActions";
import {
  fetchItinerariesFavorite,
  fetchItinerariesDeleteFavorite,
  fetchDeleteComment,
} from "../store/actions/itineraryActions";
import AddItinerary from "./AddItinerary";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { Button, Card, Accordion, Container, Row, Col } from "react-bootstrap";

const green = "#ffff00";
const red = "#FF0000";
class Itinerary extends Component {
  constructor() {
    super();
    this.state = {
      itineraries: [],
      favorites: [],
      favColor: green,
      comments: [],
    };
  }
  componentDidMount() {
    const city = this.props.match.params.city;

    this.props.fetchItinerariesByCityName(city);
  }
  handelChange = (e) => {
    const newColor = this.state.favColor === green ? red : green;
    this.setState({ favColor: newColor });
  };
  handelFavorite = (id, name) => {
    if (this.props.user.email == null) {
      alert("you need to log in");
    } else {
      const emailAdded = this.props.user.email;

      this.props.fetchItinerariesFavorite(emailAdded, id, name);
    }
  };
  handelDeleteFavorite = (id, name) => {
    if (this.props.user.email == null) {
      alert("you need to log in");
    } else {
      const emailAdded = this.props.user.email;
      console.log("emailAdded", emailAdded);
      this.props.fetchItinerariesDeleteFavorite(emailAdded, id, name);
    }
  };
  handelDeleteComment = (name, id, comments) => {
    // const email = this.props.user.email;
    // const msg = this.state.comments.msg;

    this.props.fetchDeleteComment(comments, name, id);
  };
  filter() {
    if (this.props.itineraries) {
      const filterItinerary = this.props.itineraries.filter(
        (itinerary, index) => {
          return itinerary.profile;
        }
      );
      return filterItinerary;
    } else {
      return [];
    }
  }
  render() {
    const filterList = this.filter();
    const email = this.props.user.email;

    return (
      <div className="container">
        <div className="textSize display-2">
          <h3>Our Itineraries</h3>
        </div>

        {filterList &&
          filterList.map((itinerary, index) => (
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
                      ? this.handelDeleteFavorite(itinerary._id, itinerary.name)
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
                <Accordion defaultActiveKey="0">
                  {/* <Card.Header className="textColor"> */}
                  <Accordion.Toggle
                    as={Button}
                    variant="outline-info"
                    size="sm"
                    eventKey="0"
                    aria-controls="example-fade-text"
                  >
                    What Other Said
                  </Accordion.Toggle>
                  {/* </Card.Header> */}
                  <Accordion.Collapse eventKey="0">
                    <React.Fragment>
                      {itinerary.comments &&
                        itinerary.comments.map((comment, index) => {
                          return (
                            <div key={index}>
                              <Container>
                                <Row>
                                  <Col>
                                    {/* <Card style={{ width: "18rem" }}> */}

                                    <Card.Body>
                                      <Card.Text className="textColor">
                                        {comment.msg}
                                      </Card.Text>
                                      <footer className="blockquote-footer">
                                        <cite title="Source Title">
                                          Written by
                                        </cite>{" "}
                                        {comment.email}{" "}
                                      </footer>
                                      <Button
                                        variant="outline-danger"
                                        size="sm"
                                        aria-controls="example-fade-text"
                                        onClick={() =>
                                          comment.email &&
                                          comment.email.includes(email)
                                            ? this.handelDeleteComment(
                                                itinerary.name,
                                                itinerary._id,
                                                itinerary.comments
                                              )
                                            : alert("its not your comment")
                                        }
                                      >
                                        Delete Comment
                                      </Button>
                                    </Card.Body>
                                  </Col>
                                </Row>
                              </Container>
                            </div>
                          );
                        })}
                    </React.Fragment>
                  </Accordion.Collapse>
                </Accordion>
                <div className="row justify-content-center">
                  {/* <FontAwesomeIcon
                    icon={faHeart}
                    size="3x"
                    style={
                      itinerary.favorites.includes(email)
                        ? { color: "red" }
                        : { color: "green" }
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
                  /> */}

                  <AddComments itinerary={itinerary} />
                </div>
              </div>
            </div>
          ))}
        <React.Fragment>
          <AddItinerary />
        </React.Fragment>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    itineraries: state.itineraries.itineraries,
    user: state.users,
    comments: state.itineraries.comments,
  };
};
const mapDispatchToProps = (dispatch) => ({
  fetchItinerariesByCityName: (city) =>
    dispatch(fetchItinerariesByCityName(city)),

  fetchItinerariesFavorite: (emailAdded, id, name) =>
    dispatch(fetchItinerariesFavorite(emailAdded, id, name)),
  fetchItinerariesDeleteFavorite: (emailAdded, id, name) =>
    dispatch(fetchItinerariesDeleteFavorite(emailAdded, id, name)),
  fetchDeleteComment: (comments, name, id) =>
    dispatch(fetchDeleteComment(comments, name, id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Itinerary);
