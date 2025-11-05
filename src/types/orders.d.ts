declare global {
    interface IOrder {
        orderId: number
        customerId: number
        orderStatusId: number
        couponId: number
        totalAmount: number
        statusId: number
        recipientName?: string
        deliveryAddress?: string
        deliveryPhone?: string
        note?: string
        createdAt: string
        deliveredAt?: string
        refundedAt?: string

        status: IOrderStatus
        coupon?: ICoupon
        orderItems: {
            productItemId: number
            price: number
            quantity: number

            productItem?: {
                productItemId: number
                size: string
                rootProduct: {
                    name: string
                    slug: string
                    images: Partial<IProductImage>[] | string[]
                }
            }
        }[]
        statusUpdateLogs: IOrderStatusUpdateLog[]
    }

    interface IOrderStatusUpdateLog {
        logId: number
        orderId: number
        statusId: number
        updatedAt: string
        updatedBy: number

        updatedByStaff?: Partial<IStaff>
        status: IOrderStatus
    }

    interface IOrderStatus {
        statusId: number
        name: string
        description: string
    }
}

export {}
