import { useNavigate } from 'react-router-dom'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { Button } from '@/components/ui/button'
import striptags from 'striptags'

type ExploreBannerProps = {
    products: IRootProduct[]
}

const ExploreBanner = ({ products }: ExploreBannerProps) => {
    const navigate = useNavigate()

    return (
        <section className="bg-background flex w-full justify-center">
            <div className="max-w-container flex w-full flex-col items-center px-4 py-24">
                <h2 className="font-[Dancing_Script] text-4xl capitalize">Khám phá</h2>

                <div className="bg-pink relative mt-11 flex h-[450px] w-full justify-center rounded-[20px]">
                    <Carousel
                        className="w-full"
                        style={{
                            maxWidth: 'calc(100% - 128px)'
                        }}
                    >
                        <CarouselPrevious className="border-none" />
                        <div className="flex">
                            <div className="shrink-0 lg:w-[300px]"></div>
                            <CarouselContent>
                                {products
                                    .filter(product => !product.isAccessory)
                                    .map(product => (
                                        <CarouselItem key={product.rootProductId}>
                                            <div className="flex flex-col gap-3 p-12">
                                                <div className="flex items-center gap-3">
                                                    {(product.images ?? []).slice(0, 5).map((image, index) => (
                                                        <div
                                                            key={index}
                                                            className="flex w-[80px] items-center justify-center overflow-hidden rounded-xl border-2 border-red-400"
                                                        >
                                                            <img
                                                                src={image as string}
                                                                alt="product image"
                                                                className="aspect-square h-full w-full rounded-lg object-cover"
                                                            />
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="flex flex-col gap-2">
                                                    <h3 className="line-clamp-1 text-3xl font-medium text-white">
                                                        {product.name}
                                                    </h3>
                                                    <p className="line-clamp-3 text-white/80">
                                                        {striptags(product.description)}
                                                    </p>
                                                </div>
                                                <Button
                                                    size="lg"
                                                    variant="secondary"
                                                    className="w-fit"
                                                    onClick={() => navigate(`/products/${product.slug}`)}
                                                >
                                                    Xem chi tiết
                                                </Button>
                                            </div>
                                        </CarouselItem>
                                    ))}
                            </CarouselContent>
                        </div>
                        <CarouselNext className="border-none" />
                    </Carousel>

                    <div
                        className="font-poppins pointer-events-none absolute bottom-0 left-0 translate-y-9 overflow-hidden px-4 text-justify text-[90px] tracking-wide whitespace-nowrap text-white/30 uppercase italic select-none lg:translate-y-12 lg:text-[120px]"
                        style={{
                            maxWidth: 'calc(100% - 32px)'
                        }}
                    >
                        Saigon Steps
                    </div>

                    <img
                        src="/images/explore-banner-shoes.png"
                        alt="banner image - man wearing brown shoes"
                        className="absolute bottom-0 left-[90px] hidden h-[510px] lg:block"
                    />
                </div>
            </div>
        </section>
    )
}

export default ExploreBanner
