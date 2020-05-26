import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { connect } from "react-redux";
import { addComments } from "../store/actions/itineraryActions";

class AddComments extends Component {
  state = {
    modal: false,
    comments: "",
  };
  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };
  onChange = (e) => {
    this.setState({
      comments: e.target.value,
    });
  };
  onSubmit = (name, id) => {
    if (this.props.user.email == null) {
      alert("you need tpo log in");
    } else {
      const email = this.props.user.email;
      const comments = this.state.comments;
      console.log("comments", comments);

      //////add comments
      this.props.addComments(comments, name, id, email);
      ///////////close modal
      this.toggle();
    }
  };

  render() {
    const itinerary = this.props.itinerary;
    return (
      <div>
        <>
          <Button
            variant="primary"
            color="primary"
            size="sm"
            onClick={this.toggle}
          >
            Add Comment
          </Button>

          <Modal isOpen={this.state.modal} toggle={this.toggle}>
            <ModalHeader toggle={this.toggle}>
              Add comment to the itinerary
            </ModalHeader>
            <ModalBody>
              <Form>
                <FormGroup>
                  <Label for="comments">Write your comment </Label>
                  <Input
                    type="text"
                    // name="comments"
                    id="comments"
                    onChange={this.onChange}
                  />
                  <Button
                    color="dark"
                    block
                    style={{ marginTop: "2rem" }}
                    onClick={() => this.onSubmit(itinerary.name, itinerary._id)}
                  >
                    Add Comments
                  </Button>
                </FormGroup>
              </Form>{" "}
            </ModalBody>
          </Modal>
        </>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    comments: state.itineraries.comments,
    itineraries: state.itineraries.itineraries,
    user: state.users,
  };
};
const mapDispatchToProps = (dispatch) => ({
  addComments: (comments, name, id, email) =>
    dispatch(addComments(comments, name, id, email)),
});
export default connect(mapStateToProps, mapDispatchToProps)(AddComments);
