import React, { useEffect, useState } from 'react';
import classes from './CategoriesSlider.module.css';
import axios from 'axios';
import Slider from "react-slick";


export default function CategoriesSlider() {


  const [categoriesSlider, setCategoriesSlider] = useState(null)
  const [apiError, setApiError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)


  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 2000
  };

async function getCategoriesSlider() {

  setIsLoading(true)

  try {

  const {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/categories")

  // console.log(data);

  setCategoriesSlider(data.data);
  
  setApiError(null);
  
  } catch (error) {
  // console.log(error);
    setApiError(error.response.data.message);
    setCategoriesSlider(null);
  }
  finally{
    setIsLoading(false)
  }
}
  useEffect(() => {
  
    getCategoriesSlider()

  }, [])

  return (
    <div className={`${classes.CategoriesSlider} py-10`}>
      <div className="container mx-auto px-3">
        <h2 className='my-4 capitalize font-semibold text-gray-600'>Shop Popular Categories</h2>

        {isLoading && <div className='text-center'><i className='fa fa-spinner fa-spin text-9xl'></i></div>}

        {apiError && <p className='alert alert-danger'>{apiError}</p>}

        {categoriesSlider && (  
          <div className='overflow-hidden'>
            <Slider {...settings}>
          {
            categoriesSlider.map(cat => (
              <div key={cat._id}>
                <img src={cat.image} alt={cat.name} className='w-full mb-4'/>
                <h3 className='text-center font-semibold'>{cat.name}</h3>
              </div>
            ))
          }
        </Slider>
          </div>
      )}

      </div>
    </div>
  )
}

