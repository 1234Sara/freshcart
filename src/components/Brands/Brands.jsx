import React, { useEffect, useState } from 'react';
import classes from './Brands.module.css';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';

export default function Brands() {
  const [brands, setBrands] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [brandDetails, setBrandDetails] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  async function getBrands() {
    setIsLoading(true);
    try {
      const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/brands");
      // console.log(data);
      setBrands(data.data);
      setApiError(null);
    } catch (error) {
      setApiError(error.message);
      // console.log(error);
      setBrands(null);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getBrands();
  }, []);

  async function getBrandDetails(brandId) {
    try {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${brandId}`);
      // console.log(data);
      setBrandDetails(data.data);
      setIsModalOpen(true); 
      setApiError(null);
    } catch (error) {
      // console.log(error);
      setApiError(error.message);
    }
  }

  function closeModal() {
    setIsModalOpen(false);
    setBrandDetails(null);
  }

  return (
    <section>

          <Helmet>
          <title>Brands Page</title>
          </Helmet>

        {isLoading && <div className='text-center my-56'><i className='fa fa-spinner fa-spin text-9xl'></i></div>}

        {apiError && <p className='alert alert-danger text-center my-52 w-[80%] m-auto font-semibold'>{apiError}</p>}

        {!isLoading && !apiError && <h2 className={`${classes.Brands} pt-32 pb-8 capitalize font-semibold text-green-600 text-center`}>All Brands</h2>}

        <div className="container mx-auto p-3">
          <div className="row">
            {brands && brands.map(brand => (
              <div key={brand._id} className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-3">
                <div className='cursor-pointer bg-white shadow-md rounded-lg p-3 text-center transition hover:shadow-lg'
                  onClick={() => getBrandDetails(brand._id)}>
                   <div className='h-64 flex items-center justify-center'>
                   <img src={brand.image} alt={brand.name} className="max-h-full max-w-full object-contain" />
                   </div>
                  <h3 className="text-center font-semibold text-green-700 py-3 capitalize">{brand.slug}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>

      {isModalOpen && brandDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" onClick={closeModal}>

          <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-md p-6 relative" onClick={(e) => e.stopPropagation()}>
            <button onClick={closeModal} className="absolute top-2 right-2 text-gray-500 hover:text-red-500">
              ✖
            </button>
            <div className="flex items-center gap-4">
              <div className="flex-grow">
                <h2 className="text-2xl font-bold text-green-600">{brandDetails.name}</h2>
                <p className="text-gray-500 mt-1">{brandDetails.slug}</p>
              </div>
              <img
                src={brandDetails.image}
                alt={brandDetails.name}
                className="w-24 h-24 object-contain"
              />
            </div>
            <div className="mt-4 text-right">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
