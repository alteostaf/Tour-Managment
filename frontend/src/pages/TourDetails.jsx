import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/tour-details.css";
import { Container, Row, Col, Form, ListGroup } from "reactstrap";
import useFetch from "../hooks/useFetch.js";
import calculateAvgRating from "../utils/avgRating.js";

import avatar from "../assets/images/avatar.jpg";
import Booking from "../components/Booking/Booking.jsx";
import { BASE_URL } from "../utils/config.js";
import { AuthContext } from "./../context/AuthContext.js";


const TourDetails = () => {
  const { id } = useParams();

  const reviewMsgRef = useRef("");
  const [tourRating, setTourRating] = useState(null);
  const { user } = useContext(AuthContext);

  const { data: tour, loading, error } = useFetch(`${BASE_URL}/tours/${id}`);

  const {
    photo,
    title,
    desc,
    price,
    address,
    reviews = [],
    city,
    distance,
    maxGroupSize,
  } = tour || {} ;

  const { totalRating, avgRating } = calculateAvgRating(reviews);

  const options = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const reviewText = reviewMsgRef.current.value;

    try {
      if (!user || user === undefined || user === null) {
        alert('Please sign in');
        return;
      }

      if (!tourRating || tourRating < 1 || tourRating > 5) {
        alert('Please select a valid rating between 1 and 5');
        return;
      }

      const reviewObj = {
        username: user?.username,
        reviewText,
        rating: tourRating,
      };

      const res = await fetch(`${BASE_URL}/review/${id}`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(reviewObj),
      });

      const result = await res.json();
      if (!res.ok) {
        return alert(result.message);
      }

      // Refresh the page upon successful review submission
      window.location.reload();
    } catch (err) {
      alert(err.message);
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [tour]);

  return (
    <section>
      <Container>
        {loading && <h4 className="text-center pt-5">Loading....</h4>}
        {error && <h4 className="text-center pt-5">{error}</h4>}
        {!loading && !error && (
          <Row>
            <Col lg="8">
              <div className="tour__content">
                <img src={photo} alt={title} />

                <div className="tour__info">
                  <h2>{title}</h2>

                  <div className="d-flex align-items-center gap-5">
                    <span className="tour__rating d-flex align-items-center gap-1">
                      <i
                        className="ri-star-fill"
                        style={{ color: "var(--secondary-color)" }}
                      ></i>
                      {avgRating === 0 ? null : avgRating}
                      {totalRating === 0 ? (
                        " Not rated"
                      ) : (
                        <span>({reviews.length})</span>
                      )}
                    </span>

                    <span>
                      <i className="ri-map-pin-fill"></i> {address}
                    </span>
                  </div>

                  <div className="tour__extra-details">
                    <span>
                      <i className="ri-map-pin-2-line"></i>
                      {city}
                    </span>
                    <span>
                      <i className="ri-money-dollar-circle-line"></i>${price} /Per
                      Person
                    </span>
                    <span>
                      <i className="ri-map-pin-time-line"></i>
                      {distance} k/m
                    </span>
                    <span>
                      <i className="ri-group-line"></i>
                      {maxGroupSize}
                    </span>
                  </div>
                  <h5>Description</h5>
                  <p>{desc}</p>
                </div>

                <div className="tour__reviews mt-4">
                  <h4>Reviews ({reviews?.length} reviews)</h4>
                  <Form onSubmit={submitHandler}>
                    <div className="d-flex align-items-center gap-3 mb-4 rating__group">
                      <span onClick={() => setTourRating(1)}>
                        1<i className="ri-star-s-fill"></i>
                      </span>
                      <span onClick={() => setTourRating(2)}>
                        2<i className="ri-star-s-fill"></i>
                      </span>
                      <span onClick={() => setTourRating(3)}>
                        3<i className="ri-star-s-fill"></i>
                      </span>
                      <span onClick={() => setTourRating(4)}>
                        4<i className="ri-star-s-fill"></i>
                      </span>
                      <span onClick={() => setTourRating(5)}>
                        5<i className="ri-star-s-fill"></i>
                      </span>
                    </div>

                    <div className="review__input">
                      <input
                        type="text"
                        ref={reviewMsgRef}
                        placeholder="Share your experience"
                        required
                      />
                      <button className="btn primary__btn text-white">
                        Submit
                      </button>
                    </div>
                  </Form>
                  <ListGroup className="user__reviews">
                    {reviews.map((review, index) => (
                      <div className="review__item" key={index}>
                        <img src={avatar} alt="" />

                        <div className="w-100">
                          <div className="d-flex align-items-center justify-content-between">
                            <div>
                              <h5>{review.username}</h5>
                              <p>
                            
                                 { new Date(review.createdAt).toLocaleDateString(
                                    "en-US",
                                    options
                                  )
                                }
                              </p>
                            </div>
                            <span className="d-flex align-items-center">
                              {review.rating}
                              <i className="ri-star-s-fill"></i>
                            </span>
                          </div>
                          <h6>{review.reviewText || review.comment}</h6>
                        </div>
                      </div>
                    ))}
                  </ListGroup>
                </div>
              </div>
            </Col>
            <Col lg="4">
              <Booking tour={tour} avgRating={avgRating} />
            </Col>
          </Row>
        )}
      </Container>
    </section>
  );
};

export default TourDetails;
