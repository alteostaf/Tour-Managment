import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Row, Col, Form, Label, FormGroup, Input, Button } from 'reactstrap';
import { BASE_URL } from '../utils/config';

const Update = () => {
  const { id } = useParams();
  const [tour, setTour] = useState({
    title: '',
    city: '',
    address: '',
    distance: '',
    desc: '',
    price: '',
    maxGroupSize: '',
    featured: false
  });
  const [photo, setPhoto] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const response = await fetch(`${BASE_URL}/tours/${id}`);
        const data = await response.json();
        setTour(data.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchTour();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTour({
      ...tour,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', tour.title);
    formData.append('city', tour.city);
    formData.append('address', tour.address);
    formData.append('distance', tour.distance);
    formData.append('photo', photo);
    formData.append('desc', tour.desc);
    formData.append('price', tour.price);
    formData.append('maxGroupSize', tour.maxGroupSize);
    formData.append('featured', tour.featured);

    try {
      const response = await fetch(`${BASE_URL}/tours/${id}`, {
        method: 'PUT',
        body: formData
      });

      if (response.ok) {
        navigate('/tours');
      } else {
        console.error('Failed to update tour');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Container>
      <Row>
        <Col lg="12" className="pt-5">
          <h2>Edit Tour</h2>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Input type="text" name="title" placeholder="Title" value={tour.title} onChange={handleChange} required />
            </FormGroup>
            <FormGroup>
              <Input type="text" name="city" placeholder="City" value={tour.city} onChange={handleChange} required />
            </FormGroup>
            <FormGroup>
              <Input type="text" name="address" placeholder="Address" value={tour.address} onChange={handleChange} required />
            </FormGroup>
            <FormGroup>
              <Input type="number" name="distance" placeholder="Distance" value={tour.distance} onChange={handleChange} required />
            </FormGroup>
            <FormGroup>
              <Label for="photo">Photo</Label>
              <Input type="file" name="photo" onChange={handleFileChange} />
            </FormGroup>
            <FormGroup>
              <Input type="textarea" name="desc" placeholder="Description" value={tour.desc} onChange={handleChange} required />
            </FormGroup>
            <FormGroup>
              <Input type="number" name="price" placeholder="Price" value={tour.price} onChange={handleChange} required />
            </FormGroup>
            <FormGroup>
              <Input type="number" name="maxGroupSize" placeholder="Max Group Size" value={tour.maxGroupSize} onChange={handleChange} required />
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input type="checkbox" name="featured" checked={tour.featured} onChange={handleChange} />{' '}
                Featured
              </Label>
            </FormGroup>
            <Button type="submit" color="primary">Update Tour</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
export default Update;
