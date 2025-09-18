import { Outlet } from 'react-router-dom'

const MainLayout = () => {
    return (
        <div className="flex min-h-screen flex-col">
            <main>
                <Outlet />
            </main>
        </div>
    )
}

export default MainLayout
