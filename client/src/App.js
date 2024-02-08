import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { Scrollbars } from 'react-custom-scrollbars-2';
import { useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";

import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Single from "./pages/Single";
import { useContext } from "react";
import Login from "./pages/Login";
import Write from "./pages/Write";
import Home from "./pages/Home";
import Europe from "./pages/Europe";
import Asia from "./pages/Asia";
import Africa from "./pages/Africa";
import Summer from "./pages/Summer";
import Winter from "./pages/Winter";
import History from "./pages/History";
import Nature from "./pages/Nature";
import Users from "./pages/Users";
import Reservations from "./pages/Reservations";



const Layout = ( ) => {

  const location = useLocation();

  const isHomePage = location.pathname === "/";


 

  return (
    <div> 
      <Scrollbars style={{ width: '100%', height: '100vh' }} autoHide >
      <Navbar/>
      <Outlet/>
      
      </Scrollbars>
    </div>
  )
}






const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      {
        path: "/",
        element: <Home/>,
      },
      {
        path: "/trip/:id",
        element: <Single/>,
      },
      {
        path: "/write",
        element: <Write/>,
      },
      {
        path: "/users",
        element: <Users/>,
      },
      {
        path: "/profile",
        element: <Profile/>,
      },
      {
        path: "/Europe",
        element: <Europe/>,
      },
      {
        path: "/Africa",
        element: <Africa/>,
      },
      {
        path: "/Asia",
        element: <Asia/>,
      },
      {
        path: "/Summer",
        element: <Summer/>,
      },
      {
        path: "/Winter",
        element: <Winter/>,
      },
      {
        path: "/History",
        element: <History/>,
      },
      {
        path: "/Nature",
        element: <Nature/>,
      },
      {
        path: "/register",
        element: <Register/>,
      },
      {
        path: "/login",
        element: <Login/>,
      },
      
      {
        path: "/Reservations",
        element: <Reservations/>,
      },
      
    ],
  },
  
]);

function App() {
  return (
    <div className="app">
      <div>
     <RouterProvider router={router} />
     </div>
    </div>
  );
}

export default App;
