import React, { useState } from 'react'
import classes from './ForgotPassword.module.css'
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';


export default function ForgotPassword() {

  const [successMsg, setSuccessMsg] = useState(null);
  const [apiError, setApiError] = useState(null);
  const [isLoading, setIsloading] = useState(false);
  const navigate = useNavigate();

  const initialValues = {  
    email: "",
  }

   const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid Email Format").required("Email is Required"),
    });

    async function onSubmit(values) {
      setIsloading(true);
      setSuccessMsg(null);
      setApiError(null);
      try {
        const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", values);
        // console.log(data);
        
        setSuccessMsg(data.message);
        setApiError(null);
        navigate("/verify-reset-code");
      } catch (error) {
        setApiError(error.response.data.message);
        setSuccessMsg(null);
      }
      finally{
        setIsloading(false);
      }
    }

  
   const formik = useFormik({
      initialValues,
      validationSchema,
      onSubmit,
    })
  

    return (
      <div className={`${classes.ForgotPassword} py-[11.3rem]`}>
                  
          <Helmet>
          <title>Forget-Password Page</title>
          </Helmet>

        <div className="container mx-auto">
          <h1 className='text-xl text-center font-bold mb-6 text-emerald-700'>Forgot Password</h1>
  
      {apiError && (<div className="alert alert-danger max-w-lg mb-6 mx-auto">{apiError}</div>)}
  
      {successMsg && (<div className="alert alert-success max-w-lg mb-6 mx-auto text-center capitalize">{successMsg}</div>)}
  
        <form onSubmit={formik.handleSubmit} className='w-10/12 mx-auto'>
  
            <div className='space-y-6 w-8/12 mx-auto'>
            
            <div className="relative z-0">
                <input type="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder="" autoComplete='off' name='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}/>

                <label htmlFor="email" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Email</label>
  
                {formik.errors.email && formik.touched.email && (<span className='text-red-500'>{formik.errors.email}</span>)}
            </div>
  
            <button type="submit" disabled={!(formik.isValid && formik.dirty) || isLoading} 
            className="disabled:bg-gray-200 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
              
              {isLoading? <i className='fa fa-spinner fa-spin'></i> : 'Verify'}
  
              </button>
    
              </div>
            </form>
          </div>
      </div>
    )
}
