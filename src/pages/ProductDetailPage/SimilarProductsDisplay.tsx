import { useQuery } from '@tanstack/react-query'
import { twMerge } from 'tailwind-merge'
import useAxiosIns from '@/hooks/useAxiosIns'
import ProductCard from '@/components/common/ProductCard'

type SimilarProductsDisplayProps = {
    slug: string
    containerClassName?: string
}

const SimilarProductsDisplay = ({ slug, containerClassName }: SimilarProductsDisplayProps) => {
    const axios = useAxiosIns()
    const getSimilarProductsQuery = useQuery({
        queryKey: ['similar-products', slug],
        queryFn: () => axios.get<IResponseData<PredictedRootProduct[]>>(`/ai/similar-products/${slug}`),
        enabled: true,
        refetchOnWindowFocus: false,
        select: res => res.data
    })
    const products = getSimilarProductsQuery.data?.data ?? []

    if (products.length === 0) return null

    return (
        <div className={twMerge('flex w-full flex-col items-center gap-11', containerClassName)}>
            <h2 className="font-dancing-script text-4xl capitalize">Một số sản phẩm tương tự</h2>

            <div className="grid w-full grid-cols-2 gap-6 lg:grid-cols-3 xl:grid-cols-4">
                {products.map(product => (
                    <ProductCard key={product.rootProductId} product={product} certainty={product.certainty} />
                ))}
            </div>
        </div>
    )
}

export default SimilarProductsDisplay
