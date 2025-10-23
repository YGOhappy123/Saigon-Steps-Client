import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import useTitle from '@/hooks/useTitle'
import useAxiosIns from '@/hooks/useAxiosIns'
import HeroBanner from '@/pages/HomePage/HeroBanner'
import BrandsDisplay from '@/pages/HomePage/BrandsDisplay'
import ExploreBanner from '@/pages/HomePage/ExploreBanner'
import ProductsDisplay from '@/pages/HomePage/ProductsDisplay'
import PromotionBanner from '@/pages/HomePage/PromotionBanner'

const HomePage = () => {
    useTitle('Saigon Steps | Trang chủ')
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const axios = useAxiosIns()

    const fetchAllProductsQuery = useQuery({
        queryKey: ['home-products'],
        queryFn: () => axios.get<IResponseData<IRootProduct[]>>('/products'),
        enabled: true,
        select: res => res.data
    })
    const products = fetchAllProductsQuery.data?.data || []

    return (
        <>
            <HeroBanner />
            <BrandsDisplay />
            <ExploreBanner products={products} />
            <PromotionBanner />
            <ProductsDisplay products={products} />
        </>
    )
}

export default HomePage
