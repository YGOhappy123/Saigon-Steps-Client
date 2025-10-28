import { Button } from '@/components/ui/button'
import useMediaQuery from '@/hooks/useMediaQuery'

const HeroBanner = () => {
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
                        Dịch vụ của chúng tôi
                    </h1>
                    <div className="flex flex-col gap-3">
                        <p className="text-justify text-base">
                            Tại Saigon Steps, chúng tôi không chỉ mang đến những đôi giày đẹp mắt mà còn cung cấp trải
                            nghiệm mua sắm toàn diện - nơi khách hàng được chăm sóc từ phong cách đến chất lượng và dịch
                            vụ sau bán hàng.
                        </p>
                        <p className="text-justify text-base">
                            Ngoài ra, chúng tôi còn cung cấp dịch vụ tùy chỉnh giày dép, giúp bạn tạo nên phong cách
                            riêng biệt và độc đáo.
                        </p>
                    </div>
                    <a href="#services">
                        <Button
                            size="xl"
                            className="bg-foreground text-background hover:bg-foreground/90 w-fit rounded-xs"
                        >
                            Xem thêm
                        </Button>
                    </a>
                </div>
                <div className="relative flex flex-col bg-[#e4e4e4] px-4 pt-48 pb-24 lg:bg-none lg:pt-24">
                    <div
                        className="font-poppins text-background pointer-events-none absolute top-0 right-4 left-4 -translate-y-9 text-justify text-[90px] whitespace-nowrap uppercase select-none lg:top-4 lg:right-auto lg:bottom-4 lg:left-0 lg:-translate-x-9 lg:translate-y-0"
                        style={{
                            writingMode: isLg ? 'sideways-lr' : 'horizontal-tb',
                            textAlignLast: 'justify'
                        }}
                    >
                        i n n o v a t e
                    </div>
                    <div className="relative flex h-full w-full items-center justify-center">
                        <img
                            src="/images/osp-banner-shoes.png"
                            alt="banner image - orange shoes"
                            className="z-10 max-w-[55%]"
                        />
                        <img
                            src="/images/osp-banner-paint.png"
                            alt="banner image - paint"
                            className="absolute top-1/2 left-1/2 w-full max-w-[80%] -translate-x-[50%] -translate-y-[50%] -rotate-45"
                        />
                    </div>
                    <div className="relative flex translate-y-5 flex-col items-center">
                        <span className="font-strasua text-4xl font-medium text-[#000000]">Saigon Steps</span>
                        <span className="-mt-1 font-medium text-[#000000]/65">Where Style Begins!</span>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroBanner
