import React from 'react'
import Slider from 'react-slick'
import avatar from '../../assets/images/avatar.jpg'

const Testimonials = () => {
  const settings= {
    dots: true,
    infinite: true,
    autoplay:true,
    speed: 1000,
    swipeToSlide:true,
    autoplaySpeed: 3000,
    slidesToShow: 3,

    responsive:[
      {
        breakpoint:992,
        settings: {
          slidesToShow: 3,
          slideToScroll:1,
          infinite:true,
          dots:true,
      },
    },
  {
    breakpoint:576,
    settings: {
      slidesToShow: 3,
      slideToScroll:1,
  },
},
    ]
  }

  return <Slider {...settings}>
      <div className="testimonial py-4 px-4">
          <p>"I've been a customer for years, and I'm always 
            impressed with the level of service I receive. The team goes above 
            and beyond to ensure my needs are met." 
          </p>
          <div className='d-flex align-item-center gap-4 mt-4'>
            <img src={avatar} className='w-25 h-25 rounded-2' alt="" />
            <div>
              <h6 className='mb-0 mt-3'> John D.</h6>
              <p>Customer</p>
            </div>
          </div>
      </div>

      <div className="testimonial py-4 px-4">
          <p>"I recently used their services for a trip, and
             I couldn't be happier. The attention to detail and personalized approach 
             made my experience unforgettable. 
          </p>
          <div className='d-flex align-item-center gap-4 mt-4'>
            <img src={avatar} className='w-25 h-25 rounded-2' alt="" />
            <div>
              <h6 className='mb-0 mt-3'> Sarah K.</h6>
              <p>Customer</p>
            </div>
          </div>
      </div>

      <div className="testimonial py-4 px-4">
          <p>"I've tried several tour guides in the past, but none compare to the expertise and professionalism of this company.
             They truly know how to create memorable experiences." 
          </p>
          <div className='d-flex align-item-center gap-4 mt-4'>
            <img src={avatar} className='w-25 h-25 rounded-2' alt="" />
            <div>
              <h6 className='mb-0 mt-3'> Michael L</h6>
              <p>Customer</p>
            </div>
          </div>
      </div>

      <div className="testimonial py-4 px-4">
          <p>"From start to finish, the entire process was seamless. 
            Booking was easy, and the tour itself exceeded my expectations.
             I can't wait to book my next adventure with them."
          </p>
          <div className='d-flex align-item-center gap-4 mt-4'>
            <img src={avatar} className='w-25 h-25 rounded-2' alt="" />
            <div>
              <h6 className='mb-0 mt-3'> Emily P.</h6>
              <p>Customer</p>
            </div>
          </div>
      </div>

      <div className="testimonial py-4 px-4">
          <p>"As a frequent traveler, I've come to rely on their 
            services time and time again. Whether it's a solo trip or a family vacation, 
            they always deliver exceptional service and value.
          </p>
          <div className='d-flex align-item-center gap-4 mt-4'>
            <img src={avatar} className='w-25 h-25 rounded-2' alt="" />
            <div>
              <h6 className='mb-0 mt-3'>David S.</h6>
              <p>Customer</p>
            </div>
          </div>
      </div>
    </Slider>
  
}

export default Testimonials