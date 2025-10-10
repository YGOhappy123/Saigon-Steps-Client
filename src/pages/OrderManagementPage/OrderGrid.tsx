import { Avatar as RadixAvatar, AvatarImage as RadixAvatarImage } from '@radix-ui/react-avatar'
import { OrderSortAndFilterParams } from '@/services/orderService'
import OrderCard from '@/pages/OrderManagementPage/OrderCard'
import OrderGridToolbar from '@/pages/OrderManagementPage/OrderGridToolbar'
import Pagination from '@/components/common/Pagination'

type OrderGridProps = {
    orders: IOrder[]
    total: number
    page: number
    limit: number
    setPage: (page: number) => void
    setLimit: (limit: number) => void
    buildQuery: (params: OrderSortAndFilterParams) => void
    onFilterSearch: () => void
    onResetFilterSearch: () => void
}

const OrderGrid = ({
    orders,
    total,
    page,
    limit,
    setPage,
    setLimit,
    buildQuery,
    onFilterSearch,
    onResetFilterSearch
}: OrderGridProps) => {
    const lastPage = Math.ceil(total / limit)

    return (
        <div className="flex flex-col gap-8">
            <OrderGridToolbar
                limit={limit}
                setLimit={setLimit}
                buildQuery={buildQuery}
                onFilterSearch={onFilterSearch}
                onResetFilterSearch={onResetFilterSearch}
            />

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {orders.map(order => (
                    <OrderCard key={order.orderId} order={order} />
                ))}

                {orders.length === 0 && (
                    <div className="col-span-2 flex flex-1 flex-col items-center justify-center gap-2 py-20">
                        <RadixAvatar className="w-[30%] xl:w-[20%]">
                            <RadixAvatarImage src="/images/happy-emoji.png" alt="empty cart"></RadixAvatarImage>
                        </RadixAvatar>
                        <p className="mt-2 font-semibold">Không có đơn hàng</p>
                        <p className="font-semibold">Bạn không có đơn hàng nào theo các tiêu chí đã chọn!</p>
                    </div>
                )}
            </div>

            <Pagination currentPage={page} totalPages={lastPage} onPageChange={setPage} />
        </div>
    )
}

export default OrderGrid
