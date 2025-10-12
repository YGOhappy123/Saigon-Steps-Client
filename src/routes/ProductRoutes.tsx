import { Suspense } from 'react'
import MainLayout from '@/layouts/MainLayout'
import ProductsDisplayPage from '@/pages/ProductsDisplayPage'
import ProductDetailPage from '@/pages/ProductDetailPage'
import ErrorPage from '@/pages/ErrorPage'

const ProductRoutes = [
    {
        path: '/products',
        element: (
            <Suspense>
                <MainLayout />
            </Suspense>
        ),
        errorElement: <ErrorPage />,
        children: [
            {
                path: '',
                element: <ProductsDisplayPage />
            },
            {
                path: ':slug',
                element: <ProductDetailPage />
            }
        ]
    }
]

export default ProductRoutes
