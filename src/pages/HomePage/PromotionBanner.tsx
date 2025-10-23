import { useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { SOCIAL_LINKS } from '@/configs/constants'
import useAxiosIns from '@/hooks/useAxiosIns'
import dayjs from '@/libs/dayjs'

const PromotionBanner = () => {
    const navigate = useNavigate()
    const axios = useAxiosIns()

    const fetchAllPromotionsQuery = useQuery({
        queryKey: ['promotions-all'],
        queryFn: () =>
            axios.get<IResponseData<IPromotion[]>>(
                `/promotions?filter=${JSON.stringify({
                    startApplyTime: dayjs(new Date()).format('YYYY-MM-DD'),
                    endApplyTime: dayjs(new Date()).format('YYYY-MM-DD')
                })}`
            ),
        enabled: true,
        select: res => res.data
    })
    const promotions = fetchAllPromotionsQuery.data?.data || []

    const maxDiscountRate = useMemo(() => {
        if (promotions.length === 0) return 0
        return Math.max(...promotions.map(promotion => promotion.discountRate))
    }, [promotions])

    const uniqueProductIds = useMemo(() => {
        const productIdSet = new Set<number>()
        promotions.forEach(promotion => {
            ;(promotion.products ?? []).forEach(product => productIdSet.add((product as IRootProduct).rootProductId))
        })

        return Array.from(productIdSet)
    }, [promotions])

    return (
        <section className="bg-foreground flex w-full justify-center">
            <div className="max-w-container flex w-full flex-col items-center px-4 py-24">
                <h2 className="text-background font-[Dancing_Script] text-4xl capitalize">Chương trình khuyến mãi</h2>

                <div
                    className="relative mt-11 flex h-[450px] w-full justify-between gap-[200px] overflow-hidden rounded-[20px] pr-10"
                    style={{
                        background:
                            'linear-gradient(to right, var(--background) calc(50% + 180px), #ff9f1c calc(50% + 180px))'
                    }}
                >
                    <img
                        src="/images/promotion-banner-curve.png"
                        alt="banner image - curve"
                        className="absolute top-0 left-1/2 h-full -translate-x-[35%]"
                    />

                    <img
                        src="/images/promotion-banner-shoe.png"
                        alt="banner image - shoe"
                        className="absolute top-0 left-1/2 h-full -translate-x-[50%] scale-80 lg:scale-100"
                    />

                    <div className="text-warning z-[10] flex flex-1 flex-col items-start justify-end gap-3 p-6 lg:p-12">
                        <div className="flex flex-col gap-2">
                            <h3 className="text-2xl font-semibold text-balance lg:text-3xl">
                                Hôm nay có: {promotions.length.toString().padStart(2, '0')} chương trình khuyến mãi đang
                                áp dụng
                            </h3>
                            <p className="text-muted-foreground/80">
                                Mức giảm giá tối đa: {maxDiscountRate.toString().padStart(2, '0')}%
                            </p>
                            <p className="text-muted-foreground/80">
                                Số sản phẩm được giảm giá: {uniqueProductIds.length.toString().padStart(2, '0')}
                            </p>
                        </div>
                        <Button variant="warning" onClick={() => navigate('/promotions')}>
                            Xem chi tiết
                        </Button>
                    </div>

                    <div className="z-[10] flex flex-1 flex-col items-end justify-start gap-3 p-6 text-white lg:p-12">
                        <div className="flex flex-col gap-2">
                            <h3 className="text-right text-2xl font-semibold text-balance lg:text-3xl">
                                Saigon Steps luôn có ưu đãi dành cho bạn!
                            </h3>
                            <p className="text-right text-balance text-white/80">
                                Ngoài các chương trình khuyến mãi được niêm yết trên website, bạn còn có thể nhận được
                                coupon độc quyền khi theo dõi Saigon Steps trên các nền tảng mạng xã hội.
                            </p>
                            <p className="text-right text-balance text-white/80">
                                Chúng tôi luôn mong muốn giúp bạn sở hữu đôi giày yêu thích với mức giá tốt nhất.
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            {SOCIAL_LINKS.map(link => (
                                <Link key={link.url} to={link.url}>
                                    <link.Icon />
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div
                        className="font-poppins pointer-events-none absolute top-0 right-0 translate-x-5 overflow-hidden px-4 text-justify text-[50px] tracking-wide whitespace-nowrap text-white/30 uppercase italic select-none"
                        style={{
                            writingMode: 'sideways-lr',
                            maxWidth: 'calc(100% - 32px)'
                        }}
                    >
                        Saigon Steps
                    </div>
                </div>
            </div>
        </section>
    )
}

export default PromotionBanner
