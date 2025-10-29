import { useNavigate } from 'react-router-dom'
import { Footprints, HandHeart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import QuoteBox from '@/components/common/QuoteBox'

const MissionAndVision = () => {
    const navigate = useNavigate()

    return (
        <section id="su-menh" className="bg-background flex w-full justify-center">
            <div className="max-w-container flex w-full flex-col items-center gap-8 px-4 py-24 lg:flex-row lg:items-start">
                <div className="relative grid grid-cols-[repeat(4,124px)] grid-rows-[repeat(9,53px)] gap-2">
                    <div className="bg-background col-span-3 col-start-1 row-span-3 row-start-1 rounded-2xl p-2 shadow-lg">
                        <div
                            className="h-full rounded-xl bg-cover bg-center"
                            style={{
                                backgroundImage: 'url(/images/mission-and-vision-1.jpg)'
                            }}
                        ></div>
                    </div>
                    <div className="bg-background col-span-3 col-start-2 row-span-3 row-start-3 rounded-2xl p-2 shadow-lg">
                        <div
                            className="h-full rounded-xl bg-cover bg-center"
                            style={{
                                backgroundImage: 'url(/images/mission-and-vision-2.jpg)'
                            }}
                        ></div>
                    </div>
                    <div className="bg-background col-span-3 col-start-1 row-span-3 row-start-5 rounded-2xl p-2 shadow-lg">
                        <div
                            className="h-full rounded-xl bg-cover bg-center"
                            style={{
                                backgroundImage: 'url(/images/mission-and-vision-3.jpg)'
                            }}
                        ></div>
                    </div>
                    <div className="bg-background col-span-3 col-start-2 row-span-3 row-start-7 rounded-2xl p-2 shadow-lg">
                        <div
                            className="h-full rounded-xl bg-cover bg-center"
                            style={{
                                backgroundImage: 'url(/images/mission-and-vision-4.jpg)'
                            }}
                        ></div>
                    </div>
                    <div className="col-span-1 col-start-4 row-span-2 row-start-1 flex items-center justify-center">
                        <div className="border-primary bg-secondary flex aspect-square w-20 items-center justify-center rounded-full border-4">
                            <Footprints className="text-primary" size={40} />
                        </div>
                    </div>
                    <div className="col-span-1 col-start-1 row-span-2 row-start-8 flex items-center justify-center">
                        <div className="border-primary bg-secondary flex aspect-square w-20 items-center justify-center rounded-full border-4">
                            <HandHeart className="text-primary" size={40} />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-6 lg:px-4">
                    <h1 className="text-3xl leading-snug font-bold tracking-wider text-balance capitalize lg:text-4xl xl:text-5xl">
                        Sứ mệnh và tầm nhìn
                    </h1>
                    <div className="flex flex-col gap-3">
                        <p className="text-justify text-base">
                            Sứ mệnh của Saigon Steps là mang đến cho khách hàng những đôi giày và phụ kiện thời trang
                            chất lượng, giúp họ tự tin thể hiện bản thân trong mọi khoảnh khắc.
                        </p>
                        <p className="text-justify text-base">
                            Trong tương lai, chúng tôi hướng tới việc trở thành thương hiệu thời trang giày Việt được
                            yêu thích nhất, mở rộng hệ thống bán lẻ và phát triển các dòng sản phẩm độc quyền, góp phần
                            lan tỏa tinh thần “mỗi bước đi là một dấu ấn”.
                        </p>
                        <p className="text-justify text-base">
                            Mỗi bước đi cùng Saigon Steps không chỉ là hành trình chạm đến phong cách, mà còn là cách
                            bạn kể câu chuyện riêng của chính mình. Dù bạn là người yêu sự năng động, thanh lịch hay cá
                            tính, chúng tôi luôn có đôi giày dành cho bạn.
                        </p>
                        <QuoteBox content="Saigon Steps ~ Where Style Begins!" />
                    </div>
                    <Button
                        size="xl"
                        onClick={() => navigate('/san-pham')}
                        className="bg-foreground text-background hover:bg-foreground/90 w-fit rounded-xs"
                    >
                        Xem sản phẩm
                    </Button>
                </div>
            </div>
        </section>
    )
}

export default MissionAndVision
