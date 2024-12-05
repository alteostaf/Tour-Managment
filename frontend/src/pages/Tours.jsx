import React, { useState, useEffect } from "react";
import CommonSection from "../shared/CommonSection";
import "../styles/tour.css";
import TourCard from "./../shared/TourCard";
import SearchBar from "./../shared/SearchBar";
import { Container, Row, Col } from "reactstrap";

import useFetch from "../hooks/useFetch";
import { BASE_URL } from "../utils/config";

const Tours = () => {
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);

  const { data: tours, loading: toursLoading, error: toursError } = useFetch(`${BASE_URL}/tours?page=${page}`);
  const { data: tourCount, loading: countLoading, error: countError } = useFetch(`${BASE_URL}/tours/search/getTourCount`);

  useEffect(() => {
    if (tourCount) {
      const pages = Math.ceil(tourCount / 8);
      setPageCount(pages);
    }
    window.scrollTo(0, 0);
  }, [page, tourCount]);

  return (
    <>
    <section>
      <CommonSection title="All Tours" />
      </section>
      <section className="pt-0">
        <Container>
          {(toursLoading || countLoading) && <h4 className="text-center pt-5">Loading...</h4>}
          {(toursError || countError) && <h4 className="text-center pt-5">{toursError || countError}</h4>}
          {!toursLoading && !countLoading && !toursError && !countError && (
            <Row>
              {tours?.map((tour) => (
                <Col lg="3" md="6" sm="6" className="mb-4" key={tour._id}>
                  <TourCard tour={tour} />
                </Col>
              ))}
              <Col lg="12">
                <div className="pagination d-flex align-items-center justify-content-center mt-4 gap-3">
                  {[...Array(pageCount).keys()].map((number) => (
                    <span
                      key={number}
                      onClick={() => setPage(number)}
                      className={page === number ? "active__page" : ""}
                    >
                      {number + 1}
                    </span>
                  ))}
                </div>
              </Col>
            </Row>
          )}
        </Container>
      </section>

    </>
  );
};

export default Tours;
