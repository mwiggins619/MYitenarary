import React, { Component } from "react";
import { logUserOut } from "../store/actions/usersAction";
import { connect } from "react-redux";
class LogOut extends Component {
  componentDidMount() {
    this.props.logUserOut();
  }
  render() {
    return <div></div>;
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.users,
  };
};
const mapDispatchToProps = (dispatch) => ({
  logUserOut: () => dispatch(logUserOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LogOut);
