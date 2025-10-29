import { useEffect, useRef } from 'react'
import { ShoppingCart } from 'lucide-react'
import { Avatar as RadixAvatar, AvatarImage as RadixAvatarImage } from '@radix-ui/react-avatar'
import { Button } from '@/components/ui/button'
import PromotionCard from '@/pages/PromotionsPage/PromotionCard'

type PromotionsListProps = {
    containerClassName?: string
    promotions: IPromotion[]
    resetFilters: () => void
}

const PromotionsList = ({ containerClassName, promotions, resetFilters }: PromotionsListProps) => {
    const promotionsListStartRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (promotionsListStartRef.current) {
            promotionsListStartRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }, [promotions])

    return (
        <div className={containerClassName}>
            {promotions.length > 0 ? (
                <div>
                    <div ref={promotionsListStartRef}></div>

                    <div className="flex w-full flex-col gap-11">
                        {promotions.map((promotion, index) => (
                            <PromotionCard key={promotion.promotionId} promotion={promotion} index={index} />
                        ))}
                    </div>
                </div>
            ) : (
                <div className="mx-auto flex w-full max-w-[500px] flex-col items-center justify-center gap-4">
                    <RadixAvatar className="w-[50%] xl:w-[40%]">
                        <RadixAvatarImage src="/images/no-sales.png" alt="no sales"></RadixAvatarImage>
                    </RadixAvatar>
                    <p className="text-sm font-semibold">Không tìm thấy khuyến mãi phù hợp!</p>
                    <Button
                        size="lg"
                        variant="outline"
                        className="min-w-[50%] rounded-full text-sm capitalize xl:min-w-[40%]"
                        onClick={resetFilters}
                    >
                        <ShoppingCart />
                        Xem các khuyến mãi khác
                    </Button>
                </div>
            )}
        </div>
    )
}

export default PromotionsList
