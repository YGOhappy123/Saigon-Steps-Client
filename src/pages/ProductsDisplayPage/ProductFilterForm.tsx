import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router'
import { Bot, CircleCheck, CircleStar, CircleX, Footprints, Wallet } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import formatCurrency from '@/utils/formatCurrency'

type ProductFilterFormProps = {
    searchName: string
    searchInStock: boolean | undefined
    searchIsAccessory: boolean | undefined
    setSearchName: (name: string) => void
    setSearchInStock: (inStock: boolean | undefined) => void
    setSearchMinPrice: (minPrice: number) => void
    setSearchMaxPrice: (maxPrice: number) => void
    setSearchIsAccessory: (isAccessory: boolean | undefined) => void
    resetFilters: () => void
}

const ProductFilterForm = ({
    searchName,
    searchInStock,
    searchIsAccessory,
    setSearchName,
    setSearchInStock,
    setSearchMinPrice,
    setSearchMaxPrice,
    setSearchIsAccessory,
    resetFilters
}: ProductFilterFormProps) => {
    const navigate = useNavigate()

    const priceOptions: { id: string; min: number | null; max: number | null }[] = [
        { id: 'all', min: null, max: null },
        { id: 'under-500', min: null, max: 500000 },
        { id: '500-1000', min: 500000, max: 1000000 },
        { id: '1000-2000', min: 1000000, max: 2000000 },
        { id: '2000-3000', min: 2000000, max: 3000000 },
        { id: 'above-3000', min: 3000000, max: null }
    ]
    const [priceRangeId, setPriceRangeId] = useState<(typeof priceOptions)[number]['id']>('all')

    useEffect(() => {
        const option = priceOptions.find(option => option.id === priceRangeId)
        if (option) {
            setSearchMinPrice(option.min ?? 0)
            setSearchMaxPrice(option.max ?? 0)
        } else {
            setSearchMinPrice(0)
            setSearchMaxPrice(0)
        }
    }, [priceRangeId])

    const getOptionLabel = (option: { id: string; min: number | null; max: number | null }) => {
        if (option.min == null && option.max == null) return 'Tất cả'
        if (option.min == null) return `Dưới ${formatCurrency(option.max!)}`
        if (option.max == null) return `Trên ${formatCurrency(option.min)}`
        return `Từ ${formatCurrency(option.min)} đến ${formatCurrency(option.max)}`
    }

    const havingFilters = useMemo(
        () => !!(searchName || searchInStock != undefined || searchIsAccessory != undefined || priceRangeId !== 'all'),
        [searchName, searchInStock, searchIsAccessory, priceRangeId]
    )

    const handleReset = () => {
        resetFilters()
        setPriceRangeId('all')
    }

    return (
        <Card className="w-full">
            <CardHeader className="relative text-center">
                <CardTitle className="text-xl">Tìm kiếm sản phẩm</CardTitle>
                <CardDescription>Tìm kiếm sản phẩm theo tên, phân loại, tầm giá...</CardDescription>
            </CardHeader>
            <CardContent>
                <form className="flex flex-col gap-4">
                    <div className="flex flex-col gap-6">
                        <div className="space-y-2">
                            <h4 className="text-sm font-medium">Lọc theo tên sản phẩm</h4>
                            <Input
                                name="name"
                                placeholder="Tên sản phẩm..."
                                className="caret-card-foreground text-card-foreground h-10 rounded border-2 font-semibold"
                                value={searchName}
                                onChange={e => setSearchName(e.target.value)}
                            />
                        </div>

                        <div className="grid grid-cols-2 items-start gap-4 xl:grid-cols-1 xl:gap-6">
                            <div className="space-y-2">
                                <h4 className="text-sm font-medium">Lọc theo loại sản phẩm sản phẩm</h4>
                                <Select
                                    value={searchIsAccessory === undefined ? 'undefined' : searchIsAccessory.toString()}
                                    onValueChange={value =>
                                        setSearchIsAccessory(
                                            value === 'true' ? true : value === 'false' ? false : undefined
                                        )
                                    }
                                >
                                    <SelectTrigger className="text-card-foreground h-10! w-full rounded border-2 text-sm font-semibold">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent side="top">
                                        {[
                                            { value: 'undefined', label: 'Tất cả', Icon: CircleStar },
                                            { value: 'true', label: 'Phụ kiện', Icon: Wallet },
                                            { value: 'false', label: 'Giày / dép', Icon: Footprints }
                                        ].map(sortOption => (
                                            <SelectItem key={sortOption.value} value={sortOption.value}>
                                                <sortOption.Icon /> {sortOption.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <h4 className="text-sm font-medium">Lọc theo tình trạng còn hàng</h4>
                                <Select
                                    value={searchInStock === undefined ? 'undefined' : searchInStock.toString()}
                                    onValueChange={value =>
                                        setSearchInStock(
                                            value === 'true' ? true : value === 'false' ? false : undefined
                                        )
                                    }
                                >
                                    <SelectTrigger className="text-card-foreground h-10! w-full rounded border-2 text-sm font-semibold">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent side="top">
                                        {[
                                            {
                                                value: 'undefined',
                                                label: 'Tất cả',
                                                Icon: CircleStar
                                            },
                                            {
                                                value: 'true',
                                                label: 'Còn hàng',
                                                Icon: CircleCheck
                                            },
                                            { value: 'false', label: 'Hết hàng', Icon: CircleX }
                                        ].map(sortOption => (
                                            <SelectItem key={sortOption.value} value={sortOption.value}>
                                                <sortOption.Icon /> {sortOption.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <h4 className="text-sm font-medium">Khoảng giá</h4>
                            <RadioGroup
                                value={priceRangeId}
                                onValueChange={setPriceRangeId}
                                className="grid grid-cols-2 gap-2 xl:grid-cols-1"
                            >
                                {priceOptions.map(option => (
                                    <div key={option.id} className="flex items-center space-x-2">
                                        <RadioGroupItem value={option.id} id={`price-${option.id}`} />
                                        <Label htmlFor={`price-${option.id}`}>{getOptionLabel(option)}</Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </div>
                    </div>
                    <Separator />
                    <div className="flex justify-end gap-2">
                        <Button type="button" variant="outline" onClick={handleReset} className="relative">
                            Đặt lại
                            {havingFilters && (
                                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-600" />
                            )}
                        </Button>
                        <Button type="button" onClick={() => navigate('/ai-search')}>
                            <Bot /> Tìm kiếm bằng AI
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}

export default ProductFilterForm
