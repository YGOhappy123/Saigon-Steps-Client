import { Outlet } from 'react-router-dom'
import AppHeader from '@/components/layout/AppHeader'
import AppFooter from '@/components/layout/AppFooter'

const MainLayout = () => {
    return (
        <div className="flex min-h-screen flex-col">
            <AppHeader />

            <main>
                <Outlet />
            </main>

            <AppFooter />
        </div>
    )
}

export default MainLayout
