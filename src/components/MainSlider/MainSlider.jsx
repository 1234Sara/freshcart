import React, { useState } from 'react';
import classes from './MainSlider.module.css'
import Slider from "react-slick";
import img1 from '../../assets/images/grocery-banner.png';
import img2 from '../../assets/images/grocery-banner-2.jpeg';
import slide1 from '../../assets/images/slider-image-1.jpeg';
import slide2 from '../../assets/images/slider-image-2.jpeg';
import slide3 from '../../assets/images/slider-image-3.jpeg';

export default function MainSlider() {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
  };

  const images = [
    {
      src: slide1,
      alt: "slide 1",
    },
    {
      src: slide2,
      alt: "slide 2",
    },
    {
      src: slide3,
      alt: "slide 3",
    },
  ];

  return (  
  
    <section>

    <div className={`${classes.MainSlider} pt-24 pb-8`}>

      <div className="container mx-auto px-3">
          <div className="row">
            <div className="w-2/3">
            <div >
            <Slider {...settings}>
              {
                images.map((img,index)=>(
                  <img src={img.src} alt={img.alt} className="h-[400px] w-full" key={index}/>

                ))
              }
            </Slider>
            </div>
            </div>

            <div className="w-1/3">
                <img src={img1} alt="" className="h-[200px] object-cover w-full"/>
                <img src={img2} alt="" className="h-[200px] object-cover w-full"/>

              </div>


          </div>


        </div>

      </div>

     </section>
  )
}


