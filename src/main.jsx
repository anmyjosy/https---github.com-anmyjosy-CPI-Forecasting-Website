import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Loginpage from './Pages/Loginpage.jsx';
import Registerpage from './Pages/Registerpage.jsx';
import Aboutpage from './Pages/Aboutpage.jsx';
import Graph from './Pages/Graph.jsx';
import Linechart from './Pages/Linechart.jsx';
import CPI from './Pages/CPI.jsx';
import ProtectedRoute from 'C:/Users/asus/Desktop/castfore/ProtectdeRoute.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element:<App/>
  },
  {
    path: "top",
    element:<Graph/>
  },
  {
    path: "time",
    element:<Linechart/>
  },
  {
    path:"about",
    element:<Aboutpage/>
  },
  {
    path: "login",
    element:<Loginpage/>,
  },
  {
    path:"register",
    element:<Registerpage/>
  },
  {
    path: "cpi",
    element: <ProtectedRoute element={<CPI />} />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>,
)
