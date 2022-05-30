import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';
import Home from './pages';
import About from './pages/about';
import Blogs from './pages/blogs';
import SignUp from './pages/signup';
import Contact from './pages/contact';
import NotFound from './pages/404'
import Login from './components/Login';
import Products from './pages/products';

function App(){
    return (
        <Router>
        <Navbar />
        <Routes>
            <Route exact path='/' element={<Home />} />
            <Route path='/about' element={<About/>} />
            <Route path='/contact' element={<Contact/>} />
            <Route path='/blogs' element={<Blogs/>} />
            <Route path='/sign-up' element={<SignUp/>} />
            <Route path='/login' element={<Login/>}/>
            <Route path='/api/products' element={<Products/>}/>
            <Route path='*' element={<NotFound />} />
        </Routes>
        </Router>
    );
  }

  
export default App;