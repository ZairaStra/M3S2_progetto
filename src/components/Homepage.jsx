import sun from "../assets/sun.svg";
import { Alert, Col, Container, Form, Row } from "react-bootstrap";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const token = "508957485e6fafb121ac7fac28d453a9";

const Homepage = () => {
  const [city, setCity] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const search = async (e) => {
    e.preventDefault();
    if (!city.trim()) return;

    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city.trim()}&appid=${token}&units=metric`);
      if (!response.ok) {
        setError(true);
        setErrorMessage("Please try with another city");
        return;
      }
      const data = await response.json();
      setError(false);
      setErrorMessage("");
      navigate(`/details/${data.name}`);
    } catch {
      setError(true);
      setErrorMessage("Error loading data");
    }
  };

  return (
    <Container fluid className="main">
      <Row className="justify-content-center my-5">
        <Col xs={12} sm={10} md={8}>
          <Row className="my-5 justify-content-between">
            <Col xs={12} sm={6} md={7} lg={8}>
              <h1 className="display-1 ">Painting Weather</h1>
            </Col>
            <Col xs={12} sm={6} md={3} lg={4}>
              <img src={sun} alt="sun" width="100%" height="100%" />
            </Col>
          </Row>
          <Form onSubmit={search}>
            <Form.Control
              className="mb-5 py-3"
              type="text"
              placeholder="Search by city"
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
              }}
              aria-label="Search city"
              aria-describedby="Search"
            />
          </Form>
          {error && <Alert variant="danger">{errorMessage}</Alert>}
        </Col>
      </Row>
    </Container>
  );
};

export default Homepage;
