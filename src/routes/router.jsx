import { createBrowserRouter } from "react-router";
import RootLayout from "../layout/RootLayout";
import Home from "../pages/Home/Home/Home";
import Coverage from "../pages/Coverage/Coverage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children:[
        {
            index: true,
            Component: Home
        },
        {
          path :'coverage',
          Component: Coverage,
          

        }
    ]
  },
])