import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import useTitle from '@/hooks/useTitle'
import useAxiosIns from '@/hooks/useAxiosIns'
import ProductFilterForm from '@/pages/ProductsDisplayPage/ProductFilterForm'
import CategoryBrandSelect from '@/pages/ProductsDisplayPage/CategoryBrandSelect'
import ProductGrid from '@/pages/ProductsDisplayPage/ProductGrid'

const ProductsDisplayPage = () => {
    useTitle('Saigon Steps | Danh sách sản phẩm')
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const axios = useAxiosIns()
    const [searchName, setSearchName] = useState<string>('')
    const [searchInStock, setSearchInStock] = useState<boolean | undefined>(undefined)
    const [searchIsAccessory, setSearchIsAccessory] = useState<boolean | undefined>(undefined)
    const [searchMinPrice, setSearchMinPrice] = useState<number>(0)
    const [searchMaxPrice, setSearchMaxPrice] = useState<number>(0)
    const [searchBrand, setSearchBrand] = useState<number>(0)
    const [searchCategory, setSearchCategory] = useState<number>(0)
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
        const activeBrand = brands?.find(brand => brand.name.toLowerCase() === searchParams.get('brand')?.toLowerCase())
        setSearchBrand(activeBrand?.brandId ?? 0)
    }, [searchParams.get('brand'), brands])

    // Category filter
    const fetchAllCategoriesQuery = useQuery({
        queryKey: ['categories-all'],
        queryFn: () => axios.get<IResponseData<IShoeCategory[]>>('/categories'),
        enabled: true,
        select: res => res.data
    })
    const categories = fetchAllCategoriesQuery.data?.data || []

    useEffect(() => {
        const activeCategory = categories?.find(
            category => category.name.toLowerCase() === searchParams.get('category')?.toLowerCase()
        )
        setSearchCategory(activeCategory?.categoryId ?? 0)
    }, [searchParams.get('category'), categories])

    // Product filter
    const fetchAllProductsQuery = useQuery({
        queryKey: ['products-all'],
        queryFn: () => axios.get<IResponseData<IRootProduct[]>>('/products'),
        enabled: true,
        refetchInterval: 60000,
        select: res => res.data
    })
    const products = fetchAllProductsQuery.data?.data || []

    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            if (searchName && !product.name.toLowerCase().includes(searchName.toLowerCase())) return false
            if (searchInStock != undefined) {
                const inStock = (product.productItems ?? []).some(item => item.availableStock! > 0) ?? false
                if (searchInStock !== inStock) return false
            }
            if (searchIsAccessory != undefined && product.isAccessory !== searchIsAccessory) return false
            if (searchMinPrice && product.price < searchMinPrice) return false
            if (searchMaxPrice && product.price > searchMaxPrice) return false
            if (searchBrand && product.brandId !== searchBrand) return false
            if (searchCategory && product.shoeFeature?.categoryId !== searchCategory) return false
            return true
        })
    }, [
        products,
        searchName,
        searchInStock,
        searchIsAccessory,
        searchMinPrice,
        searchMaxPrice,
        searchBrand,
        searchCategory
    ])

    const resetFilters = () => {
        setSearchName('')
        setSearchInStock(undefined)
        setSearchIsAccessory(undefined)
        setSearchMinPrice(0)
        setSearchMaxPrice(0)
        setSearchParams({})
    }

    return (
        <section className="bg-background flex w-full justify-center">
            <div className="max-w-container flex w-full flex-col items-center justify-between px-4 py-24">
                <h2 className="font-[Dancing_Script] text-4xl capitalize">Danh sách sản phẩm</h2>

                <div className="mt-11 flex w-full flex-col items-start gap-11 xl:flex-row xl:gap-16">
                    <div className="w-full xl:max-w-[300px]">
                        <ProductFilterForm
                            searchName={searchName}
                            searchInStock={searchInStock}
                            searchIsAccessory={searchIsAccessory}
                            setSearchName={setSearchName}
                            setSearchInStock={setSearchInStock}
                            setSearchMinPrice={setSearchMinPrice}
                            setSearchMaxPrice={setSearchMaxPrice}
                            setSearchIsAccessory={setSearchIsAccessory}
                            resetFilters={resetFilters}
                        />
                    </div>

                    <div className="flex w-full flex-col gap-11">
                        <CategoryBrandSelect
                            title="Danh mục"
                            items={categories}
                            selectedItem={searchParams.get('category')}
                            onSelectOne={item => updateParam('category', item.name)}
                            onSelectAll={() => updateParam('category')}
                        />
                        <CategoryBrandSelect
                            title="Thương hiệu"
                            items={brands}
                            selectedItem={searchParams.get('brand')}
                            onSelectOne={item => updateParam('brand', item.name)}
                            onSelectAll={() => updateParam('brand')}
                        />

                        <ProductGrid
                            containerClassName="xl:mt-5"
                            products={filteredProducts}
                            resetFilters={resetFilters}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProductsDisplayPage
