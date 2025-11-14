import { useNavigate } from 'react-router-dom'
import { BadgeDollarSign } from 'lucide-react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import striptags from 'striptags'
import formatCurrency from '@/utils/formatCurrency'

type ProductCardProps = {
    product: IRootProduct
    certainty?: number
}

const ProductCard = ({ product, certainty }: ProductCardProps) => {
    const navigate = useNavigate()
    const discountRate = product.discountRate ?? 0
    const price = product.price * (1 - discountRate / 100)

    return (
        <Card className="relative p-4">
            <CardContent className="p-0">
                <div className="flex flex-col gap-4">
                    <div
                        className="group border-muted flex aspect-[4/3] items-center justify-center overflow-hidden border bg-white shadow-lg"
                        style={{
                            borderRadius: '15px 15px 15px 45px'
                        }}
                    >
                        <img
                            src={(product.images as string[])?.[0]}
                            alt={product.name}
                            className="aspect-[4/3]max-w-full cursor-pointer rounded-lg object-cover group-hover:scale-110"
                        />
                    </div>
                    <div>
                        <h3 className="text-lg font-medium">{product.name}</h3>
                        <p className="text-muted-foreground line-clamp-3">{striptags(product.description)}</p>
                        <div className="text-muted-foreground mt-2 flex items-center gap-2">
                            Giá chỉ từ:
                            <Badge variant="success">
                                <BadgeDollarSign /> {formatCurrency(price)}
                            </Badge>
                        </div>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="mt-auto p-0">
                <Button
                    size="lg"
                    variant="secondary"
                    className="w-full"
                    onClick={() => navigate(`/san-pham/${product.slug}`)}
                >
                    Xem chi tiết
                </Button>
            </CardFooter>

            {product.discountRate != null && product.discountRate > 0 && (
                <div className="bg-primary absolute top-8 -left-2 flex h-6 items-center justify-center pr-2 pl-4">
                    <span className="text-primary-foreground text-center text-base font-semibold">
                        -{product.discountRate}%
                    </span>
                    <div className="border-primary absolute top-full left-0 border-4 border-b-transparent border-l-transparent"></div>
                    <div className="border-primary absolute top-0 left-full h-full border-12 border-t-transparent border-r-transparent border-b-transparent"></div>
                </div>
            )}

            {certainty != null && (
                <div className="absolute top-0 right-0 overflow-hidden rounded-tr-xl pl-4">
                    <span className="text-primary-foreground bg-pink block w-20 translate-x-[6px] -skew-x-20 rounded-xs py-1 text-center text-base font-semibold">
                        {(certainty * 100).toFixed(2)}%
                    </span>
                </div>
            )}
        </Card>
    )
}

export default ProductCard
