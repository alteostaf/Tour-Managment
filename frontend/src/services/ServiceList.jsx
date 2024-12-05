import React from 'react'
import ServiceCard from './ServiceCard'
import {Col} from "react-bootstrap"

import weatherImg from '../assets/images/weather.png'
import guideImg from '../assets/images/guide.png'
import costomizationImg from '../assets/images/customization.png'

const serviceData =[
  {
    imgUrl: weatherImg,
    title : "Calculate Weather",
    desc : "Accurate Weather Forecasts for Planning Your Perfect Outdoor Adventures.",
  },

  {
    imgUrl: guideImg,
    title: "Best Tour Guide",
    desc: "Expertly Curated Tours for an Unforgettable Travel Experience Every Time.",
  },

  {
    imgUrl: costomizationImg,
    title: "Customization",
    desc: "Personalized Travel Itineraries Tailored to Your Unique Preferences.",
  },
  {
    imgUrl: costomizationImg,
    title: "Adventure Planning",
    desc: "Thrilling Adventure Plans to Maximize Your Excitement and Fun."
  }
]

const ServiceList = () => {
  return (
    <>
      {serviceData.map((item, index) => (
        <Col lg="3" md="6" sm="12" className='mb-4' key={index}>
          <ServiceCard item={item} />
        </Col>
      ))}
    </>
  )
}

export default ServiceList