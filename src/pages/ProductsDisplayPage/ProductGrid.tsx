import { useEffect, useState } from 'react'
import { ShoppingCart } from 'lucide-react'
import { Avatar as RadixAvatar, AvatarImage as RadixAvatarImage } from '@radix-ui/react-avatar'
import { Button } from '@/components/ui/button'
import ProductCard from '@/components/common/ProductCard'
import Pagination from '@/components/common/Pagination'

type ProductGridProps = {
    containerClassName?: string
    products: IRootProduct[]
    resetFilters: () => void
}

const ProductGrid = ({ containerClassName, products, resetFilters }: ProductGridProps) => {
    const [page, setPage] = useState<number>(1)
    const limit = 6
    const lastPage = Math.ceil(products.length / limit)
    const paginatedProducts = products.slice((page - 1) * limit, page * limit)

    useEffect(() => {
        setPage(1)
    }, [products])

    return (
        <div className={containerClassName}>
            {products.length > 0 ? (
                <div className="flex flex-col gap-8">
                    <div className="grid w-full grid-cols-2 gap-6 lg:grid-cols-3">
                        {paginatedProducts.map(product => (
                            <ProductCard key={product.rootProductId} product={product} />
                        ))}
                    </div>

                    <Pagination currentPage={page} totalPages={lastPage} onPageChange={setPage} />
                </div>
            ) : (
                <div className="mx-auto flex w-full max-w-[500px] flex-col items-center justify-center gap-4">
                    <RadixAvatar className="w-[50%] xl:w-[40%]">
                        <RadixAvatarImage src="/images/empty-cart.png" alt="empty cart"></RadixAvatarImage>
                    </RadixAvatar>
                    <p className="text-sm font-semibold">Các sản phẩm trong danh mục này đã hết hàng!</p>
                    <Button
                        size="lg"
                        variant="outline"
                        className="min-w-[50%] rounded-full text-sm capitalize xl:min-w-[40%]"
                        onClick={resetFilters}
                    >
                        <ShoppingCart />
                        Xem các sản phẩm khác
                    </Button>
                </div>
            )}
        </div>
    )
}

export default ProductGrid
