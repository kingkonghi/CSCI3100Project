// Student Name : Lee Ho Kan, Leung Tsz Chung, Lee Kong Yau, Lui Chak Sum, Ho Yan Tung
// Student ID : 1155157376, 1155141896, 1155149600, 1155158054, 1155176122

/***************************************************************************************
*    Title: App.js
*    Author: Lee Ho Kan, Leung Tsz Chung, Lee Kong Yau, Lui Chak Sum, Ho Yan Tung
*    Date: 29/3/2024
*    Code version: 1.0
*
***************************************************************************************/
/* Code has been modified in the following aspects:
1. changing Routes used by router
*/
import React from 'react'
import './index.scss'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

// import components and pages
import Root from './components/Root'
import Home from './pages/Sample'
import Main from './pages/Main'
import Search from './pages/Search'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Login from './pages/Login'
import Payment from './pages/Payment'
import Admin from './pages/Admin'
import User from './pages/User'
import Favour from './pages/Favourite'
import OrderList from './pages/Orderlist'
import Order from './pages/Order'

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
      {
        path: '/login',
        element: <Login />
      }
    ]

  },
  {
    //insert paths for login page (has nav bar & title bar)
    path: '',
    element: <Root nav={true} home={false} />,
    children: [
      {
        path: '/main',
        element: <Main />
      },
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
      },
      {
        path: '/cart',
        element: <Cart/>
      },
      {
        path: '/payment',
        element: <Payment />
      },
      {
        path: '/admin',
        element: <Admin />
      },
      {
        path: '/user',
        element: <User/>
      },
      {
        path: '/favourite',
        element: <Favour/>
      },
      {
        path: '/orderlist',
        element: <OrderList/>
      },
      {
        path: '/order/:oid',
        element: <Order/>
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
