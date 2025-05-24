import sun from "../assets/sun.svg";
import { Alert, Col, Container, Form, Row, Card } from "react-bootstrap";

import { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const token = "508957485e6fafb121ac7fac28d453a9";

//API per lat/lon ricavate dal nome di città ricevito dal form

const Homepage = () => {
  const [city, setCity] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const [searches, setSearches] = useState([]);

  useEffect(() => {
    const searches = JSON.parse(localStorage.getItem("searches")) || [];
    setSearches(searches);
  }, []);

  const search = async (e) => {
    e.preventDefault();
    if (!city.trim()) return;

    try {
      const firstResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city.trim()}&appid=${token}`);
      if (!firstResponse.ok) {
        setError(true);
        setErrorMessage("City not found- please try with another city");
        return;
      }
      const cityData = await firstResponse.json();
      const { lat, lon } = cityData.coord;

      const secondResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${token}&units=metric`);
      if (!secondResponse.ok) {
        setError(true);
        setErrorMessage("Error loading data");
        return;
      }
      const weatherData = await secondResponse.json();
      navigate(`/details/${weatherData.name}`);
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
          {error && (
            <Alert variant="danger" dismissible>
              {errorMessage}
            </Alert>
          )}
        </Col>
      </Row>
      {searches.length > 0 && (
        <>
          <h2>Recent Searches</h2>
          <Row>
            {searches.map(({ city, icon, description, id }) => (
              <Col key={id || city} xs={12} md={4} lg={3} className="mb-4">
                <Card className="bars-style">
                  <Link to={`/details/${city}`}>
                    <Card.Body className="d-flex justify-content-between align-items-center">
                      <Card.Title>{city}</Card.Title>
                      <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt={description} style={{ width: "50px" }} />
                    </Card.Body>
                  </Link>
                </Card>
              </Col>
            ))}
          </Row>
        </>
      )}
    </Container>
  );
};

//API per nome di città ricevuto dal form
/* 
const Homepage = () => {

  const [city, setCity] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [searches, setSearches] = useState([]);

   useEffect(() => {
    const storedSearches = JSON.parse(localStorage.getItem("searches")) || [];
    setSearches(storedSearches);
  }, []);
 
  const search = async (e) => {
    e.preventDefault();
    if (!city.trim()) return;

    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city.trim()}&appid=${token}&units=metric`);
      if (!response.ok) {
        setError(true);
        setErrorMessage("City not found- please try with another city");
        return;
      }
      const data = await response.json();
      setError(false);
      setErrorMessage("");
      const searches = JSON.parse(localStorage.getItem("searches")) || [];
      const exists = searches.some(s => s.id === data.id);
      if (!exists) {
        const newSearch = {
          id: data.id,
          city: data.name,
          icon: data.weather[0].icon,
          description: data.weather[0].description,
        };
        const updatedSearches = [...searches, newSearch];
        localStorage.setItem("searches", JSON.stringify(updatedSearches));
        setSearches(updatedSearches);
      }
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
          {error && <Alert variant="danger" dismissible>{errorMessage}</Alert>}
        </Col>
      </Row>
     {searches.length > 0 && (
      <>
        <h2>Recent Searches</h2>
        <Row>
          {searches.map(({ city, icon, description, id }) => (
            <Col key={id} xs={12} md={4} lg={3} className="mb-4">
              <Card className="bars-style">
                <Link to={`/details/${city}`}>
                    <Card.Body className="d-flex justify-content-between align-items-center">
                      <Card.Title>{city}</Card.Title>
                      <img
                        src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                        alt={description}
                        style={{ width: "50px" }}
                      />
                    </Card.Body>
                  </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </>
    )}
    </Container>
  );
};
*/
export default Homepage;
