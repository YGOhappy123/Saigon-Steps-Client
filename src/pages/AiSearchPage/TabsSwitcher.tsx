import { Image, Mic, TypeOutline } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

type TabsSwitcherProps = {
    isLoading: boolean
    activeTab: 'text' | 'image' | 'voice'
    setActiveTab: (tab: 'text' | 'image' | 'voice') => void
    containerClassName?: string
}

const TabsSwitcher = ({ isLoading, activeTab, setActiveTab, containerClassName }: TabsSwitcherProps) => {
    return (
        <div
            className={twMerge(
                'flex w-full items-center justify-between gap-10 border-b px-4 shadow-md lg:gap-15 xl:gap-25',
                containerClassName
            )}
        >
            <div className="grid w-full grid-cols-3 justify-center gap-8 lg:gap-6 xl:gap-8">
                {[
                    { value: 'text', label: 'Tìm kiếm bằng văn bản', Icon: TypeOutline },
                    { value: 'image', label: 'Tìm kiếm bằng hình ảnh', Icon: Image },
                    { value: 'voice', label: 'Tìm kiếm bằng giọng nói', Icon: Mic }
                ].map(tab => {
                    const isActive = activeTab === tab.value

                    return (
                        <div
                            key={tab.value}
                            className={twMerge(
                                'flex justify-center',
                                isLoading ? 'cursor-not-allowed' : 'cursor-pointer'
                            )}
                            onClick={() => {
                                if (!isLoading) {
                                    setActiveTab(tab.value as 'text' | 'image' | 'voice')
                                }
                            }}
                        >
                            <div
                                className={twMerge(
                                    'relative flex items-center gap-2 px-5 py-4 text-center font-semibold tracking-wide capitalize transition-colors',
                                    isActive ? 'text-primary' : 'text-muted-foreground',
                                    isLoading && !isActive ? 'opacity-50' : 'hover:text-primary'
                                )}
                            >
                                {<tab.Icon size={18} className="hidden shrink-0 lg:block" />}
                                {tab.label}

                                <span
                                    className={twMerge(
                                        'bg-primary absolute bottom-0 left-0 h-1 w-full transition-all duration-300',
                                        isActive ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
                                    )}
                                />
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default TabsSwitcher
