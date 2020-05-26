import React, { Component } from "react";
import { connect } from "react-redux";
import { register } from "../store/actions/usersAction";
class Users extends Component {
  constructor() {
    super();
    this.state = {
      users: {
        name: "",
        email: "",
        password: "",
        picture: "",
      },
    };
  }

  handelChange = (e) => {
    console.log(e);
    this.setState({
      [e.target.id]: e.target.value,
    });
  };
  handelSubmit = (e) => {
    e.preventDefault();

    if (
      this.state.name === "" ||
      this.state.email === "" ||
      this.state.password === ""
    ) {
      alert("You should fill all the fields");
    } else {
      const newUser = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        picture: this.state.picture,
      };
      /////fetch from redux
      this.props.register(newUser);
    }
  };

  render() {
    return (
      <div className="container">
        <h5 className="card-title">Sign Up</h5>
        <form className="form-group" onSubmit={this.handelSubmit}>
          <div className="row block">
            <div className="col-md-4">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" onChange={this.handelChange} />
            </div>
            <div className="col-md-4">
              <label htmlFor="email">email</label>
              <input type="text" id="email" onChange={this.handelChange} />
            </div>
          </div>
          <div className="row block">
            <div className="col-md-4">
              <label htmlFor="password">password</label>
              <input
                type="password"
                id="password"
                onChange={this.handelChange}
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="picture">picture</label>
              <input type="picture" id="picture" onChange={this.handelChange} />
            </div>
          </div>
          <div className="col-md-4">
            <button>Sign Up</button>
          </div>
        </form>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    user: state.users,
  };
};
const mapDispatchToProps = (dispatch) => ({
  register: (newUser) => dispatch(register(newUser)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Users);
