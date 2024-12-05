import React, { useState, useContext } from "react";
import { Form, FormGroup, ListGroup, Button, ListGroupItem, Spinner } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { BASE_URL } from "./../../utils/config";
import "./booking.css";

const Booking = ({ tour, avgRating }) => {
  const { price, reviews, title } = tour;
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [booking, setBooking] = useState({
    userId: user?._id,
    userEmail: user?.email,
    tourName: title,
    fullName: "",
    phone: "",
    guestSize: 1,
    bookAt: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { id, value } = e.target;
    setBooking((prev) => ({ ...prev, [id]: value }));
  };

  const serviceFee = 10;
  const totalAmount = Number(price) * Number(booking.guestSize) + Number(serviceFee);

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (!user) {
        setLoading(false);
        return alert("Please sign in");
      }

      const res = await fetch(`${BASE_URL}/booking/:tourId`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(booking),
      });

      if (!res.ok) {
        const result = await res.json();
        throw new Error(result.message || "Something went wrong");
      }

      navigate("/thank-you");
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  return (
    <div className="booking">
      <div className="booking__top d-flex align-items-center justify-content-between">
        <h3>
          ${price} <span>/per person</span>
        </h3>
        <span className="tour__rating d-flex align-items-center">
          <i className="ri-star-fill"></i>
          {avgRating === 0 ? null : avgRating} ({reviews?.length})
        </span>
      </div>

      <div className="booking__form">
        <Form className="booking__info-form" onSubmit={handleClick}>
          <FormGroup>
            <input
              type="text"
              placeholder="Full Name"
              id="fullName"
              value={booking.fullName}
              required
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <input
              type="tel"
              placeholder="Phone Number"
              id="phone"
              value={booking.phone}
              required
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup className="d-flex align-items-center gap-3">
            <input
              type="date"
              id="bookAt"
              value={booking.bookAt}
              required
              onChange={handleChange}
            />
            <input
              type="number"
              placeholder="Guest Size"
              id="guestSize"
              value={booking.guestSize}
              min="1"
              required
              onChange={handleChange}
            />
          </FormGroup>

          <div className="booking__bottom">
            <ListGroup>
              <ListGroupItem className="border-0 px-0">
                <h5 className="d-flex align-items-center gap-1">
                  ${price}
                  <i className="ri-close-line"></i> {booking.guestSize} Person(s)
                </h5>
                <span>${price * booking.guestSize}</span>
              </ListGroupItem>

              <ListGroupItem className="border-0 px-0">
                <h5>Service Charge</h5>
                <span>${serviceFee}</span>
              </ListGroupItem>

              <ListGroupItem className="border-0 px-0 total">
                <h5>Total</h5>
                <span>${totalAmount}</span>
              </ListGroupItem>
            </ListGroup>

            {error && <div className="error-message">{error}</div>}

            <Button className="btn primary__btn w-100 mt-4" type="submit" disabled={loading}>
              {loading ? <Spinner size="sm" /> : "Book Now"}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Booking;
