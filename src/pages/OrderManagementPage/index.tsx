import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useQuery } from '@tanstack/react-query'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { RootState } from '@/store'
import orderService from '@/services/orderService'
import OrderSummary from '@/pages/OrderManagementPage/OrderSummary'
import OrderTable from '@/pages/OrderManagementPage/OrderTable'
import useAxiosIns from '@/hooks/useAxiosIns'
import ViewOrderDialog from '@/pages/OrderManagementPage/ViewOrderDialog'

const OrderManagementPage = () => {
    const axios = useAxiosIns()
    const user = useSelector((state: RootState) => state.auth.user)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null)
    const orderServiceData = orderService({ enableFetching: true })

    const fetchAllOrderStatusesQuery = useQuery({
        queryKey: ['order-statuses-all'],
        queryFn: () => axios.get<IResponseData<IOrderStatus[]>>('/order-statuses'),
        enabled: true,
        select: res => res.data
    })
    const orderStatuses = fetchAllOrderStatusesQuery.data?.data || []

    return (
        <div className="flex h-full flex-1 flex-col space-y-8 p-4">
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Xin chào, {user!.name}!</h2>
                    <p className="text-muted-foreground">Đây là danh sách đơn hàng của bạn.</p>
                </div>
                <div className="flex items-center space-x-2">
                    <Avatar className="size-12 rounded-full">
                        <AvatarImage src={user!.avatar} alt={user!.name} />
                    </Avatar>
                </div>
            </div>

            <ViewOrderDialog open={dialogOpen} setOpen={setDialogOpen} order={selectedOrder} />

            <OrderSummary />
            <OrderTable
                customerInfo={user!}
                orders={orderServiceData.orders}
                orderStatuses={orderStatuses}
                total={orderServiceData.total}
                page={orderServiceData.page}
                limit={orderServiceData.limit}
                setPage={orderServiceData.setPage}
                setLimit={orderServiceData.setLimit}
                buildQuery={orderServiceData.buildQuery}
                onFilterSearch={orderServiceData.onFilterSearch}
                onResetFilterSearch={orderServiceData.onResetFilterSearch}
                onViewOrder={(order: IOrder) => {
                    setSelectedOrder(order)
                    setDialogOpen(true)
                }}
            />
        </div>
    )
}

export default OrderManagementPage
