import React, { useEffect, useState } from 'react';
import classes from './CategoryDetails.module.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import SingleProduct from '../SingleProduct/SingleProduct';
import SubCategories from './../SubCategory/SubCategory';
import { Helmet } from 'react-helmet-async';

export default function CategoryDetails() {
  const [categoryDetails, setCategoryDetails] = useState(null);
  const [apiError, setApiError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { catId } = useParams();

  async function getCategoryDetails() {
    setIsLoading(true);
    setApiError(null);
    try {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?category[in]=${catId}`);
      setCategoryDetails(data.data);
      setApiError(null);
    } 
    catch (error) {
      // console.log(error);
      
      setApiError(error.message);
      setCategoryDetails(null);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getCategoryDetails();
  }, [catId]);

  return (
    <>
      <section className='py-20'>

        <Helmet>
        <title>Category Details Page</title>
        </Helmet>

        <div className="container mx-auto px-3">

          {isLoading && <div className='text-center'><i className='fa fa-spinner fa-spin text-9xl'></i></div>}

          {apiError && <p className='alert alert-danger text-center my-20'>{apiError}</p>}

          <SubCategories/>

        {
          categoryDetails && categoryDetails.length > 0 ? (
          <>
          <h2 className={`${classes.CategoryDetails} text-center text-green-600 py-8 font-semibold`}>Related Categories</h2>
          <div className="row">
          {categoryDetails && categoryDetails.map((product) => (
            <SingleProduct key={product.id} product={product} />
          ))}
        </div> 
          </>
          )
        :
        (
          !isLoading && !apiError && <p className="text-center text-red-700 font-semibold py-8">No Related Categories Available.</p>
        )
        }
        </div>
      </section>
    </>
  );
}

