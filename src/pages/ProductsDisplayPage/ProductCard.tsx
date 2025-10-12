import { useNavigate } from 'react-router-dom'
import { BadgeDollarSign } from 'lucide-react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import striptags from 'striptags'
import formatCurrency from '@/utils/formatCurrency'

type ProductCardProps = {
    product: IRootProduct
}

const ProductCard = ({ product }: ProductCardProps) => {
    const navigate = useNavigate()
    const discountRate = product.discountRate ?? 0
    const price = product.price * (1 - discountRate / 100)

    return (
        <Card className="relative p-4">
            <CardContent className="p-0">
                <div className="flex flex-col gap-4">
                    <div
                        className="group flex aspect-[4/3] items-center justify-center overflow-hidden bg-white"
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
                    onClick={() => navigate(`/products/${product.slug}`)}
                >
                    Xem chi tiết
                </Button>
            </CardFooter>
            {product.discountRate != null && product.discountRate > 0 && (
                <div className="bg-primary absolute top-8 -left-2 rounded-tr-sm rounded-br-sm">
                    <span className="text-primary-foreground inline-block w-full px-5 text-center text-base font-semibold">
                        -{product.discountRate}%
                    </span>
                    <div className="border-primary absolute left-0 border-4 border-b-transparent border-l-transparent"></div>
                </div>
            )}
        </Card>
    )
}

export default ProductCard
