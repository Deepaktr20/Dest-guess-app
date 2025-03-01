import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Auth from "./auth/Auth";
import Destination from "./components/Destination";

function App(){
    const router=createBrowserRouter([
        {
            index:true,
            path:"/",
            element:<Auth/>
        },
        {
            path:"/home",
            element:<Destination/>
        }
    ])
    return(
        <div>
            <RouterProvider router={router}/>
        </div>
    )
}
export default App;