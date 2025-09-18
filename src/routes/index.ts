import { createBrowserRouter } from 'react-router-dom'
import MainRoutes from '@/routes/MainRoutes'

const developmentRoutes = createBrowserRouter([...MainRoutes])

const productionRoutes = createBrowserRouter([...MainRoutes])

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
