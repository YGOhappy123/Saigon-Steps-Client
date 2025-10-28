import { Suspense } from 'react'
import MainLayout from '@/layouts/MainLayout'
import HomePage from '@/pages/HomePage'
import AboutUsPage from '@/pages/AboutUsPage'
import OurServicesPage from '@/pages/OurServicesPage'
import ErrorPage from '@/pages/ErrorPage'

const MainRoutes = [
    {
        path: '/',
        element: (
            <Suspense>
                <MainLayout />
            </Suspense>
        ),
        errorElement: <ErrorPage />,
        children: [
            {
                path: '',
                element: <HomePage />
            },
            {
                path: 'about-us',
                element: <AboutUsPage />
            },
            {
                path: 'our-services',
                element: <OurServicesPage />
            }
        ]
    }
]

export default MainRoutes
