import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import QuoteBox from '@/components/common/QuoteBox'

const OurStoryBrief = () => {
    const navigate = useNavigate()

    return (
        <section className="bg-foreground flex w-full justify-center">
            <div className="max-w-container flex w-full flex-col items-center px-4 py-24">
                <h2 className="font-dancing-script text-background text-4xl capitalize">Về Saigon Steps</h2>

                <div className="mt-11 flex w-full flex-col items-center gap-8 lg:flex-row lg:items-start">
                    <div className="grid grid-cols-[200px_120px_200px] grid-rows-[90px_360px_90px]">
                        <div className="bg-secondary col-span-2 col-start-1 row-span-2 row-start-1 rounded-3xl p-4 shadow-lg">
                            <div
                                className="h-full rounded-2xl bg-cover bg-center"
                                style={{
                                    backgroundImage: 'url(/images/our-story-1.jpg)'
                                }}
                            ></div>
                        </div>
                        <div className="bg-secondary col-span-2 col-start-2 row-span-2 row-start-2 rounded-3xl p-4 shadow-lg">
                            <div
                                className="h-full rounded-2xl bg-cover bg-center"
                                style={{
                                    backgroundImage: 'url(/images/our-story-2.jpg)'
                                }}
                            ></div>
                        </div>
                    </div>
                    <div className="text-background flex flex-col gap-6 lg:px-4">
                        <h1 className="text-3xl leading-snug font-bold tracking-wider text-balance capitalize lg:text-4xl xl:text-5xl">
                            Câu chuyện thương hiệu
                        </h1>
                        <div className="flex flex-col gap-3">
                            <p className="text-justify text-base">
                                Bắt đầu từ một cửa hàng nhỏ giữa lòng Sài Gòn, chúng tôi hiểu rằng mỗi đôi giày đều có
                                thể kể một câu chuyện riêng.
                            </p>
                            <p className="text-justify text-base">
                                Từ những ngày đầu chỉ với vài mẫu sneaker cơ bản, Saigon Steps đã không ngừng phát triển
                                để trở thành địa chỉ tin cậy của những tín đồ yêu giày - nơi hội tụ của sự sáng tạo,
                                chất lượng và phong cách.
                            </p>
                            <p className="text-justify text-base">
                                Tên gọi “Saigon Steps” được lấy cảm hứng từ chính nhịp sống năng động của thành phố Hồ
                                Chí Minh - nơi những bước chân không bao giờ ngừng nghỉ. Chúng tôi tin rằng:
                            </p>
                            <QuoteBox
                                content="Mỗi bước đi là một hành trình, và đôi giày tốt sẽ khiến hành trình đó thêm đáng nhớ"
                                reverseColors
                            />
                        </div>
                        <Button
                            size="xl"
                            onClick={() => navigate('/gioi-thieu')}
                            className="bg-background text-foreground hover:bg-background/90 w-fit rounded-xs"
                        >
                            Đọc thêm
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default OurStoryBrief
