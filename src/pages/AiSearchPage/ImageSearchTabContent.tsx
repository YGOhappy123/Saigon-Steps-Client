import { ChangeEvent, FormEvent, Fragment, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { Search, ShoppingCart, Upload, X } from 'lucide-react'
import { Avatar as RadixAvatar, AvatarImage as RadixAvatarImage } from '@radix-ui/react-avatar'
import { Button } from '@/components/ui/button'
import { onError } from '@/utils/errorsHandler'
import { axiosIns } from '@/hooks/useAxiosIns'
import LoadingIndicator from '@/pages/AiSearchPage/LoadingIndicator'
import ProductCard from '@/components/common/ProductCard'
import toastConfig from '@/configs/toast'

type ImageSearchResult = {
    boundingBox: { x1: number; x2: number; y1: number; y2: number }
    products: PredictedRootProduct[]
}

type ImageSearchTabContentProps = {
    isLoading: boolean
    setIsLoading: (isLoading: boolean) => void
}

const ImageSearchTabContent = ({ isLoading, setIsLoading }: ImageSearchTabContentProps) => {
    const navigate = useNavigate()
    const controllerRef = useRef<AbortController | null>(null)
    const [preview, setPreview] = useState<string | null>(null)
    const [image, setImage] = useState<File | null>(null)
    const [result, setResult] = useState<ImageSearchResult[] | null>(null)

    const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const selected = e.target.files?.[0]
        if (!selected) return

        const url = URL.createObjectURL(selected)
        setImage(selected)
        setPreview(url)
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            controllerRef.current = new AbortController()
            const formData = new FormData()
            formData.append('file', image!)

            const result = await axiosIns.post<IResponseData<ImageSearchResult[]>>('/ai/image-search', formData, {
                signal: controllerRef.current.signal,
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            setResult(result.data?.data ?? [])
        } catch (error) {
            if (error instanceof Error && error.name !== 'CanceledError') {
                onError(error as Error)
            }
        } finally {
            setIsLoading(false)
        }
    }

    const handleCancelSearch = () => {
        if (controllerRef.current) {
            controllerRef.current.abort()
            setIsLoading(false)
            toast('Quá trình tìm kiếm đã bị dừng.', toastConfig('info'))
        }
    }

    const handleClear = () => {
        setPreview(null)
        setImage(null)
        setResult(null)
    }

    return (
        <div className="flex min-h-full flex-col items-center gap-8">
            <InputForm
                preview={preview}
                isLoading={isLoading}
                handleSubmit={handleSubmit}
                handleUpload={handleUpload}
                handleCancelSearch={handleCancelSearch}
                handleClear={handleClear}
            />

            {isLoading && <LoadingIndicator />}

            {!isLoading && result && result.length > 0 && (
                <div className="grid w-full grid-cols-1 gap-11 lg:grid-cols-5">
                    <div className="flex flex-col lg:col-span-2">
                        <h3 className="text-muted-foreground mb-4 text-base font-medium">
                            Dưới đây là một số hình ảnh giày dép được trích xuất từ ảnh của bạn
                        </h3>
                        <div className="relative w-full">
                            <img src={preview!} alt="query image" className="w-full rounded-lg object-cover" />
                            {result.map((detection, index) => {
                                const box = detection.boundingBox
                                return (
                                    <div
                                        key={index}
                                        className="border-success absolute flex items-center justify-center border-4"
                                        style={{
                                            left: `${box.x1 * 100}%`,
                                            top: `${box.y1 * 100}%`,
                                            width: `${(box.x2 - box.x1) * 100}%`,
                                            height: `${(box.y2 - box.y1) * 100}%`
                                        }}
                                    >
                                        <span className="bg-success flex size-10 items-center justify-center rounded-full text-lg font-semibold text-white">
                                            {index + 1}
                                        </span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="flex flex-col items-start gap-4 lg:col-span-3">
                        <h3 className="text-muted-foreground text-base font-medium">
                            Dưới đây là một số sản phẩm được tìm kiếm dựa trên các tiêu chí như: hình dáng, màu sắc, góc
                            chụp, họa tiết, logo,...
                        </h3>
                        {result.map((detection, index) => (
                            <Fragment key={index}>
                                <span className="bg-success flex h-10 w-full items-center justify-center rounded-full text-lg font-semibold text-white">
                                    Phát hiện số #{(index + 1).toString().padStart(2, '0')}
                                </span>
                                <div className="grid w-full grid-cols-2 gap-6">
                                    {detection.products.map(product => (
                                        <ProductCard
                                            key={product.rootProductId}
                                            product={product}
                                            certainty={product.certainty}
                                        />
                                    ))}
                                </div>
                            </Fragment>
                        ))}
                    </div>
                </div>
            )}

            {!isLoading && result && result.length === 0 && (
                <div className="mx-auto flex w-full max-w-[500px] flex-col items-center justify-center gap-4">
                    <RadixAvatar className="w-[50%] xl:w-[40%]">
                        <RadixAvatarImage src="/images/empty-cart.png" alt="empty cart"></RadixAvatarImage>
                    </RadixAvatar>
                    <p className="text-sm font-semibold">Không tim thấy sản phẩm phù hợp!</p>
                    <Button
                        size="lg"
                        variant="outline"
                        className="min-w-[50%] rounded-full text-sm capitalize xl:min-w-[40%]"
                        onClick={() => navigate('/san-pham')}
                    >
                        <ShoppingCart />
                        Xem các sản phẩm khác
                    </Button>
                </div>
            )}
        </div>
    )
}

type InputFormProps = {
    preview: string | null
    isLoading: boolean
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void
    handleUpload: (e: ChangeEvent<HTMLInputElement>) => void
    handleCancelSearch: () => void
    handleClear: () => void
}

const InputForm = ({
    preview,
    isLoading,
    handleSubmit,
    handleUpload,
    handleCancelSearch,
    handleClear
}: InputFormProps) => {
    return (
        <form onSubmit={handleSubmit} className="flex w-full max-w-2xl flex-col xl:max-w-3xl">
            <h3 className="mb-2 text-sm leading-none font-medium">
                Hãy tải lên hình ảnh bạn muốn tìm, chúng mình sẽ giúp bạn tìm kiếm sản phẩm phù hợp nhất!
            </h3>

            <div className="flex items-center justify-between gap-4">
                <div className="border-primary flex w-full max-w-[350px] items-center justify-center rounded-xl border-4 p-1">
                    <img
                        src={preview ?? '/images/primary-bg-logo.png'}
                        alt="query avatar"
                        className="aspect-video h-full w-full rounded-lg object-cover"
                    />

                    <input
                        type="file"
                        name="image"
                        id="imageInput"
                        accept="image/*"
                        className="hidden"
                        onChange={e => {
                            handleClear()
                            handleUpload(e)
                        }}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <Button variant="lighter" type="button" disabled={isLoading}>
                        <label htmlFor="imageInput" className="flex cursor-pointer items-center gap-2">
                            <Upload /> Tải ảnh lên
                        </label>
                    </Button>
                    {isLoading && (
                        <Button variant="outline" type="button" onClick={handleCancelSearch}>
                            <X /> Dừng tìm kiếm
                        </Button>
                    )}
                    <Button type="submit" disabled={!preview || isLoading}>
                        <Search /> Tìm kiếm
                    </Button>
                </div>
            </div>
        </form>
    )
}

export default ImageSearchTabContent
