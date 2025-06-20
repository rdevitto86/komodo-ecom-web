import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy, Suspense } from 'react';

const Home = lazy(() => import('./pages/home/home'));
const NotFound = lazy(() => import('./pages/not-found/not-found'));
const About = lazy(() => import('./pages/about/about'));
const ContactUs = lazy(() => import('./pages/contact-us/contact-us'));
const Checkout = lazy(() => import('./pages/checkout/checkout'));

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/about',
        element: <About />,
    },
    {
        path: '/contact-us',
        element: <ContactUs />,
    },
    {
        path: '/checkout',
        element: <Checkout />,
    },
    {
        path: '*',
        element: <NotFound />,
    },
]);

export function AppRouter() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
