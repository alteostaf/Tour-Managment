// About.js

import React from 'react';
import "./../styles/about.css"
import galleryImages from './../components/image-gallery/galleryImages'
import Masonry ,{ResponsiveMasonry} from 'react-responsive-masonry'
import { Container,Row , Col } from 'reactstrap'
import Testimonials from './../components/Testimonial/Testimonials'

const About = () => {
  return (
    <>
    <section>
    <div className="about-page">
      <h1>About Us</h1>
      <p>Welcome to our travel company! We're passionate about creating unforgettable experiences for our customers.</p>
      <p>At TRAVEL", we believe that travel has the power to enrich lives and broaden horizons. That's why we're dedicated to curating exceptional journeys that cater to every traveler's desires.</p>
      <p>Our team of experienced travel experts combines their knowledge and expertise to craft tailor-made itineraries that showcase the best of each destination. Whether you're dreaming of relaxing on pristine beaches, exploring vibrant cities, or embarking on thrilling adventures, we're here to turn your travel dreams into reality.</p>
      <p>From luxurious accommodations to immersive cultural experiences, we handle every detail of your journey, ensuring a seamless and stress-free travel experience. With our commitment to excellence and personalized service, you can trust us to create memories that last a lifetime.</p>
      <p>Thank you for considering TRAVEL" for your next adventure. We look forward to welcoming you aboard and helping you discover the world in style!</p>
    </div>
    </section>
    <section>
      <Container>
        <Row>
          <Col sm="12" md="12" lg="12" xl="12">
            <h1>Gallery from our costumers</h1>
          </Col>
        </Row>
      </Container>
    <ResponsiveMasonry columnsCountBreakPoints={{350:1, 768:3, 992:4}}>
      <Masonry gutter='1rem'>
        {galleryImages.map((image, index) => (
          <img 
          className='masonry__img'
          src={image}
          key={index}
          alt=''
          style={{width: "100%", display: "block", borderRadius: "10px"}} />
        ))}
      </Masonry>
    </ResponsiveMasonry>
    </section>

      
    </>
  );
};

export default About;
