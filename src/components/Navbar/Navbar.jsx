import React, { useContext, useState } from 'react'
import classes from './Navbar.module.css'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import logo from '../../assets/freshcart-logo.svg'
import { AuthContext } from '../../Context/AuthContext'
import { CartContext } from '../../Context/CartContext'
import { WishlistContext } from '../../Context/WishlistContext'

export default function Navbar() {

    const {token, setToken} =useContext(AuthContext);
    const {numOfCartItems} = useContext(CartContext);
    const {wishlist} = useContext(WishlistContext);

    const [toggle, setIsToggle] = useState(false);

    const navigate = useNavigate();

    function handleLogout() {
      localStorage.removeItem("token")
      setToken(null)
      navigate('/login')
    }

  function handleToggle() {
    setIsToggle(!toggle);
  }

  return (
  <nav className={`${classes.Navbar} bg-green-200 border-gray-200 dark:bg-gray-900 fixed top-0 left-0 w-full z-50 shadow-md`}>

    <div className="w-full flex flex-wrap items-center justify-between mx-auto p-4 z-50">
      
      <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse md:w-[20%]">
          <img src= {logo} className="" alt="FreshCart Logo" />
          {/* <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"></span> */}
      </Link>

      <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false" onClick={handleToggle}>
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
          </svg>
      </button>

  
     <div className={`${toggle? "block" : "hidden"} w-full md:flex md:w-[80%] md:justify-between`} id="navbar-default">

        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border-gray-100 rounded-lg  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">

          {
            token ?

            <>

          <li>
           <NavLink to={''} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" aria-current="page">Home
           </NavLink>
          </li>

          <li>
           <NavLink to={'/products'} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Products
           </NavLink>
          </li>

          <li>
           <NavLink to={'/brands'} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Brands
           </NavLink>
          </li>

          <li>
           <NavLink to={'/categories'} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Categories
           </NavLink>
          </li>
            
          <li>
           <NavLink to={'/Cart'} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Cart
           </NavLink>
          </li>

          <li>
            <NavLink to={'/wishlist'} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
            Wishlist
            </NavLink>
        </li>

           <li>
            <NavLink to={'/allorders'} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">My Orders
            </NavLink>
           </li>          
            </>

            :

          null
          }
          
        </ul>

        <ul className={`flex gap-4 flex-wrap md:flex-nowrap ${classes.icons}`}>

        {
          token ?
          <>


        <li className="w-full md:w-auto mr-4">
          <NavLink to={'/wishlist'} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent relative">
            <div className='absolute -top-3 left-12 md:left-4 md:-top-4 bg-green-500 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full'>{wishlist.length}</div>
            <i className="fa-solid fa-heart fa-1x ms-6 md:ms-0"></i>
          </NavLink>
        </li>

        <li className="w-full md:w-auto mr-4">
          <NavLink to={'/Cart'} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent relative">
            <div className='absolute -top-3 left-12 md:left-4 md:-top-4 bg-green-500 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full'>{numOfCartItems}</div>
            <i className="fa-solid fa-cart-shopping fa-1x ms-6 md:ms-0"></i>
          </NavLink>
        </li>

          <li className={`${classes.logout} w-full`}>
          <div 
          onClick={handleLogout}
          className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent font-medium cursor-pointer ms-6 md:ms-0">Logout
          </div>
          </li> 

          </>
         
         :

         <>
            
         <li className='w-full'>
          <NavLink to={'/login'} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent font-medium">Login
          </NavLink>
         </li>

         <li className='w-full'>
          <NavLink to={'/register'} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent font-medium">Register
          </NavLink>
         </li>

         </>
        }


        <div>
          <ul className='flex flex-wrap md:flex-nowrap gap-4'>
          <li><i className='fab fa-facebook'></i></li>
          <li><i className='fab fa-youtube'></i></li>
          <li><i className='fab fa-instagram'></i></li>
          <li><i className='fab fa-linkedin'></i></li>
          <li><i className='fab fa-twitter'></i></li>
          </ul>
        </div>
        </ul>

      </div>

    </div>
  </nav>
  )
}


