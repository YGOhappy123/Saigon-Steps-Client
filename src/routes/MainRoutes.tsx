import { Suspense } from 'react'
import MainLayout from '@/layouts/MainLayout'
import HomePage from '@/pages/HomePage'
// import AboutPage from '@/pages/AboutPage'
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
            }
            // {
            //     path: 'about-us',
            //     element: <AboutPage />
            // }
        ]
    }
]

export default MainRoutes
