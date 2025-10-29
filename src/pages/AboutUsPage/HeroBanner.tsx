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
                        Về Saigon Steps
                    </h1>
                    <div className="flex flex-col gap-3">
                        <p className="text-justify text-base">
                            Saigon Steps là thương hiệu chuyên về giày thời trang và phụ kiện dành cho những ai yêu sự
                            khác biệt, năng động và tinh tế.
                        </p>
                        <p className="text-justify text-base">
                            Ra đời từ niềm đam mê với thời trang đường phố và mong muốn mang lại trải nghiệm mua sắm
                            hiện đại, Saigon Steps không chỉ là một cửa hàng - mà là nơi mỗi bước chân được truyền cảm
                            hứng, nơi phong cách cá nhân được tỏa sáng.
                        </p>
                    </div>
                    <a href="#cau-chuyen">
                        <Button
                            size="xl"
                            className="bg-foreground text-background hover:bg-foreground/90 w-fit rounded-xs"
                        >
                            Câu chuyện thương hiệu
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
                        f o r w a r d
                    </div>
                    <div className="relative flex h-full w-full items-center justify-center">
                        <img
                            src="/images/aup-banner-shoes.png"
                            alt="banner image - colorful shoes"
                            className="z-10 max-w-[40%]"
                        />
                        <img
                            src="/images/aup-banner-paint.png"
                            alt="banner image - paint"
                            className="absolute top-1/2 left-1/2 max-w-[80%] -translate-x-[50%] -translate-y-[50%]"
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
