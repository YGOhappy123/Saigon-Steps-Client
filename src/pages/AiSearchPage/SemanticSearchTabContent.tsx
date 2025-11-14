import { ChangeEvent, FormEvent, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { Eraser, Search, ShoppingCart, X } from 'lucide-react'
import { Avatar as RadixAvatar, AvatarImage as RadixAvatarImage } from '@radix-ui/react-avatar'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { onError } from '@/utils/errorsHandler'
import { axiosIns } from '@/hooks/useAxiosIns'
import LoadingIndicator from '@/pages/AiSearchPage/LoadingIndicator'
import toastConfig from '@/configs/toast'
import ProductCard from '@/components/common/ProductCard'

type SemanticSearchTabContentProps = {
    isLoading: boolean
    setIsLoading: (isLoading: boolean) => void
}

const SemanticSearchTabContent = ({ isLoading, setIsLoading }: SemanticSearchTabContentProps) => {
    const navigate = useNavigate()
    const controllerRef = useRef<AbortController | null>(null)
    const [query, setQuery] = useState('')
    const [result, setResult] = useState<PredictedRootProduct[] | null>(null)

    const handleTyping = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const input = e.target.value
        if (input.startsWith(' ')) return

        setQuery(input)
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            controllerRef.current = new AbortController()
            const result = await axiosIns.post<IResponseData<PredictedRootProduct[]>>(
                '/ai/semantic-search',
                { query: query },
                { signal: controllerRef.current.signal }
            )
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
        setQuery('')
        setResult(null)
    }

    return (
        <div className="flex min-h-full flex-col items-center gap-8">
            <InputForm
                query={query}
                isLoading={isLoading}
                handleSubmit={handleSubmit}
                handleTyping={handleTyping}
                handleCancelSearch={handleCancelSearch}
                handleClear={handleClear}
            />

            {isLoading && <LoadingIndicator />}

            {!isLoading && result && result.length > 0 && (
                <div>
                    <h3 className="text-muted-foreground mb-4 text-base font-medium">
                        Dưới đây là một số sản phẩm được tìm kiếm dựa trên các tiêu chí như: giới tính, mục đích sử
                        dụng, thiết kế, màu sắc, chất liệu, thương hiệu,...
                    </h3>
                    <div className="grid w-full grid-cols-2 gap-6 lg:grid-cols-3 xl:grid-cols-4">
                        {result.map(product => (
                            <ProductCard key={product.rootProductId} product={product} certainty={product.certainty} />
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
    query: string
    isLoading: boolean
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void
    handleTyping: (e: ChangeEvent<HTMLTextAreaElement>) => void
    handleCancelSearch: () => void
    handleClear: () => void
}

const InputForm = ({
    query,
    isLoading,
    handleSubmit,
    handleTyping,
    handleCancelSearch,
    handleClear
}: InputFormProps) => {
    return (
        <form onSubmit={handleSubmit} className="flex w-full max-w-2xl flex-col xl:max-w-3xl">
            <h3 className="mb-2 text-sm leading-none font-medium">
                Hãy mô tả nhu cầu của bạn, chúng mình sẽ giúp bạn tìm kiếm sản phẩm phù hợp nhất!
            </h3>
            <Textarea
                rows={4}
                spellCheck="false"
                placeholder="Nhập mô tả sản phẩm..."
                className="caret-card-foreground text-card-foreground min-h-20 resize-none rounded border-2 font-semibold"
                value={query}
                onChange={handleTyping}
                disabled={isLoading}
            />
            <div className="mt-4 flex items-center justify-end gap-2">
                {isLoading ? (
                    <Button variant="outline" type="button" onClick={handleCancelSearch}>
                        <X /> Dừng tìm kiếm
                    </Button>
                ) : (
                    <Button variant="outline" type="button" onClick={handleClear} disabled={!query}>
                        <Eraser /> Xóa
                    </Button>
                )}
                <Button type="submit" disabled={!query || isLoading}>
                    <Search /> Tìm kiếm
                </Button>
            </div>
        </form>
    )
}

export default SemanticSearchTabContent
