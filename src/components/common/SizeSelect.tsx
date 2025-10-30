import { useEffect, useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import useDebounce from '@/hooks/useDebounce'

type SizeSelectProps = {
    isLoading: boolean
    cartItems: { productItemId: number; quantity: number }[]
    initValue: number
    sizes: IProductItem[]
    onChange: (value: number) => void
}

const SizeSelect = ({ isLoading, cartItems, initValue, sizes, onChange }: SizeSelectProps) => {
    const [productItemId, setProductItemId] = useState<number>(initValue)
    const debouncedProductItemId = useDebounce(productItemId)
    const currentQuantity = cartItems.find(ci => ci.productItemId === initValue)?.quantity ?? 0

    useEffect(() => {
        setProductItemId(initValue)
    }, [initValue])

    useEffect(() => {
        onChange(debouncedProductItemId as number)
    }, [debouncedProductItemId])

    return (
        <div className="flex w-full items-center justify-between rounded-md border-2">
            <Select
                onValueChange={value => setProductItemId(Number(value))}
                value={productItemId?.toString() ?? ''}
                disabled={isLoading}
            >
                <SelectTrigger className="w-full cursor-pointer border-none">
                    <SelectValue placeholder="Kích thước" />
                </SelectTrigger>
                <SelectContent>
                    {sizes.map(size => (
                        <SelectItem
                            key={size.productItemId}
                            value={size.productItemId.toString()}
                            disabled={
                                size.availableStock <
                                currentQuantity +
                                    (cartItems.find(ci => ci.productItemId === size.productItemId)?.quantity ?? 0)
                            }
                        >
                            {size.size} ({size.availableStock} tồn kho)
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}

export default SizeSelect
