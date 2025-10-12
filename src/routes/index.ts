import { createBrowserRouter } from 'react-router-dom'
import MainRoutes from '@/routes/MainRoutes'
import ProductRoutes from '@/routes/ProductRoutes'
import AuthRoutes from '@/routes/AuthRoutes'
import ProfileRoutes from '@/routes/ProfileRoutes'

const developmentRoutes = createBrowserRouter([...MainRoutes, ...ProductRoutes, ...AuthRoutes, ...ProfileRoutes])

const productionRoutes = createBrowserRouter([...MainRoutes, ...ProductRoutes, ...AuthRoutes, ...ProfileRoutes])

const getRouter = (environment: 'development' | 'production') => {
    switch (environment) {
        case 'development':
            return developmentRoutes
        case 'production':
            return productionRoutes
        default:
            throw new Error('Invalid environment.')
    }
}

export default getRouter
