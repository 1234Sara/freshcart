import React, { useContext, useState } from 'react'
import classes from './Login.module.css'
import { useFormik} from 'formik'
import * as Yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './../../Context/AuthContext';
import { Helmet } from 'react-helmet-async';

export default function Login() {

const {setToken} = useContext(AuthContext);

const navigate = useNavigate()

const [apiError, setApiError] = useState(null);

const [isLoading, setIsloading] = useState(false);

const [successMsg , setSuccessMsg] = useState(null);


  const initialValues = {
    email: "",
    password: "",
  }

   const validationSchema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().min(6).max(15).required().matches(/^[A-Z][a-zA-Z0-9]{5,14}$/, "Password must be matched"),
   });

  async function onSubmit(values) {
    setIsloading(true);
    setSuccessMsg(null);
    setApiError(null);
    // console.log("submit", values);
    try {
      // Call API
    const {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values)
      // console.log(data);
      if (data.message == 'success'){
        setSuccessMsg(data.message);
        setApiError(null);
      }
      setTimeout(() => {
        setSuccessMsg(null);
        localStorage.setItem("token", data.token);
        setToken(data.token);
        navigate('/');
      }, 2000);
    } 
    

    catch (error) {
      // console.log(error);
      setApiError(error.response.data.message);
      setSuccessMsg(null);
    }
    finally{
      setIsloading(false);
    }
  }

  // console.log(apiError);
  

 const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  })


  return (
    <div className={`${classes.Login} max-h-screen py-[9rem]`}>

        <Helmet>
        <title>Login Page</title>
        </Helmet>

      <div className="container mx-auto">
        <h1 className='text-3xl text-center mb-6'>Login</h1>

    {apiError && (<div className="alert alert-danger max-w-lg mb-6 mx-auto">{apiError}</div>)}

    {successMsg && (<div className="alert alert-success max-w-lg mb-6 mx-auto text-center capitalize">{successMsg}</div>)}

      <form onSubmit={formik.handleSubmit} className='w-10/12 mx-auto'>

          <div className='space-y-6 w-8/12 mx-auto'>
          
          <div className="relative z-0">
              <input type="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " autoComplete='off' name='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}/>

              <label htmlFor="email" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Email</label>

              {formik.errors.email && formik.touched.email && (<span className='text-red-500'>{formik.errors.email}</span>)}
          </div>

          <div className="relative z-0">
              <input type="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " autoComplete='new-password'name='password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}/>

              <label htmlFor="password" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Password</label>

              {formik.errors.password && formik.touched.password && (<span className='text-red-500'>{formik.errors.password}</span>)}

          </div>

          <button type="submit" disabled={!(formik.isValid && formik.dirty) || isLoading} 
          className="disabled:bg-gray-200 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
            
            {isLoading? <i className='fa fa-spinner fa-spin'></i> : 'Login'}

            </button>

        <Link to={'/forget-password'} className="text-blue-500">Forget Your Password?</Link>

            </div>
          </form>
        </div>
    </div>
  )
}


