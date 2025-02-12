import React, { useEffect, useState } from 'react'
import classes from './RecentProducts.module.css'
import axios from 'axios'
import SingleProduct from '../SingleProduct/SingleProduct'

export default function RecentProducts() {

    const [recentProducts, setRecentProducts] = useState(null);
    const [apiError, setApiError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredProducts = recentProducts?.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase()));

  async function getRecentProducts() {

    setIsLoading(true)

    try {

    const {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/products")

    // console.log(data);

    setRecentProducts(data.data);
    setApiError(null);
    
    } catch (error) {
    // console.log(error);
      setApiError(error.response.data.message);
      setRecentProducts(null);
    }
    finally{
      setIsLoading(false)
    }
  }
    useEffect(() => {
    
      getRecentProducts()

    }, [])
  

  return (
    <section className={` ${classes.RecentProducts}`}>
      
      <div className="container mx-auto p-3">
        
        {isLoading && <div className='text-center'><i className='fa fa-spinner fa-spin text-9xl'></i></div>}

        {apiError && <p className='alert alert-danger'>{apiError}</p>}

        <div className="flex items-center w-[80%] mx-auto my-2">
        <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-4" placeholder="Search product name..." value={searchQuery} 
        onChange={(e) => setSearchQuery(e.target.value)}/>
      </div>
      
        <div className="row">
          {filteredProducts &&
            filteredProducts.map((product) =>(
            <SingleProduct key={product.id} product={product}/>
          ))}

        </div>

      </div>
    </section>
  )
}




