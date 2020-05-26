import React, { Component } from "react";
import { MDBContainer, MDBFooter } from "mdbreact";
export default class Footer extends Component {
  render() {
    return (
      <div>
        <MDBFooter className=" footer font-small">
          <div className="footer-copyright text-center py-3">
            <MDBContainer fluid>
              &copy; {new Date().getFullYear()} Copyright:{" "}
              <a href="https://www.mdbootstrap.com"> MyItinerary.com </a>
            </MDBContainer>
          </div>
        </MDBFooter>
      </div>
    );
  }
}
