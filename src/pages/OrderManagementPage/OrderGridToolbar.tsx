import { useState } from 'react'
import { Funnel } from 'lucide-react'
import { Popover, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { OrderSortAndFilterParams } from '@/services/orderService'
import PageLimitSelect from '@/components/common/PageLimitSelect'
import OrderFilter from '@/pages/OrderManagementPage/OrderFilter'

type OrderGridToolbarProps = {
    limit: number
    setLimit: (limit: number) => void
    buildQuery: (params: OrderSortAndFilterParams) => void
    onFilterSearch: () => void
    onResetFilterSearch: () => void
    orderStatuses: IOrderStatus[]
}

const OrderGridToolbar = ({
    limit,
    setLimit,
    buildQuery,
    onFilterSearch,
    onResetFilterSearch,
    orderStatuses
}: OrderGridToolbarProps) => {
    const [havingFilters, setHavingFilters] = useState(false)

    return (
        <div className="flex items-center justify-between">
            <PageLimitSelect limit={limit} setLimit={setLimit} />

            <div className="flex justify-center gap-2">
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="outline" className="relative">
                            <Funnel />
                            Lọc đơn hàng
                            {havingFilters && (
                                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-600" />
                            )}
                        </Button>
                    </PopoverTrigger>
                    <OrderFilter
                        setHavingFilters={setHavingFilters}
                        onChange={buildQuery}
                        onSearch={onFilterSearch}
                        onReset={onResetFilterSearch}
                        orderStatuses={orderStatuses}
                    />
                </Popover>
            </div>
        </div>
    )
}

export default OrderGridToolbar
