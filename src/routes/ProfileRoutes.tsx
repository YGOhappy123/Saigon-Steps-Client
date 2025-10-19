import { Suspense } from 'react'
import { Navigate } from 'react-router-dom'
import AuthProtector from '@/components/container/AuthProtector'
import ProfileLayout from '@/layouts/ProfileLayout'
import EditProfilePage from '@/pages/EditProfilePage'
import ChatPage from '@/pages/ChatPage'
import ChangePasswordPage from '@/pages/ChangePasswordPage'
import OrderManagementPage from '@/pages/OrderManagementPage'
import AddressManagementPage from '@/pages/AddressManagementPage'
import ErrorPage from '@/pages/ErrorPage'

const ProfileRoutes = [
    {
        path: '/profile',
        element: (
            <Suspense>
                <AuthProtector children={<ProfileLayout />} redirect="/auth" />
            </Suspense>
        ),
        errorElement: <ErrorPage />,
        children: [
            {
                path: '',
                element: <Navigate to="/profile/edit" replace />
            },
            {
                path: 'edit',
                element: <EditProfilePage />
            },
            {
                path: 'change-password',
                element: <ChangePasswordPage />
            },
            {
                path: 'chat',
                element: <ChatPage />
            },
            {
                path: 'orders',
                element: <OrderManagementPage />
            },
            {
                path: 'addresses',
                element: <AddressManagementPage />
            }
        ]
    }
]

export default ProfileRoutes
