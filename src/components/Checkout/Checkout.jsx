import React, { useContext, useState } from 'react'
import classes from './Checkout.module.css'
import { useFormik} from 'formik'
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';

export default function Checkout() {

const navigate = useNavigate()

// const [apiError, setApiError] = useState(null);

const [isLoading, setIsLoading] = useState(false);

const [isOnline, setIsOnline] = useState(false);

const {handlePayment} = useContext(CartContext);

  const initialValues = {
    details : "",
    phone: "",
    city : "",
  };

   const validationSchema = Yup.object().shape({
    details: Yup.string().required('Details is Required').min(3),
    phone: Yup.string().required('Phone is Required').matches(/^(002|\+2)?01[0-25][0-9]{8}$/, "Phone must be matched"),
    city: Yup.string().required('City is Required').min(3),
    });

  async function onSubmit(values) {
    
    setIsLoading(true);
    
    // console.log("submit", values);
    try {
      const res = await handlePayment(values, isOnline);
      if (res.status === 'success'){
        if (isOnline){
          location.href = res.session.url;
        }
        else if (isOnline){
          navigate('/allorders')
        }
        else {
          toast.success("Order placed successfully");
          setTimeout(()=> {
            navigate('/allorders')
          }, 5000);
        }
      } 
      else{
        toast.error("Payment Failed");
      }
    }
    finally{
      setIsLoading(false);
    }
    
  }
  

 const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  })


  return (
    <div className={`${classes.Checkout} max-h-screen py-[8rem]`}>

          <Helmet>
          <title>Check-Out Page</title>
          </Helmet>
      
      <div className="container mx-auto">
        <h1 className='text-3xl text-center mb-6'>Checkout</h1>

    {/* {apiError && (<div className="alert alert-danger max-w-lg mb-6 mx-auto text-center capitalize">{apiError}</div>)} */}

      <form onSubmit={formik.handleSubmit} className='w-10/12 mx-auto'>

          <div className='space-y-6 w-8/12 mx-auto'>
          
          <div className="relative z-0">
              <input type="text" id="details" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder="" name='details' value={formik.values.details} onChange={formik.handleChange} onBlur={formik.handleBlur}/>

              <label htmlFor="details" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Address in Details</label>

              {formik.errors.details && formik.touched.details && (<span className='text-red-500'>{formik.errors.details}</span>)}

          </div>

          <div className="relative z-0">
              <input type="text" id="city" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " autoComplete='off' name='city' value={formik.values.city} onChange={formik.handleChange} onBlur={formik.handleBlur}/>

              <label htmlFor="city" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">City</label>

              {formik.errors.city && formik.touched.city && (<span className='text-red-500'>{formik.errors.city}</span>)}
          </div>

          <div className="relative z-0">
              <input type="tel" id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " name='phone' value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur}/>

              <label htmlFor="phone" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Phone</label>

              {formik.errors.phone && formik.touched.phone && (<span className='text-red-500'>{formik.errors.phone}</span>)}
          </div>

        <div className="flex items-center mb-4">

          <input onChange={()=> setIsOnline(!isOnline)} 
          
          id="default-checkbox" type="checkbox" defaultValue className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
          
          <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Is Pay Online</label>
        </div>


          <button type="submit" 
          disabled={!(formik.isValid && formik.dirty) || isLoading} 
          className="w-full disabled:bg-gray-200 focus:outline-none text-white btn btn-success focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
            {isLoading? <i className='fa fa-spinner fa-spin'></i> : 'Pay Now'}
            
            </button>

            </div>
          </form>
        </div>
    </div>
  )
}


