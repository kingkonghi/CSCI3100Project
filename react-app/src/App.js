// Student Name : Chu Tsz Chim James, Chow Ka Shing, Fong Kwai Yiu, Lee Ho Kan
// Student ID : 1155142348, 1155160080, 1155160139, 1155157376

/***************************************************************************************
*    Title: App.js
*    Author: CHU Tsz Chim James, CHEUNG Hin Hang, CHAN Tsz Leung, PO Tsz Hin, LEE Su Zie
*    Date: 12/4/2023
*    Code version: 1.0
*    Availability: https://github.com/hhcheung0/OF-COURSE/blob/main/react-app/src/App.js
*
***************************************************************************************/
/* Code has been modified in the following aspects:
1. changing Routes used by router
*/
import React from 'react'
import './index.scss'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// import components and pages
import Root from './components/Root'
import Home from './pages/Sample'
import Main from './pages/Main'
import Search from './pages/Search'
import Product from './pages/Product'

const router = createBrowserRouter([
  {
    //insert paths (no nav bar, no title bar)
    path: '',
    element: <Root nav={false} home={true} />,
    children: [
      {
        path: '/',
        element: <Home />
      },
    ]
  },
  {
    //insert paths (no nav bar, only title bar)
    path: '',
    element: <Root nav={false} home={false} />,
    children: [
    ]

  },
  {
    //insert paths for login page (has nav bar & title bar)
    path: '',
    element: <Root nav={true} home={false} />,
    children: [
      {
        path: '/home',
        element: <Main />
      },
      {
        path: '/search',
        element: <Search/>
      },
      {
        path: '/product',
        element: <Product/>
      }
    ]

  }
])

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;