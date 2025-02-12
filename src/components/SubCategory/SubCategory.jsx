import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function SubCategories() {
  const [subCategories, setSubCategories] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  const { catId } = useParams();

  async function getSubCategories() {
    setIsLoading(true);
    setApiError(null);
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/categories/${catId}/subcategories`
      );
      setSubCategories(data.data);
    } catch (error) {
      setApiError(error.message);
      // console.error("Error fetching subcategories:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getSubCategories();
  }, [catId]);

  return (
    <div className="my-8">
      {isLoading && (<div className="text-center"><i className="fa fa-spinner fa-spin text-9xl m-auto block"></i></div>)}

      {apiError && (<p className="alert alert-danger text-center my-20">{apiError}</p>)}

      <div className="container mx-auto">
         {subCategories && subCategories.length > 0 ? (
            <div>
            
            {isLoading && <div className='text-center'><i className='fa fa-spinner fa-spin text-9xl m-auto block'></i></div>}
            
            {apiError && <p className='alert alert-danger text-center my-20'>{apiError}</p>}
            
              <h3 className="text-xl font-semibold text-green-700 text-center py-8">Sub-Categories</h3>
              <div className="row">
                {subCategories.map(sub => (
                  <div key={sub._id} className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-3">
                    <div className="bg-white border border-gray-200 rounded-lg shadow-md transition-shadow duration-300 ease-in-out hover:shadow-lg hover:shadow-green-300 p-3">
                      <h4 className="text-center font-semibold text-green-700">{sub.name}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) :
          (
            !isLoading && !apiError && <p className="text-center text-red-700 font-semibold">No Subcategories Available.</p>
          )
          }
      </div>
    </div>
  );
}
