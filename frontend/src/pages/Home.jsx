import React from "react";
import "../styles/home.css";
import { Container, Row, Col } from "react-bootstrap";
import FeaturedTourList from "../components/Featured-tour/FeaturedTourList";

const Home = () => {
  return (
    <>
      <section>
        <Container>
          <Row>
            <Col lg="6">
              <div className="hero__content">
               
                <h1>
                  Travel unlocks the gateway to unforgettable.
                  
                </h1>
                <p>
                  "Travel with us and enjoy competitive rates, easy booking, and exceptional service. Start your journey today and experience the freedom of the explore tje word."
                </p>
              </div>
            </Col>
          
          </Row>
        </Container>
      </section>



      <section>
        <Container>
          <Row>
            <FeaturedTourList />
          </Row>
        </Container>
      </section>

      <section>
        <Container>
          <Row>
            <Col lg="6">
              <div className="experience__content">

                <h2>
                  With our experience <br /> we will serve you
                </h2>
                <p>
                  "Drawing on our extensive expertise, we are dedicated to providing exceptional service and tailored solutions that meet and exceed your unique needs and expectations.
                  <br />
                  With years of industry experience, our team is committed to delivering superior service and personalized solutions designed to cater to your specific requirements.
                </p>
              </div>


            </Col>
          </Row>
        </Container>
      </section>


    </>
  );
};

export default Home;
