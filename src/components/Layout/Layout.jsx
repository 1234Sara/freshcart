import React, { useState } from 'react'
import classes from './Layout.module.css'
import Navbar from './../Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from './../Footer/Footer';


export default function Layout() {
  return (

    <section className="flex flex-col min-h-screen">
      <Navbar/>
      <main className={`${classes.Layout} flex-grow`}>
      <Outlet />
    </main>
    <Footer />
  </section>
  )
}
