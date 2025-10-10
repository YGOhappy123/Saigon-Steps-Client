import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { onError } from '@/utils/errorsHandler'
import { setLogged, setUser, signOut } from '@/slices/authSlice'
import { resetAppState } from '@/slices/appSlice'
import { getMappedMessage } from '@/utils/resMessageMapping'
import useAxiosIns from '@/hooks/useAxiosIns'
import cookies from '@/libs/cookies'
import dayjs from '@/libs/dayjs'
import toastConfig from '@/configs/toast'

interface LoginResponse {
    user: ICustomer
    accessToken: string
    refreshToken: string
}

const authService = () => {
    const axios = useAxiosIns()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const signInMutation = useMutation({
        mutationFn: (account: { username: string; password: string }) =>
            axios.post<IResponseData<LoginResponse>>('/auth/sign-in', account),
        onError: onError,
        onSuccess: res => {
            const redirectPath = cookies.get('redirect_path_cli') || '/'
            const { user, accessToken, refreshToken } = res.data.data
            cookies.set('access_token_cli', accessToken, {
                path: '/',
                expires: new Date(dayjs(Date.now()).add(30, 'minutes').toISOString())
            })
            cookies.set('refresh_token_cli', refreshToken, {
                path: '/',
                expires: new Date(dayjs(Date.now()).add(30, 'days').toISOString())
            })

            navigate(redirectPath as string)
            dispatch(setLogged(true))
            dispatch(setUser(user))
            dispatch(resetAppState())
            toast(getMappedMessage(res.data.message), toastConfig('success'))
        }
    })

    const signUpMutation = useMutation({
        mutationFn: (data: { name: string; username: string; password: string; confirmPassword: string }) =>
            axios.post<IResponseData<LoginResponse>>('/auth/sign-up', data),
        onError: onError,
        onSuccess: res => {
            const redirectPath = cookies.get('redirect_path_cli') || '/'
            const { user, accessToken, refreshToken } = res.data.data
            cookies.set('access_token_cli', accessToken, {
                path: '/',
                expires: new Date(dayjs(Date.now()).add(30, 'minutes').toISOString())
            })
            cookies.set('refresh_token_cli', refreshToken, {
                path: '/',
                expires: new Date(dayjs(Date.now()).add(30, 'days').toISOString())
            })

            navigate(redirectPath as string)
            dispatch(setLogged(true))
            dispatch(setUser(user))
            dispatch(resetAppState())
            toast(getMappedMessage(res.data.message), toastConfig('success'))
        }
    })

    const forgotPasswordMutation = useMutation({
        mutationFn: ({ email }: { email: string }) =>
            axios.post<IResponseData<LoginResponse>>('/auth/forgot-password', { email }),
        onError: onError,
        onSuccess: res => {
            toast(getMappedMessage(res.data.message), toastConfig('success'))
        }
    })

    const resetPasswordMutation = useMutation({
        mutationFn: (data: { resetPasswordToken: string; password: string; confirmPassword: string }) =>
            axios.post<IResponseData<any>>('/auth/reset-password', data),
        onError: onError,
        onSuccess: res => {
            toast(getMappedMessage(res.data.message), toastConfig('success'))
        }
    })

    const changePasswordMutation = useMutation({
        mutationFn: ({
            oldPassword,
            newPassword,
            confirmPassword
        }: {
            oldPassword: string
            newPassword: string
            confirmPassword: string
        }) => axios.patch<IResponseData<any>>('/auth/change-password', { oldPassword, newPassword, confirmPassword }),
        onError: onError,
        onSuccess: res => {
            toast(getMappedMessage(res.data.message), toastConfig('success'))
        }
    })

    const googleAuthMutation = useMutation({
        mutationFn: (googleAccessToken: string) => axios.post('/auth/google-auth', { googleAccessToken }),
        onError: onError,
        onSuccess: res => {
            const redirectPath = cookies.get('redirect_path_cli') || '/'
            const { user, accessToken, refreshToken } = res.data.data
            cookies.set('access_token_cli', accessToken, {
                path: '/',
                expires: new Date(dayjs(Date.now()).add(30, 'minutes').toISOString())
            })
            cookies.set('refresh_token_cli', refreshToken, {
                path: '/',
                expires: new Date(dayjs(Date.now()).add(30, 'days').toISOString())
            })

            navigate(redirectPath as string)
            dispatch(setLogged(true))
            dispatch(setUser(user))
            dispatch(resetAppState())
            toast(getMappedMessage(res.data.message), toastConfig('success'))
        }
    })

    const deactivateAccountMutation = useMutation({
        mutationFn: () => axios.post<IResponseData<any>>(`/auth/deactivate-account`),
        onError: onError,
        onSuccess: res => {
            toast(getMappedMessage(res.data.message), toastConfig('success'))
            dispatch(signOut())
        }
    })

    return {
        signInMutation,
        signUpMutation,
        forgotPasswordMutation,
        resetPasswordMutation,
        changePasswordMutation,
        googleAuthMutation,
        deactivateAccountMutation
    }
}

export default authService
