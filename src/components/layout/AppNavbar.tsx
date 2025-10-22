import { NavLink } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'
import { NAVIGATION_TABS } from '@/configs/constants'

const AppNavbar = () => {
    return (
        <nav className="bg-background sticky top-0 z-[1000] flex w-full justify-center border-b shadow-md">
            <div className="max-w-container flex w-full items-center justify-between gap-10 p-4 lg:gap-15 xl:gap-25">
                <div className="flex w-full items-start justify-center gap-8 lg:gap-6 xl:gap-8">
                    {NAVIGATION_TABS.map(tab => (
                        <NavLink key={tab.href} to={tab.href}>
                            {({ isActive }) => (
                                <div
                                    className={twMerge(
                                        'hover:text-primary relative flex items-center gap-2 px-2 text-center font-semibold tracking-wide capitalize transition-colors',
                                        isActive ? 'text-primary' : 'text-muted-foreground'
                                    )}
                                >
                                    {<tab.Icon size={18} className="hidden lg:block" />}
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
