// src/components/TourList.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, CardBody, CardTitle, CardText, Button } from 'reactstrap';
import { BASE_URL } from '../utils/config';

const TourList = () => {
  const [tours, setTours] = useState([]);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await fetch(`${BASE_URL}/tours`);
        const data = await response.json();
        setTours(data.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchTours();
  }, []);

  return (
    <Container>
      <Row>
        {tours.map((tour) => (
          <Col lg="4" key={tour._id}>
            <Card>
              <CardBody>
                <CardTitle>{tour.title}</CardTitle>
                <CardText>{tour.desc}</CardText>
                <Link to={`/tours/${tour._id}`}>View Details</Link>
                <Link to={`/update-tour/${tour._id}`}>
                  <Button color="warning">Edit</Button>
                </Link>
                <Link to={`/delete-tour/${tour._id}`}>
                  <Button color="danger">Delete</Button>
                </Link>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default TourList;
