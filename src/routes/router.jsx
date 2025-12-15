import { createBrowserRouter } from "react-router";
import RootLayout from "../layout/RootLayout";
import Home from "../pages/Home/Home/Home";
import Coverage from "../pages/Coverage/Coverage";
import AuthLayout from "../layout/AuthLayout";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import DashboardLayout from "../layout/DashboardLayout";
import PrivateRoute from "./PrivateRoute";
import MyBookings from "../pages/Dashboard/MyBookings/MyBookings";
import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory";
import Services from "../pages/Services/Services";
import ServiceDetails from "../pages/ServiceDetails/ServiceDetails";
import BookingPage from "../pages/BookingPage/BookingPage"; // <-- new import
import Payment from "../pages/Dashboard/Payment/Payment";
import PaymentSuccess from "../pages/Dashboard/Payment/PaymentSuccess";
import PaymentCancelled from "../pages/Dashboard/Payment/PaymentCancelled";
import Decorator from "../pages/Decorator/Decorator";
import ApproveDecorator from "../pages/Dashboard/Approvedecorator/ApproveDecorator";
import AddService from "../pages/Dashboard/AddService/AddService";
import MyProfile from "../pages/Dashboard/MyProfile/MyProfile";
import AdminRoute from "./AdminRoute";
import AssignDecorator from "../pages/Dashboard/AssignDecorator/AssignDecorator";
import DecoratorRoute from "./DecoratorRoute";
import AssignedDecorator from "../pages/Dashboard/AssignedDecortor/AssignedDecortor";
import Revenue from "../pages/Revenue/Revenue";
import Demand from "../pages/Dashboard/Demand/Demand";
import Todays from "../pages/Dashboard/Todays/Todays";
import ErrorPage from "../pages/Error/Error";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import PublicRoute from "./PublicRoute";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
       path: 'about',
       element: <About></About>
      },
      {
       path: 'contact',
       element:<Contact></Contact>
      },
      {
       path: 'decorator',
       element:<PrivateRoute><Decorator></Decorator></PrivateRoute>
      },
      {
        path: "coverage",
        element: <Coverage />,
      },
      {
        path: "services",
        element: <Services />,
        loader: () => fetch("https://xdecor.vercel.app/services"),
      },
      {
        path: "services/:id",
        element: <ServiceDetails />,
        loader: ({ params }) =>
          fetch(`https://xdecor.vercel.app/services/${params.id}`),
      },
      // Booking page route
      {
        path: "bookings/:serviceId",
        element: <PrivateRoute><BookingPage /></PrivateRoute>,
          loader: ({ params }) =>
          fetch(`https://xdecor.vercel.app/services/${params.id}`)
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
       {
      path: "login",
      element: (
        <PublicRoute>
          <Login />
        </PublicRoute>
      ),
    },
    {
      path: "register",
      element: (
        <PublicRoute>
          <Register />
        </PublicRoute>
      ),
    },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
      
    ),
    children: [
    {
      index: true,      // 👈 default route
      Component: MyProfile
    },


      {

        path: "my-bookings",
        element: <MyBookings />,
        
      },
      {
        path: "payment-history",
        element: <PaymentHistory />,
      },
      {
        path:'payment/:bookingId',
        Component: Payment
      },
      {
        path: 'payment-success',
        Component: PaymentSuccess
      },
      {
        path: 'payment-cancelled',
        Component: PaymentCancelled
      },
      {
        path:'approve-decorator',
        element: <AdminRoute><ApproveDecorator></ApproveDecorator></AdminRoute>
      },{
        path:'/dashboard/add-services',
        element: <AdminRoute><AddService></AddService></AdminRoute>
      },
      {
        path:'/dashboard/assign-decorator',
        element: <AdminRoute><AssignDecorator></AssignDecorator></AdminRoute>
      },
      {
        path:'/dashboard/revenue',
        element: <AdminRoute><Revenue></Revenue></AdminRoute>
      },
            {
        path:'/dashboard/demand',
        element: <AdminRoute><Demand></Demand></AdminRoute>
      },
      {
        path:'assigned-decorators',
        element: <DecoratorRoute><AssignedDecorator></AssignedDecorator>  </DecoratorRoute>
      },
      {
        path:'todays',
        element: <DecoratorRoute><Todays></Todays></DecoratorRoute>
      }
    ],
  },  {
    path: "*",
    element: <ErrorPage />,
  },
]);
