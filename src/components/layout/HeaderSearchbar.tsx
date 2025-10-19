import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { twMerge } from 'tailwind-merge'
import { X, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import useAxiosIns from '@/hooks/useAxiosIns'
import useDebounce from '@/hooks/useDebounce'
import formatCurrency from '@/utils/formatCurrency'

const HeaderSearchbar = () => {
    const axios = useAxiosIns()
    const navigate = useNavigate()
    const searchInputRef = useRef<HTMLInputElement>(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [searchResult, setSearchResult] = useState<IRootProduct[]>([])

    // Turn off focusing status when click outside search box
    const [inputFocusing, setInputFocusing] = useState(false)
    const searchbarRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchbarRef.current && !searchbarRef.current?.contains(event.target as Node)) {
                setInputFocusing(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [searchbarRef])

    // Control UI display bases on typing status
    const [isTyping, setIsTyping] = useState(false)
    let timerId: undefined | ReturnType<typeof setTimeout> = undefined

    useEffect(() => {
        return () => clearTimeout(timerId)
    }, [])

    const countdownTyping = () => {
        clearTimeout(timerId)
        timerId = setTimeout(() => {
            setIsTyping(false)
        }, 500)
    }

    const handleTyping = (e: any) => {
        const searchInput = e.target.value
        if (searchInput.startsWith(' ')) return

        setSearchTerm(searchInput)
        setIsTyping(true)
        countdownTyping()
    }

    // Handle searching products
    const debouncedSearchTerm = useDebounce(searchTerm)
    const searchProductsQuery = useQuery({
        queryKey: ['search-products', debouncedSearchTerm],
        queryFn: () => axios.get<IResponseData<IRootProduct[]>>(`/products/search?searchTerm=${debouncedSearchTerm}`),
        enabled: false
    })

    useEffect(() => {
        if (!debouncedSearchTerm || !(debouncedSearchTerm as string).trim()) {
            setSearchResult([])
            return
        }
        searchProductsQuery.refetch()
    }, [debouncedSearchTerm])

    useEffect(() => {
        if (searchProductsQuery.isSuccess && searchProductsQuery.data) {
            setSearchResult(searchProductsQuery.data.data?.data)
        }
    }, [searchProductsQuery.isSuccess, searchProductsQuery.data])

    return (
        <div
            ref={searchbarRef}
            className={twMerge(
                'dark:bg-input/30 relative flex flex-1 items-center gap-2 rounded border-2 py-0.5 pr-3',
                inputFocusing ? 'border-ring ring-ring/50 ring-[3px]' : ''
            )}
        >
            <Input
                placeholder="Nhập tên sản phẩm hoặc thương hiệu..."
                value={searchTerm}
                ref={searchInputRef}
                onChange={handleTyping}
                onFocus={() => setInputFocusing(true)}
                className="border-none bg-transparent! font-medium shadow-none outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <Separator orientation="vertical" className="data-[orientation=vertical]:h-7" />

            {searchTerm ? (
                <X
                    className="cursor-pointer"
                    onClick={() => {
                        setSearchTerm('')
                        setSearchResult([])
                        searchInputRef.current?.focus()
                    }}
                />
            ) : (
                <Search />
            )}

            {inputFocusing && (
                <div
                    className="bg-card absolute left-0 max-h-[400px] w-full overflow-y-auto rounded border p-2 lg:p-3"
                    style={{
                        top: 'calc(100% + 12px)'
                    }}
                >
                    {(!searchTerm || isTyping || searchProductsQuery.isLoading) && (
                        <div className="py-8 text-center text-sm font-medium">
                            <p>Nhập vào tên sản phẩm</p>
                            <p>Bạn muốn tìm kiếm.</p>
                        </div>
                    )}

                    {searchResult.length === 0 && searchTerm && !isTyping && !searchProductsQuery.isLoading && (
                        <div className="py-8 text-center text-sm font-medium">
                            <p>Xin lỗi, chúng tôi không tìm thấy sản phẩm hoặc thương hiệu nào</p>
                            <p>Mang tên "{searchTerm}"</p>
                            <p>Hoặc sản phẩm bạn cần tìm đã bị gỡ.</p>
                        </div>
                    )}

                    {searchResult.length > 0 &&
                        !isTyping &&
                        searchResult.map((product: IRootProduct, index: number) => (
                            <SearchResultLine
                                key={product.rootProductId}
                                product={product}
                                isLast={index === searchResult.length - 1}
                                handleClick={() => {
                                    setSearchTerm('')
                                    setSearchResult([])
                                    setInputFocusing(false)
                                    navigate(`/products/${product.slug}`)
                                }}
                            />
                        ))}
                </div>
            )}
        </div>
    )
}

type SearchResultLineProps = {
    product: IRootProduct
    isLast: boolean
    handleClick: () => void
}

const SearchResultLine = ({ product, isLast, handleClick }: SearchResultLineProps) => {
    const discountRate = product.discountRate ?? 0
    const price = product.price * (1 - discountRate / 100)
    const stock = (product.productItems ?? []).reduce((total, item) => total + (item.availableStock ?? 0), 0)

    return (
        <div key={product.rootProductId}>
            <div onClick={handleClick} className="hover:bg-muted/80 flex cursor-pointer items-start gap-4 p-3">
                <div className="border-primary flex w-[70px] items-center justify-center overflow-hidden rounded-xl border-3 p-1">
                    <img
                        src={(product.images as string[])?.[0] as string}
                        alt="product image"
                        className="aspect-square h-full w-full rounded-lg object-cover"
                    />
                </div>
                <div>
                    <div className="mb-1 line-clamp-1 text-sm font-medium">
                        <span className="font-medium">Tên sản phẩm: </span>
                        {product.name}
                    </div>
                    <div className="text-muted-foreground text-sm">
                        <p>
                            <span className="font-medium">Giá tiền: </span>
                            {formatCurrency(price)}
                        </p>
                        <p>
                            <span className="font-medium">Thương hiệu: </span>
                            {(product.brand as IProductBrand)?.name}
                        </p>
                        <p>
                            <span className="font-medium">Số lượng hiện tại: </span>
                            {stock}
                        </p>
                    </div>
                </div>
            </div>

            {!isLast && <Separator />}
        </div>
    )
}

export default HeaderSearchbar
