import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AddJob from "./pages/AddJob";
import Applications from "./pages/Applications";
import Jobs from "./pages/Jobs";
import Job from "./pages/Job";
import MyJobs from "./pages/MyJobs";
import Resume from "./pages/Resume";
import Resumes from "./pages/Resumes";
import Message from "./pages/Message";
import Messages from "./pages/Messages";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Contact from "./pages/Contact";
import FavoritePage from "./pages/FavoritePage";
import AddResume from "./pages/AddResume";
import "./App.css"

import {createBrowserRouter, RouterProvider, Outlet} from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
import MyResumes from "./pages/myResumes";

function App() {
  const queryClient = new QueryClient()
  
  const Layout = () => {
    return(
      <div className="app">
        <QueryClientProvider client={queryClient}>
          <Navbar/>
          <Outlet/>
          <Footer/>
        </QueryClientProvider>
      </div>
    );
  }

  //adding a router
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      children: [
        {
          path:"/",
          element:<Home/>
        },
        {
          path:"/register",
          element:<Register/>
        },
        {
          path:"/messages",
          element:<Messages/>
        },
        {
          path:"/message/:id",
          element:<Message/>
        },
        {
          path:"/login",
          element:<Login/>
        },
        {
          path:"/jobs",
          element:<Jobs/>
        },
        {
          path:"/job/:id",
          element:<Job/>
        },
        {
          path:"/myjobs",
          element:<MyJobs/>
        },
        {
          path:"/addjob",
          element:<AddJob/>
        },
        {
          path:"/applications",
          element:<Applications/>
        },
        {
          path:"/addresume",
          element:<AddResume/>
        },
        {
          path:"/resumes/:id",
          element:<Resume/>
        },
        {
          path:"/resumes",
          element:<Resumes/>
        },
        {
          path:"/myresumes",
          element:<MyResumes/>
        },
        {
          path:"/contact",
          element:<Contact/>
        },
        {
          path: "/favorite",
          element: <FavoritePage/>
        }
      ]
    },
  ]);

  return (
    <div>
      <RouterProvider router={ router } />
    </div>
  )
}

export default App
