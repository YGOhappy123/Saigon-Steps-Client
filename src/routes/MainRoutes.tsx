import { Suspense } from 'react'
import { Navigate } from 'react-router-dom'
import MainLayout from '@/layouts/MainLayout'
import HomePage from '@/pages/HomePage'
import AboutUsPage from '@/pages/AboutUsPage'
import OurServicesPage from '@/pages/OurServicesPage'
import PromotionsPage from '@/pages/PromotionsPage'
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
                element: <Navigate to="/trang-chu" replace />
            },
            {
                path: 'trang-chu',
                element: <HomePage />
            },
            {
                path: 'gioi-thieu',
                element: <AboutUsPage />
            },
            {
                path: 'dich-vu',
                element: <OurServicesPage />
            },
            {
                path: 'khuyen-mai',
                element: <PromotionsPage />
            }
        ]
    }
]

export default MainRoutes
