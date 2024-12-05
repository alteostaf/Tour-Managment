// src/components/DeleteTour.js
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Row, Col, Button } from 'reactstrap';
import { BASE_URL } from '../utils/config';

const DeleteTour = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const response = await fetch(`${BASE_URL}/tours/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        navigate('/tours');
      } else {
        console.error('Failed to delete tour');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Container>
      <Row>
        <Col lg="12" className="pt-5">
          <h2>Are you sure you want to delete this tour?</h2>
          <Button color="danger" onClick={handleDelete}>Yes, delete it</Button>
          <Button color="secondary" onClick={() => navigate('/tours')}>No, go back</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default DeleteTour;
