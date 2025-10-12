import { useNavigate } from 'react-router-dom'
import { UseMutationResult } from '@tanstack/react-query'
import { BadgeDollarSign, ShoppingCart, Trash } from 'lucide-react'
import { Avatar as RadixAvatar, AvatarImage as RadixAvatarImage } from '@radix-ui/react-avatar'
import { Button } from '@/components/ui/button'
import { DetailedCart } from '@/hooks/useCustomerCart'
import { Badge } from '@/components/ui/badge'
import formatCurrency from '@/utils/formatCurrency'
import QuantityInput from '@/components/common/QuantityInput'

type CartContentProps = {
    isLoading: boolean
    detailedCart: DetailedCart | null
    updateCartItemMutation: UseMutationResult<any, any, { productItemId: number; quantity: number }, any>
    deleteCartItemMutation: UseMutationResult<any, any, { productItemId: number }, any>
}

const CartContent = ({ isLoading, detailedCart, updateCartItemMutation, deleteCartItemMutation }: CartContentProps) => {
    const navigate = useNavigate()

    return (
        <div className="flex-1 overflow-y-auto">
            {detailedCart == null || detailedCart.items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-4">
                    <RadixAvatar className="w-[50%] xl:w-[40%]">
                        <RadixAvatarImage src="/images/empty-cart.png" alt="empty cart"></RadixAvatarImage>
                    </RadixAvatar>
                    <p className="text-sm font-semibold">Bạn chưa có sản phẩm nào trong giỏ hàng!</p>
                    <Button
                        size="lg"
                        variant="outline"
                        className="min-w-[50%] rounded-full text-sm capitalize xl:min-w-[40%]"
                        onClick={() => navigate('/products')}
                    >
                        <ShoppingCart />
                        Bắt đầu mua sắm
                    </Button>
                </div>
            ) : (
                <div className="flex flex-col gap-3">
                    {detailedCart.items.map(item => (
                        <CartContentLine
                            key={item.productItemId}
                            item={item}
                            isLoading={isLoading}
                            updateCartItemMutation={updateCartItemMutation}
                            deleteCartItemMutation={deleteCartItemMutation}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

type CartContentLineProps = {
    item: DetailedCart['items'][number]
    isLoading: boolean
    updateCartItemMutation: UseMutationResult<any, any, { productItemId: number; quantity: number }, any>
    deleteCartItemMutation: UseMutationResult<any, any, { productItemId: number }, any>
}

const CartContentLine = ({ item, isLoading, updateCartItemMutation, deleteCartItemMutation }: CartContentLineProps) => {
    const navigate = useNavigate()
    const productItem = item.product
    const discountRate = productItem.rootProduct.discountRate ?? 0

    return (
        <div key={item.productItemId} className="hover:bg-muted/80 flex items-start gap-6 p-3">
            <div className="border-primary flex w-[70px] items-center justify-center overflow-hidden rounded-xl border-3 p-1">
                <img
                    src={(productItem.rootProduct.images as string[])?.[0] as string}
                    alt="product image"
                    className="aspect-square h-full w-full rounded-lg object-cover"
                />
            </div>

            <div className="flex-1">
                <div className="mb-1 line-clamp-1 text-sm font-medium">{productItem.rootProduct.name}</div>
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

            <div className="flex flex-col items-center gap-3">
                <QuantityInput
                    isLoading={isLoading}
                    initValue={item.quantity}
                    maximum={productItem.availableStock}
                    onChange={value => {
                        if (value === item.quantity) return
                        if (value === 0) {
                            deleteCartItemMutation.mutateAsync({
                                productItemId: item.productItemId
                            })
                            return
                        }
                        updateCartItemMutation.mutateAsync({
                            productItemId: item.productItemId,
                            quantity: value
                        })
                    }}
                />

                <Button
                    size="icon"
                    variant="destructive"
                    className="rounded-full"
                    disabled={isLoading}
                    onClick={async () => {
                        if (isLoading) return
                        await deleteCartItemMutation.mutateAsync({
                            productItemId: item.productItemId
                        })
                    }}
                >
                    <Trash />
                </Button>
            </div>
        </div>
    )
}

export default CartContent
