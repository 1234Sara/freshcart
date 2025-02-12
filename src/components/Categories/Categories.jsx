import React, { useEffect, useState } from 'react';
import classes from './Categories.module.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export default function Categories() {


  const [Categories, setCategories] = useState(null);
  const [apiError, setApiError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


async function getCategories() {

  setIsLoading(true);

  try {

  const {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/categories")

  // console.log(data);

  setCategories(data.data);
  
  setApiError(null);
  
  } catch (error) {

    setApiError(error.response.data.message);
    setCategories(null);
  }
  finally{
    setIsLoading(false);
  }
}
  useEffect(() => {
  
    getCategories();

  }, [])

  return (
    <div className=''>

          <Helmet>
          <title>Categories Page</title>
          </Helmet>

        <div className="container mx-auto p-3">

        {isLoading && <div className='text-center my-56'><i className='fa fa-spinner fa-spin text-9xl'></i></div>}

        {apiError && <p className='alert alert-danger'>{apiError}</p>}

        {!isLoading && <h2 className={`${classes.Categories} pt-32 pb-8 capitalize font-semibold text-green-600 text-center`}>All Categories</h2>}
       
        <div className="row">

      {Categories && Categories.map(cat => (

      <div key={cat._id} className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-3">
        
     <Link to={`/categories-details/${cat._id}`}>
     <div className='bg-white border border-gray-200 rounded-lg shadow-sm'>
      
      <div className='h-64 flex items-center justify-center bg-gray-50'>
      <img src={cat.image} alt={cat.name}  className="max-h-full max-w-full object-contain" />
      </div>

      <h3 className="text-center font-semibold text-green-700 py-3">{cat.name}</h3>        
      </div>
     </Link>
      </div>
      ))}

        </div>
      </div>
    </div>
  )
}


