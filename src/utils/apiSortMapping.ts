export const SORT_MAPPING = {
    '-customerId': { customerId: 'desc' },
    '+customerId': { customerId: 'asc' },
    '-productId': { rootProductId: 'desc' },
    '+productId': { rootProductId: 'asc' },
    '-orderId': { orderId: 'desc' },
    '+orderId': { orderId: 'asc' },

    '-createdAt': { createdAt: 'desc' },
    '+createdAt': { createdAt: 'asc' },
    '-amount': { totalAmount: 'desc' },
    '+amount': { totalAmount: 'asc' },
    '-price': { price: 'desc' },
    '+price': { price: 'asc' }
}

export const getMappedSort = (sort: string) => {
    return SORT_MAPPING[sort as keyof typeof SORT_MAPPING] ?? []
}
