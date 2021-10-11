import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import styles from "../styles/footer.module.css";

const Footer = () => {
  return (
    <MDBFooter
      color="blue"
      className="font-small pt-4 mt-4 "
      // eslint-disable-next-line react/jsx-no-duplicate-props
      className={styles.con}
    >
      <MDBContainer fluid className="text-center text-md-left">
        <MDBRow>
          <MDBCol md="6">
            <h5 className="title">SIPHALA education services</h5>
            <p className={styles.f1}>
              All our services require register first.
              <br /> Need help ...?
              <br /> <b>Grab your class now</b>
            </p>
          </MDBCol>
          <MDBCol md="6">
            <h5 className="title">Contact Now </h5>
            <ul>
              <li className="list-unstyled">+94-114-555 444</li>
              <li className="list-unstyled">info@siphala.lk</li>
              <li className="list-unstyled"></li>
              <li className="list-unstyled"></li>
            </ul>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright: SIPHALA
        </MDBContainer>
      </div>
    </MDBFooter>
  );
};

export default Footer;
