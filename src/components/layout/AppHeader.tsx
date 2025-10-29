import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { MessageCircleMore, ShoppingCart } from 'lucide-react'
import { RootState } from '@/store'
import { signOut } from '@/slices/authSlice'
import { Button } from '@/components/ui/button'
import AppLogo from '@/components/common/AppLogo'
import CustomerCart from '@/components/layout/CustomerCart'
import ThemeToggler from '@/components/common/ThemeToggler'
import AudioToggler from '@/components/common/AudioToggler'
import HeaderSearchbar from '@/components/layout/HeaderSearchbar'
import toastConfig from '@/configs/toast'

const AppHeader = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user, isLogged } = useSelector((state: RootState) => state.auth)

    return (
        <header className="bg-background z-[20] flex w-full justify-center">
            <div className="max-w-container flex w-full items-center justify-between gap-10 p-4 lg:gap-15 xl:gap-25">
                <Link to="/">
                    <AppLogo className="px-0" />
                </Link>

                <HeaderSearchbar />

                <div className="flex items-center">
                    {isLogged ? (
                        <>
                            <CustomerCart
                                trigger={
                                    <Button variant="ghost" size="icon">
                                        <ShoppingCart />
                                    </Button>
                                }
                            />
                            <ThemeToggler />
                            <AudioToggler />
                            <Button
                                variant="ghost"
                                size="icon"
                                className="hidden lg:inline-flex"
                                onClick={() => navigate('/trang-ca-nhan/tro-chuyen')}
                            >
                                <MessageCircleMore />
                            </Button>

                            {user?.avatar && (
                                <Button
                                    variant="ghost"
                                    size="xl"
                                    className="border-primary bg-primary/80 ml-1 flex aspect-square items-center justify-center overflow-hidden rounded-full border-2 p-0"
                                    onClick={() => navigate('/trang-ca-nhan/cap-nhat-thong-tin')}
                                >
                                    <img src={user.avatar} alt="user avatar" className="h-full w-full object-cover" />
                                </Button>
                            )}
                        </>
                    ) : (
                        <>
                            <ThemeToggler />
                            <AudioToggler />
                        </>
                    )}

                    <Button
                        size="xl"
                        className="ml-3 rounded-full text-base capitalize"
                        onClick={() => {
                            if (isLogged) {
                                dispatch(signOut())
                                navigate('/')
                                toast('Đăng xuất thành công', toastConfig('success'))
                            } else {
                                navigate('/xac-thuc')
                            }
                        }}
                    >
                        {isLogged ? 'Đăng xuất' : 'Đăng nhập'}
                    </Button>
                </div>
            </div>
        </header>
    )
}

export default AppHeader
