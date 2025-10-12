import { NavLink, useNavigate } from 'react-router-dom'
import { Fish, ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { NAVIGATION_TABS } from '@/configs/constants'
import { twMerge } from 'tailwind-merge'
// import categoryService from '@/services/categoryService'

const AppNavbar = () => {
    const navigate = useNavigate()
    const { isLogged } = useSelector((state: RootState) => state.auth)

    return (
        <nav className="bg-background sticky top-0 z-[10] flex w-full justify-center border-b shadow-md">
            <div className="max-w-container flex w-full items-center justify-between gap-10 p-4 lg:gap-15 xl:gap-25">
                <div className="flex w-full items-start justify-center gap-8 lg:gap-10 xl:gap-12">
                    {/* <div className="mr-auto grid shrink-0 grid-cols-2 justify-center gap-4">
                        <Button size="lg" className="shrink-0 rounded-full" onClick={() => navigate('/about-us')}>
                            <ShoppingBag />
                            Giới thiệu cửa hàng
                        </Button>
                        <Button size="lg" className="shrink-0 rounded-full" onClick={() => navigate('/products')}>
                            <Fish />
                            Tất cả sản phẩm
                        </Button>
                    </div>

                    <div className="flex items-center justify-between gap-4 overflow-hidden lg:gap-6 xl:gap-8">
                        {categories.slice(0, 6).map(category => (
                            <DropdownMenu key={category.categoryId}>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="lg" className="rounded-full">
                                        {category.name}
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuLabel>{category.name}</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                        className="cursor-pointer"
                                        onClick={() => navigate(`/products?category=${category.name.toLowerCase()}`)}
                                    >
                                        {category.name}
                                    </DropdownMenuItem>

                                    {categoryGroup[category.categoryId] &&
                                        categoryGroup[category.categoryId].map(child => (
                                            <DropdownMenuItem
                                                key={child.categoryId}
                                                className="cursor-pointer"
                                                onClick={() =>
                                                    navigate(`/products?category=${child.name.toLowerCase()}`)
                                                }
                                            >
                                                {child.name}
                                            </DropdownMenuItem>
                                        ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ))}
                    </div> */}

                    {NAVIGATION_TABS.map(tab => (
                        <NavLink key={tab.href} to={tab.href}>
                            {({ isActive }) => (
                                <div
                                    className={twMerge(
                                        'hover:text-primary relative px-2 font-semibold tracking-wide uppercase transition-colors',
                                        isActive ? 'text-primary' : 'text-muted-foreground'
                                    )}
                                >
                                    {tab.label}

                                    <span
                                        className={twMerge(
                                            'bg-primary absolute -bottom-4 left-0 h-1 w-full transition-all duration-300',
                                            isActive ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
                                        )}
                                    />
                                </div>
                            )}
                        </NavLink>
                    ))}
                </div>
            </div>
        </nav>
    )
}

export default AppNavbar
