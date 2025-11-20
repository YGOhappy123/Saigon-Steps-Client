import { Children } from 'react'
import { motion } from 'framer-motion'
import formatCurrency from '@/utils/formatCurrency'

type ThreeDimensionalOverlayProps = {
    open: boolean
}

const ThreeDimensionalOverlay = ({ open }: ThreeDimensionalOverlayProps) => {
    return (
        <div className="absolute top-1/2 left-1/2 w-[450px] -translate-x-1/2 -translate-y-1/2 border-l border-black pl-10 text-black select-none">
            <h1 className="font-major-mono-display mt-5 mb-4 text-3xl font-bold">36</h1>
            <AnimatedList open={open}>
                <h3 className="text-[5em] leading-none font-extrabold tracking-[-4px]">NIKE AIR</h3>
                <h3 className="text-[5em] leading-none font-extrabold tracking-[-4px]">“ZOOM”</h3>
                <h3 className="text-[5em] leading-none font-extrabold tracking-[-4px]">
                    <span
                        className="font-inter text-transparent"
                        style={{
                            WebkitTextStroke: '1px black'
                        }}
                    >
                        PEGASUS
                    </span>
                </h3>
                <p className="font-major-mono-display my-2 w-fit rounded-sm bg-black px-3 py-1 text-white/80">
                    {formatCurrency(3600000)}
                </p>
                <p
                    className="text-justify"
                    style={{
                        textAlignLast: 'left'
                    }}
                >
                    Thoáng khí hơn - Êm hơn - Mượt mà trên từng sải bước! Nike Air Zoom Pegasus 36 là phiên bản nâng cấp
                    của dòng Pegasus huyền thoại, hướng đến người chạy muốn sự cân bằng hoàn hảo giữa tốc độ, độ êm và
                    độ bền. Màu Gunsmoke / Black mang lại vẻ ngoài mạnh mẽ, hiện đại và dễ phối đồ cho cả luyện tập lẫn
                    đi lại hằng ngày.
                </p>
            </AnimatedList>
        </div>
    )
}

type AnimatedListProps = {
    children: React.ReactNode
    open: boolean
}

function AnimatedList({ children, open }: AnimatedListProps) {
    return (
        <motion.ul
            variants={{
                hidden: {
                    opacity: 0,
                    height: 0,
                    transition: { staggerChildren: 0.05 }
                },
                show: {
                    opacity: 1,
                    height: 'auto',
                    transition: { when: 'beforeChildren', staggerChildren: 0.05 }
                }
            }}
            initial="hidden"
            animate={open ? 'show' : 'hidden'}
        >
            {Children.map(children, child => (
                <li>
                    <motion.div
                        variants={{
                            hidden: { opacity: 0, y: '100%' },
                            show: { opacity: 1, y: 0 }
                        }}
                    >
                        {child}
                    </motion.div>
                </li>
            ))}
        </motion.ul>
    )
}

export default ThreeDimensionalOverlay
