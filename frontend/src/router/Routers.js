import React from 'react'
import { Routes , Route , Navigate} from 'react-router-dom'
import Home from "./../pages/Home.jsx";
import Tours from "./../pages/Tours.jsx";
import TourDetails from '../pages/TourDetails.jsx';
import Login from "./../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import ThankYou from '../pages/ThankYou.jsx';
import SearchResultList from './../pages/SearchResultList.jsx';
import MasonryImageGallery from '../components/image-gallery/MasonryImageGallery.jsx';
import About from '../pages/About.jsx';
import CreateTour from '../CRUD/CreateTour';
import TourList from '../CRUD/TourList';
import UpdateTour from '../CRUD/UpdateTour';
import DeleteTour from '../CRUD/DeleteTour';


const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to='/home' />} />
      <Route path='/home' element={<Home/>} />
      <Route path='/tours' element={<Tours/>} />
      <Route path='/tours/:id' element={<TourDetails/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/register' element={<Register/>} />
      <Route path='/thank-you' element={<ThankYou />} />
      <Route path='/tours/search/getTourBySearch' element={<SearchResultList />} />
      <Route path='/gallery' element={<MasonryImageGallery />} />
      <Route path='/about' element={<About/>} />
      <Route path="/create-tour" element={<CreateTour />} />
      <Route path="/tou" element={<TourList />} />
      <Route path="/update-tour/:id" element={<UpdateTour />} />
      <Route path="/delete-tour/:id" element={<DeleteTour />} />

    </Routes>
  )
}

export default Routers