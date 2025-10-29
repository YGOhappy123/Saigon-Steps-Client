import { useNavigate } from 'react-router-dom'
import { BadgeDollarSign, Sparkles } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import formatCurrency from '@/utils/formatCurrency'

type ProductStaticInfoDisplayProps = {
    product: IRootProduct
}

const ProductStaticInfoDisplay = ({ product }: ProductStaticInfoDisplayProps) => {
    const navigate = useNavigate()
    const discountRate = product?.promotions?.[0]?.discountRate ?? 0
    const brand = product!.brand as IProductBrand

    return (
        <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold">{product.name}</h3>

            <div className="-mb-1.5 flex items-center gap-2 font-medium">
                Thương hiệu:
                <div
                    className="hover:text-primary flex cursor-pointer items-center gap-2"
                    onClick={() => navigate(`/san-pham?thuong-hieu=${brand.name.toLowerCase()}`)}
                >
                    <span className="font-semibold">{brand.name}</span>
                    {brand.logoUrl && (
                        <div className="flex aspect-square w-[36px] shrink-0 items-center justify-center rounded-full border bg-white p-0.5">
                            <img src={brand.logoUrl} className="object-contain" />
                        </div>
                    )}
                </div>
            </div>

            <div>
                <p className="mb-1 font-medium">Mô tả sản phẩm</p>
                <div dangerouslySetInnerHTML={{ __html: product.description }}></div>
            </div>

            <div className="flex items-center gap-2 font-medium">
                {discountRate > 0 ? 'Giá tiền gốc:' : 'Giá tiền:'}
                <Badge variant={discountRate > 0 ? 'destructive' : 'success'}>
                    <BadgeDollarSign /> {formatCurrency(product.price)}
                </Badge>
            </div>

            {discountRate > 0 && (
                <div className="flex flex-col gap-2">
                    <div className="text-primary flex items-center gap-3">
                        <Sparkles />
                        <p className="mb-1 font-medium">
                            Giảm giá: <span className="font-semibold">{discountRate}%</span>
                        </p>
                    </div>
                    <div className="text-primary flex items-center gap-3">
                        <Sparkles />
                        <div className="flex items-center gap-2">
                            <p className="mb-1 font-medium">Chỉ còn:</p>
                            <Badge variant="secondary" className="bg-blue-500 text-white dark:bg-blue-600">
                                <BadgeDollarSign /> {formatCurrency(product.price * (1 - discountRate / 100))}
                            </Badge>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProductStaticInfoDisplay
