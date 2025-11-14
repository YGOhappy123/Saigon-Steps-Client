import { useEffect, useState } from 'react'
import useTitle from '@/hooks/useTitle'
import TabsSwitcher from '@/pages/AiSearchPage/TabsSwitcher'
import SemanticSearchTabContent from '@/pages/AiSearchPage/SemanticSearchTabContent'
import ImageSearchTabContent from '@/pages/AiSearchPage/ImageSearchTabContent'
import VoiceSearchTabContent from '@/pages/AiSearchPage/VoiceSearchTabContent'

const AiSearchPage = () => {
    useTitle('Saigon Steps | Tìm kiếm bằng AI')
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const [activeTab, setActiveTab] = useState<'text' | 'image' | 'voice'>('text')
    const [isLoading, setIsLoading] = useState(false)

    return (
        <section className="bg-background flex w-full justify-center">
            <div className="max-w-container flex w-full flex-col items-center justify-between gap-11 px-4 py-24">
                <h2 className="font-dancing-script text-4xl capitalize">Tìm sản phẩm bằng trí tuệ nhân tạo</h2>

                <TabsSwitcher isLoading={isLoading} activeTab={activeTab} setActiveTab={setActiveTab} />

                <div
                    className="w-full"
                    style={{
                        minHeight: 'calc(100vh - 512px)'
                    }}
                >
                    {activeTab === 'text' && (
                        <SemanticSearchTabContent isLoading={isLoading} setIsLoading={setIsLoading} />
                    )}

                    {activeTab === 'image' && (
                        <ImageSearchTabContent isLoading={isLoading} setIsLoading={setIsLoading} />
                    )}

                    {activeTab === 'voice' && (
                        <VoiceSearchTabContent isLoading={isLoading} setIsLoading={setIsLoading} />
                    )}
                </div>
            </div>
        </section>
    )
}

export default AiSearchPage
