import { createBrowserRouter } from "react-router";

// Layout Components
import RootLayout from "../layout/RootLayout";
import AuthLayout from "../layout/AuthLayout";
import DashboardLayout from "../layout/DashboardLayout";

// Route Guards
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import DecoratorRoute from "./DecoratorRoute";
import PublicRoute from "./PublicRoute";

// Public Pages
import Home from "../pages/Home/Home/Home";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import Coverage from "../pages/Coverage/Coverage";
import Services from "../pages/Services/Services";
import ServiceDetails from "../pages/ServiceDetails/ServiceDetails";
import ErrorPage from "../pages/Error/Error";

// Authentication Pages
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";

// Protected Pages
import BookingPage from "../pages/BookingPage/BookingPage";
import Decorator from "../pages/Decorator/Decorator";

// Dashboard Pages - User
import MyProfile from "../pages/Dashboard/MyProfile/MyProfile";
import MyBookings from "../pages/Dashboard/MyBookings/MyBookings";
import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory";
import Payment from "../pages/Dashboard/Payment/Payment";
import PaymentSuccess from "../pages/Dashboard/Payment/PaymentSuccess";
import PaymentCancelled from "../pages/Dashboard/Payment/PaymentCancelled";

// Dashboard Pages - Admin
import ApproveDecorator from "../pages/Dashboard/Approvedecorator/ApproveDecorator";
import AddService from "../pages/Dashboard/AddService/AddService";
import AssignDecorator from "../pages/Dashboard/AssignDecorator/AssignDecorator";
import Revenue from "../pages/Revenue/Revenue";
import Demand from "../pages/Dashboard/Demand/Demand";

// Dashboard Pages - Decorator
import AssignedDecorator from "../pages/Dashboard/AssignedDecortor/AssignedDecortor";
import Todays from "../pages/Dashboard/Todays/Todays";

// API Base URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://xdecor.vercel.app';

/**
 * Application Router Configuration
 * 
 * Structure:
 * - Public routes (/, /about, /contact, etc.)
 * - Authentication routes (/login, /register)
 * - Protected routes (/dashboard/*)
 * - Error handling (404)
 */
export const router = createBrowserRouter([
  // ==================== PUBLIC ROUTES ====================
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "coverage",
        element: <Coverage />,
      },
      {
        path: "services",
        element: <Services />,
        loader: async () => {
          try {
            const response = await fetch(`${API_BASE_URL}/services`);
            if (!response.ok) throw new Error('Failed to fetch services');
            return response.json();
          } catch (error) {
            console.error('Services loader error:', error);
            return { services: [], error: error.message };
          }
        },
      },
      {
        path: "services/:id",
        element: <ServiceDetails />,
        loader: async ({ params }) => {
          try {
            const response = await fetch(`${API_BASE_URL}/services/${params.id}`);
            if (!response.ok) throw new Error('Service not found');
            return response.json();
          } catch (error) {
            console.error('Service details loader error:', error);
            throw new Response("Service Not Found", { status: 404 });
          }
        },
      },
      {
        path: "bookings/:serviceId",
        element: (
          <PrivateRoute>
            <BookingPage />
          </PrivateRoute>
        ),
        loader: async ({ params }) => {
          try {
            const response = await fetch(`${API_BASE_URL}/services/${params.serviceId}`);
            if (!response.ok) throw new Error('Service not found');
            return response.json();
          } catch (error) {
            console.error('Booking page loader error:', error);
            throw new Response("Service Not Found", { status: 404 });
          }
        },
      },
      {
        path: "decorator",
        element: (
          <PrivateRoute>
            <Decorator />
          </PrivateRoute>
        ),
      },
    ],
  },

  // ==================== AUTHENTICATION ROUTES ====================
  {
    path: "/auth",
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

  // Legacy auth routes (for backward compatibility)
  {
    path: "/login",
    element: (
      <AuthLayout>
        <PublicRoute>
          <Login />
        </PublicRoute>
      </AuthLayout>
    ),
  },
  {
    path: "/register",
    element: (
      <AuthLayout>
        <PublicRoute>
          <Register />
        </PublicRoute>
      </AuthLayout>
    ),
  },

  // ==================== DASHBOARD ROUTES ====================
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      // Default dashboard route
      {
        index: true,
        element: <MyProfile />,
      },

      // ========== USER ROUTES ==========
      {
        path: "profile",
        element: <MyProfile />,
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
        path: "payment/:bookingId",
        element: <Payment />,
      },
      {
        path: "payment-success",
        element: <PaymentSuccess />,
      },
      {
        path: "payment-cancelled",
        element: <PaymentCancelled />,
      },

      // ========== ADMIN ROUTES ==========
      {
        path: "approve-decorator",
        element: (
          <AdminRoute>
            <ApproveDecorator />
          </AdminRoute>
        ),
      },
      {
        path: "add-services",
        element: (
          <AdminRoute>
            <AddService />
          </AdminRoute>
        ),
      },
      {
        path: "assign-decorator",
        element: (
          <AdminRoute>
            <AssignDecorator />
          </AdminRoute>
        ),
      },
      {
        path: "revenue",
        element: (
          <AdminRoute>
            <Revenue />
          </AdminRoute>
        ),
      },
      {
        path: "demand",
        element: (
          <AdminRoute>
            <Demand />
          </AdminRoute>
        ),
      },

      // ========== DECORATOR ROUTES ==========
      {
        path: "assigned-decorators",
        element: (
          <DecoratorRoute>
            <AssignedDecorator />
          </DecoratorRoute>
        ),
      },
      {
        path: "todays",
        element: (
          <DecoratorRoute>
            <Todays />
          </DecoratorRoute>
        ),
      },
    ],
  },

  // ==================== ERROR HANDLING ====================
  {
    path: "*",
    element: <ErrorPage />,
  },
]);
