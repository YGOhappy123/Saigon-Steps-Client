import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bot } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import formatCurrency from '@/utils/formatCurrency'

type PromotionFilterFormProps = {
    searchName: string
    setSearchName: (name: string) => void
    setSearchMinRate: (minRate: number) => void
    setSearchMaxRate: (maxRate: number) => void
    resetFilters: () => void
}

const PromotionFilterForm = ({
    searchName,
    setSearchName,
    setSearchMinRate,
    setSearchMaxRate,
    resetFilters
}: PromotionFilterFormProps) => {
    const navigate = useNavigate()

    const rateOptions: { id: string; min: number | null; max: number | null }[] = [
        { id: 'all', min: null, max: null },
        { id: 'under-20', min: null, max: 20 },
        { id: '20-40', min: 20, max: 40 },
        { id: '40-60', min: 40, max: 60 },
        { id: '60-80', min: 60, max: 80 },
        { id: 'above-80', min: 80, max: null }
    ]
    const [rateRangeId, setRateRangeId] = useState<(typeof rateOptions)[number]['id']>('all')

    useEffect(() => {
        const option = rateOptions.find(option => option.id === rateRangeId)
        if (option) {
            setSearchMinRate(option.min ?? 0)
            setSearchMaxRate(option.max ?? 0)
        } else {
            setSearchMinRate(0)
            setSearchMaxRate(0)
        }
    }, [rateRangeId])

    const getOptionLabel = (option: { id: string; min: number | null; max: number | null }) => {
        if (option.min == null && option.max == null) return 'Tất cả'
        if (option.min == null) return `Dưới ${option.max!}%`
        if (option.max == null) return `Trên ${option.min}%`
        return `Từ ${option.min}% đến ${option.max}%`
    }

    const havingFilters = useMemo(() => !!(searchName || rateRangeId !== 'all'), [searchName, rateRangeId])

    const handleReset = () => {
        resetFilters()
        setRateRangeId('all')
    }

    return (
        <Card className="w-full">
            <CardHeader className="text-center">
                <CardTitle className="text-xl">Tìm kiếm khuyến mãi</CardTitle>
                <CardDescription>Tìm kiếm khuyến mãi theo tên, tầm giảm giá...</CardDescription>
            </CardHeader>
            <CardContent>
                <form className="flex flex-col gap-4">
                    <div className="flex flex-col gap-6">
                        <div className="space-y-2">
                            <h4 className="text-sm font-medium">Lọc theo tên khuyến mãi</h4>
                            <Input
                                name="name"
                                placeholder="Tên khuyến mãi..."
                                className="caret-card-foreground text-card-foreground h-10 rounded border-2 font-semibold"
                                value={searchName}
                                onChange={e => setSearchName(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <h4 className="text-sm font-medium">Khoảng giảm giá</h4>
                            <RadioGroup
                                value={rateRangeId}
                                onValueChange={setRateRangeId}
                                className="grid grid-cols-2 gap-2 xl:grid-cols-1"
                            >
                                {rateOptions.map(option => (
                                    <div key={option.id} className="flex items-center space-x-2">
                                        <RadioGroupItem value={option.id} id={`rate-${option.id}`} />
                                        <Label htmlFor={`rate-${option.id}`}>{getOptionLabel(option)}</Label>
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
                        <Button type="button" onClick={() => navigate('/tim-kiem-ai')}>
                            <Bot /> Tìm kiếm bằng AI
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}

export default PromotionFilterForm
