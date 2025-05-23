import { Col, Container, Row } from "react-bootstrap";

const Homepage = () => {
  return (
    <Container fluid>
      <Row className="justify-content-center">
        <Col xs={12} sm={10} md={8}>
          <h1 className="display-1">Painting Weather</h1>
        </Col>
      </Row>
    </Container>
  );
};

export default Homepage;
