import { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { twMerge } from 'tailwind-merge'
import { Button } from '@/components/ui/button'
import { RootState } from '@/store'
import useMediaQuery from '@/hooks/useMediaQuery'

const ServicesListBrief = () => {
    const navigate = useNavigate()
    const isLg = useMediaQuery('(min-width: 1024px)')
    const isLogged = useSelector((state: RootState) => state.auth.isLogged)

    return (
        <section id="dich-vu" className="bg-background flex w-full justify-center">
            <div className="max-w-container flex w-full flex-col items-center px-4 py-24">
                <h2 className="font-dancing-script text-4xl capitalize">Các dịch vụ tại Saigon Steps</h2>

                <div className="mt-11 flex w-full flex-col items-start gap-11 lg:flex-row lg:gap-8">
                    <ServiceImage imageUrl="/images/osp-service-1.jpg" />
                    <ServiceDescription
                        title="1. Giày dép & phụ kiện thời trang"
                        content={[
                            'Chúng tôi tự hào mang đến bộ sưu tập giày thời trang phong phú cho cả nam và nữ - từ sneaker năng động, giày da sang trọng đến sandal và dép tiện dụng.',
                            'Bên cạnh đó, phụ kiện đi kèm như tất, dây giày, túi xách, nón và ví cũng được chọn lọc kỹ lưỡng để giúp bạn hoàn thiện outfit một cách tinh tế nhất.',
                            'Tất cả sản phẩm tại Saigon Steps đều được đảm bảo về chất lượng và nguồn gốc, cam kết chỉ bán sản phẩm chính hãng 100%.'
                        ]}
                        ButtonElement={
                            <Button
                                size="xl"
                                onClick={() => navigate('/san-pham')}
                                className="bg-foreground text-background hover:bg-foreground/90 w-fit rounded-xs"
                            >
                                Xem sản phẩm
                            </Button>
                        }
                    />
                </div>

                <div className="mt-11 flex w-full flex-col items-start gap-11 lg:flex-row-reverse lg:gap-8">
                    <ServiceImage imageUrl="/images/osp-service-2.jpg" />
                    <ServiceDescription
                        title="2. Tư vấn phong cách cá nhân"
                        content={[
                            'Mỗi người đều có phong cách riêng, và đội ngũ của Saigon Steps luôn sẵn sàng tư vấn phối đồ, chọn giày theo dáng chân, màu sắc và hoàn cảnh sử dụng.',
                            'Dù bạn cần một đôi giày cho buổi đi chơi, công sở hay sự kiện đặc biệt - chúng tôi sẽ giúp bạn tìm ra lựa chọn hoàn hảo nhất.',
                            'Ngoài ra, chúng tôi còn cung cấp dịch vụ custom giày theo yêu cầu, giúp bạn sở hữu những đôi giày độc đáo, phản ánh đúng cá tính và phong cách riêng của mình.'
                        ]}
                        alignRight={isLg}
                        ButtonElement={
                            isLogged ? (
                                <Button
                                    size="xl"
                                    onClick={() => navigate('/trang-ca-nhan/tro-chuyen')}
                                    className="bg-foreground text-background hover:bg-foreground/90 w-fit rounded-xs"
                                >
                                    Tư vấn ngay
                                </Button>
                            ) : null
                        }
                    />
                </div>

                <div className="mt-11 flex w-full flex-col items-start gap-11 lg:flex-row lg:gap-8">
                    <ServiceImage imageUrl="/images/osp-service-3.jpg" />
                    <ServiceDescription
                        title="3. Khuyến mãi & ưu đãi thành viên"
                        content={[
                            'Chúng tôi thường xuyên tổ chức các chương trình khuyến mãi, giảm giá và tặng phiếu giảm giá đặc biệt dành cho khách hàng thân thiết.',
                            'Tham gia chương trình Saigon Steps Member, bạn sẽ được hưởng ưu đãi riêng, tích điểm và cập nhật sớm nhất các bộ sưu tập mới.'
                        ]}
                        ButtonElement={
                            <Button
                                size="xl"
                                onClick={() => navigate('/khuyen-mai')}
                                className="bg-foreground text-background hover:bg-foreground/90 w-fit rounded-xs"
                            >
                                Xem khuyến mãi
                            </Button>
                        }
                    />
                </div>

                <div className="mt-11 flex justify-center">
                    <Button
                        size="xl"
                        onClick={() => navigate('/dich-vu')}
                        className="bg-foreground text-background hover:bg-foreground/90 w-fit rounded-xs px-20"
                    >
                        Xem tất cả dịch vụ
                    </Button>
                </div>
            </div>
        </section>
    )
}

type ServiceImageProps = {
    imageUrl: string
}

const ServiceImage = ({ imageUrl }: ServiceImageProps) => {
    return (
        <div className="flex w-full basis-2/5 justify-center">
            <div className="aspect-[4/3] w-[50%] rounded-3xl p-4 shadow-lg lg:w-full">
                <div
                    className="h-full rounded-2xl bg-cover bg-center"
                    style={{
                        backgroundImage: `url(${imageUrl})`
                    }}
                ></div>
            </div>
        </div>
    )
}

type ServiceDescriptionProps = {
    title: string
    content: string[]
    alignRight?: boolean
    ButtonElement?: ReactNode
}

const ServiceDescription = ({ title, alignRight, content, ButtonElement }: ServiceDescriptionProps) => {
    return (
        <div className="flex w-full basis-3/5 justify-center">
            <div className={twMerge('flex w-full flex-col gap-6 lg:px-4', alignRight && 'items-end')}>
                <h3
                    className={twMerge(
                        'text-3xl leading-snug font-bold tracking-wider text-balance capitalize lg:text-4xl',
                        alignRight && 'text-right'
                    )}
                >
                    {title}
                </h3>
                <div className="flex flex-col gap-3">
                    {content.map((paragraph, index) => (
                        <p key={index} className={twMerge('text-justify text-base', alignRight && 'text-last-right')}>
                            {paragraph}
                        </p>
                    ))}
                </div>
                {ButtonElement != null && ButtonElement}
            </div>
        </div>
    )
}

export default ServicesListBrief
