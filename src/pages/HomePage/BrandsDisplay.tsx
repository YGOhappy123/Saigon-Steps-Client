import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import useAxiosIns from '@/hooks/useAxiosIns'

const BrandsDisplay = () => {
    const navigate = useNavigate()
    const axios = useAxiosIns()

    const fetchAllBrandsQuery = useQuery({
        queryKey: ['brands-all'],
        queryFn: () => axios.get<IResponseData<IProductBrand[]>>('/brands'),
        enabled: true,
        select: res => res.data
    })
    const brands = fetchAllBrandsQuery.data?.data || []

    return (
        <section className="bg-foreground flex w-full justify-center">
            <div className="max-w-container grid w-full grid-cols-6 p-4">
                {brands
                    .filter(brand => brand.logoUrl != null)
                    .slice(0, 6)
                    .map(brand => (
                        <div key={brand.brandId} className="flex flex-col items-center justify-center gap-2">
                            <div
                                onClick={() => navigate(`/products?brand=${brand.name.toLowerCase()}`)}
                                className="flex aspect-square w-[56px] shrink-0 cursor-pointer items-center justify-center rounded-full border bg-white p-0.5"
                            >
                                <img src={brand.logoUrl} alt={`logo ${brand.name}`} className="object-contain" />
                            </div>
                            <span
                                onClick={() => navigate(`/products?brand=${brand.name.toLowerCase()}`)}
                                className="text-background cursor-pointer text-center text-lg font-medium"
                            >
                                {brand.name}
                            </span>
                        </div>
                    ))}
            </div>
        </section>
    )
}

export default BrandsDisplay
