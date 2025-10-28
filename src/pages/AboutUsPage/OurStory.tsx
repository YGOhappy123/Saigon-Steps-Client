import { Quote } from 'lucide-react'
import { Button } from '@/components/ui/button'

const OurStory = () => {
    return (
        <section id="our-story" className="bg-background flex w-full justify-center">
            <div className="max-w-container flex w-full flex-col items-center gap-8 px-4 py-24 lg:flex-row lg:items-start">
                <div className="grid grid-cols-[200px_120px_200px] grid-rows-[90px_360px_90px]">
                    <div className="bg-background col-span-2 col-start-1 row-span-2 row-start-1 rounded-3xl p-4 shadow-lg">
                        <div
                            className="h-full rounded-2xl bg-cover bg-center"
                            style={{
                                backgroundImage: 'url(/images/our-story-1.jpg)'
                            }}
                        ></div>
                    </div>
                    <div className="bg-background col-span-2 col-start-2 row-span-2 row-start-2 rounded-3xl p-4 shadow-lg">
                        <div
                            className="h-full rounded-2xl bg-cover bg-center"
                            style={{
                                backgroundImage: 'url(/images/our-story-2.jpg)'
                            }}
                        ></div>
                    </div>
                </div>
                <div className="flex flex-col gap-6 lg:px-4">
                    <h1 className="text-3xl leading-snug font-bold tracking-wider text-balance capitalize lg:text-4xl xl:text-5xl">
                        Câu chuyện thương hiệu
                    </h1>
                    <div className="flex flex-col gap-3">
                        <p className="text-justify text-base">
                            Bắt đầu từ một cửa hàng nhỏ giữa lòng Sài Gòn, chúng tôi hiểu rằng mỗi đôi giày đều có thể
                            kể một câu chuyện riêng.
                        </p>
                        <p className="text-justify text-base">
                            Từ những ngày đầu chỉ với vài mẫu sneaker cơ bản, Saigon Steps đã không ngừng phát triển để
                            trở thành địa chỉ tin cậy của những tín đồ yêu giày - nơi hội tụ của sự sáng tạo, chất lượng
                            và phong cách.
                        </p>
                        <p className="text-justify text-base">
                            Tên gọi “Saigon Steps” được lấy cảm hứng từ chính nhịp sống năng động của thành phố Hồ Chí
                            Minh - nơi những bước chân không bao giờ ngừng nghỉ. Chúng tôi tin rằng:
                        </p>
                        <div className="bg-muted relative w-fit rounded px-9 py-4">
                            <span className="text-muted-foreground text-lg font-medium italic">
                                Mỗi bước đi là một hành trình, và đôi giày tốt sẽ khiến hành trình đó thêm đáng nhớ
                            </span>
                            <Quote
                                className="text-muted-foreground/50 absolute top-2 right-2 rotate-180 rotate-y-180"
                                size={20}
                            />
                            <Quote className="text-muted-foreground/50 absolute top-2 left-2 rotate-y-180" size={20} />
                        </div>
                    </div>
                    <a href="#shopping-experience">
                        <Button
                            size="xl"
                            className="bg-foreground text-background hover:bg-foreground/90 w-fit rounded-xs"
                        >
                            Trải nghiệm mua sắm
                        </Button>
                    </a>
                </div>
            </div>
        </section>
    )
}

export default OurStory
