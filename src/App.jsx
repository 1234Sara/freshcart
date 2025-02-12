import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ToastContainer} from 'react-toastify';
import {Detector } from "react-detect-offline";
import {HelmetProvider } from 'react-helmet-async';
import { lazy, Suspense } from 'react';

import FetchData from './components/FetchData/FetchData';

// import Layout from './components/Layout/Layout';
// import Home from './components/Home/Home';
// import Products from './components/Products/Products';
// import ProductDetails from './components/ProductDetails/ProductDetails';
// import Brands from './components/Brands/Brands';
// import Categories from './components/Categories/Categories';
// import CategoryDetails from './components/CategoryDetails/CategoryDetails';
// import Cart from './components/Cart/Cart';
// import Wishlist from './components/Wishlist/Wishlist';
// import Checkout from './components/Checkout/Checkout';
// import MyOrders from './components/MyOrders/MyOrders';
// import Login from './components/Login/Login';
// import Register from './components/Register/Register';
// import ForgotPassword from './components/ForgotPassword/ForgotPassword';
// import VerifyResetCode from './components/VerifyResetCode/VerifyResetCode';
// import ResetPassword from './components/ResetPassword/ResetPassword';
// import NotFound from './components/NotFound/NotFound';
// import Error from './components/Error/Error';
// import AuthContextProvider from './Context/AuthContext';
// import CartContextProvider from './Context/CartContext';
// import WishlistContextProvider from './Context/WishlistContext';
// import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes';


const Layout = lazy(()=> import('./components/Layout/Layout'));
const Home = lazy(()=> import('./components/Home/Home'));
const Products = lazy(()=> import('./components/Products/Products'));
const ProductDetails = lazy(()=> import('./components/ProductDetails/ProductDetails'));
const Brands = lazy(()=> import('./components/Brands/Brands'));
const Categories = lazy(()=> import('./components/Categories/Categories'));
const CategoryDetails = lazy(()=> import('./components/CategoryDetails/CategoryDetails'));
const Cart = lazy(()=> import('./components/Cart/Cart'));
const Wishlist = lazy(()=> import('./components/Wishlist/Wishlist'));
const Checkout = lazy(()=> import('./components/Checkout/Checkout'));
const MyOrders = lazy(()=> import('./components/MyOrders/MyOrders'));
const Login = lazy(()=> import('./components/Login/Login'));
const Register = lazy(()=> import('./components/Register/Register'));
const ForgotPassword = lazy(()=> import('./components/ForgotPassword/ForgotPassword'));
const VerifyResetCode = lazy(()=> import('./components/VerifyResetCode/VerifyResetCode'));
const ResetPassword = lazy(()=> import('./components/ResetPassword/ResetPassword'));
const NotFound = lazy(()=> import('./components/NotFound/NotFound'));
const Error = lazy(()=> import('./components/Error/Error'));
const AuthContextProvider = lazy(()=> import('./Context/AuthContext'));
const CartContextProvider = lazy(()=> import('./Context/CartContext'));
const WishlistContextProvider = lazy(()=> import('./Context/WishlistContext'));
const ProtectedRoutes = lazy(()=> import('./components/ProtectedRoutes/ProtectedRoutes'));
import FetchData from './components/FetchData/FetchData';


const router =  createBrowserRouter([
  {
    path: "",
    element: <Layout/>,
    errorElement: <Error/>,
    children: [
      {
      index: true,
      element: <ProtectedRoutes>
        <Suspense fallback = {<div className='text-9xl py-52'>Loading...</div>}>
        <Home/>
        </Suspense>
      </ProtectedRoutes>
      },
      {
        path: 'products',
        element: (
        <ProtectedRoutes>
          <Suspense fallback = {<div className='text-9xl py-52'>Loading...</div>}>
          <Products/>
          </Suspense>
        </ProtectedRoutes>
        ),
      },
      {
        path: 'product-details/:id/:categoryId',
        element: (
          <ProtectedRoutes>
           <Suspense fallback = {<div className='text-9xl py-52'>Loading...</div>}>
           <ProductDetails/>
           </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: 'brands',
        element: (
          <ProtectedRoutes>
            <Suspense fallback = {<div className='text-9xl py-52'>Loading...</div>}>
            <Brands/>
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: 'categories',
        element: <ProtectedRoutes>
          <Suspense fallback = {<div className='text-9xl py-52'>Loading...</div>}>
          <Categories/>
          </Suspense>
        </ProtectedRoutes>
      },
      {
        path: 'categories-details/:catId',
        element: <ProtectedRoutes>
                  <Suspense fallback = {<div className='text-9xl py-52'>Loading...</div>}>
                  <CategoryDetails/>
                  </Suspense>
                </ProtectedRoutes>
      },
      {
        path: 'Cart',
        element: <ProtectedRoutes>
                  <Suspense fallback = {<div className='text-9xl py-52'>Loading...</div>}>
                  <Cart/>
                  </Suspense>
                </ProtectedRoutes>
      },
      {
        path: 'wishlist',
        element: <ProtectedRoutes>
                  <Suspense fallback = {<div className='text-9xl py-52'>Loading...</div>}>
                  <Wishlist/>
                  </Suspense>
                </ProtectedRoutes>
      },
      {
        path: 'checkout',
        element: <ProtectedRoutes>
                  <Suspense fallback = {<div className='text-9xl py-52'>Loading...</div>}>
                  <Checkout/>
                  </Suspense>
                </ProtectedRoutes>
      },
      {
        path: 'allorders',
        element: <ProtectedRoutes>
                  <Suspense fallback = {<div className='text-9xl py-52'>Loading...</div>}>
                  <MyOrders/>
                  </Suspense>
                </ProtectedRoutes>
      },
      {
        path: 'login',
        element: <Suspense fallback = {<div className='text-9xl py-52'>Loading...</div>}><Login/></Suspense>
      },
      {
        path: 'register',
        element: <Suspense fallback = {<div className='text-9xl py-52'>Loading...</div>}><Register/></Suspense>
      },
      {
        path: 'forget-password',
        element: <Suspense fallback = {<div className='text-9xl py-52'>Loading...</div>}><ForgotPassword/></Suspense>
      },
      {
        path: 'verify-reset-code',
        element: <Suspense fallback = {<div className='text-9xl py-52'>Loading...</div>}><VerifyResetCode/></Suspense>
      },
      {
        path: 'reset-password',
        element: <Suspense fallback = {<div className='text-9xl py-52'>Loading...</div>}><ResetPassword/></Suspense>
      },
      {
        path: '*',
        element: <Suspense fallback = {<div className='text-9xl py-52'>Loading...</div>}><NotFound/></Suspense>
      },

  ]
  }
])

function App() {

  return <>
  
  <>
  <Detector
  render={({ online }) => (
    <div className={`${online ? "text-green-800 dark:text-green-400  bg-green-50" : "text-red-800 dark:text-red-400 bg-red-50"}
    p-4 mb-4 text-sm rounded-lg dark:bg-gray-800 fixed bottom-40 end-2 font-semibold z-10`} 
    role="alert">You are currently {online ? "online" : "offline"}</div>
      )}/>  
  </>

    <AuthContextProvider>
      <CartContextProvider>
      <WishlistContextProvider>
      <HelmetProvider>
      <RouterProvider router={router}/>
      <ToastContainer/>
      </HelmetProvider>
      </WishlistContextProvider>
      </CartContextProvider>
  </AuthContextProvider>
  </>
}

export default App


