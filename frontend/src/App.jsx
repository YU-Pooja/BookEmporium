import React from 'react'
import Home from "./pages/Home"
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import {BrowserRouter,Routes,Route} from "react-router-dom";
import AllBooks from './pages/AllBooks';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import Cart from './pages/Cart';
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />}/>
          <Route path="/all-books" element={<AllBooks />}/>
          <Route path="/cart" element={<Cart />}/>
          <Route path="/profile" element={<Profile />}/>
          <Route path="/SignUp" element={<SignUp />}/>
          <Route path="/LogIn" element={<LogIn />}/>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App