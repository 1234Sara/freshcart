import React, { useState } from 'react'
import classes from './Products.module.css'
import RecentProducts from '../RecentProducts/RecentProducts'
import { Helmet } from 'react-helmet-async';


export default function Products() {

  return ( 
          <div className=''>

        <Helmet>
        <title>Products Page</title>
        </Helmet>

          <h1 className={`${classes.Products} text-center pt-32 pb-8 text-green-600 font-semibold`}>All Products</h1> 
      <RecentProducts/>
    </div>
  )
}
