import { useParams } from "react-router-dom";
import { Alert, Card, Col, Container, ListGroup, Row, Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const token = "508957485e6fafb121ac7fac28d453a9";

//API per lat/lon ricavate dal nome di città ricevito dal form in Homepage

const Details = () => {
  const { cityName } = useParams();
  const navigate = useNavigate();
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [nextDays, setNextDays] = useState(null);
  const [loadingNextDays, setLoadingNextDays] = useState(false);
  const [nextDaysError, setNextDaysError] = useState(false);
  const [nextDaysErrorMessage, setNextDaysErrorMessage] = useState("");

  useEffect(() => {
    const fetchTodayWeather = async () => {
      try {
        const cityResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${token}`);
        if (!cityResponse.ok) {
          setError(true);
          setErrorMessage("City not found - please try with another city");
          return;
        }
        const cityData = await cityResponse.json();
        const { lat, lon } = cityData.coord;

        const weatherToday = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${token}&units=metric`);
        if (!weatherToday.ok) {
          setError(true);
          setErrorMessage("Errore loading data");
          return;
        }
        const weatherData = await weatherToday.json();
        setWeather(weatherData);
        setError(false);
        setErrorMessage("");
      } catch {
        setError(true);
        setErrorMessage("Error loading data");
      } finally {
        setLoading(false);
      }
    };

    fetchTodayWeather();
  }, [cityName]);

  useEffect(() => {
    if (!weather || !weather.coord) return;

    const fetchNextDaysWeather = async () => {
      setLoadingNextDays(true);
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${weather.coord.lat}&lon=${weather.coord.lon}&appid=${token}&units=metric`
        );
        if (!response.ok) {
          setNextDaysError(true);
          setNextDaysErrorMessage("Error loading next days' data");
          setNextDays(null);
          return;
        }

        const data = await response.json();
        setNextDays(data);
        setNextDaysError(false);
        setNextDaysErrorMessage("");
      } catch {
        setNextDaysError(true);
        setNextDaysErrorMessage("Error loading next days' data");
        setNextDays(null);
      } finally {
        setLoadingNextDays(false);
      }
    };

    fetchNextDaysWeather();
  }, [weather]);

  const formatTime = (timeInSeconds) => {
    return new Date(timeInSeconds * 1000).toLocaleTimeString("it-IT", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Container fluid className="main py-5 main">
      {loading && (
        <Row>
          <Col xs="auto">
            <Spinner animation="grow" variant="secondary" />
          </Col>
        </Row>
      )}

      {error && !loading && (
        <Row>
          <Col xs={12} md={8}>
            <Alert variant="danger" dismissible onClose={() => navigate("/")}>
              {errorMessage}
            </Alert>
          </Col>
        </Row>
      )}

      {nextDaysError && !loading && (
        <Row>
          <Col xs={12} md={8}>
            <Alert variant="warning" dismissible onClose={() => setNextDaysError(false)}>
              {nextDaysErrorMessage}
            </Alert>
          </Col>
        </Row>
      )}

      {!loading && !error && weather && (
        <>
          <Row className="justify-content-center mb-3">
            <Col>
              <h2 className="text-center py-3">Today's Weather for {cityName}</h2>
              <Row className="justify-content-center">
                <Col xs={12} md={8}>
                  <Card className="shadow-sm bars-style">
                    <Card.Body>
                      <Card.Title className="display-5 d-flex align-items-center justify-content-center gap-3">
                        {weather.weather[0].main} – {weather.weather[0].description}
                        <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weather icon" style={{ width: "80px" }} />
                      </Card.Title>
                      <Card.Subtitle className="mb-3 text-muted d-flex justify-content-between">
                        <p>
                          {weather.name}, {weather.sys.country}
                        </p>
                        <p>
                          {weather.coord.lat}, {weather.coord.lon}
                        </p>
                      </Card.Subtitle>
                      <Row xs={1} sm={2} md={3} lg={4} className="my-3 gy-3">
                        <Col>
                          <p>
                            <strong>Temperature:</strong> {weather.main.temp}°C
                          </p>
                        </Col>
                        <Col>
                          <p>
                            <strong>Feels Like:</strong> {weather.main.feels_like}°C
                          </p>
                        </Col>
                        <Col>
                          <p>
                            <strong>Min/Max:</strong> {weather.main.temp_min}° / {weather.main.temp_max}°C
                          </p>
                        </Col>
                        <Col>
                          <p>
                            <strong>Humidity:</strong> {weather.main.humidity}%
                          </p>
                        </Col>
                        <Col>
                          <p>
                            <strong>Pressure:</strong> {weather.main.pressure} hPa
                          </p>
                        </Col>
                        <Col>
                          <p>
                            <strong>Clouds:</strong> {weather.clouds.all}%
                          </p>
                        </Col>
                        <Col>
                          <p>
                            <strong>Sunrise:</strong> {formatTime(weather.sys.sunrise)}
                          </p>
                        </Col>
                        <Col>
                          <p>
                            <strong>Sunset:</strong> {formatTime(weather.sys.sunset)}
                          </p>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>

          {loadingNextDays && (
            <Row>
              <Col xs="auto">
                <Spinner animation="grow" variant="secondary" />
              </Col>
            </Row>
          )}

          {/*  funziona, ma ottengo un list-item per ora
          {!nextDaysError && nextDays && (
            <>
              <h2 className="text-center py-3">Next days Weather for {cityName}</h2>
              <ListGroup className="mt-4">
                {nextDays.list.map((item) => (
                  <ListGroup.Item key={item.dt} className=" d-flex justify-content-between bars-style">
                    <p>
                      <strong>
                        {new Date(item.dt * 1000).toLocaleString("it-IT", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </strong>{" "}
                      -{item.main.temp}°C - {item.weather[0].description}
                    </p>
                    <img src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} alt={item.weather[0].description} style={{ width: "50px" }} />
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </>
          )} */}
          {/* {!nextDaysError && nextDays && (
            <>
              <h2 className="text-center py-3">Next Days Weather for {cityName}</h2>
              <Row className="gy-3 mt-4">
                {[
                  ...new Map(
                    nextDays.list.map((item) => {
                      const date = new Date(item.dt * 1000);
                      const day = date.toLocaleDateString("it-IT");
                      return [day, { ...item, day }];
                    })
                  ).values(),
                ].map((item) => (
                  <Col key={item.dt} xs={12} sm={6} xl={2}>
                    <Card className="bars-style text-center">
                      <Card.Body>
                        <Card.Title>{item.day}</Card.Title>
                        <Card.Text>
                          <strong>{item.main.temp}°C</strong>
                          <br />
                          {item.weather[0].description}
                        </Card.Text>
                        <img
                          src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                          alt={item.weather[0].description}
                          style={{ width: "60px" }}
                        />
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </>
          )} */}

          {!loadingNextDays && !nextDaysError && nextDays && (
            <>
              <h2 className="text-center py-3">Next Days Weather for {cityName}</h2>
              <Row className="justify-content-center">
                <Col xs={12} md={8}>
                  <ListGroup className="mt-4">
                    {[
                      ...new Map(
                        nextDays.list.map((item) => {
                          const date = new Date(item.dt * 1000);
                          const day = date.toLocaleDateString("it-IT");
                          return [day, { ...item, day }];
                        })
                      ).values(),
                    ].map((item) => (
                      <ListGroup.Item key={item.dt} className="bars-style">
                        <Row className="justify-content-between">
                          <Col>
                            <p>
                              <strong>{item.day}</strong>
                            </p>
                          </Col>
                          <Col>
                            <p>{item.main.temp}°C</p>
                          </Col>
                          <Col>
                            <p>{item.weather[0].description}</p>
                          </Col>
                          <Col className="text-end">
                            <img
                              src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                              alt={item.weather[0].description}
                              style={{ width: "50px" }}
                            />
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Col>
              </Row>
            </>
          )}
        </>
      )}
    </Container>
  );
};

//API per nome di città ricevuto dal form in Homepage - non finita come quella per lat/long

/* const Details = () => {
  const { cityName } = useParams();
  const navigate = useNavigate();
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${token}&units=metric`);
        if (!response.ok) {
          setError(true);
          setErrorMessage("City not found - please try with another city");
          return;
        }
        const data = await response.json();
        setWeather(data);

      const searches = JSON.parse(localStorage.getItem("searches")) || [];
      if (!searches.includes(cityName)) {
        searches.push(cityName);
        localStorage.setItem("searches", JSON.stringify(searches));
      }

        setError(false);
        setErrorMessage("");
      } catch {
        setError(true);
        setErrorMessage("Error loading data");
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [cityName]);

  const formatTime = (timeInSeconds) => {
    return new Date(timeInSeconds * 1000).toLocaleTimeString("it-IT", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

 return (
    <Container fluid className="main py-5">
      {loading && (
        <Row>
          <Col xs="auto">
            <Spinner animation="grow" variant="secondary" />
          </Col>
        </Row>
      )}

      {error && !loading && (
        <Row>
          <Col xs={12} md={8}>
            <Alert variant="danger" dismissible onClose={() => navigate("/")}>
              {errorMessage}
            </Alert>
          </Col>
        </Row>
      )}

      {!loading && !error && weather && (
        <Row className="justify-content-center">
          <Col>
            <h2 className="text-center py-3">Today's Weather for {cityName}</h2>
            <Row className="justify-content-center">
              <Col xs={12} md={8}>
                <Card className="shadow-sm bars-style">
                  <Card.Body>
                    <Card.Title className="display-5 d-flex align-items-center justify-content-center gap-3">
                      {weather.weather[0].main} – {weather.weather[0].description}
                      <img
                        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                        alt="weather icon"
                        style={{ width: "80px" }}
                      />
                    </Card.Title>
                    <Card.Subtitle className="mb-3 text-muted d-flex justify-content-between">
                      <p>
                        {weather.name}, {weather.sys.country}
                      </p>
                      <p>
                        {weather.coord.lat}, {weather.coord.lon}
                      </p>
                    </Card.Subtitle>
                    <Row xs={1} sm={2} md={3} lg={4} className="my-3 gy-3">
                      <Col>
                        <p>
                          <strong>Temperature:</strong> {weather.main.temp}°C
                        </p>
                      </Col>
                      <Col>
                        <p>
                          <strong>Feels Like:</strong> {weather.main.feels_like}°C
                        </p>
                      </Col>
                      <Col>
                        <p>
                          <strong>Min/Max:</strong> {weather.main.temp_min}° / {weather.main.temp_max}°C
                        </p>
                      </Col>
                      <Col>
                        <p>
                          <strong>Humidity:</strong> {weather.main.humidity}%
                        </p>
                      </Col>
                      <Col>
                        <p>
                          <strong>Pressure:</strong> {weather.main.pressure} hPa
                        </p>
                      </Col>
                      <Col>
                        <p>
                          <strong>Clouds:</strong> {weather.clouds.all}%
                        </p>
                      </Col>
                      <Col>
                        <p>
                          <strong>Sunrise:</strong> {formatTime(weather.sys.sunrise)}
                        </p>
                      </Col>
                      <Col>
                        <p>
                          <strong>Sunset:</strong> {formatTime(weather.sys.sunset)}
                        </p>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      )}
    </Container>
  );
}; */

export default Details;
