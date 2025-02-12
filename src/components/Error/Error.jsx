import React, { useState } from 'react'
import classes from './Error.module.css'
import { Helmet } from 'react-helmet-async';


export default function Error() {
  return (
    <section className='py[1.5rem]'>
                <Helmet>
                <title>Error Page</title>
                </Helmet>
    <div className= {`${classes.Error} alert alert-danger text-center my-52 w-[80%] m-auto font-semibold`}>Error</div>

    </section>
  )
}
