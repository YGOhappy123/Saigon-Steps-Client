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
        path: '/trang-ca-nhan',
        element: (
            <Suspense>
                <AuthProtector children={<ProfileLayout />} redirect="/xac-thuc" />
            </Suspense>
        ),
        errorElement: <ErrorPage />,
        children: [
            {
                path: '',
                element: <Navigate to="/trang-ca-nhan/cap-nhat-thong-tin" replace />
            },
            {
                path: 'cap-nhat-thong-tin',
                element: <EditProfilePage />
            },
            {
                path: 'doi-mat-khau',
                element: <ChangePasswordPage />
            },
            {
                path: 'tro-chuyen',
                element: <ChatPage />
            },
            {
                path: 'don-hang',
                element: <OrderManagementPage />
            },
            {
                path: 'dia-chi',
                element: <AddressManagementPage />
            }
        ]
    }
]

export default ProfileRoutes
