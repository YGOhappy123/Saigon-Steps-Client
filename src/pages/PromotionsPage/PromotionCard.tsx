import { useNavigate } from 'react-router-dom'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { twMerge } from 'tailwind-merge'
import { Barcode, ScanBarcode, TicketCheck } from 'lucide-react'
import striptags from 'striptags'
import dayjs from '@/libs/dayjs'

type PromotionCardProps = {
    promotion: IPromotion
    index: number
}

const PromotionCard = ({ promotion, index }: PromotionCardProps) => {
    const navigate = useNavigate()
    const isOdd = (index + 1) % 2 !== 0

    return (
        <div
            className={twMerge(
                'relative flex min-h-[450px] justify-center rounded-[20px] py-12',
                isOdd ? 'bg-pink' : 'bg-orange'
            )}
        >
            <Carousel
                className="w-full"
                style={{
                    maxWidth: 'calc(100% - 128px)'
                }}
            >
                <CarouselPrevious className="border-none" />
                <div className={twMerge('flex', isOdd ? 'flex-row' : 'flex-row-reverse')}>
                    <div className="shrink-0 lg:w-[300px]"></div>
                    <div className="flex-1">
                        <div className="flex flex-col gap-2">
                            <h3 className="text-3xl font-medium text-white">
                                {promotion.name} {promotion.name}
                            </h3>
                            <p className="flex items-center gap-3 text-justify text-white/80">
                                <span className="font-medium">Giảm giá: </span>
                                <div
                                    className={twMerge(
                                        'flex items-center gap-2 rounded bg-white px-2.5 py-0.5 text-base',
                                        isOdd ? 'text-pink-400' : 'text-orange-400'
                                    )}
                                >
                                    <TicketCheck size={24} />{' '}
                                    <span className="text-lg font-semibold">
                                        {promotion.discountRate.toString().padStart(2, '0')}%
                                    </span>
                                </div>
                                <span className="font-medium">Áp dụng cho:</span>
                                <div
                                    className={twMerge(
                                        'flex items-center gap-2 rounded bg-white px-2.5 py-0.5 text-base',
                                        isOdd ? 'text-pink-400' : 'text-orange-400'
                                    )}
                                >
                                    <ScanBarcode size={24} />{' '}
                                    <span className="text-lg font-semibold">
                                        {promotion.products?.length.toString().padStart(2, '0')} sản phẩm
                                    </span>
                                </div>
                            </p>
                            <p className="text-justify text-white/80">
                                <span className="font-medium">Thời gian áp dụng: </span>
                                {dayjs(promotion.startDate).format('DD/MM/YYYY')} {'-'}
                                {dayjs(promotion.endDate).format('DD/MM/YYYY')}
                            </p>
                            <p className="text-justify text-white/80">
                                <span className="font-medium">Mô tả: </span>
                                {promotion.description}
                            </p>
                        </div>

                        <CarouselContent>
                            {(promotion.products as IRootProduct[]).map(product => (
                                <CarouselItem key={product.rootProductId}>
                                    <div className="flex flex-col gap-3 pt-6 pb-12">
                                        <div className="grid w-fit grid-cols-5 gap-3">
                                            {(product.images ?? []).slice(0, 5).map((image, index) => (
                                                <div
                                                    key={index}
                                                    className={twMerge(
                                                        'flex w-[80px] items-center justify-center overflow-hidden rounded-xl border-2',
                                                        isOdd ? 'border-pink-400' : 'border-orange-400'
                                                    )}
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
                                            <h3 className="line-clamp-1 text-xl font-medium text-white">
                                                {product.name}
                                            </h3>
                                            <p className="line-clamp-3 text-justify text-white/80">
                                                {striptags(product.description)}
                                            </p>
                                        </div>

                                        {/* Shadcn-UI button might break the UI */}
                                        <button
                                            className="h-10 w-fit cursor-pointer rounded-md bg-white px-6 text-sm font-medium text-black shadow-xs hover:bg-white/80"
                                            onClick={() => navigate(`/san-pham/${product.slug}`)}
                                        >
                                            Xem chi tiết
                                        </button>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </div>
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

            {isOdd ? (
                <img
                    src="/images/promotion-card-high-heels.png"
                    alt="banner image - lady wearing red high heels"
                    className="absolute top-0 left-[90px] h-[430px]"
                />
            ) : (
                <img
                    src="/images/promotion-card-leather-shoes.png"
                    alt="banner image - man wearing leather shoes"
                    className="absolute top-0 right-[70px] h-[430px]"
                />
            )}
        </div>
    )
}

export default PromotionCard
