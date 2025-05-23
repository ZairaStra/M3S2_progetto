import { Col, Container, Row } from "react-bootstrap";

const WeatherFooter = () => {
  return (
    <footer className="mt-2 py-3 footer bars-style">
      <Container fluid>
        <Row className="justify-content-center mt-5">
          <Col xs={12} md={6}>
            <Row xs={1} sm={2} md={6} className="justify-content-evenly">
              <Col>
                <p className="footer-links">
                  <a href="#" alt="footer link">
                    Subscribe
                  </a>
                </p>

                <p className="footer-links">
                  <a href="#" alt="footer link">
                    Privacy
                  </a>
                </p>
              </Col>
              <Col>
                <p className="footer-links">
                  <a href="#" alt="footer link">
                    Work whith us
                  </a>
                </p>

                <p className="footer-links">
                  <a href="#" alt="footer link">
                    Contact us
                  </a>
                </p>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default WeatherFooter;
