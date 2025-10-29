import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useQuery } from '@tanstack/react-query'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { RootState } from '@/store'
import { LOGIN_REQUIRED_MESSAGE } from '@/configs/constants'
import useAxiosIns from '@/hooks/useAxiosIns'
import useTitle from '@/hooks/useTitle'
import toastConfig from '@/configs/toast'
import cartService from '@/services/cartService'
import ProductImagesDisplay from '@/pages/ProductDetailPage/ProductImagesDisplay'
import ProductStaticInfoDisplay from '@/pages/ProductDetailPage/ProductStaticInfoDisplay'
import ProductFeaturesDisplay from '@/pages/ProductDetailPage/ProductFeaturesDisplay'
import ProductNotFound from '@/pages/ProductDetailPage/ProductNotFound'

const ProductDetailPage = () => {
    useTitle('Saigon Steps | Chi tiết sản phẩm')
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const { addCartItemMutation } = cartService({ enableFetching: false })
    const { slug } = useParams()
    const axios = useAxiosIns()
    const navigate = useNavigate()
    const isLogged = useSelector((state: RootState) => state.auth.isLogged)

    // Fetching product data
    const getProductDetailQuery = useQuery({
        queryKey: ['product-detail', slug],
        queryFn: () => axios.get<IResponseData<IRootProduct>>(`/products/slug/${slug}`),
        enabled: true,
        refetchInterval: 60000,
        select: res => res.data
    })
    const product = getProductDetailQuery.data?.data

    // Product data display
    const [activeImage, setActiveImage] = useState<string | undefined>(undefined)
    const [selectedProductItem, setSelectedProductItem] = useState<IProductItem | undefined>(undefined)
    useEffect(() => {
        if (product?.images && product.images.length > 0) {
            setActiveImage(product.images[0] as string)
        }
        if (product?.productItems && product.productItems.length > 0) {
            const firstAvailableItem = product.productItems.find(item => item.availableStock! > 0)
            if (firstAvailableItem) {
                setSelectedProductItem(firstAvailableItem as IProductItem)
            }
        }
    }, [product])

    const handleAddCartItem = async () => {
        if (!selectedProductItem) return
        if (selectedProductItem!.availableStock === 0 || addCartItemMutation.isPending) return
        if (!isLogged) return toast(LOGIN_REQUIRED_MESSAGE, toastConfig('info'))

        await addCartItemMutation.mutateAsync({
            productItemId: selectedProductItem!.productItemId,
            quantity: 1
        })
    }

    return (
        <section className="bg-background flex w-full justify-center">
            <div className="max-w-container flex w-full flex-col items-center justify-between px-4 py-24">
                <h2 className="font-dancing-script text-4xl capitalize">Chi tiết sản phẩm</h2>
                <div className="mt-11 flex w-full justify-center">
                    {getProductDetailQuery.isLoading && <Skeleton className="h-[200px] w-full" />}

                    {!getProductDetailQuery.isLoading && product == null && <ProductNotFound />}

                    {!getProductDetailQuery.isLoading && product != null && (
                        <div className="grid w-full grid-cols-1 gap-x-11 gap-y-11 lg:grid-cols-2 xl:gap-x-20">
                            <div>
                                <ProductImagesDisplay
                                    activeImage={activeImage}
                                    imageAlt={product.name}
                                    setActiveImage={value => setActiveImage(value)}
                                    allImages={product.images as string[]}
                                />
                            </div>

                            <div className="flex flex-col gap-4">
                                <ProductStaticInfoDisplay product={product} />

                                <div>
                                    <p className="mb-1 font-medium">Chọn giá trị phân loại: </p>
                                    <div className="flex flex-wrap items-center gap-3">
                                        {product.productItems?.map(item => {
                                            const isActive = selectedProductItem?.productItemId === item.productItemId

                                            return (
                                                <Button
                                                    key={item.productItemId}
                                                    variant={isActive ? 'default' : 'outline'}
                                                    onClick={() => setSelectedProductItem(item as IProductItem)}
                                                >
                                                    {item.size}
                                                </Button>
                                            )
                                        })}
                                    </div>
                                </div>

                                {selectedProductItem && (
                                    <>
                                        <div>
                                            <p className="mb-1 font-medium">
                                                Số lượng tồn kho:{' '}
                                                <span className="font-semibold">
                                                    {selectedProductItem.availableStock}
                                                </span>
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <Button
                                                size="xl"
                                                className="rounded-full text-base capitalize"
                                                disabled={
                                                    selectedProductItem.availableStock === 0 ||
                                                    addCartItemMutation.isPending
                                                }
                                                onClick={handleAddCartItem}
                                            >
                                                Thêm vào giỏ hàng
                                            </Button>
                                            <Button
                                                variant="secondary"
                                                size="xl"
                                                className="rounded-full text-base capitalize"
                                                onClick={() => navigate('/san-pham')}
                                            >
                                                Xem sản phẩm khác
                                            </Button>
                                        </div>
                                    </>
                                )}

                                {product.shoeFeature != null && (
                                    <ProductFeaturesDisplay features={product.shoeFeature as IShoeFeature} />
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}

export default ProductDetailPage
