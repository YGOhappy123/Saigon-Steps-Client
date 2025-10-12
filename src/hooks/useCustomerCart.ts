import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import useAxiosIns from '@/hooks/useAxiosIns'

type DetailedProductItem = {
    productItemId: number
    rootProductId: number
    size: string
    availableStock: number
    rootProduct: Pick<
        IRootProduct,
        | 'rootProductId'
        | 'brandId'
        | 'name'
        | 'slug'
        | 'description'
        | 'price'
        | 'isAccessory'
        | 'discountRate'
        | 'brand'
        | 'images'
        | 'shoeFeature'
    >
}

export type DetailedCart = Omit<ICustomerCart, 'items'> & {
    items: (ICartItem & { product: DetailedProductItem })[]
}

const useCustomerCart = () => {
    const axios = useAxiosIns()
    const cart = useSelector((state: RootState) => state.app.cart)

    const productIds = useMemo(() => [...new Set(cart?.items.map(item => item.productItemId))], [cart])

    const fetchDetailedProductItemsQuery = useQuery({
        queryKey: ['detailed-product-items', productIds],
        queryFn: () => {
            const query = new URLSearchParams()
            productIds.forEach(id => query.append('ids', id.toString()))
            return axios.get<IResponseData<DetailedProductItem[]>>(`/products/detailed-items?${query.toString()}`)
        },
        enabled: productIds.length > 0,
        refetchInterval: 30000,
        select: res => res.data
    })
    const detailedProductItems = fetchDetailedProductItemsQuery.data?.data ?? []

    const detailedCart = useMemo<DetailedCart | null>(() => {
        if (!cart || fetchDetailedProductItemsQuery.isLoading || detailedProductItems.length === 0) return null

        const detailedCartItems = cart.items.map(item => {
            const productItemData = detailedProductItems.find(_item => _item.productItemId === item.productItemId)
            return { ...item, product: productItemData! }
        })
        return { ...cart, items: detailedCartItems } as DetailedCart
    }, [cart, detailedProductItems])

    const totalCount = useMemo(() => {
        if (!detailedCart) return 0
        return detailedCart.items.reduce((total, item) => total + item.quantity, 0)
    }, [cart, detailedCart])

    const totalPrice = useMemo(() => {
        if (!detailedCart) return 0

        return detailedCart.items.reduce(
            (total, item) =>
                total +
                item.product.rootProduct.price * (1 - item.product.rootProduct.discountRate! / 100) * item.quantity,
            0
        )
    }, [cart, detailedCart])

    return {
        cart: cart,
        detailedCart: detailedCart,
        totalCount: totalCount,
        totalPrice: totalPrice,
        isLoading: fetchDetailedProductItemsQuery.isLoading
    }
}

export default useCustomerCart
