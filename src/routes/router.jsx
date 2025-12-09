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
        path: "coverage",
        element: <Coverage />,
      },
      {
        path: "services",
        element: <Services />,
        loader: () => fetch("http://localhost:3000/services"),
      },
      {
        path: "services/:id",
        element: <ServiceDetails />,
        loader: ({ params }) =>
          fetch(`http://localhost:3000/services/${params.id}`),
      },
      // Booking page route
      {
        path: "bookings/:serviceId",
        element: <BookingPage />,
          loader: ({ params }) =>
          fetch(`http://localhost:3000/services/${params.id}`)
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
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
      }
    ],
  },
]);
