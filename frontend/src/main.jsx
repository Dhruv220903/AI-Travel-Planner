import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider, createBrowserRouter, Outlet } from 'react-router-dom'
import CreateTrip from './create-trip/index.jsx'
import Header from "./components/custom/Header.jsx"
import { Toaster } from "@/components/ui/sonner"
import { GoogleOAuthProvider } from '@react-oauth/google'
import ViewTrip from './view-trip/[tripId]/index.jsx'
import myTrips from './my-trips/index.jsx'
import MyTrips from './my-trips/index.jsx'

// ✅ Layout wrapper to include Header inside the Router
function Layout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />, // Wrap routes with Layout that includes Header
    children: [
      {
        index: true,
        element: <App />
      },
      {
        path: 'create-trip',
        element: <CreateTrip />
      },
      {
        path: 'view-trip/:tripId',
        element: <ViewTrip />
      },
      {
        path:'my-trips',
        element: <MyTrips/>
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
      <RouterProvider router={router} />
      <Toaster />
    </GoogleOAuthProvider>
  </StrictMode>
)
