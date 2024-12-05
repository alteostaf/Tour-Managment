// src/components/CreateTour.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Label, FormGroup, Input, Button } from 'reactstrap';
import axios from 'axios';

const CreateTour = () => {
  const navigate = useNavigate();

  const [tour, setTour] = useState({
    title: '',
    city: '',
    address: '',
    distance: '',
    desc: '',
    price: '',
    maxGroupSize: '',
    featured: false,
    photo: null,
  });

  const [uploadedImage, setUploadedImage] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTour((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    setTour((prev) => ({ ...prev, photo: file }));
    setUploadedImage(URL.createObjectURL(file)); // Optional for showing preview
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(tour).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      const response = await axios.post("http://localhost:3000/createTour", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        console.log('Tour created successfully:', response.data);
        navigate('/tours'); // Navigate to the tours page after success
      } else {
        console.error('Failed to create tour:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Container>
      <Row>
        <Col lg="12" className="pt-5">
          <h2>Create Tour</h2>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Input
                type="text"
                name="title"
                placeholder="Title"
                value={tour.title}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="text"
                name="city"
                placeholder="City"
                value={tour.city}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="text"
                name="address"
                placeholder="Address"
                value={tour.address}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="number"
                name="distance"
                placeholder="Distance"
                value={tour.distance}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="file"
                name="photo"
                onChange={handlePhoto}
                required
              />
              {uploadedImage && (
                <img src={uploadedImage} alt="Uploaded Preview" style={{ marginTop: '10px', maxHeight: '150px' }} />
              )}
            </FormGroup>
            <FormGroup>
              <Input
                type="textarea"
                name="desc"
                placeholder="Description"
                value={tour.desc}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="number"
                name="price"
                placeholder="Price"
                value={tour.price}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="number"
                name="maxGroupSize"
                placeholder="Max Group Size"
                value={tour.maxGroupSize}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input
                  type="checkbox"
                  name="featured"
                  checked={tour.featured}
                  onChange={handleChange}
                />{' '}
                Featured
              </Label>
            </FormGroup>
            <Button type="submit" color="primary">Create Tour</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateTour;
