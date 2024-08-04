import React, { useState } from 'react'
import logoo from '../../assets/logo.png';
import { Link } from 'react-router-dom';
import { FaGripLines } from "react-icons/fa";

const Navbar = () => {
  const links = [
    {
      title: "Home",
      link: "/"
    },
    {
      title: "All Books",
      link: "/all-books"
    },
    {
      title: "Cart",
      link: "/cart"
    },
    {
      title: "Profile",
      link: "/profile"
    }
  ]
  const [MobileNav,setMobileNav] = useState("hidden");
  return (
    <>
      <nav className="z-50 relative flex bg-white text-zinc-800 px-8 py-4 items-center justify-between">
        <div className="flex items-center justify-between">
          <img className="h-10 me-4" src="{logoo}" alt="logo" />
          <div className="text-2xl font-semibold">The Book Emporium</div>
        </div>
        <div className='nav-links-bookheaven block flex gap-2 items-center'>
          <div className='hidden md:flex gap-4'>
            {links.map((items, index) => (
              <Link to={items.link} className="hover:text-blue-500 transition-all duration-300" key={index}>
                {items.title}{" "}
              </Link>
            ))}
          </div>
          <div className='hidden md:flex gap-2'>
            <Link to="/LogIn" className='px-4 py-1 border rounded border-blue-500 hover:bg-blue-500 hover:text-zinc-800 transition-all duration-300'>LogIn</Link>
            <Link to="/SignUp" className='px-4 py-1 rounded bg-blue-500 hover:bg-white hover:text-zinc-800 transition-all duration-300'>SignUp</Link>
          </div>
          <button className='block md:hidden text-black text-2xl hover:text-gray-300' onClick={()=>(MobileNav ==="hidden" ? setMobileNav("block") : setMobileNav("hidden"))}>
            <FaGripLines />
          </button>
        </div>
      </nav>
      <div className={`${MobileNav} bg-zinc-800 h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center`}>
        {links.map((items, index) => (
          <Link to={items.link} className={`${MobileNav} mb-8 text-white text-4xl font-semibold hover:text-blue-500 transition-all duration-300`} key={index} onClick={()=>(MobileNav ==="hidden" ? setMobileNav("block") : setMobileNav("hidden"))}>
            {items.title}{" "}
          </Link>
        ))}
        <Link to="/LogIn" className={`${MobileNav} px-8 mb-8 text-3xl font-semibold py-2 border rounded border-blue-500 text-white hover:bg-white hover:text-zinc-800 transition-all duration-300`}>LogIn</Link>
        <Link to="/SignUp" className={`${MobileNav} px-8 mb-8 text-3xl font-semibold py-2 rounded bg-blue-500 hover:bg-white hover:text-zinc-800 transition-all duration-300`}>SignUp</Link>
      </div>
    </>

  );
}

export default Navbar