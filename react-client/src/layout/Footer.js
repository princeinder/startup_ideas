import React from "react";
import { Container } from "react-bootstrap";
import BottomNavigation from "../components/BottomNavigation";
const Footer = () => {
  return (
    <div className="footer mt-4">
      <Container>
        <BottomNavigation />
      </Container>
    </div>
  );
};

export default Footer;
