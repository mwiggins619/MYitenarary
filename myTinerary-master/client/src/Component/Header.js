import React, { Component } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import { login } from "../store/actions/usersAction";
import { connect } from "react-redux";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Form,
  ButtonGroup,
} from "reactstrap";
import { Image } from "react-bootstrap";
// import Image from "react-bootstrap/Image";
class Header extends Component {
  constructor(props) {
    super();
    this.state = {
      isOpen: false,
      search: "",
      user: "",
    };
  }

  componentDidMount() {
    const userData = {
      user: this.state.user,
    };
    console.log(userData);
    this.props.login(userData);
  }
  render() {
    //toggle = () => this.setState({ isOpen: !isOpen });
    return (
      <div className="container-fluied">
        <Navbar className="colorNav" dark expand="sm">
          <Link to="/">
            <NavbarBrand>MyItenarary</NavbarBrand>
          </Link>
          <NavbarToggler
            onClick={() => this.setState({ isOpen: !this.state.isOpen })}
          />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem dark="true">
                <NavLink>
                  {" "}
                  <Link to="/Cities" id="RouterNavLink">
                    Cities We Offer
                  </Link>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/AddCity">
                  {/*                   
                  <Link to="/AddCity" id="RouterNavLink"> */}
                  New City
                  {/* </Link> */}
                </NavLink>
              </NavItem>
              {this.props.user.isLoggedin ? (
                <NavLink href="/LogOut">
                  {/* <Link href="/LogOut" id="RouterNavLink"> */} Log Out
                  {/* </Link> */}
                </NavLink>
              ) : (
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav as={ButtonGroup} caret>
                    Sign
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>
                      {" "}
                      <Link to="/Login">Login </Link>
                    </DropdownItem>
                    <DropdownItem>
                      <Link to="/Users">Sign Up </Link>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              )}
            </Nav>
            <Form inline>
              {/* <Button variant="outline-success "> */}
              {this.props.user.isLoggedin ? (
                <Link to="/UserAccount">
                  {/* <p> Hello {this.props.user.users}</p> */}
                  <Image
                    src={this.props.user.picture}
                    style={{ width: 50 }}
                    roundedCircle
                  />
                </Link>
              ) : (
                <Link to="/Login">Login</Link>
              )}
              {/* </Button> */}
            </Form>
          </Collapse>
        </Navbar>
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
  login: (userData) => dispatch(login(userData)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Header);
