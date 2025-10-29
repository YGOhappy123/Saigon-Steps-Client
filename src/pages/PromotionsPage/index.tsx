import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import useTitle from '@/hooks/useTitle'
import useAxiosIns from '@/hooks/useAxiosIns'
import CategoryBrandSelect from '@/components/common/CategoryBrandSelect'
import PromotionFilterForm from '@/pages/PromotionsPage/PromotionFilterForm'
import PromotionsList from '@/pages/PromotionsPage/PromotionsList'
import dayjs from '@/libs/dayjs'

const PromotionsPage = () => {
    useTitle('Saigon Steps | Khuyến mãi')
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const axios = useAxiosIns()
    const [activeTime, setActiveTime] = useState<'current' | 'upcoming'>('current')
    const [searchName, setSearchName] = useState<string>('')
    const [searchMinRate, setSearchMinRate] = useState<number>(0)
    const [searchMaxRate, setSearchMaxRate] = useState<number>(0)
    const [searchBrand, setSearchBrand] = useState<number>(0)
    const [searchParams, setSearchParams] = useSearchParams()
    const updateParam = (key: string, value?: string) => {
        setSearchParams(prev => {
            const params = new URLSearchParams(prev)
            if (value) params.set(key, value)
            else params.delete(key)
            return params
        })
    }

    // Brand filter
    const fetchAllBrandsQuery = useQuery({
        queryKey: ['brands-all'],
        queryFn: () => axios.get<IResponseData<IProductBrand[]>>('/brands'),
        enabled: true,
        select: res => res.data
    })
    const brands = fetchAllBrandsQuery.data?.data || []

    useEffect(() => {
        const activeBrand = brands?.find(
            brand => brand.name.toLowerCase() === searchParams.get('thuong-hieu')?.toLowerCase()
        )
        setSearchBrand(activeBrand?.brandId ?? 0)
    }, [searchParams.get('thuong-hieu'), brands])

    // Promotions filter
    const fetchAllPromotionsQuery = useQuery({
        queryKey: ['promotions-all'],
        queryFn: () =>
            axios.get<IResponseData<IPromotion[]>>(
                `/promotions?filter=${JSON.stringify({
                    isAvailable: true,
                    startApplyTime: dayjs(new Date()).format('YYYY-MM-DD')
                })}`
            ),
        enabled: true,
        select: res => res.data
    })
    const promotions = fetchAllPromotionsQuery.data?.data || []

    const filteredPromotions = useMemo(() => {
        return promotions.filter(promotion => {
            if (searchName && !promotion.name.toLowerCase().includes(searchName.toLowerCase())) return false
            if (searchMinRate && promotion.discountRate < searchMinRate) return false
            if (searchMaxRate && promotion.discountRate > searchMaxRate) return false
            if (activeTime === 'current' && dayjs(promotion.startDate).isAfter(dayjs(), 'day')) return false
            if (activeTime === 'upcoming' && !dayjs(promotion.startDate).isAfter(dayjs(), 'day')) return false
            if (searchBrand && (promotion.products as IRootProduct[]).every(product => product.brandId !== searchBrand))
                return false
            return true
        })
    }, [promotions, searchName, searchMinRate, searchMaxRate, searchBrand, activeTime])

    const resetFilters = () => {
        setSearchName('')
        setSearchMinRate(0)
        setSearchMaxRate(0)
        setSearchParams({})
        setActiveTime('current')
    }

    return (
        <section className="bg-background flex w-full justify-center">
            <div className="max-w-container flex w-full flex-col items-center justify-between px-4 py-24">
                <h2 className="font-dancing-script text-4xl capitalize">Chương trình khuyến mãi</h2>

                <div className="mt-11 flex w-full flex-col items-start gap-11 xl:flex-row xl:gap-16">
                    <div className="w-full xl:max-w-[300px]">
                        <PromotionFilterForm
                            searchName={searchName}
                            setSearchName={setSearchName}
                            setSearchMinRate={setSearchMinRate}
                            setSearchMaxRate={setSearchMaxRate}
                            resetFilters={resetFilters}
                        />
                    </div>

                    <div className="flex w-full flex-col gap-11">
                        <CategoryBrandSelect
                            title="Thương hiệu"
                            items={brands}
                            selectedItem={searchParams.get('thuong-hieu')}
                            onSelectOne={item => updateParam('thuong-hieu', item.name)}
                            onSelectAll={() => updateParam('thuong-hieu')}
                        />
                        <ul className="grid grid-cols-5 items-center gap-4">
                            <h2 className="font-dancing-script text-3xl capitalize">Ngày áp dụng</h2>
                            <li>
                                <Button
                                    variant={activeTime === 'current' ? 'default' : 'secondary'}
                                    size="xl"
                                    className="w-full gap-0 rounded-full px-1.5"
                                    onClick={() => setActiveTime('current')}
                                >
                                    <span className="mx-auto">Đang diễn ra</span>
                                </Button>
                            </li>
                            <li>
                                <Button
                                    variant={activeTime === 'upcoming' ? 'default' : 'secondary'}
                                    size="xl"
                                    className="w-full gap-0 rounded-full px-1.5"
                                    onClick={() => setActiveTime('upcoming')}
                                >
                                    <span className="mx-auto">Sắp diễn ra</span>
                                </Button>
                            </li>
                        </ul>
                        <PromotionsList
                            containerClassName="xl:mt-5"
                            promotions={filteredPromotions}
                            resetFilters={resetFilters}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default PromotionsPage
