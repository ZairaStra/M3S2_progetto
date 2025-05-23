import { Col, Container, Form, Row } from "react-bootstrap";
import sun from "../assets/sun.svg";

const Homepage = () => {
  return (
    <Container fluid className="main">
      <Row className="justify-content-center my-5">
        <Col xs={12} sm={10} md={8}>
          <Row className="my-5 justify-content-between">
            <Col>
              <h1 className="display-1 ">Painting Weather</h1>
            </Col>
            <Col>
              <img src={sun} alt="sun" width="400rem" height="400rem" />
            </Col>
          </Row>

          <Form.Control
            className="mb-5 py-3"
            type="text"
            placeholder="Search by city"
            /*value={ searchQuery }
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowBooks(e.target.value.length > 0);
            }}*/
            aria-label="Search your book"
            aria-describedby="Search"
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Homepage;
