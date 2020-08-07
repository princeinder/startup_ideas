import React from "react";
import { Container } from "react-bootstrap";
import TopNavigation from "../components/TopNavigation";

const Header = () => {
  return (
    <div className="header">
      <Container>
        <TopNavigation />
      </Container>
    </div>
  );
};

export default Header;
