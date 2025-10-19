import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { BadgeDollarSign } from 'lucide-react'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { DetailedCart } from '@/hooks/useCustomerCart'
import { useAudioContext } from '@/components/container/AudioProvider'
import formatCurrency from '@/utils/formatCurrency'

const couponFormSchema = z.object({
    code: z.string().min(1, { message: 'Mã phiếu giảm giá không được bỏ trống.' })
})

type ProductSummarizeProps = {
    items: DetailedCart['items']
    coupon: ICoupon | null
    handleVerifyCoupon: (code: string) => Promise<void>
    handleClearCoupon: () => void
}

const ProductSummarize = ({ items, coupon, handleVerifyCoupon, handleClearCoupon }: ProductSummarizeProps) => {
    const { playRandomKeyStrokeSound } = useAudioContext()
    const form = useForm<z.infer<typeof couponFormSchema>>({
        resolver: zodResolver(couponFormSchema),
        defaultValues: {
            code: ''
        }
    })

    const onSubmit = (values: z.infer<typeof couponFormSchema>) => {
        if (coupon === null) {
            handleVerifyCoupon(values.code)
        } else {
            handleClearCoupon()
        }
    }

    const originalTotal = useMemo(
        () =>
            items.reduce((total, item) => {
                const rootProduct = item.product.rootProduct
                return total + rootProduct.price * item.quantity
            }, 0),
        [items]
    )

    const promotionDiscount = useMemo(
        () =>
            items.reduce((total, item) => {
                const rootProduct = item.product.rootProduct
                return total + rootProduct.price * item.quantity * ((rootProduct.discountRate ?? 0) / 100)
            }, 0),
        [items]
    )

    const couponDiscount = useMemo(() => {
        if (!coupon) return 0
        const subTotalPrice = items.reduce((total, item) => {
            const rootProduct = item.product.rootProduct
            return total + rootProduct.price * item.quantity * (1 - (rootProduct.discountRate ?? 0) / 100)
        }, 0)

        if (coupon.type === 'PERCENTAGE') {
            return (subTotalPrice * coupon.amount) / 100
        } else {
            return Math.min(coupon.amount, subTotalPrice)
        }
    }, [items, coupon])

    return (
        <div>
            <div className="flex max-h-[300px] flex-col gap-3 overflow-y-auto">
                {items.map(item => (
                    <OrderProductLine key={item.productItemId} item={item} />
                ))}
            </div>
            <Separator className="my-4" />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full gap-4">
                    <FormField
                        control={form.control}
                        name="code"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormControl>
                                    <Input
                                        onKeyDown={() => playRandomKeyStrokeSound()}
                                        disabled={coupon != null}
                                        placeholder="Mã phiếu giảm giá..."
                                        className="caret-card-foreground text-card-foreground h-12 rounded border-2 font-semibold"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button
                        className="h-12 rounded px-6"
                        variant={coupon ? 'destructive' : 'default'}
                        disabled={form.watch('code') === ''}
                    >
                        {coupon ? 'Hủy bỏ' : 'Kiểm tra'}
                    </Button>
                </form>
            </Form>

            <Separator className="my-4" />
            <div className="flex flex-col gap-2">
                <div className="flex justify-between font-medium">
                    <span>Giá tiền gốc: </span> {formatCurrency(originalTotal)}
                </div>
                <div className="text-destructive flex justify-between font-medium">
                    <span>Giảm giá từ khuyến mãi: </span> -{formatCurrency(promotionDiscount)}
                </div>
                {couponDiscount > 0 && (
                    <div className="text-destructive flex justify-between font-medium">
                        <span>Giảm giá từ phiếu giảm giá: </span> -{formatCurrency(couponDiscount)}
                    </div>
                )}
            </div>

            <Separator className="my-4" />
            <div className="text-primary flex justify-between text-lg font-semibold">
                <span>Tổng cộng: </span> {formatCurrency(originalTotal - promotionDiscount - couponDiscount)}
            </div>
        </div>
    )
}

type OrderProductLineProps = {
    item: DetailedCart['items'][number]
}

const OrderProductLine = ({ item }: OrderProductLineProps) => {
    const navigate = useNavigate()
    const productItem = item.product
    const discountRate = productItem.rootProduct.discountRate ?? 0

    return (
        <div key={item.productItemId} className="hover:bg-muted/80 flex items-start gap-6 rounded-md p-3">
            <div className="border-primary flex w-[70px] items-center justify-center overflow-hidden rounded-xl border-3 p-1">
                <img
                    src={(productItem.rootProduct.images as string[])?.[0] as string}
                    alt="product image"
                    className="aspect-square h-full w-full rounded-lg object-cover"
                />
            </div>

            <div className="flex-1">
                <div className="mb-1 line-clamp-1 text-sm font-medium">
                    {productItem.rootProduct.name} (x{item.quantity.toString().padStart(2, '0')})
                </div>
                <div className="text-muted-foreground flex flex-col gap-1 text-sm">
                    <p className="line-clamp-1">
                        <span className="font-medium">Phân loại: </span>
                        {productItem.size}
                    </p>
                    <p className="line-clamp-1" onClick={() => navigate(`/products/${productItem.rootProduct.slug}`)}>
                        <span className="font-medium">Số lượng tồn kho: </span>
                        {productItem.availableStock}
                    </p>
                    {discountRate > 0 && (
                        <div className="flex items-center gap-2 font-medium">
                            Giá tiền gốc:
                            <Badge variant="destructive">
                                <BadgeDollarSign /> {formatCurrency(productItem.rootProduct.price)}
                            </Badge>
                        </div>
                    )}
                    <div className="flex items-center gap-2 font-medium">
                        Giá tiền:
                        <Badge variant="success">
                            <BadgeDollarSign />{' '}
                            {formatCurrency(productItem.rootProduct.price * (1 - discountRate / 100))}
                            {discountRate > 0 && ` (-${discountRate}%)`}
                        </Badge>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductSummarize
