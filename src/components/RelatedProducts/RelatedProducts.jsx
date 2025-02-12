import React, { useEffect, useState } from 'react'
import classes from './RelatedProducts.module.css'
import axios from 'axios'
import SingleProduct from '../SingleProduct/SingleProduct'
import { useParams } from 'react-router-dom'

export default function RelatedProducts() {

    const [relatedProducts, setRelatedProducts] = useState(null);
    const [apiError, setApiError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const {categoryId} = useParams();

  async function getRelatedProducts() {

    setIsLoading(true)

    try {

    const {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/products")

    // console.log(data);

    const res = data.data.filter(product => product.category._id === categoryId)

    setRelatedProducts(res)
    setApiError(null)
    
    } catch (error) {
    // console.log(error);
      setApiError(error.response.data.message);
      setRelatedProducts(null);
    }
    finally{
      setIsLoading(false)
    }
  }
    useEffect(() => {
    
      getRelatedProducts()

    }, [])
  

  return (
    <section className={`py-20 ${classes.RelatedProducts}`}>
      <div className="container mx-auto px-3">
        
        <h2 className='text-3xl font-semibold mb-5'>Related Products</h2>
        
        {isLoading && <div className='text-center'><i className='fa fa-spinner fa-spin text-9xl'></i></div>}

        {apiError && <p className='alert alert-danger'>{apiError}</p>}

        <div className="row">

          {relatedProducts &&

            relatedProducts.map((product) =>(
            <SingleProduct key={product.id} product={product}/>
          ))}

        </div>

      </div>
    </section>
  )
}







