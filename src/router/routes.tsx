import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy, Suspense } from 'react';

// import AuthGuard from './auth-guard';
// import { userHooks } from '@redux/user';

const Homepage = lazy(() => import('../pages/home/home.page'));
// const NotFound = lazy(() => import('./pages/not-found'));
// const About = lazy(() => import('./pages/about/about'));
// const ContactUs = lazy(() => import('./pages/contact-us'));
// const Checkout = lazy(() => import('./pages/checkout'));

export function AppRouter() {
  // const isAuthenticated = userHooks.isUserAuthenticated();

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Homepage />,
    },
    // {
    //   path: '/about',
    //   element: <About />,
    // },
    // {
    //   path: '/contact-us',
    //   element: <ContactUs />,
    // },
    // {
    //   path: '/checkout',
    //   element: (
    //     <AuthGuard isAuthenticated={isAuthenticated}>
    //       <Checkout />
    //     </AuthGuard>
    //   ),
    // },
    // {
    //   path: '*',
    //   element: <NotFound />,
    // },
  ]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
