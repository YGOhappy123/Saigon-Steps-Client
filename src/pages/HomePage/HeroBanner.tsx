import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import useMediaQuery from '@/hooks/useMediaQuery'
import ThreeDimensionalShoeModel from '@/pages/HomePage/ThreeDimensionalShoeModel'

const HeroBanner = () => {
    const navigate = useNavigate()
    const isLg = useMediaQuery('(min-width: 1024px)')

    return (
        <section
            className="flex w-full justify-center"
            style={{
                height: isLg ? 'calc(100vh - 136px)' : 'auto',
                minHeight: 600,
                background: isLg
                    ? 'linear-gradient(to bottom, #dedee1, #dadade, #d2d2d6, #cacace, #b8b7bc, #acaaaf)'
                    : undefined,
                backgroundSize: isLg ? '50% 100%' : undefined,
                backgroundPosition: isLg ? 'right top' : undefined,
                backgroundRepeat: isLg ? 'no-repeat' : undefined
            }}
        >
            <div className="max-w-container grid h-full w-full lg:grid-cols-[40%_60%] lg:bg-[linear-gradient(to_right,var(--background)_40%,transparent_40%)]">
                <div className="flex flex-col gap-6 px-4 py-24 lg:px-8">
                    <h1 className="text-3xl leading-snug font-bold tracking-wider text-balance capitalize lg:text-4xl xl:text-5xl">
                        find your "sole" mate with us!
                    </h1>
                    <p className="text-justify text-base">
                        Saigon Steps chuyên cung cấp các sản phẩm thời trang chất lượng cao với thiết kế trẻ trung và
                        phong cách. Chúng tôi cam kết mang lại trải nghiệm mua sắm hài lòng và sản phẩm phù hợp cho mọi
                        phong cách của bạn.
                    </p>
                    <Button
                        size="xl"
                        onClick={() => navigate('/san-pham')}
                        className="bg-foreground text-background hover:bg-foreground/90 w-fit rounded-xs"
                    >
                        Xem sản phẩm
                    </Button>
                </div>

                <div className="relative">
                    <div
                        className="font-poppins text-background pointer-events-none absolute top-0 right-4 left-4 z-[1] -translate-y-9 text-justify text-[90px] whitespace-nowrap uppercase select-none lg:top-4 lg:right-auto lg:bottom-4 lg:left-0 lg:-translate-x-9 lg:translate-y-0"
                        style={{
                            writingMode: isLg ? 'sideways-lr' : 'horizontal-tb',
                            textAlignLast: 'justify'
                        }}
                    >
                        u l t i m a t e
                    </div>

                    <ThreeDimensionalShoeModel />
                </div>
            </div>
        </section>
    )
}

export default HeroBanner
