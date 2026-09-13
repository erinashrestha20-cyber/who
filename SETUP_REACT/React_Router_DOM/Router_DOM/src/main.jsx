import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Layout';
import Home from './Components/Home/home';
import About from './Components/About/about';
import Contact from './Components/Contact/contact';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {path: "", element: <Home />}, /// by default, the home page will be rendered when the user visits the root path "/"
      {path: "about", element: <About />},
      {path: "contact", element: <Contact />}
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)


