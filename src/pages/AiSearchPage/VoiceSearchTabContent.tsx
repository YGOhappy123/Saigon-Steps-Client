import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { AudioWaveform, Mic, ShoppingCart, X } from 'lucide-react'
import { Avatar as RadixAvatar, AvatarImage as RadixAvatarImage } from '@radix-ui/react-avatar'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { onError } from '@/utils/errorsHandler'
import { axiosIns } from '@/hooks/useAxiosIns'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import LoadingIndicator from '@/pages/AiSearchPage/LoadingIndicator'
import toastConfig from '@/configs/toast'
import ProductCard from '@/components/common/ProductCard'
import useDebounce from '@/hooks/useDebounce'

type VoiceSearchTabContentProps = {
    isLoading: boolean
    setIsLoading: (isLoading: boolean) => void
}

const VoiceSearchTabContent = ({ isLoading, setIsLoading }: VoiceSearchTabContentProps) => {
    const navigate = useNavigate()
    const controllerRef = useRef<AbortController | null>(null)
    const [result, setResult] = useState<PredictedRootProduct[] | null>(null)

    const handleSubmit = async (transcript: string) => {
        setIsLoading(true)

        try {
            controllerRef.current = new AbortController()
            const result = await axiosIns.post<IResponseData<PredictedRootProduct[]>>(
                '/ai/semantic-search',
                { query: transcript },
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
        setResult(null)
    }

    return (
        <div className="flex min-h-full flex-col items-center gap-8">
            <InputForm
                isLoading={isLoading}
                handleSubmit={handleSubmit}
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
    isLoading: boolean
    handleSubmit: (transcript: string) => void
    handleCancelSearch: () => void
    handleClear: () => void
}

const InputForm = ({ isLoading, handleSubmit, handleCancelSearch, handleClear }: InputFormProps) => {
    const {
        transcript,
        listening: isListening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition()

    const startListening = () => {
        resetTranscript()
        handleClear()
        SpeechRecognition.startListening({ continuous: true, language: 'vi-VN' })
    }
    const debouncedTranscript = useDebounce(transcript, 2000)

    useEffect(() => {
        SpeechRecognition.stopListening()
        if (debouncedTranscript) {
            handleSubmit(debouncedTranscript as string)
        }
    }, [debouncedTranscript])

    if (!browserSupportsSpeechRecognition) {
        return (
            <div className="col-span-2 flex flex-1 flex-col items-center justify-center gap-2">
                <RadixAvatar className="w-[50%] xl:w-[40%]">
                    <RadixAvatarImage src="/images/disc-emoji.png" alt="empty cart"></RadixAvatarImage>
                </RadixAvatar>
                <p className="mt-2 font-semibold">Không được hỗ trợ</p>
                <p className="font-semibold">Trình duyệt của bạn không hỗ trợ nhận diện giọng nói!</p>
            </div>
        )
    }

    return (
        <form className="flex w-full max-w-2xl flex-col xl:max-w-3xl">
            <h3 className="mb-2 text-sm leading-none font-medium">
                Hãy nói lên nhu cầu của bạn, chúng mình sẽ giúp bạn tìm kiếm sản phẩm phù hợp nhất!
            </h3>
            <div className="flex items-start gap-4">
                <div className="border-primary bg-secondary relative flex aspect-square w-20 items-center justify-center rounded-full border-4">
                    <Mic className="text-primary" size={40} />
                    {isListening && (
                        <span className="bg-primary absolute inline-flex h-full w-full animate-ping rounded-full opacity-50"></span>
                    )}
                </div>
                <Textarea
                    rows={4}
                    spellCheck="false"
                    placeholder="Mô tả sản phẩm..."
                    className="caret-card-foreground text-card-foreground min-h-20 resize-none rounded border-2 font-semibold"
                    value={transcript}
                    disabled
                />
            </div>
            <div className="mt-4 flex items-center justify-end gap-2">
                {isLoading && (
                    <Button variant="outline" type="button" onClick={handleCancelSearch}>
                        <X /> Dừng tìm kiếm
                    </Button>
                )}
                <Button type="button" disabled={isLoading || isListening} onClick={startListening}>
                    <AudioWaveform /> Bắt đầu nói
                </Button>
            </div>
        </form>
    )
}

export default VoiceSearchTabContent
