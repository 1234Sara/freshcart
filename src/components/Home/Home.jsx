// // import React, { useState } from 'react'
// // import classes from './Home.module.css'
// // import MainSlider from '../MainSlider/MainSlider'
// // import CategoriesSlider from './../CategoriesSlider/CategoriesSlider';
// // import RecentProducts from './../RecentProducts/RecentProducts';


// // export default function Home() {
// //   return (
// //     <div className={classes.Home}>
// //       <MainSlider/>
// //       <CategoriesSlider/>

// //       <form className="flex items-center w-[50%] mx-auto">   
// //       <label htmlFor="simple-search" className="sr-only">Search</label>
// //       <div className="relative w-full">
// //         <input type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search branch name..." required />
// //       </div>
// //       <button type="submit" className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
// //         <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
// //           <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
// //         </svg>
// //         <span className="sr-only">Search</span>
// //       </button>
// //     </form>


// //       <h2 className='my-4 font-semibold text-gray-600 container'>Recent Products</h2>

// //       <RecentProducts/>
// //     </div>
// //   )
// // }

// import React, { useState } from 'react';
// import classes from './Home.module.css';
// import MainSlider from '../MainSlider/MainSlider';
// import CategoriesSlider from './../CategoriesSlider/CategoriesSlider';
// import RecentProducts from './../RecentProducts/RecentProducts';

// export default function Home() {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [searchTerm, setSearchTerm] = useState('');

//   function handleSearch(e) {
//     e.preventDefault();
//     setSearchTerm(searchQuery); // Set search term when button is clicked
//   }

//   return (
//     <div className={classes.Home}>
//       <MainSlider />
//       <CategoriesSlider />

//       {/* Search Bar */}
//       <form className="flex items-center w-[50%] mx-auto" onSubmit={handleSearch}>
//         <label htmlFor="simple-search" className="sr-only">Search</label>
//         <div className="relative w-full">
//           <input
//             type="text"
//             id="simple-search"
//             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
//             placeholder="Search product name..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)} 
//           />
//         </div>
//         <button
//           type="submit"
//           className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800"
//         >
//           <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
//             <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
//           </svg>
//           <span className="sr-only">Search</span>
//         </button>
//       </form>

//       <h2 className="my-4 font-semibold text-gray-600 container">Recent Products</h2>

//       {/* Pass searchTerm to RecentProducts to filter results */}
//       <RecentProducts searchTerm={searchTerm} />
//     </div>
//   );
// }

import React, { useState } from 'react';
import classes from './Home.module.css';
import MainSlider from '../MainSlider/MainSlider';
import CategoriesSlider from './../CategoriesSlider/CategoriesSlider';
import RecentProducts from './../RecentProducts/RecentProducts';
import { Helmet } from 'react-helmet-async';

export default function Home() {


  return (
    <div className={classes.Home}>

    <Helmet>
    <title>Home Page</title>
    </Helmet>


      <MainSlider />
      <CategoriesSlider />

      <h2 className="my-4 font-semibold text-gray-600 container">Recent Products</h2>

      <RecentProducts/>
    </div>
  );
}
