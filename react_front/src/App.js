import App_bar from './components/App_bar'
import Side_bar from './components/Side_bar'
import Main_container from './components/Main_container'
import Login from './components/Login'
import Register from './components/Register'
import {
    createBrowserRouter,
    RouterProvider,
    Route,
  } from "react-router-dom";



  const router = createBrowserRouter([
    {
        path: "/",
        element: <><App_bar/><div id="main_window"><Side_bar/><Main_container/></div></>,
    },
    {
        path: "/login",
        element:  <Login/>,
    },
    {
        path: "/register",
        element: <Register/>,
    },
  ]);

function App(){
    return(
        <div>

            <RouterProvider router={router} />
            
        </div>
    );
}







export default App;
