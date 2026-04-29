import React from 'react'
import Home from './Home'
import Contact from "./Contact"
import About from './About';
import { Route, Routes } from "react-router-dom";
import Dashboard from '../components/Dashboard';
import BlogEditor from '../components/BlogModal';
import BlogView from './BlogView';

function Hero({ onLogout }) {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} ></Route>
        {/* <Route path="/about" element={<About/>} ></Route> */}
        <Route path="/contact" element={<Contact />} ></Route>
        <Route path="/about" element={<About />} ></Route>

        <Route path="/dashboard" element={<Dashboard onLogout={onLogout} />} ></Route>

        <Route path="*" element={<div>Page Not Found</div>} />


        <Route path="/dashboard/new-story" element={<BlogEditor mode="create" />} />

        <Route path="/dashboard/edit/:id" element={<BlogEditor mode="edit" />} />

        <Route path="/blog/:id" element={<BlogView />} />

      </Routes>
    </div>
  )
}

export default Hero


// how  i can secure my dashboard route
// i didn't want anyone to open dashboard without login, but i have a problem that my login form is not a route, it's modal