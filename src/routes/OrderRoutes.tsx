import { Suspense } from 'react'
import AuthProtector from '@/components/container/AuthProtector'
import FragmentLayout from '@/layouts/FragmentLayout'
import ThankYouPage from '@/pages/ThankYouPage'
import ErrorPage from '@/pages/ErrorPage'

const OrderRoutes = [
    {
        path: '/don-hang',
        element: (
            <Suspense>
                <FragmentLayout />
            </Suspense>
        ),
        errorElement: <ErrorPage />,
        children: [
            {
                path: 'tri-an/:orderId?',
                element: <AuthProtector children={<ThankYouPage />} redirect="/xac-thuc" />
            }
        ]
    }
]

export default OrderRoutes
