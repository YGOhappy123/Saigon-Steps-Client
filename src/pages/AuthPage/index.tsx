import { useEffect, useState } from 'react'
import { Navigate, useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import { AUTH_CAROUSEL_IMAGES, AUTH_CAROUSEL_VIDEOS } from '@/configs/constants'
import { RootState } from '@/store'
import useTitle from '@/hooks/useTitle'
import toastConfig from '@/configs/toast'
import SignInForm from '@/pages/AuthPage/SignInForm'
import SignUpForm from '@/pages/AuthPage/SignUpForm'
import ForgotPasswordForm from '@/pages/AuthPage/ForgotPasswordForm'
import ResetPasswordForm from '@/pages/AuthPage/ResetPasswordForm'
import AuthCarousel from '@/components/common/AuthCarousel'

export type FormType = 'login' | 'register' | 'forgot' | 'reset'

const AuthPage = () => {
    useTitle('Saigon Steps | Đăng nhập')
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const { isLogged } = useSelector(
        (state: RootState) => state.auth,
        () => true
    )
    const [query] = useSearchParams()
    const [formType, setFormType] = useState<FormType>('login')

    useEffect(() => {
        if (query.get('type')) {
            setFormType(query.get('type') as FormType)
        }
    }, [query])

    if (isLogged) {
        toast(
            'Bạn đã đăng nhập rồi. Nếu bạn muốn sử dụng một tài khoản khác, vui lòng đăng xuất khỏi tài khoản hiện tại.',
            toastConfig('info')
        )
        return <Navigate to="/" />
    } else {
        return (
            <div className="bg-primary flex h-screen w-full items-center justify-center">
                <div className="bg-primary-foreground flex gap-3 rounded-xl p-3">
                    <div>
                        <AuthCarousel
                            images={AUTH_CAROUSEL_IMAGES}
                            videos={AUTH_CAROUSEL_VIDEOS}
                            size={{
                                width: 500,
                                height: 620
                            }}
                            autoplayDuration={2000}
                        />
                    </div>

                    <div className="h-[620px] w-[500px]">
                        {formType === 'login' && <SignInForm changeFormType={setFormType} />}
                        {formType === 'register' && <SignUpForm changeFormType={setFormType} />}
                        {formType === 'forgot' && <ForgotPasswordForm changeFormType={setFormType} />}
                        {formType === 'reset' && <ResetPasswordForm changeFormType={setFormType} />}
                    </div>
                </div>
            </div>
        )
    }
}

export default AuthPage
