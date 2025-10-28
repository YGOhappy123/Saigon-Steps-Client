import { Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'

const ShoppingExperience = () => {
    const previousYear = (new Date().getFullYear() - 1).toString()

    return (
        <section id="shopping-experience" className="bg-foreground flex w-full justify-center">
            <div className="max-w-container flex w-full flex-col items-center gap-8 px-4 py-24 lg:flex-row lg:items-start">
                <div className="text-background flex flex-col gap-6 lg:px-4">
                    <h1 className="text-3xl leading-snug font-bold tracking-wider text-balance capitalize lg:text-4xl xl:text-5xl">
                        Trải nghiệm mua sắm
                    </h1>
                    <div className="flex flex-col gap-3">
                        <p className="text-justify text-base">
                            Chúng tôi hiểu rằng việc chọn một đôi giày không chỉ là mua sắm - đó là một trải nghiệm cá
                            nhân. Vì thế, Saigon Steps luôn chú trọng đến dịch vụ khách hàng:
                        </p>
                        <ul className="flex flex-col gap-3">
                            <li className="flex items-center gap-3">
                                <Sparkles />
                                Tư vấn tận tâm, giúp bạn chọn đôi giày phù hợp với phong cách và nhu cầu.
                            </li>
                            <li className="flex items-center gap-3">
                                <Sparkles />
                                Chính sách đổi trả linh hoạt và bảo hành rõ ràng.
                            </li>
                            <li className="flex items-center gap-3">
                                <Sparkles />
                                Thường xuyên có khuyến mãi, coupon, và ưu đãi dành riêng cho khách hàng thân thiết.
                            </li>
                            <li className="flex items-center gap-3">
                                <Sparkles />
                                Hệ thống mua hàng online tiện lợi, giao hàng toàn quốc nhanh chóng và an toàn.
                            </li>
                        </ul>
                        <p className="text-justify text-base">
                            Chúng tôi muốn mỗi khách hàng khi đến với Saigon Steps đều cảm nhận được sự chu đáo, trẻ
                            trung và khác biệt - đúng như tinh thần của thương hiệu.
                        </p>
                    </div>
                    <a href="#mission-and-vision">
                        <Button
                            size="xl"
                            className="bg-background text-foreground hover:bg-background/90 w-fit rounded-xs"
                        >
                            Sứ mệnh và tầm nhìn
                        </Button>
                    </a>
                </div>
                <div className="relative grid grid-cols-[repeat(4,124px)] grid-rows-[repeat(4,129px)] gap-2">
                    <div className="bg-secondary col-span-2 col-start-1 row-span-2 row-start-2 rounded-2xl p-2 shadow-lg">
                        <div
                            className="h-full rounded-xl bg-cover bg-center"
                            style={{
                                backgroundImage: 'url(/images/shopping-experience-1.jpg)'
                            }}
                        ></div>
                    </div>
                    <div className="bg-secondary col-span-2 col-start-3 row-span-2 row-start-1 rounded-2xl p-2 shadow-lg">
                        <div
                            className="h-full rounded-xl bg-cover bg-center"
                            style={{
                                backgroundImage: 'url(/images/shopping-experience-2.jpg)'
                            }}
                        ></div>
                    </div>
                    <div className="bg-secondary col-span-2 col-start-3 row-span-2 row-start-3 rounded-2xl p-2 shadow-lg">
                        <div
                            className="h-full rounded-xl bg-cover bg-center"
                            style={{
                                backgroundImage: 'url(/images/shopping-experience-3.jpg)'
                            }}
                        ></div>
                    </div>
                    <div className="bg-secondary col-span-2 col-start-1 row-span-1 row-start-1 flex flex-col items-center justify-center gap-2 rounded-2xl p-2 font-serif">
                        <span className="text-primary/80 text-3xl font-semibold">
                            Trên 90<sup className="ml-1 text-xl">%</sup>
                        </span>
                        <span className="text-lg font-semibold capitalize">Khách hàng hài lòng</span>
                    </div>
                    <div className="bg-secondary col-span-2 col-start-1 row-span-1 row-start-4 flex flex-col items-center justify-center gap-2 rounded-2xl p-2 font-serif">
                        <span className="text-primary/80 text-3xl font-semibold">Hơn 10,000</span>
                        <span className="text-lg font-semibold capitalize">Đánh giá tích cực</span>
                    </div>
                    <div className="bg-secondary border-foreground absolute top-1/2 left-1/2 flex aspect-square w-[120px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-8">
                        <span className="font-strasua text-center text-lg leading-tight">
                            Saigon
                            <br />
                            Steps
                            <br />
                            {previousYear}
                        </span>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ShoppingExperience
