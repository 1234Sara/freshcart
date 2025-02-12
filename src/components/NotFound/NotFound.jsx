import React, { useState } from 'react'
import classes from './NotFound.module.css'
import { Helmet } from 'react-helmet-async';


export default function NotFound() {
  return (
    <section className='py-[1.4rem]'>

      <Helmet>
      <title>Not-Found Page</title>
      </Helmet>

    <div className= {`${classes.NotFound} alert alert-danger text-center my-52 w-[80%] m-auto font-semibold`}>Not Found Page</div>
    </section>
  )
}
