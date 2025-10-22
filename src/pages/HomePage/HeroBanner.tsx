import { useNavigate } from 'react-router'
import { Button } from '@/components/ui/button'
import useMediaQuery from '@/hooks/useMediaQuery'

const HeroBanner = () => {
    const navigate = useNavigate()
    const isLg = useMediaQuery('(min-width: 1024px)')

    return (
        <section
            className="flex w-full justify-center lg:bg-[linear-gradient(to_right,var(--background)_50%,#e4e4e4_50%)]"
            style={{
                height: isLg ? 'calc(100vh - 136px)' : 'auto',
                minHeight: 600
            }}
        >
            <div className="max-w-container grid h-full w-full lg:grid-cols-[40%_60%] lg:bg-[linear-gradient(to_right,var(--background)_40%,#e4e4e4_40%)]">
                <div className="flex flex-col gap-6 px-4 py-24 lg:px-8">
                    <h1 className="text-3xl leading-snug font-bold tracking-wider text-balance capitalize lg:text-4xl xl:text-5xl">
                        find your "sole" mate with us!
                    </h1>
                    <p className="text-base">
                        Saigon Steps chuyên cung cấp các sản phẩm thời trang chất lượng cao với thiết kế trẻ trung và
                        phong cách. Chúng tôi cam kết mang lại trải nghiệm mua sắm hài lòng và sản phẩm phù hợp cho mọi
                        phong cách của bạn.
                    </p>
                    <Button
                        size="xl"
                        onClick={() => navigate('/products')}
                        className="bg-foreground text-background hover:bg-foreground/90 w-fit rounded-xs"
                    >
                        Xem sản phẩm
                    </Button>
                </div>
                <div className="relative flex flex-col bg-[#e4e4e4] px-4 pt-48 pb-24 lg:bg-none lg:pt-24">
                    <div
                        className="font-poppins text-background pointer-events-none absolute top-0 right-4 left-4 -translate-y-9 text-justify text-[90px] whitespace-nowrap uppercase select-none lg:top-4 lg:right-auto lg:bottom-4 lg:left-0 lg:-translate-x-9 lg:translate-y-0"
                        style={{
                            writingMode: isLg ? 'sideways-lr' : 'horizontal-tb',
                            textAlignLast: 'justify'
                        }}
                    >
                        u l t i m a t e
                    </div>
                    <div className="relative flex h-full w-full items-center justify-center">
                        <img
                            src="/images/hp-banner-shoes.png"
                            alt="banner image - white male shoes"
                            className="z-10 max-w-[80%]"
                        />
                        <img
                            src="/images/hp-banner-rings.png"
                            alt="banner image - rings"
                            className="absolute top-1/2 left-1/2 max-w-[80%] -translate-x-[50%] -translate-y-[50%]"
                        />
                        <img
                            src="/images/hp-banner-curves.png"
                            alt="banner image - curves"
                            className="absolute top-1/2 left-1/2 z-20 max-w-[44%] -translate-x-[42%] -translate-y-[40%]"
                        />
                    </div>
                    <div className="relative flex justify-center">
                        <i className="text-xl font-medium text-[#000000]">
                            Saigon Steps ~ <i className="text-[#000000]/65">Where Style Begins!</i>
                        </i>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroBanner
