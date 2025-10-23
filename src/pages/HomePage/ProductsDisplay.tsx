import { useEffect, useMemo, useState } from 'react'
import ProductCard from '@/components/common/ProductCard'
import Pagination from '@/components/common/Pagination'

type ProductsDisplayProps = {
    products: IRootProduct[]
}

const ProductsDisplay = ({ products }: ProductsDisplayProps) => {
    const [page, setPage] = useState<number>(1)
    const limit = 4
    const lastPage = useMemo(() => Math.ceil(products.length / limit), [products.length])
    const paginatedProducts = useMemo(() => products.slice((page - 1) * limit, page * limit), [page, products])

    useEffect(() => {
        setPage(1)
    }, [products])

    return (
        <section className="bg-background flex w-full justify-center">
            <div className="max-w-container flex w-full flex-col items-center px-4 py-24">
                <h2 className="font-[Dancing_Script] text-4xl capitalize">Danh sách sản phẩm</h2>

                <div className="mt-11">
                    <div className="flex flex-col gap-8">
                        <div className="grid w-full grid-cols-3 gap-6 lg:grid-cols-4">
                            {paginatedProducts.map(product => (
                                <ProductCard key={product.rootProductId} product={product} />
                            ))}
                        </div>

                        <Pagination currentPage={page} totalPages={lastPage} onPageChange={setPage} />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProductsDisplay
